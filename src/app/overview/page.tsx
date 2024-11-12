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
  const [artistName, setArtistName] = useState<string | undefined>(undefined);
  const router = useRouter();
  return (
    <>
      <div className="flex flex-row justify-between">
        <div className="flex flex-col">
          <SideAlbumSearch
            artistSearchValue={artistSearchValue}
            setArtistSearchValue={setArtistSearchValue}
            inputField={inputField}
            setInputField={setInputField}
            setAlbumId={setAlbumId}
            albumObject={albumObject}
            setAlbumObject={setAlbumObject}
            setArtistName={setArtistName}
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
          artistName={artistName}
        />
      </div>
    </>
  );
}
