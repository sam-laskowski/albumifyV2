"use client";
import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../../firebase";
import { Skeleton } from "@/components/ui/skeleton";
import router from "next/router";
import StarRating from "@/app/profile/[user_id]/StarRating";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface userAlbumDataObject {
  [albumId: number]: userAlbumRatings;
}

interface userAlbumRatings {
  albumArtist: string;
  albumCover: string;
  albumTitle: string;
  rating: number;
  isOnToListen: boolean;
}

const ViewUserProfile = ({
  params,
}: {
  params: Promise<{ user_id: string }>;
}) => {
  const { user_id } = React.use(params);
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { globalUser } = useAuth();

  useEffect(() => {
    // get data associated with user_id
    const fetchUserData = async () => {
      try {
        const userRef = doc(db, "users", user_id);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          console.log("fetched from firebase");
          setUserData(userDoc.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
    if (globalUser == null) {
      setLoading(false);
      return;
    }
  }, [globalUser]);

  const AlbumSkeleton = () => (
    <div className="rounded-sm p-2">
      <Skeleton className="w-[266px] h-[266px] rounded-sm" />
      <div className="flex flex-col justify-between mt-2">
        <div className="flex flex-row justify-between">
          <Skeleton className="w-48 h-4" />
          <Skeleton className="w-8 h-4" />
        </div>
        <Skeleton className="w-48 h-4 mt-2" />
        <div className="flex justify-center mt-2"></div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <>
        <div className="flex flex-row ml-10 mt-5">
          <div className="flex flex-col mr-10">
            <h2 className="font-bold text-2xl mb-4">Rated Albums</h2>
            <div className="flex flex-wrap gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <AlbumSkeleton key={index} />
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {userData ? (
        <>
          <div className="flex flex-col lg:flex-row ml-10 mt-5">
            {/* Rated Albums Section */}
            <div className={`flex flex-col mr-10`}>
              <h2 className="font-bold text-2xl mb-4">Rated Albums</h2>
              <div className="flex flex-wrap gap-6">
                {Object.entries(userData)
                  .filter(
                    ([albumId, albumData]: [string, any]) =>
                      albumData.isOnToListen == false
                  )
                  .sort(
                    ([, a]: [string, any], [, b]: [string, any]) =>
                      b.rating - a.rating
                  )
                  .map(([albumId, albumData]: [string, any]) => {
                    return (
                      <div
                        key={albumId}
                        className="bg-neutral-800 hover:bg-neutral-700 rounded-sm p-2"
                      >
                        <Image
                          src={albumData.albumCover}
                          height={250}
                          width={250}
                          className="rounded-sm"
                          alt={albumData.albumTitle}
                        />
                        <div className="flex flex-col justify-between mt-2">
                          <div className="flex flex-row justify-between">
                            <p className="font-bold max-w-48 truncate">
                              {albumData.albumTitle}
                            </p>
                            <h1>{albumData.rating}/10</h1>
                          </div>
                          <p className="opacity-90 text-start">
                            {albumData.albumArtist}
                          </p>
                          <StarRating rating={albumData.rating} />
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center h-screen mt-52">
          <h1 className="font-bold mb-3">Please login to view this profile</h1>
          <Link href="/login">
            <Button
              variant="secondary"
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              Login
            </Button>
          </Link>
        </div>
      )}
    </>
  );
};

export default ViewUserProfile;
