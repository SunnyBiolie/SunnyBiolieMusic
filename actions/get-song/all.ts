import { createSupabaseServerComponent } from "@/lib/supabase/server-component";
import { Song } from "@/types/custom";

const getAllSong = async (): Promise<Song[]> => {
  const supabase = createSupabaseServerComponent();

  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error.message);
  }

  return data || [];
};

export default getAllSong;
