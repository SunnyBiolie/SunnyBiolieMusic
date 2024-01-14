import { create } from "zustand";

interface MusicPlayerPropsStore {
  ids: string[];
  activedId: string;
  setId: (id: string) => void;
  setIds: (ids: string[]) => void;
  reset: () => void;
}

const useMusicPlayer = create<MusicPlayerPropsStore>((set) => ({
  ids: [],
  activedId: "",
  setId: (id: string) => set({ activedId: id }),
  setIds: (ids: string[]) => set({ ids: ids }),
  reset: () => set({ ids: [], activedId: "" }),
}));

export default useMusicPlayer;
