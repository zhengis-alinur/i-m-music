import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { getSongById, SongByIdResponse } from "../api/songs";
import { annotateStreamLine } from "../api/annotate";
import LyricLine from "../components/LyricLine";

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

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex flex-col md:flex-row md:items-start gap-4">
        {header_image_url && (
          <img
            className="h-[200px] w-auto"
            src={header_image_url}
            alt={title}
          />
        )}
        <div>
          <h1 className="text-amber-500 text-4xl">{title}</h1>
          <p className="mt-2">{description}</p>
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
