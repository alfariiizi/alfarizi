import React from "react";

type Props = {
  children: React.ReactNode;
  tag?: string;
};

export function Math({ children, tag }: Props) {
  return (
    <div className="mb-6 flex w-full items-center justify-between gap-3">
      <div className="inline-flex w-full justify-center">{children}</div>
      {tag && <div className="w-fit font-serif">({tag})</div>}
    </div>
  );
}
