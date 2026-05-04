import ContactFormEmail from "@/email/contact-form-email";
import { env } from "@/env";
import {
  CONTACT_DELIVERY_FAILURE_MESSAGE,
  CONTACT_HONEYPOT_FIELD_NAME,
  CONTACT_INVALID_MESSAGE,
  CONTACT_SUCCESS_MESSAGE,
  consumeContactRateLimit,
  createContactRateLimitResponse,
  evaluateContactRequest,
  normalizeContactFormInput,
} from "@/lib/contact-form.js";
import React from "react";
import { Resend } from "resend";

const resend = new Resend(env.RESEND_API_KEY);
type ContactRateLimitStore = Map<string, { count: number; resetAt: number }>;
const globalForContactRateLimit = globalThis as typeof globalThis & {
  __contactRateLimitStore?: ContactRateLimitStore;
};
const contactRateLimitStore =
  globalForContactRateLimit.__contactRateLimitStore ??
  (globalForContactRateLimit.__contactRateLimitStore =
    new Map<string, { count: number; resetAt: number }>());

export async function POST(req: Request) {
  const requestId = crypto.randomUUID();
  const formData = await req.formData();
  const parsedInput = normalizeContactFormInput({
    email: formData.get("email")?.toString(),
    message: formData.get("message")?.toString(),
    [CONTACT_HONEYPOT_FIELD_NAME]: formData
      .get(CONTACT_HONEYPOT_FIELD_NAME)
      ?.toString(),
  });

  if (!parsedInput.success) {
    console.warn("Contact form rejected: invalid payload", {
      requestId,
      reason: "invalid_payload",
    });

    return Response.json(
      {
        message: CONTACT_INVALID_MESSAGE,
        errors: parsedInput.errors,
      },
      {
        status: 400,
        headers: {
          "X-Request-Id": requestId,
        },
      },
    );
  }

  const contactData = parsedInput.data;

  if (!contactData) {
    console.warn("Contact form rejected: missing normalized payload", {
      requestId,
      reason: "missing_payload",
    });

    return Response.json(
      {
        message: CONTACT_INVALID_MESSAGE,
      },
      {
        status: 400,
        headers: {
          "X-Request-Id": requestId,
        },
      },
    );
  }

  const requestEvaluation = evaluateContactRequest({
    honeypot: contactData.company,
    origin: req.headers.get("origin"),
    requestUrl: req.url,
  });

  const emailDomain = contactData.email.split("@")[1] ?? "unknown";
  const logContext = {
    requestId,
    emailDomain,
    messageLength: contactData.message.length,
  };

  if (requestEvaluation.action === "accept_without_delivery") {
    console.warn("Contact form blocked by honeypot", {
      ...logContext,
      reason: requestEvaluation.reason,
    });

    return Response.json(
      {
        message: requestEvaluation.responseMessage,
      },
      {
        status: 200,
        headers: {
          "X-Request-Id": requestId,
        },
      },
    );
  }

  if (requestEvaluation.action === "reject") {
    console.warn("Contact form rejected by origin policy", {
      ...logContext,
      reason: requestEvaluation.reason,
    });

    return Response.json(
      {
        message: CONTACT_INVALID_MESSAGE,
      },
      {
        status: 403,
        headers: {
          "X-Request-Id": requestId,
        },
      },
    );
  }

  const rateLimit = consumeContactRateLimit(
    contactRateLimitStore,
    contactData.email,
    Date.now(),
  );

  if (!rateLimit.allowed) {
    const retryAfterSeconds = rateLimit.retryAfterSeconds ?? 60;

    console.warn("Contact form rate limited", {
      ...logContext,
      reason: "rate_limited",
      retryAfterSeconds,
    });

    return createContactRateLimitResponse({
      requestId,
      retryAfterSeconds,
    });
  }

  try {
    const response = await resend.emails.send({
      from: `Contact Alfarizi <onboarding@resend.dev>`,
      to: "rizal.alfariiiziii@gmail.com",
      subject: `${contactData.email} has sent you something from your website`,
      reply_to: contactData.email,
      react: React.createElement(ContactFormEmail, {
        emailSender: contactData.email,
        message: contactData.message,
      }),
    });

    if (response.error) {
      console.error("Resend API error", {
        ...logContext,
        resendError: response.error,
      });

      return Response.json(
        {
          message: CONTACT_DELIVERY_FAILURE_MESSAGE,
        },
        {
          status: 502,
          headers: {
            "X-Request-Id": requestId,
          },
        },
      );
    }
  } catch (error) {
    console.error("Unexpected contact form error", {
      ...logContext,
      error,
    });

    return Response.json(
      {
        message: CONTACT_DELIVERY_FAILURE_MESSAGE,
      },
      {
        status: 502,
        headers: {
          "X-Request-Id": requestId,
        },
      },
    );
  }

  console.info("Contact form delivered successfully", logContext);

  return Response.json(
    {
      message: CONTACT_SUCCESS_MESSAGE,
    },
    {
      status: 200,
      headers: {
        "X-Request-Id": requestId,
      },
    },
  );
}
