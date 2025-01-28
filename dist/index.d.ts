declare function useRouteQuery<T extends string | number>(key: string, defaultValue?: T): T extends number ? [number, (newValue: number) => void] : [string, (newValue: string) => void];

export { useRouteQuery };
