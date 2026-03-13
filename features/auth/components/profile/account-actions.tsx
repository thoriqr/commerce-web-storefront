import { Button } from "@/components/ui/button";

export default function AccountActions({
  hasPassword,
  onChangePassword,
  onSetPassword
}: {
  hasPassword: boolean;
  onChangePassword: () => void;
  onSetPassword: () => void;
}) {
  return (
    <div className="space-y-2">
      <Button variant="outline" className="w-full justify-start">
        Change Display Name
      </Button>

      {hasPassword ? (
        <Button variant="outline" className="w-full justify-start" onClick={onChangePassword}>
          Change Password
        </Button>
      ) : (
        <Button variant="outline" className="w-full justify-start" onClick={onSetPassword}>
          Set Password
        </Button>
      )}
    </div>
  );
}
