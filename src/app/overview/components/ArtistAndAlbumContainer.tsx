'use client';
import React, { useEffect } from 'react'

interface SideAlbumSearchProps {
    artistSearchValue: string;
    setArtistSearchValue: (value:string) => void;
}

const ArtistAndAlbumContainer: React.FC<SideAlbumSearchProps> = ({ artistSearchValue, setArtistSearchValue }) => {
    useEffect(() => {
        console.log("artist and album container", artistSearchValue)
    }, [artistSearchValue])
  return (
    <>
        <h1>{artistSearchValue}</h1>
    </>
  )
}

export default ArtistAndAlbumContainer
