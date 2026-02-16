import { ProductDetail } from "./types";

export const mockProductDetail: ProductDetail = {
  id: 1,
  name: "Minimalist Running Shoes",
  slug: "minimalist-running-shoes",
  description: "Comfortable lightweight running shoes with breathable mesh upper.",
  category: {
    name: "Shoes",
    slug: "shoes"
  },

  status: "ACTIVE",
  isVariant: true,
  initialVariantId: "v1",

  dimensions: [
    {
      id: "color",
      name: "Color",
      values: [
        { id: "red", name: "Red" },
        { id: "black", name: "Black" }
      ]
    },
    {
      id: "size",
      name: "Size",
      values: [
        { id: "40", name: "40" },
        { id: "41", name: "41" }
      ]
    }
  ],

  // 🔥 INI YANG PENTING
  variants: [
    {
      id: "v1",
      options: [
        { dimensionId: "color", valueId: "red" },
        { dimensionId: "size", valueId: "40" }
      ]
    },
    {
      id: "v2",
      options: [
        { dimensionId: "color", valueId: "red" },
        { dimensionId: "size", valueId: "41" }
      ]
    },
    {
      id: "v3",
      options: [
        { dimensionId: "color", valueId: "black" },
        { dimensionId: "size", valueId: "40" }
      ]
    },
    {
      id: "v4",
      options: [
        { dimensionId: "color", valueId: "black" },
        { dimensionId: "size", valueId: "41" }
      ]
    }
  ],

  images: [
    // GENERAL PRODUCT IMAGES
    {
      id: "img-1",
      url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
      type: "product"
    },
    {
      id: "img-2",
      url: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb",
      type: "product"
    },

    // VARIANT IMAGE (Color Red)
    {
      id: "img-red",
      url: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80",
      type: "variant",
      signature: {
        dimensionId: "color",
        valueId: "red"
      }
    },

    // VARIANT IMAGE (Color Black)
    {
      id: "img-black",
      url: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=800&q=80",
      type: "variant",
      signature: {
        dimensionId: "color",
        valueId: "black"
      }
    }
  ]
};
