"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[87vh] px-2 sm:py-28 py-36 flex flex-col gap-4 items-center">
      <div className="text-center flex flex-col items-center justify-center w-fit gap-2">
        <h2 className="text-7xl font-bold pr-1">Упс!</h2>
        <p className="text-muted-foreground text-md font-medium">
          Щось пішло не так {":`("}
        </p>
        <p>
          Вибачте, сталася помилка під час обробки вашого запиту.
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Button
          onClick={
            () => reset()
          }
        >
          Перезавантажити сторінку
        </Button>
        <Link href="/" className={buttonVariants({})}>
          Повернутися на головну
        </Link>
      </div>
    </div>
  );
}
