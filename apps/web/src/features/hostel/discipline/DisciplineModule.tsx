import React, { useState } from 'react';
import { DataGrid } from '../../../components/erp/DataGrid';
import type { GridColumn } from '../../../components/erp/DataGrid';
import { StatusBadge } from '../../../components/erp/StatusBadge';
import { useHostelStore } from '../shared/hostelStore';
import type { DisciplinaryIncidentRecord } from '../shared/types';
import { ShieldAlert, AlertTriangle, CheckCircle2, Plus } from 'lucide-react';

export default function DisciplineModule() {
  const { incidents, buildings, recordDisciplinaryIncident } = useHostelStore();
  const [showModal, setShowModal] = useState(false);

  // Form State
  const [studentName, setStudentName] = useState('');
  const [roomNumber, setRoomNumber] = useState('A-101');
  const [violationType, setViolationType] = useState<DisciplinaryIncidentRecord['violationType']>('Curfew Breach');
  const [actionTaken, setActionTaken] = useState<DisciplinaryIncidentRecord['actionTaken']>('Verbal Warning');

  const columns: GridColumn<DisciplinaryIncidentRecord>[] = [
    { key: 'id', title: 'Case ID', render: (d) => <span style={{ fontFamily: 'monospace', fontWeight: 800 }}>{d.id}</span> },
    { key: 'studentName', title: 'Student Name', render: (d) => <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{d.studentName} (Room {d.roomNumber})</span> },
    { key: 'buildingName', title: 'Building', render: (d) => d.buildingName },
    { key: 'violationType', title: 'Violation Category', render: (d) => <StatusBadge status="danger" label={d.violationType} /> },
    { key: 'date', title: 'Incident Date', render: (d) => d.date },
    { key: 'reportedBy', title: 'Reported By', render: (d) => d.reportedBy },
    { key: 'actionTaken', title: 'Action Taken', render: (d) => <StatusBadge status="warning" label={d.actionTaken} /> },
    { key: 'status', title: 'Status', render: (d) => <StatusBadge status={d.status === 'Resolved' ? 'success' : 'warning'} label={d.status} /> },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName) return;
    recordDisciplinaryIncident(studentName, roomNumber, buildings[0]?.buildingName || '', violationType, actionTaken);
    setShowModal(false);
    setStudentName('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', fontFamily: '"Outfit", sans-serif' }}>
      
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>Student Disciplinary Log & Curfew Violations</h3>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>Track rule violations, night curfew breaches, warnings issued, and disciplinary hearing records.</p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          style={{ padding: '8px 14px', borderRadius: '8px', border: 'none', background: '#EF4444', color: '#FFF', fontSize: '12px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <Plus size={16} /> Log Disciplinary Incident
        </button>
      </div>

      <DataGrid columns={columns} data={incidents} />

      {/* Modal */}
      {showModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex',
          alignItems: 'center', justifyContent: 'center', padding: '16px'
        }}>
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '24px', width: '100%', maxWidth: '460px' }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)' }}>Log Disciplinary Incident</h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={labelStyle}>Student Full Name</label>
                  <input type="text" value={studentName} onChange={(e) => setStudentName(e.target.value)} style={inputStyle} placeholder="e.g. Vivaan Mehta" required />
                </div>
                <div>
                  <label style={labelStyle}>Room Number</label>
                  <input type="text" value={roomNumber} onChange={(e) => setRoomNumber(e.target.value)} style={inputStyle} required />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={labelStyle}>Violation Type</label>
                  <select value={violationType} onChange={(e) => setViolationType(e.target.value as any)} style={inputStyle}>
                    <option value="Curfew Breach">Curfew Breach</option>
                    <option value="Unauthorized Visitor">Unauthorized Visitor</option>
                    <option value="Noise Violation">Noise Violation</option>
                    <option value="Smoking / Substance">Smoking / Substance</option>
                    <option value="Property Damage">Property Damage</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Action / Penalty Issued</label>
                  <select value={actionTaken} onChange={(e) => setActionTaken(e.target.value as any)} style={inputStyle}>
                    <option value="Verbal Warning">Verbal Warning</option>
                    <option value="Written Warning">Written Warning</option>
                    <option value="Fine Imposed">Fine Imposed</option>
                    <option value="Parent Called">Parent Called</option>
                    <option value="Suspension">Suspension</option>
                  </select>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                <button type="button" onClick={() => setShowModal(false)} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface-raised)', color: 'var(--text-primary)', fontWeight: 700, cursor: 'pointer' }}>
                  Cancel
                </button>
                <button type="submit" style={{ flex: 1, padding: '10px', borderRadius: '8px', border: 'none', background: '#EF4444', color: '#FFF', fontWeight: 700, cursor: 'pointer' }}>
                  Log Incident
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
