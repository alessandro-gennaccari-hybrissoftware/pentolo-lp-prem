#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo "Building and starting services..."
docker compose up --build -d

echo ""
echo "Services started. Check status with:"
echo "  docker compose ps"
echo "  docker compose logs -f"
