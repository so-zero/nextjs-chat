"use client";

import { User } from "@supabase/supabase-js";
import React, { useEffect, useRef } from "react";
import { useUser } from "./user";

export default function InitUser({ user }: { user: User | undefined }) {
  const userState = useRef(false);

  useEffect(() => {
    if (userState.current) {
      useUser.setState({ user });
    }

    userState.current = true;
  }, [user]);

  return <></>;
}
