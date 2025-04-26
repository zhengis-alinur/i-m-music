export interface Album {
  _id: string;
  name: string;
  artist_id: string;
  image_url: string;
}

export interface Artist {
  _id: string;
  name: string;
  alternate_names: string[];
  description: string;
  followers_count: number;
  socials: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
  image_url: string;
}

export interface Song {
  _id: string;
  title: string;
  album_id: string;
  artist_id: string;
  description?: string;
  header_image_url?: string;
}

export interface Lyric {
  _id: string;
  song_id: string;
  title?: string;
  lyrics: string;
}

export enum TabId {
  Home = "home",
  Artists = "artists",
  Albums = "albums",
  Songs = "songs",
}

export interface Tops {
  artists: Artist[];
  albums: Album[];
  songs: Song[];
}
