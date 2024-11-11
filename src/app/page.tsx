"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const router = useRouter();
  return (
    <>
      <h1 className="text-white font-extrabold text-3xl cursor-pointer">
        albumify
      </h1>
      <Button onClick={() => router.push("/overview")}>Explore</Button>
      <Link href="/login">Login</Link>
      <Link href="/signup">Sign Up</Link>
    </>
  );
}
