"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { capitalize } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { LuX } from "react-icons/lu";
import { allToolTags, tools, type Tag } from "./data";

function tagMapper(tag: Tag) {
  return tag
    .split("-")
    .map((word) => capitalize(word))
    .join(" ");
}

export default function PageClient() {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  return (
    <div className="space-y-14">
      <div className="space-y-8">
        <div className="flex gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-11">
                Filter tag
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Tags</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {allToolTags.map((tag) => (
                <DropdownMenuCheckboxItem
                  key={tag}
                  checked={selectedTags.includes(tag)}
                  onCheckedChange={() => {
                    setSelectedTags((prev) => {
                      if (prev.includes(tag)) {
                        return prev.filter((f) => f !== tag);
                      }
                      return [...prev, tag];
                    });
                  }}
                >
                  {tagMapper(tag)}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button onClick={() => setSelectedTags([])}>Reset</Button>
        </div>
        <div className="flex flex-wrap gap-4">
          {selectedTags.map((selectedTag) => (
            <button
              key={selectedTag}
              type="button"
              className="group inline-flex items-center gap-1 rounded-full border-2 border-secondary px-3 py-2 pl-6 text-sm duration-150 hover:bg-secondary/60"
              onClick={() => {
                setSelectedTags((prev) => {
                  return prev.filter((f) => f !== selectedTag);
                });
              }}
            >
              {tagMapper(selectedTag)}
              <LuX className="opacity-0 duration-150 group-hover:opacity-100" />
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap gap-6">
        {tools.map((tool) => {
          let isIncluded = false;
          selectedTags.forEach((tag) => {
            if (tool.tags.includes(tag)) {
              isIncluded = true;
            }
          });
          if (selectedTags.length === 0) {
            isIncluded = true;
          }

          if (isIncluded) {
            return (
              <AnimatePresence key={tool.label}>
                <motion.div
                  className="flex items-center justify-center gap-3 rounded-lg border-2 bg-secondary px-4 py-3 duration-200 hover:opacity-80"
                  initial={{
                    opacity: 0,
                    // borderColor: !firstRender
                    //   ? "hsl(var(--secondary))"
                    //   : "hsl(var(--accent))",
                  }}
                  animate={{
                    opacity: 1,
                    // borderColor: "hsl(var(--secondary))",
                  }}
                  exit={{
                    opacity: 0,
                    // borderColor: "hsl(var(--secondary))",
                  }}
                  transition={{
                    duration: 0.75,
                  }}
                >
                  <Image
                    src={tool.image.src}
                    alt={tool.label}
                    width={tool.image.width}
                    height={tool.image.height}
                    draggable={false}
                    className="max-w-[6vw]"
                  />
                  <p className="font-display text-sm sm:text-base">
                    {tool.label}
                  </p>
                </motion.div>
              </AnimatePresence>
            );
          }
        })}
      </div>
    </div>
  );
}
