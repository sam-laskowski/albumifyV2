'use client';
import React, { useEffect, useState } from 'react'

interface Tracklist {
  albumId: number;
}

const Tracklist: React.FC<Tracklist> = ({albumId}) => {
  const [albumTracks, setAlbumTracks] = useState<any[]>([])
  const [foundTracks, setFoundTracks] = useState(false)

  async function handleGetAlbumData(albumId:number) {
      try {
          const res = await fetch(`/api/getAlbumData?q=${encodeURIComponent(albumId)}`, {cache: 'default'})
          const data = await res.json()
          
          console.log(data)
          setAlbumTracks(data.data)
          if(albumTracks) setFoundTracks(true)
      } catch (error: any) {
          console.log(error.message)
          }
  }

  useEffect(() => {
      handleGetAlbumData(albumId);
  }, [albumId])

  return (
    <>
      {foundTracks && (albumTracks.map((track, trackIndex) => {
                return (
                    <div key={trackIndex} className='flex flex-row text-white gap-3'>
                        <h1 className='w-10 text-center justify-center content-center'>{trackIndex + 1}</h1>
                        {/* <Image src={track} /> */}
                        <div>
                            <h1 className='font-bold'>{track.title}</h1>
                            <h1 className='opacity-80'>{track.artist.name}</h1>
                        </div>
                    </div>
                )
            }))}
    </>
  )
}

export default Tracklist
