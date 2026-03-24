import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function SecurityTab({ hasPassword }: { hasPassword: boolean }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Security</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground">Password Status</p>
          <p className="font-medium">{hasPassword ? "Password set" : "No password"}</p>
        </div>

        <Button variant="outline">{hasPassword ? "Change Password" : "Set Password"}</Button>
      </CardContent>
    </Card>
  );
}
