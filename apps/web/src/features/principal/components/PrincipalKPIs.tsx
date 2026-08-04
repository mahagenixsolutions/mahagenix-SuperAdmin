import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, UserCheck, Calendar, CreditCard } from 'lucide-react';
import type { PrincipalKPI } from '../services/principalDashboard.service';

interface Props {
  kpis: PrincipalKPI[];
}

export default function PrincipalKPIs({ kpis }: Props) {
  // Mockup only displays the top 4 executive KPIs
  const top4Kpis = kpis.slice(0, 4);

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
      gap: '24px',
      width: '100%',
    }}>
      {top4Kpis.map(kpi => (
        <KPICard key={kpi.id} kpi={kpi} />
      ))}
    </div>
  );
}

function KPICard({ kpi }: { kpi: PrincipalKPI }) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  // Map IDs to specific lucide-react icons and colored backgrounds matching the mockup
  const getIconConfig = (id: string) => {
    switch (id) {
      case 'total-students':
        return {
          icon: <Users size={20} />,
          bgColor: 'rgba(99, 102, 241, 0.1)',
          color: '#4F46E5',
        };
      case 'total-teachers':
        return {
          icon: <UserCheck size={20} />,
          bgColor: 'rgba(14, 165, 233, 0.1)',
          color: '#0EA5E9',
        };
      case 'todays-attendance':
        return {
          icon: <Calendar size={20} />,
          bgColor: 'rgba(34, 197, 94, 0.1)',
          color: '#22C55E',
        };
      case 'fee-collection':
      default:
        return {
          icon: <CreditCard size={20} />,
          bgColor: 'rgba(245, 158, 11, 0.1)',
          color: '#F59E0B',
        };
    }
  };

  const iconConfig = getIconConfig(kpi.id);

  return (
    <div
      onClick={() => kpi.link && navigate(kpi.link)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        background: '#ffffff',
        border: '1px solid var(--border-subtle)',
        borderRadius: '16px',
        cursor: kpi.link ? 'pointer' : 'default',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
        transform: hovered ? 'translateY(-2px)' : 'none',
        boxShadow: hovered
          ? '0 10px 20px -5px rgba(0, 0, 0, 0.05), 0 8px 8px -6px rgba(0, 0, 0, 0.05)'
          : '0 4px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px -1px rgba(0, 0, 0, 0.01)',
        fontFamily: 'Inter, sans-serif',
        gap: '12px',
      }}
    >
      {/* Top Row: Icon Circle + Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: iconConfig.bgColor,
          color: iconConfig.color,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {iconConfig.icon}
        </div>
        <span style={{
          fontSize: '14px',
          fontWeight: 600,
          color: 'var(--text-secondary)',
        }}>
          {kpi.label}
        </span>
      </div>

      {/* Metric Value */}
      <div style={{
        fontSize: '32px',
        fontWeight: 800,
        color: 'var(--text-primary)',
        fontFamily: 'Century Gothic, sans-serif',
        lineHeight: 1,
      }}>
        {kpi.value}
      </div>

      {/* Trend Pill */}
      {kpi.trend && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '2px',
            padding: '3px 8px',
            borderRadius: '99px',
            fontSize: '11px',
            fontWeight: 700,
            background: kpi.trend.direction === 'up' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
            color: kpi.trend.direction === 'up' ? 'var(--accent-success)' : 'var(--accent-danger)',
          }}>
            {kpi.trend.delta}
          </span>
          <span style={{
            fontSize: '11px',
            color: 'var(--text-muted)',
            fontWeight: 500,
          }}>
            {kpi.trend.label}
          </span>
        </div>
      )}
    </div>
  );
}
