"use client"

import { useCallback } from "react"
import { useSearchParams, usePathname, useRouter } from "next/navigation"

/**
 * A hook to get/set a specific query parameter in the URL.
 *
 * @param key          The query parameter key (e.g. "search")
 * @param defaultValue Optional default value if the key doesn’t exist in the URL
 * @returns A tuple: [currentValue, setValue]
 */
export function useRouteQuery(
  key: string,
  defaultValue?: string
): [string, (newValue: string) => void] {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  // Read current value from the URL or use fallback
  const currentValue = searchParams.get(key) ?? defaultValue ?? ""

  // Update the query param
  const setValue = useCallback(
    (newValue: string) => {
      const params = new URLSearchParams(searchParams.toString())

      if (newValue) {
        params.set(key, newValue)
      } else {
        params.delete(key)
      }

      router.push(`${pathname}?${params.toString()}`)
    },
    [searchParams, key, router, pathname]
  )

  return [currentValue, setValue]
}
