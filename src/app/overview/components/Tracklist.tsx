"use client";
import React, { useEffect, useState } from "react";
import { Album } from "./Deezer.types";
import Image from "next/image";

interface Tracklist {
  albumId: number;
  albumObject: Album | undefined;
  setAlbumObject: (value: Album) => void;
}

const Tracklist: React.FC<Tracklist> = ({
  albumId,
  albumObject,
  setAlbumObject,
}) => {
  const [albumTracks, setAlbumTracks] = useState<any[]>([]);
  const [foundTracks, setFoundTracks] = useState(false);
  //console.log(foundTracks);

  async function handleGetAlbumData(albumId: number) {
    try {
      if (!albumId) return;
      const res = await fetch(
        `/api/getAlbumData?q=${encodeURIComponent(albumId)}`,
        { cache: "default" }
      );
      const data = await res.json();

      //console.log("tracklistdata: ", data);
      if (Array.isArray(data.data)) {
        setAlbumTracks(data.data);
        setFoundTracks(true);
      } else {
        setAlbumTracks([]);
        setFoundTracks(false);
      }
    } catch (error: any) {
      console.log(error.message);
      setAlbumTracks([]);
      setFoundTracks(false);
    }
  }

  useEffect(() => {
    handleGetAlbumData(albumId);
  }, [albumId]);

  return (
    <>
      <h1 className="font-extrabold text-4xl md:text-4xl lg:text-6xl xl:text-8xl my-6 ml-10">
        {albumObject?.title}
      </h1>
      {foundTracks &&
        albumTracks.map((track, trackIndex) => {
          return (
            <div
              key={trackIndex}
              className="flex flex-row gap-3 mt-1 p-1 rounded-sm hover:bg-neutral-800"
            >
              <h1 className="opacity-80 w-10 text-center flex justify-center items-center">
                {trackIndex + 1}
              </h1>
              <Image
                src={albumObject?.cover_small!}
                width={48}
                height={48}
                alt="mini albob cover"
                className="rounded-sm"
              />
              <div>
                <h1 className="font-bold truncate w-72">{track.title}</h1>
                <h1 className="opacity-80 truncate w-72">
                  {track.artist.name}
                </h1>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default Tracklist;
