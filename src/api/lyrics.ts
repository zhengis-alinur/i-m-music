import { api } from ".";
import { Lyric } from "../types";

export const getLyricsBySongId = async (songId: string): Promise<Lyric> => {
  const { data } = await api.get(`/lyrics/${songId}`);
  return data;
};
