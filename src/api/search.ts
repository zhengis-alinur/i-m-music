import { api } from ".";
import { Artist, Album, Song } from "../types";

export const search = async (
  query: string
): Promise<{
  artists: Artist[];
  albums: Album[];
  songs: Song[];
}> => {
  const { data } = await api.get(`/search?q=${query}`);
  return data;
};
