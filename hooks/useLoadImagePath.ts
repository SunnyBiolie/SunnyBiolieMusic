import { createSupabaseClientComponent } from "@/lib/supabase/client-component";
import { Song } from "@/types/custom";

interface useLoadImagePathProps {
  song: Song;
  fetch?: boolean;
}

export const useLoadImagePath = ({
  song,
  fetch = true,
}: useLoadImagePathProps): string | undefined => {
  if (!song || !fetch) {
    return undefined;
  }

  const supabase = createSupabaseClientComponent();

  const { data } = supabase.storage
    .from("images")
    .getPublicUrl(song.image_path);

  return data.publicUrl;
};
