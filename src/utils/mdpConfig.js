/**
 * MDP Configuration for Grid-World Environment
 * Defines the grid layout, rewards, and basic parameters
 */

export const GRID_SIZE = 4; // 4x4 grid

export const CELL_TYPES = {
  NORMAL: 'normal',
  OBSTACLE: 'obstacle',
  GOAL: 'goal',
  NEGATIVE_TERMINAL: 'negative_terminal'
};

export const REWARDS = {
  GOAL: 10,
  NEGATIVE_TERMINAL: -10,
  STEP: -0.1
};

export const ACTIONS = {
  UP: 'up',
  DOWN: 'down',
  LEFT: 'left',
  RIGHT: 'right'
};

export const ACTION_DIRECTIONS = {
  [ACTIONS.UP]: { row: -1, col: 0 },
  [ACTIONS.DOWN]: { row: 1, col: 0 },
  [ACTIONS.LEFT]: { row: 0, col: -1 },
  [ACTIONS.RIGHT]: { row: 0, col: 1 }
};

// Default grid layout
// 0 = normal, 1 = obstacle, 2 = goal, 3 = negative terminal
export const DEFAULT_GRID_LAYOUT = [
  [0, 0, 0, 0],
  [0, 1, 0, 2],
  [0, 0, 0, 0],
  [3, 0, 0, 0]
];

// Convert grid layout to cell types
export function getCellType(gridValue) {
  switch (gridValue) {
    case 1: return CELL_TYPES.OBSTACLE;
    case 2: return CELL_TYPES.GOAL;
    case 3: return CELL_TYPES.NEGATIVE_TERMINAL;
    default: return CELL_TYPES.NORMAL;
  }
}

// Get reward for a cell type
export function getReward(cellType) {
  switch (cellType) {
    case CELL_TYPES.GOAL: return REWARDS.GOAL;
    case CELL_TYPES.NEGATIVE_TERMINAL: return REWARDS.NEGATIVE_TERMINAL;
    default: return REWARDS.STEP;
  }
}

// Check if a cell is terminal (goal or negative terminal)
export function isTerminal(cellType) {
  return cellType === CELL_TYPES.GOAL || cellType === CELL_TYPES.NEGATIVE_TERMINAL;
}

// Check if a position is valid (within grid bounds and not an obstacle)
export function isValidPosition(row, col, grid) {
  return (
    row >= 0 && 
    row < GRID_SIZE && 
    col >= 0 && 
    col < GRID_SIZE && 
    getCellType(grid[row][col]) !== CELL_TYPES.OBSTACLE
  );
}
