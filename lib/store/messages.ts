import { User } from "@supabase/supabase-js";
import { create } from "zustand";

export type Imessage = {
  created_at: string;
  id: string;
  is_edit: boolean;
  send_by: string;
  text: string;
  users: {
    avatar_url: string;
    created_at: string;
    display_name: string;
    id: string;
  } | null;
};

interface MessagesState {
  messages: Imessage[];
  addMessage: (message: Imessage) => void;
  actionMessage: Imessage | undefined;
  messageIds: string[];
  setActionMessage: (message: Imessage | undefined) => void;
  deleteMessage: (messageId: string) => void;
  updateMessage: (message: Imessage) => void;
  setMessageIds: (id: string) => void;
}

export const useMessage = create<MessagesState>()((set) => ({
  messages: [],
  messageIds: [],
  actionMessage: undefined,
  setMessageIds: (id: string) =>
    set((state) => ({ messageIds: [...state.messageIds, id] })),
  addMessage: (newMessages) =>
    set((state) => ({
      messages: [...state.messages, newMessages],
    })),
  setActionMessage: (message) => set(() => ({ actionMessage: message })),
  deleteMessage: (messageId) =>
    set((state) => {
      return {
        messages: state.messages.filter((message) => message.id !== messageId),
      };
    }),
  updateMessage: (updateMsg) =>
    set((state) => {
      return {
        messages: state.messages.filter((message) => {
          if (message.id === updateMsg.id) {
            (message.text = updateMsg.text),
              (message.is_edit = updateMsg.is_edit);
          }
          return message;
        }),
      };
    }),
}));
