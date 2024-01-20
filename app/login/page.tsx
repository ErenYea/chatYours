import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import Form from "./form";

type Props = {};

const Login = async (props: Props) => {
  const session = await getServerSession();
  console.log(session);
  if (!session) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Login</CardTitle>
          </CardHeader>
          <CardContent>
            <Form />
          </CardContent>
          <Separator className="my-4" />
          <CardFooter className="flex justify-between">
            <div className="text-sm space-x-1">
              Don&apos;t Have Account{" "}
              <Link
                href={"/register"}
                className=" cursor-pointer text-blue-400"
              >
                Click Here{" "}
              </Link>
              to register
            </div>
          </CardFooter>
        </Card>
      </div>
    );
  } else {
    redirect("/chats");
  }
};

export default Login;
