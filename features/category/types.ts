export type CategoryTree = {
  id: number;
  name: string;
  slug: string;
  children: CategoryTree[];
};

export type Category = {
  id: number;
  name: string;
  slugPath: string;
};

export type CategoryTopLevel = {
  id: number;
  name: string;
  slug: string;
};

export type CategoryDetail = {
  category: {
    id: number;
    name: string;
    description: string;
    slug: string;
    slugPath: string;
  };
  breadcrumb: Category[];
  children: Category[];
};
