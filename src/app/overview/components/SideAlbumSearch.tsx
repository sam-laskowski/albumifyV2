"use client";
import React, { useState } from "react";
import ArtistAndAlbumContainer from "./ArtistAndAlbumContainer";
import { Album } from "./Deezer.types";

interface SideAlbumSearchProps {
  artistSearchValue: string;
  setArtistSearchValue: (value: string) => void;
  inputField: string;
  setInputField: (value: string) => void;
  setAlbumId: (value: number) => void;
  albumObject: Album | undefined;
  setAlbumObject: (value: Album) => void;
}

const SideAlbumSearch: React.FC<SideAlbumSearchProps> = ({
  artistSearchValue,
  setArtistSearchValue,
  inputField,
  setInputField,
  setAlbumId,
  setAlbumObject,
  albumObject,
}) => {
  return (
    <div>
      <h1 className="text-white font-extrabold text-3xl">albumify</h1>
      <input
        type="text"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            console.log("search triggered");
            setArtistSearchValue((e.target as HTMLInputElement).value);
          }
        }}
      />
      <ArtistAndAlbumContainer
        artistSearchValue={artistSearchValue}
        setArtistSearchValue={setArtistSearchValue}
        inputField={inputField}
        setAlbumId={setAlbumId}
        setAlbumObject={setAlbumObject}
      />
    </div>
  );
};

export default SideAlbumSearch;
