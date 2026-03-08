import CollectionFilterBoundary from "./collection-filter-boundary";

export default function CollectionProducts({ slug }: { slug: string }) {
  return (
    <div className="flex gap-8">
      <CollectionFilterBoundary />
    </div>
  );
}
