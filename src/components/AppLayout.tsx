import { AnimatePresence, motion } from "framer-motion";

import Logo from "./Logo";
import NavBar from "./NavBar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { easeOutAppearance } from "../animations";
import Button from "./Button";
import MobileNavBar from "./MobileNavBar";

const AppLayout = () => {
  const [isLyricsOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <div className="w-11/12 flex items-center justify-between mb-3 sm:mb-0">
        <div className="flex">
          <Button onClick={() => navigate(-1)}>◄</Button>
          <Button onClick={() => navigate(1)}>►</Button>
          <div className="block sm:hidden">
            <Logo width={400} />
          </div>
        </div>
        <div className="hidden sm:block">
          <Logo width={400} />
        </div>
        <div />
      </div>
      <div
        {...easeOutAppearance}
        className="h-10/12 w-11/12 bg-blue-500/50 pixel-border flex gap-2 text-black p-3 overflow-hidden"
      >
        <div className="hidden sm:flex flex-col items-center border-r-4 min-w-28 border-black/20 gap-6 pt-3">
          <NavBar />
        </div>
        <AnimatePresence>
          {isLyricsOpen && (
            <motion.div
              key="lyrics"
              initial={{ width: 0 }}
              animate={{ width: 500 }}
              exit={{ width: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              Lyrics
            </motion.div>
          )}
        </AnimatePresence>
        <div className="flex-1 p-2 overflow-y-scroll overflow-x-hidden">
          {/* <div className="w-full flex justify-center pb-4">
          <input className="w-96 pixel-border" />
        </div> */}
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={pathname.split("/")[3] || pathname.split("/")[2]}
                className="w-full h-full "
                initial={{ x: -10000, opacity: 1 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
      <MobileNavBar />
    </>
  );
};

export default AppLayout;
