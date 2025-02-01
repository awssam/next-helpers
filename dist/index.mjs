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

// src/window/use-demension.ts
import { useMemo, useState, useEffect, useLayoutEffect } from "react";
var useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;
var defaultState = Object.freeze({
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  top: 0,
  left: 0,
  bottom: 0,
  right: 0
});
function useDimension() {
  const [element, ref] = useState(null);
  const [rect, setRect] = useState(defaultState);
  const observer = useMemo(() => {
    if (typeof window === "undefined" || !window.ResizeObserver) {
      return null;
    }
    try {
      return new window.ResizeObserver((entries) => {
        if (entries[0]) {
          const { x, y, width, height, top, left, bottom, right } = entries[0].contentRect;
          const newRect = { x, y, width, height, top, left, bottom, right };
          if (rect.x !== x || rect.y !== y || rect.width !== width || rect.height !== height || rect.top !== top || rect.left !== left || rect.bottom !== bottom || rect.right !== right) {
            setRect(newRect);
          }
        }
      });
    } catch (error) {
      console.error("ResizeObserver initialization failed:", error);
      return null;
    }
  }, [rect]);
  useIsomorphicLayoutEffect(() => {
    if (!element || !observer) return;
    observer.observe(element);
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [element, observer]);
  return [ref, rect];
}
var useDimensionFallback = () => {
  console.warn("ResizeObserver is not supported in this environment. Falling back to default dimensions.");
  return [() => {
  }, defaultState];
};
export {
  useDimension,
  useDimensionFallback,
  useRouteQuery
};
