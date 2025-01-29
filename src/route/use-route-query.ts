"use client";

import { useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

/** Minimal store just to hold query parameters in memory */
function createStore<T>(initialState: T) {
  let state = initialState;
  return {
    getState: () => state,
    setState: (updater: (prev: T) => T) => {
      state = updater(state);
    },
  };
}

const routeQueryStore = createStore<{
  queryParams: Record<string, string | number>;
}>({
  queryParams: {},
});

/** A single global ref for the scheduled timeout */
let globalTimeoutId: ReturnType<typeof setTimeout> | null = null;

/**
 * Schedules a single router.push after a short delay (10ms)
 * to batch multiple "setValue" calls that happen at once.
 */
function schedulePush(router: ReturnType<typeof useRouter>, pathname: string) {
  if (globalTimeoutId) {
    clearTimeout(globalTimeoutId);
  }
  globalTimeoutId = setTimeout(() => {
    globalTimeoutId = null;

    const params = new URLSearchParams(
      // We cast to `any` to ignore TS complaining about string|number
      routeQueryStore.getState().queryParams as any
    );
    router.push(`${pathname}?${params.toString()}`);
  }, 10);
}

/**
 * Hook to read/write query params in the URL with automatic debounced push.
 * @param key The query key to read/write
 * @param defaultValue Default value if key isn't present in the URL
 *
 * @example
 *   const [searchQuery, setSearchQuery] = useRouteQuery("q", "");
 *   const [page, setPage] = useRouteQuery("page", 1);
 *   const handleSearch = useCallback((query: string) => {
 *     setSearchQuery(query);
 *     setPage(1);
 *   }, [setSearchQuery, setPage]);
 */
export function useRouteQuery<T extends string | number>(
  key: string,
  defaultValue?: T
): T extends number
  ? [number, (newValue: number) => void]
  : [string, (newValue: string) => void] {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const setValue = useCallback(
    (newValue: string | number) => {
      // Update the store
      routeQueryStore.setState((prev) => ({
        ...prev,
        queryParams: {
          ...prev.queryParams,
          [key]: newValue,
        },
      }));
      // Schedule a single route push
      schedulePush(router, pathname);
    },
    [key, router, pathname]
  );

  // Get current value from URL
  const urlValue = searchParams.get(key);

  if (typeof defaultValue === "number") {
    const numericValue = urlValue ? Number(urlValue) : defaultValue;
    const currentValue = isNaN(numericValue) ? defaultValue : numericValue;
    return [currentValue, setValue as (val: number) => void] as any;
  } else {
    const currentValue = urlValue ?? defaultValue ?? "";
    return [currentValue, setValue as (val: string) => void] as any;
  }
}
