import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { RoughNotation, RoughNotationGroup } from "react-rough-notation";
import { Maxwidthdiv } from "./_components/Maxwindthdiv";
import { displayFont } from "./_components/fonts";
import { socials } from "./data";

export default function HomePage() {
  return (
    <Maxwidthdiv className="relative">
      <div className="bg-background/90 backdrop-blur-3xl">
        <Maxwidthdiv className="bg-background/90 mt-3 flex h-full flex-col items-center justify-end gap-12 backdrop-blur-3xl sm:mt-0 sm:h-screen-without-navbar md:flex-row md:justify-between">
          <div className="flex max-w-3xl flex-col gap-6 md:mb-28 md:gap-10">
            <h1
              className={cn(
                displayFont.className,
                "text-4xl font-bold text-primary md:text-5xl",
              )}
            >
              Hey there &#128075; <br /> I&apos;m{" "}
              <span className="text-secondary">Cat lover</span>, Developer, and
              Nerd.
            </h1>
            <div className="flex flex-col gap-6 leading-7">
              <RoughNotationGroup show>
                <p>
                  24 years old nerd who interested in several IT fields,
                  including <br className="sm:hidden" />
                  <RoughNotation type="highlight" color="var(--accent)">
                    Web development
                  </RoughNotation>
                  ,{" "}
                  <RoughNotation type="underline" color="var(--accent)">
                    Data Science
                  </RoughNotation>{" "}
                  / <br />
                  <RoughNotation type="underline" color="var(--accent)">
                    Data Analyst
                  </RoughNotation>
                  , and <br className="sm:hidden" />
                  <RoughNotation type="underline" color="var(--accent)">
                    Computer Graphics
                  </RoughNotation>
                  .
                </p>
                <p>
                  My most in-depth experience so far has been in{" "}
                  <RoughNotation type="underline" color="var(--accent)">
                    Web development
                  </RoughNotation>
                  . The frontend library I use is{" "}
                  <RoughNotation type="circle" color="var(--accent)">
                    Reactjs
                  </RoughNotation>
                  , while the framework I utilize for full-stack development is{" "}
                  <RoughNotation type="highlight" color="var(--accent)">
                    Next.js
                  </RoughNotation>
                  .
                </p>
                <p className="hidden sm:block">
                  Furthermore, in other IT fields, I primarily use{" "}
                  <RoughNotation type="underline" color="var(--accent)">
                    Python
                  </RoughNotation>{" "}
                  for data processing, and also I use{" "}
                  <RoughNotation type="circle" color="var(--accent)">
                    Vulkan API
                  </RoughNotation>{" "}
                  as the primary graphics API in my personal projects within
                  Computer Graphics.
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
      </div>

      <Image
        src="/shapes/blob.svg"
        alt="shapes"
        width={1024}
        height={600}
        className="absolute left-0 top-0 -z-10 h-[400px] w-[400px] opacity-30 dark:opacity-20 lg:bottom-5 lg:left-32 lg:h-[500px] lg:w-[500px]"
      />
      <Image
        src="/shapes/blob-2.svg"
        alt="shapes"
        width={1024}
        height={768}
        className="absolute right-20 top-10 -z-10 hidden h-[500px] w-[500px] opacity-40 dark:opacity-20 lg:block"
      />
    </Maxwidthdiv>
  );
}
