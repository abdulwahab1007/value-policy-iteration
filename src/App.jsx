import { useState, useEffect, useCallback } from 'react';
import Grid from './components/Grid.jsx';
import Controls from './components/Controls.jsx';
import ValueHeatmap from './components/ValueHeatmap.jsx';
import PolicyArrows from './components/PolicyArrows.jsx';
import { ValueIteration } from './algorithms/valueIteration.js';
import { PolicyIteration } from './algorithms/policyIteration.js';
import { DEFAULT_GRID_LAYOUT } from './utils/mdpConfig.js';
import './styles/app.css';

function App() {
  // State management
  const [grid] = useState(DEFAULT_GRID_LAYOUT);
  const [algorithm, setAlgorithm] = useState('value');
  const [discount, setDiscount] = useState(0.9);
  const [showValues, setShowValues] = useState(true);
  const [showPolicy, setShowPolicy] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const [values, setValues] = useState([]);
  const [policy, setPolicy] = useState([]);
  const [iteration, setIteration] = useState(0);
  const [converged, setConverged] = useState(false);
  const [evaluationIterations, setEvaluationIterations] = useState(0);
  const [currentAlgorithmInstance, setCurrentAlgorithmInstance] = useState(null);

  // Initialize algorithm instance
  const initializeAlgorithm = useCallback(() => {
    if (algorithm === 'value') {
      return new ValueIteration(grid, discount);
    } else {
      return new PolicyIteration(grid, discount);
    }
  }, [algorithm, grid, discount]);

  // Reset algorithm
  const resetAlgorithm = useCallback(() => {
    const instance = initializeAlgorithm();
    setCurrentAlgorithmInstance(instance);
    const state = instance.getState();
    setValues(state.values);
    setPolicy(state.policy);
    setIteration(state.iteration);
    setConverged(state.converged);
    setEvaluationIterations(state.evaluationIterations || 0);
    setIsRunning(false);
  }, [initializeAlgorithm]);

  // Initialize on mount and when algorithm/discount changes
  useEffect(() => {
    resetAlgorithm();
  }, [resetAlgorithm]);

  // Step function
  const handleStep = useCallback(() => {
    if (!currentAlgorithmInstance || converged) return;

    const stillRunning = currentAlgorithmInstance.step();
    const state = currentAlgorithmInstance.getState();
    
    setValues(state.values);
    setPolicy(state.policy);
    setIteration(state.iteration);
    setConverged(state.converged);
    setEvaluationIterations(state.evaluationIterations || 0);
    
    if (!stillRunning) {
      setIsRunning(false);
    }
  }, [currentAlgorithmInstance, converged]);

  // Run function (auto-run until convergence)
  const handleRun = useCallback(() => {
    if (!currentAlgorithmInstance || converged) return;

    setIsRunning(true);
    
    const runStep = () => {
      if (!currentAlgorithmInstance) return;
      
      const stillRunning = currentAlgorithmInstance.step();
      const state = currentAlgorithmInstance.getState();
      
      setValues(state.values);
      setPolicy(state.policy);
      setIteration(state.iteration);
      setConverged(state.converged);
      setEvaluationIterations(state.evaluationIterations || 0);
      
      if (stillRunning) {
        setTimeout(runStep, 100); // 100ms delay between iterations for visualization
      } else {
        setIsRunning(false);
      }
    };
    
    runStep();
  }, [currentAlgorithmInstance, converged]);

  // Algorithm change handler
  const handleAlgorithmChange = (newAlgorithm) => {
    setAlgorithm(newAlgorithm);
  };

  // Discount change handler
  const handleDiscountChange = (newDiscount) => {
    setDiscount(newDiscount);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Grid-World MDP Visualization</h1>
        <p>Value Iteration & Policy Iteration Algorithms</p>
      </header>

      <main className="app-main">
        <div className="controls-section">
          <Controls
            algorithm={algorithm}
            onAlgorithmChange={handleAlgorithmChange}
            discount={discount}
            onDiscountChange={handleDiscountChange}
            onRun={handleRun}
            onStep={handleStep}
            onReset={resetAlgorithm}
            isRunning={isRunning}
            isConverged={converged}
            showValues={showValues}
            onShowValuesChange={setShowValues}
            showPolicy={showPolicy}
            onShowPolicyChange={setShowPolicy}
          />
        </div>

        <div className="grid-section">
          <Grid
            grid={grid}
            values={values}
            policy={policy}
            showValues={showValues}
            showPolicy={showPolicy}
          />
        </div>

        <div className="visualization-section">
          <div className="stats">
            <h3>Algorithm Statistics</h3>
            <div className="stat-item">
              <strong>Algorithm:</strong> {algorithm === 'value' ? 'Value Iteration' : 'Policy Iteration'}
            </div>
            <div className="stat-item">
              <strong>Iteration:</strong> {iteration}
            </div>
            {algorithm === 'policy' && (
              <div className="stat-item">
                <strong>Evaluation Iterations:</strong> {evaluationIterations}
              </div>
            )}
            <div className="stat-item">
              <strong>Discount Factor (γ):</strong> {discount.toFixed(2)}
            </div>
            <div className="stat-item">
              <strong>Status:</strong> {converged ? '✓ Converged' : isRunning ? 'Running...' : 'Ready'}
            </div>
          </div>

          <div className="visualizations">
            <ValueHeatmap values={values} grid={grid} />
            <PolicyArrows policy={policy} grid={grid} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App
