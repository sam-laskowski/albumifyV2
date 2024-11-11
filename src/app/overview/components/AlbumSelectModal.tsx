import Image from 'next/image';
import React from 'react'


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
  return (
    <>
        <div className='fixed top-0 left-0 h-screen w-screen flex flex-col items-center justify-center z-20 p-4'>
            <button onClick={closeModal} className="absolute inset-0 bg-black bg-opacity-80 border-none w-full z-10"/>
                <div className="bg-white p-4 rounded-md z-30">
                    <h2>{artist?.name}</h2>
                    <p>{album?.title}</p>
                    <Image src={album?.cover_medium!} alt="album cover" width={150} height={150} />
                </div>
        </div>
    </>
  )
}

export default AlbumSelectModal