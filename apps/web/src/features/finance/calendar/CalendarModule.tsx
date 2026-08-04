import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, AlertTriangle, CheckCircle, Bell } from 'lucide-react';
import { mockCalendarEvents } from '../shared/mockFinanceData';
import type { FinancialCalendarEvent } from '../shared/types';

export default function CalendarModule() {
  const [events] = useState<FinancialCalendarEvent[]>(mockCalendarEvents);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', fontFamily: '"Outfit", sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-surface)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
        <div>
          <h3 style={{ fontSize: '16px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>Institutional Financial Calendar & Deadlines</h3>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>Payroll cutoffs, GST returns, fee due dates, vendor disbursements, and audit schedules.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
        {events.map((evt) => (
          <div key={evt.id} style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '14px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CalendarIcon size={14} /> {evt.date}
              </span>
              <span style={{
                padding: '4px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 700,
                background: evt.urgency === 'high' ? 'rgba(239,68,68,0.1)' : 'rgba(59,130,246,0.1)',
                color: evt.urgency === 'high' ? '#EF4444' : '#3B82F6'
              }}>
                {evt.category}
              </span>
            </div>

            <h4 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>{evt.title}</h4>

            {evt.amount && (
              <span style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)' }}>
                Estimated Amount: ₹{evt.amount.toLocaleString('en-IN')}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
