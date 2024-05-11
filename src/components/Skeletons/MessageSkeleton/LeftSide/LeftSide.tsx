import React from 'react';

export const LeftSide = () => {
  return (
    <div style={{ padding: '0 16px 0 16px', marginTop: '35px' }}>
      <p className="placeholder-glow mb-2">
        <span className="placeholder col-6"></span>
      </p>
      <p className="placeholder-wave mb-2">
        <span className="placeholder w-75"></span>
      </p>
      <p className="placeholder-glow mb-2">
        <span className="placeholder" style={{ width: '55%' }}></span>
      </p>
    </div>
  );
};
