'use client';
import React, { useState } from 'react'
import SideAlbumSearch from './components/SideAlbumSearch'
import Tracklist from './components/Tracklist'
import SideAlbum from './components/SideAlbum'


export default function Page() {
    const [artistSearchValue, setArtistSearchValue] = useState('')
    return (
        <>
            <SideAlbumSearch artistSearchValue={artistSearchValue} setArtistSearchValue={setArtistSearchValue}/>
            <Tracklist />
            <SideAlbum />
        </>
    )
}
