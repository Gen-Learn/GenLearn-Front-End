interface SaveButtonProps {
  onClick?: (user:{name:string, biography:string}) => void;
  label?: string;
  Data:{name:string, biography:string}
}
import { Button } from '@/components/ui/index';
const SaveButton = ({Data, onClick, label = 'Save Changes' }: SaveButtonProps) => (
  <Button
    onClick={() => onClick?.(Data)}
  >
    {label}
  </Button>
);

export default SaveButton;
