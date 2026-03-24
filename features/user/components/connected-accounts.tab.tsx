import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "../types";

export function ConnectedAccountsTab({ providers }: { providers: User["providers"] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Connected Accounts</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        {providers.length === 0 ? (
          <p className="text-sm text-muted-foreground">No connected accounts</p>
        ) : (
          providers.map((p) => (
            <div key={p.provider} className="flex items-center justify-between border rounded-md p-3">
              <div>
                <p className="font-medium">{p.provider}</p>
                <p className="text-sm text-muted-foreground">{p.provider_email}</p>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
