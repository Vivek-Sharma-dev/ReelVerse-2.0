import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // 🚀 Jab bhi pathname (page route) badle, view window ko coordinate (0,0) yaani top-left par fek do
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // Dynamic smooth transitions ko restrict karke instant top par le jayega
    });
  }, [pathname]);

  return null; // Yeh component screen par kuch render nahi karega, bas background mein scroll fix karega
};

export default ScrollToTop;