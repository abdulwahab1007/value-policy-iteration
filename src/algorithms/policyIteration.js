/**
 * Policy Iteration Algorithm
 * Alternates between policy evaluation and policy improvement
 */

import { getCellType, isTerminal, getReward, GRID_SIZE } from '../utils/mdpConfig.js';
import { getAllActions, getExpectedValue } from '../utils/transitionModel.js';

export class PolicyIteration {
  constructor(grid, discount = 0.9, theta = 0.001) {
    this.grid = grid;
    this.discount = discount;
    this.theta = theta; // Convergence threshold for policy evaluation
    this.values = this.initializeValues();
    this.policy = this.initializePolicy();
    this.iteration = 0;
    this.converged = false;
    this.evaluationIterations = 0;
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

  // Policy Evaluation: Estimate value function for current policy
  policyEvaluation() {
    while (true) {
      const newValues = this.initializeValues();
      let delta = 0;

      for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
          const cellType = getCellType(this.grid[i][j]);
          const action = this.policy[i][j];

          if (isTerminal(cellType)) {
            // Terminal states have their reward as value
            newValues[i][j] = getReward(cellType);
          } else if (action) {
            // Bellman expectation equation for current policy
            const reward = getReward(cellType);
            const expectedValue = getExpectedValue(i, j, action, this.values, this.grid, this.discount);
            newValues[i][j] = reward + this.discount * expectedValue;
          } else {
            newValues[i][j] = 0;
          }

          delta = Math.max(delta, Math.abs(newValues[i][j] - this.values[i][j]));
        }
      }

      this.values = newValues;
      this.evaluationIterations++;

      if (delta < this.theta) {
        break;
      }
    }
  }

  // Policy Improvement: Update policy based on current value function
  policyImprovement() {
    let policyStable = true;

    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        const cellType = getCellType(this.grid[i][j]);
        
        if (isTerminal(cellType)) {
          continue; // Skip terminal states
        }

        const oldAction = this.policy[i][j];
        const reward = getReward(cellType);
        let bestAction = oldAction;
        let bestValue = -Infinity;

        // Find the best action according to current value function
        for (const action of getAllActions()) {
          const expectedValue = getExpectedValue(i, j, action, this.values, this.grid, this.discount);
          const value = reward + this.discount * expectedValue;
          
          if (value > bestValue) {
            bestValue = value;
            bestAction = action;
          }
        }

        this.policy[i][j] = bestAction;

        if (oldAction !== bestAction) {
          policyStable = false;
        }
      }
    }

    return policyStable;
  }

  // Perform one iteration of policy iteration
  step() {
    if (this.converged) return false;

    this.policyEvaluation();
    const policyStable = this.policyImprovement();
    this.iteration++;

    if (policyStable) {
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
    this.evaluationIterations = 0;
  }

  // Get current state
  getState() {
    return {
      values: this.values.map(row => [...row]),
      policy: this.policy.map(row => [...row]),
      iteration: this.iteration,
      converged: this.converged,
      evaluationIterations: this.evaluationIterations
    };
  }

  // Update discount factor
  updateDiscount(newDiscount) {
    this.discount = newDiscount;
    this.reset();
  }
}
