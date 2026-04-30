"use client";

import { IconSearch } from "@tabler/icons-react";

import { Input } from "./ui/input";

export function SearchFilter({
  className,
  search,
  setSearch,
  placeHolder,
}: {
  className?: string;
  placeHolder?: string;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div className={`${className} relative`}>
      <IconSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={placeHolder}
        className="pl-9"
      />
    </div>
  );
}
