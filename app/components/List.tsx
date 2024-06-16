"use client";

import React, { useEffect, useRef, useState } from "react";
import { Imessage, useMessage } from "@/lib/store/messages";
import Message from "./Message";
import { DeleteMessage, EditMessage } from "./MessageAction";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { toast } from "sonner";
import { IoIosArrowDown } from "react-icons/io";

export default function List() {
  const scrollRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const [userScroll, setUserScroll] = useState(false);
  const [notification, setNotification] = useState(0);
  const { messages, addMessage, messageIds, deleteMessage, updateMessage } =
    useMessage((state) => state);
  const supabase = supabaseBrowser();

  useEffect(() => {
    const channel = supabase
      .channel("chat-room")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        async (payload) => {
          if (!messageIds.includes(payload.new.id)) {
            const { error, data } = await supabase
              .from("users")
              .select("*")
              .eq("id", payload.new.send_by)
              .single();

            if (error) {
              toast.error(error.message);
            } else {
              const newMessage = {
                ...payload.new,
                users: data,
              };
              addMessage(newMessage as Imessage);
            }
          }
          const scrollContainer = scrollRef.current;
          if (
            scrollContainer.scrollTop <
            scrollContainer.scrollHeight - scrollContainer.clientHeight - 10
          ) {
            setNotification((current) => current + 1);
          }
        }
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "messages" },
        (payload) => {
          deleteMessage(payload.old.id);
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "messages" },
        (payload) => {
          updateMessage(payload.new as Imessage);
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [messages]);

  useEffect(() => {
    const scrollContainer = scrollRef.current;

    if (scrollContainer && !userScroll) {
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }, [messages]);

  const handleOnScroll = () => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      const isScroll =
        scrollContainer.scrollTop <
        scrollContainer.scrollHeight - scrollContainer.clientHeight - 10;
      setUserScroll(isScroll);
      if (
        scrollContainer.scrollTop ===
        scrollContainer.scrollHeight - scrollContainer.clientHeight
      ) {
        setNotification(0);
      }
    }
  };
  const scrollDown = () => {
    setNotification(0);
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  };

  return (
    <>
      <div
        className="flex flex-1 flex-col p-5 h-full overflow-y-auto"
        ref={scrollRef}
        onScroll={handleOnScroll}
      >
        <div className="space-y-7">
          {messages.map((value, index) => {
            return <Message key={index} message={value} />;
          })}
        </div>
        <DeleteMessage />
        <EditMessage />
      </div>
      {userScroll && (
        <div className=" absolute bottom-20 left-0 w-full">
          {notification ? (
            <div
              className="w-36 mx-auto bg-primary text-white py-1 px-2 rounded-md cursor-pointer text-sm text-center"
              onClick={scrollDown}
            >
              <h1>새로운 메세지 : {notification}</h1>
            </div>
          ) : (
            <div
              className="w-10 h-10 bg-black text-white rounded-full justify-center items-center flex mx-auto border cursor-pointer hover:scale-110 transition-all"
              onClick={scrollDown}
            >
              <IoIosArrowDown size={20} />
            </div>
          )}
        </div>
      )}
    </>
  );
}
