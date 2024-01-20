"use client";
import { signOut } from "next-auth/react";
import React from "react";

type Props = {};

const LogOut = (props: Props) => {
  const SignOut = async () => {
    await signOut();
  };
  return (
    <div onClick={SignOut} className=" cursor-pointer">
      LogOut
    </div>
  );
};

export default LogOut;
