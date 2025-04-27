import { useState, useEffect } from "react";
import { Tops } from "../types";
import ArtistCard from "../components/ArtistCard";
import { getTops } from "../api/tops";
import AlbumCard from "../components/AlbumCard";
import SongCard from "../components/SongCard";

const Home = () => {
  const [data, setData] = useState<Tops>();

  useEffect(() => {
    const fetchTops = async () => {
      try {
        const data = await getTops();
        setData(data);
      } catch (err) {
        console.error("Failed to fetch artists:", err);
      }
    };

    fetchTops();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-bold text-3xl">Top Songs</h1>
      <div className="flex flex-wrap gap-3">
        {data?.songs.map((song) => (
          <SongCard key={song._id} song={song} />
        ))}
      </div>
      <h1 className="font-bold text-3xl">Top Artists</h1>
      <div className="flex justify-around md:justify-start flex-wrap gap-3">
        {data?.artists.map((artist) => (
          <ArtistCard key={artist._id} artist={artist} />
        ))}
      </div>
      <h1 className="font-bold text-3xl">Top Albums</h1>
      <div className="flex justify-around md:justify-start flex-wrap gap-3">
        {data?.albums.map((album) => (
          <AlbumCard key={album._id} album={album} />
        ))}
      </div>
    </div>
  );
};

export default Home;
