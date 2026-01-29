function BurgerMenuIcon({ setIsMenuOpen, isMenuOpen, className = "" }) {
  return (
    <div>
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className={`md:hidden text-3xl focus:outline-none ${className}`}
      >
        ☰
      </button>
    </div>
  );
}

export default BurgerMenuIcon;
