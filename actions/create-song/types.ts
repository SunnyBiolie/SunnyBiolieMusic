import { z } from "zod";
import { createSongSchema } from "./schema";

export type InputType = z.infer<typeof createSongSchema>;
// export type ReturnType =
