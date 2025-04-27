import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "./Button";
import Loader from "./Loader";

interface LyricLineProps {
  line: string;
  annotation: string;
  onAnnotate: () => void;
}

const LyricLine: React.FC<LyricLineProps> = ({
  line,
  annotation,
  onAnnotate,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <p
        onClick={() => {
          onAnnotate();
          setIsOpen(true);
        }}
        className="cursor-pointer text-gray-800 hover:text-white hover:bg-amber-500 transition-colors w-fit"
      >
        {line}
      </p>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <div
                className="relative flex flex-col gap-4 items-center bg-white p-6 shadow-lg max-w-lg w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <Button
                  onClick={() => setIsOpen(false)}
                  className="absolute right-0 top-0"
                  color="bg-rose-400"
                >
                  ✖
                </Button>
                <h3 className="text-2xl mb-2">AI Annotation</h3>
                {annotation === "" ? (
                  <Loader />
                ) : (
                  <div className="max-h-[500px] overflow-y-scroll p-3">
                    <p className="text-gray-700">{annotation}</p>
                  </div>
                )}
                <Button
                  disabled={annotation === ""}
                  onClick={() => setIsOpen(false)}
                >
                  {annotation === "" ? "I'm thinking..." : "Thanks"}
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default LyricLine;
