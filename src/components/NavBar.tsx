import { Link, useLocation } from "react-router-dom";
import { ROUTE } from "../constants";
import { useEffect, useState } from "react";
import { URLs } from "../URLs";

const NavBar = () => {
  const { pathname } = useLocation();
  const [currentPath, setCurrentPath] = useState(pathname);

  const navItems = [
    {
      path: ROUTE.app,
      label: "Home",
    },
    { path: URLs.artists, label: "Artists" },
    { path: URLs.albums, label: "Albums" },
    { path: URLs.songs, label: "Songs" },
  ];

  useEffect(() => {
    setCurrentPath(pathname);
  }, [pathname]);

  return (
    <div className="w-full flex flex-col py-4 gap-4 text-xl">
      {navItems.map(({ path, label }) => (
        <Link
          to={path}
          key={path}
          className={`w-full flex  items-end gap-2 cursor-pointer hover:text-amber-500 px-3 ${
            currentPath === path ? "font-bold text-amber-500" : ""
          }`}
        >
          {label}
        </Link>
      ))}
    </div>
  );
};

export default NavBar;
