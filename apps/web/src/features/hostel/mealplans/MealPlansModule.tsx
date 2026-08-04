import React, { useState } from 'react';
import { DataGrid } from '../../../components/erp/DataGrid';
import type { GridColumn } from '../../../components/erp/DataGrid';
import { StatusBadge } from '../../../components/erp/StatusBadge';
import { mockMealPlans } from '../shared/mockHostelData';
import type { MealPlan } from '../shared/types';
import { Utensils, Users, DollarSign } from 'lucide-react';

export default function MealPlansModule() {
  const [plans, setPlans] = useState<MealPlan[]>(mockMealPlans);

  const columns: GridColumn<MealPlan>[] = [
    { key: 'planName', title: 'Meal Plan Name', render: (p) => <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{p.planName}</span> },
    { key: 'category', title: 'Diet Category', render: (p) => <StatusBadge status="info" label={p.category} /> },
    { key: 'monthlyFee', title: 'Monthly Subscription', render: (p) => <span style={{ fontWeight: 800, color: '#10B981' }}>₹{p.monthlyFee.toLocaleString()} / month</span> },
    { key: 'subscriberCount', title: 'Subscribed Residents', render: (p) => <span style={{ fontWeight: 800, color: '#6366F1' }}>{p.subscriberCount} Students</span> }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', fontFamily: '"Outfit", sans-serif' }}>
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>Student Meal Plan Subscriptions</h3>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>Manage Veg, Non-Veg Special, Diabetic, and High Protein diet subscriptions for residents.</p>
        </div>
      </div>

      <DataGrid columns={columns} data={plans} />
    </div>
  );
}
