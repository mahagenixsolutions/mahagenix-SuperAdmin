import React, { useState } from 'react';
import { DataGrid } from '../../../components/erp/DataGrid';
import type { GridColumn } from '../../../components/erp/DataGrid';
import { StatusBadge } from '../../../components/erp/StatusBadge';
import { useReceptionStore } from '../shared/receptionStore';
import type { PhoneCallLog } from '../shared/types';
import { Phone, Clock, AlertTriangle, Plus } from 'lucide-react';

export default function CallLogModule() {
  const { callLogs, logPhoneCall } = useReceptionStore();
  const [showModal, setShowModal] = useState(false);

  // Form State
  const [callerName, setCallerName] = useState('');
  const [callerPhone, setCallerPhone] = useState('');
  const [callType, setCallType] = useState<PhoneCallLog['callType']>('Incoming');
  const [recipientDepartment, setRecipientDepartment] = useState<PhoneCallLog['recipientDepartment']>('Admissions');
  const [notes, setNotes] = useState('');
  const [followUpRequired, setFollowUpRequired] = useState(true);

  const columns: GridColumn<PhoneCallLog>[] = [
    { key: 'callRef', title: 'Call Ref', render: (c) => <span style={{ fontFamily: 'monospace', fontWeight: 800 }}>{c.callRef}</span> },
    { key: 'callerName', title: 'Caller Name', render: (c) => <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{c.callerName}</span> },
    { key: 'callerPhone', title: 'Phone Number', render: (c) => c.callerPhone },
    { key: 'callType', title: 'Direction', render: (c) => <StatusBadge status={c.callType === 'Incoming' ? 'info' : c.callType === 'Outgoing' ? 'success' : 'danger'} label={c.callType} /> },
    { key: 'recipientDepartment', title: 'Department', render: (c) => c.recipientDepartment },
    { key: 'callTime', title: 'Time / Duration', render: (c) => `${c.callTime} (${c.durationMinutes}m)` },
    { key: 'notes', title: 'Call Summary', render: (c) => <span style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>{c.notes}</span> },
    { key: 'followUpRequired', title: 'Follow-Up', render: (c) => <StatusBadge status={c.followUpRequired ? 'warning' : 'success'} label={c.followUpRequired ? 'Required' : 'Done'} /> },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!callerName) return;
    logPhoneCall(callerName, callerPhone || '+91 98000 00000', callType, recipientDepartment, notes || 'Call logged', followUpRequired);
    setShowModal(false);
    setCallerName('');
    setNotes('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', fontFamily: '"Outfit", sans-serif' }}>
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>Phone Call Telephony & Follow-up Log</h3>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>Record incoming, outgoing, and missed front-desk phone calls with department tags and follow-ups.</p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          style={{ padding: '8px 14px', borderRadius: '8px', border: 'none', background: '#0284C7', color: '#FFF', fontSize: '12px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <Plus size={16} /> Record Phone Call
        </button>
      </div>

      <DataGrid columns={columns} data={callLogs} />

      {/* Modal */}
      {showModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex',
          alignItems: 'center', justifyContent: 'center', padding: '16px'
        }}>
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '24px', width: '100%', maxWidth: '440px' }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)' }}>Record Telephony Phone Call</h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={labelStyle}>Caller Name</label>
                  <input type="text" value={callerName} onChange={(e) => setCallerName(e.target.value)} style={inputStyle} placeholder="e.g. Sunita Rao" required />
                </div>
                <div>
                  <label style={labelStyle}>Phone Number</label>
                  <input type="text" value={callerPhone} onChange={(e) => setCallerPhone(e.target.value)} style={inputStyle} placeholder="+91 98000 00000" required />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={labelStyle}>Call Direction</label>
                  <select value={callType} onChange={(e) => setCallType(e.target.value as any)} style={inputStyle}>
                    <option value="Incoming">Incoming</option>
                    <option value="Outgoing">Outgoing</option>
                    <option value="Missed">Missed</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Department</label>
                  <select value={recipientDepartment} onChange={(e) => setRecipientDepartment(e.target.value as any)} style={inputStyle}>
                    <option value="Admissions">Admissions</option>
                    <option value="Principal Office">Principal Office</option>
                    <option value="Accounts">Accounts</option>
                    <option value="Transport">Transport</option>
                    <option value="General Inquiry">General Inquiry</option>
                  </select>
                </div>
              </div>
              <div>
                <label style={labelStyle}>Call Notes / Summary</label>
                <input type="text" value={notes} onChange={(e) => setNotes(e.target.value)} style={inputStyle} placeholder="e.g. Inquired about admission fee." required />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input type="checkbox" id="followUpCheck" checked={followUpRequired} onChange={(e) => setFollowUpRequired(e.target.checked)} />
                <label htmlFor="followUpCheck" style={{ fontSize: '12px', color: 'var(--text-primary)', cursor: 'pointer' }}>Requires Follow-Up Call</label>
              </div>
              <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                <button type="button" onClick={() => setShowModal(false)} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface-raised)', color: 'var(--text-primary)', fontWeight: 700, cursor: 'pointer' }}>
                  Cancel
                </button>
                <button type="submit" style={{ flex: 1, padding: '10px', borderRadius: '8px', border: 'none', background: '#0284C7', color: '#FFF', fontWeight: 700, cursor: 'pointer' }}>
                  Save Call Log
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
