import ContactFormEmail from "@/email/contact-form-email";
import { env } from "@/env";
import {
  consumeContactRateLimit,
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
  const formData = await req.formData();
  const parsedInput = normalizeContactFormInput({
    email: formData.get("email")?.toString(),
    message: formData.get("message")?.toString(),
  });

  if (!parsedInput.success) {
    return Response.json(
      {
        message: "Invalid contact form submission.",
        errors: parsedInput.errors,
      },
      { status: 400 },
    );
  }

  const contactData = parsedInput.data;

  if (!contactData) {
    return Response.json(
      {
        message: "Invalid contact form submission.",
      },
      { status: 400 },
    );
  }

  const rateLimit = consumeContactRateLimit(
    contactRateLimitStore,
    contactData.email,
    Date.now(),
  );

  if (!rateLimit.allowed) {
    return Response.json(
      {
        message: "Too many contact attempts. Please try again in a minute.",
      },
      {
        status: 429,
        headers: {
          "Retry-After": `${rateLimit.retryAfterSeconds}`,
        },
      },
    );
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
      console.error("Resend API error", response.error);
      return Response.json(
        {
          message: "Unable to send your message right now.",
        },
        { status: 502 },
      );
    }
  } catch (error) {
    console.error("Unexpected contact form error", error);
    return Response.json(
      {
        message: "Unable to send your message right now.",
      },
      { status: 502 },
    );
  }

  return Response.json(
    {
      message: "Email sent successfully.",
    },
    { status: 200 },
  );
}
