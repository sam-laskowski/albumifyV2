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
      <Button onClick={() => router.push("/overview")}>Explore</Button>
    </>
  );
}
