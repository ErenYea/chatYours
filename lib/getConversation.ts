"use server";

import db from "./db";

const getConversation = async (userID: string) => {
  const conversation = await db.conversation.findMany({
    where: {
      userIds: {
        hasSome: [userID],
      },
    },
    include: {
      messages: {
        select: {
          id: true,
          createdAt: true,
          sender: true,
          senderId: true,
          body: true,
        },
        orderBy: {
          createdAt: "asc",
        },
      },
    },
    orderBy: {
      lastMessageAt: "asc",
    },
  });
  if (conversation) {
    return conversation;
  } else {
    return null;
  }
};
export default getConversation;
