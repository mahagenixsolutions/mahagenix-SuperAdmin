import React, { useState } from 'react';
import { DataGrid } from '../../../components/erp/DataGrid';
import type { GridColumn } from '../../../components/erp/DataGrid';
import { StatusBadge } from '../../../components/erp/StatusBadge';
import { useHostelStore } from '../shared/hostelStore';
import type { MedicalEmergencyRecord } from '../shared/types';
import { HeartPulse, Stethoscope, AlertCircle, Plus } from 'lucide-react';

export default function MedicalRecordsModule() {
  const { medicalCases, buildings, logMedicalEmergency } = useHostelStore();
  const [showModal, setShowModal] = useState(false);

  // Form State
  const [studentName, setStudentName] = useState('');
  const [roomNumber, setRoomNumber] = useState('A-101');
  const [symptoms, setSymptoms] = useState('');
  const [severity, setSeverity] = useState<MedicalEmergencyRecord['severity']>('Mild');

  const columns: GridColumn<MedicalEmergencyRecord>[] = [
    { key: 'id', title: 'Case Ref', render: (m) => <span style={{ fontFamily: 'monospace', fontWeight: 800 }}>{m.id}</span> },
    { key: 'studentName', title: 'Student Name', render: (m) => <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{m.studentName} (Room {m.roomNumber})</span> },
    { key: 'buildingName', title: 'Building Block', render: (m) => m.buildingName },
    { key: 'symptomsDetails', title: 'Symptoms / Medical Case', render: (m) => <span style={{ fontSize: '11.5px', color: 'var(--text-primary)' }}>{m.symptomsDetails}</span> },
    { key: 'severity', title: 'Severity', render: (m) => <StatusBadge status={m.severity === 'Critical' || m.severity === 'Severe' ? 'danger' : 'warning'} label={m.severity} /> },
    { key: 'actionTaken', title: 'Action Taken', render: (m) => m.actionTaken },
    { key: 'status', title: 'Status', render: (m) => <StatusBadge status={m.status === 'Recovered' ? 'success' : 'warning'} label={m.status} /> },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName || !symptoms) return;
    logMedicalEmergency(studentName, roomNumber, buildings[0]?.buildingName || '', symptoms, severity);
    setShowModal(false);
    setStudentName('');
    setSymptoms('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', fontFamily: '"Outfit", sans-serif' }}>
      
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>Hostel Infirmary & Student Medical Records</h3>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>Track student medical conditions, infirmary care visits, emergency contacts, and hospital referrals.</p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          style={{ padding: '8px 14px', borderRadius: '8px', border: 'none', background: '#DC2626', color: '#FFF', fontSize: '12px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <Plus size={16} /> Log Medical Case
        </button>
      </div>

      <DataGrid columns={columns} data={medicalCases} />

      {/* Log Medical Case Modal */}
      {showModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex',
          alignItems: 'center', justifyContent: 'center', padding: '16px'
        }}>
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '24px', width: '100%', maxWidth: '460px' }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)' }}>Log Infirmary / Medical Emergency Case</h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={labelStyle}>Student Full Name</label>
                  <input type="text" value={studentName} onChange={(e) => setStudentName(e.target.value)} style={inputStyle} placeholder="e.g. Siya Patel" required />
                </div>
                <div>
                  <label style={labelStyle}>Room Number</label>
                  <input type="text" value={roomNumber} onChange={(e) => setRoomNumber(e.target.value)} style={inputStyle} required />
                </div>
              </div>
              <div>
                <label style={labelStyle}>Symptoms / Condition Details</label>
                <input type="text" value={symptoms} onChange={(e) => setSymptoms(e.target.value)} style={inputStyle} placeholder="e.g. Severe headache & 102°F fever." required />
              </div>
              <div>
                <label style={labelStyle}>Severity Level</label>
                <select value={severity} onChange={(e) => setSeverity(e.target.value as any)} style={inputStyle}>
                  <option value="Mild">Mild</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Severe">Severe</option>
                  <option value="Critical">Critical</option>
                </select>
              </div>
              <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                <button type="button" onClick={() => setShowModal(false)} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface-raised)', color: 'var(--text-primary)', fontWeight: 700, cursor: 'pointer' }}>
                  Cancel
                </button>
                <button type="submit" style={{ flex: 1, padding: '10px', borderRadius: '8px', border: 'none', background: '#DC2626', color: '#FFF', fontWeight: 700, cursor: 'pointer' }}>
                  Log Case & Alert Parent
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
