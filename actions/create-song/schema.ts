import { z } from "zod";

export const createSongSchema = z.object({
  title: z.string(),
  authors: z.string(),
  song: z.any().refine((file: File) => file?.type === "audio/mpeg", {
    message: ".mp3 file only",
  }),
  image: z
    .any()
    .refine(
      (file: File) =>
        ["image/png", "image/jpeg", "image/gif"].includes(file?.type),
      {
        message: "Image file only",
      }
    ),
});
