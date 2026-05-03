import test from "node:test";
import assert from "node:assert/strict";

import {
  consumeContactRateLimit,
  normalizeContactFormInput,
} from "../src/lib/contact-form.js";

test("normalizeContactFormInput trims and validates contact payload", () => {
  const result = normalizeContactFormInput({
    email: "  hello@example.com  ",
    message: "  This is a valid message body.  ",
  });

  assert.equal(result.success, true);
  assert.deepEqual(result.data, {
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
