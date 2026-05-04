import test from "node:test";
import assert from "node:assert/strict";

import {
  CONTACT_RATE_LIMIT_MESSAGE,
  CONTACT_SUCCESS_MESSAGE,
  createContactRateLimitResponse,
  consumeContactRateLimit,
  evaluateContactRequest,
  normalizeContactFormInput,
} from "../src/lib/contact-form.js";

test("normalizeContactFormInput trims and validates contact payload", () => {
  const result = normalizeContactFormInput({
    email: "  hello@example.com  ",
    message: "  This is a valid message body.  ",
  });

  assert.equal(result.success, true);
  assert.deepEqual(result.data, {
    company: "",
    email: "hello@example.com",
    message: "This is a valid message body.",
  });
});

test("normalizeContactFormInput rejects invalid payloads", () => {
  const result = normalizeContactFormInput({
    email: "not-an-email",
    message: "short",
  });

  assert.equal(result.success, false);
  assert.ok(result.errors.email?.length);
  assert.ok(result.errors.message?.length);
});

test("consumeContactRateLimit blocks requests over the configured limit", () => {
  const store = new Map();
  const now = 1_000;

  const firstAttempt = consumeContactRateLimit(store, "hello@example.com", now);
  const secondAttempt = consumeContactRateLimit(
    store,
    "hello@example.com",
    now + 5_000,
  );
  const thirdAttempt = consumeContactRateLimit(
    store,
    "hello@example.com",
    now + 10_000,
  );
  const blockedAttempt = consumeContactRateLimit(
    store,
    "hello@example.com",
    now + 15_000,
  );

  assert.equal(firstAttempt.allowed, true);
  assert.equal(secondAttempt.allowed, true);
  assert.equal(thirdAttempt.allowed, true);
  assert.equal(blockedAttempt.allowed, false);
  assert.equal(blockedAttempt.retryAfterSeconds, 45);
});

test("consumeContactRateLimit resets after the time window passes", () => {
  const store = new Map();
  const now = 2_000;

  consumeContactRateLimit(store, "hello@example.com", now);
  consumeContactRateLimit(store, "hello@example.com", now + 5_000);
  consumeContactRateLimit(store, "hello@example.com", now + 10_000);

  const resetAttempt = consumeContactRateLimit(
    store,
    "hello@example.com",
    now + 61_000,
  );

  assert.equal(resetAttempt.allowed, true);
  assert.equal(resetAttempt.remaining, 2);
});

test("createContactRateLimitResponse keeps the user-facing payload stable", async () => {
  const response = createContactRateLimitResponse({
    requestId: "req_test_123",
    retryAfterSeconds: 42,
  });

  assert.equal(response.status, 429);
  assert.equal(response.headers.get("Retry-After"), "42");
  assert.equal(response.headers.get("X-Request-Id"), "req_test_123");
  assert.deepEqual(await response.json(), {
    message: CONTACT_RATE_LIMIT_MESSAGE,
  });
});

test("evaluateContactRequest allows normal submissions", () => {
  const result = evaluateContactRequest({
    honeypot: "",
    origin: "https://alfarizi.dev",
    requestUrl: "https://alfarizi.dev/api/email",
  });

  assert.deepEqual(result, {
    action: "allow",
  });
});

test("evaluateContactRequest treats a filled honeypot as spam and acknowledges it", () => {
  const result = evaluateContactRequest({
    honeypot: "Acme Inc",
    origin: "https://alfarizi.dev",
    requestUrl: "https://alfarizi.dev/api/email",
  });

  assert.deepEqual(result, {
    action: "accept_without_delivery",
    responseMessage: CONTACT_SUCCESS_MESSAGE,
    reason: "honeypot_filled",
  });
});

test("evaluateContactRequest rejects a mismatched origin header", () => {
  const result = evaluateContactRequest({
    honeypot: "",
    origin: "https://malicious.example",
    requestUrl: "https://alfarizi.dev/api/email",
  });

  assert.deepEqual(result, {
    action: "reject",
    reason: "origin_mismatch",
  });
});
