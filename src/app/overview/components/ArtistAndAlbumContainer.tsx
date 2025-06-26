"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import AlbumSelectModal from "./AlbumSelectModal";
import { Album, Artist, fetchedData } from "./Deezer.types";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

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
      <ScrollArea className="w-80 md:w-full md:h-screen rounded-md border whitespace-nowrap my-3 p-3">
        <div className="flex w-max flex-row md:flex-col gap-10">
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
                <Button
                  key={artistInfo.id}
                  variant="ghost"
                  className="flex w-full h-[280px] flex-col p-2 items-center justify-center rounded-md transition-colors"
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
                </Button>
              );
            })}
        </div>
        <ScrollBar
          orientation="horizontal"
          className="md:hidden"
        />
        <ScrollBar
          orientation="vertical"
          className="hidden md:block"
        />
      </ScrollArea>
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
