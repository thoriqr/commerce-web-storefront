"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { DimensionFilter } from "../types";

type Options = {
  dimensions?: DimensionFilter[];
  mode?: "instant" | "draft";
};

export function useListingFilterController({ dimensions, mode = "instant" }: Options) {
  const searchParams = useSearchParams();
  const router = useRouter();

  // =========================
  // CURRENT URL STATE
  // =========================
  const currentDimensions = useMemo(() => {
    if (!dimensions) return {};
    return Object.fromEntries(dimensions.map((dim) => [dim.name, searchParams.get(dim.name)?.split(",") ?? []]));
  }, [dimensions, searchParams]);

  const currentPriceMin = searchParams.get("priceMin") ?? "";
  const currentPriceMax = searchParams.get("priceMax") ?? "";

  // =========================
  // DRAFT STATE (mobile)
  // =========================
  const [draftDimensions, setDraftDimensions] = useState(currentDimensions);

  const [minDraft, setMinDraft] = useState(currentPriceMin);

  const [maxDraft, setMaxDraft] = useState(currentPriceMax);

  const [priceError, setPriceError] = useState<string | null>(null);

  // Sync draft when URL changes (mobile only)
  useEffect(() => {
    if (mode === "draft") {
      setDraftDimensions(currentDimensions);
      setMinDraft(currentPriceMin);
      setMaxDraft(currentPriceMax);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // =========================
  // REALTIME PRICE VALIDATION
  // =========================
  useEffect(() => {
    const min = minDraft ? Number(minDraft) : undefined;
    const max = maxDraft ? Number(maxDraft) : undefined;

    if (min !== undefined && max !== undefined && min > max) {
      setPriceError("Min price cannot exceed max price");
    } else {
      setPriceError(null);
    }
  }, [minDraft, maxDraft]);

  // =========================
  // UPDATE URL (desktop)
  // =========================
  const updateParams = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (!value) params.delete(key);
      else params.set(key, value);
    });

    router.replace(`?${params.toString()}`, {
      scroll: false
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  // =========================
  // DIMENSION TOGGLE
  // =========================
  const toggleDimension = (dimension: string, value: string) => {
    if (mode === "instant") {
      const current = searchParams.get(dimension)?.split(",") ?? [];

      const next = current.includes(value) ? current.filter((v) => v !== value) : [...current, value];

      updateParams({
        [dimension]: next.length ? next.join(",") : null
      });
    } else {
      const current = draftDimensions[dimension] ?? [];

      const next = current.includes(value) ? current.filter((v) => v !== value) : [...current, value];

      setDraftDimensions({
        ...draftDimensions,
        [dimension]: next
      });
    }
  };

  // =========================
  // DESKTOP PRICE COMMIT
  // =========================
  const commitPrice = () => {
    if (priceError) return;

    if (mode === "instant") {
      updateParams({
        priceMin: minDraft || null,
        priceMax: maxDraft || null
      });
    }
  };

  // =========================
  // MOBILE APPLY
  // =========================
  const apply = () => {
    if (mode !== "draft") return;
    if (priceError) return;

    const params = new URLSearchParams(searchParams.toString());

    // Hapus filter lama dulu
    dimensions?.forEach((dim) => {
      params.delete(dim.name);
    });

    params.delete("priceMin");
    params.delete("priceMax");

    // Tambahkan draft baru
    Object.entries(draftDimensions).forEach(([key, values]) => {
      if (values.length) {
        params.set(key, values.join(","));
      }
    });

    if (minDraft) params.set("priceMin", minDraft);
    if (maxDraft) params.set("priceMax", maxDraft);

    router.replace(`?${params.toString()}`, {
      scroll: false
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  // =========================
  // RESET (cleaner)
  // =========================
  const resetAll = () => {
    const params = new URLSearchParams(searchParams.toString());

    // Hapus dimension
    dimensions?.forEach((dim) => {
      params.delete(dim.name);
    });

    // Hapus price
    params.delete("priceMin");
    params.delete("priceMax");

    router.replace(`?${params.toString()}`, {
      scroll: false
    });
  };

  // =========================
  // FILTER COUNT
  // =========================
  const activeCount = useMemo(() => {
    let count = 0;

    Object.values(currentDimensions).forEach((values) => {
      count += values.length;
    });

    if (currentPriceMin) count++;
    if (currentPriceMax) count++;

    return count;
  }, [currentDimensions, currentPriceMin, currentPriceMax]);

  const draftCount = useMemo(() => {
    if (mode !== "draft") return activeCount;

    let count = 0;

    Object.values(draftDimensions).forEach((values) => {
      count += values.length;
    });

    if (minDraft) count++;
    if (maxDraft) count++;

    return count;
  }, [mode, draftDimensions, minDraft, maxDraft, activeCount]);

  // =========================
  // DETECT CHANGES
  // =========================
  const hasChanges = useMemo(() => {
    if (mode !== "draft") return false;

    const currentString = searchParams.toString();

    const draftParams = new URLSearchParams();

    Object.entries(draftDimensions).forEach(([key, values]) => {
      if (values.length) draftParams.set(key, values.join(","));
    });

    if (minDraft) draftParams.set("priceMin", minDraft);
    if (maxDraft) draftParams.set("priceMax", maxDraft);

    return draftParams.toString() !== currentString && !priceError;
  }, [draftDimensions, minDraft, maxDraft, searchParams, mode, priceError]);

  return {
    selected: mode === "instant" ? currentDimensions : draftDimensions,

    toggleDimension,

    minDraft,
    maxDraft,
    setMinDraft,
    setMaxDraft,
    commitPrice,
    apply,
    priceError,

    activeCount,
    draftCount,
    hasChanges,

    resetAll
  };
}
