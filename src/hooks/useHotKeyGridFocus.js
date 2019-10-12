import { useEffect, useState } from 'react';
import useHotKey from 'hooks/useHotKey';

const ROW_KEYS = 'abcdefghi'.split('');
const COL_KEYS = '123456789'.split('');

const calcGridIndex = ({ row, col }) => row * ROW_KEYS.length + col;

const initState = { row: null, col: null };

const noOp = () => {};

export default function useHotKeyGridFocus(moveToIndex = noOp, blurFocus = noOp) {
  const [location, setLocation] = useState(initState);

  useEffect(() => {
    console.log({ row: location.row, col: location.col });
    if (location.row !== null && location.col !== null) {
      moveToIndex(calcGridIndex(location));
      setLocation(initState);
    }
  }, [location, moveToIndex]);

  useHotKey(ROW_KEYS, e => {
    blurFocus();
    const i = ROW_KEYS.indexOf(e.key);
    setLocation({ row: i, col: null });
  });

  useHotKey(COL_KEYS, e => {
    const i = COL_KEYS.indexOf(e.key);
    setLocation(prev => {
      return prev.row !== null ? { ...prev, col: i } : prev;
    });
  });

  return location;
}
