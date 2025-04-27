import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { getSongById, SongByIdResponse } from "../api/songs";
import { annotateStreamLine } from "../api/annotate";
import LyricLine from "../components/LyricLine";
import Loader from "../components/Loader";

const SongPage = () => {
  const { id } = useParams<{ id: string }>();

  const [data, setData] = useState<SongByIdResponse>();
  const [annotations, setAnnotations] = useState<Record<string, string>>({});

  const { title, artistName, description, header_image_url, lyrics } =
    data || {};

  useEffect(() => {
    if (!id) return;

    const fetchSong = async () => {
      try {
        const song = await getSongById(id);
        setData(song);
      } catch (err) {
        console.error("Failed to fetch song:", err);
      }
    };

    fetchSong();
  }, [id]);

  const handleAnnotate = useCallback(
    async (line: string) => {
      if (!artistName || !title || annotations[line]) return;

      setAnnotations((prev) => ({ ...prev, [line]: "" }));

      try {
        await annotateStreamLine(
          { artist: artistName, song: title, line },
          (chunk) => {
            setAnnotations((prev) => ({
              ...prev,
              [line]: (prev[line] || "") + chunk,
            }));
          }
        );
      } catch (err) {
        console.error("Failed to annotate line:", err);
        setAnnotations((prev) => ({
          ...prev,
          [line]: "Ошибка при получении аннотации.",
        }));
      }
    },
    [artistName, title, annotations]
  );

  if (!data)
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Loader />
      </div>
    );

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="w-full">
        <img
          className="max-h-[200px] float-left mr-5 mb-5"
          width={200}
          height={200}
          src={header_image_url}
          alt={title}
        />
        <div className="w-full">
          <h1 className="text-amber-500 text-4xl">{title}</h1>
          <div className="flex "></div>
          <p>{description}</p>
        </div>
      </div>
      <div>
        <h2 className="text-3xl mt-6 mb-4">Lyrics</h2>
        <div className="flex flex-col items-center">
          {lyrics?.split("\n").map((line, index) => (
            <LyricLine
              key={index}
              line={line}
              annotation={annotations[line]}
              onAnnotate={() => handleAnnotate(line)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SongPage;
