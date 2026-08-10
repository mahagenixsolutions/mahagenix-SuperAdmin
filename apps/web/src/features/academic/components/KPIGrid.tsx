import React from 'react';

interface KPIGridProps {
  children: React.ReactNode;
  columnsDesktop?: number;
}

export const KPIGrid: React.FC<KPIGridProps> = ({ children, columnsDesktop = 4 }) => {
  return (
    <div
      className="academic-kpi-grid"
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(auto-fit, minmax(220px, 1fr))`,
        gap: '24px',
        width: '100%',
        boxSizing: 'border-box'
      }}
    >
      {children}
    </div>
  );
};
