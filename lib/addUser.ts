"use server";
import db from "./db";
const addUser = async ({
  email,
  name,
  password,
}: {
  email: string;
  name: string;
  password: string;
}) => {
  const user = await db.user.create({
    data: {
      email,
      name,
      password,
    },
  });
  return user;
};
export default addUser;
