import { useState, useEffect } from "react";
import { Song } from "../types";
import { getSongs } from "../api/songs";
import SongCard from "../components/SongCard";

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

  return (
    <>
      <h1 className="font-bold text-3xl">Songs</h1>
      <div className="grid grid-cols-5 gap-3">
        {data?.map((song) => (
          <SongCard key={song._id} song={song} />
        ))}
      </div>
    </>
  );
};

export default Songs;
