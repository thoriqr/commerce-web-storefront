type Props = {
  children: React.ReactNode;
};

export function ProductFilterSidebarLayout({ children }: Props) {
  return (
    <aside className="hidden w-64 shrink-0 md:block">
      <div className="sticky top-20 space-y-8">{children}</div>
    </aside>
  );
}
