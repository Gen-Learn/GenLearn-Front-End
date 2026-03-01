
type BurgerMenuIconProps = {
  setIsMenuOpen: (isOpen: boolean) => void;
  isMenuOpen: boolean;
  className?: string;
};
function BurgerMenuIcon({ setIsMenuOpen, isMenuOpen, className = "" }:BurgerMenuIconProps) {
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
