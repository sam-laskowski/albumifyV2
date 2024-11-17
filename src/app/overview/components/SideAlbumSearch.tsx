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
  setArtistName: (value: string) => void;
}

const SideAlbumSearch: React.FC<SideAlbumSearchProps> = ({
  artistSearchValue,
  setArtistSearchValue,
  inputField,
  setInputField,
  setAlbumId,
  setAlbumObject,
  albumObject,
  setArtistName,
}) => {
  return (
    <div className="flex flex-col ml-10">
      <input
        type="text"
        className="rounded-lg pt-2 pb-2 pl-3 pr-3 transition-all bg-gray-800 hover:ring-2 hover:ring-slate-600"
        placeholder="Search by Artist"
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
        setArtistName={setArtistName}
      />
    </div>
  );
};

export default SideAlbumSearch;
