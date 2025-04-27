import { Link, useLocation } from "react-router-dom";
import { ROUTE } from "../constants";
import { useEffect, useState } from "react";
import { URLs } from "../URLs";

const MobileNavBar = () => {
  const { pathname } = useLocation();
  const [currentPath, setCurrentPath] = useState(pathname);

  const navItems = [
    { path: ROUTE.app, label: "Home" },
    { path: URLs.artists, label: "Artists" },
    { path: URLs.albums, label: "Albums" },
    { path: URLs.songs, label: "Songs" },
  ];

  useEffect(() => {
    setCurrentPath(pathname);
  }, [pathname]);

  return (
    <div className="flex sm:hidden fixed bottom-0 left-0 right-0 bg-white shadow-md justify-around items-center py-2 border-t z-50">
      {navItems.map(({ path, label }) => (
        <Link
          to={path}
          key={path}
          className={`flex flex-col items-center text-sm ${
            currentPath === path
              ? "text-amber-500 font-semibold"
              : "text-gray-600"
          } hover:text-amber-500`}
        >
          {label}
        </Link>
      ))}
    </div>
  );
};

export default MobileNavBar;
