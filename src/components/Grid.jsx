import React from 'react';
import Cell from './Cell.jsx';
import { GRID_SIZE, getCellType } from '../utils/mdpConfig.js';

const Grid = ({ 
  grid, 
  values, 
  policy, 
  showValues, 
  showPolicy 
}) => {
  // Calculate min and max values for heatmap normalization
  const allValues = []; 
  for (let i = 0; i < GRID_SIZE; i++) {
    for (let j = 0; j < GRID_SIZE; j++) {
      const cellType = getCellType(grid[i][j]);
      if (cellType === 'normal' && values && values[i] && values[i][j] !== undefined) {
        allValues.push(values[i][j]);
      }
    }
  }

  const minValue = allValues.length > 0 ? Math.min(...allValues) : 0;
  const maxValue = allValues.length > 0 ? Math.max(...allValues) : 1;

  return (
    <div 
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${GRID_SIZE}, 80px)`,
        gap: '12px',
        padding: '24px',
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        borderRadius: '20px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.2)'
      }}
    >
      {grid.map((row, rowIndex) =>
        row.map((cellValue, colIndex) => {
          const cellType = getCellType(cellValue);
          return (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              row={rowIndex}
              col={colIndex}
              cellType={cellType}
              value={values && values[rowIndex] ? values[rowIndex][colIndex] : 0}
              policy={policy && policy[rowIndex] ? policy[rowIndex][colIndex] : null}
              showValues={showValues}
              showPolicy={showPolicy}
              maxValue={maxValue}
              minValue={minValue}
            />
          );
        })
      )}
    </div>
  );
};

export default Grid;