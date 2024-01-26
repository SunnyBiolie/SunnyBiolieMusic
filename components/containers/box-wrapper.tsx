import { cn } from "@/lib/utils";
import { ScrollArea } from "../ui/scroll-area";

interface BoxWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export const BoxWrapper = ({ children, className }: BoxWrapperProps) => {
  return (
    <ScrollArea
      className={cn("relative bg-neutral-900 p-4 rounded-lg", className)}
    >
      {children}
    </ScrollArea>
  );
};
