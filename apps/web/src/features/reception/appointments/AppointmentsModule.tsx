import React, { useState } from 'react';
import { DataGrid } from '../../../components/erp/DataGrid';
import type { GridColumn } from '../../../components/erp/DataGrid';
import { StatusBadge } from '../../../components/erp/StatusBadge';
import { useReceptionStore } from '../shared/receptionStore';
import type { AppointmentRecord } from '../shared/types';
import { Calendar, Clock, UserCheck, CheckCircle2, Plus } from 'lucide-react';

export default function AppointmentsModule() {
  const { appointments, bookAppointment } = useReceptionStore();
  const [showModal, setShowModal] = useState(false);

  // Form State
  const [visitorName, setVisitorName] = useState('');
  const [relation, setRelation] = useState('Parent');
  const [phone, setPhone] = useState('');
  const [hostName, setHostName] = useState('Dr. Ramesh Chandra');
  const [hostRole, setHostRole] = useState<AppointmentRecord['hostRole']>('Principal');
  const [date, setDate] = useState('2026-07-24');
  const [timeSlot, setTimeSlot] = useState('11:00 AM - 11:30 AM');
  const [purpose, setPurpose] = useState('Academic progress meeting');

  const columns: GridColumn<AppointmentRecord>[] = [
    { key: 'appointmentCode', title: 'Appt Code', render: (a) => <span style={{ fontFamily: 'monospace', fontWeight: 800 }}>{a.appointmentCode}</span> },
    { key: 'visitorName', title: 'Visitor Name', render: (a) => <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{a.visitorName}</span> },
    { key: 'hostName', title: 'Meeting Host', render: (a) => <span style={{ fontWeight: 700, color: '#0284C7' }}>{a.hostName} ({a.hostRole})</span> },
    { key: 'purpose', title: 'Purpose', render: (a) => a.purpose },
    { key: 'date', title: 'Scheduled Date', render: (a) => a.date },
    { key: 'timeSlot', title: 'Time Slot', render: (a) => <span style={{ fontWeight: 700, color: '#0284C7' }}>{a.timeSlot}</span> },
    { key: 'status', title: 'Status', render: (a) => <StatusBadge status={a.status === 'Completed' ? 'success' : a.status === 'Upcoming' ? 'info' : 'warning'} label={a.status} /> },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!visitorName) return;
    bookAppointment(visitorName, relation, phone || '+91 98000 00000', hostName, hostRole, date, timeSlot, purpose);
    setShowModal(false);
    setVisitorName('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', fontFamily: '"Outfit", sans-serif' }}>
      
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>Principal & Faculty Appointment Scheduler</h3>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>Schedule meetings with Principal, Vice Principal, Academic Coordinators, and Teachers.</p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          style={{ padding: '8px 14px', borderRadius: '8px', border: 'none', background: '#0284C7', color: '#FFF', fontSize: '12px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <Plus size={16} /> Book Appointment
        </button>
      </div>

      <DataGrid columns={columns} data={appointments} />

      {/* Book Appointment Modal */}
      {showModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex',
          alignItems: 'center', justifyContent: 'center', padding: '16px'
        }}>
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '24px', width: '100%', maxWidth: '460px' }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)' }}>Book Principal / Faculty Appointment</h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={labelStyle}>Visitor Full Name</label>
                <input type="text" value={visitorName} onChange={(e) => setVisitorName(e.target.value)} style={inputStyle} placeholder="e.g. Dr. Meena Swaminathan" required />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={labelStyle}>Host Role</label>
                  <select value={hostRole} onChange={(e) => setHostRole(e.target.value as any)} style={inputStyle}>
                    <option value="Principal">Principal</option>
                    <option value="Vice Principal">Vice Principal</option>
                    <option value="Academic Coordinator">Academic Coordinator</option>
                    <option value="Class Teacher">Class Teacher</option>
                    <option value="Counsellor">Counsellor</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Host Employee Name</label>
                  <input type="text" value={hostName} onChange={(e) => setHostName(e.target.value)} style={inputStyle} required />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={labelStyle}>Scheduled Date</label>
                  <input type="date" value={date} onChange={(e) => setDate(e.target.value)} style={inputStyle} required />
                </div>
                <div>
                  <label style={labelStyle}>Time Slot</label>
                  <input type="text" value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)} style={inputStyle} required />
                </div>
              </div>
              <div>
                <label style={labelStyle}>Meeting Purpose</label>
                <input type="text" value={purpose} onChange={(e) => setPurpose(e.target.value)} style={inputStyle} required />
              </div>
              <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                <button type="button" onClick={() => setShowModal(false)} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface-raised)', color: 'var(--text-primary)', fontWeight: 700, cursor: 'pointer' }}>
                  Cancel
                </button>
                <button type="submit" style={{ flex: 1, padding: '10px', borderRadius: '8px', border: 'none', background: '#0284C7', color: '#FFF', fontWeight: 700, cursor: 'pointer' }}>
                  Confirm Booking
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
