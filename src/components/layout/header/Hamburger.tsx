import React from "react";
import { HiMenuAlt3 } from "react-icons/hi";

const Hamburger = ({
  setIsMenuOpen,
}: {
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="">
      <button
        onClick={(e) => {
          e.stopPropagation(); // to avoid closing the modal
          setIsMenuOpen?.((prev) => !prev);
        }}
      >
        <HiMenuAlt3 className="text-2xl" />
      </button>
    </div>
  );
};

export default Hamburger;
