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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
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
    const data = new URLSearchParams();
    data.append("email", values.email);
    data.append("message", values.message);
    const res = await fetch("/api/email", {
      method: "POST",
      body: data,
    });

    if (res.ok) {
      toast.success("Successfully send an email!", { duration: 4000 });
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
