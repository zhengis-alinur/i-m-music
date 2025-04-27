import { Song } from "../types";
import SongCard from "./SongCard";
import Loader from "./Loader";

const SongsWrapper = ({ songs }: { songs?: Song[] }) => {
  return (
    <div className="flex flex-wrap gap-3">
      {songs ? (
        songs.map((song) => <SongCard key={song._id} song={song} />)
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default SongsWrapper;
