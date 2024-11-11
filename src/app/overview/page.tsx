'use client';
import React, { useState } from 'react'
import SideAlbumSearch from './components/SideAlbumSearch'
import Tracklist from './components/Tracklist'
import SideAlbum from './components/SideAlbum'


export default function Page() {
    const [artistSearchValue, setArtistSearchValue] = useState('')
    const [inputField, setInputField] = useState('')
    const [albumId, setAlbumId] = useState(0)
    return (
        <>
            <div className='flex flex-row space-x-11'>
                <SideAlbumSearch 
                artistSearchValue={artistSearchValue} 
                setArtistSearchValue={setArtistSearchValue}
                inputField={inputField}
                setInputField={setInputField}
                setAlbumId={setAlbumId}
                />
                <div className='flex flex-col bg-black'>
                    <Tracklist albumId={albumId} />
                </div>
                <SideAlbum />
            </div>
        </>
    )
}
