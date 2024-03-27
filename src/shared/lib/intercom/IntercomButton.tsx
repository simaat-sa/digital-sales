"use client";

import { useEffect } from "react";
import { useIntercom } from "react-use-intercom";

export default function IntercomButton() {
  const { boot } = useIntercom();

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      typeof window.document !== "undefined"
    ) {
      boot();
    }
  }, [boot]);
  return <></>;
}
