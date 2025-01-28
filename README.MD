
# @awssam/next-helpers

A small collection of reusable helpers and hooks for **Next.js** projects. Currently, it includes:

- `useRouteQuery` – A client-side hook for getting and setting URL search parameters in Next.js (App Router).

> **Note**: This library is intended for Next.js 13+ using the **App Router**. It relies on the new `next/navigation` utilities.

---

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [useRouteQuery](#useroutequery)
- [Examples](#examples)
- [Contributing](#contributing)
- [License](#license)

---

## Installation

Install the package via npm or yarn:

```bash
npm install @awssam/next-helpers
```

Or

```bash
yarn add @awssam/next-helpers
```

> **Peer Dependencies**: You need **React**, **ReactDOM**, and **Next.js** in your project (v13 or later). Make sure they’re installed in your own `package.json`.

---

## Usage

### `useRouteQuery`

A simple hook to read and update a single query parameter in the URL, using [Next.js App Router](https://nextjs.org/docs/app/api-reference/functions/use-router).

#### Signature

```ts
function useRouteQuery(
  key: string,
  defaultValue?: string
): [string, (newValue: string) => void]
```

- **key**  
  The query parameter key, e.g. `"search"`.
- **defaultValue**  
  An optional fallback if the key doesn’t exist in the current URL.

Returns a tuple:  
1. **currentValue** – the current value of the query param (string).  
2. **setValue** – a function that updates the query param in the URL. Setting an empty string (`""`) removes the param entirely.

#### Basic Example

```tsx
"use client"

// pages/app or any client component
import { useRouteQuery } from "@awssam/next-helpers/route"

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

## Examples

**Clearing vs Setting**  
Setting a non‐empty string sets the query param: `?search=value`.  
Passing an empty string (`""`) removes the param from the URL.

**Using Multiple Hooks**  
If you need multiple query params:

```tsx
"use client"

import { useRouteQuery } from "@awssam/next-helpers/route"

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

---

## Contributing

1. **Fork** the repo and clone it locally.
2. Create a **branch** for your contribution (`feature/my-new-helper`).
3. **Commit** your changes and push your branch.
4. Create a **Pull Request** and describe your changes.

---

## License

This project is licensed under the [MIT License](./LICENSE).  

Feel free to open issues or submit PRs for new Next.js helpers that could be included here in the future. We welcome your contributions!