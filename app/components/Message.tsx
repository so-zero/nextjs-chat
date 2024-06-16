import React from "react";
import { Imessage } from "@/lib/store/messages";
import Image from "next/image";
import MessageMenu from "./MessageMenu";
import { useUser } from "@/lib/store/user";

export default function Message({ message }: { message: Imessage }) {
  const user = useUser((state) => state.user);

  return (
    <div className="flex gap-2">
      <div>
        <Image
          src={message.users?.avatar_url!}
          alt={message.users?.display_name!}
          width={40}
          height={40}
          className="rounded-full ring-primary ring-1"
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="font-bold">{message.users?.display_name}</h1>
            <h1 className="text-xs text-gray-400">
              {new Date(message.created_at).toDateString()}
            </h1>
            {message.is_edit && (
              <h1 className="text-xs text-gray-400">수정된 메세지</h1>
            )}
          </div>
          {message.users?.id === user?.id && <MessageMenu message={message} />}
        </div>
        <p className="text-gray-800">{message.text}</p>
      </div>
    </div>
  );
}
