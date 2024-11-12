"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "./ui/button";
import { useAuth } from "@/context/AuthContext";

const Header = () => {
  const router = useRouter();

  const { globalUser, logout } = useAuth();
  return (
    <>
      <header className="flex flex-row justify-between">
        <h1 className="text-white font-extrabold text-3xl cursor-pointer">
          albumify
        </h1>
        <div className="flex flex-row gap-2">
          {!globalUser && (
            <Link href="/login">
              <Button>Login</Button>
            </Link>
          )}

          {globalUser && <Button onClick={logout}>Logout</Button>}
        </div>
      </header>
    </>
  );
};

export default Header;
