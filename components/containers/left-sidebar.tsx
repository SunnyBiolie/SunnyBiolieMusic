"use client";

import { PlusIcon } from "@heroicons/react/24/solid";
import { PlaylistItem } from "../my-ui/playlist-item";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { usePathname } from "next/navigation";
import { useCreateCollectionModal } from "@/hooks/use-modal";
import { useUser } from "@/hooks/use-user";
import { createSupabaseClientComponent } from "@/lib/supabase/client-component";
import { useEffect, useState } from "react";
import { Collection } from "@/types/custom";
import { toast } from "sonner";

export const LeftSidebar = () => {
  const { userInfo } = useUser();
  const pathname = usePathname();
  const createCollectionModal = useCreateCollectionModal();
  const [collections, setCollections] = useState<Collection[] | null>(null);

  const supabase = createSupabaseClientComponent();

  useEffect(() => {
    const fetchCollections = async () => {
      if (userInfo) {
        const { data, error } = await supabase
          .from("collections")
          .select("*")
          .eq("user_id", userInfo!.id)
          .order("created_at", { ascending: false });

        if (error) {
          toast.error(error.message);
        }

        setCollections(data);
      }
    };

    fetchCollections();
  }, [supabase, userInfo]);

  if (!userInfo) {
    return (
      <div className="max-w-[277px] p-4">
        <div className="text-xl font-semibold">SBmusic</div>
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
            onClick={() => createCollectionModal.onOpen()}
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
