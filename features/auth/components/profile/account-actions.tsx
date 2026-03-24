import { Button } from "@/components/ui/button";

export default function AccountActions({ onChangePassword, onSetPassword }: { onChangePassword: () => void; onSetPassword: () => void }) {
  return (
    <div className="space-y-2">
      <Button variant="outline" className="w-full justify-start">
        Change Display Name
      </Button>
    </div>
  );
}
