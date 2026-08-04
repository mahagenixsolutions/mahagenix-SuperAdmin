import React, { useState } from 'react';
import { DataGrid } from '../../../components/erp/DataGrid';
import type { GridColumn } from '../../../components/erp/DataGrid';
import { StatusBadge } from '../../../components/erp/StatusBadge';
import { useReceptionStore } from '../shared/receptionStore';
import type { StudentHelpDeskRequest } from '../shared/types';
import { FileText, CheckCircle2, Clock, Plus } from 'lucide-react';

export default function StudentHelpDeskModule() {
  const { studentRequests, createStudentRequest } = useReceptionStore();
  const [showModal, setShowModal] = useState(false);

  // Form State
  const [studentId, setStudentId] = useState('STU-104');
  const [studentName, setStudentName] = useState('');
  const [classGrade, setClassGrade] = useState('Class 10-A');
  const [requestType, setRequestType] = useState<StudentHelpDeskRequest['requestType']>('Bonafide Certificate');

  const columns: GridColumn<StudentHelpDeskRequest>[] = [
    { key: 'requestCode', title: 'Request Code', render: (r) => <span style={{ fontFamily: 'monospace', fontWeight: 800 }}>{r.requestCode}</span> },
    { key: 'studentName', title: 'Student Name', render: (r) => <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{r.studentName} ({r.classGrade})</span> },
    { key: 'studentId', title: 'Student ID', render: (r) => r.studentId },
    { key: 'requestType', title: 'Request Category', render: (r) => <StatusBadge status="info" label={r.requestType} /> },
    { key: 'dateFiled', title: 'Filed Date', render: (r) => r.dateFiled },
    { key: 'targetDate', title: 'Target Delivery', render: (r) => r.targetDate },
    { key: 'status', title: 'Status', render: (r) => <StatusBadge status={r.status === 'Ready for Pickup' ? 'success' : 'warning'} label={r.status} /> },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName) return;
    createStudentRequest(studentId, studentName, classGrade, requestType);
    setShowModal(false);
    setStudentName('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', fontFamily: '"Outfit", sans-serif' }}>
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>Student Help Desk & Document Requests</h3>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>Process student applications for Bonafide certificates, TCs, duplicate ID cards, and fee receipts.</p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          style={{ padding: '8px 14px', borderRadius: '8px', border: 'none', background: '#0284C7', color: '#FFF', fontSize: '12px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <Plus size={16} /> Log Student Request
        </button>
      </div>

      <DataGrid columns={columns} data={studentRequests} />

      {/* Modal */}
      {showModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex',
          alignItems: 'center', justifyContent: 'center', padding: '16px'
        }}>
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '24px', width: '100%', maxWidth: '440px' }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)' }}>Log Student Support Request</h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={labelStyle}>Student Full Name</label>
                  <input type="text" value={studentName} onChange={(e) => setStudentName(e.target.value)} style={inputStyle} placeholder="e.g. Aarav Sharma" required />
                </div>
                <div>
                  <label style={labelStyle}>Student ID</label>
                  <input type="text" value={studentId} onChange={(e) => setStudentId(e.target.value)} style={inputStyle} required />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={labelStyle}>Class Grade</label>
                  <input type="text" value={classGrade} onChange={(e) => setClassGrade(e.target.value)} style={inputStyle} required />
                </div>
                <div>
                  <label style={labelStyle}>Request Type</label>
                  <select value={requestType} onChange={(e) => setRequestType(e.target.value as any)} style={inputStyle}>
                    <option value="Bonafide Certificate">Bonafide Certificate</option>
                    <option value="Transfer Certificate">Transfer Certificate</option>
                    <option value="Duplicate ID Card">Duplicate ID Card</option>
                    <option value="Mark Sheet Copy">Mark Sheet Copy</option>
                    <option value="General Complaint">General Complaint</option>
                  </select>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                <button type="button" onClick={() => setShowModal(false)} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface-raised)', color: 'var(--text-primary)', fontWeight: 700, cursor: 'pointer' }}>
                  Cancel
                </button>
                <button type="submit" style={{ flex: 1, padding: '10px', borderRadius: '8px', border: 'none', background: '#0284C7', color: '#FFF', fontWeight: 700, cursor: 'pointer' }}>
                  Log Request
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
