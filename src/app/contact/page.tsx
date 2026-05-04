import { type Metadata } from "next";
import { Maxwidthdiv } from "../_components/Maxwindthdiv";
import Form from "./_components/Form";

const title = "Contact";
const description =
  "If you want to discuss engineering, product, or a project that needs careful execution, send a note. I read them myself, which keeps the process honest.";

export const metadata: Metadata = {
  title: {
    absolute: title,
  },
  description: description,
};

export default function page() {
  return (
    <Maxwidthdiv className="mt-10 flex max-w-3xl flex-col gap-10">
      <div className="flex flex-col gap-2">
        <h1 className="font-display text-3xl font-bold text-primary sm:text-4xl">
          {title}
        </h1>
        <p className="text-sm leading-normal sm:text-base">{description}</p>
      </div>
      <Form />
    </Maxwidthdiv>
  );
}
