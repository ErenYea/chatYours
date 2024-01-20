"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Pusher from "pusher-js";
import { Textarea } from "@/components/ui/textarea";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import getUser from "@/lib/getUser";
import createConversation from "@/lib/createConversation";
import { Conversation, Message } from "@prisma/client";
import getConversation from "@/lib/getConversation";
import getMessages from "@/lib/getMessages";
import sendMessages from "@/lib/sendMessage";

type Props = {};

const Chats = (props: Props) => {
  var pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY as string, {
    cluster: "eu",
  });
  const session = useSession();
  const [search, setSearch] = useState<string>("");
  const [searchResult, setSearchResult] = useState<boolean>(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<string>("");
  const AddPeople = async () => {
    if (search !== "") {
      setSearchResult(false);
      let user = await getUser(search);
      if (user) {
        await createConversation(
          user.id,
          session.data?.user?.id || "",
          session.data?.user.name || ""
        );

        setOpen(false);
      } else {
        setSearchResult(true);
      }
    }
  };
  const getConv = async () => {
    let conv = await getConversation(session.data?.user?.id || "");
    // console.log(conv);
    if (conv) {
      setConversations(conv);
    }
    // console.log("conv", conv);
  };
  const OpenConverstaion = async (id: string) => {
    if (selectedConversation == id) {
      return;
    }
    console.log("id", id);
    setSelectedConversation(id);
    let mess = await getMessages(id);
    if (mess) {
      setMessages(mess);
    }
  };
  const SendMessage = async () => {
    if (message !== "") {
      await sendMessages(
        message,
        session.data?.user?.id || "",
        selectedConversation
      );
      setMessage("");
      // if (mess) {
      //   setMessages((prev: Message[]) => {
      //     return [...prev, mess];
      //   });
      // }
    }
  };

  // var channel = pusher.subscribe("my-channel");
  // channel.bind("my-event", (data: any) => {});
  useEffect(() => {
    if (session?.data?.user) {
      getConv();
    }
  }, [session?.data?.user]);
  useEffect(() => {
    if (session?.data?.user) {
      var pusher = new Pusher(
        process.env.NEXT_PUBLIC_PUSHER_APP_KEY as string,
        {
          cluster: "ap1",
        }
      );

      var channel = pusher.subscribe("chat");
      channel.bind("hello", function (data: any) {
        const parsedComments = JSON.parse(data.message);
        // console.log(selectedConversation);
        // console.log(parsedComments);
        if (parsedComments?.conversationId == selectedConversation) {
          // console.log(parsedComments);
          setMessages((prev) => [...prev, parsedComments]);
        }
      });

      return () => {
        pusher.unsubscribe("chat");
      };
    }
  }, [session?.data?.user, selectedConversation]);
  useEffect(() => {
    if (session?.data?.user) {
      var pusher = new Pusher(
        process.env.NEXT_PUBLIC_PUSHER_APP_KEY as string,
        {
          cluster: "ap1",
        }
      );

      var channel = pusher.subscribe("conversation");
      channel.bind("hello", function (data: any) {
        const parsedComments = JSON.parse(data.message);
        // console.log(selectedConversation);
        // console.log(parsedComments);
        // if (parsedComments?.conversationId == selectedConversation) {
        // console.log(parsedComments);
        setConversations((prev) => [...prev, parsedComments]);
        // }
      });

      return () => {
        pusher.unsubscribe("conversation");
      };
    }
  }, [session?.data?.user]);
  return (
    <div className="w-full h-screen flex justify-center mt-4">
      <div className="px-4 py-4 w-full h-full min-h-[400px] border flex  space-x-2">
        <div className="flex flex-col w-1/4 border-2 rounded-lg p-2">
          <div className="flex justify-between w-full items-center">
            <div className="text-xl font-semibold">Chats</div>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button>Add People</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Start Conversation with People</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    className="col-span-3"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                {searchResult && <div className="text-red-500">Not Found</div>}

                <DialogFooter>
                  <Button onClick={AddPeople}>Add</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <Separator className="my-4" />
          {conversations?.map((conv) => {
            return (
              <>
                <div
                  className={` cursor-pointer hover:bg-gray-400 p-2 rounded-lg ${
                    selectedConversation == conv.id ? "bg-gray-400" : ""
                  }`}
                  key={conv.id}
                  onClick={() => OpenConverstaion(conv.id)}
                >
                  {conv.name}
                </div>
                <Separator className="my-2" />
              </>
            );
          })}
        </div>
        <div className="flex flex-col h-full w-3/4 px-2 py-4 border-2 space-y-2 rounded-lg">
          {selectedConversation !== "" ? (
            <>
              <div className="h-[90%] border-2 border-gray-400 rounded-lg p-2 space-y-2 overflow-y-scroll overflow-x-clip">
                {messages?.map((conv: any) => {
                  return (
                    <div
                      className={`w-full flex ${
                        session?.data?.user?.id == conv.senderId
                          ? "justify-end"
                          : "justify-start"
                      } `}
                      key={conv.id}
                    >
                      <Alert
                        className={`${
                          session?.data?.user?.id == conv.senderId
                            ? "border-green-400"
                            : " border-red-400"
                        } w-fit`}
                      >
                        <AlertTitle>{conv?.sender?.name}</AlertTitle>
                        <AlertDescription>{conv.body}</AlertDescription>
                      </Alert>
                    </div>
                  );
                })}
              </div>

              <div className="h-[10%] w-full flex items-center  space-x-2">
                <Textarea
                  placeholder="Type your message here."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <Button onClick={SendMessage}>Send</Button>
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Chats;
