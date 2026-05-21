import { useEffect } from "react";

const useMetaData = (
  title: string,
  description: string = "Discover your next favorite movie or TV show on ReelVerse. Explore a vast collection of content, from timeless classics to the latest releases. Dive into a world of entertainment tailored just for you.",
) => {
  useEffect(() => {
    document.title = `ReelVerse | ${title}`;
    // description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", description);
    }
  }, [title, description]);
};

export default useMetaData;
