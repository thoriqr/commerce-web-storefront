import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export default function LogoutButton({ isPending, onLogout }: { isPending: boolean; onLogout: () => void }) {
  return (
    <Button variant="destructive" className="w-full gap-2" onClick={onLogout} disabled={isPending}>
      <LogOut className="h-4 w-4" />
      {isPending ? "Logging out..." : "Logout"}
    </Button>
  );
}
