import { TabsContent as TabsContentRaw } from "@radix-ui/react-tabs";
import { Tabs as TabsRoot, TabsList, TabsTrigger } from "@/components/ui/tabs";

import React, { Children, Fragment } from "react";
import { cn } from "@/lib/utils";

/* eslint-disable */

type Props = {
  onlyCode?: boolean;
  children: React.ReactNode;
};

export function Tabs({ onlyCode, children }: Props) {
  // @ts-ignore
  const mapped = Children.map(children, (child, index) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        ...child.props,
        isFirst: index === 0,
        isLast: !Array.isArray(children) || index === children.length - 1,
        onlyCode,
      });
    }
    return null;
  });
  const values = mapped?.map((child) => (child.props as any).value as string);

  return (
    <TabsRoot
      defaultValue={values?.[0]}
      className={cn(
        "relative mb-8 w-full rounded-[8px] bg-background",
        onlyCode && "max-w-[100vw] sm:w-full",
      )}
    >
      <TabsList className="z-40 bg-secondary text-secondary">
        {values?.map((val, idx, arr) => (
          <Fragment key={`tabs-${idx}-with-val-${val}`}>
            <TabsTrigger
              value={val}
              className="py-1 text-xs text-secondary-foreground md:text-sm"
            >
              {val}
            </TabsTrigger>
            {idx !== arr.length - 1 && (
              <div className="h-full w-[2px] border-r-2 border-r-secondary" />
            )}
          </Fragment>
        ))}
      </TabsList>
      <div
        tabIndex={-1}
        className={cn(
          "-mt-5 rounded-[8px] border-2 border-secondary bg-background pt-5",
          onlyCode ? "bg-[#1F2937] dark:bg-[#010304]" : "px-3 sm:px-4",
        )}
      >
        {onlyCode && (
          <div
            tabIndex={-1}
            className={cn(
              "absolute left-1/2 top-[39px] z-10 h-1 w-[99%] -translate-x-1/2 bg-[#1F2937] px-4 dark:bg-[#010304]",
            )}
          />
        )}
        {Children.map(children, (child: React.ReactNode) => {
          if (React.isValidElement(child) && child.type === TabsContent) {
            return React.cloneElement(child, {
              // @ts-ignore
              onlyCode, // what we want to inject it
              tabIndex: -1,
            });
          }
        })}
      </div>
    </TabsRoot>
  );
}

type TabsContentProps = React.ComponentPropsWithoutRef<
  typeof TabsContentRaw
> & {
  onlyCode?: boolean;
};

export const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsContentRaw>,
  TabsContentProps
>(({ onlyCode, className, ...props }, ref) => (
  <TabsContentRaw
    ref={ref}
    className={cn(
      "rounded-[8px] ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      onlyCode && "-mb-8 -mt-[34px]",
      className,
    )}
    {...props}
  />
));
TabsContent.displayName = TabsContentRaw.displayName;
