"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { registerUser } from "@/lib/registerUser";
export type State = {
  success: boolean;
  message: string;
};

const initialState = {
  success: false,
  message: "",
};

type Props = {};
function Submit() {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} type="submit">
      {pending ? "Registering..." : "Register"}
    </Button>
  );
}
const Form = (props: Props) => {
  const [state, formAction] = useFormState(registerUser, initialState);
  const router = useRouter();
  const { pending } = useFormStatus();
  useEffect(() => {
    if (state.success) {
      router.push("/chats");
      router.refresh();
    }
  }, [state?.success]);
  return (
    <form action={formAction}>
      <div className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="Email Address"
          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="password">Passoword</Label>
          <Input
            id="password"
            type="password"
            name="password"
            placeholder="Password"
          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" type="name" name="name" placeholder="name" />
        </div>
        <Submit />
        {pending
          ? ""
          : !state?.success && (
              <p className="italic text-sm text-red-500">{state?.message}</p>
            )}
      </div>
    </form>
  );
};

export default Form;
