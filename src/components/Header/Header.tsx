import logo from "../../assets/images/logo.png";
import BeforeAuth from "./BeforeAuth";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import { useState } from "react";
import { Link } from "react-router";
import BurgerMenuIcon from "./BurgerMenuIcon";
import useMediaQuery from "../../hooks/useMediaQuery";
function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <header className="w-full m-auto flex-col flex justify-center items-center  my-5">
      <div className="w-[80%] flex justify-between items-center bg-[#f6f5fa] shadow-md rounded-2xl border border-[#b9bac9] px-4 py-2">
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>
        <DesktopNav />
        {isMobile && (
          <BurgerMenuIcon
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
          />
        )}
        <BeforeAuth />
      </div>
      {isMenuOpen && <MobileNav setIsMenuOpen={setIsMenuOpen} />}
    </header>
  );
}
export default Header;
