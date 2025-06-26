"use client";
import React, { useState } from "react";
import SideAlbumSearch from "./components/SideAlbumSearch";
import Tracklist from "./components/Tracklist";
import SideAlbumView from "./components/SideAlbumView";
import { Album } from "./components/Deezer.types";

export default function Page() {
  const [artistSearchValue, setArtistSearchValue] = useState("");
  const [inputField, setInputField] = useState("");
  const [albumId, setAlbumId] = useState(0);
  const [albumObject, setAlbumObject] = useState<Album | undefined>(undefined);
  const [artistName, setArtistName] = useState<string | undefined>(undefined);
  return (
    <>
      <div
        className={`flex flex-col md:flex-row ${
          albumObject ? "justify-around" : "justify-start"
        }`}
      >
        <div className="flex flex-row">
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
        <div className="flex flex-col-reverse md:flex-col-reverse 2xl:flex-row">
          <div className="flex flex-col ml-5 mr-5">
            <Tracklist
              albumId={albumId}
              albumObject={albumObject}
              setAlbumObject={setAlbumObject}
            />
          </div>
          <SideAlbumView
            albumId={albumId}
            albumObject={albumObject}
            artistName={artistName}
          />
        </div>
      </div>
    </>
  );
}
