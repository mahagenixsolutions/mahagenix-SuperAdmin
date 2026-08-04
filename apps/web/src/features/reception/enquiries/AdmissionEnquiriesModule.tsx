import React, { useState } from 'react';
import { DataGrid } from '../../../components/erp/DataGrid';
import type { GridColumn } from '../../../components/erp/DataGrid';
import { StatusBadge } from '../../../components/erp/StatusBadge';
import { DetailDrawer } from '../../../components/erp/DetailDrawer';
import { useReceptionStore } from '../shared/receptionStore';
import type { AdmissionEnquiry } from '../shared/types';
import { Search, Filter, Phone, Mail, Calendar, UserCheck, Plus } from 'lucide-react';

export default function AdmissionEnquiriesModule() {
  const { enquiries, createEnquiry } = useReceptionStore();
  const [search, setSearch] = useState('');
  const [selectedSource, setSelectedSource] = useState('');
  const [selectedLead, setSelectedLead] = useState<AdmissionEnquiry | null>(null);

  // Modal
  const [showModal, setShowModal] = useState(false);
  const [studentName, setStudentName] = useState('');
  const [parentName, setParentName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [grade, setGrade] = useState('Class 6');
  const [channel, setChannel] = useState<AdmissionEnquiry['channel']>('Walk-in');

  const filtered = enquiries.filter((e) => {
    const matchSearch =
      e.studentName.toLowerCase().includes(search.toLowerCase()) ||
      e.parentName.toLowerCase().includes(search.toLowerCase()) ||
      e.enquiryNumber.toLowerCase().includes(search.toLowerCase());
    const matchSource = !selectedSource || e.channel === selectedSource;
    return matchSearch && matchSource;
  });

  const columns: GridColumn<AdmissionEnquiry>[] = [
    { key: 'enquiryNumber', title: 'Ref #', render: (e) => <span style={{ fontFamily: 'monospace', fontWeight: 800 }}>{e.enquiryNumber}</span> },
    { key: 'studentName', title: 'Student Name', render: (e) => <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{e.studentName}</span> },
    { key: 'parentName', title: 'Parent / Guardian', render: (e) => e.parentName },
    { key: 'interestedGrade', title: 'Interested Grade', render: (e) => <StatusBadge status="info" label={e.interestedGrade} /> },
    { key: 'channel', title: 'Lead Source', render: (e) => e.channel },
    { key: 'counsellingStatus', title: 'Counselling Stage', render: (e) => <StatusBadge status="warning" label={e.counsellingStatus} /> },
    { key: 'followUpDate', title: 'Next Follow-up', render: (e) => e.followUpDate },
    {
      key: 'id',
      title: 'Action',
      render: (e) => (
        <button
          onClick={() => setSelectedLead(e)}
          style={{ border: '1px solid var(--border-subtle)', background: 'var(--bg-surface-raised)', borderRadius: '6px', padding: '4px 8px', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}
        >
          View Profile
        </button>
      ),
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName || !parentName) return;
    createEnquiry(studentName, parentName, phone || '+91 98000 00000', email || 'parent@school.edu', grade, channel);
    setShowModal(false);
    setStudentName('');
    setParentName('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', fontFamily: '"Outfit", sans-serif' }}>
      
      {/* Search & Filter Bar */}
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: '280px', background: 'var(--bg-surface-raised)', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '8px 12px' }}>
          <Search size={16} style={{ color: 'var(--text-secondary)' }} />
          <input
            type="text"
            placeholder="Search student name, parent name, enquiry ref..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '13px', color: 'var(--text-primary)' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <select
            value={selectedSource}
            onChange={(e) => setSelectedSource(e.target.value)}
            style={{ border: '1px solid var(--border-subtle)', background: 'var(--bg-surface-raised)', borderRadius: '8px', padding: '8px 12px', fontSize: '12px', color: 'var(--text-primary)', outline: 'none' }}
          >
            <option value="">All Lead Channels</option>
            <option value="Walk-in">Walk-in</option>
            <option value="Online Form">Online Form</option>
            <option value="Phone Call">Phone Call</option>
            <option value="Referral">Referral</option>
          </select>
          <button
            onClick={() => setShowModal(true)}
            style={{ padding: '8px 14px', borderRadius: '8px', border: 'none', background: '#0284C7', color: '#FFF', fontSize: '12px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Plus size={16} /> Create Admission Lead
          </button>
        </div>
      </div>

      <DataGrid columns={columns} data={filtered} />

      {/* DetailDrawer for Lead Profile */}
      <DetailDrawer
        isOpen={!!selectedLead}
        onClose={() => setSelectedLead(null)}
        title={selectedLead ? selectedLead.studentName : 'Admission Lead Details'}
      >
        {selectedLead && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontFamily: '"Outfit", sans-serif' }}>
            <div style={{ background: 'var(--bg-surface-raised)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#0284C7', textTransform: 'uppercase' }}>Ref {selectedLead.enquiryNumber} • Source: {selectedLead.channel}</span>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', margin: '4px 0' }}>{selectedLead.studentName}</h3>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0 }}>Seeking Admission to Grade: <strong>{selectedLead.interestedGrade}</strong></p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '12px' }}>
              <div style={{ padding: '10px', borderRadius: '8px', background: 'var(--bg-surface-raised)', border: '1px solid var(--border-subtle)' }}>
                <span style={{ color: 'var(--text-secondary)', display: 'block', fontSize: '11px' }}>Parent / Guardian</span>
                <strong style={{ color: 'var(--text-primary)' }}>{selectedLead.parentName}</strong>
              </div>
              <div style={{ padding: '10px', borderRadius: '8px', background: 'var(--bg-surface-raised)', border: '1px solid var(--border-subtle)' }}>
                <span style={{ color: 'var(--text-secondary)', display: 'block', fontSize: '11px' }}>Phone Contact</span>
                <strong style={{ color: 'var(--text-primary)' }}>{selectedLead.phone}</strong>
              </div>
              <div style={{ padding: '10px', borderRadius: '8px', background: 'var(--bg-surface-raised)', border: '1px solid var(--border-subtle)' }}>
                <span style={{ color: 'var(--text-secondary)', display: 'block', fontSize: '11px' }}>Email Address</span>
                <strong style={{ color: 'var(--text-primary)' }}>{selectedLead.email}</strong>
              </div>
              <div style={{ padding: '10px', borderRadius: '8px', background: 'var(--bg-surface-raised)', border: '1px solid var(--border-subtle)' }}>
                <span style={{ color: 'var(--text-secondary)', display: 'block', fontSize: '11px' }}>Counselling Stage</span>
                <strong style={{ color: '#0284C7' }}>{selectedLead.counsellingStatus}</strong>
              </div>
            </div>

            <div style={{ padding: '12px', borderRadius: '8px', background: 'var(--bg-surface-raised)', border: '1px solid var(--border-subtle)', fontSize: '12px' }}>
              <span style={{ fontSize: '11.5px', fontWeight: 800, color: 'var(--text-primary)', display: 'block', marginBottom: '4px' }}>Counsellor Interaction Notes</span>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0 }}>{selectedLead.notes || 'Enquiry recorded at front desk.'}</p>
            </div>
          </div>
        )}
      </DetailDrawer>

      {/* Modal */}
      {showModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex',
          alignItems: 'center', justifyContent: 'center', padding: '16px'
        }}>
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '24px', width: '100%', maxWidth: '460px' }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)' }}>Create Admission Lead</h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={labelStyle}>Student Full Name</label>
                  <input type="text" value={studentName} onChange={(e) => setStudentName(e.target.value)} style={inputStyle} placeholder="e.g. Kabir Varma" required />
                </div>
                <div>
                  <label style={labelStyle}>Parent Name</label>
                  <input type="text" value={parentName} onChange={(e) => setParentName(e.target.value)} style={inputStyle} placeholder="e.g. Rohan Varma" required />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={labelStyle}>Phone Contact</label>
                  <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} style={inputStyle} placeholder="+91 98000 00000" required />
                </div>
                <div>
                  <label style={labelStyle}>Interested Grade</label>
                  <input type="text" value={grade} onChange={(e) => setGrade(e.target.value)} style={inputStyle} required />
                </div>
              </div>
              <div>
                <label style={labelStyle}>Lead Source Channel</label>
                <select value={channel} onChange={(e) => setChannel(e.target.value as any)} style={inputStyle}>
                  <option value="Walk-in">Walk-in</option>
                  <option value="Online Form">Online Form</option>
                  <option value="Phone Call">Phone Call</option>
                  <option value="Referral">Referral</option>
                </select>
              </div>
              <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                <button type="button" onClick={() => setShowModal(false)} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface-raised)', color: 'var(--text-primary)', fontWeight: 700, cursor: 'pointer' }}>
                  Cancel
                </button>
                <button type="submit" style={{ flex: 1, padding: '10px', borderRadius: '8px', border: 'none', background: '#0284C7', color: '#FFF', fontWeight: 700, cursor: 'pointer' }}>
                  Create Lead
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
