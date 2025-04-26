import { api } from ".";
import { Song } from "../types";

export const getSongs = async (): Promise<Song[]> => {
  const { data } = await api.get("/songs");
  return data;
};

export const getSongsByAlbum = async (albumId: string): Promise<Song[]> => {
  const { data } = await api.get(`/songs/album/${albumId}`);
  return data;
};

export const getSongsByArtist = async (artistId: string): Promise<Song[]> => {
  const { data } = await api.get(`/songs/artist/${artistId}`);
  return data;
};

export type SongByIdResponse = Song & {
  artistName: string;
  lyrics: string;
};

export const getSongById = async (id: string): Promise<SongByIdResponse> => {
  const { data } = await api.get(`/songs/${id}`);
  return data;
};
