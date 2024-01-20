import React from "react";
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import Image from "next/image";
import Link from "next/link";
import { getServerSession } from "next-auth";
import LogOut from "./LogOut";
import getUser from "@/lib/getUser";
type Props = {
  active: string | "";
};

const Header = async (props: Props) => {
  const session = await getServerSession();
  const user = await getUser(session?.user?.email || "");
  return (
    <div className="w-full h-full border-b border flex justify-around items-center">
      <Image
        src={"/logo.png"}
        alt=""
        width={130}
        height={0}
        className=""
        loading="lazy"
      />
      <div className="flex items-center space-x-2 ">
        <Link
          href={"/chats"}
          className={` p-2 cursor-pointer hover:bg-gray-300 rounded-lg active:bg-gray-300 ${
            props.active == "chats" && "bg-gray-300"
          }`}
        >
          Chats
        </Link>
        {session?.user ? (
          <Menubar className="border-none ">
            <MenubarMenu>
              <MenubarTrigger>
                <Avatar className="cursor-pointer hover:bg-gray-400">
                  <AvatarImage
                    src={user?.image || "https://github.com/shadcn.png"}
                  />
                  <AvatarFallback>
                    {user?.name?.split(" ")[0][0].toUpperCase()}
                    {user?.name
                      ?.split(" ")
                      [user?.name?.split(" ").length - 1][0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </MenubarTrigger>
              <MenubarContent>
                <MenubarSeparator />
                <MenubarItem inset>
                  <Link href={"/profile"}>Profile</Link>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem inset>
                  <LogOut />
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        ) : (
          <Link
            href={"/login"}
            className={` p-2 cursor-pointer hover:bg-gray-300 rounded-lg active:bg-gray-300 ${
              props.active == "login" && "bg-gray-300"
            }`}
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
