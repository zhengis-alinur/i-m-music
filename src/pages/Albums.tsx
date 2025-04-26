import { useState, useEffect } from "react";
import { Album } from "../types";
import AlbumCard from "../components/AlbumCard";
import { getAlbums } from "../api/albums";

const Albums = () => {
  const [data, setData] = useState<Album[]>();

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const data = await getAlbums();
        setData(data);
      } catch (err) {
        console.error("Failed to fetch artists:", err);
      }
    };

    fetchAlbums();
  }, []);
  return (
    <>
      <h1 className="font-bold text-2xl mb-4">Top Albums</h1>
      <div className="flex flex-wrap justify-between gap-3">
        {data?.map((album) => (
          <AlbumCard key={album._id} album={album} />
        ))}
      </div>
    </>
  );
};

export default Albums;
