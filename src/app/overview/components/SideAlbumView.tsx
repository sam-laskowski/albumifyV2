"use client";
import React, { use, useEffect, useRef, useState } from "react";
import { Album, Artist } from "./Deezer.types";
import Image from "next/image";
import HalfIcon from "./HalfIcon";

import {
  FaRegStar,
  FaRegStarHalf,
  FaStarHalfAlt,
  FaStar,
  FaStarHalf,
} from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../../firebase";

interface SideAlbumView {
  albumId: number;
  albumObject: Album | undefined;
  setAlbumObject: (value: Album) => void;
  artistName: string | undefined;
}

const SideAlbumView: React.FC<SideAlbumView> = ({
  albumId,
  albumObject,
  setAlbumObject,
  artistName,
}) => {
  //console.log(albumObject);
  //console.log("album object found? ", Number.isInteger(albumObject?.id));
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number>(0);
  const shouldSubmitRating = useRef(true);
  const router = useRouter();

  const { globalUser, globalData, setGlobalData } = useAuth();
  // console.log(rating);
  // console.log(globalData);
  const userAlbumRating = globalData ? globalData[albumId]?.rating : 0;

  //console.log(globalData[albumId].rating);

  async function handleSubmitRating() {
    if (globalUser == null) {
      router.push("/signup");
      return;
    }

    if (!rating) {
      return;
    }

    try {
      const newGlobalData = {
        ...(globalData || {}),
      };

      const newData = {
        rating: rating,
        albumTitle: albumObject?.title,
        albumCover: albumObject?.cover_medium,
        albumArtist: artistName,
      };

      newGlobalData[albumId] = newData;

      setGlobalData(newGlobalData);

      console.log(globalData);

      const userRef = doc(db, "users", globalUser.uid);

      // if already rated album update in database
      // else add new entry to database
      const res = await setDoc(
        userRef,
        {
          [albumId]: newData,
        },
        { merge: true }
      );
      resetRating();
    } catch (error) {
      console.log((error as Error).message);
    }
  }
  useEffect(() => {
    if (shouldSubmitRating.current) {
      handleSubmitRating();
    } else {
      shouldSubmitRating.current = true;
    }
  }, [rating]);

  const resetRating = () => {
    shouldSubmitRating.current = false;
    setRating(0);
  };
  return (
    <>
      {Number.isInteger(albumObject?.id) && (
        <div className="flex flex-col">
          <Image
            src={albumObject?.cover_big!}
            alt="Album Cover"
            width={400}
            height={400}
          />
          <div className="mt-2 flex flex-row items-center justify-center">
            {[...Array(10)].map((_, index) => {
              const starIndex = index + 1;
              //console.log("starindex", starIndex);
              return (
                <div
                  className="relative"
                  key={index}
                  onClick={() => {
                    setRating(starIndex);
                  }}
                  onMouseEnter={() => setHover(starIndex)}
                  onMouseLeave={() => setHover(0)}
                >
                  {starIndex <= (hover || rating || userAlbumRating) ? (
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
      )}
    </>
  );
};

export default SideAlbumView;
