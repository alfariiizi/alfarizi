import { Maxwidthdiv } from "../_components/Maxwindthdiv";
import Form from "./_components/Form";

export default function page() {
  return (
    <Maxwidthdiv className="mt-10 flex max-w-3xl flex-col gap-10">
      <div className="flex flex-col gap-2">
        <h1 className="font-display text-3xl font-bold text-primary sm:text-4xl">
          Get in Touch 🫱🏼‍🫲🏽
        </h1>
        <p className="text-sm leading-normal sm:text-base">
          Reach out to connect or collaborate with me. Whether you have
          questions, want to discuss a project, or simply want to say hello,
          feel free to send me an email.
        </p>
      </div>
      <Form />
    </Maxwidthdiv>
  );
}
