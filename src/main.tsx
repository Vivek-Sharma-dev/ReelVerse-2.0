import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.tsx";
import MovieDetails from "./pages/movieDetails/MovieDetails.tsx";
import GenreContent from "./pages/GenreContent.tsx";
import ExplorePage from "./pages/ExplorePage.tsx";
import SearchPage from "./pages/SearchPage.tsx";
import PersonDetails from "./pages/PersonDetails.tsx";
import { WatchlistProvider } from "./context/WatchlistContext.tsx";
import WatchlistPage from "./pages/WatchlistPage.tsx";
import ContactPage from "./pages/ContactPage.tsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
        // home page
      },

      {
        path: "/watch/:type/:id",
        element: <MovieDetails />,
      },
      {
        path: "/genre/:movieId/:tvId/:genreName",
        element: <GenreContent />,
      },
      {
        path: "/explore/:category",
        element: <ExplorePage />,
      },
      {
        path: "/person/:id",
        element: <PersonDetails />,
      },
      {
        path: "/search",
        element: <SearchPage />,
      },
      {
        path: "/watchlist",
        element: <WatchlistPage />
      },
      {
        path: "/contact-us",
        element: <ContactPage />
      },
      {
        path: "*",
        element: (
          <h1 className="text-center text-2xl mt-10">404 - Page Not Found</h1>
        ),
      },
    ],
  },
]);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <WatchlistProvider>
      <RouterProvider router={router} />
      </WatchlistProvider>
    </QueryClientProvider>
  </StrictMode>,
);
