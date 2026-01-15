/**
 * Transition Model for Stochastic Grid-World
 * Handles state transitions with 80% intended direction, 20% random
 */

import { ACTIONS, ACTION_DIRECTIONS } from './mdpConfig.js';

export const TRANSITION_PROBABILITY = {
  INTENDED: 0.8,
  RANDOM: 0.2
};

// Get all possible actions
export function getAllActions() {
  return Object.values(ACTIONS);
}

// Get possible next states and their probabilities for a given state and action
export function getTransitionProbabilities(row, col, action, grid) {
  const transitions = [];
  const intendedDirection = ACTION_DIRECTIONS[action];
  
  // Intended direction (80% probability)
  const intendedRow = row + intendedDirection.row;
  const intendedCol = col + intendedDirection.col;
  
  if (isValidMove(intendedRow, intendedCol, grid)) {
    transitions.push({
      row: intendedRow,
      col: intendedCol,
      probability: TRANSITION_PROBABILITY.INTENDED
    });
  } else {
    // If hitting wall/obstacle, stay in same position
    transitions.push({
      row: row,
      col: col,
      probability: TRANSITION_PROBABILITY.INTENDED
    });
  }
  
  // Random directions (20% total, split among 3 other directions)
  const randomActions = getAllActions().filter(a => a !== action);
  const randomProb = TRANSITION_PROBABILITY.RANDOM / randomActions.length;
  
  for (const randomAction of randomActions) {
    const randomDirection = ACTION_DIRECTIONS[randomAction];
    const randomRow = row + randomDirection.row;
    const randomCol = col + randomDirection.col;
    
    if (isValidMove(randomRow, randomCol, grid)) {
      transitions.push({
        row: randomRow,
        col: randomCol,
        probability: randomProb
      });
    } else {
      // If hitting wall/obstacle, stay in same position
      transitions.push({
        row: row,
        col: col,
        probability: randomProb
      });
    }
  }
  
  return transitions;
}

// Check if a move is valid
function isValidMove(row, col, grid) {
  return (
    row >= 0 && 
    row < grid.length && 
    col >= 0 && 
    col < grid[0].length && 
    grid[row][col] !== 1 // Not an obstacle
  );
}

// Get the expected value for a state-action pair
export function getExpectedValue(row, col, action, values, grid, discount) {
  const transitions = getTransitionProbabilities(row, col, action, grid);
  let expectedValue = 0;
  
  for (const transition of transitions) {
    const nextValue = values[transition.row][transition.col];
    expectedValue += transition.probability * nextValue;
  }
  
  return expectedValue;
}
