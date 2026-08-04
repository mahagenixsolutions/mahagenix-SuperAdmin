import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import {
  PrincipalDashboardService,
  type ApprovalItem,
  type ApprovalCategory,
} from '../services/principalDashboard.service';
import ApprovalCenter from '../components/ApprovalCenter';

export default function ApprovalCenterPage() {
  const navigate = useNavigate();
  const [approvals, setApprovals] = useState<ApprovalItem[]>(
    () => PrincipalDashboardService.getApprovals(),
  );
  const [filter, setFilter] = useState<ApprovalCategory | 'all'>('all');

  const pending = approvals.filter(a => a.status === 'pending');
  const approvedToday = approvals.filter(a => a.status === 'approved').length;
  const rejectedToday = approvals.filter(a => a.status === 'rejected').length;

  const counts: Record<string, number> = { all: pending.length };
  for (const item of pending) {
    counts[item.category] = (counts[item.category] || 0) + 1;
  }

  const filtered = filter === 'all'
    ? pending
    : pending.filter(a => a.category === filter);

  const approveItem = (id: string) => {
    setApprovals(prev => prev.map(a => a.id === id ? { ...a, status: 'approved' as const } : a));
  };

  const rejectItem = (id: string) => {
    setApprovals(prev => prev.map(a => a.id === id ? { ...a, status: 'rejected' as const } : a));
  };

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', gap: 24,
      padding: '24px 0', fontFamily: 'Inter, sans-serif',
    }}>
      {/* Breadcrumb */}
      <button
        onClick={() => navigate('/dashboard')}
        style={{
          background: 'none', border: 'none', color: '#4F46E5',
          cursor: 'pointer', fontWeight: 600, fontSize: 13,
          display: 'flex', alignItems: 'center', gap: 6, padding: 0,
        }}
      >
        <ArrowLeft size={16} /> Back to Dashboard
      </button>

      {/* Page Header */}
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', flexWrap: 'wrap', gap: 16,
      }}>
        <div>
          <h1 style={{
            fontSize: 24, fontWeight: 800, margin: 0,
            color: 'var(--text-primary)', letterSpacing: '-0.02em',
          }}>
            Approval Center
          </h1>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: '4px 0 0' }}>
            Review and manage all pending approvals for your branch
          </p>
        </div>
      </div>

      {/* Statistics Bar */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
        gap: 12,
      }}>
        {[
          { label: 'Total Pending', value: pending.length, color: '#F59E0B' },
          { label: 'Approved Today', value: approvedToday, color: '#22C55E' },
          { label: 'Rejected Today', value: rejectedToday, color: '#EF4444' },
          { label: 'High Priority', value: pending.filter(a => a.priority === 'high').length, color: '#8B5CF6' },
        ].map(stat => (
          <div key={stat.label} style={{
            padding: '14px 16px', background: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderTop: `3px solid ${stat.color}`,
            borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-xs)',
          }}>
            <div style={{
              fontSize: 10, fontWeight: 600, color: 'var(--text-muted)',
              textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 4,
            }}>
              {stat.label}
            </div>
            <div style={{
              fontSize: 28, fontWeight: 700, color: 'var(--text-primary)',
              letterSpacing: '-0.02em',
            }}>
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      {/* Full Approval Center */}
      <ApprovalCenter
        approvals={filtered}
        counts={counts}
        activeFilter={filter}
        onFilterChange={setFilter}
        onApprove={approveItem}
        onReject={rejectItem}
      />
    </div>
  );
}
