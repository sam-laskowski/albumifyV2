import { useAuth } from "@/context/AuthContext";
import React from "react";

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

function ToListen({ user_id, userData }: { user_id: string; userData: any }) {
  return (
    <div>
      <div className="flex flex-col mr-10">
        <h2>To Listen:</h2>
        <ul>
          {Object.entries(userData)
            .filter(
              ([albumId, albumData]: [string, any]) => albumData.isOnToListen
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
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default ToListen;