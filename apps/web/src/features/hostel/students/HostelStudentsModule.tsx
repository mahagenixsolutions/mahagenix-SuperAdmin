import React, { useState } from 'react';
import { DataGrid } from '../../../components/erp/DataGrid';
import type { GridColumn } from '../../../components/erp/DataGrid';
import { StatusBadge } from '../../../components/erp/StatusBadge';
import { DetailDrawer } from '../../../components/erp/DetailDrawer';
import { useHostelStore } from '../shared/hostelStore';
import type { HostelStudent } from '../shared/types';
import { Users, Bed, Building, Phone, HeartPulse, Search, Plus } from 'lucide-react';

export default function HostelStudentsModule() {
  const { students, buildings, rooms, allocateRoom } = useHostelStore();
  const [search, setSearch] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<HostelStudent | null>(null);

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [studentName, setStudentName] = useState('');
  const [classGrade, setClassGrade] = useState('Class 10-A');
  const [buildingName, setBuildingName] = useState(buildings[0]?.buildingName || '');
  const [roomNumber, setRoomNumber] = useState(rooms[0]?.roomNumber || 'A-101');

  const filteredStudents = students.filter((s) => {
    const matchSearch =
      s.studentName.toLowerCase().includes(search.toLowerCase()) ||
      s.studentId.toLowerCase().includes(search.toLowerCase()) ||
      s.roomNumber.toLowerCase().includes(search.toLowerCase()) ||
      s.buildingName.toLowerCase().includes(search.toLowerCase());
    return matchSearch;
  });

  const columns: GridColumn<HostelStudent>[] = [
    { key: 'studentId', title: 'Student ID', render: (s) => <span style={{ fontFamily: 'monospace', fontWeight: 700 }}>{s.studentId}</span> },
    { key: 'studentName', title: 'Resident Name', render: (s) => <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{s.studentName}</span> },
    { key: 'classGrade', title: 'Class', render: (s) => s.classGrade },
    { key: 'buildingName', title: 'Building Block', render: (s) => <StatusBadge status="info" label={s.buildingName} /> },
    { key: 'roomNumber', title: 'Room & Bed', render: (s) => <span style={{ fontWeight: 700, color: '#6366F1' }}>Room {s.roomNumber} ({s.bedNumber})</span> },
    { key: 'guardianName', title: 'Guardian', render: (s) => s.guardianName },
    { key: 'medicalConditions', title: 'Medical Alert', render: (s) => <span style={{ fontSize: '12px', color: s.medicalConditions ? '#EF4444' : 'var(--text-secondary)' }}>{s.medicalConditions || 'None'}</span> },
    { key: 'feeStatus', title: 'Hostel Fee', render: (s) => <StatusBadge status={s.feeStatus === 'Paid' ? 'success' : 'warning'} label={s.feeStatus} /> },
    {
      key: 'id',
      title: 'Action',
      render: (s) => (
        <button
          onClick={() => setSelectedStudent(s)}
          style={{ border: '1px solid var(--border-subtle)', background: 'var(--bg-surface-raised)', borderRadius: '6px', padding: '4px 8px', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}
        >
          View Profile
        </button>
      ),
    },
  ];

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName) return;
    allocateRoom(studentName, classGrade, buildingName, roomNumber);
    setShowModal(false);
    setStudentName('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', fontFamily: '"Outfit", sans-serif' }}>
      
      {/* Search & Header Bar */}
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>Hostel Resident Directory & Student Profiles</h3>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>Manage resident student profiles, room allocations, guardian contacts, and medical alerts.</p>
        </div>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--bg-surface-raised)', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '6px 12px' }}>
            <Search size={14} style={{ color: 'var(--text-secondary)' }} />
            <input
              type="text"
              placeholder="Search Student, Room or Building..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '12px', color: 'var(--text-primary)' }}
            />
          </div>

          <button
            onClick={() => setShowModal(true)}
            style={{ padding: '8px 14px', borderRadius: '8px', border: 'none', background: '#6366F1', color: '#FFF', fontSize: '12px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Plus size={16} /> Register & Allocate Resident
          </button>
        </div>
      </div>

      <DataGrid columns={columns} data={filteredStudents} />

      {/* Student Resident Detail Drawer */}
      <DetailDrawer
        isOpen={!!selectedStudent}
        onClose={() => setSelectedStudent(null)}
        title={selectedStudent ? `${selectedStudent.studentName} — Resident Card` : 'Resident Profile'}
      >
        {selectedStudent && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontFamily: '"Outfit", sans-serif' }}>
            <div style={{ background: 'var(--bg-surface-raised)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#6366F1', textTransform: 'uppercase' }}>{selectedStudent.studentId} • {selectedStudent.classGrade}</span>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', margin: '4px 0' }}>{selectedStudent.studentName}</h3>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0 }}>Room {selectedStudent.roomNumber} ({selectedStudent.bedNumber}) • {selectedStudent.buildingName}</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '12px' }}>
              <div style={{ padding: '10px', borderRadius: '8px', background: 'var(--bg-surface-raised)', border: '1px solid var(--border-subtle)' }}>
                <span style={{ color: 'var(--text-secondary)', display: 'block', fontSize: '11px' }}>Guardian Name</span>
                <strong style={{ color: 'var(--text-primary)' }}>{selectedStudent.guardianName}</strong>
              </div>
              <div style={{ padding: '10px', borderRadius: '8px', background: 'var(--bg-surface-raised)', border: '1px solid var(--border-subtle)' }}>
                <span style={{ color: 'var(--text-secondary)', display: 'block', fontSize: '11px' }}>Guardian Phone</span>
                <strong style={{ color: 'var(--text-primary)' }}>{selectedStudent.guardianPhone}</strong>
              </div>
              <div style={{ padding: '10px', borderRadius: '8px', background: 'var(--bg-surface-raised)', border: '1px solid var(--border-subtle)' }}>
                <span style={{ color: 'var(--text-secondary)', display: 'block', fontSize: '11px' }}>Emergency Contact</span>
                <strong style={{ color: '#EF4444' }}>{selectedStudent.emergencyContact}</strong>
              </div>
              <div style={{ padding: '10px', borderRadius: '8px', background: 'var(--bg-surface-raised)', border: '1px solid var(--border-subtle)' }}>
                <span style={{ color: 'var(--text-secondary)', display: 'block', fontSize: '11px' }}>Hostel Fee Status</span>
                <strong style={{ color: selectedStudent.feeStatus === 'Paid' ? '#10B981' : '#F59E0B' }}>{selectedStudent.feeStatus}</strong>
              </div>
            </div>

            <div style={{ padding: '12px', borderRadius: '8px', background: 'var(--bg-surface-raised)', border: '1px solid var(--border-subtle)', fontSize: '12px' }}>
              <span style={{ fontWeight: 800, color: 'var(--text-primary)', display: 'block', marginBottom: '4px' }}>Medical History & Allergy Notes</span>
              <p style={{ color: 'var(--text-secondary)', margin: 0 }}>{selectedStudent.medicalConditions || 'No chronic conditions or allergies reported.'}</p>
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
            <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)' }}>Register & Allocate Resident</h3>
            <form onSubmit={handleRegisterSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={labelStyle}>Student Full Name</label>
                <input type="text" value={studentName} onChange={(e) => setStudentName(e.target.value)} style={inputStyle} placeholder="e.g. Rahul Sharma" required />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={labelStyle}>Class Grade</label>
                  <input type="text" value={classGrade} onChange={(e) => setClassGrade(e.target.value)} style={inputStyle} required />
                </div>
                <div>
                  <label style={labelStyle}>Building Block</label>
                  <select value={buildingName} onChange={(e) => setBuildingName(e.target.value)} style={inputStyle}>
                    {buildings.map((b) => (
                      <option key={b.id} value={b.buildingName}>{b.buildingName}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label style={labelStyle}>Room Number</label>
                <select value={roomNumber} onChange={(e) => setRoomNumber(e.target.value)} style={inputStyle}>
                  {rooms.map((r) => (
                    <option key={r.id} value={r.roomNumber}>{r.roomNumber} ({r.roomType} — {r.availableBeds} beds vacant)</option>
                  ))}
                </select>
              </div>
              <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                <button type="button" onClick={() => setShowModal(false)} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface-raised)', color: 'var(--text-primary)', fontWeight: 700, cursor: 'pointer' }}>
                  Cancel
                </button>
                <button type="submit" style={{ flex: 1, padding: '10px', borderRadius: '8px', border: 'none', background: '#6366F1', color: '#FFF', fontWeight: 700, cursor: 'pointer' }}>
                  Register Resident
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
