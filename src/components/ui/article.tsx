import { cn } from "@/lib/utils";
import React from "react";

/**
 * Article (Root)
 * ArticleTitle
 * ArticleDescription
 * ArticleDetail
 */

const Article = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <article
    ref={ref}
    className={cn(
      "flex w-full max-w-[80ch] flex-col gap-6 divide-y-2 divide-dashed divide-gray-300 dark:divide-gray-800",
      "relative mx-auto px-4 pb-16 pt-10 text-foreground",
      className,
    )}
    {...props}
  />
));
Article.displayName = "Article";

const ArticleHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col gap-2", className)} {...props} />
));
ArticleHeader.displayName = "ArticleHeader";

const ArticleFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col gap-2 pt-6", className)}
    {...props}
  />
));
ArticleFooter.displayName = "ArticleFooter";

const ArticleContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("prose w-full pt-6 dark:prose-invert", className)}
    {...props}
  />
));
ArticleContent.displayName = "ArticleContent";

export { Article, ArticleContent, ArticleFooter, ArticleHeader };
