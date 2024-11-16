"use client";
import { useAuth } from "@/context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../../../firebase";
import { Button } from "@/components/ui/button";
import ToListen from "./ToListen";

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

  const copyToClipboard = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      {userData ? (
        <div className="text-white flex flex-row">
          <div className="flex flex-col mr-10">
            <Button onClick={copyToClipboard}>Share Profile</Button>
            <h2>Rated Albums:</h2>
            <ul>
              {Object.entries(userData)
                .filter(
                  ([albumId, albumData]: [string, any]) =>
                    albumData.isOnToListen == false
                )
                .map(([albumId, albumData]: [string, any]) => (
                  <li
                    key={albumId}
                    className="text-white"
                  >
                    <img
                      src={albumData.albumCover}
                      alt={albumData.albumTitle}
                    />
                    <p>{albumData.albumTitle}</p>
                    <p>{albumData.albumArtist}</p>
                    <p>{albumData.rating}/10</p>
                  </li>
                ))}
            </ul>
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
