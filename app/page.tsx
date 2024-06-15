import React from "react";
import Header from "./components/Header";
import { supabaseServer } from "@/lib/supabase/server";
import InitUser from "@/lib/store/InitUser";
import Input from "./components/Input";

export default async function Home() {
  const supabase = await supabaseServer();
  const { data } = await supabase.auth.getUser();

  return (
    <>
      <div className="max-w-3xl mx-auto md:py-10 h-screen">
        <div className="h-full border rounded-md flex flex-col">
          <Header user={data.user} />
          <div className="flex flex-1 flex-col p-5 h-full overflow-y-auto">
            <div className="flex-1"></div>
            <div className="space-y-7">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((value) => {
                return (
                  <div className="flex gap-2" key={value}>
                    <div className="h-10 w-10 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h1 className="font-bold">Name</h1>
                        <h1 className="text-xs text-gray-400">
                          {new Date().toDateString()}
                        </h1>
                      </div>
                      <p className="text-gray-800">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Modi, omnis. Lorem ipsum dolor sit amet,
                        consectetur adipisicing elit. Modi, omnis.
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <Input />
        </div>
      </div>
      <InitUser user={data.user} />
    </>
  );
}
