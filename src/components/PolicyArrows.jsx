import React from 'react';
import { GRID_SIZE, getCellType } from '../utils/mdpConfig.js';

const PolicyArrows = ({ policy, grid }) => {
  // Get arrow symbol for action
  const getArrowSymbol = (action) => {
    const arrows = {
      up: '↑',
      down: '↓',
      left: '←',
      right: '→'
    };
    return arrows[action] || '';
  };

  // Get arrow color based on action
  const getArrowColor = (action) => {
    const colors = {
      up: '#3182ce',
      down: '#3182ce',
      left: '#3182ce',
      right: '#3182ce'
    };
    return colors[action] || '#718096';
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
      }}>Policy Visualization</h3>
      
      {/* Legend */}
      <div style={{ 
        marginBottom: '20px', 
        fontSize: '0.9rem', 
        color: '#4a5568',
        padding: '12px 16px',
        background: 'rgba(255, 255, 255, 0.6)',
        borderRadius: '10px',
        fontWeight: '500'
      }}>
        <div>↑ = Up, ↓ = Down, ← = Left, → = Right</div>
      </div>

      {/* Policy grid */}
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${GRID_SIZE}, 50px)`,
          gap: '8px',
          background: 'rgba(255, 255, 255, 0.3)',
          padding: '16px',
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(10px)'
        }}
      >
        {(policy && Array.isArray(policy) ? policy : Array(GRID_SIZE).fill(null)).map((row, rowIndex) =>
          (row && Array.isArray(row) ? row : Array(GRID_SIZE).fill(null)).map((action, colIndex) => {
            const cellType = getCellType(grid[rowIndex][colIndex]);
            
            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                style={{
                  width: '50px',
                  height: '50px',
                  backgroundColor: cellType === 'obstacle' ? 'linear-gradient(135deg, #4a5568 0%, #2d3748 100%)' : 
                                 cellType === 'goal' ? 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)' : 
                                 cellType === 'negative_terminal' ? 'linear-gradient(135deg, #f56565 0%, #e53e3e 100%)' : 'rgba(255, 255, 255, 0.9)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '28px',
                  color: cellType === 'normal' ? getArrowColor(action) : 'white',
                  fontWeight: '700',
                  borderRadius: '12px',
                  border: cellType === 'normal' ? '2px solid rgba(102, 126, 234, 0.2)' : 'none',
                  position: 'relative',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                {cellType === 'normal' && action ? (
                  <span style={{ 
                    textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
                    background: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: '50%',
                    width: '36px',
                    height: '36px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
                  }}>
                    {getArrowSymbol(action)}
                  </span>
                ) : (
                  <span style={{ 
                    fontSize: '24px',
                    filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))'
                  }}>
                    {cellType === 'obstacle' ? '⬛' : 
                     cellType === 'goal' ? '🎯' : '☠️'}
                  </span>
                )}
                
                {/* Position indicator */}
                <div style={{
                  position: 'absolute',
                  bottom: '4px',
                  right: '6px',
                  fontSize: '8px',
                  color: cellType === 'normal' ? 'rgba(0, 0, 0, 0.4)' : 'rgba(255,255,255,0.7)',
                  fontWeight: '500',
                  background: 'rgba(255, 255, 255, 0.8)',
                  padding: '2px 4px',
                  borderRadius: '4px'
                }}>
                  {rowIndex},{colIndex}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Policy statistics */}
      <div style={{ 
        marginTop: '20px', 
        fontSize: '0.9rem', 
        color: '#4a5568',
        padding: '16px',
        background: 'rgba(255, 255, 255, 0.6)',
        borderRadius: '10px',
        fontWeight: '500'
      }}>
        <div style={{ marginBottom: '8px', fontWeight: '600', color: '#1a202c' }}>Actions:</div>
        {(() => {
          const actionCounts = { up: 0, down: 0, left: 0, right: 0 };
          let totalActions = 0;
          
          for (let i = 0; i < GRID_SIZE; i++) {
            for (let j = 0; j < GRID_SIZE; j++) {
              const cellType = getCellType(grid[i][j]);
              if (cellType === 'normal' && policy && policy[i] && policy[i][j]) {
                actionCounts[policy[i][j]]++;
                totalActions++;
              }
            }
          }

          return Object.entries(actionCounts).map(([action, count]) => (
            <div key={action} style={{ 
              marginBottom: '4px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span style={{ fontWeight: '600' }}>{getArrowSymbol(action)} {action}:</span>
              <span style={{ 
                background: 'rgba(102, 126, 234, 0.1)',
                padding: '2px 8px',
                borderRadius: '6px',
                fontWeight: '600',
                color: '#667eea'
              }}>
                {count} ({totalActions > 0 ? ((count/totalActions)*100).toFixed(1) : 0}%)
              </span>
            </div>
          ));
        })()}
      </div>
    </div>
  );
};

export default PolicyArrows;
