import { Link } from "react-router-dom";
function BeforAuthMobile({ setIsMenuOpen }) {
  return (
    <ul className="flex justify-between items-center gap-10  flex-col">
      <li
        className="rounded-xl  hover:text-[#8864b5] transition-colors duration-300"
        onClick={() => setIsMenuOpen(false)}
      >
        <Link to="/login">Log In</Link>
      </li>
      <li
        className="rounded-xl hover:text-[#8864b5] transition-colors duration-300"
        onClick={() => setIsMenuOpen(false)}
      >
        <Link to="/signup">Sign Up</Link>
      </li>
    </ul>
  );
}

export default BeforAuthMobile;
