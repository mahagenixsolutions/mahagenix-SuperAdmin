import React, { useState } from 'react';
import { PieChart, TrendingUp, AlertCircle, Plus } from 'lucide-react';
import { mockBudgets } from '../shared/mockFinanceData';
import type { DepartmentBudget } from '../shared/types';

export default function BudgetModule() {
  const [budgets, setBudgets] = useState<DepartmentBudget[]>(mockBudgets);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', fontFamily: '"Outfit", sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-surface)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
        <div>
          <h3 style={{ fontSize: '16px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>Institutional & Departmental Budget Planning</h3>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>Annual budget allocations, committed purchase order caps, and departmental utilization.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
        {budgets.map((b) => (
          <div key={b.id} style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '14px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <h4 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>{b.department}</h4>
              <span style={{
                padding: '4px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 700,
                background: b.utilizationPercent > 90 ? 'rgba(239,68,68,0.1)' : 'rgba(16,185,129,0.1)',
                color: b.utilizationPercent > 90 ? '#EF4444' : '#10B981'
              }}>
                {b.utilizationPercent}% Spent
              </span>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                <span>Spent: ₹{b.spentToDate.toLocaleString('en-IN')}</span>
                <span>Annual: ₹{b.annualAllocation.toLocaleString('en-IN')}</span>
              </div>
              <div style={{ height: '8px', borderRadius: '4px', background: 'var(--bg-surface-raised)', overflow: 'hidden' }}>
                <div style={{
                  height: '100%', width: `${Math.min(b.utilizationPercent, 100)}%`,
                  background: b.utilizationPercent > 90 ? '#EF4444' : 'var(--accent-primary)',
                  borderRadius: '4px', transition: 'width 0.3s ease'
                }} />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)', borderTop: '1px dashed var(--border-subtle)', paddingTop: '10px' }}>
              <span>Committed POs: ₹{b.committedPOs.toLocaleString('en-IN')}</span>
              <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>Remaining: ₹{b.remaining.toLocaleString('en-IN')}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
