"use client";

import { useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

function useRouteQuery<T extends string | number>(
  key: string,
  defaultValue?: T
): T extends number ? [number, (newValue: number) => void] : [string, (newValue: string) => void] {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const urlValue = searchParams.get(key);

  // Create setValue unconditionally
  const setValue = useCallback(
    (newValue: string | number) => {
      const params = new URLSearchParams(searchParams.toString());
      const stringValue = newValue.toString();

      if (stringValue) {
        params.set(key, stringValue);
      } else {
        params.delete(key);
      }

      router.push(`${pathname}?${params.toString()}`);
    },
    [key, pathname, router, searchParams]
  );

  // Determine current value
  let currentValue: string | number;
  if (typeof defaultValue === "number") {
    const numericValue = urlValue ? Number(urlValue) : defaultValue;
    currentValue = isNaN(numericValue) ? defaultValue : numericValue;
    return [currentValue, setValue as (newValue: number) => void] as any;
  } else {
    currentValue = urlValue ?? defaultValue ?? "";
    return [currentValue, setValue as (newValue: string) => void] as any;
  }
}

export { useRouteQuery };