"use client";

import { useUser } from "@/hooks/use-user";
import { redirect } from "next/navigation";

const AdminPage = () => {
  const { userInfo } = useUser();

  if (userInfo && userInfo?.is_admin === true) {
    return (
      <div>Admin page {`${userInfo?.is_admin} ${userInfo?.full_name}`}</div>
    );
  } else {
    return redirect("/");
  }
};

export default AdminPage;
