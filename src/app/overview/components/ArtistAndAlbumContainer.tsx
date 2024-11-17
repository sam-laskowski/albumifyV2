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
  setArtistName: (value: string) => void;
}

const ArtistAndAlbumContainer: React.FC<SideAlbumSearchProps> = ({
  artistSearchValue,
  setArtistSearchValue,
  inputField,
  setAlbumId,
  setAlbumObject,
  setArtistName,
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
      console.log("artist value empty", artistSearchValue);
      return;
    }
    //console.log("artist and album container useeffect", artistSearchValue);
    handleGetArtists(artistSearchValue);
    if (albums) setIsSearch(true);
  }, [artistSearchValue]);
  return (
    <>
      <div className="overflow-y-auto flex flex-col gap-10 h-screen w-72 pr-10 mt-3">
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
                className="flex flex-col p-2 items-center justify-center rounded-md transition-colors hover:bg-gray-800"
                onClick={() => {
                  handleOpenModal(albumInfo, artistInfo);
                  setArtistName(artistInfo.name);
                }}
              >
                <Image
                  src={artistInfo.picture_medium}
                  alt="artist picture"
                  width={220}
                  height={220}
                  className="rounded-full"
                />
                <p className="mt-2 font-bold">{artistInfo.name}</p>
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
