import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import AfterAuthMobile from "./AfterAuthMobile";
import BeforAuthMobile from "./BeforAuthMobile";
type MobileNavProps = {
  setIsMenuOpen: (isOpen: boolean) => void;
};
function MobileNav({ setIsMenuOpen }: MobileNavProps) {
  const { isAuthenticated } = useAuth();
  return (
    <div className="md:hidden flex justify-center items-center">
      <ul className=" flex flex-col justify-between items-center mx-2  text-[#505b61] font-semibold gap-10">
        <li
          className="hover:text-[#8864b5]"
          onClick={() => setIsMenuOpen(false)}
        >
          <Link to="/">Home</Link>
        </li>
        <li
          className="hover:text-[#8864b5]"
          onClick={() => setIsMenuOpen(false)}
        >
          <Link to="/generate">Generate</Link>
        </li>
        <li
          className="hover:text-[#8864b5]"
          onClick={() => setIsMenuOpen(false)}
        >
          <Link to="/courses">Courses</Link>
        </li>
        {isAuthenticated ? (
          <AfterAuthMobile setIsMenuOpen={setIsMenuOpen} />
        ) : (
          <BeforAuthMobile setIsMenuOpen={setIsMenuOpen} />
        )}
      </ul>
    </div>
  );
}

export default MobileNav;
