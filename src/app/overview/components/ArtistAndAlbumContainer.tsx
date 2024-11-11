"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import AlbumSelectModal from "./AlbumSelectModal";
import { Album, Artist, fetchedData } from "./Deezer.types";

interface SideAlbumSearchProps {
  artistSearchValue: string;
  setArtistSearchValue: (value: string) => void;
  inputField: string;
  setAlbumId: (value: number) => void;
  setAlbumObject: (value: Album) => void;
}

const ArtistAndAlbumContainer: React.FC<SideAlbumSearchProps> = ({
  artistSearchValue,
  setArtistSearchValue,
  inputField,
  setAlbumId,
  setAlbumObject,
}) => {
  const [albums, setAlbums] = useState<any[]>([]);
  const [isSearch, setIsSearch] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState<Album | undefined>(
    undefined
  );
  const [selectedArtist, setSelectedArtist] = useState<Artist | undefined>(
    undefined
  );
  const [uniqueArtists, setUniqueArtists] = useState<fetchedData[]>([]);

  async function handleGetArtists(query: string) {
    console.log("query", query);
    if (!query) return;
    try {
      const res = await fetch(
        `/api/deezerProxy?q=${encodeURIComponent(query)}`,
        { cache: "default" }
      );
      const data = await res.json();

      const albums = data.data;
      const uniqueArtists = filterUniqueArtists(albums);
      //console.log("artist and album container", albums);
      setUniqueArtists(uniqueArtists);
      //setAlbums(albums)
    } catch (error: any) {
      console.log(error.message);
    }
  }

  const filterUniqueArtists = (albums: fetchedData[]) => {
    const seen = new Set();
    return albums.filter((album) => {
      const artistId = album.artist.id;
      if (seen.has(artistId)) return false;
      else {
        seen.add(artistId);
        //console.log(seen);
        return true;
      }
    });
  };

  const handleOpenModal = (album: Album, artist: Artist) => {
    setSelectedAlbum(album);
    setSelectedArtist(artist);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAlbum(undefined);
    setSelectedArtist(undefined);
  };

  useEffect(() => {
    if (artistSearchValue.length == 0) {
      console.log("artist value empty");
      return;
    }
    //console.log("artist and album container useeffect", artistSearchValue);
    handleGetArtists(artistSearchValue);
    if (albums) setIsSearch(true);
  }, [artistSearchValue]);
  return (
    <>
      <div className="overflow-y-auto flex flex-col gap-1 h-screen fixed top-20 left-0 w-56 items-center">
        {isSearch &&
          uniqueArtists.map((album) => {
            const albumInfo: Album = album.album;
            const artistInfo: Artist = album.artist;
            if (!albumInfo.cover_medium)
              return (
                <div key={artistInfo.id}>
                  <p>Name: {album.title}</p>
                </div>
              );
            return (
              <button
                key={artistInfo.id}
                className="border border-black rounded-md bg-blue-950 w-32 flex flex-col items-center justify-center"
                onClick={() => handleOpenModal(albumInfo, artistInfo)}
              >
                <Image
                  src={artistInfo.picture_medium}
                  alt="artist picture"
                  width={150}
                  height={150}
                  className="rounded-md"
                />
                <p className="text-white">Artist Name: {artistInfo.name}</p>
              </button>
            );
          })}
      </div>
      {isModalOpen && (
        <AlbumSelectModal
          album={selectedAlbum}
          artist={selectedArtist}
          closeModal={closeModal}
          setAlbumId={setAlbumId}
          setAlbumObject={setAlbumObject}
        />
      )}
    </>
  );
};

export default ArtistAndAlbumContainer;
