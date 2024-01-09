import { cn } from "@/lib/utils";
import Link from "next/link";

interface NavItemProps {
  title: string;
  path: string;
  isActive: boolean;
}

export const NavItem = ({ title, path, isActive }: NavItemProps) => {
  return (
    <div className="py-2 px-3 w-full h-full">
      <Link
        href={path}
        className={cn(
          "flex items-center justify-center gap-x-2 font-semibold hover:no-underline transition",
          isActive ? "" : "underline text-[#ddd]/90"
        )}
      >
        {title}
      </Link>
    </div>
  );
};
