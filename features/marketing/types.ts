export const BANNER_PLACEMENTS = {
  HOMEPAGE_HERO: "homepage_hero"
} as const;

export type BannerPlacement = (typeof BANNER_PLACEMENTS)[keyof typeof BANNER_PLACEMENTS];

export type Banner = {
  id: number;
  title: string;
  imageKey: string;
  url: string;
};
