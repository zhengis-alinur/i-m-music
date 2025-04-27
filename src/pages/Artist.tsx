import { useParams } from "react-router-dom";
import { Album, Artist, Song } from "../types";
import { useState, useEffect } from "react";
import { getArtistById } from "../api/artists";
import Button from "../components/Button";
import { getAlbumsByArtist } from "../api/albums";
import { getSongsByArtist } from "../api/songs";
import Loader from "../components/Loader";
import AlbumsWrapper from "../components/AlbumsWrapper";
import SongsWrapper from "../components/SongsWrapper";

const MAX_DESCRIPTION_LENGTH = 800; // characters before "read more"

const ArtistPage = () => {
  const { id } = useParams();
  const [artist, setArtist] = useState<Artist>();
  const [albums, setAlbums] = useState<Album[]>();
  const [songs, setSongs] = useState<Song[]>();
  const [isExpanded, setIsExpanded] = useState(false);

  const { name, alternate_names, description, socials, image_url } =
    artist || {};

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [artistData, albumsData, songsData] = await Promise.all([
          getArtistById(id || ""),
          getAlbumsByArtist(id || ""),
          getSongsByArtist(id || ""),
        ]);
        setArtist(artistData);
        setAlbums(albumsData);
        setSongs(songsData);
      } catch (err) {
        console.error("Failed to fetch artists:", err);
      }
    };

    fetchData();
  }, [id]);

  const toggleExpanded = () => {
    setIsExpanded((prev) => !prev);
  };

  const renderDescription = () => {
    if (!description) return null;
    if (description.length <= MAX_DESCRIPTION_LENGTH) return description;

    return (
      <>
        {isExpanded
          ? description
          : `${description.slice(0, MAX_DESCRIPTION_LENGTH)}...`}
        <button
          onClick={toggleExpanded}
          className="text-amber-700 ml-2 underline cursor-pointer"
        >
          {isExpanded ? "Show less" : "Read more"}
        </button>
      </>
    );
  };

  if (!artist || !albums || !songs)
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Loader />
      </div>
    );

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex flex-wrap gap-2">
        {alternate_names?.map((name) => (
          <p className="text-amber-800 bg-white p-1">{name}</p>
        ))}
      </div>
      <div className="w-full">
        <img
          className="max-h-[200px] float-left mr-5 mb-5"
          width={200}
          height={200}
          src={image_url}
          alt={name}
        />
        <div className="w-full">
          <h1 className="text-amber-500 text-4xl">{name}</h1>
          <div className="flex "></div>
          <p>{renderDescription()}</p>
        </div>
      </div>
      <div>
        <h2 className="text-3xl">Social media</h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href={`https://www.instagram.com/${socials?.instagram}`}
            target="__blank"
            className="flex gap-1 items-center"
          >
            <Button color="bg-[#e1306c]">
              Instagram: @{socials?.instagram}
            </Button>
          </a>
          <a
            href={`https://www.twitter.com/${socials?.twitter}`}
            target="__blank"
            className="flex gap-1 items-center"
          >
            <Button color="bg-[#1DA1F2]">Twitter: @{socials?.twitter}</Button>
          </a>
          <a
            href={`https://www.facebook.com/${socials?.facebook}`}
            target="__blank"
            className="flex gap-1 items-center"
          >
            <Button color="bg-[#4267B2]">Facebook: @{socials?.facebook}</Button>
          </a>
        </div>
      </div>
      <div>
        <h2 className="text-3xl mb-2">Albums</h2>
        <AlbumsWrapper albums={albums} />
      </div>
      <div>
        <h2 className="text-3xl mb-2">Songs</h2>
        <SongsWrapper songs={songs} />
      </div>
    </div>
  );
};

export default ArtistPage;
