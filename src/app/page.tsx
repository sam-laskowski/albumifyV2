'use client';
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

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

interface Search {
  data: any[];
  next: string;
  total: number;
}


export default function Page() {
  const [albums, setAlbums] = useState<any[]>([])
  const [inputField, setInputField] = useState('')
  const router = useRouter()

  async function handleGetAlbums(query: string) {
    try {
      const res = await fetch(`/api/deezerProxy?q=${encodeURIComponent(query)}`, {cache: 'default'})
      const data: Search = await res.json()
      
      const albums = data.data
      console.log(albums)
      setAlbums(albums)
    } catch (error: any) {
      console.log(error.message)
    }
  }

  return (
    <>
      <h1 className="text-white font-extrabold text-3xl">albumify</h1>
      <input type="text" onKeyDown={(e) => {
        if (e.key === 'Enter') {
          const query = (e.target as HTMLInputElement).value
          //console.log(query)
          setInputField(query)
          handleGetAlbums(query)
        }
      }}/>
      <div className="flex justify-center m-4">
        <div className="grid grid-cols-4 gap-4 w-2/3 max-w-screen-lg">
          {albums
          .filter(album => album.artist.name.toLowerCase().includes(inputField.toLowerCase()))
          .map((album, albumIndex) => {
            const albumInfo: Album = album.album
            const artistInfo: Artist = album.artist
            if (!albumInfo.cover_medium) return <div key={albumIndex}><p>Name: {album.title}</p></div>
            return (
              <button 
                key={albumIndex} 
                className="border border-black rounded-md bg-blue-950 w-32 flex flex-col items-center justify-center"
                onClick={() => router.push(`/artist/${artistInfo.id}`)}
                >
                <Image src={artistInfo.picture_medium} alt="artist picture" width={150} height={150} className="rounded-md"/>
                <p className="text-white">Artist Name: {artistInfo.name}</p>
              </button>
            )
          })}
        </div>
      </div>
    </>
  );
}
