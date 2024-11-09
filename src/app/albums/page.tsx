'use client';
import React, { useEffect, useState } from 'react'
import Image from 'next/image';

export default function page() {
    const [albums, setAlbums] = useState<any[]>([])

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('/api/deezerProxy', {cache: 'default'})
            const data = await res.json()
            setAlbums(data.data)
        }
        fetchData()
    }, [])


  return (
    <>
        <h1>albums</h1>
        {albums.map((album, albumIndex) => {
            console.log(album)
            if (!album.cover_medium) return <div key={albumIndex}><p>Name: {album.title}</p></div>
            return (
                <div key={albumIndex}>
                    <Image src={album.cover_medium} alt="album cover" width={150} height={150}/>
                    <p>Name: {album.title}</p>
                </div>
            )
        })}
    </>
  )
}
