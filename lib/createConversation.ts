"use server";
import Pusher from "pusher";
import db from "./db";

const createConversation = async (
  userID1: string,
  userID2: string,
  email: string
) => {
  const createConversation = await db.conversation.create({
    data: {
      name: email,
      userIds: [userID1, userID2],
    },
    include: {
      users: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });
  const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID || "",
    key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY || "",
    secret: process.env.PUSHER_SECRET || "",
    cluster: "ap1",
    useTLS: true,
  });

  await pusher.trigger("conversation", "hello", {
    message: `${JSON.stringify(createConversation)}\n\n`,
  });
  // if (createConversation) {
  //   return createConversation;
  // } else {
  //   return null;
  // }
};
export default createConversation;
