"use client";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  return (
    <div>
      <div className="flex flex-col mr-10">
        <h2 className="font-bold text-2xl">To Listen</h2>
        <div className="flex flex-wrap gap-6">
          {Object.entries(userData)
            .filter(
              ([albumId, albumData]: [string, any]) => albumData.isOnToListen
            )
            .map(([albumId, albumData]: [string, any]) => (
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
                <p className="font-bold mt-2">{albumData.albumTitle}</p>
                <p className="opacity-90">{albumData.albumArtist}</p>
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}

export default ToListen;
