import { XMarkIcon } from "@heroicons/react/16/solid";

interface TagWrapperProps {
  index: number;
  title: string;
  handleDelete: (index: number) => void;
}

export const TagWrapper = ({ index, title, handleDelete }: TagWrapperProps) => {
  return (
    <div className="inline-flex items-center justify-center gap-x-1 pl-1.5 pr-1 py-1 border-0 rounded-sm bg-neutral-700">
      <span className="text-sm">{title}</span>
      <XMarkIcon
        className="w-4 h-4 cursor-pointer"
        onClick={() => {
          handleDelete(index);
        }}
      />
    </div>
  );
};
