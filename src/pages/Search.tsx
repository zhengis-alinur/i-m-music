import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { search as searchApi } from "../api/search";
import { Artist, Album, Song } from "../types";
import ArtistsWrapper from "../components/ArtistsWrapper";
import AlbumsWrapper from "../components/AlbumsWrapper";
import SongsWrapper from "../components/SongsWrapper";
import Button from "../components/Button";
import Loader from "../components/Loader";

const SearchResults = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("query") || "";

  const [artists, setArtists] = useState<Artist[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [songs, setSongs] = useState<Song[]>([]);

  const [showAllArtists, setShowAllArtists] = useState(false);
  const [showAllAlbums, setShowAllAlbums] = useState(false);
  const [showAllSongs, setShowAllSongs] = useState(false);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await searchApi(query);
        setArtists(data.artists);
        setAlbums(data.albums);
        setSongs(data.songs);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch search results.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query]);

  if (!query) {
    return <div className="p-4">Please enter a search query.</div>;
  }

  if (loading) {
    return (
      <div className="w-full h-full">
        <Loader />
      </div>
    );
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Search Results for "{query}"</h1>

      {artists.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl mb-2">Artists</h2>
          <ArtistsWrapper
            artists={showAllArtists ? artists : artists.slice(0, 10)}
          />
          {artists.length > 10 && (
            <Button onClick={() => setShowAllArtists(!showAllArtists)}>
              {showAllArtists ? "Show Less" : "Show More"}
            </Button>
          )}
        </div>
      )}

      {albums.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl mb-2">Albums</h2>
          <AlbumsWrapper
            albums={showAllAlbums ? albums : albums.slice(0, 10)}
          />
          {albums.length > 10 && (
            <Button onClick={() => setShowAllAlbums(!showAllAlbums)}>
              {showAllAlbums ? "Show Less" : "Show More"}
            </Button>
          )}
        </div>
      )}

      {songs.length > 0 && (
        <div>
          <h2 className="text-xl mb-2">Songs</h2>
          <SongsWrapper songs={showAllSongs ? songs : songs.slice(0, 10)} />
          {songs.length > 10 && (
            <Button onClick={() => setShowAllSongs(!showAllSongs)}>
              {showAllSongs ? "Show Less" : "Show More"}
            </Button>
          )}
        </div>
      )}

      {artists.length === 0 && albums.length === 0 && songs.length === 0 && (
        <div>No results found.</div>
      )}
    </div>
  );
};

export default SearchResults;
