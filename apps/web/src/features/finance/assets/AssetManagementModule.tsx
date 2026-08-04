import React from 'react';
import { Building, Plus, CheckCircle2, TrendingDown } from 'lucide-react';
import { KPICard } from '../../../components/erp/KPICard';

export default function AssetManagementModule() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: '100%', fontFamily: "'Inter', sans-serif" }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
        <KPICard title="TOTAL FIXED ASSETS" value="₹2.45 Cr" icon={<Building size={20} />} tone="info" />
        <KPICard title="ANNUAL DEPRECIATION" value="₹18.4 L" icon={<TrendingDown size={20} />} tone="warning" />
        <KPICard title="ASSET COUNT" value="1,240 Assets" icon={<CheckCircle2 size={20} />} tone="success" />
        <KPICard title="NET BOOK VALUE" value="₹2.26 Cr" icon={<Building size={20} />} tone="success" />
      </div>

      <div style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: 18, padding: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, margin: 0, color: '#111827' }}>Fixed Asset Register & Depreciation Schedule</h3>
          <button style={{ padding: '8px 16px', borderRadius: 10, border: 'none', background: '#3B82F6', color: 'white', fontWeight: 600, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
            <Plus size={16} /> Register Asset
          </button>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#F9FAFB', borderBottom: '1px solid #E5E7EB', color: '#6B7280', fontSize: 11, fontWeight: 700, textTransform: 'uppercase' }}>
              <th style={{ padding: '12px 14px' }}>Asset ID</th>
              <th style={{ padding: '12px 14px' }}>Asset Name</th>
              <th style={{ padding: '12px 14px' }}>Category</th>
              <th style={{ padding: '12px 14px' }}>Purchase Cost</th>
              <th style={{ padding: '12px 14px' }}>Accumulated Dep.</th>
              <th style={{ padding: '12px 14px' }}>Net Book Value</th>
              <th style={{ padding: '12px 14px' }}>Location</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #F3F4F6' }}>
              <td style={{ padding: '12px 14px', fontWeight: 700, color: '#3B82F6' }}>AST-2024-001</td>
              <td style={{ padding: '12px 14px', fontWeight: 600, color: '#111827' }}>School Bus Fleet (14 Vehicles)</td>
              <td style={{ padding: '12px 14px', color: '#6B7280' }}>Vehicles & Fleet</td>
              <td style={{ padding: '12px 14px', fontWeight: 700 }}>₹1.20 Cr</td>
              <td style={{ padding: '12px 14px', color: '#EF4444' }}>₹12.0 L</td>
              <td style={{ padding: '12px 14px', fontWeight: 800, color: '#10B981' }}>₹1.08 Cr</td>
              <td style={{ padding: '12px 14px', color: '#6B7280' }}>Transport Yard</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
