"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Album, Artist } from "./Deezer.types";

interface AlbumSelectModalProps {
  album: Album | undefined;
  artist: Artist | undefined;
  closeModal: () => void;
  setAlbumId: (value: number) => void;
  setAlbumObject: (value: Album) => void;
}

const AlbumSelectModal: React.FC<AlbumSelectModalProps> = ({
  album,
  artist,
  closeModal,
  setAlbumId,
  setAlbumObject,
}) => {
  if (album == null || artist == null) return;

  const [artistAlbums, setArtistAlbums] = useState<Album[]>([]);
  const [nextAlbumQuery, setNextAlbumQuery] = useState("");
  const [prevAlbumQuery, setPrevAlbumQuery] = useState("");

  async function handleGetPrev() {
    //console.log("artistId", artistId);
    if (!prevAlbumQuery) return;
    try {
      const res = await fetch(
        `/api/getNextOrPrevAlbums?q=${encodeURIComponent(prevAlbumQuery)}`,
        { cache: "default" }
      );

      const data = await res.json();
      //console.log(data);

      const albums = data.data;
      //console.log("album select modal: ", albums)
      setArtistAlbums(albums);
      setNextAlbumQuery(data?.next);
      setPrevAlbumQuery(data?.prev);
    } catch (error: any) {
      console.log(error.message);
    }
  }

  async function handleGetNext() {
    //console.log("artistId", artistId);
    if (!nextAlbumQuery) return;
    try {
      const res = await fetch(
        `/api/getNextOrPrevAlbums?q=${encodeURIComponent(nextAlbumQuery)}`,
        { cache: "default" }
      );

      const data = await res.json();
      //console.log(data);

      const albums = data.data;
      //console.log("album select modal: ", albums)
      setArtistAlbums(albums);
      setNextAlbumQuery(data?.next);
      setPrevAlbumQuery(data?.prev);
    } catch (error: any) {
      console.log(error.message);
    }
  }

  async function handleGetArtists(artistId: number) {
    //console.log("artistId", artistId);
    if (!artistId) return;
    try {
      const res = await fetch(
        `/api/getArtistData?q=${encodeURIComponent(artistId)}`,
        { cache: "default" }
      );

      const data = await res.json();
      //console.log(data);
      //console.log(data.next);

      const albums = data.data;
      //console.log("album select modal: ", albums)
      setArtistAlbums(albums);
      setNextAlbumQuery(data?.next);
      setPrevAlbumQuery(data?.prev);
      //console.log(nextAlbumQuery, prevAlbumQuery);
    } catch (error: any) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    handleGetArtists(artist.id);
  }, [artist]);
  return (
    <>
      <div className="w-screen h-screen fixed top-0 left-0 flex flex-col items-center justify-center z-20 p-4">
        <button
          onClick={closeModal}
          className="absolute inset-0 bg-black bg-opacity-80 border-none w-full z-10"
        />
        <div className="grid lg:grid-cols-7 md:grid-cols-3 bg-gray-600 p-4 rounded-md z-30 gap-3">
          {artistAlbums.map((album) => {
            return (
              <button
                className="flex flex-col rounded-sm truncate transition-all hover:overflow-visible hover:translate-y-6 hover:bg-gray-800 p-3"
                onClick={() => {
                  setAlbumId(album.id);
                  setAlbumObject(album);
                  closeModal();
                }}
                key={album.id}
              >
                <Image
                  src={album?.cover_medium!}
                  alt="album cover"
                  width={150}
                  height={150}
                />
                <p className="w-36 font-bold mt-2">{album?.title}</p>
              </button>
            );
          })}
          <button
            onClick={() => handleGetPrev()}
            className="bg-indigo-600 text-white rounded-sm pt-2 pb-2 pl-3 pr-3 hover:ring-2 hover:ring-blue-950"
          >
            prev
          </button>
          <button
            onClick={() => handleGetNext()}
            className="bg-indigo-600 text-white rounded-sm pt-2 pb-2 pl-3 pr-3 hover:ring-2 hover:ring-blue-950"
          >
            next
          </button>
        </div>
      </div>
    </>
  );
};

export default AlbumSelectModal;
