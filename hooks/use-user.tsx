"use client";

import {
  useSessionContext,
  useUser as useSupabaseUser,
} from "@supabase/auth-helpers-react";
import type { User } from "@supabase/supabase-js";
import type { UserInfo } from "@/types/custom";
import { createContext, useContext, useEffect, useState } from "react";

type UserContextType = {
  accessToken: string | null;
  user: User | null;
  userInfo: UserInfo | null;
  isLoading: boolean;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export interface Props {
  [propName: string]: any;
}

export const UserContextProvider = (props: Props) => {
  const {
    session,
    isLoading: isLoadingSession,
    supabaseClient: supabase,
    error,
  } = useSessionContext();

  const user = useSupabaseUser();
  const accessToken = session?.access_token ?? null;
  const [isLoadingData, setIsLoadingData] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  const getUserInfo = () => supabase.from("users").select("*").single();

  useEffect(() => {
    if (user && !isLoadingData && !userInfo) {
      setIsLoadingData(true);

      Promise.allSettled([getUserInfo()]).then((res) => {
        const userInfoPromise = res[0];

        if (userInfoPromise.status === "fulfilled")
          setUserInfo(userInfoPromise.value.data as UserInfo);
        setIsLoadingData(false);
      });
    } else if (!user && !isLoadingSession && !isLoadingData) {
      setUserInfo(null);
    }
  }, [user, isLoadingSession]);

  const value = {
    accessToken,
    user,
    userInfo,
    isLoading: isLoadingSession || isLoadingData,
  };

  return <UserContext.Provider value={value} {...props} />;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used with a UserContextProvider");
  }

  return context;
};
