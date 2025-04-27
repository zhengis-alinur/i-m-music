import { api } from ".";

export type AnnotateDto = {
  artist: string;
  song: string;
  line: string;
};

export const annotateLine = async (input: AnnotateDto): Promise<string> => {
  const { data } = await api.post("/annotate", { input });
  return data;
};

export const annotateStreamLine = async (
  input: AnnotateDto,
  callback: (chunk: string) => void
) => {
  const baseURL = import.meta.env.VITE_BACKEND_URL;
  const response = await fetch(`${baseURL}/annotate/stream`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  const reader = response.body?.getReader();
  const decoder = new TextDecoder("utf-8");

  if (!reader) return;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const chunk = decoder.decode(value);
    callback(chunk);
  }
};
