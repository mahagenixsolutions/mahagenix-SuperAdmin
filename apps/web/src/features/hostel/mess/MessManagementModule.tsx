import React, { useState } from 'react';
import { DataGrid } from '../../../components/erp/DataGrid';
import type { GridColumn } from '../../../components/erp/DataGrid';
import { StatusBadge } from '../../../components/erp/StatusBadge';
import { useHostelStore } from '../shared/hostelStore';
import type { MessMenuRecord } from '../shared/types';
import { Utensils, Calendar, CheckCircle2, Award, Plus } from 'lucide-react';

export default function MessManagementModule() {
  const { messMenu, showToast } = useHostelStore();

  const columns: GridColumn<MessMenuRecord>[] = [
    { key: 'dayOfWeek', title: 'Day', render: (m) => <span style={{ fontWeight: 800, color: 'var(--text-primary)' }}>{m.dayOfWeek}</span> },
    { key: 'breakfast', title: 'Breakfast (7:30 - 9:00 AM)', render: (m) => <span style={{ fontSize: '11.5px', color: 'var(--text-primary)' }}>{m.breakfast}</span> },
    { key: 'lunch', title: 'Lunch (12:30 - 2:00 PM)', render: (m) => <span style={{ fontSize: '11.5px', color: 'var(--text-primary)' }}>{m.lunch}</span> },
    { key: 'snacks', title: 'Snacks (5:00 - 6:00 PM)', render: (m) => <span style={{ fontSize: '11.5px', color: 'var(--text-primary)' }}>{m.snacks}</span> },
    { key: 'dinner', title: 'Dinner (8:00 - 9:30 PM)', render: (m) => <span style={{ fontSize: '11.5px', color: 'var(--text-primary)' }}>{m.dinner}</span> },
    { key: 'dietType', title: 'Diet Category', render: (m) => <StatusBadge status={m.dietType === 'Pure Veg' ? 'success' : 'info'} label={m.dietType} /> },
    { key: 'qualityRating', title: 'Rating', render: (m) => <span style={{ fontWeight: 800, color: '#F59E0B' }}>⭐ {m.qualityRating} / 5</span> },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', fontFamily: '"Outfit", sans-serif' }}>
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>Hostel Mess Operations & Weekly Food Menus</h3>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>Plan weekly food menus, food quality audit scores, kitchen inventory, and mess attendance.</p>
        </div>
        <button
          onClick={() => showToast('Update Weekly Mess Menu modal triggered.')}
          style={{ padding: '8px 14px', borderRadius: '8px', border: 'none', background: '#6366F1', color: '#FFF', fontSize: '12px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <Plus size={16} /> Update Weekly Menu
        </button>
      </div>

      <DataGrid columns={columns} data={messMenu} />
    </div>
  );
}
