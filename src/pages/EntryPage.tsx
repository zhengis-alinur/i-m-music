import { motion } from "framer-motion";
import Logo from "../components/Logo";
import { TypeAnimation } from "react-type-animation";
import Button from "../components/Button";
import { easeOutAppearance } from "../animations";
import { useNavigate } from "react-router-dom";
import { ROUTE } from "../constants";

const EntryPage = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col items-center pt-6 gap-10">
      <Logo />
      <motion.div
        {...easeOutAppearance}
        className="md:w-[500px] min-h-[232px] pixel-border bg-[var(--redAccent)] p-5 flex flex-col gap-3 text-lg"
      >
        <p>
          Welcome to <b>I-m-MUSIC</b> — where lyrics come to life.
        </p>
        <p>
          Dive deep into the stories behind your favorite songs, explore
          annotated lyrics, and uncover hidden meanings from artists and fans
          alike.
        </p>
        <TypeAnimation
          sequence={[
            " Music is more than sound — it's poetry, emotion, and connection. Let's  decode it together. ",
          ]}
          wrapper="span"
          speed={50}
        />
      </motion.div>
      <Button onClick={() => navigate(ROUTE.app)}>Let's go!</Button>
    </div>
  );
};

export default EntryPage;
