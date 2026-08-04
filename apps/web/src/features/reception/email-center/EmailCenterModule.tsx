import React, { useState } from 'react';
import { DataGrid } from '../../../components/erp/DataGrid';
import type { GridColumn } from '../../../components/erp/DataGrid';
import { StatusBadge } from '../../../components/erp/StatusBadge';
import { mockEmails } from '../shared/mockReceptionData';
import type { EmailMessage } from '../shared/types';
import { Mail, Send, FileText } from 'lucide-react';

export default function EmailCenterModule() {
  const [emails, setEmails] = useState<EmailMessage[]>(mockEmails);

  const columns: GridColumn<EmailMessage>[] = [
    { key: 'emailCode', title: 'Email Code', render: (e) => <span style={{ fontFamily: 'monospace', fontWeight: 800 }}>{e.emailCode}</span> },
    { key: 'recipient', title: 'Recipient', render: (e) => <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{e.recipient}</span> },
    { key: 'subject', title: 'Subject', render: (e) => e.subject },
    { key: 'category', title: 'Category', render: (e) => <StatusBadge status="info" label={e.category} /> },
    { key: 'sentDate', title: 'Sent Date', render: (e) => e.sentDate },
    { key: 'status', title: 'Status', render: (e) => <StatusBadge status={e.status === 'Sent' ? 'success' : 'warning'} label={e.status} /> }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', fontFamily: '"Outfit", sans-serif' }}>
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>Reception Email Dispatch & Templates</h3>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>Send admission notices, fee reminders, event circulars, and bulk emails to parents.</p>
        </div>
        <button style={{ padding: '8px 14px', borderRadius: '8px', border: 'none', background: '#0284C7', color: '#FFF', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}>
          + Compose Email
        </button>
      </div>

      <DataGrid columns={columns} data={emails} />
    </div>
  );
}
