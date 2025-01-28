"use client";

import { useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

// Use a union type instead of overloads
function useRouteQuery<T extends string | number>(
  key: string,
  defaultValue?: T
): [T, (newValue: T) => void] {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const urlValue = searchParams.get(key);

  // Type-safe value handling
  let currentValue: T;
  if (typeof defaultValue === "number") {
    const numericValue = urlValue ? Number(urlValue) : defaultValue;
    currentValue = (isNaN(numericValue) ? defaultValue : numericValue) as T;
  } else {
    currentValue = (urlValue ?? defaultValue ?? "") as T;
  }

  const setValue = useCallback(
    (newValue: T) => {
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

  return [currentValue, setValue];
}

export { useRouteQuery };