import { MotionDiv } from "@/lib/framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { RoughNotation, RoughNotationGroup } from "react-rough-notation";
import { Maxwidthdiv } from "./_components/Maxwindthdiv";
import { socials } from "./data";

import ImgHero from "@public/images/hero.png";

export default function HomePage() {
  return (
    <Maxwidthdiv className="relative px-0">
      <div className="z-10 bg-background/60 backdrop-blur-2xl dark:bg-background/80 sm:backdrop-blur-3xl">
        <Maxwidthdiv className="mt-3 flex h-full flex-col items-center justify-end gap-12 sm:mt-0 sm:h-screen-without-navbar sm:pt-6 md:flex-row md:justify-between">
          <div className="flex max-w-3xl flex-col gap-6 md:mb-28 md:gap-10">
            <div className="flex flex-col-reverse gap-4 sm:flex-row">
              <h1
                className={cn(
                  "font-display text-4xl font-black text-primary md:text-5xl md:leading-snug",
                )}
              >
                Hey there &#128075; <br /> I&apos;m a{" "}
                <span className="text-secondary">Cat lover</span>, Developer,
                and Nerd.
              </h1>
              <div className="relative mx-auto !aspect-square h-[150px] w-[150px] overflow-clip rounded-full bg-primary p-2 shadow-lg sm:h-[120px]">
                <Image
                  src={ImgHero}
                  alt="Alfarizi"
                  placeholder="blur"
                  width={200}
                  height={200}
                  className="absolute aspect-square"
                  priority
                  draggable={false}
                />
              </div>
            </div>
            <div className="flex flex-col gap-6 leading-7">
              <RoughNotationGroup show>
                <p>
                  24 years old nerd who interested in several IT fields,
                  including <br className="sm:hidden" />
                  <RoughNotation type="highlight" color="hsl(var(--accent))">
                    Web development
                  </RoughNotation>
                  ,{" "}
                  <RoughNotation type="underline" color="hsl(var(--accent))">
                    Data Science
                  </RoughNotation>{" "}
                  / <br />
                  <RoughNotation type="underline" color="hsl(var(--accent))">
                    Data Analyst
                  </RoughNotation>
                  , and <br className="sm:hidden" />
                  <RoughNotation type="underline" color="hsl(var(--accent))">
                    Computer Graphics
                  </RoughNotation>
                  .
                </p>
                <p>
                  My most in-depth experience so far has been in{" "}
                  <RoughNotation type="underline" color="hsl(var(--accent))">
                    Web development
                  </RoughNotation>
                  . The frontend library I use is{" "}
                  <RoughNotation type="circle" color="hsl(var(--accent))">
                    Reactjs
                  </RoughNotation>
                  , while the framework I utilize for full-stack development is{" "}
                  <RoughNotation type="highlight" color="hsl(var(--accent))">
                    Next.js
                  </RoughNotation>
                  .
                </p>
                <p className="">
                  Furthermore, in other IT fields, I primarily use{" "}
                  <RoughNotation type="underline" color="hsl(var(--accent))">
                    Python
                  </RoughNotation>{" "}
                  for data processing, and also I use{" "}
                  <RoughNotation type="circle" color="hsl(var(--accent))">
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

      <MotionDiv
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 3.5,
          ease: "easeInOut",
        }}
        className="absolute left-0 top-0 -z-10 h-[300px] w-[300px] opacity-30 dark:opacity-20 lg:bottom-5 lg:left-32 lg:h-[500px] lg:w-[500px]"
      >
        <Image
          src="/shapes/blob.svg"
          alt="shapes"
          width={1024}
          height={600}
          className=""
          draggable={false}
        />
      </MotionDiv>
      <MotionDiv
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 4,
          ease: "easeInOut",
        }}
        className="absolute right-20 top-10 -z-10 hidden h-[500px] w-[500px] opacity-40 dark:opacity-20 lg:block"
      >
        <Image
          src="/shapes/blob-2.svg"
          alt="shapes"
          width={1024}
          height={768}
          className=""
          draggable={false}
        />
      </MotionDiv>
    </Maxwidthdiv>
  );
}
