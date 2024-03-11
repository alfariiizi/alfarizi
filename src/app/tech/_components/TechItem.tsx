import Link from "next/link";
import React from "react";

type Props = {
  children: React.ReactNode;
  heading: string;
  techList?: string[];
};

export default function TechItem({ heading, techList, children }: Props) {
  return (
    <div className="relative ml-3 border-l-2 border-secondary">
      <div className="absolute -left-2 top-5 h-4 w-4 translate-y-1/2 rounded-full bg-accent" />
      <div className="py-6 pl-10 [&>p]:mb-2 [&>p]:mt-1 [&>p]:text-sm [&>p]:leading-normal [&>p]:sm:text-base">
        <div className="mb-4 space-y-0">
          <h2 className="font-display text-lg font-semibold text-primary sm:text-xl">
            {heading}
          </h2>
          <p className="font-display text-sm text-secondary sm:text-base">
            {techList?.map((item, index, array) => {
              return (
                <React.Fragment key={item}>
                  <Link
                    href={`/tag/${item}`}
                    className="underline decoration-2 underline-offset-[3px] duration-150 hover:opacity-75"
                  >
                    {item}
                  </Link>
                  {index !== array.length - 1
                    ? index !== array.length - 2
                      ? ", "
                      : array.length === 2
                        ? " and "
                        : ", and "
                    : "."}
                </React.Fragment>
              );
            })}
          </p>
        </div>
        {children}
      </div>
    </div>
  );
}
