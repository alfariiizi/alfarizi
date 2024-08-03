import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]),
    PROJECT_NAME: z.string(),
    DOMAIN_URL: z
      .string()
      .optional()
      .transform((val) => (!!val ? new URL(val) : undefined)),
    APP_URL: z
      .string()
      .transform((val) =>
        !!process.env.DOMAIN_URL ? process.env.DOMAIN_URL : val,
      ),
    RESEND_API_KEY: z.string(),
    UMAMI_DATA_WEBSITE_ID: z.string().optional(),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {},

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    // [Server]
    NODE_ENV: process.env.NODE_ENV,
    PROJECT_NAME: "Alfarizi",
    DOMAIN_URL: process.env.DOMAIN_URL,
    APP_URL: process.env.APP_URL,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    UMAMI_DATA_WEBSITE_ID: process.env.UMAMI_DATA_WEBSITE_ID,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
   * `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
});
