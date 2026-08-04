import React, { useState } from 'react';
import { DataGrid } from '../../../components/erp/DataGrid';
import type { GridColumn } from '../../../components/erp/DataGrid';
import { StatusBadge } from '../../../components/erp/StatusBadge';
import { mockEvents } from '../shared/mockReceptionData';
import type { SchoolEvent } from '../shared/types';
import { Calendar, MapPin, CheckCircle2 } from 'lucide-react';

export default function EventsModule() {
  const [events, setEvents] = useState<SchoolEvent[]>(mockEvents);

  const columns: GridColumn<SchoolEvent>[] = [
    { key: 'eventCode', title: 'Event Code', render: (e) => <span style={{ fontFamily: 'monospace', fontWeight: 800 }}>{e.eventCode}</span> },
    { key: 'eventName', title: 'Event Name', render: (e) => <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{e.eventName}</span> },
    { key: 'category', title: 'Category', render: (e) => <StatusBadge status="info" label={e.category} /> },
    { key: 'eventDate', title: 'Scheduled Date', render: (e) => e.eventDate },
    { key: 'venue', title: 'Venue', render: (e) => e.venue },
    { key: 'status', title: 'Status', render: (e) => <StatusBadge status={e.status === 'Upcoming' ? 'success' : 'info'} label={e.status} /> }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', fontFamily: '"Outfit", sans-serif' }}>
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>School Events & Campus Open House Calendar</h3>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>Track admissions open house events, parent meetings, and annual functions.</p>
        </div>
      </div>

      <DataGrid columns={columns} data={events} />
    </div>
  );
}
