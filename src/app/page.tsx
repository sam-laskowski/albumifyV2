"use client";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const router = useRouter();

  return (
    <>
      <div className="relative h-screen flex items-center justify-center">
        <div className="relative z-10 mb-60 flex flex-col justify-center items-center">
          <h1 className="text-8xl md:text-8xl font-extrabold mb-4">albumify</h1>
          <Button
            variant="ghost"
            className="w-40 md:w-52 text-lg"
            onClick={() => router.push("/overview")}
          >
            Explore
          </Button>
        </div>
        <div className="absolute inset-0 flex items-center justify-center md:relative md:inset-auto bottom-80">
          <Image
            className="md:ml-32 md:mb-56"
            src={"/record-white.png"}
            width={350}
            height={350}
            alt="record"
          />
        </div>
      </div>
    </>
  );
}
