'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import AlbumSelectModal from './AlbumSelectModal';

interface SideAlbumSearchProps {
    artistSearchValue: string;
    setArtistSearchValue: (value:string) => void;
    inputField: string;
}

interface Artist {
    name: string;
    id: number;
    picture_medium: string;
    tracklist: string;
  }
  
  interface Album {
    title: string;
    artist: Artist;
    cover_medium: string;
    cover: string;
  }

const ArtistAndAlbumContainer: React.FC<SideAlbumSearchProps> = ({ artistSearchValue, setArtistSearchValue, inputField }) => {
    const [albums, setAlbums] = useState<any[]>([])
    const [isSearch, setIsSearch] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedAlbum, setSelectedAlbum] = useState<Album | undefined>(undefined);
    const [selectedArtist, setSelectedArtist] = useState<Artist | undefined>(undefined);

    async function handleGetAlbums(query: string) {
        console.log('query', query)
        if (!query) return
        try {
          const res = await fetch(`/api/deezerProxy?q=${encodeURIComponent(query)}`, {cache: 'default'})
          const data = await res.json()
          
          const albums = data.data
          console.log("artist and album container", albums)
          setAlbums(albums)
        } catch (error: any) {
          console.log(error.message)
        }
    }

    const handleButtonClick = (album: Album, artist: Artist) => {
      setSelectedAlbum(album);
      setSelectedArtist(artist);
      setIsModalOpen(true);
    }

    const closeModal = () => {
      setIsModalOpen(false);
      setSelectedAlbum(undefined);
      setSelectedArtist(undefined);
  };
    
    useEffect(() => {
        console.log("artist and album container useeffect", artistSearchValue)
        handleGetAlbums(artistSearchValue)
        if(albums) setIsSearch(true)
    }, [artistSearchValue])
  return (
    <>
      <div className='overflow-y-auto flex flex-col gap-1 h-screen fixed top-20 left-0 w-56 items-center'>

        {isSearch && (albums
          .filter(album => album.artist.name.toLowerCase().includes(inputField.toLowerCase()))
          .map((album, albumIndex) => {
        const albumInfo: Album = album.album
        const artistInfo: Artist = album.artist
        if (!albumInfo.cover_medium) return <div key={albumIndex}><p>Name: {album.title}</p></div>
        return (
          <button 
            key={albumIndex} 
            className="border border-black rounded-md bg-blue-950 w-32 flex flex-col items-center justify-center"
            onClick={() => handleButtonClick(albumInfo, artistInfo)}
            >
            <Image src={artistInfo.picture_medium} alt="artist picture" width={150} height={150} className="rounded-md"/>
            <p className="text-white">Artist Name: {artistInfo.name}</p>
          </button>
        )
      }))}
    </div>
    {isModalOpen && (
      <AlbumSelectModal album={selectedAlbum} artist={selectedArtist} closeModal={closeModal} />
    )}
    </>
  )
}

export default ArtistAndAlbumContainer
