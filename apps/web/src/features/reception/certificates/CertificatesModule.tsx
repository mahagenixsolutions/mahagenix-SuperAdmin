import React, { useState } from 'react';
import { DataGrid } from '../../../components/erp/DataGrid';
import type { GridColumn } from '../../../components/erp/DataGrid';
import { StatusBadge } from '../../../components/erp/StatusBadge';
import { useReceptionStore } from '../shared/receptionStore';
import type { CertificateRecord } from '../shared/types';
import { FileText, Printer, CheckCircle2, Award, Plus } from 'lucide-react';

export default function CertificatesModule() {
  const { certificates, issueCertificate } = useReceptionStore();
  const [showModal, setShowModal] = useState(false);
  const [printCert, setPrintCert] = useState<CertificateRecord | null>(null);

  // Form State
  const [studentId, setStudentId] = useState('STU-104');
  const [studentName, setStudentName] = useState('');
  const [classGrade, setClassGrade] = useState('Class 10-A');
  const [certificateType, setCertificateType] = useState<CertificateRecord['certificateType']>('Bonafide Certificate');

  const columns: GridColumn<CertificateRecord>[] = [
    { key: 'certificateNumber', title: 'Cert Ref #', render: (c) => <span style={{ fontFamily: 'monospace', fontWeight: 800 }}>{c.certificateNumber}</span> },
    { key: 'studentName', title: 'Student Name', render: (c) => <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{c.studentName} ({c.classGrade})</span> },
    { key: 'certificateType', title: 'Certificate Type', render: (c) => <StatusBadge status="info" label={c.certificateType} /> },
    { key: 'issueDate', title: 'Issue Date', render: (c) => c.issueDate },
    { key: 'verificationCode', title: 'Verification Code', render: (c) => <span style={{ fontSize: '11px', fontFamily: 'monospace', color: '#0284C7' }}>{c.verificationCode}</span> },
    { key: 'status', title: 'Status', render: (c) => <StatusBadge status={c.status === 'Printed' || c.status === 'Delivered' ? 'success' : 'warning'} label={c.status} /> },
    {
      key: 'id',
      title: 'Action',
      render: (c) => (
        <button
          onClick={() => setPrintCert(c)}
          style={{ border: 'none', background: '#0284C7', color: '#FFF', padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
        >
          <Printer size={12} /> Print Cert
        </button>
      ),
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName) return;
    issueCertificate(studentId, studentName, classGrade, certificateType);
    setShowModal(false);
    setStudentName('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', fontFamily: '"Outfit", sans-serif' }}>
      
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>Official Certificate Generator & Verification</h3>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>Generate Bonafide, Study, Character, and Transfer Certificates with official ERP digital verification.</p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          style={{ padding: '8px 14px', borderRadius: '8px', border: 'none', background: '#0284C7', color: '#FFF', fontSize: '12px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <Plus size={16} /> Issue Certificate
        </button>
      </div>

      <DataGrid columns={columns} data={certificates} />

      {/* Modal */}
      {showModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex',
          alignItems: 'center', justifyContent: 'center', padding: '16px'
        }}>
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '24px', width: '100%', maxWidth: '440px' }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)' }}>Issue Official Certificate</h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={labelStyle}>Student Full Name</label>
                  <input type="text" value={studentName} onChange={(e) => setStudentName(e.target.value)} style={inputStyle} placeholder="e.g. Aarav Sharma" required />
                </div>
                <div>
                  <label style={labelStyle}>Class Grade</label>
                  <input type="text" value={classGrade} onChange={(e) => setClassGrade(e.target.value)} style={inputStyle} required />
                </div>
              </div>
              <div>
                <label style={labelStyle}>Select Certificate Type</label>
                <select value={certificateType} onChange={(e) => setCertificateType(e.target.value as any)} style={inputStyle}>
                  <option value="Bonafide Certificate">Bonafide Certificate</option>
                  <option value="Transfer Certificate">Transfer Certificate</option>
                  <option value="Study Certificate">Study Certificate</option>
                  <option value="Character Certificate">Character Certificate</option>
                  <option value="Fee Payment Certificate">Fee Payment Certificate</option>
                </select>
              </div>
              <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                <button type="button" onClick={() => setShowModal(false)} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface-raised)', color: 'var(--text-primary)', fontWeight: 700, cursor: 'pointer' }}>
                  Cancel
                </button>
                <button type="submit" style={{ flex: 1, padding: '10px', borderRadius: '8px', border: 'none', background: '#0284C7', color: '#FFF', fontWeight: 700, cursor: 'pointer' }}>
                  Generate & Print
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Printable Certificate Modal */}
      {printCert && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex',
          alignItems: 'center', justifyContent: 'center', padding: '16px'
        }}>
          <div style={{ background: '#FFF', color: '#111827', borderRadius: '16px', padding: '32px', width: '100%', maxWidth: '520px', fontFamily: 'serif', border: '8px double #0284C7', textAlign: 'center' }}>
            <span style={{ fontSize: '11px', letterSpacing: '2px', fontWeight: 800, color: '#0284C7' }}>INTERNATIONAL SCHOOL CAMPUS</span>
            <h2 style={{ margin: '8px 0', fontSize: '22px', textTransform: 'uppercase', textDecoration: 'underline' }}>{printCert.certificateType}</h2>
            <p style={{ fontSize: '13px', lineHeight: 1.6, margin: '16px 0', fontStyle: 'italic' }}>
              This is to certify that <strong>{printCert.studentName}</strong> (Student Ref: {printCert.studentId}) is a bonafide student studying in <strong>{printCert.classGrade}</strong> for the Academic Session 2025–2026.
            </p>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '24px', fontSize: '11px', fontFamily: 'sans-serif' }}>
              <span>Issue Date: {printCert.issueDate}</span>
              <span>Verification Code: <strong>{printCert.verificationCode}</strong></span>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '24px', fontFamily: 'sans-serif' }}>
              <button onClick={() => setPrintCert(null)} style={{ flex: 1, padding: '9px', borderRadius: '8px', border: '1px solid #D1D5DB', background: '#F3F4F6', color: '#111827', fontWeight: 700, cursor: 'pointer' }}>Close</button>
              <button onClick={() => { window.print(); setPrintCert(null); }} style={{ flex: 1, padding: '9px', borderRadius: '8px', border: 'none', background: '#0284C7', color: '#FFF', fontWeight: 700, cursor: 'pointer' }}>Print Official Document</button>
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
