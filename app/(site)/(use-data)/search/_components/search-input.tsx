"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import { cn } from "@/lib/utils";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { ElementRef, useEffect, useRef, useState } from "react";

export const SearchInput = () => {
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const inputRef = useRef<ElementRef<"input">>(null);
  const debounceValue = useDebounce(searchText);

  const searchParam = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const param = new URLSearchParams(searchParam.toString());
    if (!param.get("title") && !debounceValue) {
      return;
    }
    param.set("title", debounceValue);
    router.push(`${pathname}?${param.toString()}`);
  }, [debounceValue]);

  const handleSearchBtnClick = () => {
    setIsTyping(true);
    setTimeout(() => {
      inputRef.current?.focus();
    });
  };

  const onBlurInput = () => {
    setIsTyping(false);
  };
  const onFocusInput = () => {
    setIsTyping(true);
  };

  if (!isTyping && !searchText) {
    return (
      <Button
        variant="outline"
        className="rounded-full flex items-center justify-center gap-x-3 w-auto h-[50px]"
        onClick={handleSearchBtnClick}
      >
        <MagnifyingGlassIcon className="w-5 h-5" />
        Search for songs
      </Button>
    );
  }

  return (
    <div
      className={cn(
        "flex items-center gap-x-3 px-4 border border-input rounded-full w-[110px] h-[50px] transition-[width] duration-500",
        (isTyping || searchText) && "w-full"
      )}
    >
      <MagnifyingGlassIcon className="w-5 h-5" />
      <Input
        ref={inputRef}
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onBlur={onBlurInput}
        onFocus={onFocusInput}
        className="focus-visible:ring-0 border-0 p-0"
        placeholder="Search for songs..."
      />
    </div>
  );
};
