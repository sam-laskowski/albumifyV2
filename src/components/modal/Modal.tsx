"use client";
import { useRouter } from "next/navigation";
import React from "react";

const Modal = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  return (
    <>
      <div className="fixed top-0 left-0 h-screen w-screen flex flex-col items-center justify-center z-20 p-4">
        <button
          onClick={() => router.back()}
          className="absolute inset-0 bg-black bg-opacity-80 border-none w-full z-10"
        />
        <div className="flex flex-wrap bg-gray-600 p-10 pb-20 rounded-md z-30 gap-3">
          {children}
        </div>
      </div>
    </>
  );
};

export default Modal;
