"use client";

import { useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

// Overload for number type (requires defaultValue)
//@ts-expect-error error dyal l khra.
function useRouteQuery(
  key: string,
  defaultValue: number
): [number, (newValue: number) => void];
// Overload for string type (defaultValue optional)
function useRouteQuery(
  key: string,
  defaultValue?: string
): [string, (newValue: string) => void];
// Implementation
function useRouteQuery(
  key: string,
  defaultValue?: string | number
): [string | number, (newValue: string | number) => void] {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const urlValue = searchParams.get(key);

  // Determine current value with type handling
  let currentValue: string | number = urlValue ?? defaultValue ?? "";
  if (typeof defaultValue === "number") {
    currentValue = urlValue ? Number(urlValue) : defaultValue;
    if (isNaN(currentValue)) currentValue = defaultValue;
  }

  const setValue = useCallback(
    (newValue: string | number) => {
      const params = new URLSearchParams(searchParams.toString());
      const stringValue =
        typeof newValue === "number" ? newValue.toString() : newValue;

      if (stringValue) {
        params.set(key, stringValue);
      } else {
        params.delete(key);
      }

      router.push(`${pathname}?${params.toString()}`);
    },
    [key, pathname, router, searchParams]
  );

  return [currentValue, setValue];
}

export { useRouteQuery };
