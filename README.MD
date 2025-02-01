# @awssam/next-helpers

A small collection of reusable helpers and hooks for **Next.js** projects. Currently, it includes:

- [`useRouteQuery`](./docs/useRouteQuery.md) – A client-side hook for getting and setting URL search parameters in Next.js (App Router).
- [`useDimension`](./docs/useDimension.md) – A hook to observe and track the dimensions of a DOM element using the `ResizeObserver` API.

> **Note**: This library is intended for Next.js 13+ using the **App Router**. It relies on the new `next/navigation` utilities.

---

## Table of Contents

- [Installation](#installation)
- [Documentation](#documentation)
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

## Documentation

- [`useRouteQuery`](./docs/useRouteQuery.md)
- [`useDimension`](./docs/useDimension.md)

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
