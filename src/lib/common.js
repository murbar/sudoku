export const GAME_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9];
export const GRID_SIZE = 9;

export const difficulties = {
  EASY: 1,
  NORMAL: 2,
  HARD: 3
};

export const buildEmptyArray = length => Array(length).fill(null);

export const shuffled = array => {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

export const getIndexes = (array, testFn = () => true) =>
  array.reduce((indexes, v, i) => {
    return testFn(v) ? [...indexes, i] : indexes;
  }, []);

export const getRandomIndex = (arrayLength = 81) =>
  Math.floor(Math.random() * arrayLength);

export const getRandomElement = array => {
  return array[getRandomIndex(array.length)];
};

export const initEmptyGridCells = (width = GRID_SIZE, height = GRID_SIZE) =>
  buildEmptyArray(width * height).map(() => 0);

export const calcRowAndCol = (index, gridWidth = GRID_SIZE) => {
  return { row: Math.floor(index / gridWidth), col: index % gridWidth };
};

export const calcSubGrid = (index, gridWidth = GRID_SIZE / 3) => {
  const { row, col } = calcRowAndCol(index);
  return Math.floor(row / gridWidth) * gridWidth + Math.floor(col / gridWidth);
};

export const serializeGridValuesArray = array => array.join('');

export const deserializeGridValuesString = string => {
  const GRID_VALUES = '0123456789.';
  return [...string]
    .filter(ch => GRID_VALUES.includes(ch))
    .map(v => (v === '.' ? 0 : parseInt(v, 10)));
};

export const checkIsFilled = gridArray => {
  for (let value of gridArray) {
    if (value === 0) return false;
  }
  return true;
};

export const checkIsEmpty = gridArray => {
  for (let value of gridArray) {
    if (value !== 0) return false;
  }
  return true;
};

export const countCellsFilled = gridArray =>
  gridArray.reduce((count, cell) => (cell !== 0 ? count + 1 : count), 0);

export const isArrowKey = key =>
  key === 'ArrowUp' || key === 'ArrowDown' || key === 'ArrowRight' || key === 'ArrowLeft';

export const calcDestinationIndex = (index, key) => {
  let destIndex = index;
  const maxIndex = GRID_SIZE ** 2 - 1;
  if (key === 'ArrowRight') {
    const i = destIndex + 1;
    destIndex = i <= maxIndex ? i : 0;
  }
  if (key === 'ArrowLeft') {
    const i = destIndex + -1;
    destIndex = i >= 0 ? i : maxIndex;
  }
  if (key === 'ArrowDown') {
    const i = destIndex + GRID_SIZE;
    destIndex = i < maxIndex ? i : i - maxIndex;
  }
  if (key === 'ArrowUp') {
    const i = destIndex - GRID_SIZE;
    destIndex = i > 0 ? i : maxIndex + i; // i is negative in else clause
  }
  return destIndex;
};
