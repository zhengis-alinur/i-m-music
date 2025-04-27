import { useState, useEffect } from "react";
import { Song } from "../types";
import { getSongs } from "../api/songs";
import Loader from "../components/Loader";
import SongsWrapper from "../components/SongsWrapper";

const Songs = () => {
  const [data, setData] = useState<Song[]>();

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const data = await getSongs();
        setData(data);
      } catch (err) {
        console.error("Failed to fetch artists:", err);
      }
    };

    fetchSongs();
  }, []);

  if (!data)
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Loader />
      </div>
    );

  return (
    <>
      <h1 className="font-bold text-3xl mb-4">Songs</h1>
      <SongsWrapper songs={data} />
    </>
  );
};

export default Songs;
