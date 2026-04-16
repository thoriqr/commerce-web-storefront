"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { clampPrice } from "../utils/clamp-price";

type DimensionLike = {
  name: string;
};

type Options = {
  dimensions?: DimensionLike[];
  mode?: "instant" | "draft";
};

export function useListingFilterController({ dimensions, mode = "instant" }: Options) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const hasSyncedRef = useRef(false);

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

  // REALTIME PRICE VALIDATION
  const validatePrice = (min: string, max: string) => {
    const minNum = min ? Number(min) : undefined;
    const maxNum = max ? Number(max) : undefined;

    if (minNum !== undefined && maxNum !== undefined && minNum > maxNum) {
      return "Min price cannot exceed max price";
    }

    return null;
  };

  useEffect(() => {
    const error = validatePrice(minDraft, maxDraft);
    setPriceError(error);
  }, [minDraft, maxDraft]);

  // Sync price state in instant mode when URL changes
  useEffect(() => {
    if (mode !== "instant") return;

    setMinDraft(currentPriceMin);
    setMaxDraft(currentPriceMax);
  }, [currentPriceMin, currentPriceMax, mode]);

  useEffect(() => {
    if (mode !== "instant") return;

    const fixMin = clampPrice(currentPriceMin);
    const fixMax = clampPrice(currentPriceMax);

    if (fixMin !== currentPriceMin || fixMax !== currentPriceMax) {
      const params = new URLSearchParams(searchParams.toString());

      if (fixMin) params.set("priceMin", fixMin);
      else params.delete("priceMin");

      if (fixMax) params.set("priceMax", fixMax);
      else params.delete("priceMax");

      router.replace(`?${params.toString()}`, {
        scroll: false
      });
    }
  }, [currentPriceMin, currentPriceMax, mode, router, searchParams]);

  // MANUAL SYNC (for drawer open)
  const syncFromUrl = () => {
    if (mode !== "draft") return;

    // sync once open cycle
    if (hasSyncedRef.current) return;

    setDraftDimensions(currentDimensions);
    setMinDraft(currentPriceMin);
    setMaxDraft(currentPriceMax);

    hasSyncedRef.current = true;
  };

  const resetSyncFlag = () => {
    hasSyncedRef.current = false;
  };

  // UPDATE URL
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

  // DIMENSION TOGGLE
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

  // DESKTOP PRICE COMMIT
  const commitPrice = () => {
    if (mode !== "instant") return;
    if (priceError) return;

    updateParams({
      priceMin: minDraft || null,
      priceMax: maxDraft || null
    });
  };

  // MOBILE APPLY
  const apply = () => {
    if (mode !== "draft") return;
    if (priceError) return;

    const params = new URLSearchParams(searchParams.toString());

    // clear old filters
    dimensions?.forEach((dim) => {
      params.delete(dim.name);
    });

    params.delete("priceMin");
    params.delete("priceMax");

    // apply draft
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
  };

  // RESET
  const resetAll = () => {
    router.replace(pathname, { scroll: false });

    if (mode === "draft") {
      setDraftDimensions({});
      setMinDraft("");
      setMaxDraft("");
    }
  };

  // COUNTS
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
  }, [draftDimensions, minDraft, maxDraft, mode, activeCount]);

  const hasChanges = useMemo(() => {
    if (mode !== "draft") return false;

    const currentString = searchParams.toString();

    const draftParams = new URLSearchParams();

    Object.entries(draftDimensions).forEach(([key, values]) => {
      if (values.length) {
        draftParams.set(key, values.join(","));
      }
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

    resetAll,
    syncFromUrl,
    resetSyncFlag
  };
}
