"use client";
import { useAuth } from "@/context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../../../firebase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface userAlbumDataObject {
  [albumId: number]: userAlbumRatings;
}

interface userAlbumRatings {
  albumArtist: string;
  albumCover: string;
  albumTitle: string;
  rating: number;
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
        <div className="text-white">
          <Button onClick={copyToClipboard}>Share Profile</Button>
          <h1>User Profile</h1>
          <p>User ID: {user_id}</p>
          <h2>Albums:</h2>
          <ul>
            {Object.entries(userData).map(
              ([albumId, albumData]: [string, any]) => (
                <li
                  key={albumId}
                  className="text-white"
                >
                  <img
                    src={albumData.albumCover}
                    alt={albumData.albumTitle}
                  />
                  <p>Album Title: {albumData.albumTitle}</p>
                  <p>Artist: {albumData.albumArtist}</p>
                  <p>Rating: {albumData.rating}</p>
                </li>
              )
            )}
          </ul>
        </div>
      ) : (
        <div>No user data found.</div>
      )}
    </>
  );
};

export default UserProfile;
