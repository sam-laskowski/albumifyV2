"use client";
import React from "react";
import { Album, Artist } from "./Deezer.types";
import Image from "next/image";

interface SideAlbumView {
  albumId: number;
  albumObject: Album | undefined;
  setAlbumObject: (value: Album) => void;
}

const SideAlbumView: React.FC<SideAlbumView> = ({
  albumId,
  albumObject,
  setAlbumObject,
}) => {
  //console.log(albumObject);
  return (
    <>
      <div className="flex flex-col">
        <Image
          src={albumObject?.cover_big!}
          alt="Album Cover"
          width={400}
          height={400}
        />
        <div></div>
      </div>
    </>
  );
};

export default SideAlbumView;
