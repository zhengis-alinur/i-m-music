import { Artist } from "../types";
import ArtistCard from "./ArtistCard";
import Loader from "./Loader";

const ArtistsWrapper = ({ artists }: { artists?: Artist[] }) => {
  return (
    <div className="flex justify-around md:justify-start flex-wrap gap-3">
      {artists ? (
        artists.map((artist) => <ArtistCard key={artist._id} artist={artist} />)
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default ArtistsWrapper;
