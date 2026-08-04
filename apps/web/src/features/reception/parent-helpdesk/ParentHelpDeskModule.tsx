import React, { useState } from 'react';
import { DataGrid } from '../../../components/erp/DataGrid';
import type { GridColumn } from '../../../components/erp/DataGrid';
import { StatusBadge } from '../../../components/erp/StatusBadge';
import { useReceptionStore } from '../shared/receptionStore';
import type { ParentHelpDeskTicket } from '../shared/types';
import { Users, HelpCircle, CheckCircle2, Plus } from 'lucide-react';

export default function ParentHelpDeskModule() {
  const { parentTickets, createParentTicket } = useReceptionStore();
  const [showModal, setShowModal] = useState(false);

  // Form State
  const [parentName, setParentName] = useState('');
  const [studentName, setStudentName] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState<ParentHelpDeskTicket['category']>('Fee Structure');
  const [subject, setSubject] = useState('');

  const columns: GridColumn<ParentHelpDeskTicket>[] = [
    { key: 'ticketNumber', title: 'Ticket #', render: (p) => <span style={{ fontFamily: 'monospace', fontWeight: 800 }}>{p.ticketNumber}</span> },
    { key: 'parentName', title: 'Parent Name', render: (p) => <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{p.parentName}</span> },
    { key: 'studentName', title: 'Student & Class', render: (p) => `${p.studentName} (${p.classGrade})` },
    { key: 'category', title: 'Query Type', render: (p) => <StatusBadge status="info" label={p.category} /> },
    { key: 'subject', title: 'Ticket Subject', render: (p) => <span style={{ fontSize: '11.5px', color: 'var(--text-primary)' }}>{p.subject}</span> },
    { key: 'dateCreated', title: 'Submitted Date', render: (p) => p.dateCreated },
    { key: 'status', title: 'Status', render: (p) => <StatusBadge status={p.status === 'Resolved' ? 'success' : 'warning'} label={p.status} /> },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!parentName || !subject) return;
    createParentTicket(parentName, studentName, phone || '+91 98000 00000', category, subject);
    setShowModal(false);
    setParentName('');
    setSubject('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', fontFamily: '"Outfit", sans-serif' }}>
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>Parent Support & Query Resolution Ticketing</h3>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>Assist parents with fee receipts, transport route inquiries, admission details, and complaint resolution.</p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          style={{ padding: '8px 14px', borderRadius: '8px', border: 'none', background: '#0284C7', color: '#FFF', fontSize: '12px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <Plus size={16} /> Open Support Ticket
        </button>
      </div>

      <DataGrid columns={columns} data={parentTickets} />

      {/* Modal */}
      {showModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex',
          alignItems: 'center', justifyContent: 'center', padding: '16px'
        }}>
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '24px', width: '100%', maxWidth: '440px' }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)' }}>Open Parent Support Ticket</h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={labelStyle}>Parent Name</label>
                  <input type="text" value={parentName} onChange={(e) => setParentName(e.target.value)} style={inputStyle} placeholder="e.g. Pravin Patel" required />
                </div>
                <div>
                  <label style={labelStyle}>Student Name</label>
                  <input type="text" value={studentName} onChange={(e) => setStudentName(e.target.value)} style={inputStyle} placeholder="e.g. Siya Patel" required />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={labelStyle}>Contact Phone</label>
                  <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} style={inputStyle} placeholder="+91 98000 00000" required />
                </div>
                <div>
                  <label style={labelStyle}>Category</label>
                  <select value={category} onChange={(e) => setCategory(e.target.value as any)} style={inputStyle}>
                    <option value="Fee Structure">Fee Structure</option>
                    <option value="Admission Queries">Admission Queries</option>
                    <option value="Transport Route">Transport Route</option>
                    <option value="Certificate Request">Certificate Request</option>
                    <option value="Complaint">Complaint</option>
                    <option value="Principal Meeting">Principal Meeting</option>
                  </select>
                </div>
              </div>
              <div>
                <label style={labelStyle}>Subject / Issue Details</label>
                <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} style={inputStyle} placeholder="e.g. Fee receipt copy requested." required />
              </div>
              <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                <button type="button" onClick={() => setShowModal(false)} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface-raised)', color: 'var(--text-primary)', fontWeight: 700, cursor: 'pointer' }}>
                  Cancel
                </button>
                <button type="submit" style={{ flex: 1, padding: '10px', borderRadius: '8px', border: 'none', background: '#0284C7', color: '#FFF', fontWeight: 700, cursor: 'pointer' }}>
                  Open Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
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
