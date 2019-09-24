import { useEffect, useCallback, useMemo } from 'react';
import {
  initEmptyGridCells,
  getIndexes,
  getRandomElement,
  countCellsFilled
} from 'lib/helpers';
import { generateGameCells } from 'lib/generate';
import { checkValidInAll, checkIsSolved } from 'lib/validate';
import { solvePuzzle } from 'lib/solve';
import useLocalStorageState from 'hooks/useLocalStorageState';
import config from 'config';

const initGameState = options => ({
  startingCells: [],
  finalCells: [],
  currentCells: initEmptyGridCells(),
  difficulty: options.difficulty,
  hintsRemaining: options.hints,
  isPaused: false,
  invalidCellIndexes: [],
  gameInProgress: false
});

export default function useSudoku(options) {
  options = {
    blank: false,
    hints: 3,
    difficulty: 1,
    ...options
  };
  const [gameState, setGameState] = useLocalStorageState(
    config.localStorageKeys.gameState,
    initGameState(options)
  );
  const startingValueIndexes = getIndexes(gameState.startingCells, v => v !== 0);
  const isSolved = useMemo(() => checkIsSolved(gameState.currentCells), [gameState]);
  const isFilledButUnsolved = useMemo(
    () =>
      !isSolved &&
      countCellsFilled(gameState.currentCells) === gameState.currentCells.length,
    [gameState, isSolved]
  );

  const checkValidCell = (index, value) =>
    checkValidInAll(value, index, gameState.currentCells);

  const setCell = (index, value) => {
    setGameState(prev => {
      let invalidCells = [...prev.invalidCellIndexes];
      if (!checkValidCell(index, value)) {
        // also check if value matches solved puzzle value?
        // if so, puzzle must have only one solution
        invalidCells.push(index);
        // console.log(invalidCellIndexes.current);
      } else {
        invalidCells = invalidCells.filter(i => i !== index);
      }
      prev.currentCells[index] = value;
      return {
        ...prev,
        currentCells: prev.currentCells,
        invalidCellIndexes: invalidCells
      };
    });
  };

  const getHint = () => {
    if (gameState.hintsRemaining > 0) {
      const emptyCells = getIndexes(gameState.currentCells, v => v === 0);
      const i = getRandomElement(emptyCells);
      setCell(i, gameState.finalCells[i]);
      setGameState(prev => {
        return {
          ...prev,
          hintsRemaining: prev.hintsRemaining - 1
        };
      });
    }
  };

  const addHints = (qty = 3) => {
    setGameState(prev => {
      return {
        ...prev,
        hintsRemaining: prev.hintsRemaining + qty
      };
    });
  };

  const solveGame = () => {
    // try/catch
    const solved = solvePuzzle(gameState.currentCells);
    setGameState(prev => ({ ...prev, currentCells: solved }));
  };

  const togglePaused = () => {
    setGameState(prev => ({ ...prev, isPaused: !prev.isPaused }));
  };

  const setDifficulty = level => {
    setGameState(prev => ({ ...prev, difficulty: level }));
  };

  const clearCells = () => {
    setGameState(prev => ({
      ...prev,
      currentCells: initEmptyGridCells(),
      startingCells: [],
      finalCells: [],
      invalidCellIndexes: []
    }));
  };

  const initNewGame = useCallback(() => {
    const [starting, final] = generateGameCells(gameState.difficulty);
    setGameState(prev => ({
      ...prev,
      startingCells: [...starting],
      finalCells: [...final],
      currentCells: [...starting],
      hintsRemaining: options.hints,
      gameInProgress: true
    }));
  }, [gameState.difficulty, options.hints, setGameState]);

  const resetGame = () => {
    if (gameState.startingCells.length > 0) {
      setGameState(prev => ({
        ...prev,
        currentCells: [...prev.startingCells],
        invalidCellIndexes: []
      }));
    }
    setGameState(prev => ({ ...prev, hintsRemaining: options.hints }));
  };

  useEffect(() => {
    if (!options.blank && !gameState.gameInProgress) initNewGame();
  }, [gameState.gameInProgress, initNewGame, options.blank]);

  const state = {
    ...gameState,
    startingValueIndexes,
    isSolved,
    isFilledButUnsolved
  };

  const actions = {
    setDifficulty,
    setCell,
    checkValidCell,
    getHint,
    addHints,
    clearCells,
    initNewGame,
    resetGame,
    solveGame,
    togglePaused
  };

  return [state, actions];
}

// TODO proptypes
