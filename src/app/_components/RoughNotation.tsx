"use client";

import { useEffect, useState, type ReactNode } from "react";
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

export function RoughUnderline({
  children,
  color = accentColor,
  multiline = false,
  strokeWidth = 2,
  padding = [0, 2] as [number, number],
}: {
  children: ReactNode;
  color?: string;
  multiline?: boolean;
  strokeWidth?: number;
  padding?: [number, number];
}) {
  const ready = useNotationReady();

  return (
    <RoughNotation
      type="underline"
      show={ready}
      color={color}
      strokeWidth={strokeWidth}
      padding={padding}
      multiline={multiline}
    >
      <span>{children}</span>
    </RoughNotation>
  );
}

export function RoughBox({
  children,
  color = primaryColor,
  strokeWidth = 1.5,
  padding = [1, 6] as [number, number],
}: {
  children: ReactNode;
  color?: string;
  strokeWidth?: number;
  padding?: [number, number];
}) {
  const ready = useNotationReady();

  return (
    <RoughNotation
      type="box"
      show={ready}
      color={color}
      strokeWidth={strokeWidth}
      padding={padding}
    >
      <span>{children}</span>
    </RoughNotation>
  );
}

export function RoughBracketRight({
  children,
  color = accentColor,
  strokeWidth = 1.5,
  padding = [2, 0] as [number, number],
  multiline = true,
}: {
  children: ReactNode;
  color?: string;
  strokeWidth?: number;
  padding?: [number, number];
  multiline?: boolean;
}) {
  const ready = useNotationReady();

  return (
    <RoughNotation
      type="bracket"
      brackets={["right"]}
      show={ready}
      color={color}
      strokeWidth={strokeWidth}
      padding={padding}
      multiline={multiline}
    >
      <span>{children}</span>
    </RoughNotation>
  );
}
