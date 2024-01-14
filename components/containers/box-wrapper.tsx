import { cn } from "@/lib/utils";
import { ElementType, ReactComponentElement } from "react";

interface BoxWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export const BoxWrapper = ({ children, className }: BoxWrapperProps) => {
  return (
    <div className={cn("bg-neutral-900 p-4 rounded-lg", className)}>
      {children}
    </div>
  );
};
