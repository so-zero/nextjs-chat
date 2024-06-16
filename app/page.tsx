import React from "react";
import Header from "./components/Header";
import { supabaseServer } from "@/lib/supabase/server";
import InitUser from "@/lib/store/InitUser";
import Input from "./components/Input";
import Chat from "./components/Chat";
import Home from "./components/Home";

export default async function Page() {
  const supabase = await supabaseServer();
  const { data } = await supabase.auth.getUser();

  return (
    <>
      <div className="max-w-3xl mx-auto md:py-10 h-screen">
        <div className="h-full border rounded-md flex flex-col relative">
          <Header user={data.user || undefined} />
          {data?.user ? (
            <>
              <Chat />
              <Input />
            </>
          ) : (
            <Home />
          )}
        </div>
      </div>
      <InitUser user={data.user || undefined} />
    </>
  );
}
