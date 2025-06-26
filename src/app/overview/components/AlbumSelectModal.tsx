"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Album, Artist } from "./Deezer.types";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { X } from "lucide-react";

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
  const [isLoading, setIsLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);

  async function handleGetPrev() {
    if (!prevAlbumQuery || isLoading) return;
    try {
      setIsLoading(true);
      const res = await fetch(
        `/api/getNextOrPrevAlbums?q=${encodeURIComponent(prevAlbumQuery)}`,
        { cache: "default" }
      );

      const data = await res.json();
      const albums = data.data;
      const filteredAlbums = albums.filter(
        (album: Album) => album.record_type === "album"
      );
      setArtistAlbums(filteredAlbums);
      setNextAlbumQuery(data?.next);
      setPrevAlbumQuery(data?.prev);

      // Check if next page would have albums after filtering
      if (data?.next) {
        await checkNextPageHasAlbums(data.next);
      } else {
        setHasNextPage(false);
      }
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleGetNext() {
    if (!nextAlbumQuery || isLoading) return;
    try {
      setIsLoading(true);
      const res = await fetch(
        `/api/getNextOrPrevAlbums?q=${encodeURIComponent(nextAlbumQuery)}`,
        { cache: "default" }
      );

      const data = await res.json();
      const albums = data.data;
      const filteredAlbums = albums.filter(
        (album: Album) => album.record_type === "album"
      );
      setArtistAlbums(filteredAlbums);
      setNextAlbumQuery(data?.next);
      setPrevAlbumQuery(data?.prev);

      // Check if next page would have albums after filtering
      if (data?.next) {
        await checkNextPageHasAlbums(data.next);
      } else {
        setHasNextPage(false);
      }
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function checkNextPageHasAlbums(nextQuery: string) {
    try {
      const res = await fetch(
        `/api/getNextOrPrevAlbums?q=${encodeURIComponent(nextQuery)}`,
        { cache: "default" }
      );
      const data = await res.json();
      const albums = data.data;
      const filteredAlbums = albums.filter(
        (album: Album) => album.record_type === "album"
      );
      setHasNextPage(filteredAlbums.length > 0);
    } catch (error: any) {
      console.log(error.message);
      setHasNextPage(false);
    }
  }

  async function handleGetArtistsAlbums(artistId: number) {
    if (!artistId) return;
    try {
      setIsLoading(true);
      const res = await fetch(
        `/api/getArtistData?q=${encodeURIComponent(artistId)}`,
        { cache: "default" }
      );

      const data = await res.json();
      const albums = data.data;
      const filteredAlbums = albums.filter(
        (album: Album) => album.record_type === "album"
      );
      if (filteredAlbums.length !== 25) {
      }
      setArtistAlbums(filteredAlbums);
      setNextAlbumQuery(data?.next);
      setPrevAlbumQuery(data?.prev);

      // Check if next page would have albums after filtering
      if (data?.next) {
        await checkNextPageHasAlbums(data.next);
      } else {
        setHasNextPage(false);
      }
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    handleGetArtistsAlbums(artist.id);
  }, [artist]);

  const AlbumSkeleton = () => (
    <div className="flex flex-col space-y-3">
      <Skeleton className="w-[150px] h-[150px] rounded-sm" />
      <Skeleton className="w-36 h-4" />
    </div>
  );

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/80"
          onClick={closeModal}
        />

        {/* Modal Content */}
        <div className="relative bg-neutral-900 rounded-lg shadow-xl max-w-7xl w-full max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-neutral-700">
            <h2 className="text-xl font-semibold text-white">
              {artist.name} - Albums
            </h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={closeModal}
              className="text-neutral-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Albums Grid */}
          <div className="p-4 overflow-y-auto max-h-[calc(90vh-140px)]">
            {isLoading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4">
                {Array.from({ length: 21 }).map((_, index) => (
                  <AlbumSkeleton key={index} />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4">
                {artistAlbums.map((album) => (
                  <Button
                    key={album.id}
                    variant="ghost"
                    className="flex flex-col items-center p-3 h-auto hover:bg-neutral-700 transition-all duration-200 group"
                    onClick={() => {
                      setAlbumId(album.id);
                      setAlbumObject(album);
                      closeModal();
                    }}
                  >
                    <div className="relative overflow-hidden rounded-sm">
                      <Image
                        src={album?.cover_medium!}
                        alt={`${album.title} cover`}
                        width={150}
                        height={150}
                        className="transition-transform duration-200 group-hover:scale-105"
                      />
                    </div>
                    <p className="w-full text-sm font-medium mt-2 text-center line-clamp-2">
                      {album?.title}
                    </p>
                  </Button>
                ))}
              </div>
            )}
          </div>

          {/* Pagination */}
          {(nextAlbumQuery || prevAlbumQuery) && (
            <div className="border-t border-neutral-700 p-4">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={handleGetPrev}
                      className={
                        !prevAlbumQuery || isLoading
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer"
                      }
                    />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext
                      onClick={handleGetNext}
                      className={
                        !nextAlbumQuery || !hasNextPage || isLoading
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer"
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AlbumSelectModal;
