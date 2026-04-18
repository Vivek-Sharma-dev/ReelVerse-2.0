import { Link } from "react-router-dom";
import siteLogo from "../../../assets/reelverse_logo.png";
const Logo = () => {
  return (
    <>
      <Link to="">
        <h1 className="">
          <img
            src={siteLogo}
            alt="ReelVerse Logo"
            className="object-contain h-5 md:h-10 w-auto"
          />
        </h1>
      </Link>
    </>
  );
};

export default Logo;
