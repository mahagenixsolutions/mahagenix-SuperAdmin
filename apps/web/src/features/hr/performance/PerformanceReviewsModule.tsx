import React, { useState } from 'react';
import { DataGrid } from '../../../components/erp/DataGrid';
import type { GridColumn } from '../../../components/erp/DataGrid';
import { StatusBadge } from '../../../components/erp/StatusBadge';
import { mockPerformanceReviews } from '../shared/mockHRData';
import type { PerformanceReview } from '../shared/types';
import { Star, Award, TrendingUp, UserCheck } from 'lucide-react';

export default function PerformanceReviewsModule() {
  const [reviews, setReviews] = useState<PerformanceReview[]>(mockPerformanceReviews);

  const columns: GridColumn<PerformanceReview>[] = [
    { key: 'empName', title: 'Employee Name', render: (p) => <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{p.empName}</span> },
    { key: 'department', title: 'Department', render: (p) => <StatusBadge status="info" label={p.department} /> },
    { key: 'reviewPeriod', title: 'Review Period', render: (p) => p.reviewPeriod },
    { key: 'kpiScore', title: 'KPI Score', render: (p) => <span style={{ fontWeight: 800, color: '#10B981' }}>{p.kpiScore}%</span> },
    { key: 'rating', title: 'Rating', render: (p) => <span style={{ fontWeight: 800, color: '#F59E0B' }}>⭐ {p.rating} / 5</span> },
    { key: 'reviewer', title: 'Evaluated By', render: (p) => p.reviewer },
    { key: 'promotionRecommended', title: 'Promotion Rec.', render: (p) => <StatusBadge status={p.promotionRecommended === 'Yes' ? 'success' : 'warning'} label={p.promotionRecommended} /> }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', fontFamily: '"Outfit", sans-serif' }}>
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>Performance Appraisal & KPI Tracking</h3>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>Annual reviews, quarterly KPI ratings, manager feedback, and promotion logs.</p>
        </div>
        <button style={{ padding: '8px 14px', borderRadius: '8px', border: 'none', background: '#3B82F6', color: '#FFF', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}>
          + Initiate Review Cycle
        </button>
      </div>

      <DataGrid columns={columns} data={reviews} />
    </div>
  );
}
