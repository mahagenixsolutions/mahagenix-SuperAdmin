import React from 'react';
import type { DashboardStat } from '../../../mock/dashboards';
import { KPICard } from '../../../components/erp/KPICard';

interface Props {
  stats: DashboardStat[];
}

export default function DashboardStatsGrid({ stats }: Props) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px',
      }}
    >
      {stats.map((stat) => (
        <KPICard
          key={stat.label}
          title={stat.label}
          value={stat.value}
          icon={stat.icon}
          tone={stat.color}
          trend={stat.change ? { value: stat.change, isPositive: stat.changeDir === 'up' } : undefined}
        />
      ))}
    </div>
  );
}

