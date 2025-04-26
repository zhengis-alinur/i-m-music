import { useParams } from "react-router-dom";
import { getAlbumById, GetAlbumByIdResponse } from "../api/albums";
import { useState, useEffect } from "react";
import SongCard from "../components/SongCard";
import { useImageWithFallback } from "../hooks/useImageWithFallback";

const AlbumPage = () => {
  const { id } = useParams();

  const [data, setData] = useState<GetAlbumByIdResponse>();

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const data = await getAlbumById(id || "");
        setData(data);
      } catch (err) {
        console.error("Failed to fetch artists:", err);
      }
    };

    fetchAlbums();
  }, []);

  const { name, image_url, songs } = data || {};
  const imageUrl = useImageWithFallback(image_url);

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <h1 className="text-amber-700 text-4xl">Album: {name}</h1>
      <div
        className={`w-[150px] h-[150px] mask-[url(/mask.png)] bg-cover bg-center`}
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div>
        <h2 className="text-3xl mb-2">Songs</h2>
        <div className="flex flex-wrap gap-3">
          {songs?.map((song) => (
            <SongCard key={song._id} song={song} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AlbumPage;
