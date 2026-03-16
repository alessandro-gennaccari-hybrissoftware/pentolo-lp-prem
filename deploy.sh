#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# ---------------------------------------------------------------------------
# Load environment
# ---------------------------------------------------------------------------
[ -f .env ] || { echo "[deploy] ERROR: .env not found. Copy .env.example to .env and fill in the values."; exit 1; }
set -a; source .env; set +a

: "${DOMAIN:?Set DOMAIN in .env}"
: "${EMAIL:?Set EMAIL in .env}"

# Basic domain format validation
[[ "${DOMAIN}" =~ ^[a-zA-Z0-9]([a-zA-Z0-9.-]+)\.([a-zA-Z]{2,})$ ]] \
  || { echo "[deploy] ERROR: DOMAIN '${DOMAIN}' looks invalid."; exit 1; }

STAGING="${STAGING:-0}"
CERT_PATH="./data/certbot/conf/live/${DOMAIN}/fullchain.pem"

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------
log() { echo "[deploy] $*"; }

command -v docker &>/dev/null || { log "ERROR: Docker is not installed or not in PATH."; exit 1; }

# ---------------------------------------------------------------------------
# Create required directories
# ---------------------------------------------------------------------------
mkdir -p ./data/certbot/conf ./data/certbot/www

# ---------------------------------------------------------------------------
# Initial SSL setup (runs only when no certificate exists yet)
# ---------------------------------------------------------------------------
if [ ! -f "$CERT_PATH" ]; then
  log "No certificate found for ${DOMAIN}. Running initial SSL setup..."

  log "Generating temporary self-signed certificate..."
  docker run --rm \
    -v "$(pwd)/data/certbot/conf:/etc/letsencrypt" \
    --entrypoint sh certbot/certbot -c "
      mkdir -p /etc/letsencrypt/live/${DOMAIN}
      openssl req -x509 -nodes -newkey rsa:2048 -days 1 \
        -keyout /etc/letsencrypt/live/${DOMAIN}/privkey.pem \
        -out    /etc/letsencrypt/live/${DOMAIN}/fullchain.pem \
        -subj   '/CN=localhost' 2>/dev/null
    "

  log "Starting nginx + app with temporary certificate..."
  docker compose up -d nginx app

  log "Waiting for nginx to be ready..."
  sleep 5

  STAGING_FLAG=""
  [ "${STAGING}" = "1" ] && STAGING_FLAG="--staging"

  log "Requesting Let's Encrypt certificate for ${DOMAIN} and www.${DOMAIN}..."
  docker compose run --rm certbot certonly \
    --webroot \
    --webroot-path=/var/www/certbot \
    ${STAGING_FLAG} \
    --email "${EMAIL}" \
    --agree-tos \
    --no-eff-email \
    --force-renewal \
    -d "${DOMAIN}" \
    -d "www.${DOMAIN}"

  log "Reloading nginx with the real certificate..."
  docker compose exec nginx nginx -s reload

  log "SSL setup complete."
else
  log "Certificate found for ${DOMAIN}."
fi

# ---------------------------------------------------------------------------
# Build and (re)start all services
# ---------------------------------------------------------------------------
log "Building Docker image..."
docker compose build --pull app

log "Starting all services..."
docker compose up -d

log ""
log "Deployment complete! Application is available at https://${DOMAIN}"
