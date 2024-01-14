"use client";

import { createSupabaseClientComponent } from "@/lib/supabase/client-component";
import { Song } from "@/types/custom";
import {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useState,
} from "react";
import { toast } from "sonner";

type DataContextType = {
  allSong: Song[] | null;
  isLoading: boolean;
};

export const DataContext = createContext<DataContextType | undefined>(
  undefined
);

export interface Props {
  [propName: string]: any;
}

export const DataContextProvider = (props: Props) => {
  const [allSong, setAllSong] = useState<Song[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const supabase = createSupabaseClientComponent();

  const getAllSong = useCallback(
    () =>
      supabase
        .from("songs")
        .select("*")
        .order("created_at", { ascending: false }),
    [supabase]
  );

  useEffect(() => {
    Promise.allSettled([getAllSong()]).then((res) => {
      const result = res[0];
      toast.info("Loading all songs");

      if (result.status === "fulfilled") {
        setAllSong(result.value.data);
      } else {
        setAllSong(null);
      }
    });
  }, [getAllSong]);

  const data = {
    allSong,
    isLoading,
  };

  return <DataContext.Provider value={data} {...props} />;
};

export const useData = () => {
  const data = useContext(DataContext);
  if (data === undefined) {
    throw new Error("useData but dont have DataContextProvider");
  }

  return data;
};
