"use server";
import Pusher from "pusher";
import { Message } from "@prisma/client";
import db from "./db";

const sendMessages = async (
  message: string,
  senderID: string,
  conversationID: string
) => {
  const createdMessage: Message = await db.message.create({
    data: {
      body: message,
      senderId: senderID,
      conversationId: conversationID,
    },
    include: {
      sender: {
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

  await pusher.trigger("chat", "hello", {
    message: `${JSON.stringify(createdMessage)}\n\n`,
  });
  // if (createdMessage) {
  //   return createdMessage;
  // } else {
  //   return null;
  // }
};
export default sendMessages;
