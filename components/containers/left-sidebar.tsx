"use client";

import { PlusIcon } from "@heroicons/react/24/solid";
import { PlaylistItem } from "../my-ui/playlist-item";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { usePathname } from "next/navigation";
import { useCreateCollectionModal } from "@/hooks/use-modal";
import { useUser } from "@/hooks/use-user";
import { useEffect } from "react";
import { Skeleton } from "../ui/skeleton";
import { useData } from "@/hooks/use-data";
import { toast } from "sonner";

export const LeftSidebar = () => {
  const { userInfo, isLoading } = useUser();
  const pathname = usePathname();
  const createCollectionModal = useCreateCollectionModal();
  const { collections } = useData();

  if (isLoading) {
    return (
      <div className="min-w-[277px] p-4 flex flex-col gap-y-4">
        <Skeleton className="w-24 h-8 mt-2" />
        <div className="flex flex-col gap-y-2">
          <PlaylistItem.Skeleton />
          <PlaylistItem.Skeleton />
        </div>
        <Separator />
        <div className="flex flex-col gap-y-2">
          <PlaylistItem.Skeleton />
          <PlaylistItem.Skeleton />
          <PlaylistItem.Skeleton />
        </div>
      </div>
    );
  } else if (!userInfo) {
    return (
      <div className="max-w-[277px] p-4">
        <div className="text-xl font-semibold mt-2">SBmusic</div>
        <div className="text-wrap py-2 font-medium text-neutral-500">{`Log in to use more functions such as uploading songs, creating collections, ...`}</div>
      </div>
    );
  } else
    return (
      <div className="min-w-[277px] p-4 flex flex-col gap-y-4">
        <div className="flex items-center justify-between py-2">
          <div className="text-xl font-semibold">Collections</div>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full w-7 h-7"
            onClick={() => {
              if (collections && collections.length >= 5) {
                return toast.warning(
                  `You have reached the limit of 5 collections.`
                );
              }
              createCollectionModal.onOpen();
            }}
          >
            <PlusIcon className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex flex-col gap-y-2">
          <PlaylistItem
            title="Favorites"
            link="/favorites"
            isActive={pathname === "/favorites"}
          />
          <PlaylistItem
            title="Your upload"
            link="/your-upload"
            isActive={pathname === "/your-upload"}
          />
        </div>
        <Separator />
        {collections ? (
          <div className="flex flex-col gap-y-2">
            {collections.map((col) => (
              <PlaylistItem
                key={col.id}
                title={col.title}
                link={`/collection/${col.id}`}
                isActive={pathname === `/collection/${col.id}`}
                className="capitalize"
              />
            ))}
            <p className="text-sm font-semibold text-neutral-400">
              {5 - collections.length} collection(s) remaining.
            </p>
          </div>
        ) : (
          <p className="text-sm font-semibold text-neutral-400">
            5 collection(s) remaining.
          </p>
        )}
      </div>
    );
};
