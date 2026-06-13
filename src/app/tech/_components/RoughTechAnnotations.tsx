"use client";

import { useEffect, useMemo, useState } from "react";
import { RoughNotation } from "react-rough-notation";

const primaryColor = "hsl(var(--primary))";
const accentColor = "hsl(var(--accent))";

function useNotationReady() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  return ready;
}

export function HeroLeadAnnotation() {
  const ready = useNotationReady();

  return (
    <p className="max-w-3xl text-base leading-7 text-foreground/90 sm:text-lg">
      A selective view of the{" "}
      <RoughNotation
        type="underline"
        show={ready}
        color={accentColor}
        strokeWidth={2}
        padding={[0, 2]}
        multiline
      >
        <span>technologies I trust most in production</span>
      </RoughNotation>
      . This is less a catalog of everything I have touched, and more a record
      of the tools that keep showing up when the work needs to be{" "}
      <RoughNotation
        type="underline"
        show={ready}
        color={primaryColor}
        strokeWidth={2}
        padding={[0, 2]}
        multiline
      >
        <span>clear, durable, and ready to ship</span>
      </RoughNotation>
      .
    </p>
  );
}

export function SectionEyebrowAnnotation({ children }: { children: string }) {
  const ready = useNotationReady();

  return (
    <p className="text-sm text-muted-foreground">
      <RoughNotation
        type="underline"
        show={ready}
        color={accentColor}
        strokeWidth={1.5}
        padding={[0, 1]}
      >
        <span>{children}</span>
      </RoughNotation>
    </p>
  );
}

export function SectionTitleAnnotation({ title }: { title: string }) {
  const ready = useNotationReady();
  const [firstWord, ...restWords] = useMemo(() => title.split(" "), [title]);

  return (
    <h2 className="max-w-3xl text-balance font-display text-2xl font-medium leading-tight text-foreground sm:text-[2rem]">
      <RoughNotation
        type="box"
        show={ready}
        color={primaryColor}
        strokeWidth={1.5}
        padding={[1, 6]}
      >
        <span>{firstWord}</span>
      </RoughNotation>{" "}
      {restWords.join(" ")}
    </h2>
  );
}

export function AsideBracketAnnotation({ children }: { children: string }) {
  const ready = useNotationReady();

  return (
    <RoughNotation
      type="bracket"
      brackets={["right"]}
      show={ready}
      color={accentColor}
      strokeWidth={1.5}
      padding={[2, 0]}
      multiline
    >
      <span>{children}</span>
    </RoughNotation>
  );
}
