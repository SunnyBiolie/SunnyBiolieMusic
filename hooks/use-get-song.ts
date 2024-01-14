import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { createSupabaseClientComponent } from "@/lib/supabase/client-component";
import { Song } from "@/types/custom";

export const useGetSongById = (songId: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [song, setSong] = useState<Song | undefined>(undefined);

  const supabase = createSupabaseClientComponent();

  useEffect(() => {
    if (!songId) {
      return;
    }

    setIsLoading(true);

    const fetchSong = async () => {
      const { data, error } = await supabase
        .from("songs")
        .select("*")
        .eq("id", songId)
        .single();

      if (error) {
        setIsLoading(false);
        return toast.error(error.message);
      }

      setSong(data as Song);
      setIsLoading(false);
    };

    fetchSong();
  }, [songId, supabase]);

  return useMemo(
    () => ({
      isLoading,
      song,
    }),
    [isLoading, song]
  );
};
