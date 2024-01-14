export interface UserInfo {
  id: string;
  full_name?: string;
  avatar_url?: string;
  liked_songs?: string[];
}

export interface Song {
  id: string;
  user_id: string;
  authors: string;
  title: string;
  song_path: string;
  image_path: string;
}
