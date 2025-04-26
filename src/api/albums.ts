import { api } from ".";
import { Album, Song } from "../types";

export const getAlbums = async (): Promise<Album[]> => {
  const { data } = await api.get("/albums");
  return data;
};

export const getAlbumsByArtist = async (artistId: string): Promise<Album[]> => {
  const { data } = await api.get(`/albums/artist/${artistId}`);
  return data;
};

export type GetAlbumByIdResponse = Album & { songs: Song[] };

export const getAlbumById = async (
  id: string
): Promise<GetAlbumByIdResponse> => {
  const { data } = await api.get(`/albums/${id}`);
  return data;
};
