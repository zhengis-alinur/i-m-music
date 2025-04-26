import { Link } from "react-router-dom";
import { useImageWithFallback } from "../hooks/useImageWithFallback";
import { Album } from "../types";
import { URLs } from "../URLs";

const AlbumCard = ({ album }: { album: Album }) => {
  const imageUrl = useImageWithFallback(album.image_url);

  return (
    <Link
      to={`${URLs.album}/${album._id}`}
      className="flex flex-col gap-2 items-center justify-center w-48 group hover:text-amber-500 cursor-pointer"
      key={album._id}
    >
      <div
        className={`w-[150px] h-[150px] mask-[url(/mask.png)] bg-cover bg-center`}
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <p className="w-full truncate text-center">{album.name}</p>
    </Link>
  );
};

export default AlbumCard;
