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
      <header className="flex flex-row justify-between">
        <h1 className="text-white font-extrabold text-3xl cursor-pointer">
          albumify
        </h1>
        <div className="flex flex-row gap-2">
          <Link href="/login">
            <Button>Login</Button>
          </Link>

          {globalUser && <Button onClick={logout}>Logout</Button>}
        </div>
      </header>
      <Button onClick={() => router.push("/overview")}>Explore</Button>
    </>
  );
}
