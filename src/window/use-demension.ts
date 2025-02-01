import { useMemo, useState, useEffect, useLayoutEffect } from 'react';

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export type DimensionRect = Pick<
  DOMRectReadOnly,
  'x' | 'y' | 'top' | 'left' | 'right' | 'bottom' | 'height' | 'width'
>;

export type DimensionRef<E extends HTMLElement = HTMLElement> = (element: E | null) => void;

export type DimensionResult<E extends HTMLElement = HTMLElement> = [
  DimensionRef<E>,
  DimensionRect
];

const defaultState: DimensionRect = Object.freeze({
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
});


/**
 * Custom hook to observe the dimensions of a DOM element using ResizeObserver.
 * @template E - The type of the DOM element to observe (default: HTMLElement).
 * @returns A tuple containing a ref callback and the current dimensions of the observed element.
 */
function useDimension<E extends HTMLElement = HTMLElement>(): DimensionResult<E> {
  const [element, ref] = useState<E | null>(null);
  const [rect, setRect] = useState<DimensionRect>(defaultState);

  const observer = useMemo(() => {
    if (typeof window === 'undefined' || !(window as any).ResizeObserver) {
      return null;
    }
    try {
      return new (window as any).ResizeObserver((entries: ResizeObserverEntry[]) => {
        if (entries[0]) {
          const { x, y, width, height, top, left, bottom, right } = entries[0].contentRect;
          const newRect = { x, y, width, height, top, left, bottom, right };
          if (
            rect.x !== x ||
            rect.y !== y ||
            rect.width !== width ||
            rect.height !== height ||
            rect.top !== top ||
            rect.left !== left ||
            rect.bottom !== bottom ||
            rect.right !== right
          ) {
            setRect(newRect);
          }
        }
      });
    } catch (error) {
      console.error('ResizeObserver initialization failed:', error);
      return null;
    }
  }, [rect]);

  useIsomorphicLayoutEffect(() => {
    if (!element || !observer) return;
    observer.observe(element);
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [element, observer]);

  return [ref, rect];
}

// Named export instead of default export
export { useDimension };

// Fallback implementation for environments without ResizeObserver
export const useDimensionFallback = (() => {
  console.warn('ResizeObserver is not supported in this environment. Falling back to default dimensions.');
  return [() => {}, defaultState];
}) as typeof useDimension;