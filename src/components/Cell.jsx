import React from 'react';
import { CELL_TYPES } from '../utils/mdpConfig.js';

const Cell = ({ 
  row, 
  col, 
  cellType, 
  value, 
  policy, 
  showValues, 
  showPolicy,
  maxValue,
  minValue 
}) => {
  // Get cell styling based on type
  const getCellStyle = () => {
    const baseStyle = {
      width: '70px',
      height: '70px',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      fontSize: '12px',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      borderRadius: '12px',
      backdropFilter: 'blur(10px)'
    };

    switch (cellType) {
      case CELL_TYPES.OBSTACLE:
        return {
          ...baseStyle,
          background: 'linear-gradient(135deg, #4a5568 0%, #2d3748 100%)',
          color: 'white',
          cursor: 'not-allowed',
          boxShadow: '0 4px 15px rgba(74, 85, 104, 0.3)'
        };
      case CELL_TYPES.GOAL:
        return {
          ...baseStyle,
          background: 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)',
          color: 'white',
          boxShadow: '0 4px 15px rgba(72, 187, 120, 0.4)'
        };
      case CELL_TYPES.NEGATIVE_TERMINAL:
        return {
          ...baseStyle,
          background: 'linear-gradient(135deg, #f56565 0%, #e53e3e 100%)',
          color: 'white',
          boxShadow: '0 4px 15px rgba(245, 101, 101, 0.4)'
        };
      default:
        // Normal cell - show value heatmap with modern gradient
        const normalizedValue = maxValue !== minValue 
          ? (value - minValue) / (maxValue - minValue)
          : 0;
        const intensity = Math.max(0.1, normalizedValue);
        
        // Modern gradient based on value intensity
        const startColor = intensity > 0.5 ? 102 : 200; // Purple to light blue
        const endColor = intensity > 0.5 ? 126 : 220;
        const midColor = Math.floor(200 + (55 * intensity));
        
        return {
          ...baseStyle,
          background: `linear-gradient(135deg, rgba(${startColor}, ${midColor}, ${endColor}, ${0.3 + intensity * 0.7}) 0%, rgba(${startColor}, ${midColor}, ${endColor}, ${0.5 + intensity * 0.5}) 100%)`,
          color: intensity > 0.5 ? 'white' : '#2d3748',
          backdropFilter: 'blur(10px)',
          boxShadow: `0 4px 15px rgba(${startColor}, ${midColor}, ${endColor}, ${0.2 + intensity * 0.3})`
        };
    }
  };

  // Get policy arrow
  const getPolicyArrow = () => {
    if (!policy || cellType !== CELL_TYPES.NORMAL) return null;

    const arrows = {
      up: '↑',
      down: '↓',
      left: '←',
      right: '→'
    };

    return (
      <div 
        style={{
          fontSize: '28px',
          fontWeight: '700',
          textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
          position: 'absolute',
          top: '8px',
          right: '8px',
          background: 'rgba(255, 255, 255, 0.9)',
          borderRadius: '50%',
          width: '32px',
          height: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
        }}
      >
        {arrows[policy]}
      </div>
    );
  };

  // Get cell label
  const getCellLabel = () => {
    switch (cellType) {
      case CELL_TYPES.OBSTACLE:
        return (
          <div style={{
            fontSize: '32px',
            filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))'
          }}>⬛</div>
        );
      case CELL_TYPES.GOAL:
        return (
          <div style={{
            fontSize: '32px',
            filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))'
          }}>🎯</div>
        );
      case CELL_TYPES.NEGATIVE_TERMINAL:
        return (
          <div style={{
            fontSize: '32px',
            filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))'
          }}>☠️</div>
        );
      default:
        return null;
    }
  };

  const style = getCellStyle();

  return (
    <div style={style}>
      {getCellLabel()}
      {showPolicy && getPolicyArrow()}
      {showValues && cellType === CELL_TYPES.NORMAL && (
        <div style={{ 
          fontSize: '11px', 
          marginTop: '8px',
          fontWeight: '600',
          background: 'rgba(255, 255, 255, 0.9)',
          padding: '4px 8px',
          borderRadius: '6px',
          backdropFilter: 'blur(10px)'
        }}>
          {value.toFixed(2)}
        </div>
      )}
      {showValues && (cellType === CELL_TYPES.GOAL || cellType === CELL_TYPES.NEGATIVE_TERMINAL) && (
        <div style={{ 
          fontSize: '11px', 
          marginTop: '8px',
          fontWeight: '600',
          background: 'rgba(255, 255, 255, 0.9)',
          padding: '4px 8px',
          borderRadius: '6px',
          backdropFilter: 'blur(10px)'
        }}>
          {value.toFixed(1)}
        </div>
      )}
    </div>
  );
};

export default Cell;