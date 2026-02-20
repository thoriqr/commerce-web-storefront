export type CategoryTree = {
  id: number;
  name: string;
  slug: string;
  children: CategoryTree[];
};
