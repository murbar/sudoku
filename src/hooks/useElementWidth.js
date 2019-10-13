import { useState, useEffect } from 'react';
import ResizeObserver from 'resize-observer-polyfill';

export default function useElementwidth(elementRef) {
  const [width, set] = useState(null);
  const [ro] = useState(
    () => new ResizeObserver(([entry]) => set(entry.contentRect.width))
  );

  useEffect(() => {
    ro.observe(elementRef.current);
    return () => ro.disconnect();
  }, [elementRef, ro]);

  return width;
}
