import { cn } from "@/lib/utils";
import Link from "next/link";
import { Maxwidthdiv } from "./_components/Maxwindthdiv";
import { displayFont } from "./_components/fonts";
import { socials } from "./data";

export default function HomePage() {
  return (
    <Maxwidthdiv
      className="h-screen-without-navbar flex flex-wrap items-center justify-between"
      // style={{
      //   height: `calc(100dvh - ${heightNavbar}px)`,
      // }}
    >
      <div className="flex max-w-3xl flex-col gap-10">
        <h1
          className={cn(
            displayFont.className,
            "text-primary text-5xl font-bold",
          )}
        >
          Hey there &#128075; <br /> I&apos;m{" "}
          <span className="text-secondary">Chocoholic</span>, Developer, and
          Nerd.
        </h1>
        <div className="flex flex-col gap-6">
          <p>
            24 years old nerd, passionate in web development, game, and
            chocklate.
          </p>
          <p>
            I write in Javascript, HTML, CSS, TailwindCSS, C/C++, Python, and
            Julia. I can to database and make servers do stuff.
          </p>
        </div>
      </div>
      <div className="mb-14 flex flex-col items-end gap-2 place-self-end">
        <p>You can find me there &#128071;</p>
        <div className="flex items-center gap-3">
          {socials.map((social) => (
            <Link
              key={social.label}
              href={social.href}
              title={social.label}
              target="_blank"
            >
              <social.icon className="h-6 w-6 duration-150 hover:opacity-80" />
            </Link>
          ))}
        </div>
      </div>
    </Maxwidthdiv>
  );
}
