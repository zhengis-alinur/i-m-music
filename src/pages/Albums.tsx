import { useState, useEffect } from "react";
import { Album } from "../types";
import { getAlbums } from "../api/albums";
import Loader from "../components/Loader";
import AlbumsWrapper from "../components/AlbumsWrapper";

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

  if (!data)
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Loader />
      </div>
    );

  return (
    <>
      <h1 className="font-bold text-2xl mb-4">Albums</h1>
      <AlbumsWrapper albums={data} />
    </>
  );
};

export default Albums;
