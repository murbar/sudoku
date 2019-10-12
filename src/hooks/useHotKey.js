import { useEffect, useRef } from 'react';

export default function useHotKey(target, callback = () => {}) {
  const targets = Array.isArray(target) ? target : [target];
  const keydown = useRef(false);

  useEffect(() => {
    const downHandler = e => {
      const { key } = e;
      // check for long press
      if (keydown.current) return;

      if (targets.includes(key)) {
        keydown.current = true;
        callback(e);
      }
    };

    const upHandler = ({ key }) => {
      if (targets.includes(key)) {
        keydown.current = false;
      }
    };

    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);
    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, [targets, callback]);
}
