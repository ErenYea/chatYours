import getUser from "@/lib/getUser";
import { getServerSession } from "next-auth";
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Form from "./form";
type Props = {};

const Profile = async (props: Props) => {
  const session = await getServerSession();

  const user = await getUser(session?.user?.email || "");

  return (
    <div className="w-full h-full flex-1 flex justify-center items-center p-6">
      <div className="border-2 w-1/2 h-full rounded-lg flex flex-col p-4 items-center ">
        <div className="text-lg font-semibold">Profile</div>
        <div className="w-full">
          <Form
            email={user?.email || ""}
            name={user?.name || ""}
            image={user?.image || ""}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
