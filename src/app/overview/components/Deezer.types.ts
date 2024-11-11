export interface fetchedData {
  album: Album;
  artist: Artist;
  id: number;
  title: string;
}

export interface Artist {
  name: string;
  id: number;
  picture_medium: string;
  tracklist: string;
}

export interface Album {
  title: string;
  artist: Artist;
  cover_big: string;
  cover_medium: string;
  cover: string;
  id: number;
}
