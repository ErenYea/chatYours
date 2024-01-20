"use server";

import db from "./db";

const getUser = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email: email,
    },
  });
  if (user) {
    return user;
  } else {
    return null;
  }
};
export default getUser;
