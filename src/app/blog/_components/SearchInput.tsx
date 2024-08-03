"use client";

import { useQueryState, parseAsString } from "nuqs";

import { Input } from "@/components/ui/input";
import { LuSearch } from "react-icons/lu";
import { useEffect, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";

type Props = {
  initialParams: {
    search?: string;
  };
};

export default function SearchInput({ initialParams }: Props) {
  const [searchUrl, setSearchUrl] = useQueryState(
    "search",
    parseAsString.withDefault(initialParams.search ?? ""),
  );
  const [search, setSearch] = useState(searchUrl);
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    async function updateSearchUrl() {
      try {
        await setSearchUrl(debouncedSearch, {
          shallow: true,
        });
      } catch (error) {
        console.error(error);
      }
    }

    /* eslint-disable @typescript-eslint/no-floating-promises */
    updateSearchUrl();
  }, [debouncedSearch, search, setSearchUrl]);

  return (
    <div className="relative">
      <Input
        type="search"
        value={search}
        onChange={async (e) => {
          setSearch(e.target.value);
        }}
        placeholder="Search posts"
        className="pl-10"
      />
      <LuSearch className="absolute left-2 top-2 size-6 stroke-secondary" />
    </div>
  );
}
