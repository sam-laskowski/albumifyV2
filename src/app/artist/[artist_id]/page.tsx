'use client';
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface Album {
    title: string;
    cover_medium: string;
    cover: string;
  }

export default function Page({ params }: { params: Promise<{ artist_id: string }> }) {
    const { artist_id } = React.use(params)
    const [artistAlbums, setArtistAlbums] = useState<any[]>([])
    const router = useRouter()


    async function handleGetArtistAlbums(artistId: string) {
        try {
          const res = await fetch(`/api/getArtistData?q=${encodeURIComponent(artistId)}`, {cache: 'default'})
          const data = await res.json()
          
          const albums = data.data
          console.log("albums", albums)
          setArtistAlbums(albums)
        } catch (error: any) {
          console.log(error.message)
        }
      }
      
    useEffect(() => {
        handleGetArtistAlbums(artist_id);
    }, [artist_id])
  return (
        <>
        <Button onClick={() => router.push('/')
        }>Back to Search</Button>
        <div className='flex flex-wrap gap-2'>
            {artistAlbums.map((album, albumObjectIndex) => {

                return (
                    <button 
                        key={albumObjectIndex} 
                        className='content-center text-center w-48 border border-black bg-lime-950 rounded-md flex flex-col items-center justify-center'
                        onClick={() => router.push(`/artist/${artist_id}/album/${album.id}`)}
                        >
                        <Image src={album.cover_medium} alt='album cover' width={180} height={180} className='rounded-md' />
                        <h1 className='text-white'>{album.title}</h1>
                    </button>
                )
            })}
        </div>
        </>
  )
}
