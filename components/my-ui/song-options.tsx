"use client";

import { useData } from "@/hooks/use-data";
import { useCreateCollectionModal } from "@/hooks/use-modal";
import { useUser } from "@/hooks/use-user";
import { createSupabaseClientComponent } from "@/lib/supabase/client-component";
import { cn } from "@/lib/utils";
import { Song } from "@/types/custom";
import { CheckIcon, EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import { useParams, useRouter } from "next/navigation";
import { ElementRef, useRef, useState } from "react";
import { toast } from "sonner";

interface SongOptionsProps {
  className?: string;
  isInCollection?: boolean;
  song: Song;
  parent?: "CardMedia" | "HorizontalMedia";
}

export const SongOptions = ({
  className,
  isInCollection,
  song,
  parent,
}: SongOptionsProps) => {
  const params = useParams();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isAddLoading, setIsAddLoading] = useState<boolean>(false);
  const [isRemoveLoading, setIsRemoveLoading] = useState<boolean>(false);
  const [position, setPosition] = useState<[number, number]>([0, 0]);

  const ref = useRef<ElementRef<"div">>(null);

  const supabase = createSupabaseClientComponent();
  const createCollectionModal = useCreateCollectionModal();
  const { collections } = useData();
  const { user } = useUser();

  if (!user) {
    return <></>;
  }

  const addSongToCollection = async (songId: string, collectionId: string) => {
    if (isAddLoading) return;

    setIsAddLoading(true);
    const index = collections!.findIndex((col) => col.id === collectionId);
    const collection = collections![index];
    if (collection?.songs?.includes(songId)) {
      setIsAddLoading(false);
      return toast.error("This song already exists in the collection.");
    }

    const updateSongs = collection.songs ? collection.songs : [];
    let updateDuration = collection.duration ? collection.duration : 0;
    updateSongs.push(songId);
    updateDuration += song.duration;

    const { error } = await supabase
      .from("collections")
      .update({ songs: updateSongs, duration: updateDuration })
      .eq("id", collectionId);

    if (error) {
      setIsAddLoading(false);
      return toast.error(error.message);
    }

    setIsAddLoading(false);
    setIsOpen(false);
    toast.success(`Added to collection "${collection.title}" successfully.`);
    collections![index].songs = updateSongs;
    collections![index].duration = updateDuration;
  };

  const removeSongFromCollection = async () => {
    if (isRemoveLoading) return;
    if (isInCollection) {
      setIsRemoveLoading(true);
      const index = collections!.findIndex(
        (col) => col.id === params.collectionId
      );
      const collection = collections![index];
      const updateSongs = collection.songs!;
      const songIndex = updateSongs.indexOf(song.id);
      if (songIndex > -1) {
        updateSongs.splice(songIndex, 1);
      }
      const updateDuration = collection.duration! - song.duration;

      const { error } = await supabase
        .from("collections")
        .update({ songs: updateSongs, duration: updateDuration })
        .eq("id", params.collectionId);

      if (error) {
        setIsRemoveLoading(false);
        return toast.error(error.message);
      }

      setIsRemoveLoading(false);
      setIsOpen(false);
      toast.success(
        `Remove from collection "${collection.title}" successfully.`
      );
      collections![index].songs = updateSongs;
      collections![index].duration = updateDuration;
      router.refresh();
    }
  };

  return (
    <div
      className={cn(
        parent === "CardMedia" &&
          "hidden group-hover:block absolute top-2 right-2 bg-neutral-950/20 hover:bg-neutral-950/80 rounded-full p-[2px]  transition cursor-pointer"
      )}
    >
      <div ref={ref} className="shadow-md">
        <EllipsisVerticalIcon
          className={cn("w-5 h-5 cursor-pointer", className)}
          onClick={() => {
            setIsOpen(true);
            setPosition([
              window.innerHeight - ref.current?.getBoundingClientRect().top!,
              window.innerWidth - ref.current?.getBoundingClientRect().left!,
            ]);
          }}
        />
        {isOpen && (
          <>
            <div
              style={{ bottom: `${position[0]}px`, right: `${position[1]}px` }}
              className={cn(
                `z-[101] rounded-md overflow-hidden shadow-md`,
                isOpen && "fixed"
              )}
            >
              <div className="bg-zinc-950 p-3 w-52">
                {isInCollection ? (
                  <div
                    className={cn(
                      "-mx-3 px-3 py-2 text-neutral-400 hover:text-[#eee] hover:bg-rose-600 transition text-sm font-medium cursor-pointer flex items-center justify-between",
                      isRemoveLoading && "cursor-not-allowed opacity-50"
                    )}
                    onClick={removeSongFromCollection}
                  >
                    Remove from collection
                  </div>
                ) : (
                  <div className="flex flex-col gap-y-2">
                    <div className="self-center font-semibold">
                      Add to Collection
                    </div>
                    <div className="">
                      {collections?.length !== 0 ? (
                        collections?.map((col) => (
                          <div
                            key={col.id}
                            className={cn(
                              "-mx-3 px-3 py-1 text-neutral-400 hover:text-[#ddd] hover:bg-neutral-800 transition text-sm font-medium capitalize cursor-pointer flex items-center justify-between",
                              isAddLoading && "cursor-not-allowed opacity-50",
                              col.songs?.includes(song.id) && "opacity-60"
                            )}
                            onClick={() => addSongToCollection(song.id, col.id)}
                          >
                            {col.title}
                            {col.songs?.includes(song.id) && (
                              <CheckIcon className="2-4 h-4"></CheckIcon>
                            )}
                          </div>
                        ))
                      ) : (
                        <div
                          className="-mx-3 px-3 py-1 hover:bg-neutral-800 transition text-sm font-medium cursor-pointer flex items-center gap-x-1"
                          onClick={() => {
                            createCollectionModal.onOpen();
                            setIsOpen(false);
                          }}
                        >
                          Create collection
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div
              className="fixed top-0 left-0 right-0 bottom-0 z-40"
              onClick={() => setIsOpen(false)}
            />
          </>
        )}
      </div>
    </div>
  );
};
