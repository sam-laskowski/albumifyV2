"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "./ui/button";
import { useAuth } from "@/context/AuthContext";
import { CgProfile } from "react-icons/cg";

const Header = () => {
  const router = useRouter();

  const { globalUser, logout } = useAuth();
  return (
    <>
      <header className="flex flex-row justify-between m-4">
        <h1
          className="text-white font-extrabold text-3xl cursor-pointer"
          onClick={() => router.push("/")}
        >
          albumify
        </h1>
        <div className="flex flex-row gap-2">
          {!globalUser && (
            <Link href="/login">
              <Button>Login</Button>
            </Link>
          )}

          {globalUser && (
            <>
              <div>
                <CgProfile
                  className="cursor-pointer"
                  size={40}
                  onClick={() => router.push(`/profile/${globalUser.uid}`)}
                />
              </div>
              <Button onClick={logout}>Logout</Button>
            </>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
