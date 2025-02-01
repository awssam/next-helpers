
# `useDimension`

A hook to observe and track the dimensions of a DOM element using the `ResizeObserver` API. This is useful for responsive layouts or components that need to react to size changes dynamically.

---

## Signature

```ts
function useDimension<E extends HTMLElement = HTMLElement>(): [
  DimensionRef<E>,
  DimensionRect
]
```

- **DimensionRef**  
  A ref callback to attach to the target DOM element.
- **DimensionRect**  
  An object containing the observed dimensions of the element:  
  ```ts
  {
    x: number;
    y: number;
    width: number;
    height: number;
    top: number;
    left: number;
    bottom: number;
    right: number;
  }
  ```

---

## Basic Example

```tsx
"use client"
import { useDimension } from "@awssam/next-helpers"

export default function BoxWithDimensions() {
  const [ref, rect] = useDimension()

  return (
    <div
      ref={ref as React.Ref<HTMLDivElement>}
      style={{
        width: "50%",
        height: "200px",
        border: "1px solid black",
        padding: "16px",
      }}
    >
      <p>Width: {rect.width}px</p>
      <p>Height: {rect.height}px</p>
      <p>Top: {rect.top}px</p>
      <p>Left: {rect.left}px</p>
    </div>
  )
}
```

In this example:
- The `ref` is attached to a `div` element.
- The `rect` object provides real-time dimensions of the `div` as it resizes.

---

## Notes

- If the browser does not support `ResizeObserver`, the hook falls back to returning default dimensions (`{ x: 0, y: 0, width: 0, height: 0, ... }`).
- Ensure the component is rendered on the client side by wrapping it with `"use client"`.

---

## Advanced Example

You can use `useDimension` for multiple elements by creating separate instances of the hook.

```tsx
"use client"
import { useDimension } from "@awssam/next-helpers"

export default function MultipleBoxes() {
  const [ref1, rect1] = useDimension()
  const [ref2, rect2] = useDimension()

  return (
    <div>
      <div
        ref={ref1 as React.Ref<HTMLDivElement>}
        style={{ width: "50%", height: "100px", border: "1px solid red" }}
      >
        <p>Box 1 Width: {rect1.width}px</p>
      </div>
      <div
        ref={ref2 as React.Ref<HTMLDivElement>}
        style={{ width: "50%", height: "150px", border: "1px solid blue" }}
      >
        <p>Box 2 Height: {rect2.height}px</p>
      </div>
    </div>
  )
}
```