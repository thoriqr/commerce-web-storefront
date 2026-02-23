type Props = {
  filterContent: React.ReactNode;
  sortControl: React.ReactNode;
};

export function ProductMobileTopBar({ filterContent, sortControl }: Props) {
  return (
    <div className="sticky top-28 z-40 md:hidden">
      <div className="rounded-lg border bg-background shadow-sm">
        <div className="flex h-12 items-center justify-between px-3 gap-1.5">
          {filterContent}
          {sortControl}
        </div>
      </div>
    </div>
  );
}
