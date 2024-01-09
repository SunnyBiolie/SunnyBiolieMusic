import { TagWrapper } from "@/components/tag-wrapper";

interface AuthorsNameProps {
  authorsName: string[];
  removeAuthor: (index: number) => void;
}

export const AuthorsName = ({
  authorsName,
  removeAuthor,
}: AuthorsNameProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {authorsName.map((name, index) => (
        <TagWrapper
          key={index}
          index={index}
          title={name}
          handleDelete={removeAuthor}
        />
      ))}
    </div>
  );
};
