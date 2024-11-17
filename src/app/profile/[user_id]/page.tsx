"use client";
import { useAuth } from "@/context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../../../firebase";
import { Button } from "@/components/ui/button";
import ToListen from "./ToListen";
import Image from "next/image";
import StarRating from "./StarRating";
import { useRouter } from "next/navigation";

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

const UserProfile = ({ params }: { params: Promise<{ user_id: string }> }) => {
  const { user_id } = React.use(params);
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

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
  }, [user_id]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      {userData ? (
        <div className="flex flex-row ml-10 mt-5">
          <div className="flex flex-col mr-10 w-1/2">
            <h2 className="font-bold text-2xl">Rated Albums</h2>
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
                    <button
                      key={albumId}
                      className="bg-stone-800 hover:bg-stone-700 rounded-sm p-2"
                      onClick={() => router.push(`/album/${albumId}/`)}
                    >
                      <Image
                        src={albumData.albumCover}
                        height={250}
                        width={250}
                        className="rounded-sm"
                        alt={albumData.albumTitle}
                      />
                      <div className="flex justify-between mt-2">
                        <p className="font-bold truncate w-48">
                          {albumData.albumTitle}
                        </p>
                        <h1>{albumData.rating}/10</h1>
                      </div>
                      <p className="opacity-90 w-48">{albumData.albumArtist}</p>
                      <StarRating rating={albumData.rating} />
                    </button>
                  );
                })}
            </div>
          </div>
          <ToListen
            user_id={user_id}
            userData={userData}
          />
        </div>
      ) : (
        <div>No user data found.</div>
      )}
    </>
  );
};

export default UserProfile;
