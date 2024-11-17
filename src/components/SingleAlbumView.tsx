"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaRegStar, FaStar, FaPlus, FaCheck } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default function SingleAlbumView({ albumId }: { albumId: number }) {
  //console.log(albumObject);
  //console.log("album object found? ", Number.isInteger(albumObject?.id));
  const [hover, setHover] = useState<number>(0);
  // const shouldSubmitRating = useRef(true);
  const router = useRouter();
  const { globalUser, globalData, setGlobalData } = useAuth();

  const { albumTitle, albumArtist, albumCover, rating, isOnToListen } =
    globalData[albumId];
  const [newRating, setNewRating] = useState<number>(rating);

  async function handleSubmitRating() {
    if (globalUser == null) {
      router.push("/signup");
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
  useEffect(() => {
    if (newRating == rating) {
      return;
    }
    handleSubmitRating();
  }, [newRating]);

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
      </div>
    </div>
  );
}
