import { type Metadata } from "next";
import Link from "next/link";
import { Maxwidthdiv } from "../_components/Maxwindthdiv";
import { RoughBox, RoughUnderline } from "../_components/RoughNotation";
import { vandor } from "./data";

export const metadata: Metadata = {
  title: "Organization",
  description:
    "A public overview of Vandor, the organization behind backend-focused tools, documentation, and writing.",
};

export default function OrganizationPage() {
  return (
    <Maxwidthdiv className="my-10 flex flex-col gap-10">
      <section className="rounded-[2rem] border border-primary/10 bg-background/80 p-6 shadow-sm backdrop-blur-sm sm:p-8 lg:p-10">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
            Organization
          </p>
          <h1 className="font-display text-4xl font-semibold tracking-tight text-primary sm:text-5xl">
            <RoughBox>{vandor.name}</RoughBox>
          </h1>
          <p className="max-w-3xl text-base leading-7 text-foreground/90 sm:text-lg">
            {vandor.summary}
          </p>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.9fr)]">
          <div className="space-y-4 text-sm leading-7 text-muted-foreground sm:text-base">
            <p>
              <RoughUnderline multiline>Backend-oriented</RoughUnderline>{" "}
              means the public surface stays practical: tools first, reference
              close to the product, and writing that explains the reasoning
              behind the choices.
            </p>
            <p>{vandor.description}</p>
          </div>

          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
              Current products
            </p>
            <div className="space-y-3">
              {vandor.products.map((product) => (
                <article
                  key={product.name}
                  className="rounded-2xl border border-primary/10 bg-secondary/20 p-4"
                >
                  <h2 className="font-display text-2xl font-medium text-foreground">
                    {product.name}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {product.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href={vandor.href}
            target="_blank"
            rel="noreferrer noopener"
            className="rounded-md bg-primary px-4 py-2 text-sm text-background duration-150 hover:opacity-80"
          >
            Visit Vandor
          </Link>
          <Link
            href="/"
            className="rounded-md border border-secondary bg-background px-4 py-2 text-sm text-foreground duration-150 hover:bg-secondary/20"
          >
            Back home
          </Link>
        </div>
      </section>
    </Maxwidthdiv>
  );
}
