"use client";

import React, { useRef } from "react";
// Delete import
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Imessage, useMessage } from "@/lib/store/messages";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { toast } from "sonner";

// Edit import
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export function DeleteMessage() {
  const actionMessage = useMessage((state) => state.actionMessage);
  const deleteMessage = useMessage((state) => state.deleteMessage);

  const handleDelete = async () => {
    const supabase = await supabaseBrowser();
    deleteMessage(actionMessage?.id!);

    const { error } = await supabase
      .from("messages")
      .delete()
      .eq("id", actionMessage?.id!);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("메세지가 삭제되었습니다.");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button id="trigger-delete"></button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>정말 삭제하시겠습니까?</AlertDialogTitle>
          <AlertDialogDescription>
            한 번 삭제한 대화는 복구할 수 없습니다.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>취소하기</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>삭제하기</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export function EditMessage() {
  const actionMessage = useMessage((state) => state.actionMessage);
  const updateMessage = useMessage((state) => state.updateMessage);

  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const handleEdit = async () => {
    const supabase = await supabaseBrowser();
    const text = inputRef.current.value.trim();
    if (text) {
      updateMessage({
        ...actionMessage,
        text,
        is_edit: true,
      } as Imessage);

      const { error } = await supabase
        .from("messages")
        .update({ text, is_edit: true })
        .eq("id", actionMessage?.id!);

      if (error) {
        toast.error(error.message);
      } else {
        toast.success("메세지가 수정되었습니다.");
      }

      document.getElementById("trigger-edit")?.click();
    } else {
      document.getElementById("trigger-edit")?.click();
      document.getElementById("trigger-delete")?.click();
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button id="trigger-edit"></button>
      </DialogTrigger>
      <DialogContent className="w-full">
        <DialogHeader>
          <DialogTitle>메세지 수정하기</DialogTitle>
        </DialogHeader>
        <Input id="name" defaultValue={actionMessage?.text} ref={inputRef} />
        <DialogFooter>
          <Button type="submit" onClick={handleEdit}>
            저장하기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
