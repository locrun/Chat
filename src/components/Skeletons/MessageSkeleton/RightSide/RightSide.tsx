import React from 'react';

export const RightSide = () => {
  return (
    <div
      style={{
        padding: '0 16px 0 16px',
        marginTop: '55px'
      }}
    >
      <div>
        <p className="placeholder-glow mb-2 d-flex justify-content-end">
          <span className="placeholder col-6"></span>
        </p>
        <p className="placeholder-wave mb-2 d-flex justify-content-end">
          <span className="placeholder w-75"></span>
        </p>
        <p className="placeholder-glow mb-2 d-flex justify-content-end">
          <span className="placeholder" style={{ width: '55%' }}></span>
        </p>
      </div>
    </div>
  );
};
