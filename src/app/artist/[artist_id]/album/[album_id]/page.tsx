'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation'
import React from 'react'
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react'

export default function Page({params}: {params: Promise<{album_id:string}>}) {
    const {album_id} = React.use(params)
    const [albumTracks, setAlbumTracks] = useState<any[]>([])
    const router = useRouter()

    async function handleGetAlbumData(albumId:string) {
        try {
            const res = await fetch(`/api/getAlbumData?q=${encodeURIComponent(albumId)}`, {cache: 'default'})
            const data = await res.json()
            
            console.log(data)
            setAlbumTracks(data.data)
        } catch (error: any) {
            console.log(error.message)
            }
    }

    useEffect(() => {
        handleGetAlbumData(album_id);
    }, [album_id])


    return (
        <>
            <Button onClick={() => router.push('/')
            }>Back</Button>
            {albumTracks.map((track, trackIndex) => {
                return (
                    <div key={trackIndex} className='flex flex-row'>
                        <h1>{trackIndex + 1}</h1>
                        {/* <Image src={track} /> */}
                        <div>
                            <h1 className='font-bold'>{track.title}</h1>
                            <h1 className='opacity-80'>{track.artist.name}</h1>
                        </div>
                    </div>
                )
            })}
        </>
    )
}
