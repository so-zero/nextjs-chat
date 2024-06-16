"use client";

import React from "react";
import { Input as ChatInput } from "@/components/ui/input";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { toast } from "sonner";
import { v4 as uuid } from "uuid";
import { useUser } from "@/lib/store/user";
import { Imessage, useMessage } from "@/lib/store/messages";

export default function Input() {
  const user = useUser((state) => state.user);
  const addMessage = useMessage((state) => state.addMessage);
  const setMessageIds = useMessage((state) => state.setMessageIds);

  const supabase = supabaseBrowser();

  const handleSendMessage = async (text: string) => {
    if (text.trim()) {
      const newMessage = {
        id: uuid(),
        text,
        send_by: user?.id,
        is_edit: false,
        created_at: new Date().toISOString(),
        users: {
          id: user?.id,
          avatar_url: user?.user_metadata.avatar_url,
          created_at: new Date().toISOString(),
          display_name: user?.user_metadata.user_name,
        },
      };
      addMessage(newMessage as Imessage);
      setMessageIds(newMessage.id);

      const { error } = await supabase.from("messages").insert({ text });

      if (error) {
        toast.error(error.message);
      }
    } else {
      toast.error(
        "메시지는 비워둘 수 없습니다. 계속하려면 문자를 입력해 주세요!"
      );
    }
  };
  return (
    <div className="p-5">
      <ChatInput
        placeholder="메세지 보내기"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSendMessage(e.currentTarget.value);
            e.currentTarget.value = "";
          }
        }}
      />
    </div>
  );
}
