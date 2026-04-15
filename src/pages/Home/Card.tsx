import { Children } from "react";
type Props = {
  children: React.ReactNode;
  bgColor: string;
  iconBgColor: string;
  content: string;
  titleone: string;
  titletwo: string;
};
function Card({ children, bgColor, iconBgColor, content, titleone, titletwo }: Props) {
  return (
    <div
      className={` ${bgColor} w-62.5 h-62.5 md:w-75 md:h-75 relative rounded-4xl rounded-tl-none  p-6 shadow-lg max-w-sm `}
    >
      <div
        className={` ${iconBgColor} w-20 h-20 rounded-xl rounded-tl-none flex items-center justify-center absolute top-0 left-0`}
      >
        {children}
      </div>
      <p className="w-full mt-16 text-start font-bold text-2xl mb-4 ">
        {" "}
        {titleone}
        <br /> {titletwo}
      </p>
      <p className=" font-light text-[12px] text-[#555b6b]">{content}</p>
    </div>
  );
}

export default Card;
