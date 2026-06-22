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
  const cardRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const topMargin = -triggerPosition;
    const bottomMargin = -(100 - triggerPosition);

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsActive(entry.isIntersecting);
      },
      {
        rootMargin: `${topMargin}% 0px ${bottomMargin}% 0px`,
        threshold: 0,
      }
    );

    observer.observe(card);

    return () => observer.disconnect();
  }, [triggerPosition]);

  return (
    <div
      ref={cardRef}
      className={`${bgColor} w-[250px] h-[250px] md:w-[300px] md:h-[300px] relative rounded-4xl rounded-tl-none p-6 shadow-lg max-w-sm overflow-hidden`}
    >
      <div
        className={`${iconBgColor} ${isActive ? "rounded-xl" : "rounded-4xl"} flex items-center justify-center absolute top-0 left-0  rounded-4xl rounded-tl-none transition-all duration-500 ease-out`}
        style={{
          width: isActive ? "80px" : "300px",
          height: isActive ? "80px" : "300px",
        }}
      >
        {children}
      </div>

      <p className="w-full mt-16 text-start font-bold text-2xl mb-4">
        {titleone}
        <br />
        {titletwo}
      </p>

      <p className="font-light text-[12px] text-[#555b6b]">{content}</p>
    </div>
  );
}

export default Card;