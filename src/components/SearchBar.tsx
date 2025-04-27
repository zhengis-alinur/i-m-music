import { FormEventHandler, useState } from "react";
import search from "../assets/search.svg";
import { createSearchParams, useNavigate } from "react-router-dom";
import { ROUTE } from "../constants";

const SearchBar = () => {
  const [query, setQuery] = useState<string>("");
  const navigate = useNavigate();

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (query !== "") {
      navigate({
        pathname: ROUTE.search,
        search: createSearchParams({
          query,
        }).toString(),
      });
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex items-center bg-amber-500 pixel-border"
    >
      <img width={25} src={search} className="m-2" />
      <input
        onChange={(e) => setQuery(e.target.value)}
        className="px-3 border-transparent focus:border-transparent focus:ring-0 focus:outline-none"
      />
    </form>
  );
};

export default SearchBar;
