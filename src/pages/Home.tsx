import { useState, useEffect } from "react";
import { Tops } from "../types";
import { getTops } from "../api/tops";
import SongsWrapper from "../components/SongsWrapper";
import ArtistsWrapper from "../components/ArtistsWrapper";
import AlbumsWrapper from "../components/AlbumsWrapper";
import Loader from "../components/Loader";

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

  if (!data)
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Loader />
      </div>
    );

  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-bold text-3xl">Top Songs</h1>
      <SongsWrapper songs={data?.songs} />
      <h1 className="font-bold text-3xl">Top Artists</h1>
      <ArtistsWrapper artists={data?.artists} />
      <h1 className="font-bold text-3xl">Top Albums</h1>
      <AlbumsWrapper albums={data?.albums} />
    </div>
  );
};

export default Home;
