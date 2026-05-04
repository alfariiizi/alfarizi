import { z } from "zod";

export const CONTACT_SUCCESS_MESSAGE = "Email sent successfully.";
export const CONTACT_INVALID_MESSAGE = "Invalid contact form submission.";
export const CONTACT_RATE_LIMIT_MESSAGE =
  "Too many contact attempts. Please try again in a minute.";
export const CONTACT_DELIVERY_FAILURE_MESSAGE =
  "Unable to send your message right now.";
export const CONTACT_HONEYPOT_FIELD_NAME = "company";

export const contactFormClientSchema = z.object({
  email: z.string().trim().email().max(254),
  message: z.string().trim().min(10).max(2_000),
  [CONTACT_HONEYPOT_FIELD_NAME]: z.string().optional().default(""),
});

const contactFormServerSchema = contactFormClientSchema.extend({
  [CONTACT_HONEYPOT_FIELD_NAME]: z.string().trim().max(200).optional().default(""),
});

export const CONTACT_RATE_LIMIT_MAX_REQUESTS = 3;
export const CONTACT_RATE_LIMIT_WINDOW_MS = 60_000;

/**
 * @param {{
 *   email?: string | null | undefined;
 *   message?: string | null | undefined;
 *   company?: string | null | undefined;
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

/**
 * @param {{
 *   requestId: string;
 *   retryAfterSeconds: number;
 * }} input
 */
export function createContactRateLimitResponse(input) {
  return Response.json(
    {
      message: CONTACT_RATE_LIMIT_MESSAGE,
    },
    {
      status: 429,
      headers: {
        "Retry-After": `${input.retryAfterSeconds}`,
        "X-Request-Id": input.requestId,
      },
    },
  );
}

/**
 * @param {{
 *   honeypot?: string | null | undefined;
 *   origin?: string | null | undefined;
 *   requestUrl: string;
 * }} input
 */
export function evaluateContactRequest(input) {
  const honeypot = input.honeypot?.trim();

  if (honeypot) {
    return {
      action: "accept_without_delivery",
      responseMessage: CONTACT_SUCCESS_MESSAGE,
      reason: "honeypot_filled",
    };
  }

  if (!input.origin) {
    return {
      action: "allow",
    };
  }

  try {
    const requestOrigin = new URL(input.requestUrl).origin;
    const origin = new URL(input.origin).origin;

    if (origin !== requestOrigin) {
      return {
        action: "reject",
        reason: "origin_mismatch",
      };
    }
  } catch {
    return {
      action: "reject",
      reason: "origin_invalid",
    };
  }

  return {
    action: "allow",
  };
}
