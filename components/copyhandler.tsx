"use client";

import { useEffect } from "react";

export function CopyHandler() {
  useEffect(() => {
    const handler = (e: ClipboardEvent) => {
      const selection = window.getSelection()?.toString();
      if (selection) {
        e.preventDefault();
        const textToCopy = `${selection}\n\n— Взято з https://local-rp-wiki.vercel.app/`;
        e.clipboardData?.setData("text/plain", textToCopy);
      }
    };

    document.addEventListener("copy", handler);
    return () => {
      document.removeEventListener("copy", handler);
    };
  }, []);

  return null;
}
