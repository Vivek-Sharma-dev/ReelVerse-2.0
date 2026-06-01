import { useRef, useState } from "react";
import Hamburger from "./Hamburger.tsx";
import Logo from "./Logo.tsx";
import NavLinks from "./NavLinks.tsx";
import SearchBar from "./SearchBar.tsx";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

type IsMenuOpenType = {
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header = () => {
  // 🚀 Parent-level clean element containers
  const logoWrapper = useRef<HTMLDivElement | null>(null);
  const searchWrapper = useRef<HTMLDivElement | null>(null);
  const hamburgerWrapper = useRef<HTMLDivElement | null>(null);
  const [isMenuOpen, setIsMenuOpen] =
    useState<IsMenuOpenType["isMenuOpen"]>(false);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    // DESKTOP VIEW ANIMATION
    mm.add("(min-width: 768px)", () => {
      // Clear properties to prevent dynamic state lockups
      gsap.set([logoWrapper.current, searchWrapper.current], {
        clearProps: "all",
      });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      if (logoWrapper.current) {
        tl.from(logoWrapper.current, {
          scale: 0,
          opacity: 0,
          duration: 0.6,
        });
      }

      tl.from(
        ".desktop-nav-links li",
        {
          scale: 0,
          opacity: 0,
          duration: 0.8,
          stagger: 0.5,
          ease: "power2.out",
        },
        "-=0.3",
      );

      if (searchWrapper.current) {
        tl.from(
          searchWrapper.current,
          {
            scale: 0,
            opacity: 0,
            duration: 0.5,
          },
          "-=0.3",
        );
      }
    });

    // MOBILE VIEW ANIMATION
    mm.add("(max-width: 767px)", () => {
      gsap.set(
        [logoWrapper.current, searchWrapper.current, hamburgerWrapper.current],
        { clearProps: "all" },
      );

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      if (logoWrapper.current) {
        tl.from(logoWrapper.current, {
          scale: 0,
          opacity: 0,
          duration: 0.8,
        });
      }
      if (searchWrapper.current) {
        tl.from(searchWrapper.current, {
          scale: 0,
          opacity: 0,
          duration: 0.5,
        });
      }
      if (hamburgerWrapper.current) {
        tl.from(hamburgerWrapper.current, {
          scale: 0,
          opacity: 0,
          duration: 0.5,
        });
      }
    });

    return () => mm.revert();
  });
  useGSAP(() => {
    if (isMenuOpen) {
      gsap.fromTo(
        ".mobile-nav-links nav ul li",
        {
          x: 50,
          opacity: 0,
          scale: 0.5,
        },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.3,
          ease: "power2.out",
        },
      );
    }
  }, { dependencies: [isMenuOpen] });

  return (
    <header className="bg-zinc-900 p-4 border-b border-gray-800 md:mb-0 z-50 md:sticky md:top-0">
      <nav className="container mx-auto flex justify-between items-center">
        {/* 🌟 SAFE WRAPPERS: standard react nodes for GSAP targeting */}
        <div ref={logoWrapper}>
          <Logo />
        </div>

        {/* Desktop Navigation Links */}
        <div className="desktop-nav-links">
          <NavLinks
            direction="row"
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
          />
        </div>

        {/* Mobile Hidden Overlay Menu */}
        <div className="mobile-nav-links">
          <NavLinks
            direction="column"
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
          />
        </div>

        <div className="lg:hidden order-1 lg:order-0" ref={hamburgerWrapper}>
          <Hamburger setIsMenuOpen={setIsMenuOpen} />
        </div>

        <div ref={searchWrapper}>
          <SearchBar />
        </div>
      </nav>
    </header>
  );
};

export default Header;
