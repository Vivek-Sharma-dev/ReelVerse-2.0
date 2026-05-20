import { useEffect } from "react";

interface MetaData {
  title: string;
  description?:
    | string
    | "Discover your next favorite movie or TV show on Apna Ashiana. Explore a vast collection of content, from timeless classics to the latest releases. Dive into a world of entertainment tailored just for you.";
}

const useMetaData = (
  title: string,
  description: string = "Discover your next favorite movie or TV show on Apna Ashiana. Explore a vast collection of content, from timeless classics to the latest releases. Dive into a world of entertainment tailored just for you.",
) => {
  useEffect(() => {
    document.title = `Vibe Stream | ${title}`;
    // description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", description);
    }
  }, [title, description]);
};

export default useMetaData;
