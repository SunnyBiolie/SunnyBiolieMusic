"use client";

import { useData } from "@/hooks/use-data";
import { NewSongs } from "./_components/new-songs";
import { AllRestSong } from "./_components/all-rest-song";

const numberNewSongsDisplay = 2;

const HomePage = () => {
  const { allSong } = useData();

  if (!allSong) return <div>There are no songs to display.</div>;

  const newSongs = allSong.slice(0, numberNewSongsDisplay);
  const restSongs = allSong.slice(numberNewSongsDisplay);

  return (
    <div className="flex flex-col gap-y-5">
      <NewSongs songs={newSongs} />
      <AllRestSong songs={restSongs} />
    </div>
  );
};

export default HomePage;
