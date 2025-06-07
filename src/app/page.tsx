"use client";
import Chat from "@/components/Chat";
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {}, []);
  return (
    <>
      <Chat />
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
          <Image
            src="/circles.svg"
            alt="circles logo"
            width={180}
            height={38}
            priority
          />
        </main>
      </div>
    </>
  );
}
