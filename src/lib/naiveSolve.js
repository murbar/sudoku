import { GAME_NUMBERS, shuffled } from './common';
import { checkIsValid, checkValidInAll } from './validate';

/*
  This algorithm is sufficient for most puzzles but will exceed its max iterations
  with hard puzzles. We can improve up it by finding known values via constraint
  propagation before resorting to search, i.e. with Norvig's algorithm.
*/

const MAX_ITERATIONS = 1 << 16;

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

    if (index >= gridArray.length) {
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
  console.log(`solved with ${iterations} iterations`);
  return copy;
};
