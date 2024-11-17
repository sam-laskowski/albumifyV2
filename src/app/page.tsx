"use client";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const router = useRouter();

  const { globalUser, logout } = useAuth();
  return (
    <>
      <div className="h-screen flex items-center justify-center">
        <div className="mb-60 flex flex-col justify-center items-center">
          <h1 className="text-8xl font-extrabold mb-4">albumify</h1>
          <Button
            variant="ghost"
            className="w-52 text-xl"
            onClick={() => router.push("/overview")}
          >
            Explore
          </Button>
        </div>
        <Image
          className="ml-32 mb-56"
          src={"/record-white.png"}
          width={350}
          height={350}
          alt="record"
        />
      </div>
    </>
  );
}
