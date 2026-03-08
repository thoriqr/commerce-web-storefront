import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { getCollectionDetail } from "../api";

export default async function CollectionHeader({ slug }: { slug: string }) {
  const collection = await getCollectionDetail(slug);

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/collection/${collection.slug}`}>{collection.name}</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div>
        <h1 className="text-xl font-semibold">{collection.name}</h1>
        <p className="text-sm text-muted-foreground">Showing products in {collection.name}</p>
      </div>
    </>
  );
}
