"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { useSession } from "next-auth/react";
type Props = {};

const Logo = (props: Props) => {
  const session = useSession();
  console.log(session);
  return (
    <Avatar className="cursor-pointer hover:bg-gray-400">
      <AvatarImage
        src={session?.data?.user?.image || "https://github.com/shadcn.png"}
      />
      <AvatarFallback>
        {session?.data?.user?.name?.split(" ")[0][0].toUpperCase()}
        {session?.data?.user?.name
          ?.split(" ")
          [session?.data?.user?.name?.split(" ").length - 1][0].toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
};

export default Logo;
