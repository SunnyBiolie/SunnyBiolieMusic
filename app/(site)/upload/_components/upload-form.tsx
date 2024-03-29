"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ElementRef,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { AuthorsName } from "./authors-name";
import { useUser } from "@/hooks/use-user";
import { toast } from "sonner";
import uniqid from "uniqid";
import { useRouter } from "next/navigation";
import { createSupabaseClientComponent } from "@/lib/supabase/client-component";
import { SongPreviewDataProps } from "../page";
import useTransformLang from "@/hooks/use-transform-lang";
import { Skeleton } from "@/components/ui/skeleton";
import { useTriggerFetchData } from "@/hooks/use-data-zustand";

interface UploadFormProps {
  updatePreviewData: (data: SongPreviewDataProps) => void;
}

export const UploadForm = memo(function UploadForm({
  updatePreviewData,
}: UploadFormProps) {
  const [authors, setAuthors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const getAudioDurationRef = useRef<ElementRef<"audio">>(null);
  const { user, isLoading: isUserLoading } = useUser();
  const { toLowerCaseNonAccentVietnamese } = useTransformLang();

  const supabase = createSupabaseClientComponent();
  const fetch = useTriggerFetchData();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue: setSongValue,
    getValues: getSongValues,
  } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      authors: "",
      song: null,
      image: null,
    },
  });

  const {
    register: registerAuthor,
    handleSubmit: handleSubmitAuthor,
    reset: resetAuthor,
    formState: { errors: errorsAuthor },
    getValues,
  } = useForm<FieldValues>({
    defaultValues: {
      author: "",
    },
  });

  useEffect(() => {
    resetAuthor();

    setSongValue("authors", authors.join(", "));
  }, [authors]);

  const handleAddAuthor = () => {
    setAuthors(() => [...authors, getValues("author")]);
  };

  const handleRemoveAuthor = useCallback((index: number) => {
    setAuthors((authors) => authors.filter((author, i) => i !== index));
  }, []);

  if (isUserLoading) {
    return <UploadFormSkeleton />;
  } else if (!user) {
    return <div>Please log in to continue.</div>;
  }

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);

      const imageFile: File = values.image?.[0];
      const songFile: File = values.song?.[0];

      const blobSong = new Blob([songFile as BlobPart], { type: "audio/mpeg" });
      const songUrl = URL.createObjectURL(blobSong);
      getAudioDurationRef.current!.src = songUrl;

      if (!imageFile || !songFile) {
        toast.error("Missing field(s).");
      }

      const uniqueId = uniqid();

      const { data: songData, error: songError } = await supabase.storage
        .from("songs")
        .upload(
          `${toLowerCaseNonAccentVietnamese(values.title)}-${uniqueId}-audio`,
          songFile,
          {
            cacheControl: "3600",
            upsert: false,
          }
        );

      if (songError) {
        setIsLoading(false);
        return toast.error(`Failed to upload song: ${songError.message}.`);
      }

      const { data: imageData, error: imageError } = await supabase.storage
        .from("images")
        .upload(
          `${toLowerCaseNonAccentVietnamese(values.title)}-${uniqueId}-image`,
          imageFile,
          {
            cacheControl: "3600",
            upsert: false,
          }
        );

      if (imageError) {
        const { error: removeSongError } = await supabase.storage
          .from("songs")
          .remove([
            `${toLowerCaseNonAccentVietnamese(values.title)}-${uniqueId}-audio`,
          ]);

        if (removeSongError) {
          toast.error(`Failed to remove song: ${removeSongError.message}.`);
        }

        setIsLoading(false);
        return toast.error(`Failed to upload image: ${imageError.message}.`);
      }

      interface createSongSchema {
        user_id: string;
        title: string;
        authors: string;
        song_path: string;
        image_path: string;
        duration: number;
      }

      const uploadData: createSongSchema = {
        user_id: user.id,
        title: values.title,
        authors: values.authors,
        song_path: songData.path,
        image_path: imageData.path,
        duration: getAudioDurationRef.current!.duration,
      };

      const { error: createError } = await supabase
        .from("songs")
        .insert(uploadData);

      if (createError) {
        const { error: removeSongError } = await supabase.storage
          .from("songs")
          .remove([
            `${toLowerCaseNonAccentVietnamese(values.title)}-${uniqueId}-audio`,
          ]);

        if (removeSongError) {
          toast.error(`Failed to remove song: ${removeSongError.message}.`);
        }

        const { error: removeImageError } = await supabase.storage
          .from("images")
          .remove([
            `${toLowerCaseNonAccentVietnamese(values.title)}-${uniqueId}-image`,
          ]);

        if (removeImageError) {
          toast.error(`Failed to remove song: ${removeImageError.message}.`);
        }

        setIsLoading(false);
        return toast.error(createError.message);
      }

      setIsLoading(false);
      fetch.setFetchSongs(uniqueId);
      router.refresh();
      toast.success(`Upload "${values.title}" successfully.`);
      reset();
    } catch (error) {
      setIsLoading(false);
      return toast.error("Something went wrong when submitting whole song.");
    }
  };

  const updatePreviewDataClick = () => {
    const data: SongPreviewDataProps = {
      title: getSongValues("title"),
      authors: getSongValues("authors"),
      song: getSongValues("song")?.[0],
      image: getSongValues("image")?.[0],
    };
    updatePreviewData(data);
  };

  return (
    <div className="px-2">
      <div className="font-bold text-2xl mb-5">Upload your song</div>
      <div className="flex flex-col gap-y-4">
        <form
          id="addSong"
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-4 flex-wrap"
        >
          <Input
            id="title"
            {...register("title", { required: true, maxLength: 100 })}
            placeholder="Title"
            className="placeholder:text-neutral-500"
            aria-invalid={errors.title ? "true" : "false"}
            disabled={isLoading}
          />
          {errors.title?.type === "required" && (
            <p className="error-input">Title is required.</p>
          )}
          {errors.title?.type === "maxLength" && (
            <p className="error-input">Max length 100 is required.</p>
          )}
          <Input
            id="authors"
            {...register("authors", { required: true })}
            className="hidden"
            aria-invalid={errors.authors ? "true" : "false"}
            disabled={isLoading}
          />
          {!errors.authors && getSongValues("authors") === "" ? (
            <p className="text-sm text-neutral-600 border-2 border-dashed rounded-md p-2 cursor-default">
              {"The authors' name will be displayed here"}
            </p>
          ) : errors.authors && getSongValues("authors") === "" ? (
            <p className="error-input">
              No author names have been entered yet.
            </p>
          ) : (
            <AuthorsName
              authorsName={authors}
              removeAuthor={handleRemoveAuthor}
            />
          )}
        </form>
        <form
          className="flex gap-x-2"
          onSubmit={handleSubmitAuthor(handleAddAuthor)}
        >
          <div className="grow flex flex-col gap-y-2">
            <Input
              id="author"
              {...registerAuthor("author", { required: true, maxLength: 25 })}
              placeholder="Author"
              className="placeholder:text-neutral-500"
              aria-invalid={errorsAuthor.author ? "true" : "false"}
              disabled={isLoading}
            />
            {errorsAuthor.author?.type === "maxLength" && (
              <p className=" error-input">Max length 25 is required.</p>
            )}
            {errorsAuthor.author?.type === "required" && (
              <p className="error-input">Can not add empty name of author.</p>
            )}
          </div>
          <Button variant="secondary" disabled={isLoading}>
            Add
          </Button>
        </form>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-4"
        >
          <div className="flex flex-col gap-y-1">
            <div className="font-medium pb-1">Select your song</div>
            <Input
              id="song"
              type="file"
              accept=".mp3"
              {...register("song", { required: true })}
              aria-invalid={errors.song ? "true" : "false"}
              className="h-auto p-0 file:bg-neutral-800 file:text-neutral-200 file:p-2.5 file:mr-2"
              disabled={isLoading}
            />
            {errors.song?.type === "required" && (
              <p className="error-input">Song is required.</p>
            )}
          </div>
          <div className="flex flex-col gap-y-1">
            <div className="font-medium pb-1">Select your thumb image</div>
            <Input
              id="image"
              type="file"
              accept="image/*"
              {...register("image", { required: true })}
              aria-invalid={errors.image ? "true" : "false"}
              className="h-auto p-0 file:bg-neutral-800 file:text-neutral-200 file:p-2.5 file:mr-2"
              disabled={isLoading}
            />
            {errors.image?.type === "required" && (
              <p className="error-input">Image is required.</p>
            )}
          </div>
        </form>
        <div className="flex item-center gap-x-2">
          <Button
            type="submit"
            form="addSong"
            variant="primary"
            className="grow"
            disabled={isLoading}
          >
            Create
          </Button>
          <Button
            onClick={updatePreviewDataClick}
            variant="ghost"
            disabled={isLoading}
          >
            Preview
          </Button>
        </div>
      </div>
      <audio
        src=""
        id="get-audio-duration"
        ref={getAudioDurationRef}
        className="hidden"
        controls={false}
      ></audio>
    </div>
  );
});

const UploadFormSkeleton = () => {
  return (
    <div className="px-2">
      <div className="font-bold text-2xl mb-5">Upload your song</div>
      <div className="flex flex-col gap-y-4">
        <div className="flex flex-col gap-y-4 flex-wrap">
          <Skeleton className="w-full h-9" />
          <Skeleton className="w-full h-9" />
          <Skeleton className="w-full h-9" />
          <Skeleton className="w-full h-9" />
          <div className="flex gap-x-2">
            <Skeleton className="w-full h-9" />
            <Skeleton className="w-20 h-9" />
          </div>
        </div>
      </div>
    </div>
  );
};
