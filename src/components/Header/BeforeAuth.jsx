import { Link } from "react-router-dom";
function BeforeAuth() {
  return (
    <ul className="hidden justify-between items-center gap-4 md:flex md:flex-row flex-col">
      <li className=" px-4 py-2 rounded-xl hover:bg-[#f1e1f7] hover:text-[#8864b5] transition-colors duration-300">
        <Link to="/login">Log In</Link>
      </li>
      <li className=" px-4 py-2 rounded-xl hover:bg-[#f1e1f7] hover:text-[#8864b5] transition-colors duration-300">
        <Link to="/signup">Sign Up</Link>
      </li>
    </ul>
  );
}

export default BeforeAuth;
