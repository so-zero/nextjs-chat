import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RxDotsHorizontal } from "react-icons/rx";
import { Imessage } from "@/lib/store/messages";
import { useMessage } from "@/lib/store/messages";

export default function MessageMenu({ message }: { message: Imessage }) {
  const setActionMessage = useMessage((state) => state.setActionMessage);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <RxDotsHorizontal />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>설정</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            document.getElementById("trigger-edit")?.click();
            setActionMessage(message);
          }}
        >
          수정
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            document.getElementById("trigger-delete")?.click();
            setActionMessage(message);
          }}
        >
          삭제
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
