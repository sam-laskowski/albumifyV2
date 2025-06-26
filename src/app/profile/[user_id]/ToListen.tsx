"use client";
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
        <h2 className="font-bold text-2xl mb-4">To Listen</h2>
        <div className="flex flex-wrap gap-6">
          {Object.entries(userData)
            .filter(
              ([albumId, albumData]: [string, any]) => albumData.isOnToListen
            )
            .map(([albumId, albumData]: [string, any]) => (
              <button
                key={albumId}
                className="bg-neutral-800 hover:bg-neutral-700 rounded-sm p-2 w-[266px] h-[350px]"
                onClick={() => router.push(`/album/${albumId}/`)}
              >
                <Image
                  src={albumData.albumCover}
                  height={250}
                  width={250}
                  className="rounded-sm"
                  alt={albumData.albumTitle}
                />
                <div className="flex flex-col justify-between mt-2">
                  <p className="font-bold truncate max-w-48 text-start">
                    {albumData.albumTitle}
                  </p>
                  <p className="opacity-90 max-w-48 text-start">
                    {albumData.albumArtist}
                  </p>
                </div>
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}

export default ToListen;
