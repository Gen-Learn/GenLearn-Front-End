import { Link } from "react-router-dom";
import { FaFireAlt } from "react-icons/fa";
import { IoIosNotificationsOutline } from "react-icons/io";
import { RxAvatar } from "react-icons/rx";
type AfterAuthMobileProps = {
  setIsMenuOpen: (isOpen: boolean) => void;
};
function AfterAuthMobile({ setIsMenuOpen }: AfterAuthMobileProps) {
  return (
    <ul className="flex justify-between items-center gap-10  flex-col">
      <li
        onClick={() => setIsMenuOpen(false)}
        className="flex justify-center text-2xl items-center gap-2 px-4 py-2 rounded-xl hover:bg-[#f1e1f7] hover:text-[#8864b5] transition-colors duration-300"
      >
        <IoIosNotificationsOutline />
      </li>
      <li
        onClick={() => setIsMenuOpen(false)}
        className="flex justify-center text-2xl items-center gap-2 px-4 py-2 rounded-xl text-[#8864b5] hover:bg-[#f1e1f7] hover:text-[#8864b5] transition-colors duration-300"
      >
        <span>0 </span>
        <FaFireAlt />
      </li>
      <li
        onClick={() => setIsMenuOpen(false)}
        className="flex justify-center text-2xl items-center gap-2 px-4 py-2 rounded-xl hover:bg-[#f1e1f7] hover:text-[#8864b5] transition-colors duration-300"
      >
        <RxAvatar />
      </li>
    </ul>
  );
}

export default AfterAuthMobile;
