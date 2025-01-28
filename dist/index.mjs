// src/route/use-route-query.ts
import { useCallback } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
function useRouteQuery(key, defaultValue) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const currentValue = searchParams.get(key) ?? defaultValue ?? "";
  const setValue = useCallback(
    (newValue) => {
      const params = new URLSearchParams(searchParams.toString());
      if (newValue) {
        params.set(key, newValue);
      } else {
        params.delete(key);
      }
      router.push(`${pathname}?${params.toString()}`);
    },
    [searchParams, key, router, pathname]
  );
  return [currentValue, setValue];
}
export {
  useRouteQuery
};
