function Button({ Content, onClick, className }) {
  return (
    <button
      onClick={onClick}
      className={`bg-linear-to-r from-[#22B5E5] to-[#E522B5] text-white px-4 py-2 rounded-xl  active:scale-95 transition-transform duration-200 ${className}`}
    >
      {Content}
    </button>
  );
}

export default Button;
