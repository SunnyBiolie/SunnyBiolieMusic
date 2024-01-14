"use client";

import { usePathname } from "next/navigation";
import { NavItem } from "../my-ui/nav-item";

export const Navigation = () => {
  const pathname = usePathname();

  const routes = [
    {
      title: "Home",
      path: "/",
      isActive: pathname === "/",
    },
    {
      title: "Search",
      path: "/search",
      isActive: pathname === "/search",
    },
    {
      title: "Upload",
      path: "/upload",
      isActive: pathname === "/upload",
    },
  ];

  return (
    <nav className="flex gap-x-2 my-4 min-w-[160px]">
      {routes.map((route, index) => (
        <NavItem
          key={index}
          title={route.title}
          path={route.path}
          isActive={route.isActive}
        />
      ))}
    </nav>
  );
};
