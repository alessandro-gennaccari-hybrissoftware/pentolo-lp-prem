// Built-in
import { MetadataRoute } from "next"
// Config
import { host } from "@/config"
import { routing } from "@/i18n/routing"

/**
 * Sitemap configuration for SEO.
 * This helps search engines discover and index all pages of your site.
 *
 * Important for multilingual sites: includes alternate language versions (hreflang).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  // init-TODO: Add all your static pages here
  // For each page, include all language variants
  const pages: MetadataRoute.Sitemap = [
    // Homepage for all languages
    {
      url: `${host}/${routing.defaultLocale}`, // Main URL (Italian)
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: {
          it: `${host}/it`,
          en: `${host}/en`,
        },
      },
    },
  ]

  return pages
}
