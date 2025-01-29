// src/route/use-route-query.ts
import { useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
function createStore(initialState) {
  let state = initialState;
  return {
    getState: () => state,
    setState: (updater) => {
      state = updater(state);
    }
  };
}
var routeQueryStore = createStore({
  queryParams: {}
});
var globalTimeoutId = null;
function schedulePush(router, pathname) {
  if (globalTimeoutId) {
    clearTimeout(globalTimeoutId);
  }
  globalTimeoutId = setTimeout(() => {
    globalTimeoutId = null;
    const params = new URLSearchParams(
      // We cast to `any` to ignore TS complaining about string|number
      routeQueryStore.getState().queryParams
    );
    router.push(`${pathname}?${params.toString()}`);
  }, 10);
}
function useRouteQuery(key, defaultValue) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const setValue = useCallback(
    (newValue) => {
      routeQueryStore.setState((prev) => ({
        ...prev,
        queryParams: {
          ...prev.queryParams,
          [key]: newValue
        }
      }));
      schedulePush(router, pathname);
    },
    [key, router, pathname]
  );
  const urlValue = searchParams.get(key);
  if (typeof defaultValue === "number") {
    const numericValue = urlValue ? Number(urlValue) : defaultValue;
    const currentValue = isNaN(numericValue) ? defaultValue : numericValue;
    return [currentValue, setValue];
  } else {
    const currentValue = urlValue ?? defaultValue ?? "";
    return [currentValue, setValue];
  }
}
export {
  useRouteQuery
};
