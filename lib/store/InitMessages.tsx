"use client";

import React, { useEffect, useRef } from "react";
import { Imessage, useMessage } from "./messages";

export default function InitMessages({ messages }: { messages: Imessage[] }) {
  const userState = useRef(false);

  useEffect(() => {
    if (userState.current) {
      useMessage.setState({ messages });
    }

    userState.current = true;
  }, [messages]);

  return <></>;
}
