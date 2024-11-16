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
  FaPlus,
  FaCheck,
} from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../../firebase";
import { Button } from "@/components/ui/button";

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
  const [isOnToListen, setIsOnToListen] = useState(false);
  const shouldSubmitRating = useRef(true);
  const router = useRouter();

  const { globalUser, globalData, setGlobalData } = useAuth();
  const userAlbumRating = globalData ? globalData[albumId]?.rating : 0;

  async function handleSubmitRating() {
    if (globalUser == null) {
      router.push("/signup");
      //resetRating();
      return;
    }

    try {
      const newGlobalData = {
        ...(globalData || {}),
      };

      console.log(isOnToListen);
      const newData = {
        rating: rating,
        albumTitle: albumObject?.title,
        albumCover: albumObject?.cover_medium,
        albumArtist: artistName,
        isOnToListen: isOnToListen,
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
      //resetRating();
    } catch (error) {
      console.log((error as Error).message);
    }
  }

  useEffect(() => {
    if (isOnToListen) {
      setRating(0);
    }
    if (rating > 0) {
      setIsOnToListen(false);
    }
    if (shouldSubmitRating.current) {
      handleSubmitRating(); // possibly put handle within above if blocks
    } else {
      shouldSubmitRating.current = true;
    }
  }, [rating, isOnToListen]);

  // const resetRating = () => {
  //   shouldSubmitRating.current = false;
  //   setRating(0);
  // };
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
                  {starIndex <= (hover || userAlbumRating) ? (
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
          <Button
            className="mt-2"
            onClick={() => {
              setIsOnToListen(!isOnToListen);
            }}
          >
            {isOnToListen ? <FaCheck /> : <FaPlus />}
            To Listen
          </Button>
        </div>
      )}
    </>
  );
};

export default SideAlbumView;
