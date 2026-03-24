import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "../types";

export function ProfileTab({ user }: { user: User }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Info</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground">Display Name</p>
          <p className="font-medium">{user.displayName ?? "-"}</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Email</p>
          <p className="font-medium">{user.email}</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground mb-1">Default Address</p>

          {user.defaultAddress ? (
            <div className="text-sm space-y-1 border rounded-md p-3">
              <p className="font-medium">{user.defaultAddress.recipientName}</p>
              <p>{user.defaultAddress.phone}</p>
              <p>{user.defaultAddress.addressLine}</p>
              <p>
                {user.defaultAddress.cityName}, {user.defaultAddress.provinceName}
              </p>
              <p>{user.defaultAddress.postalCode}</p>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No default address set</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
