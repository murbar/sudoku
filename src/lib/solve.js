import { GRID_SIZE, shuffled } from './helpers';
import { checkIsValid, checkValidInAll } from './validate';

const MAX_ITERATIONS = 1 << 16;
const GAME_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export const solvePuzzle = gridArray => {
  const copy = [...gridArray];
  let iterations = 0;

  if (!checkIsValid(copy)) {
    throw new Error('Invalid grid, cannot solve puzzle');
  }

  const _solveRecursively = (gridArray, index = 0) => {
    if (iterations++ > MAX_ITERATIONS) {
      throw new Error('No solution found');
    }

    if (index >= GRID_SIZE ** 2) {
      return true;
    } else if (gridArray[index] !== 0) {
      return _solveRecursively(gridArray, index + 1);
    }

    for (const guess of shuffled(GAME_NUMBERS)) {
      if (checkValidInAll(guess, index, gridArray)) {
        gridArray[index] = guess;
        if (_solveRecursively(gridArray, index + 1)) {
          return true;
        }
      }
    }

    gridArray[index] = 0;
    return false;
  };

  const solved = _solveRecursively(copy);
  if (!solved) {
    throw new Error('Puzzle not solvable in a reasonable amount of time');
  }

  return copy;
};