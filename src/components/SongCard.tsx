import { Link } from "react-router-dom";
import { Song } from "../types";
import { URLs } from "../URLs";

const SongCard = ({ song }: { song: Song }) => {
  return (
    <Link
      to={`${URLs.song}/${song._id}`}
      className="relative flex flex-col items-center justify-center w-64 h-16 bg-cover bg-center group cursor-pointer hover:outline-3 outline-amber-500"
      style={{ backgroundImage: `url(${song.header_image_url})` }}
      key={song._id}
    >
      <div className="absolute inset-0 bg-black/40 transition-opacity duration-300 group-hover:opacity-0" />
      <p className="relative w-full px-2 text-center text-white truncate transition-opacity duration-300 group-hover:opacity-0 z-10">
        {song.title}
      </p>
    </Link>
  );
};

export default SongCard;
