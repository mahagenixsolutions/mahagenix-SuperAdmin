import React, { useState } from 'react';
import { DataGrid } from '../../../components/erp/DataGrid';
import type { GridColumn } from '../../../components/erp/DataGrid';
import { StatusBadge } from '../../../components/erp/StatusBadge';
import { useReceptionStore } from '../shared/receptionStore';
import type { GatePassRecord } from '../shared/types';
import { Award, Clock, CheckCircle2, Plus } from 'lucide-react';

export default function GatePassModule() {
  const { gatePasses, issueGatePass } = useReceptionStore();
  const [showModal, setShowModal] = useState(false);

  // Form State
  const [personName, setPersonName] = useState('');
  const [passType, setPassType] = useState<GatePassRecord['passType']>('Student Exit Pass');
  const [reason, setReason] = useState('Medical appointment');
  const [outTime, setOutTime] = useState('02:30 PM');

  const columns: GridColumn<GatePassRecord>[] = [
    { key: 'passNumber', title: 'Pass Ref #', render: (g) => <span style={{ fontFamily: 'monospace', fontWeight: 800 }}>{g.passNumber}</span> },
    { key: 'personName', title: 'Person Name', render: (g) => <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{g.personName}</span> },
    { key: 'passType', title: 'Pass Type', render: (g) => <StatusBadge status="info" label={g.passType} /> },
    { key: 'reason', title: 'Reason for Exit', render: (g) => g.reason },
    { key: 'outTime', title: 'Out Time Schedule', render: (g) => `${g.outTime} ${g.expectedInTime ? `(Return: ${g.expectedInTime})` : ''}` },
    { key: 'approvedBy', title: 'Approved By', render: (g) => g.approvedBy },
    { key: 'status', title: 'Status', render: (g) => <StatusBadge status={g.status === 'Returned' ? 'success' : g.status === 'Approved' ? 'info' : 'warning'} label={g.status} /> },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!personName) return;
    issueGatePass(personName, passType, reason, outTime);
    setShowModal(false);
    setPersonName('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', fontFamily: '"Outfit", sans-serif' }}>
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>Reception Gate Pass & Exit Permits Desk</h3>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>Issue student early exit passes, visitor exit passes, parent pickup passes, and staff exit permits.</p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          style={{ padding: '8px 14px', borderRadius: '8px', border: 'none', background: '#0284C7', color: '#FFF', fontSize: '12px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <Plus size={16} /> Issue Gate Pass
        </button>
      </div>

      <DataGrid columns={columns} data={gatePasses} />

      {/* Modal */}
      {showModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex',
          alignItems: 'center', justifyContent: 'center', padding: '16px'
        }}>
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '24px', width: '100%', maxWidth: '440px' }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)' }}>Issue Approved Gate Exit Pass</h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={labelStyle}>Person Name (Student / Staff / Visitor)</label>
                <input type="text" value={personName} onChange={(e) => setPersonName(e.target.value)} style={inputStyle} placeholder="e.g. Aarav Sharma" required />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={labelStyle}>Pass Type</label>
                  <select value={passType} onChange={(e) => setPassType(e.target.value as any)} style={inputStyle}>
                    <option value="Student Exit Pass">Student Exit Pass</option>
                    <option value="Visitor Exit Pass">Visitor Exit Pass</option>
                    <option value="Parent Pickup Pass">Parent Pickup Pass</option>
                    <option value="Staff Exit Pass">Staff Exit Pass</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Out Time</label>
                  <input type="text" value={outTime} onChange={(e) => setOutTime(e.target.value)} style={inputStyle} required />
                </div>
              </div>
              <div>
                <label style={labelStyle}>Reason for Exit</label>
                <input type="text" value={reason} onChange={(e) => setReason(e.target.value)} style={inputStyle} required />
              </div>
              <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                <button type="button" onClick={() => setShowModal(false)} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface-raised)', color: 'var(--text-primary)', fontWeight: 700, cursor: 'pointer' }}>
                  Cancel
                </button>
                <button type="submit" style={{ flex: 1, padding: '10px', borderRadius: '8px', border: 'none', background: '#0284C7', color: '#FFF', fontWeight: 700, cursor: 'pointer' }}>
                  Issue Gate Pass
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
