import React, { Suspense } from "react";
import List from "./List";
import { supabaseServer } from "@/lib/supabase/server";
import InitMessages from "@/lib/store/InitMessages";

export default async function Chat() {
  const supabase = await supabaseServer();

  const { data } = await supabase.from("messages").select("*,users(*)");

  return (
    <Suspense fallback={"loading"}>
      <List />
      <InitMessages messages={data || []} />
    </Suspense>
  );
}
