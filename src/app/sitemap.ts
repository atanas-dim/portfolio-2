import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://adimitrov.com',
      lastModified: new Date(),
    },
  ]
}
