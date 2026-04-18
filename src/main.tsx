import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AnimeContent from "./pages/AnimeContent.tsx";
import HollywoodContent from "./pages/HollywoodContent.tsx";
import IndianContent from "./pages/IndianContent.tsx";
import IndianMovies from "./pages/IndianMovies.tsx";
import IndianShows from "./pages/IndianShows.tsx";
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/anime",
        element: <AnimeContent />,
      },
      {
        path: "/hollywood-content",
        element: <HollywoodContent />,
      },
      {
        path: "/indian-content",
        element: <IndianContent />,
      },
      {
        path: "/indian-movies",
        element: <IndianMovies />,
      },
      {
        path: "/indian-shows",
        element: <IndianShows />,
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
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
);
