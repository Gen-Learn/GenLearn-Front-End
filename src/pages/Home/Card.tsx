import { useEffect, useRef, useState } from "react";

type CardProps = {
  bgColor: string;
  iconBgColor: string;
  children: React.ReactNode;
  titleone: string;
  titletwo: string;
  content: string;
  /** Where the trigger line sits, as % from top of viewport. 50 = middle of screen. */
  triggerPosition?: number;
};

function Card({
  bgColor,
  iconBgColor,
  children,
  titleone,
  titletwo,
  content,
  triggerPosition = 50,
}: CardProps) {

  return (
    <div
      className={`${bgColor} mx-auto w-full max-w-[300px] h-[250px] md:h-[300px] relative rounded-4xl rounded-tl-none p-6 shadow-sm overflow-hidden`}
    >
      <div
        className={`${iconBgColor} w-[80px] h-[80px] flex items-center justify-center absolute top-0 left-0  rounded-xl rounded-tl-none transition-all duration-500 ease-out`}
      >
        {children}
      </div>

      <p className="w-full mt-16 text-center sm:text-start font-bold text-2xl mb-4">
        {titleone}
        <br />
        {titletwo}
      </p>

      <p className="font-light text-[12px] text-[#555b6b]">{content}</p>
    </div>
  );
}

export default Card;