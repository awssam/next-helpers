declare function useRouteQuery<T extends string | number>(key: string, defaultValue?: T): [T, (newValue: T) => void];

export { useRouteQuery };
