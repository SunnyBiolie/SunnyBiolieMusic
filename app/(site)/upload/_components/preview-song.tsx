import Image from "next/image";
import { SongPreviewDataProps } from "../page";
import { PhotoIcon, PlayIcon } from "@heroicons/react/24/solid";

export const PreviewSong = ({
  data,
}: {
  data: SongPreviewDataProps | null;
}) => {
  const blobImage = new Blob([data?.image as BlobPart], { type: "image/*" });
  const imageUrl = URL.createObjectURL(blobImage);

  const blobSong = new Blob([data?.song as BlobPart], { type: "audio/mpeg" });
  const songUrl = URL.createObjectURL(blobSong);

  return (
    <div>
      <div className="font-bold text-2xl mb-5">Preview</div>
      <div className="w-[320px] flex flex-col items-center justify-center gap-y-3">
        {data?.image ? (
          <div className="relative w-2/3 aspect-square overflow-hidden rounded-md">
            <Image
              src={imageUrl}
              alt="Thumb Image Preview"
              fill
              className="h-full w-full object-cover"
            />
          </div>
        ) : (
          <div className="flex items-center justify-center w-2/3 aspect-square border-4 border-dashed rounded-md">
            <PhotoIcon className="w-1/2 h-1/2 text-neutral-600" />
          </div>
        )}
        <div className="flex flex-col items-center justify-center gap-y-1">
          {data?.title ? (
            <div className="text-lg capitalize font-semibold">
              {data?.title}
            </div>
          ) : (
            <div className="text-lg capitalize font-semibold text-neutral-600">
              Title here
            </div>
          )}
          {data?.authors ? (
            <div className="text-sm font-medium text-neutral-400">
              {data?.authors}
            </div>
          ) : (
            <div className="text-sm font-medium text-neutral-700">
              Authors here
            </div>
          )}
        </div>
        {data?.song ? (
          <audio src={songUrl} controls></audio>
        ) : (
          <div className="relative w-[300px] h-[54px] border-4 border-dashed rounded-full">
            <PlayIcon className="absolute top-1/2 left-4 -translate-y-1/2 w-5  h-5 text-neutral-600" />
          </div>
        )}
      </div>
    </div>
  );
};
