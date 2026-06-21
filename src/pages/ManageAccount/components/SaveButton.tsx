interface SaveButtonProps {
  onClick?: () => void;
  label?: string;
}

const SaveButton = ({ onClick, label = 'Save Changes' }: SaveButtonProps) => (
  <button
    onClick={onClick}
    className="border border-brand-purple text-brand-violet font-medium text-[13px] rounded-lg px-5 py-2.5 hover:bg-purple-50 active:scale-[0.98] transition-all"
  >
    {label}
  </button>
);

export default SaveButton;
