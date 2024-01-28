"use client";

import { useCreateCollectionModal } from "@/hooks/use-modal";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { cn } from "@/lib/utils";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useUser } from "@/hooks/use-user";
import { createSupabaseClientComponent } from "@/lib/supabase/client-component";
import { useState } from "react";
import uniqid from "uniqid";
import { useTriggerFetchData } from "@/hooks/use-data-zustand";

export const CreateCollectionModal = () => {
  const createCollectionModal = useCreateCollectionModal();
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const supabase = createSupabaseClientComponent();
  const triggerFetch = useTriggerFetchData();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      title: "",
    },
  });

  if (!user) {
    return;
  }

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);

      const { error } = await supabase.from("collections").insert({
        user_id: user.id,
        title: values.collectionTitle,
      });

      if (error) {
        setIsLoading(false);
        return toast.error(error.message);
      }

      setIsLoading(false);
      createCollectionModal.onClose();
      triggerFetch.setFetchCollections(uniqid());
      return toast.success(
        `Created "${values.collectionTitle}" collection successfully.`
      );
    } catch (err) {
      return toast.error("Something went wrong when creating a new collection");
    }
  };

  return (
    <div className={cn(createCollectionModal.isOpen ? "block" : "hidden")}>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-[60%] md:min-w-[40%] p-6 z-50 bg-zinc-800 rounded-lg flex flex-col">
        <h2 className="text-2xl font-semibold self-center mb-4">
          New Collection
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-4"
        >
          <Input
            id="collectionTitle"
            {...register("collectionTitle", {
              required: true,
              maxLength: 100,
            })}
            placeholder="Title"
            aria-invalid={errors.collectionTitle ? "true" : "false"}
            disabled={isLoading}
          />
          {errors.collectionTitle?.type === "required" && (
            <p className="error-input">Title is required.</p>
          )}
          {errors.collectionTitle?.type === "maxLength" && (
            <p className="error-input">Max length 100 is required.</p>
          )}
          <Button variant="primary" disabled={isLoading}>
            Create
          </Button>
        </form>
        <XMarkIcon
          className="absolute top-4 right-4 w-5 h-5 cursor-pointer"
          onClick={() => createCollectionModal.onClose()}
        />
      </div>
      <div
        className="fixed top-0 left-0 right-0 bottom-0 bg-neutral-950/80 z-40
      "
      />
    </div>
  );
};
