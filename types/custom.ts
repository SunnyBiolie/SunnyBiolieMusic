export interface UserInfo {
  id: string;
  full_name?: string;
  avatar_url?: string;
}

export interface Song {
  id: number;
  user_id: string;
  author: string;
  title: string;
  song_path: string;
  image_path: string;
}
