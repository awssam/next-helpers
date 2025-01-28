/**
 * A hook to get/set a specific query parameter in the URL.
 *
 * @param key          The query parameter key (e.g. "search")
 * @param defaultValue Optional default value if the key doesn’t exist in the URL
 * @returns A tuple: [currentValue, setValue]
 */
declare function useRouteQuery(key: string, defaultValue?: string): [string, (newValue: string) => void];

export { useRouteQuery };
