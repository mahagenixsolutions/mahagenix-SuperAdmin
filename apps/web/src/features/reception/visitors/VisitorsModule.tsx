import React, { useState } from 'react';
import { DataGrid } from '../../../components/erp/DataGrid';
import type { GridColumn } from '../../../components/erp/DataGrid';
import { StatusBadge } from '../../../components/erp/StatusBadge';
import { useReceptionStore } from '../shared/receptionStore';
import type { VisitorPass } from '../shared/types';
import { Users, Clock, ShieldCheck, Printer, Plus, CheckCircle2 } from 'lucide-react';

export default function VisitorsModule() {
  const { visitors, registerVisitor, checkOutVisitor } = useReceptionStore();
  const [showModal, setShowModal] = useState(false);
  const [printBadge, setPrintBadge] = useState<VisitorPass | null>(null);

  // Form State
  const [visitorName, setVisitorName] = useState('');
  const [phone, setPhone] = useState('');
  const [relation, setRelation] = useState('Parent / Prospect');
  const [purpose, setPurpose] = useState<VisitorPass['purpose']>('Admission Inquiry');
  const [hostEmployee, setHostEmployee] = useState('Mrs. Sunita Deshmukh (Admission Counsellor)');
  const [idType, setIdType] = useState<VisitorPass['idProofType']>('Aadhaar Card');
  const [idNum, setIdNum] = useState('');

  const columns: GridColumn<VisitorPass>[] = [
    { key: 'badgeNumber', title: 'Badge #', render: (v) => <span style={{ fontFamily: 'monospace', fontWeight: 800 }}>{v.badgeNumber}</span> },
    { key: 'visitorName', title: 'Visitor Name', render: (v) => <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{v.visitorName}</span> },
    { key: 'relation', title: 'Category', render: (v) => <StatusBadge status="info" label={v.relation} /> },
    { key: 'purpose', title: 'Purpose of Visit', render: (v) => v.purpose },
    { key: 'hostEmployee', title: 'Meeting Host', render: (v) => <span style={{ fontWeight: 700, color: '#0284C7' }}>{v.hostEmployee}</span> },
    { key: 'checkInTime', title: 'Check In / Out', render: (v) => `${v.checkInTime} ${v.checkOutTime ? `- ${v.checkOutTime}` : ''}` },
    { key: 'status', title: 'Campus Status', render: (v) => <StatusBadge status={v.status === 'Checked Out' ? 'success' : 'warning'} label={v.status} /> },
    {
      key: 'id',
      title: 'Pass Action',
      render: (v) => (
        <div style={{ display: 'flex', gap: '6px' }}>
          {v.status === 'In Campus' && (
            <button
              onClick={() => checkOutVisitor(v.id)}
              style={{ border: 'none', background: '#10B981', color: '#FFF', padding: '4px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}
            >
              Check Out
            </button>
          )}
          <button
            onClick={() => setPrintBadge(v)}
            style={{ border: '1px solid var(--border-subtle)', background: 'var(--bg-surface-raised)', borderRadius: '6px', padding: '4px 8px', fontSize: '11px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            <Printer size={12} /> Badge
          </button>
        </div>
      ),
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!visitorName || !phone) return;
    registerVisitor(visitorName, phone, relation, purpose, hostEmployee, idType, idNum || 'XXXX-XXXX-1234');
    setShowModal(false);
    setVisitorName('');
    setPhone('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', fontFamily: '"Outfit", sans-serif' }}>
      
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>Visitor Registration & Thermal Badge Issuance</h3>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>Register visitors, verify government IDs, notify host employees, and issue visitor badges.</p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          style={{ padding: '8px 14px', borderRadius: '8px', border: 'none', background: '#0284C7', color: '#FFF', fontSize: '12px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <Plus size={16} /> Register New Visitor
        </button>
      </div>

      <DataGrid columns={columns} data={visitors} />

      {/* Register Visitor Modal */}
      {showModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex',
          alignItems: 'center', justifyContent: 'center', padding: '16px'
        }}>
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '24px', width: '100%', maxWidth: '460px' }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)' }}>Register Visitor & Issue Badge</h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={labelStyle}>Visitor Full Name</label>
                <input type="text" value={visitorName} onChange={(e) => setVisitorName(e.target.value)} style={inputStyle} placeholder="e.g. Rohan Varma" required />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={labelStyle}>Phone Contact</label>
                  <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} style={inputStyle} placeholder="+91 98000 00000" required />
                </div>
                <div>
                  <label style={labelStyle}>Category / Relation</label>
                  <input type="text" value={relation} onChange={(e) => setRelation(e.target.value)} style={inputStyle} required />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={labelStyle}>Purpose of Visit</label>
                  <select value={purpose} onChange={(e) => setPurpose(e.target.value as any)} style={inputStyle}>
                    <option value="Admission Inquiry">Admission Inquiry</option>
                    <option value="Parent Meeting">Parent Meeting</option>
                    <option value="Vendor Meeting">Vendor Meeting</option>
                    <option value="Official Work">Official Work</option>
                    <option value="Student Pickup">Student Pickup</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Host Employee</label>
                  <input type="text" value={hostEmployee} onChange={(e) => setHostEmployee(e.target.value)} style={inputStyle} required />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={labelStyle}>ID Proof Type</label>
                  <select value={idType} onChange={(e) => setIdType(e.target.value as any)} style={inputStyle}>
                    <option value="Aadhaar Card">Aadhaar Card</option>
                    <option value="Driving License">Driving License</option>
                    <option value="PAN Card">PAN Card</option>
                    <option value="Passport">Passport</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>ID Number</label>
                  <input type="text" value={idNum} onChange={(e) => setIdNum(e.target.value)} style={inputStyle} placeholder="XXXX-XXXX-8890" />
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                <button type="button" onClick={() => setShowModal(false)} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface-raised)', color: 'var(--text-primary)', fontWeight: 700, cursor: 'pointer' }}>
                  Cancel
                </button>
                <button type="submit" style={{ flex: 1, padding: '10px', borderRadius: '8px', border: 'none', background: '#0284C7', color: '#FFF', fontWeight: 700, cursor: 'pointer' }}>
                  Issue Badge & Check In
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Printable Visitor Badge Modal */}
      {printBadge && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex',
          alignItems: 'center', justifyContent: 'center', padding: '16px'
        }}>
          <div style={{ background: '#FFF', color: '#111827', borderRadius: '16px', padding: '24px', width: '100%', maxWidth: '380px', textAlign: 'center', fontFamily: 'sans-serif' }}>
            <div style={{ borderBottom: '2px solid #0284C7', paddingBottom: '10px', marginBottom: '12px' }}>
              <span style={{ fontSize: '10px', fontWeight: 800, color: '#0284C7', textTransform: 'uppercase', letterSpacing: '1px' }}>SCHOOL ERP CAMPUS VISITOR BADGE</span>
              <h2 style={{ fontSize: '28px', fontWeight: 900, margin: '4px 0', color: '#111827', fontFamily: 'monospace' }}>{printBadge.badgeNumber}</h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', textAlign: 'left', background: '#F3F4F6', padding: '12px', borderRadius: '10px', marginBottom: '16px' }}>
              <div><strong>Visitor Name:</strong> {printBadge.visitorName}</div>
              <div><strong>Category:</strong> {printBadge.relation}</div>
              <div><strong>Purpose:</strong> {printBadge.purpose}</div>
              <div><strong>Host Employee:</strong> {printBadge.hostEmployee}</div>
              <div><strong>Check In Time:</strong> {printBadge.checkInTime}</div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setPrintBadge(null)} style={{ flex: 1, padding: '9px', borderRadius: '8px', border: '1px solid #D1D5DB', background: '#F3F4F6', color: '#111827', fontWeight: 700, cursor: 'pointer' }}>Close</button>
              <button onClick={() => { window.print(); setPrintBadge(null); }} style={{ flex: 1, padding: '9px', borderRadius: '8px', border: 'none', background: '#0284C7', color: '#FFF', fontWeight: 700, cursor: 'pointer' }}>Print Badge</button>
            </div>
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
