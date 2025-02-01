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
declare function useRouteQuery<T extends string | number>(key: string, defaultValue?: T): T extends number ? [number, (newValue: number) => void] : [string, (newValue: string) => void];

type DimensionRect = Pick<DOMRectReadOnly, 'x' | 'y' | 'top' | 'left' | 'right' | 'bottom' | 'height' | 'width'>;
type DimensionRef<E extends HTMLElement = HTMLElement> = (element: E | null) => void;
type DimensionResult<E extends HTMLElement = HTMLElement> = [
    DimensionRef<E>,
    DimensionRect
];
/**
 * Custom hook to observe the dimensions of a DOM element using ResizeObserver.
 * @template E - The type of the DOM element to observe (default: HTMLElement).
 * @returns A tuple containing a ref callback and the current dimensions of the observed element.
 */
declare function useDimension<E extends HTMLElement = HTMLElement>(): DimensionResult<E>;

declare const useDimensionFallback: typeof useDimension;

export { type DimensionRect, type DimensionRef, type DimensionResult, useDimension, useDimensionFallback, useRouteQuery };
