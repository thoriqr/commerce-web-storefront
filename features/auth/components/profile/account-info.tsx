export function AccountInfo({ name, email }: { name: string; email: string }) {
  return (
    <div className="space-y-1">
      <p className="text-sm font-medium">{name}</p>
      <p className="text-sm text-muted-foreground">{email}</p>
    </div>
  );
}
