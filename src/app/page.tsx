import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { RoughNotation, RoughNotationGroup } from "react-rough-notation";
import { Maxwidthdiv } from "./_components/Maxwindthdiv";
import { displayFont } from "./_components/fonts";
import { socials } from "./data";

export default function HomePage() {
  return (
    <>
      <Maxwidthdiv className="h-screen-without-navbar bg-background/90 flex flex-col items-center justify-end gap-20 backdrop-blur-3xl md:flex-row md:justify-between">
        <div className="flex max-w-3xl flex-col gap-10 md:mb-28">
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
            <RoughNotationGroup show>
              <p>
                24 years old nerd, passionate in{" "}
                <RoughNotation type="highlight" color="var(--accent)">
                  web development
                </RoughNotation>
                ,{" "}
                <RoughNotation type="underline" color="var(--accent)">
                  game
                </RoughNotation>
                ,{" "}
                <RoughNotation type="circle" color="var(--accent)">
                  data
                </RoughNotation>
                , and{" "}
                <RoughNotation type="underline" color="var(--accent)">
                  chocolate
                </RoughNotation>
                .
              </p>
              <p>
                I write in{" "}
                <RoughNotation type="crossed-off" color="var(--accent)">
                  HTML
                </RoughNotation>
                ,{" "}
                <RoughNotation type="crossed-off" color="var(--accent)">
                  CSS
                </RoughNotation>
                ,{" "}
                <RoughNotation type="underline" color="var(--accent)">
                  Javascript
                </RoughNotation>
                ,{" "}
                <RoughNotation type="highlight" color="var(--accent)">
                  Reactjs
                </RoughNotation>
                ,{" "}
                <RoughNotation type="circle" color="var(--accent)">
                  TailwindCSS
                </RoughNotation>
                ,{" "}
                <RoughNotation type="underline" color="var(--accent)">
                  C/C++
                </RoughNotation>
                ,{" "}
                <RoughNotation type="circle" color="var(--accent)">
                  Python
                </RoughNotation>
                , and{" "}
                <RoughNotation type="underline" color="var(--accent)">
                  Julia
                </RoughNotation>
                . I can do database and make servers do stuff.
              </p>
            </RoughNotationGroup>
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
        {/* <ReactSVG src="/shapes/blob.svg" /> */}
      </Maxwidthdiv>

      <Image
        src="/shapes/blob.svg"
        alt="shapes"
        width={1024}
        height={600}
        className="absolute left-0 top-0 -z-10 h-[400px] w-[400px] opacity-30 lg:bottom-5 lg:left-32 lg:h-[500px] lg:w-[500px] dark:opacity-20"
      />
      <Image
        src="/shapes/blob-2.svg"
        alt="shapes"
        width={1024}
        height={768}
        className="absolute right-20 top-10 -z-10 hidden h-[500px] w-[500px] opacity-40 lg:block dark:opacity-20"
      />
    </>
  );
}
