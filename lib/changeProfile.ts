"use server";

import db from "./db";
import { writeFile } from "fs/promises";
import { join } from "path";
const changeProfile = async (prevState: any, formData: FormData) => {
  const email = formData.get("email")?.toString();

  const name = formData.get("name")?.toString();
  console.log(name);
  const image = formData.get("image") as File;
  if (image?.name) {
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const path = `./public/${email}.${image.name.split(".")[1]}`;
    await writeFile(path, buffer);
    await db.user.update({
      where: { email: email },
      data: {
        image: `/${email}.${image.name.split(".")[1]}`,
        name: name,
      },
    });
    return { success: true, message: "Save Image" };
  } else {
    await db.user.update({
      where: { email: email },
      data: {
        name: name,
      },
    });
    return { success: true, message: "Save Name" };
  }
  //   console.log(image.name);
  return { success: false, message: "Something went wrong" };
  //   const user = await db.user.findUnique({
  //     where: {
  //       email: email,
  //     },
  //   });
  //   if (user) {
  //     return user;
  //   } else {
  //     return null;
  //   }
};
export default changeProfile;
