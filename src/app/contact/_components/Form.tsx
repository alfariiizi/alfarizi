"use client";

import { Button } from "@/components/ui/button";
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
import { env } from "@/env";
import emailjs from "@emailjs/browser";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email(),
  message: z.string(),
});

type FormSchema = z.infer<typeof formSchema>;

export default function Form() {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      message: "",
    },
  });

  async function onSubmit(values: FormSchema) {
    const res = await emailjs
      .send(
        "service_phmvnjq",
        "template_djdmdim",
        {
          from_email: values.email,
          message: values.message,
        },
        {
          publicKey: env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
        },
      )
      .then(() => {
        return {
          ok: true,
        };
      })
      .catch((err) => {
        console.error(err);
        return {
          ok: false,
        };
      });

    // const data = new URLSearchParams();
    // data.append("email", values.email);
    // data.append("message", values.message);
    // const res = await fetch("/api/email", {
    //   method: "POST",
    //   body: data,
    // });
    // console.log(res);

    if (res.ok) {
      form.reset({
        email: "",
        message: "",
      });
    }
  }

  return (
    <FormRoot {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-5">
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
                  placeholder="I want to know more about you!"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={form.formState.isSubmitting}>
          Submit
        </Button>
      </form>
    </FormRoot>
  );
}
