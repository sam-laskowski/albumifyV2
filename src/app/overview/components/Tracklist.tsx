"use client";
import React, { useEffect, useState } from "react";
import { Album } from "./Deezer.types";

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
      {foundTracks &&
        albumTracks.map((track, trackIndex) => {
          return (
            <div
              key={trackIndex}
              className="flex flex-row text-white gap-3"
            >
              <h1 className="w-10 text-center justify-center content-center">
                {trackIndex + 1}
              </h1>
              {/* <Image src={track} /> */}
              <div>
                <h1 className="font-bold">{track.title}</h1>
                <h1 className="opacity-80">{track.artist.name}</h1>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default Tracklist;
