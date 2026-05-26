import { MetadataRoute }
from "next"

export default function sitemap():
  MetadataRoute.Sitemap {

  return [

    {
      url:
        "https://serenihomes.vercel.app",

      lastModified:
        new Date(),

      changeFrequency:
        "daily",

      priority: 1,
    },

    {
      url:
        "https://serenihomes.vercel.app/properties",

      lastModified:
        new Date(),

      changeFrequency:
        "daily",

      priority: 0.9,
    },

    {
      url:
        "https://serenihomes.vercel.app/membership",

      lastModified:
        new Date(),

      changeFrequency:
        "weekly",

      priority: 0.8,
    },

    {
      url:
        "https://serenihomes.vercel.app/blog",

      lastModified:
        new Date(),

      changeFrequency:
        "weekly",

      priority: 0.7,
    },

    {
      url:
        "https://serenihomes.vercel.app/favorites",

      lastModified:
        new Date(),

      changeFrequency:
        "weekly",

      priority: 0.7,
    },
  ]
}