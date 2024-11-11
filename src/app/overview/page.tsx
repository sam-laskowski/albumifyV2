"use client";
import React, { useState } from "react";
import SideAlbumSearch from "./components/SideAlbumSearch";
import Tracklist from "./components/Tracklist";
import SideAlbumView from "./components/SideAlbumView";
import { Album } from "./components/Deezer.types";
import { useRouter } from "next/navigation";

export default function Page() {
  const [artistSearchValue, setArtistSearchValue] = useState("");
  const [inputField, setInputField] = useState("");
  const [albumId, setAlbumId] = useState(0);
  const [albumObject, setAlbumObject] = useState<Album | undefined>(undefined);
  const router = useRouter();
  return (
    <>
      <div className="flex flex-row space-x-20">
        <div className="flex flex-col">
          <h1
            className="text-white font-extrabold text-3xl cursor-pointer"
            onClick={() => router.push("/")}
          >
            albumify
          </h1>
          <SideAlbumSearch
            artistSearchValue={artistSearchValue}
            setArtistSearchValue={setArtistSearchValue}
            inputField={inputField}
            setInputField={setInputField}
            setAlbumId={setAlbumId}
            albumObject={albumObject}
            setAlbumObject={setAlbumObject}
          />
        </div>
        <div className="flex flex-col bg-black">
          <Tracklist
            albumId={albumId}
            albumObject={albumObject}
            setAlbumObject={setAlbumObject}
          />
        </div>
        <SideAlbumView
          albumId={albumId}
          albumObject={albumObject}
          setAlbumObject={setAlbumObject}
        />
      </div>
    </>
  );
}
