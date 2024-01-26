"use client";

import { useData } from "@/hooks/use-data";
import { NewSongs } from "./_components/new-songs";
import { AllRestSong } from "./_components/all-rest-song";
import { useUser } from "@/hooks/use-user";

const numberNewSongsDisplay = 1;

const HomePage = () => {
  const { allSong, isLoading: isLoadingData } = useData();
  const { isLoading: isLoadingUser } = useUser();

  if (isLoadingUser || isLoadingData) {
    return (
      <div className="p-4 flex flex-col gap-y-4">
        <NewSongs.Skeleton />
        <AllRestSong.Skeleton />
      </div>
    );
  } else if (!allSong)
    return (
      <div>{`There are no songs to display. Go to "Upload" to upload more.`}</div>
    );

  const newSongs = allSong.slice(0, numberNewSongsDisplay);
  const restSongs = allSong.slice(numberNewSongsDisplay);

  return (
    <div className="flex flex-col gap-y-5 p-4">
      <NewSongs songs={newSongs} />
      <AllRestSong songs={restSongs} />
    </div>
  );
};

export default HomePage;
