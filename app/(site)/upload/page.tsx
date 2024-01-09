"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { AuthorsName } from "./_components/authors-name";
import { useUser } from "@/hooks/use-user";
import { toast } from "sonner";
import uniqid from "uniqid";
import { useRouter } from "next/navigation";
import { createSupabaseClientComponent } from "@/lib/supabase/client-component";

const UploadPage = () => {
  console.log("--- Load Upload page ---");

  const [authors, setAuthors] = useState<string[]>([]);
  const { user } = useUser();
  const router = useRouter();

  const supabase = createSupabaseClientComponent();

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

  const handleAddAuthor = () => {
    setAuthors(() => [...authors, getValues("author")]);
  };

  const handleRemoveAuthor = useCallback((index: number) => {
    setAuthors((authors) => authors.filter((author, i) => i !== index));
  }, []);

  useEffect(() => {
    console.log(authors);

    resetAuthor();

    setSongValue("authors", authors.join(", "));
    console.log(getSongValues("authors"));
  }, [authors]);

  if (!user) {
    return <div>Log in to continues</div>;
  }

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      const imageFile = values.image?.[0];
      const songFile = values.song?.[0];

      if (!imageFile || !songFile) {
        toast.error("Missing field(s)");
      }

      const uniqueId = uniqid();

      const { data: songData, error: songError } = await supabase.storage
        .from("songs")
        .upload(`${values.title}-${uniqueId}-audio`, songFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (songError) {
        return toast.error(`Failed to upload song: ${songError.message}`);
      }

      const { data: imageData, error: imageError } = await supabase.storage
        .from("images")
        .upload(`${values.title}-${uniqueId}-image`, imageFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (imageError) {
        const { error: removeSongError } = await supabase.storage
          .from("songs")
          .remove([`${values.title}-${uniqueId}-audio`]);

        if (removeSongError) {
          return toast.error(
            `Failed to remove song: ${removeSongError.message}`
          );
        }

        return toast.error(`Failed to upload image: ${imageError.message}`);
      }

      interface createSongSchema {
        user_id: string;
        title: string;
        authors: string;
        song_path: string;
        image_path: string;
      }

      const uploadData: createSongSchema = {
        user_id: user.id,
        title: values.title,
        authors: values.authors,
        song_path: songData.path,
        image_path: imageData.path,
      };

      const { error: createError } = await supabase
        .from("songs")
        .insert(uploadData);

      if (createError) {
        return toast.error(createError.message);
      }

      router.refresh();
      toast.success(`Upload "${values.title}" successfully`);
      reset();
    } catch (error) {
      return toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex flex-col gap-y-4">
      <form
        id="addSong"
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-y-4"
      >
        <Input
          id="title"
          {...register("title", { required: true })}
          placeholder="Title"
          aria-invalid={errors.title ? "true" : "false"}
        />
        {errors.title?.type === "required" && (
          <p className="error-input">Title is required</p>
        )}
        <Input
          id="authors"
          {...register("authors", { required: true })}
          className="hidden"
          aria-invalid={errors.authors ? "true" : "false"}
        />
        {errors.authors && getSongValues("authors") === "" ? (
          <p className="error-input">Chưa nhập tên tác giả nào</p>
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
        <div className="flex flex-col gap-y-2">
          <Input
            id="author"
            {...registerAuthor("author", { required: true, maxLength: 25 })}
            placeholder="Author"
            aria-invalid={errorsAuthor.author ? "true" : "false"}
          />
          {errorsAuthor.author?.type === "maxLength" && (
            <p className=" error-input">Max length 25 is required</p>
          )}
          {errorsAuthor.author?.type === "required" && (
            <p className="error-input">Can not add empty name of author</p>
          )}
        </div>
        <Button variant="secondary">Add</Button>
      </form>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        <div>
          <div className="pb-1">Select your song</div>
          <Input
            id="song"
            type="file"
            accept=".mp3"
            {...register("song", { required: true })}
            aria-invalid={errors.song ? "true" : "false"}
            className="h-auto p-0 file:bg-neutral-800 file:text-neutral-200 file:p-2.5 file:mr-2"
          />
          {errors.song?.type === "required" && (
            <p className="error-input">Song is required</p>
          )}
        </div>
        <div>
          <div className="pb-1">Select your thumb image</div>
          <Input
            id="image"
            type="file"
            accept="image/*"
            {...register("image", { required: true })}
            aria-invalid={errors.image ? "true" : "false"}
            className="h-auto p-0 file:bg-neutral-800 file:text-neutral-200 file:p-2.5 file:mr-2"
          />
          {errors.image?.type === "required" && (
            <p className="error-input">Image is required</p>
          )}
        </div>
      </form>
      <Button type="submit" form="addSong" variant="default">
        Create
      </Button>
    </div>
  );
};

export default UploadPage;
