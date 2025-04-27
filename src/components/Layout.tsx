import { Outlet, useLocation } from "react-router-dom";
import AudioPlayer from "./AudioPlayer";
import Footer from "./Footer";
import { AnimatePresence, motion } from "framer-motion";

function Layout() {
  const { pathname } = useLocation();

  return (
    <>
      <a href="http://nfactorial.school" target="__blank" rel="noreferrer">
        <img
          className="absolute w-[40px] sm:w-[50px] bg-white left-0 top-0 p-1"
          src="/logo/n.png"
        />
      </a>

      <AnimatePresence mode="wait">
        <motion.div
          key={pathname.split("/")[1]}
          className="w-full h-full flex flex-col items-center justify-center text-gray-800 text-lg"
          initial={{ x: -10000, opacity: 1 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>

      <Footer />
      <AudioPlayer />
    </>
  );
}

export default Layout;
