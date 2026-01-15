import React from 'react';

const Controls = ({ 
  algorithm, 
  onAlgorithmChange, 
  discount, 
  onDiscountChange, 
  onRun, 
  onStep, 
  onReset, 
  isRunning, 
  isConverged,
  showValues,
  onShowValuesChange,
  showPolicy,
  onShowPolicyChange
}) => {
  return (
    <div 
      style={{
        padding: '24px',
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderRadius: '20px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        marginBottom: '20px'
      }}
    >
      {/* Algorithm Selection */}
      <div style={{ marginBottom: '24px' }}>
        <h3 style={{ 
          margin: '0 0 16px 0', 
          color: '#1a202c',
          fontSize: '1.1rem',
          fontWeight: '600',
          letterSpacing: '-0.01em'
        }}>Algorithm</h3>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={() => onAlgorithmChange('value')}
            style={{
              padding: '12px 20px',
              border: 'none',
              background: algorithm === 'value' 
                ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                : 'rgba(255, 255, 255, 0.8)',
              color: algorithm === 'value' ? 'white' : '#4a5568',
              borderRadius: '12px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '0.9rem',
              transition: 'all 0.3s ease',
              boxShadow: algorithm === 'value' 
                ? '0 4px 15px rgba(102, 126, 234, 0.4)'
                : '0 2px 8px rgba(0, 0, 0, 0.05)',
              transform: algorithm === 'value' ? 'translateY(-1px)' : 'translateY(0)'
            }}
          >
            Value Iteration
          </button>
          <button
            onClick={() => onAlgorithmChange('policy')}
            style={{
              padding: '12px 20px',
              border: 'none',
              background: algorithm === 'policy' 
                ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                : 'rgba(255, 255, 255, 0.8)',
              color: algorithm === 'policy' ? 'white' : '#4a5568',
              borderRadius: '12px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '0.9rem',
              transition: 'all 0.3s ease',
              boxShadow: algorithm === 'policy' 
                ? '0 4px 15px rgba(102, 126, 234, 0.4)'
                : '0 2px 8px rgba(0, 0, 0, 0.05)',
              transform: algorithm === 'policy' ? 'translateY(-1px)' : 'translateY(0)'
            }}
          >
            Policy Iteration
          </button>
        </div>
      </div>

      {/* Discount Factor */}
      <div style={{ marginBottom: '24px' }}>
        <h3 style={{ 
          margin: '0 0 16px 0', 
          color: '#1a202c',
          fontSize: '1.1rem',
          fontWeight: '600',
          letterSpacing: '-0.01em'
        }}>
          Discount Factor (γ): {discount.toFixed(2)}
        </h3>
        <div style={{ position: 'relative' }}>
          <input
            type="range"
            min="0.1"
            max="0.99"
            step="0.01"
            value={discount}
            onChange={(e) => onDiscountChange(parseFloat(e.target.value))}
            style={{
              width: '100%',
              height: '8px',
              borderRadius: '4px',
              background: 'linear-gradient(to right, #e2e8f0 0%, #667eea 100%)',
              outline: 'none',
              WebkitAppearance: 'none',
              cursor: 'pointer'
            }}
          />
          <style dangerouslySetInnerHTML={{
            __html: `
              input[type="range"]::-webkit-slider-thumb {
                appearance: none;
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                cursor: pointer;
                box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
                transition: all 0.3s ease;
              }
              input[type="range"]::-webkit-slider-thumb:hover {
                transform: scale(1.1);
                box-shadow: 0 4px 12px rgba(102, 126, 234, 0.5);
              }
              input[type="range"]::-moz-range-thumb {
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                cursor: pointer;
                box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
                transition: all 0.3s ease;
                border: none;
              }
            `
          }} />
        </div>
      </div>

      {/* Display Options */}
      <div style={{ marginBottom: '24px' }}>
        <h3 style={{ 
          margin: '0 0 16px 0', 
          color: '#1a202c',
          fontSize: '1.1rem',
          fontWeight: '600',
          letterSpacing: '-0.01em'
        }}>Display Options</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <label style={{ 
            display: 'flex', 
            alignItems: 'center', 
            cursor: 'pointer',
            padding: '12px 16px',
            background: 'rgba(255, 255, 255, 0.6)',
            borderRadius: '10px',
            transition: 'all 0.3s ease',
            border: showValues ? '2px solid rgba(102, 126, 234, 0.3)' : '2px solid transparent'
          }}>
            <input
              type="checkbox"
              checked={showValues}
              onChange={(e) => onShowValuesChange(e.target.checked)}
              style={{ 
                marginRight: '12px',
                width: '18px',
                height: '18px',
                cursor: 'pointer'
              }}
            />
            <span style={{ 
              fontSize: '0.95rem',
              fontWeight: '500',
              color: '#4a5568'
            }}>Show Values</span>
          </label>
          <label style={{ 
            display: 'flex', 
            alignItems: 'center', 
            cursor: 'pointer',
            padding: '12px 16px',
            background: 'rgba(255, 255, 255, 0.6)',
            borderRadius: '10px',
            transition: 'all 0.3s ease',
            border: showPolicy ? '2px solid rgba(102, 126, 234, 0.3)' : '2px solid transparent'
          }}>
            <input
              type="checkbox"
              checked={showPolicy}
              onChange={(e) => onShowPolicyChange(e.target.checked)}
              style={{ 
                marginRight: '12px',
                width: '18px',
                height: '18px',
                cursor: 'pointer'
              }}
            />
            <span style={{ 
              fontSize: '0.95rem',
              fontWeight: '500',
              color: '#4a5568'
            }}>Show Policy</span>
          </label>
        </div>
      </div>

      {/* Control Buttons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <button
          onClick={onRun}
          disabled={isRunning || isConverged}
          style={{
            padding: '14px 24px',
            border: 'none',
            background: isRunning || isConverged 
              ? 'rgba(203, 213, 224, 0.8)' 
              : 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)',
            color: isRunning || isConverged ? '#a0aec0' : 'white',
            borderRadius: '12px',
            cursor: isRunning || isConverged ? 'not-allowed' : 'pointer',
            fontWeight: '600',
            fontSize: '0.95rem',
            transition: 'all 0.3s ease',
            boxShadow: isRunning || isConverged 
              ? 'none' 
              : '0 4px 15px rgba(72, 187, 120, 0.3)',
            transform: isRunning || isConverged ? 'none' : 'translateY(-1px)'
          }}
        >
          {isRunning ? 'Running...' : isConverged ? 'Converged' : 'Run'}
        </button>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={onStep}
            disabled={isRunning || isConverged}
            style={{
              flex: 1,
              padding: '14px 20px',
              border: 'none',
              background: isRunning || isConverged 
                ? 'rgba(203, 213, 224, 0.8)' 
                : 'linear-gradient(135deg, #4299e1 0%, #3182ce 100%)',
              color: isRunning || isConverged ? '#a0aec0' : 'white',
              borderRadius: '12px',
              cursor: isRunning || isConverged ? 'not-allowed' : 'pointer',
              fontWeight: '600',
              fontSize: '0.95rem',
              transition: 'all 0.3s ease',
              boxShadow: isRunning || isConverged 
                ? 'none' 
                : '0 4px 15px rgba(66, 153, 225, 0.3)',
              transform: isRunning || isConverged ? 'none' : 'translateY(-1px)'
            }}
          >
            Step
          </button>
          <button
            onClick={onReset}
            style={{
              flex: 1,
              padding: '14px 20px',
              border: 'none',
              background: 'linear-gradient(135deg, #f56565 0%, #e53e3e 100%)',
              color: 'white',
              borderRadius: '12px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '0.95rem',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(245, 101, 101, 0.3)',
              transform: 'translateY(-1px)'
            }}
          >
            Reset
          </button>
        </div>
      </div>

      {/* Status */}
      {isConverged && (
        <div style={{
          marginTop: '20px',
          padding: '16px',
          background: 'linear-gradient(135deg, rgba(72, 187, 120, 0.1) 0%, rgba(56, 161, 105, 0.1) 100%)',
          border: '2px solid rgba(72, 187, 120, 0.3)',
          borderRadius: '12px',
          color: '#22543d',
          fontWeight: '600',
          fontSize: '0.95rem',
          textAlign: 'center',
          backdropFilter: 'blur(10px)'
        }}>
          ✓ Algorithm Converged Successfully!
        </div>
      )}
    </div>
  );
};

export default Controls;