"use client";

import { DateTimeTransform } from "@/components/my-ui/date-time-transform";
import { TruncateText } from "@/components/my-ui/truncate-text";
import { useData } from "@/hooks/use-data";
import { useUser } from "@/hooks/use-user";

const YourUploadPage = () => {
  const { userInfo } = useUser();
  const { allSong } = useData();
  const userSongs = allSong?.filter((song) => song.user_id === userInfo?.id);

  if (userSongs?.length === 0) {
    return (
      <div className="p-4">
        <div className="text-2xl font-semibold pb-4">Your upload</div>
        <div>{`You haven't uploaded any songs yet.`}</div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="text-2xl font-semibold pb-4">Your upload</div>
      <div className="flex flex-col gap-y-2 px-2">
        {userSongs?.map((song, index) => (
          <div key={song.id} className="flex justify-between items-center">
            <div className="pl-2 pr-6 text-lg font-semibold">{index + 1}</div>
            <TruncateText
              text={song.title}
              className="font-medium"
              lineClamp={1}
            />
            <div className="shrink-0">
              <DateTimeTransform dateInNumber={Date.parse(song.created_at)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YourUploadPage;
