import React from 'react';

const LoadingSpinner = ({ size = 16, className = "" }) => {
  return (
    <div
      className={`animate-spin rounded-full border-2 border-current border-t-transparent ${className}`}
      style={{
        width: size,
        height: size,
      }}
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default LoadingSpinner;