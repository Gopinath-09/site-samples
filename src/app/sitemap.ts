import type { MetadataRoute } from "next";
import { company } from "@/lib/site";
import { blogPosts, caseStudies, products, services } from "@/lib/content";

/**
 * Because every navigation on the site is a router button (no <a> tags),
 * crawlers cannot discover interior pages by following links. This sitemap
 * is therefore the primary discovery path for search engines.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = company.siteUrl;

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/services`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/products`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/industries`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/technologies`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/case-studies`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/about`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/careers`, changeFrequency: "weekly", priority: 0.6 },
    { url: `${base}/blog`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/contact`, changeFrequency: "yearly", priority: 0.8 },
    { url: `${base}/privacy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/terms`, changeFrequency: "yearly", priority: 0.2 },
  ];

  const dynamicRoutes: MetadataRoute.Sitemap = [
    ...services.map((s) => ({
      url: `${base}/services/${s.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...products.map((p) => ({
      url: `${base}/products/${p.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...caseStudies.map((c) => ({
      url: `${base}/case-studies/${c.slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
    ...blogPosts.map((b) => ({
      url: `${base}/blog/${b.slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  ];

  return [...staticRoutes, ...dynamicRoutes];
}
