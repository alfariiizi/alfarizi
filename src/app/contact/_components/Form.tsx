"use client";

import { Button } from "@/components/ui/button";
import {
  CONTACT_HONEYPOT_FIELD_NAME,
  contactFormClientSchema,
} from "@/lib/contact-form.js";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form as FormRoot,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type FormSchema = typeof contactFormClientSchema._type;

export default function Form() {
  const form = useForm<FormSchema>({
    resolver: zodResolver(contactFormClientSchema),
    defaultValues: {
      company: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(values: FormSchema) {
    try {
      const data = new URLSearchParams();
      data.append(CONTACT_HONEYPOT_FIELD_NAME, values.company ?? "");
      data.append("email", values.email);
      data.append("message", values.message);

      const res = await fetch("/api/email", {
        method: "POST",
        body: data,
      });

      const payload = (await res.json().catch(() => null)) as
        | { message?: string }
        | null;

      if (!res.ok) {
        toast.error(
          payload?.message ?? "Failed to send your message. Please try again.",
          { duration: 4000 },
        );
        return;
      }

      toast.success(payload?.message ?? "Successfully sent an email!", {
        duration: 4000,
      });
      form.reset({
        company: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to send your message. Please try again.", {
        duration: 4000,
      });
    }
  }

  return (
    <FormRoot {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-5">
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden="true"
          {...form.register(CONTACT_HONEYPOT_FIELD_NAME)}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="someone@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  className="min-h-[8rem]"
                  placeholder="Let's connect with me!"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          size="lg"
          disabled={form.formState.isSubmitting}
          className="w-full md:w-24"
        >
          Send
        </Button>
      </form>
    </FormRoot>
  );
}
