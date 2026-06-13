import { MotionDiv } from "@/lib/framer-motion";
import { sortPostsByDate } from "@/lib/content-utils.js";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Maxwidthdiv } from "./_components/Maxwindthdiv";
import { RoughBox, RoughUnderline } from "./_components/RoughNotation";
import { socials } from "./data";
import { posts } from "@/velite/posts";

const sortedPost = sortPostsByDate(posts).slice(0, 3);

import ImgHero from "@public/images/hero.png";
import Blog from "./blog/_components/Blog";
import { vandor } from "./organization/data";
import Projects from "./project/_components/Projects";
import { highlightedProjects } from "./project/shared";

export default function HomePage() {
  return (
    <div className="mb-20 flex flex-col gap-16 md:gap-32">
      <HeroSection />
      <div className="space-y-40 md:space-y-52">
        <OrganizationSection />
        <BlogSection />
        <ProjectSection />
      </div>
    </div>
  );
}

function HeroSection() {
  return (
    <Maxwidthdiv className="relative px-0">
      <div className="z-10 bg-background/60 backdrop-blur-2xl dark:bg-background/80 sm:backdrop-blur-3xl">
        <Maxwidthdiv className="mt-3 flex h-full flex-col items-center justify-end gap-12 sm:mt-0 sm:h-screen-without-navbar sm:pt-6 md:flex-row md:justify-between">
          <div className="flex max-w-3xl flex-col gap-6 md:mb-28 md:gap-10">
            <div className="flex flex-col-reverse gap-4 sm:flex-row">
              <div className="space-y-4">
                <h1
                  className={cn(
                    "font-display text-4xl font-black text-primary md:text-5xl md:leading-snug",
                  )}
                >
                  Building thoughtful software for real-world use.
                </h1>
              </div>
              <div className="relative mx-auto !aspect-square  h-[150px] overflow-clip rounded-full bg-primary p-0 shadow-lg sm:h-[150px]">
                <Image
                  src={ImgHero}
                  alt="Moh Rizal Alfarizi"
                  placeholder="blur"
                  width={200}
                  height={200}
                  className="aspect-square"
                  priority
                  draggable={false}
                />
              </div>
            </div>
            <div className="flex flex-col gap-6 leading-7">
              <p>
                I work across product, frontend, backend, and delivery to build
                systems that are{" "}
                <RoughUnderline multiline>
                  clear, reliable, and useful under real constraints
                </RoughUnderline>
                .
              </p>
              <p>
                That usually means choosing the quieter option when it is the
                better one, then making sure it still holds up once it meets
                production. A modest standard, but one that saves everyone time.
              </p>
              <p>
                I care about maintainability, sensible tradeoffs, and shipping
                work that is still understandable after the first enthusiastic
                week has passed.
              </p>
            </div>
          </div>
          <div className="mb-14 flex flex-col items-end gap-2 place-self-end">
            <p>You can also find me here.</p>
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

function BlogSection() {
  return (
    <Maxwidthdiv className="flex w-full flex-col items-center justify-center gap-8">
      <div>
        <h2 className="text-center font-display text-4xl font-medium">
          <RoughBox>Recent</RoughBox> Writing
        </h2>
      </div>
      <div className="flex w-full flex-col gap-10">
        <Blog
          posts={sortedPost.map((item) => ({
            ...item,
          }))}
        />
        <Link
          href="/blog"
          className="w-full rounded-md border-2 border-secondary bg-background px-4 py-2 text-center text-sm text-foreground duration-150 hover:bg-secondary/20"
        >
          Browse writing
        </Link>
      </div>
    </Maxwidthdiv>
  );
}

function OrganizationSection() {
  return (
    <Maxwidthdiv className="flex w-full flex-col items-center justify-center gap-8">
      <div>
        <h2 className="text-center font-display text-4xl font-medium">
          <RoughBox>Organization</RoughBox>
        </h2>
      </div>
      <div className="w-full rounded-[2rem] border border-primary/10 bg-background/80 p-6 shadow-sm backdrop-blur-sm sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                {vandor.name}
              </p>
              <p className="max-w-2xl text-sm leading-7 text-foreground/90 sm:text-base">
                {vandor.summary}
              </p>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
              {vandor.description}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/organization"
                className="rounded-md bg-primary px-4 py-2 text-sm text-background duration-150 hover:opacity-80"
              >
                Explore Organization
              </Link>
              <Link
                href={vandor.href}
                target="_blank"
                rel="noreferrer noopener"
                className="rounded-md border border-secondary bg-background px-4 py-2 text-sm text-foreground duration-150 hover:bg-secondary/20"
              >
                Visit Vandor
              </Link>
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Current products
            </p>
            <div className="grid gap-3">
              {vandor.products.map((product) => (
                <article
                  key={product.name}
                  className="rounded-2xl border border-primary/10 bg-secondary/20 p-4"
                >
                  <h3 className="font-display text-xl font-medium text-foreground">
                    {product.name}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {product.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Maxwidthdiv>
  );
}

function ProjectSection() {
  return (
    <Maxwidthdiv className="flex w-full flex-col items-center justify-center gap-8">
      <div>
        <h2 className="text-center font-display text-4xl">
          <RoughBox>Selected</RoughBox> Work
        </h2>
      </div>
      <div className="flex w-full flex-col gap-10">
        <Projects projects={highlightedProjects} />
        <Link
          href="/project"
          className="w-full rounded-md border-2 border-secondary bg-background px-4 py-2 text-center text-sm text-foreground duration-150 hover:bg-secondary/20"
        >
          Browse projects
        </Link>
      </div>
    </Maxwidthdiv>
  );
}
