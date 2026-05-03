import { z } from "zod";

export const contactFormClientSchema = z.object({
  email: z.string().trim().email().max(254),
  message: z.string().trim().min(10).max(2_000),
});

const contactFormServerSchema = contactFormClientSchema;

export const CONTACT_RATE_LIMIT_MAX_REQUESTS = 3;
export const CONTACT_RATE_LIMIT_WINDOW_MS = 60_000;

/**
 * @param {{
 *   email?: string | null | undefined;
 *   message?: string | null | undefined;
 * }} input
 */
export function normalizeContactFormInput(input) {
  const parsedInput = contactFormServerSchema.safeParse(input);

  if (!parsedInput.success) {
    return {
      success: false,
      errors: parsedInput.error.flatten().fieldErrors,
    };
  }

  return {
    success: true,
    data: parsedInput.data,
  };
}

/**
 * @typedef {{
 *   count: number;
 *   resetAt: number;
 * }} ContactRateLimitEntry
 */

/**
 * @param {Map<string, ContactRateLimitEntry>} store
 * @param {string} key
 * @param {number} now
 */
export function consumeContactRateLimit(store, key, now) {
  const currentEntry = store.get(key);

  if (!currentEntry || now >= currentEntry.resetAt) {
    store.set(key, {
      count: 1,
      resetAt: now + CONTACT_RATE_LIMIT_WINDOW_MS,
    });

    return {
      allowed: true,
      remaining: CONTACT_RATE_LIMIT_MAX_REQUESTS - 1,
    };
  }

  if (currentEntry.count >= CONTACT_RATE_LIMIT_MAX_REQUESTS) {
    return {
      allowed: false,
      retryAfterSeconds: Math.ceil((currentEntry.resetAt - now) / 1_000),
    };
  }

  const nextCount = currentEntry.count + 1;
  store.set(key, {
    ...currentEntry,
    count: nextCount,
  });

  return {
    allowed: true,
    remaining: CONTACT_RATE_LIMIT_MAX_REQUESTS - nextCount,
  };
}
