import React from 'react';
import { motion } from 'framer-motion';
import type { AcknowledgementTrackerItem } from '../types';
import { CheckCircle2, BellRing, Download, Users } from 'lucide-react';

interface AcknowledgementTrackerProps {
  list: AcknowledgementTrackerItem[];
  onSendReminder: (item: AcknowledgementTrackerItem) => void;
  onExportCohort: (item: AcknowledgementTrackerItem) => void;
}

export const AcknowledgementTracker: React.FC<AcknowledgementTrackerProps> = ({
  list,
  onSendReminder,
  onExportCohort
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
            <CheckCircle2 size={20} />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>
              Digital Acknowledgement & Parent Signoff Tracker
            </h2>
            <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#64748B' }}>
              Real-time audit log of parent & student digital acknowledgements for key circulars.
            </p>
          </div>
        </div>

        <span style={{ fontSize: '12px', fontWeight: 700, color: '#047857', background: '#ECFDF5', padding: '6px 14px', borderRadius: '20px' }}>
          94.0% Overall Acknowledged
        </span>
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
          <thead>
            <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
              <th style={{ padding: '12px 14px', fontWeight: 700, color: '#64748B', fontSize: '11px', textTransform: 'uppercase' }}>Notice Title</th>
              <th style={{ padding: '12px 14px', fontWeight: 700, color: '#64748B', fontSize: '11px', textTransform: 'uppercase' }}>Target Cohort</th>
              <th style={{ padding: '12px 14px', fontWeight: 700, color: '#64748B', fontSize: '11px', textTransform: 'uppercase' }}>Recipients</th>
              <th style={{ padding: '12px 14px', fontWeight: 700, color: '#64748B', fontSize: '11px', textTransform: 'uppercase' }}>Read / Unread</th>
              <th style={{ padding: '12px 14px', fontWeight: 700, color: '#64748B', fontSize: '11px', textTransform: 'uppercase' }}>Acknowledged</th>
              <th style={{ padding: '12px 14px', fontWeight: 700, color: '#64748B', fontSize: '11px', textTransform: 'uppercase' }}>Last Reminder</th>
              <th style={{ padding: '12px 14px', fontWeight: 700, color: '#64748B', fontSize: '11px', textTransform: 'uppercase', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {list.map((row) => (
              <tr key={row.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '14px', fontWeight: 800, color: '#0F172A', maxWidth: '240px' }}>
                  {row.noticeTitle}
                </td>

                <td style={{ padding: '14px', fontSize: '12px', color: '#475569' }}>
                  {row.targetGroup}
                </td>

                <td style={{ padding: '14px', fontWeight: 800, color: '#0F172A' }}>
                  {row.totalRecipients}
                </td>

                <td style={{ padding: '14px' }}>
                  <span style={{ fontWeight: 700, color: '#3B7E5E' }}>{row.readCount}</span> / <span style={{ color: '#DC2626', fontWeight: 700 }}>{row.unreadCount}</span>
                </td>

                <td style={{ padding: '14px' }}>
                  <span style={{ fontWeight: 800, color: '#10B981' }}>{row.acknowledgedCount}</span> ({Math.round((row.acknowledgedCount / row.totalRecipients) * 100)}%)
                </td>

                <td style={{ padding: '14px', fontSize: '11px', color: '#64748B' }}>
                  {row.lastReminderSent}
                </td>

                <td style={{ padding: '14px', textAlign: 'right' }}>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px' }}>
                    <button onClick={() => onSendReminder(row)} style={{ background: '#3B7E5E', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <BellRing size={12} /> Remind
                    </button>
                    <button onClick={() => onExportCohort(row)} style={{ background: 'white', border: '1px solid #CBD5E1', padding: '5px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}>
                      Export
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
