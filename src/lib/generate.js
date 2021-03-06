import {
  getRandomIndex,
  getRandomElement,
  GAME_NUMBERS,
  initEmptyGridCells,
  countCellsFilled
} from './common';
import { solvePuzzle } from './norvigSolve';

/* TODO
http://www.norvig.com/sudoku.html
"If we fill at least 17 squares with at least 8 different digits then we are done.
(Note: with less than 17 squares filled in or less than 8 different digits it is known
that there will be duplicate solutions. Thanks to Olivier Grégoire for the fine suggestion
about 8 different digits.)"
*/

const difficultyLevels = {
  1: 37,
  2: 27,
  3: 17
};

const getMinHints = level => {
  if (level === 2 || level === 3) return difficultyLevels[level];
  return difficultyLevels[1];
};

const seedGrid = emptyGrid => {
  // populate a random cell with a random value to ensure unique puzzle
  emptyGrid[getRandomIndex()] = getRandomElement(GAME_NUMBERS);
};

export const generateGameCells = (difficulty = 1) => {
  const emptyGrid = initEmptyGridCells();
  seedGrid(emptyGrid);
  const gameGridSolved = solvePuzzle(emptyGrid);
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
