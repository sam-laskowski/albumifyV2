"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaRegStar, FaStar, FaPlus, FaCheck } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { deleteField, doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

export default function SingleAlbumView({ albumId }: { albumId: number }) {
  const { globalUser, globalData, setGlobalData, isLoading } = useAuth();
  const [hover, setHover] = useState<number>(0);
  const [newRating, setNewRating] = useState<number>(); //rating
  const router = useRouter();

  const getStarColor = (starNumber: number) => {
    if (starNumber <= 3) {
      return { className: "text-red-500", stroke: "#f87171" };
    } else if (starNumber <= 7) {
      return { className: "text-yellow-500", stroke: "#facc15" };
    } else {
      return { className: "text-blue-500", stroke: "#60a5fa" };
    }
  };

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
    return (
      <div className="mr-10">
        <div className="flex flex-col items-center mt-10 space-y-3">
          <div className="flex flex-col rounded-sm p-4 space-y-3">
            <Skeleton className="w-[400px] h-[400px] rounded-sm" />
            <Skeleton className="self-center w-48 h-6 mt-2" />
            <Skeleton className="self-center w-32 h-4 mt-1" />
            <Skeleton className="self-center w-full h-10 m-3" />
          </div>
          <Skeleton className="w-24 h-10 mt-2 self-center" />
        </div>
      </div>
    );
  }
  const { albumTitle, albumArtist, albumCover, rating, isOnToListen } =
    globalData[albumId];

  return (
    <div className="mr-10">
      <div className="flex flex-col items-center mt-10">
        <div className="flex flex-col bg-neutral-800 rounded-sm p-4">
          <Image
            src={albumCover}
            alt="Album Cover"
            width={400}
            height={400}
            className="rounded-sm"
          />
          <h1 className="font-bold text-center">{albumTitle}</h1>
          <h1 className="opacity-80 text-center">{albumArtist}</h1>
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
                      className={getStarColor(hover || rating).className}
                    />
                  ) : (
                    <FaRegStar
                      size={40}
                      className={getStarColor(hover || rating).className}
                    />
                  )}
                </div>
              );
            })}
          </div>
          <Button
            onClick={handleDeleteAlbum}
            variant="destructive"
            className="mt-2 w-24 self-center"
          >
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
}
