import { Album } from "../types";
import AlbumCard from "./AlbumCard";
import Loader from "./Loader";

const AlbumsWrapper = ({ albums }: { albums?: Album[] }) => {
  return (
    <div className="flex justify-around md:justify-start flex-wrap gap-3">
      {albums ? (
        albums.map((album) => <AlbumCard key={album._id} album={album} />)
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default AlbumsWrapper;
