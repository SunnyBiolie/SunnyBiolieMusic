"use client";

import { useEffect, useState } from "react";
import { SearchInput } from "./_components/search-input";
import { SearchResult } from "./_components/search-result";
import { useData } from "@/hooks/use-data";
import { Song } from "@/types/custom";

interface SearchPageProps {
  searchParams: {
    title: string;
  };
}

const SearchPage = ({ searchParams }: SearchPageProps) => {
  const [searchResults, setSearchResults] = useState<Song[] | null>(null);
  const { allSong } = useData();

  const searchSongByTitle = (title: string) => {
    if (!searchParams.title) return null;

    let results: Song[] = [];
    allSong?.forEach((song) => {
      if (song.title?.toLocaleLowerCase().includes(title.toLocaleLowerCase())) {
        results.push(song);
      }
    });

    return results;
  };

  useEffect(() => {
    setSearchResults(searchSongByTitle(searchParams.title));
  }, [searchParams.title]);

  console.log("Parent: " + searchParams.title);

  return (
    <div className="md:mx-4 md:my-2">
      <SearchInput />
      <SearchResult className="my-2 py-2" songs={searchResults} />
    </div>
  );
};

export default SearchPage;
