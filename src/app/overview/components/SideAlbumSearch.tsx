'use client';
import React, { useState } from 'react'
import ArtistAndAlbumContainer from './ArtistAndAlbumContainer'

interface SideAlbumSearchProps {
    artistSearchValue: string;
    setArtistSearchValue: (value:string) => void;
}

const SideAlbumSearch: React.FC<SideAlbumSearchProps> = ({ artistSearchValue, setArtistSearchValue }) => {
    return (
        <div>
            <h1 className="text-white font-extrabold text-3xl">albumify</h1>
            <input
                type="text"
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        setArtistSearchValue((e.target as HTMLInputElement).value)
                    }
                }}
            />
            <ArtistAndAlbumContainer artistSearchValue={artistSearchValue} setArtistSearchValue={setArtistSearchValue}/>
        </div>
    );
};

export default SideAlbumSearch;
