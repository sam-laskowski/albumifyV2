// lib/fetchAlbums.js
export async function fetchAlbums() {
    const response = await fetch(
      `https://api.deezer.com/chart/album/albums`
    )
    const data = await response.json();
    return data.data; // Assuming the data is in `data` property, adjust if different
  }
  