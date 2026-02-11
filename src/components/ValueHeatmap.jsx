import React from 'react';
import { GRID_SIZE, getCellType } from '../utils/mdpConfig.js';

const ValueHeatmap = ({ values, grid }) => {
  // Calculate min and max values for normalization
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

  // Get color for value
  const getValueColor = (value) => {
    const normalizedValue = maxValue !== minValue 
      ? (value - minValue) / (maxValue - minValue)
      : 0;
    const intensity = Math.max(0.1, normalizedValue);
    const blue = Math.floor(255 * (1 - intensity));
    const green = Math.floor(200 * intensity);
    
    return `rgb(200, ${green}, ${blue})`;
  };

  return (
    <div style={{ 
      padding: '24px', 
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      borderRadius: '20px',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
      border: '1px solid rgba(255, 255, 255, 0.2)'
    }}>
      <h3 style={{ 
        margin: '0 0 20px 0', 
        color: '#1a202c',
        fontSize: '1.25rem',
        fontWeight: '600',
        letterSpacing: '-0.01em'
      }}>Value Function Heatmap</h3>
      
      {/* Color scale legend */}
      <div style={{ 
        marginBottom: '20px', 
        display: 'flex', 
        alignItems: 'center', 
        gap: '12px',
        padding: '12px',
        background: 'rgba(255, 255, 255, 0.6)',
        borderRadius: '10px'
      }}>
        <span style={{ 
          fontSize: '0.85rem', 
          color: '#4a5568',
          fontWeight: '500'
        }}>Low</span>
        <div style={{ 
          display: 'flex', 
          width: '200px', 
          height: '24px', 
          borderRadius: '8px',
          overflow: 'hidden',
          border: '1px solid rgba(0, 0, 0, 0.1)',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
        }}>
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                backgroundColor: getValueColor(minValue + (maxValue - minValue) * (i / 9))
              }}
            />
          ))}
        </div>
        <span style={{ 
          fontSize: '0.85rem', 
          color: '#4a5568',
          fontWeight: '500'
        }}>High</span>
      </div>

      {/* Heatmap grid */}
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${GRID_SIZE}, 40px)`,
          gap: '8px',
          background: 'rgba(255, 255, 255, 0.3)',
          padding: '16px',
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(10px)'
        }}
      >
        {(values && Array.isArray(values) ? values : Array(GRID_SIZE).fill(null)).map((row, rowIndex) =>
          (row && Array.isArray(row) ? row : Array(GRID_SIZE).fill(0)).map((value, colIndex) => {
            const cellType = getCellType(grid[rowIndex][colIndex]);
            
            if (cellType !== 'normal') {
              return (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  style={{
                    width: '50px',
                    height: '50px',
                    backgroundColor: cellType === 'obstacle' ? 'linear-gradient(135deg, #4a5568 0%, #2d3748 100%)' : 
                                   cellType === 'goal' ? 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)' : 'linear-gradient(135deg, #f56565 0%, #e53e3e 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '18px',
                    color: 'white',
                    fontWeight: '600',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
                  }}
                >
                  {cellType === 'obstacle' ? '⬛' : 
                   cellType === 'goal' ? '🎯' : '☠️'}
                </div>
              );
            }

            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                style={{
                  width: '65px',
                  height: '65px',
                  backgroundColor: getValueColor(value),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '10px',
                  color: value > (minValue + maxValue) / 2 ? 'white' : '#2d3748',
                  fontWeight: '600',
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.3)'
                }}
              >
                <span style={{
                  background: 'rgba(255, 255, 255, 0.9)',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  fontSize: '9px',
                  fontWeight: '600'
                }}>
                  {value.toFixed(1)}
                </span>
              </div>
            );
          })
        )}
      </div>

      {/* Value statistics */}
      <div style={{ 
        marginTop: '20px', 
        fontSize: '0.9rem', 
        color: '#4a5568',
        padding: '16px',
        background: 'rgba(255, 255, 255, 0.6)',
        borderRadius: '10px',
        fontWeight: '500'
      }}>
        <div style={{ marginBottom: '4px' }}>Min: <span style={{ fontWeight: '600', color: '#1a202c' }}>{minValue.toFixed(3)}</span></div>
        <div style={{ marginBottom: '4px' }}>Max: <span style={{ fontWeight: '600', color: '#1a202c' }}>{maxValue.toFixed(3)}</span></div>
        <div>Range: <span style={{ fontWeight: '600', color: '#1a202c' }}>{(maxValue - minValue).toFixed(3)}</span></div>
      </div>
    </div>
  );
};

export default ValueHeatmap;