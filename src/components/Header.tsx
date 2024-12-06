"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "./ui/button";
import { useAuth } from "@/context/AuthContext";
import { CgProfile } from "react-icons/cg";

const Header = () => {
  const router = useRouter();

  const copyToClipboard = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
  };

  const { globalUser, logout } = useAuth();
  return (
    <>
      <header className="flex flex-row justify-between m-4 ml-10 mt-6 mr-10">
        <div className="flex flex-row">
          <h1
            className="text-white font-extrabold text-3xl cursor-pointer"
            onClick={() => router.push("/")}
          >
            albumify
          </h1>
          <button
            className="ml-10 rounded-sm pt-2 pb-2 pl-3 pr-3 hover:ring-2 hover:ring-blue-950"
            onClick={() => router.push("/overview")}
          >
            Explore
          </button>
        </div>

        <div className="flex flex-row gap-2">
          {!globalUser && (
            <>
              <Link href="/login">
                <button className="bg-indigo-600 text-white rounded-sm pt-2 pb-2 pl-3 pr-3 hover:ring-2 hover:ring-blue-950">
                  Login
                </button>
              </Link>
            </>
          )}

          {globalUser && (
            <>
              <button
                className="bg-blue-500 text-white rounded-sm mr-5 pt-2 pb-2 pl-3 pr-3 hover:ring-2 hover:ring-blue-950"
                onClick={copyToClipboard}
              >
                Share Profile
              </button>
              <div>
                <CgProfile
                  className="cursor-pointer mr-4"
                  size={38}
                  onClick={() => router.push(`/profile/${globalUser.uid}`)}
                />
              </div>
              <button
                className="bg-indigo-600 text-white rounded-sm pt-2 pb-2 pl-3 pr-3 hover:ring-2 hover:ring-blue-950"
                onClick={logout}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
