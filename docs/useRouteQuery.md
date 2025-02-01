
# `useRouteQuery`

A simple hook to read and update a single query parameter in the URL, using [Next.js App Router](https://nextjs.org/docs/app/api-reference/functions/use-router).

---

## Signature

```ts
function useRouteQuery(
  key: string,
  defaultValue?: string
): [string, (newValue: string) => void]
```

- **key**  
  The query parameter key, e.g., `"search"`.
- **defaultValue**  
  An optional fallback if the key doesn’t exist in the current URL.

Returns a tuple:  
1. **currentValue** – the current value of the query param (string).  
2. **setValue** – a function that updates the query param in the URL. Setting an empty string (`""`) removes the param entirely.

---

## Basic Example

```tsx
"use client"
// pages/app or any client component
import { useRouteQuery } from "@awssam/next-helpers"

export default function Page() {
  const [search, setSearch] = useRouteQuery("search", "banana")
  return (
    <div>
      <p>Search is: {search}</p>
      <button onClick={() => setSearch("apple")}>Set to apple</button>
      <button onClick={() => setSearch("")}>Remove query</button>
    </div>
  )
}
```

When you call `setSearch`, it updates the query parameter in the browser’s address bar without performing a full page reload. For example:
- `setSearch("apple")` → `/?search=apple`
- `setSearch("")` → removes the parameter `?search=` from the URL.

---

## Notes

- This hook works only on the client side. Ensure the component is rendered with `"use client"`.
- It relies on the `useRouter` and `usePathname` utilities from `next/navigation`.

---

## Examples

### Clearing vs Setting Query Parameters

Setting a non-empty string sets the query param: `?search=value`.  
Passing an empty string (`""`) removes the param from the URL.

```tsx
"use client"
import { useRouteQuery } from "@awssam/next-helpers"

export default function MultiParams() {
  const [search, setSearch] = useRouteQuery("search")
  const [category, setCategory] = useRouteQuery("category", "all")

  // /?search=&category=all
  return (
    <div>
      <button onClick={() => setSearch("shoes")}>Search "shoes"</button>
      <button onClick={() => setCategory("clothing")}>Category "clothing"</button>
    </div>
  )
}
```