"use client";

import { Song } from "@/types/custom";
import Image from "next/image";

interface CardProps {
  data: Song | string;
}

export const Card = ({ data }: CardProps) => {
  return (
    <div className="flex flex-col gap-y-4 p-4 bg-neutral-700 bg-opacity-20 hover:bg-opacity-40 rounded-md transition">
      <div className="relative w-full aspect-square rounded-md overflow-hidden">
        <Image
          src="https://cavkfwwrkhusmjwuwcba.supabase.co/storage/v1/object/public/images/Your%20Dream-lr4f5fx3-image"
          alt="Thumb Image"
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-y-3 text-sm font-semibold">
        <p className="truncate capitalize">Những lời hứa bỏ quên</p>
        <p className="text-neutral-500">Vũ, Dear Jane</p>
      </div>
    </div>
  );
};
