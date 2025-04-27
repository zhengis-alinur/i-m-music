import { useEffect, useState } from "react";
import { Artist } from "../types";
import { getArtists } from "../api/artists";
import ArtistCard from "../components/ArtistCard";

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
  return (
    <div>
      <h1 className="font-bold text-3xl mb-4">Artists</h1>
      <div className="flex justify-around md:justify-start flex-wrap gap-2 md:gap-4">
        {data?.map((artist) => (
          <ArtistCard key={artist._id} artist={artist} />
        ))}
      </div>
    </div>
  );
};

export default Artists;
