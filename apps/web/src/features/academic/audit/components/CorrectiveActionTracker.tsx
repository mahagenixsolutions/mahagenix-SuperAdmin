import React from 'react';
import { motion } from 'framer-motion';
import type { CorrectiveActionItem } from '../types';
import { CheckCircle2, Clock, MessageSquare, ShieldCheck } from 'lucide-react';

interface CorrectiveActionTrackerProps {
  actions: CorrectiveActionItem[];
  onUpdateStatus: (item: CorrectiveActionItem) => void;
  onResolveIssue: (id: string) => void;
}

export const CorrectiveActionTracker: React.FC<CorrectiveActionTrackerProps> = ({
  actions,
  onUpdateStatus,
  onResolveIssue
}) => {
  return (
    <div style={{
      background: 'white',
      border: '1px solid #E2E8F0',
      borderRadius: '16px',
      padding: '24px',
      boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.03)'
    }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid #F1F5F9' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            background: '#ECFDF5',
            color: '#047857',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <ShieldCheck size={20} />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>
              Academic Audit Corrective Action Tracker & SLA Board
            </h2>
            <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#64748B' }}>
              Tracks remediation tasks assigned to HODs and faculty to resolve audit findings.
            </p>
          </div>
        </div>

        <span style={{ fontSize: '12px', fontWeight: 700, color: '#3B7E5E', background: '#EAF5F0', padding: '6px 14px', borderRadius: '20px' }}>
          {actions.length} Corrective Items Open
        </span>
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
          <thead>
            <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
              <th style={{ padding: '12px 14px', fontWeight: 700, color: '#64748B', fontSize: '11px', textTransform: 'uppercase' }}>Audit Issue Title</th>
              <th style={{ padding: '12px 14px', fontWeight: 700, color: '#64748B', fontSize: '11px', textTransform: 'uppercase' }}>Dept</th>
              <th style={{ padding: '12px 14px', fontWeight: 700, color: '#64748B', fontSize: '11px', textTransform: 'uppercase' }}>Assigned To</th>
              <th style={{ padding: '12px 14px', fontWeight: 700, color: '#64748B', fontSize: '11px', textTransform: 'uppercase' }}>Priority</th>
              <th style={{ padding: '12px 14px', fontWeight: 700, color: '#64748B', fontSize: '11px', textTransform: 'uppercase' }}>Deadline</th>
              <th style={{ padding: '12px 14px', fontWeight: 700, color: '#64748B', fontSize: '11px', textTransform: 'uppercase' }}>Progress %</th>
              <th style={{ padding: '12px 14px', fontWeight: 700, color: '#64748B', fontSize: '11px', textTransform: 'uppercase' }}>Status</th>
              <th style={{ padding: '12px 14px', fontWeight: 700, color: '#64748B', fontSize: '11px', textTransform: 'uppercase', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {actions.map((act) => (
              <tr key={act.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '14px', fontWeight: 800, color: '#0F172A' }}>
                  {act.issueTitle}
                </td>

                <td style={{ padding: '14px', fontWeight: 600, color: '#334155' }}>
                  {act.department}
                </td>

                <td style={{ padding: '14px', fontWeight: 600, color: '#3B7E5E' }}>
                  {act.assignedTo}
                </td>

                <td style={{ padding: '14px' }}>
                  <span style={{
                    background: act.priority === 'High' ? '#FEF2F2' : '#FFFBEB',
                    color: act.priority === 'High' ? '#DC2626' : '#B45309',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    fontSize: '11px',
                    fontWeight: 700
                  }}>
                    {act.priority}
                  </span>
                </td>

                <td style={{ padding: '14px', fontSize: '12px', color: '#475569' }}>
                  {act.deadline}
                </td>

                <td style={{ padding: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: '50px', height: '5px', background: '#E2E8F0', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ width: `${act.progressPct}%`, height: '100%', background: '#5FAF88' }} />
                    </div>
                    <span style={{ fontWeight: 800, fontSize: '12px' }}>{act.progressPct}%</span>
                  </div>
                </td>

                <td style={{ padding: '14px' }}>
                  <span style={{
                    background: act.status === 'Resolved' ? '#ECFDF5' : '#FEF3C7',
                    color: act.status === 'Resolved' ? '#047857' : '#B45309',
                    padding: '3px 8px',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontWeight: 700
                  }}>
                    {act.status}
                  </span>
                </td>

                <td style={{ padding: '14px', textAlign: 'right' }}>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px' }}>
                    <button onClick={() => onUpdateStatus(act)} style={{ background: 'white', border: '1px solid #CBD5E1', padding: '5px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}>
                      Update
                    </button>
                    <button onClick={() => onResolveIssue(act.id)} style={{ background: '#3B7E5E', color: 'white', border: 'none', padding: '5px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}>
                      Resolve
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
