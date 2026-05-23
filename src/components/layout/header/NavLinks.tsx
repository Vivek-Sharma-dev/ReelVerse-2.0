import { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import {
  activeLinkStyle,
  baseLinkStyle,
  nonActiveLinkStyle,
} from "../../../styles/navbar.Styles";
import type { DirectionType, NavLinkType } from "../../../utils/types/navLink.type.ts";

const rowsStyle = "flex-row gap-6 hidden lg:flex";

// The links that appear in the navbar
const navLinks: NavLinkType[] = [
  {
    name: "home",
    path: "/",
    label: "Home",
    id: "home-link",
  },
  {
    name: "hollywood",
    path: "/explore/hollywood",
    label: "Hollywood",
    id: "hollywood-link",
  },
  {
    name: "indian",
    path: "/explore/indian",
    label: "Indian",
    id: "indian-link",
  },
  {
    name: "anime",
    path: "/explore/anime",
    label: "Anime",
    id: "anime-link",
  },
  {
    name: "watchlist",
    path: "/watchlist",
    label: "Watchlist",
    id: "watchlist-link",
  },
  {
    name: "Trailers",
    path: "/trailers",
    label: "Trailers",
    id: "trailers-link",
  },
  {
    name: "contact",
    path: "/contact-us",
    label: "Contact",
    id: "contact-link",
  }
];

// The links that appear in the mobile menu
const NavLinks = ({
  direction = "row",
  isMenuOpen,
  setIsMenuOpen,
}: {
  direction?: DirectionType;
  isMenuOpen?: boolean;
  setIsMenuOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  // Close the mobile menu when a link is clicked or clicking outside the menu
  const menuRef = useRef<HTMLUListElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen?.(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isMenuOpen, setIsMenuOpen]);

  // This function ONLY adds the classes that CHANGE the default styles
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? activeLinkStyle : nonActiveLinkStyle;

  const colsStyle = `flex-col space-y-3 lg:hidden absolute top-16 w-[150px] right-0 border-l-2 border-vibe-cyan bg-slate-900 p-4 rounded-md shadow-lg z-50 transition-all duration-300 ${isMenuOpen ? "scale-100 opacity-100 translate-x-0" : "scale-0 opacity-0 translate-x-full  pointer-events-none"}`;
  return (
    <>
      <nav>
        <ul
          ref={menuRef}
          className={`${direction === "column" ? colsStyle : rowsStyle}`}
        >
          {navLinks.map((link) => (
            <li key={link.id}>
              <NavLink
                onClick={() => setIsMenuOpen && setIsMenuOpen(false)}
                to={link.path}
                className={({ isActive }) =>
                  `${baseLinkStyle} ${navLinkClass({ isActive })}`
                }
                end
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default NavLinks;
