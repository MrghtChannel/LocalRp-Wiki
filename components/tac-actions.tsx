"use client";

import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { useEffect, useState } from "react";

export default function TocActions() {
  const [currentUrl, setCurrentUrl] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  const handleCopy = (value: string | number | undefined) => {
    if (value !== undefined && value !== null) {
      const textToCopy = String(value);
      navigator.clipboard.writeText(textToCopy).then(() => {
        setAlertMessage("Скопійовано!");
        setTimeout(() => setAlertMessage(""), 2000);
      });
    }
  };

  return (
    <div className="mt-4 flex flex-col gap-1">
      <Button
        variant="outline"
        className="flex items-center gap-2"
        onClick={() => handleCopy(currentUrl)}
      >
        <Copy size={16} />
        Копіювати URL
      </Button>

      {alertMessage && (
        <span className="text-sm text-green-600">{alertMessage}</span>
      )}

      <div className="flex justify-center mt-2">
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSfC_ZZOYeQ_UbkE1oFk4fCATiTJEwei7y8qJ-Va_44Q1ZKuoQ/viewform?usp=dialog"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-muted-foreground hover:underline"
        >
          Знайшли помилку в статті?
        </a>
      </div>
    </div>
  );
}
