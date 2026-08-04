import React, { useState } from 'react';
import { DataGrid } from '../../../components/erp/DataGrid';
import type { GridColumn } from '../../../components/erp/DataGrid';
import { StatusBadge } from '../../../components/erp/StatusBadge';
import { useHostelStore } from '../shared/hostelStore';
import type { ComplaintRecord } from '../shared/types';
import { MessageSquare, AlertTriangle, CheckCircle2, Plus } from 'lucide-react';

export default function ComplaintsModule() {
  const { complaints, buildings, createComplaint, resolveComplaint } = useHostelStore();
  const [showModal, setShowModal] = useState(false);

  // Form State
  const [studentName, setStudentName] = useState('');
  const [roomNumber, setRoomNumber] = useState('A-101');
  const [category, setCategory] = useState<ComplaintRecord['category']>('Electrical');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<ComplaintRecord['priority']>('Medium');

  const columns: GridColumn<ComplaintRecord>[] = [
    { key: 'id', title: 'Work Order ID', render: (c) => <span style={{ fontFamily: 'monospace', fontWeight: 800 }}>{c.id}</span> },
    { key: 'studentName', title: 'Student & Room', render: (c) => <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{c.studentName} (Room {c.roomNumber})</span> },
    { key: 'buildingName', title: 'Building', render: (c) => c.buildingName },
    { key: 'category', title: 'Category', render: (c) => <StatusBadge status="info" label={c.category} /> },
    { key: 'description', title: 'Description', render: (c) => <span style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>{c.description}</span> },
    { key: 'priority', title: 'Priority', render: (c) => <StatusBadge status={c.priority === 'Emergency' || c.priority === 'High' ? 'danger' : 'warning'} label={c.priority} /> },
    { key: 'status', title: 'Status', render: (c) => <StatusBadge status={c.status === 'Resolved' ? 'success' : c.status === 'In Progress' ? 'warning' : 'danger'} label={c.status} /> },
    {
      key: 'id',
      title: 'Action',
      render: (c) =>
        c.status !== 'Resolved' ? (
          <button
            onClick={() => resolveComplaint(c.id)}
            style={{ border: 'none', background: '#10B981', color: '#FFF', padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}
          >
            Mark Resolved
          </button>
        ) : (
          <span style={{ fontSize: '11px', color: '#10B981', fontWeight: 700 }}>Resolved</span>
        ),
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName || !description) return;
    createComplaint(studentName, roomNumber, buildings[0]?.buildingName || '', category, description, priority);
    setShowModal(false);
    setStudentName('');
    setDescription('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', fontFamily: '"Outfit", sans-serif' }}>
      
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>Student Grievances & Maintenance Work Orders</h3>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>Log electrical, plumbing, carpentry, cleaning, and WiFi internet maintenance requests.</p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          style={{ padding: '8px 14px', borderRadius: '8px', border: 'none', background: '#6366F1', color: '#FFF', fontSize: '12px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <Plus size={16} /> Create Work Order
        </button>
      </div>

      <DataGrid columns={columns} data={complaints} />

      {/* Modal */}
      {showModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex',
          alignItems: 'center', justifyContent: 'center', padding: '16px'
        }}>
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '24px', width: '100%', maxWidth: '460px' }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)' }}>Create Maintenance Work Order</h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={labelStyle}>Student Name</label>
                  <input type="text" value={studentName} onChange={(e) => setStudentName(e.target.value)} style={inputStyle} placeholder="e.g. Aarav Sharma" required />
                </div>
                <div>
                  <label style={labelStyle}>Room Number</label>
                  <input type="text" value={roomNumber} onChange={(e) => setRoomNumber(e.target.value)} style={inputStyle} required />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={labelStyle}>Category</label>
                  <select value={category} onChange={(e) => setCategory(e.target.value as any)} style={inputStyle}>
                    <option value="Electrical">Electrical</option>
                    <option value="Plumbing">Plumbing</option>
                    <option value="Carpentry & Furniture">Carpentry & Furniture</option>
                    <option value="Cleaning & Hygiene">Cleaning & Hygiene</option>
                    <option value="Wi-Fi / Internet">Wi-Fi / Internet</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Priority Level</label>
                  <select value={priority} onChange={(e) => setPriority(e.target.value as any)} style={inputStyle}>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Emergency">Emergency</option>
                  </select>
                </div>
              </div>
              <div>
                <label style={labelStyle}>Issue Description</label>
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} style={inputStyle} placeholder="e.g. Fan squeaking noise in room." required />
              </div>
              <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                <button type="button" onClick={() => setShowModal(false)} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface-raised)', color: 'var(--text-primary)', fontWeight: 700, cursor: 'pointer' }}>
                  Cancel
                </button>
                <button type="submit" style={{ flex: 1, padding: '10px', borderRadius: '8px', border: 'none', background: '#6366F1', color: '#FFF', fontWeight: 700, cursor: 'pointer' }}>
                  Create Work Order
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
