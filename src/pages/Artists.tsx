import { useEffect, useState } from "react";
import { Artist } from "../types";
import { getArtists } from "../api/artists";
import Loader from "../components/Loader";
import ArtistsWrapper from "../components/ArtistsWrapper";

const Artists = () => {
  const [data, setData] = useState<Artist[]>();

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const data = await getArtists();
        setData(data);
      } catch (err) {
        console.error("Failed to fetch artists:", err);
      }
    };

    fetchArtists();
  }, []);

  if (!data)
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Loader />
      </div>
    );

  return (
    <div>
      <h1 className="font-bold text-3xl mb-4">Artists</h1>
      <ArtistsWrapper artists={data} />
    </div>
  );
};

export default Artists;
