"use client";

import { useRouter } from "next/navigation";
import React, { RefObject, useEffect, useRef, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { signIn, useSession } from "next-auth/react";
import Image from "next/image";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import changeProfile from "@/lib/changeProfile";
export type State = {
  success: boolean;
  message: string;
};

const initialState = {
  success: false,
  message: "",
};

type Props = {
  email: string;
  name: string;
  image: string;
};
function Submit({
  email,
  name,
  image,
  incomingImage,
}: {
  email: string;
  name: string;
  image: string;
  incomingImage: string;
}) {
  const { pending } = useFormStatus();
  const session = useSession();
  console.log(session);
  console.log(email, name, image, incomingImage);
  return (
    <Button
      disabled={pending}
      type="submit"
      className={`${
        session?.data?.user?.image == null
          ? session?.data?.user?.name !== name ||
            (image !== null && image !== "" && image !== incomingImage)
            ? ""
            : "hidden"
          : session?.data?.user?.name !== name ||
            session?.data?.user?.image !== image
          ? ""
          : "hidden"
      }`}
    >
      {pending ? "Saving Changes..." : "Save Changes"}
    </Button>
  );
}
const Form = (props: Props) => {
  const [state, formAction] = useFormState(changeProfile, initialState);
  const router = useRouter();
  const [name, setName] = useState<string>(props.name);
  const [image, setImage] = useState<string>(props.image);
  const { pending } = useFormStatus();
  const imageRef = useRef<HTMLInputElement>(null);

  const UploadImage = () => {
    if (imageRef) {
      imageRef?.current?.click();
    }
  };
  const handleChange = (event: any) => {
    let imageFile: File = event.target.files[0];
    setImage(imageFile.name);
  };
  useEffect(() => {
    if (state.success) {
      console.log("here");
      signIn("credentials", {
        email: props.email,
        name: name,
        image: image,
      });
      // router.push("/chats");
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
            value={props.email}
            placeholder="Email Address"
            onChange={(e) => {}}
          />
        </div>

        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            type="name"
            name="name"
            placeholder="name"
            value={props.name == name ? props.name : name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="flex  items-center space-y-1.5 space-x-3">
          <div className="flex items-center w-40  rounded-xl">
            <AspectRatio
              ratio={16 / 9}
              className="flex items-center justify-center"
            >
              <Image
                src={
                  props.image !== ""
                    ? props.image
                    : "https://github.com/shadcn.png"
                }
                layout="fill"
                alt="logo"
                priority
                className="rounded-md "
              />
            </AspectRatio>
          </div>
          <div className="w-full h-full">
            <div
              className="p-2 border-2 w-fit rounded-lg cursor-pointer"
              onClick={UploadImage}
            >
              Upload Image
            </div>
            <div>{image}</div>
          </div>
          <input
            type="file"
            name="image"
            id="image"
            ref={imageRef}
            onChange={handleChange}
            className="hidden"
          />
        </div>
        <Submit
          email={props.email}
          name={name}
          image={image}
          incomingImage={props.image}
        />
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
