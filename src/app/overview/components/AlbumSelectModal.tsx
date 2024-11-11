'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'


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

interface AlbumSelectModalProps {
    album: Album | undefined;
    artist: Artist | undefined;
    closeModal: () => void;
}

const AlbumSelectModal: React.FC<AlbumSelectModalProps> = ({ album, artist, closeModal }) => {
    if (album == null || artist == null) return

    const [artistAlbums, setArtistAlbums] = useState<Album[]>([])

    async function handleGetArtists(artistId: number) {
        console.log('artistId', artistId)
        if (!artistId) return
        try {
          const res = await fetch(`/api/getArtistData?q=${encodeURIComponent(artistId)}`, {cache: 'default'})
          const data = await res.json()
          
          const albums = data.data
          console.log("album select modal: ", albums)
          setArtistAlbums(albums)
        } catch (error: any) {
          console.log(error.message)
        }
    }

    useEffect(() => {
        handleGetArtists(artist.id)
    }, [artist])
  return (
    <>
        <div className='fixed top-0 left-0 h-screen w-screen flex flex-col items-center justify-center z-20 p-4'>
            <button onClick={closeModal} className="absolute inset-0 bg-black bg-opacity-80 border-none w-full z-10"/>
            <div className="flex flex-wrap bg-gray-600 p-4 rounded-md z-30 gap-3">
            {artistAlbums.map((album) => {
                return (
                    <button 
                    className='flex flex-col border border-white rounded-sm'
                    >
                        <Image src={album?.cover_medium!} alt="album cover" width={150} height={150} />
                        <p className='text-white'>{album?.title}</p>
                    </button>
                    )
                })}
            </div>
        </div>
    </>
  )
}

export default AlbumSelectModal