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

export { useRouteQuery };
