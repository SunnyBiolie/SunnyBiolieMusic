"use client";

import { UserContextProvider } from "@/hooks/use-user";

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  return <UserContextProvider>{children}</UserContextProvider>;
};

export default UserProvider;
