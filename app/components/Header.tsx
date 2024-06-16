"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import Online from "./Online";

export default function Header({ user }: { user: User | undefined }) {
  const router = useRouter();

  const handleLoginGithub = () => {
    const supabase = supabaseBrowser();
    supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: location.origin + "/auth/callback",
      },
    });
  };

  const handleLogout = async () => {
    const supabase = supabaseBrowser();
    await supabase.auth.signOut();
    router.refresh();
  };
  return (
    <header className="h-20">
      <div className="p-5 border-b flex items-center justify-between h-full">
        <div>
          <h1 className="text-xl font-bold">Chat</h1>
          <Online />
        </div>
        {user ? (
          <Button onClick={handleLogout}>로그아웃</Button>
        ) : (
          <Button onClick={handleLoginGithub}>로그인</Button>
        )}
      </div>
    </header>
  );
}
