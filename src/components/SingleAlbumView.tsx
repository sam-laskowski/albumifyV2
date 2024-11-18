"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaRegStar, FaStar, FaPlus, FaCheck } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { deleteField, doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default function SingleAlbumView({ albumId }: { albumId: number }) {
  const { globalUser, globalData, setGlobalData, isLoading } = useAuth();
  const [hover, setHover] = useState<number>(0);
  const [newRating, setNewRating] = useState<number>(); //rating
  const router = useRouter();

  useEffect(() => {
    async function handleSubmitRating() {
      if (globalUser == null) {
        router.push("/signup");
        return;
      }
      if (!newRating || newRating == rating) {
        console.log("invalid rating");
        return;
      }

      try {
        const newGlobalData = {
          ...globalData,
          [albumId]: {
            ...globalData[albumId],
            rating: newRating,
          },
        };

        setGlobalData(newGlobalData);

        const userRef = doc(db, "users", globalUser.uid);
        await setDoc(
          userRef,
          {
            [albumId]: { rating: newRating, isOnToListen: false },
          },
          { merge: true }
        );
      } catch (error) {
        console.log((error as Error).message);
      }
    }
    handleSubmitRating();
  }, [newRating]);

  async function handleDeleteAlbum() {
    if (globalUser == null) {
      router.push("/signup");
      return;
    }

    try {
      const newGlobalData = { ...globalData };
      delete newGlobalData[albumId];

      setGlobalData(newGlobalData);

      const userRef = doc(db, "users", globalUser.uid);
      await updateDoc(userRef, {
        [albumId]: deleteField(),
      });
      router.back();
    } catch (error) {
      console.log((error as Error).message);
    }
  }

  if (isLoading || !globalData || !globalData[albumId]) {
    return <div>Loading...</div>;
  }
  const { albumTitle, albumArtist, albumCover, rating, isOnToListen } =
    globalData[albumId];

  return (
    <div className="mr-10">
      <div className="flex flex-col items-center">
        <div className="flex flex-col">
          <Image
            src={albumCover}
            alt="Album Cover"
            width={400}
            height={400}
            className="rounded-sm"
          />
          <h1 className="font-bold">{albumTitle}</h1>
          <h1 className="opacity-80">{albumArtist}</h1>
        </div>
        <div className="mt-2 flex flex-row items-center justify-center">
          {[...Array(10)].map((_, index) => {
            const starIndex = index + 1;
            //console.log("starindex", starIndex);
            return (
              <div
                className="relative"
                key={index}
                onClick={() => {
                  setNewRating(starIndex);
                }}
                onMouseEnter={() => setHover(starIndex)}
                onMouseLeave={() => setHover(0)}
              >
                {starIndex <= (hover || rating) ? (
                  <FaStar
                    size={40}
                    className="text-yellow-500"
                  />
                ) : (
                  <FaRegStar
                    size={40}
                    className="text-yellow-500"
                  />
                )}
              </div>
            );
          })}
        </div>
        <button
          onClick={handleDeleteAlbum}
          className="bg-zinc-800 flex flex-row pr-2 pl-2 rounded-md justify-center items-center mt-2 pt-2 pb-2 hover:ring-2 hover:ring-stone-600"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
