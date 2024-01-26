import { localStorageKey } from "@/config/site";
import { Song } from "@/types/custom";
import { create } from "zustand";

export interface MusicPlayerStore {
  ids: string[];
  activedId: string;
  setId: (id: string) => void;
  setIds: (ids: string[]) => void;
  reset: () => void;
}

export const useMusicPlayer = create<MusicPlayerStore>((set) => ({
  ids: [],
  activedId: "",
  setId: (id: string) => set({ activedId: id }),
  setIds: (ids: string[]) => set({ ids: ids }),
  reset: () => set({ ids: [], activedId: "" }),
}));

interface RightSidebarPropsStore {
  isShow: boolean;
  setIsShow: (value: boolean) => void;
  currImagePath: string;
  setCurrImagePath: (value: string) => void;
}

export const useRightSidebar = create<RightSidebarPropsStore>((set) => ({
  isShow: false,
  setIsShow: (value: boolean) => set({ isShow: value }),
  currImagePath: "",
  setCurrImagePath: (url: string) => set({ currImagePath: url }),
}));

interface QueueStore {
  songs: Song[];
  setSongs: (songs: Song[]) => void;
}

export const useQueue = create<QueueStore>((set) => ({
  songs: [],
  setSongs: (songs: Song[]) => set({ songs: songs }),
}));
