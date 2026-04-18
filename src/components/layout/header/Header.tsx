import { useState } from "react";
import Hamburger from "./Hamburger.tsx";
import Logo from "./Logo.tsx";
import NavLinks from "./NavLinks.tsx";
import Search from "./Search";

type IsMenuOpenType = {
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] =
    useState<IsMenuOpenType["isMenuOpen"]>(false);
  return (
    // --- Sticky Header only on desktop ---
    <header className="bg-zinc-900 p-4 border-b border-gray-800  mb-21 md:mb-0 z-50 overflow-x-hidden md:sticky md:top-0">
      <nav className="container mx-auto flex justify-between items-center">
        <Logo />
        <NavLinks
          direction="row"
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
        />
        <NavLinks
          direction="column"
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
        />
        <Hamburger setIsMenuOpen={setIsMenuOpen} />
        {/* <Search />     */}
      </nav>
    </header>
  );
};

export default Header;
