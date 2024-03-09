import ContactFormEmail from "@/email/contact-form-email";
import { env } from "@/env";
import React from "react";
import { Resend } from "resend";

const resend = new Resend(env.RESEND_API_KEY);

export async function POST(req: Request) {
  const formData = await req.formData();
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  await resend.emails.send({
    from: `Contact Alfarizi <onboarding@resend.dev>`,
    to: "rizal.alfariiiziii@gmail.com",
    subject: `${email} has sent you something from your website`,
    reply_to: email,
    react: React.createElement(ContactFormEmail, {
      emailSender: email,
      message,
    }),
  });

  return new Response();
}
