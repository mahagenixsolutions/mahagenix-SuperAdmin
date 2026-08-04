import React, { useState } from 'react';
import { Send, MessageSquare, Mail, PhoneCall } from 'lucide-react';
import { useReceptionStore } from '../shared/receptionStore';
import { DataGrid } from '../../../components/erp/DataGrid';
import type { GridColumn } from '../../../components/erp/DataGrid';
import { StatusBadge } from '../../../components/erp/StatusBadge';
import type { CommunicationMessage } from '../shared/types';

export default function CommunicationModule() {
  const { communications, sendCommunication } = useReceptionStore();

  const [channel, setChannel] = useState<CommunicationMessage['channel']>('SMS');
  const [recipientGroup, setRecipientGroup] = useState<CommunicationMessage['recipientGroup']>('All Parents');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');

  const columns: GridColumn<CommunicationMessage>[] = [
    { key: 'messageRef', title: 'Message Ref', render: (m) => <span style={{ fontFamily: 'monospace', fontWeight: 800 }}>{m.messageRef}</span> },
    { key: 'channel', title: 'Channel', render: (m) => <StatusBadge status="info" label={m.channel} /> },
    { key: 'recipientGroup', title: 'Target Group', render: (m) => m.recipientGroup },
    { key: 'subject', title: 'Subject / Title', render: (m) => <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{m.subject}</span> },
    { key: 'sentDate', title: 'Sent Date', render: (m) => m.sentDate },
    { key: 'deliveryCount', title: 'Recipients', render: (m) => `${m.deliveryCount} Delivered` },
    { key: 'status', title: 'Status', render: (m) => <StatusBadge status="success" label={m.status} /> },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !content) return;
    sendCommunication(channel, recipientGroup, subject, content);
    setSubject('');
    setContent('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', fontFamily: '"Outfit", sans-serif' }}>
      
      {/* Broadcast Form */}
      <form onSubmit={handleSubmit} style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '14px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 800, margin: 0, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <MessageSquare size={18} style={{ color: '#0284C7' }} /> Reception Multi-Channel Broadcast Center
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
          <div>
            <label style={labelStyle}>Target Audience</label>
            <select
              value={recipientGroup}
              onChange={(e) => setRecipientGroup(e.target.value as any)}
              style={inputStyle}
            >
              <option value="All Parents">All Parents</option>
              <option value="Class 10 Parents">Class 10 Parents</option>
              <option value="Staff">Staff</option>
              <option value="Admission Leads">Admission Leads</option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>Dispatch Channel</label>
            <select
              value={channel}
              onChange={(e) => setChannel(e.target.value as any)}
              style={inputStyle}
            >
              <option value="SMS">SMS</option>
              <option value="Email">Email</option>
              <option value="Broadcast Circular">Broadcast Circular</option>
              <option value="Emergency Alert">Emergency Alert</option>
            </select>
          </div>
        </div>

        <div>
          <label style={labelStyle}>Broadcast Subject / Title</label>
          <input
            type="text"
            placeholder="e.g. Parent-Teacher Meeting Reminder"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            style={inputStyle}
            required
          />
        </div>

        <div>
          <label style={labelStyle}>Message Content</label>
          <textarea
            rows={3}
            placeholder="Type your official broadcast text here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{ ...inputStyle, height: '80px', resize: 'vertical' }}
            required
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button type="submit" style={{ padding: '10px 24px', borderRadius: '8px', border: 'none', background: '#0284C7', color: '#FFF', fontWeight: 700, fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Send size={14} /> Dispatch Broadcast
          </button>
        </div>
      </form>

      {/* Broadcast History Table */}
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '14px', padding: '18px' }}>
        <h4 style={{ fontSize: '14px', fontWeight: 800, margin: '0 0 12px 0', color: 'var(--text-primary)' }}>Communication History Log</h4>
        <DataGrid columns={columns} data={communications} />
      </div>
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '11px',
  fontWeight: 800,
  color: 'var(--text-secondary)',
  textTransform: 'uppercase',
  marginBottom: '6px',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '9px 12px',
  borderRadius: '8px',
  border: '1px solid var(--border-subtle)',
  background: 'var(--bg-surface-raised)',
  color: 'var(--text-primary)',
  outline: 'none',
  fontSize: '13px',
};
