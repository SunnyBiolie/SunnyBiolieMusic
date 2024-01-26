export interface UserInfo {
  id: string;
  full_name?: string;
  avatar_url?: string;
  liked_songs?: string[];
  is_admin: boolean;
}

export interface Song {
  id: string;
  user_id: string;
  authors: string;
  title: string;
  song_path: string;
  image_path: string;
  duration: number;
  created_at: string;
}

export interface Collection {
  id: string;
  user_id: string;
  title: string;
  songs: string[] | null;
  duration: number | null;
  image: string | null;
  created_at: string;
}
