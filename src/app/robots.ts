import { env } from "@/env";
import { type MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
      },
    ],
    sitemap: `${env.NEXT_PUBLIC_URL}/sitemap.xml`,
    host: env.NEXT_PUBLIC_URL,
  };
}
