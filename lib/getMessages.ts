"use server";

import { Message } from "@prisma/client";
import db from "./db";

const getMessages = async (converationID: string) => {
  const conversation: Message[] = await db.message.findMany({
    where: {
      conversationId: converationID,
    },
    include: {
      sender: {
        select: {
          name: true,
          image: true,
        },
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  });
  if (conversation) {
    return conversation;
  } else {
    return null;
  }
};
export default getMessages;
