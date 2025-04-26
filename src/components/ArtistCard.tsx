import { Link } from "react-router-dom";
import { Artist } from "../types";
import { URLs } from "../URLs";

const ArtistCard = ({ artist }: { artist: Artist }) => {
  return (
    <Link
      to={`${URLs.artist}/${artist._id}`}
      className="flex flex-col gap-2 items-center justify-center w-48 hover:text-amber-500 transition-all cursor-pointer"
      key={artist._id}
    >
      <img
        className="hover:outline-3 outline-amber-500"
        width={150}
        src={artist.image_url}
      />
      <p className="w-full truncate text-center">{artist.name}</p>
    </Link>
  );
};

export default ArtistCard;
