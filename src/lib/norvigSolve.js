import { deserializeGridValuesString } from './common';

/*
  This code was adapted from Norvig's algorithm for solving sudoku puzzles at
  http://www.norvig.com/sudoku.html.

  I attempted to make it more explicit and hopefully more easily understood for the sake
  of those who have trouble wrapping their mind around complex recursion (me!). Expressive
  function and variable names obviate the need for comments and allow the code to read
  like English much of the time. The resulting verbosity may not be to everyone's taste,
  but I really like it.

  I think the data structures could be further simplified by storing possible values in
  an array and using the indexes as cell labels instead of generating A1-I9 labels.
*/

const VALUES = '123456789';
const ROWS = [...'ABCDEFGHI'];
const COLS = [...VALUES];
const CELLS = permuteItems(ROWS, COLS);
const GROUP_LIST = buildGroupList();
const GROUPS = buildGroups();
const PEERS = buildPeers();

const opCounts = {
  assigns: 0,
  eliminations: 0,
  searches: 0
};

const isKnownValue = possibleValues => possibleValues.length === 1;

const failedRecursively = result => result === false;

const removeValue = (valuesString, value) => valuesString.replace(value, '');

const convertToValuesArray = valuesMap => CELLS.map(c => parseInt(valuesMap[c], 10));

function resetOpCounts() {
  opCounts.assigns = 0;
  opCounts.eliminations = 0;
  opCounts.searches = 0;
}

function permuteItems(A, B) {
  var products = [];
  for (const a of A) for (const b of B) products.push(a + b);
  return products;
}

function buildGroupList() {
  const list = [];
  for (const c of COLS) list.push(permuteItems(ROWS, c));
  for (const r of ROWS) list.push(permuteItems(r, COLS));
  const rRows = ['ABC', 'DEF', 'GHI'];
  const cCols = ['123', '456', '789'];
  for (const rs of rRows) for (const cs of cCols) list.push(permuteItems(rs, cs));
  return list;
}

function buildGroups() {
  return CELLS.reduce((groups, cell) => {
    groups[cell] = GROUP_LIST.filter(group => group.includes(cell));
    return groups;
  }, {});
}

function buildPeers() {
  return CELLS.reduce((peers, cell) => {
    peers[cell] = [...new Set(GROUPS[cell].flat().filter(c => c !== cell))];
    return peers;
  }, {});
}

function parseGridValues(valuesString) {
  resetOpCounts();

  const parsed = deserializeGridValuesString(valuesString);

  if (parsed.length !== 81) {
    throw new Error('Invalid grid values string');
  }

  return CELLS.reduce((values, cell, index) => {
    values[cell] = parsed[index];
    return values;
  }, {});
}

function calcPossibleValues(valuesString) {
  const initialKnownValues = parseGridValues(valuesString);

  const values = CELLS.reduce((object, cell) => {
    object[cell] = VALUES;
    return object;
  }, {});

  for (const [cell, value] of Object.entries(initialKnownValues)) {
    const v = value.toString();
    // console.log(cell, v);
    if (VALUES.includes(v) && !assignValues(values, cell, v)) {
      return false;
    }
  }

  return values;
}

function assignValues(possiblesMap, cell, value) {
  // Eliminate all the other values (except d) from values[cell] and propagate
  // Return values, except return false if a contradiction is detected
  opCounts.assigns++;

  const possibles = [...removeValue(possiblesMap[cell], value)];

  const wereFailures = possibles
    .map(v => eliminateRecursively(possiblesMap, cell, v))
    .some(failedRecursively);

  return wereFailures ? false : possiblesMap;
}

function propagateSingleValueConstraint(possiblesMap, cell) {
  const possibles = possiblesMap[cell];
  const noPossibleValue = possibles.length === 0;
  const singlePossibleValue = possibles.length === 1;

  if (noPossibleValue) {
    return false;
  } else if (singlePossibleValue) {
    const wereFailures = PEERS[cell]
      .map(peer => eliminateRecursively(possiblesMap, peer, possibles))
      .some(failedRecursively);

    if (wereFailures) {
      return false;
    }
  }

  return true;
}

function propagateSingleLocationConstraint(possiblesMap, cell, value) {
  for (const group of GROUPS[cell]) {
    const places = group.filter(c => possiblesMap[c].includes(value));
    const noPossibleLocation = !places.length;
    const singlePossibleLocation = places.length === 1;

    if (noPossibleLocation) {
      return false;
    } else if (singlePossibleLocation) {
      const valuesAssignment = assignValues(possiblesMap, places[0], value);
      if (failedRecursively(valuesAssignment)) {
        return false;
      }
    }
  }

  return true;
}

function eliminateRecursively(possiblesMap, cell, value) {
  opCounts.eliminations++;

  const previouslyEliminated = !possiblesMap[cell].includes(value);
  if (previouslyEliminated) {
    return possiblesMap;
  }

  possiblesMap[cell] = removeValue(possiblesMap[cell], value);

  const constraints = [
    propagateSingleValueConstraint(possiblesMap, cell),
    propagateSingleLocationConstraint(possiblesMap, cell, value)
  ];

  const wereFailures = constraints.some(failedRecursively);
  if (wereFailures) {
    return false;
  }

  return possiblesMap;
}

function solveRecursivelyWithSearch(values) {
  opCounts.searches++;

  const failedInLastRecursiveCall = !values;
  if (failedInLastRecursiveCall) {
    return false;
  }

  const unsolvedCells = CELLS.filter(c => !isKnownValue(values[c]));

  const puzzleIsSolved = unsolvedCells.length === 0;
  if (puzzleIsSolved) {
    return values;
  }

  const getCellWithFewestPossibles = (a, b) =>
    values[a].length > values[b].length ? b : a;

  const nextCell = unsolvedCells.reduce(getCellWithFewestPossibles);
  const possibles = values[nextCell];

  for (const p of possibles) {
    const valuesAssignment = assignValues({ ...values }, nextCell, p);
    const search = solveRecursivelyWithSearch(valuesAssignment);
    const wasSuccessful = !failedRecursively(search);

    if (wasSuccessful) {
      return search;
    }
  }

  return false;
}

export function solvePuzzle(gridString, trace = false) {
  const startTime = Date.now();
  const initialValues = calcPossibleValues(gridString);
  const resultMap = solveRecursivelyWithSearch(initialValues);
  const resultArray = convertToValuesArray(resultMap);
  const elapsedTime = Date.now() - startTime;
  if (trace) {
    const secs = (elapsedTime / 1000).toFixed(3);
    console.log(
      `Took ${secs}s\n${opCounts.assigns} assignments\n${opCounts.eliminations} eliminations\n${opCounts.searches} searches`
    );
    console.log('Result', resultArray);
  }
  return resultArray;
}
