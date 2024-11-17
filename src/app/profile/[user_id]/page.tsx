"use client";
import { useAuth } from "@/context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../../../firebase";
import { Button } from "@/components/ui/button";
import ToListen from "./ToListen";
import Image from "next/image";
import StarRating from "./StarRating";

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

  const { globalData }: { globalData: userAlbumDataObject } = useAuth();

  useEffect(() => {
    // get data associated with user_id
    const fetchUserData = async () => {
      try {
        const userRef = doc(db, "users", user_id);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
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
          <div className="flex flex-col mr-10">
            <h2 className="font-bold text-2xl">Rated Albums</h2>
            <div className="flex flex-wrap gap-6">
              {Object.entries(userData)
                .filter(
                  ([albumId, albumData]: [string, any]) =>
                    albumData.isOnToListen == false
                )
                .map(([albumId, albumData]: [string, any]) => (
                  <div
                    key={albumId}
                    className="bg-stone-800 hover:bg-stone-700 rounded-sm p-2"
                  >
                    <Image
                      src={albumData.albumCover}
                      height={250}
                      width={250}
                      className="rounded-sm"
                      alt={albumData.albumTitle}
                    />
                    <div className="flex justify-between mt-2">
                      <p className="font-bold">{albumData.albumTitle}</p>
                      <p>{albumData.rating}/10</p>
                    </div>
                    <p className="opacity-90">{albumData.albumArtist}</p>
                    <StarRating rating={albumData.rating} />
                  </div>
                ))}
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
