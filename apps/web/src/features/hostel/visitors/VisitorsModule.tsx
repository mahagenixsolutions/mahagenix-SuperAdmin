import React, { useState } from 'react';
import { DataGrid } from '../../../components/erp/DataGrid';
import type { GridColumn } from '../../../components/erp/DataGrid';
import { StatusBadge } from '../../../components/erp/StatusBadge';
import { useHostelStore } from '../shared/hostelStore';
import type { VisitorRecord, GatePassRecord } from '../shared/types';
import { Users, Clock, ShieldCheck, Plus } from 'lucide-react';

export default function VisitorsModule() {
  const { visitors, gatePasses, registerVisitor, issueGatePass } = useHostelStore();
  const [activeTab, setActiveTab] = useState<'visitors' | 'gatepasses'>('visitors');

  // Modals
  const [showVisitorModal, setShowVisitorModal] = useState(false);
  const [showPassModal, setShowPassModal] = useState(false);

  // Form State
  const [visitorName, setVisitorName] = useState('');
  const [relation, setRelation] = useState('Parent / Guardian');
  const [studentName, setStudentName] = useState('');
  const [studentRoom, setStudentRoom] = useState('A-101');
  const [phone, setPhone] = useState('');

  const [passStudentName, setPassStudentName] = useState('');
  const [passRoom, setPassRoom] = useState('A-101');
  const [passBuilding, setPassBuilding] = useState('Tagore Senior Boys Block A');
  const [passType, setPassType] = useState<GatePassRecord['passType']>('Local Outing');

  const visitorColumns: GridColumn<VisitorRecord>[] = [
    { key: 'gatePassId', title: 'Pass Ref #', render: (v) => <span style={{ fontFamily: 'monospace', fontWeight: 800 }}>{v.gatePassId}</span> },
    { key: 'visitorName', title: 'Visitor Name', render: (v) => <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{v.visitorName}</span> },
    { key: 'relation', title: 'Relation', render: (v) => v.relation },
    { key: 'studentName', title: 'Visiting Resident', render: (v) => <span style={{ fontWeight: 700, color: '#6366F1' }}>{v.studentName} (Room {v.studentRoom})</span> },
    { key: 'phone', title: 'Contact Phone', render: (v) => v.phone },
    { key: 'entryTime', title: 'Entry / Exit', render: (v) => `${v.entryTime} ${v.exitTime ? `- ${v.exitTime}` : ''}` },
    { key: 'status', title: 'Campus Status', render: (v) => <StatusBadge status={v.status === 'In Campus' ? 'warning' : 'success'} label={v.status} /> },
  ];

  const gatePassColumns: GridColumn<GatePassRecord>[] = [
    { key: 'id', title: 'Pass ID', render: (g) => <span style={{ fontFamily: 'monospace', fontWeight: 800 }}>{g.id}</span> },
    { key: 'studentName', title: 'Student Name', render: (g) => <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{g.studentName}</span> },
    { key: 'buildingName', title: 'Building & Room', render: (g) => `Room ${g.roomNumber} (${g.buildingName})` },
    { key: 'passType', title: 'Pass Type', render: (g) => <StatusBadge status="info" label={g.passType} /> },
    { key: 'outTime', title: 'Out Schedule', render: (g) => g.outTime },
    { key: 'expectedInTime', title: 'Expected Return', render: (g) => g.expectedInTime },
    { key: 'approvedBy', title: 'Approved By', render: (g) => g.approvedBy },
    { key: 'status', title: 'Pass Status', render: (g) => <StatusBadge status={g.status === 'Returned' ? 'success' : g.status === 'Out Side' ? 'warning' : 'info'} label={g.status} /> },
  ];

  const handleVisitorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!visitorName || !studentName) return;
    registerVisitor(visitorName, relation, studentName, studentRoom, phone || '+91 98000 00000');
    setShowVisitorModal(false);
    setVisitorName('');
    setStudentName('');
  };

  const handleGatePassSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passStudentName) return;
    issueGatePass(passStudentName, passRoom, passBuilding, passType, '04:00 PM', '07:30 PM');
    setShowPassModal(false);
    setPassStudentName('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', fontFamily: '"Outfit", sans-serif' }}>
      
      {/* Header & Tabs */}
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', background: 'var(--bg-surface-raised, #F1F5F9)', border: '1px solid var(--border-subtle, rgba(226, 232, 240, 0.8))', borderRadius: '9999px', padding: '4px 6px', gap: '4px' }}>
          <button
            onClick={() => setActiveTab('visitors')}
            style={{ padding: '8px 18px', borderRadius: '9999px', border: 'none', background: activeTab === 'visitors' ? '#ffffff' : 'transparent', color: activeTab === 'visitors' ? '#0284C7' : '#475569', fontWeight: activeTab === 'visitors' ? 700 : 600, fontSize: '13px', cursor: 'pointer', boxShadow: activeTab === 'visitors' ? '0 2px 8px rgba(2, 132, 199, 0.12), 0 1px 3px rgba(0, 0, 0, 0.06)' : 'none', transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)' }}
          >
            Campus Visitors Log ({visitors.length})
          </button>
          <button
            onClick={() => setActiveTab('gatepasses')}
            style={{ padding: '8px 18px', borderRadius: '9999px', border: 'none', background: activeTab === 'gatepasses' ? '#ffffff' : 'transparent', color: activeTab === 'gatepasses' ? '#0284C7' : '#475569', fontWeight: activeTab === 'gatepasses' ? 700 : 600, fontSize: '13px', cursor: 'pointer', boxShadow: activeTab === 'gatepasses' ? '0 2px 8px rgba(2, 132, 199, 0.12), 0 1px 3px rgba(0, 0, 0, 0.06)' : 'none', transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)' }}
          >
            Student Outing & Gate Passes ({gatePasses.length})
          </button>
        </div>

        {activeTab === 'visitors' ? (
          <button onClick={() => setShowVisitorModal(true)} style={addBtnStyle}><Plus size={16} /> Register Visitor</button>
        ) : (
          <button onClick={() => setShowPassModal(true)} style={addBtnStyle}><Plus size={16} /> Issue Gate Pass</button>
        )}
      </div>

      {activeTab === 'visitors' ? (
        <DataGrid columns={visitorColumns} data={visitors} />
      ) : (
        <DataGrid columns={gatePassColumns} data={gatePasses} />
      )}

      {/* Visitor Modal */}
      {showVisitorModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex',
          alignItems: 'center', justifyContent: 'center', padding: '16px'
        }}>
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '24px', width: '100%', maxWidth: '460px' }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)' }}>Register Campus Visitor</h3>
            <form onSubmit={handleVisitorSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={labelStyle}>Visitor Full Name</label>
                <input type="text" value={visitorName} onChange={(e) => setVisitorName(e.target.value)} style={inputStyle} placeholder="e.g. Ramesh Patel" required />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={labelStyle}>Relation with Student</label>
                  <input type="text" value={relation} onChange={(e) => setRelation(e.target.value)} style={inputStyle} required />
                </div>
                <div>
                  <label style={labelStyle}>Contact Phone</label>
                  <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} style={inputStyle} required />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={labelStyle}>Resident Student Name</label>
                  <input type="text" value={studentName} onChange={(e) => setStudentName(e.target.value)} style={inputStyle} placeholder="e.g. Siya Patel" required />
                </div>
                <div>
                  <label style={labelStyle}>Student Room Number</label>
                  <input type="text" value={studentRoom} onChange={(e) => setStudentRoom(e.target.value)} style={inputStyle} required />
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                <button type="button" onClick={() => setShowVisitorModal(false)} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface-raised)', color: 'var(--text-primary)', fontWeight: 700, cursor: 'pointer' }}>
                  Cancel
                </button>
                <button type="submit" style={{ flex: 1, padding: '10px', borderRadius: '8px', border: 'none', background: '#6366F1', color: '#FFF', fontWeight: 700, cursor: 'pointer' }}>
                  Register Visitor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Gate Pass Modal */}
      {showPassModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex',
          alignItems: 'center', justifyContent: 'center', padding: '16px'
        }}>
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '24px', width: '100%', maxWidth: '460px' }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)' }}>Issue Approved Student Gate Pass</h3>
            <form onSubmit={handleGatePassSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={labelStyle}>Student Full Name</label>
                <input type="text" value={passStudentName} onChange={(e) => setPassStudentName(e.target.value)} style={inputStyle} placeholder="e.g. Aarav Sharma" required />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={labelStyle}>Pass Type</label>
                  <select value={passType} onChange={(e) => setPassType(e.target.value as any)} style={inputStyle}>
                    <option value="Local Outing">Local Outing</option>
                    <option value="Weekend Leave">Weekend Leave</option>
                    <option value="Emergency Outing">Emergency Outing</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Room Number</label>
                  <input type="text" value={passRoom} onChange={(e) => setPassRoom(e.target.value)} style={inputStyle} required />
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                <button type="button" onClick={() => setShowPassModal(false)} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface-raised)', color: 'var(--text-primary)', fontWeight: 700, cursor: 'pointer' }}>
                  Cancel
                </button>
                <button type="submit" style={{ flex: 1, padding: '10px', borderRadius: '8px', border: 'none', background: '#6366F1', color: '#FFF', fontWeight: 700, cursor: 'pointer' }}>
                  Issue Pass
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const addBtnStyle: React.CSSProperties = {
  padding: '8px 14px',
  borderRadius: '8px',
  border: 'none',
  background: '#6366F1',
  color: '#FFF',
  fontSize: '12px',
  fontWeight: 700,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
};

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
