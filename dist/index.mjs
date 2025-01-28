// src/route/use-route-query.ts
import { useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
function useRouteQuery(key, defaultValue) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const urlValue = searchParams.get(key);
  let currentValue;
  if (typeof defaultValue === "number") {
    const numericValue = urlValue ? Number(urlValue) : defaultValue;
    currentValue = isNaN(numericValue) ? defaultValue : numericValue;
  } else {
    currentValue = urlValue ?? defaultValue ?? "";
  }
  const setValue = useCallback(
    (newValue) => {
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
export {
  useRouteQuery
};
