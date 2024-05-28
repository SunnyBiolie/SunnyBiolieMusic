"use client";

import { useEffect, useState } from "react";
import { notFound, useParams, useRouter } from "next/navigation";
import Image from "next/image";
import uniqid from "uniqid";
import { useData } from "@/hooks/use-data";
import useOnMusicPLay from "@/hooks/use-on-music-play";
import { HorizontalMedia } from "@/components/my-ui/horizontal-media";
import { Collection } from "@/types/custom";
import {
  ArrowPathIcon,
  EllipsisVerticalIcon,
  MusicalNoteIcon,
} from "@heroicons/react/24/solid";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MinusCircleIcon } from "@heroicons/react/24/outline";
import { useTriggerFetchData } from "@/hooks/use-data-zustand";
import { createSupabaseClientComponent } from "@/lib/supabase/client-component";
import { toast } from "sonner";
import Delete from "./_components/delete";

const CollectionPage = () => {
  const { collections, allSong } = useData();

  const params = useParams();
  const router = useRouter();
  const [collection, setCollection] = useState<Collection | null>(null);
  const [changingInfo, setChangingInfo] = useState<boolean>(false);

  useEffect(() => {
    if (collections) {
      const col = collections.find((col) => col.id === params.collectionId);
      setCollection(col || null);
    }
  }, [params.collectionId, collections]);

  const getSongsFromSongsId = (songsId: string[]) => {
    const songs = allSong?.filter((song) => songsId?.includes(song.id));
    return songs;
  };

  const musicPlay = useOnMusicPLay(
    getSongsFromSongsId(collection?.songs || []) || []
  );

  const durationCollectionTransform = (time: number) => {
    if (!time) return;
    if (time < 60) {
      return Math.floor(time) + " sec";
    }
    if (time < 60 * 60) {
      const min = Math.floor(time / 60) + " min";
      const sec = Math.floor((time / 60 - Math.floor(time / 60)) * 60) + " sec";
      return `${min} ${sec}`;
    }
    if (time < 60 * 60 * 24) {
      const hr = Math.floor(time / 60 / 60) + " hr";
      const resDuration = time - 60 * 60;
      if (resDuration < 60) {
        return `${hr} ${Math.floor(resDuration)} sec`;
      }
      const min = Math.floor(resDuration / 60) + " min";
      const sec =
        Math.floor((resDuration / 60 - Math.floor(resDuration / 60)) * 60) +
        " sec";
      return `${hr} ${min} ${sec}`;
    }
  };

  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);

  const triggerFetch = useTriggerFetchData();
  const supabase = createSupabaseClientComponent();

  const deleteCollection = async () => {
    setIsDeleteLoading(true);
    const { error } = await supabase
      .from("collections")
      .delete()
      .eq("id", params.collectionId);
    if (error) {
      setIsDeleteLoading(false);
      return toast.error(`Failed to delete collection: ${error.message}.`);
    }

    setIsDeleteLoading(false);
    toast.success(`Deleted collection "${collection?.title}" successfully.`);
    triggerFetch.setFetchCollections(uniqid());
    router.replace("/");
  };

  if (collection) {
    return (
      <div className="p-4">
        {isDeleteLoading && (
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-neutral-900/80 z-50 flex items-center justify-center">
            <ArrowPathIcon className="w-10 h-10 text-sky-600 animate-spin" />
          </div>
        )}
        <div className="flex gap-x-6 p-4">
          <div className="basis-1/4 shrink-0 max-w-[224px] shadow-2xl">
            {collection.image ? (
              <div className="relative rounded-md overflow-hidden aspect-square w-full">
                <Image
                  src={collection.image}
                  fill
                  sizes="full"
                  className="object-cover"
                  alt="Collection's image"
                />
              </div>
            ) : (
              <div className="relative rounded-md overflow-hidden aspect-square w-full bg-gradient-to-b from-neutral-600 via-30% via-slate-600 to-sky-600">
                <MusicalNoteIcon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:w-16 md:h-16 w-10 h-10" />
              </div>
            )}
          </div>
          <div className="grow flex flex-col justify-end gap-y-3">
            <div className="text-neutral-400 font-medium text-sm">
              Collection
            </div>
            <div className="capitalize text-5xl font-semibold">
              {collection.title}
            </div>
            <div className="text-sm font-semibold">
              <div>
                {collection.songs?.length
                  ? `${collection.songs?.length} songs,`
                  : ""}{" "}
                {durationCollectionTransform(collection.duration!)}
              </div>
            </div>
          </div>
          <div className="relative">
            <Popover>
              <PopoverTrigger>
                <EllipsisVerticalIcon className="w-6 h-6" />
              </PopoverTrigger>
              <PopoverContent
                align="end"
                className="p-0 py-3 overflow-hidden bg-zinc-950 border-0 text-sm"
              >
                <div
                  className="px-3 py-1 text-neutral-400 hover:text-[#ddd] hover:bg-neutral-800 cursor-pointer"
                  onClick={() => setChangingInfo(true)}
                >
                  Change information
                </div>
                <Delete funcToDo={deleteCollection} />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div>
          {getSongsFromSongsId(collection.songs!)?.map((song) => (
            <HorizontalMedia
              key={song.id}
              song={song}
              thumbnail={true}
              onClick={() => musicPlay(song.id)}
              isInCollection={true}
            />
          ))}
        </div>
        {changingInfo && <div></div>}
      </div>
    );
  }
};

export default CollectionPage;
