import { getRandomIndex, initEmptyGridCells, countCellsFilled } from './helpers';
import { solvePuzzle } from './solve';

const difficultyLevels = {
  1: 37,
  2: 27,
  3: 17
};

const getMinHints = level => {
  if (level === 2 || level === 3) return difficultyLevels[level];
  return difficultyLevels[1];
};

export const generateGameCells = (difficulty = 1) => {
  const gameGridSolved = solvePuzzle(initEmptyGridCells());
  const gameGrid = [...gameGridSolved];
  const minHints = getMinHints(difficulty);

  while (countCellsFilled(gameGrid) > minHints) {
    let i = getRandomIndex();
    while (gameGrid[i] === 0) {
      i = getRandomIndex();
    }
    gameGrid[i] = 0;
  }

  // let attempts = 5;
  // while (attempts > 0) {
  //   let [row, col] = [getRandomIndex(), getRandomIndex()];
  //   while (gameGrid[row][col] === 0) {
  //     [row, col] = [getRandomIndex(), getRandomIndex()];
  //   }
  //   const oldValue = gameGrid[row][col];
  //   gameGrid[row][col] = 0;
  //   const copy = copyMatrix(gameGrid);

  // }

  return [gameGrid, gameGridSolved];
};
