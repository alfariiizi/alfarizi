import createMDX from "@next/mdx";
import withPlaiceholder from "@plaiceholder/next";
import rehypeKatex from "rehype-katex";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkMath from "remark-math";
import { build } from "velite";

/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

const withMDX = createMDX({
  // Add markdown plugins here, as desired
  options: {
    remarkPlugins: [remarkMath],
    // @ts-ignore
    rehypePlugins: [
      rehypeSlug,
      rehypeKatex,
      [
        rehypePrettyCode,
        {
          grid: true,
          theme: "dark-plus",
          keepBackground: false,
        },
      ],
    ],
  },
});

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  webpack: (config) => {
    config.plugins.push(new VeliteWebpackPlugin());
    return config;
  },
  async redirects() {
    return [
      {
        source: "/social/instagram",
        destination: "https://www.instagram.com/alfariiiziii_/",
        permanent: true,
      },
      {
        source: "/social/twitter",
        destination: "https://x.com/alfariiiziiiii",
        permanent: true,
      },
      {
        source: "/social/linkedin",
        destination:
          "https://www.linkedin.com/in/moh-rizal-alfarizi-3809b9246/",
        permanent: true,
      },
      {
        source: "/social/github",
        destination: "https://github.com/alfariiizi",
        permanent: true,
      },
    ];
  },
};

class VeliteWebpackPlugin {
  static started = false;
  constructor(/** @type {import('velite').Options} */ options = {}) {
    this.options = options;
  }
  // @ts-ignore
  apply(compiler) {
    // executed three times in nextjs !!!
    // twice for the server (nodejs / edge runtime) and once for the client
    compiler.hooks.beforeCompile.tapPromise("VeliteWebpackPlugin", async () => {
      if (VeliteWebpackPlugin.started) return;
      VeliteWebpackPlugin.started = true;
      const dev = compiler.options.mode === "development";
      this.options.watch = this.options.watch ?? dev;
      this.options.clean = this.options.clean ?? !dev;
      await build(this.options); // start velite
    });
  }
}

export default withMDX(withPlaiceholder(config));
