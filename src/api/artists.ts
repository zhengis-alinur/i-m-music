import { api } from ".";
import { Artist } from "../types";

export const getArtists = async (): Promise<Artist[]> => {
  const { data } = await api.get("/artists");
  return data;
};

export const getArtistById = async (id: string): Promise<Artist> => {
  const { data } = await api.get(`/artists/${id}`);
  return data;
};

export const getBestArtists = async (): Promise<Artist[]> => {
  const { data } = await api.get("/artists/bests");
  return data;
};
