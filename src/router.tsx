import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import EntryPage from "./pages/EntryPage";
import { ROUTE } from "./constants";
import AppLayout from "./components/AppLayout";
import Albums from "./pages/Albums";
import Artists from "./pages/Artists";
import Home from "./pages/Home";
import Songs from "./pages/Songs";
import Album from "./pages/Album";
import Artist from "./pages/Artist";
import Song from "./pages/Song";
import Search from "./pages/Search";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <EntryPage />,
      },
      {
        path: ROUTE.app,
        element: <AppLayout />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: ROUTE.artists,
            element: <Artists />,
          },
          {
            path: ROUTE.albums,
            element: <Albums />,
          },
          {
            path: ROUTE.songs,
            element: <Songs />,
          },
          {
            path: ROUTE.artist,
            element: <Artist />,
          },
          {
            path: ROUTE.album,
            element: <Album />,
          },
          {
            path: ROUTE.song,
            element: <Song />,
          },
          {
            path: ROUTE.search,
            element: <Search />,
          },
        ],
      },
    ],
  },
]);
