"use client";

import { toast } from "sonner";
import { createSupabaseClientComponent } from "@/lib/supabase/client-component";
import { Collection, Song } from "@/types/custom";
import {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useTriggerFetchData } from "./use-data-zustand";
import { useUser } from "./use-user";

type DataContextType = {
  allSong: Song[] | null;
  isLoading: boolean;
  collections: Collection[] | null;
  isLoadingCollections: boolean;
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
  const fetchData = useTriggerFetchData();

  const getAllSong = useCallback(
    () =>
      supabase
        .from("songs")
        .select("*")
        .order("created_at", { ascending: false }),
    [fetchData.fetchSongs]
  );

  useEffect(() => {
    setIsLoading(true);
    Promise.allSettled([getAllSong()]).then((res) => {
      const allSongPromise = res[0];

      if (allSongPromise.status === "fulfilled") {
        setAllSong(allSongPromise.value.data);
      } else {
        setAllSong(null);
      }

      setIsLoading(false);
    });
  }, [getAllSong]);

  //
  const { userInfo } = useUser();
  const [collections, setCollections] = useState<Collection[] | null>(null);
  const [isLoadingCollections, setIsLoadingCollections] =
    useState<boolean>(false);

  const getUserCollection = useCallback(
    () =>
      supabase
        .from("collections")
        .select("*")
        .eq("user_id", userInfo!.id)
        .order("created_at", { ascending: false }),
    [userInfo, fetchData.fetchCollections]
  );

  useEffect(() => {
    if (userInfo) {
      setIsLoadingCollections(true);
      Promise.allSettled([getUserCollection()]).then((res) => {
        const userCollectionsPromise = res[0];

        if (userCollectionsPromise.status === "fulfilled") {
          setCollections(userCollectionsPromise.value.data);
        } else {
          setCollections(null);
        }

        setIsLoadingCollections(false);
      });
    }
  }, [getUserCollection, userInfo]);
  //

  const data = {
    allSong,
    isLoading,
    collections,
    isLoadingCollections,
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
