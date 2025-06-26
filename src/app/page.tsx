"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <div className="relative flex items-center justify-center h-screen">
        <div className="relative z-10 mb-60 flex flex-col justify-center items-center">
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-extrabold mb-4">
            albumify
          </h1>
          <Link href="/overview">
            <Button
              variant="outline"
              className="w-40 md:w-52 text-lg"
            >
              Explore
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
