import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  displayName: string | null;
  email: string;
  status: string;
};

export function ProfileHeader({ displayName, email, status }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span>{displayName ?? "User"}</span>

            <Button size="sm" variant="outline">
              Edit
            </Button>
          </div>

          <Badge variant={status === "ACTIVE" ? "default" : "destructive"}>{status === "ACTIVE" ? "Verified" : "Suspended"}</Badge>
        </CardTitle>

        <p className="text-sm text-muted-foreground">{email}</p>
      </CardHeader>
    </Card>
  );
}
