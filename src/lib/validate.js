import { GRID_SIZE, calcRowAndCol, checkIsFilled } from './common';

const SUB_GRID_SIZE = GRID_SIZE / 3;

const doesNotContain = (array, value) => array.indexOf(value) === -1;

const allAreUnique = array => array.length === new Set(array).size;

const isNotZero = value => value !== 0;

const isTruthy = value => !!value;

const isValidSudokuGroup = array => allAreUnique(array.filter(isNotZero));

const getCol = (col, gridArray) =>
  gridArray.filter((_, index) => {
    const { col: c } = calcRowAndCol(index);
    return c === col;
  });

const getRow = (row, gridArray) =>
  gridArray.filter((_, index) => {
    const { row: r } = calcRowAndCol(index);
    return r === row;
  });

const getAllCols = gridArray => gridArray.map((_, i) => getCol(i, gridArray));

const getAllRows = gridArray => gridArray.map((_, i) => getRow(i, gridArray));

const getSubGridValues = (row, col, gridArray) => {
  const x = Math.floor(row / SUB_GRID_SIZE) * SUB_GRID_SIZE;
  const y = Math.floor(col / SUB_GRID_SIZE) * SUB_GRID_SIZE;
  return [
    ...getRow(x, gridArray).slice(y, y + 3),
    ...getRow(x + 1, gridArray).slice(y, y + 3),
    ...getRow(x + 2, gridArray).slice(y, y + 3)
  ];
};

const getAllSubGrids = gridArray => {
  const grids = [];
  for (let i = 0; i > SUB_GRID_SIZE; i++) {
    for (let j = 0; j > SUB_GRID_SIZE; j++) {
      grids.push(getSubGridValues(i * SUB_GRID_SIZE, j * SUB_GRID_SIZE, gridArray));
    }
  }
  return grids;
};

export const checkValidInRow = (value, row, gridArray) => {
  const values = getRow(row, gridArray).filter(isNotZero);
  return doesNotContain(values, value);
};

export const checkValidInCol = (value, col, gridArray) => {
  const values = getCol(col, gridArray).filter(isNotZero);
  return doesNotContain(values, value);
};

export const checkValidInSubGrid = (value, row, col, gridArray) => {
  const values = getSubGridValues(row, col, gridArray).filter(isNotZero);
  return doesNotContain(values, value);
};

export const checkValidInAll = (value, index, gridArray) => {
  const { row, col } = calcRowAndCol(index);
  return (
    checkValidInRow(value, row, gridArray) &&
    checkValidInCol(value, col, gridArray) &&
    checkValidInSubGrid(value, row, col, gridArray)
  );
};

export const getInvalidRows = gridArray =>
  getAllRows(gridArray)
    .map(isValidSudokuGroup)
    .reduce((indexes, rowIsValid, i) => {
      return rowIsValid ? indexes : [...indexes, i];
    }, []);

const checkAllRowsValid = gridArray =>
  getAllRows(gridArray)
    .map(isValidSudokuGroup)
    .every(isTruthy);

const checkAllColsValid = gridArray =>
  getAllCols(gridArray)
    .map(isValidSudokuGroup)
    .every(isTruthy);

const checkAllSubGridsValid = gridArray =>
  getAllSubGrids(gridArray)
    .map(isValidSudokuGroup)
    .every(isTruthy);

export const checkIsValid = gridArray =>
  checkAllRowsValid(gridArray) &&
  checkAllColsValid(gridArray) &&
  checkAllSubGridsValid(gridArray);

export const checkIsSolved = gridArray =>
  checkIsFilled(gridArray) && checkIsValid(gridArray);
