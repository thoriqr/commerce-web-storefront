import { Eye, EyeClosed } from "lucide-react";

type Props = {
  visible: boolean;
  onToggle: () => void;
};

export function PasswordToggleButton({ visible, onToggle }: Props) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm text-muted-foreground cursor-pointer"
    >
      {visible ? <EyeClosed className="size-4" /> : <Eye className="size-4" />}
    </button>
  );
}
