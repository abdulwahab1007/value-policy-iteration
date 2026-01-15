/**
 * Value Iteration Algorithm
 * Implements the Bellman optimality equation iteratively
 */

import { getCellType, isTerminal, getReward, GRID_SIZE } from '../utils/mdpConfig.js';
import { getAllActions, getExpectedValue } from '../utils/transitionModel.js';

export class ValueIteration {
  constructor(grid, discount = 0.9, theta = 0.001) {
    this.grid = grid;
    this.discount = discount;
    this.theta = theta; // Convergence threshold
    this.values = this.initializeValues();
    this.policy = this.initializePolicy();
    this.iteration = 0;
    this.converged = false;
  }

  // Initialize value function to zeros
  initializeValues() {
    const values = [];
    for (let i = 0; i < GRID_SIZE; i++) {
      values[i] = new Array(GRID_SIZE).fill(0);
    }
    return values;
  }

  // Initialize random policy
  initializePolicy() {
    const policy = [];
    const actions = getAllActions();
    
    for (let i = 0; i < GRID_SIZE; i++) {
      policy[i] = [];
      for (let j = 0; j < GRID_SIZE; j++) {
        if (isTerminal(getCellType(this.grid[i][j]))) {
          policy[i][j] = null; // No action needed for terminal states
        } else {
          policy[i][j] = actions[Math.floor(Math.random() * actions.length)];
        }
      }
    }
    return policy;
  }

  // Perform one iteration of value iteration
  step() {
    if (this.converged) return false;

    const newValues = this.initializeValues();
    let delta = 0;

    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        const cellType = getCellType(this.grid[i][j]);
        
        if (isTerminal(cellType)) {
          // Terminal states have their reward as value
          newValues[i][j] = getReward(cellType);
        } else {
          // Bellman optimality equation
          const reward = getReward(cellType);
          let maxValue = -Infinity;
          let bestAction = null;

          for (const action of getAllActions()) {
            const expectedValue = getExpectedValue(i, j, action, this.values, this.grid, this.discount);
            const value = reward + this.discount * expectedValue;
            
            if (value > maxValue) {
              maxValue = value;
              bestAction = action;
            }
          }

          newValues[i][j] = maxValue;
          this.policy[i][j] = bestAction;
        }

        delta = Math.max(delta, Math.abs(newValues[i][j] - this.values[i][j]));
      }
    }

    this.values = newValues;
    this.iteration++;

    // Check for convergence
    if (delta < this.theta) {
      this.converged = true;
    }

    return !this.converged;
  }

  // Reset the algorithm
  reset() {
    this.values = this.initializeValues();
    this.policy = this.initializePolicy();
    this.iteration = 0;
    this.converged = false;
  }

  // Get current state
  getState() {
    return {
      values: this.values.map(row => [...row]),
      policy: this.policy.map(row => [...row]),
      iteration: this.iteration,
      converged: this.converged
    };
  }

  // Update discount factor
  updateDiscount(newDiscount) {
    this.discount = newDiscount;
    this.reset();
  }
}
