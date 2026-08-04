import React, { useState } from 'react';
import { DataGrid } from '../../../components/erp/DataGrid';
import type { GridColumn } from '../../../components/erp/DataGrid';
import { StatusBadge } from '../../../components/erp/StatusBadge';
import { useHostelStore } from '../shared/hostelStore';
import type { RoomAllocationRecord } from '../shared/types';
import { Bed, ArrowRightLeft, CheckCircle2, Plus } from 'lucide-react';

export default function RoomAllocationModule() {
  const { allocations, buildings, rooms, allocateRoom, transferRoom } = useHostelStore();
  const [showModal, setShowModal] = useState(false);

  // Form State
  const [studentName, setStudentName] = useState('');
  const [classGrade, setClassGrade] = useState('Class 10-A');
  const [buildingName, setBuildingName] = useState(buildings[0]?.buildingName || '');
  const [roomNumber, setRoomNumber] = useState(rooms[0]?.roomNumber || 'A-101');

  const [transferTarget, setTransferTarget] = useState<RoomAllocationRecord | null>(null);
  const [newRoom, setNewRoom] = useState('A-102');

  const columns: GridColumn<RoomAllocationRecord>[] = [
    { key: 'id', title: 'Ref #', render: (a) => <span style={{ fontFamily: 'monospace', fontWeight: 800 }}>{a.id}</span> },
    { key: 'studentName', title: 'Student Name', render: (a) => <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{a.studentName}</span> },
    { key: 'classGrade', title: 'Class', render: (a) => a.classGrade },
    { key: 'buildingName', title: 'Building Block', render: (a) => <StatusBadge status="info" label={a.buildingName} /> },
    { key: 'roomNumber', title: 'Assigned Room', render: (a) => <span style={{ fontWeight: 800, color: '#6366F1' }}>{a.roomNumber} ({a.bedNumber})</span> },
    { key: 'allocationDate', title: 'Allocation Date', render: (a) => a.allocationDate },
    { key: 'status', title: 'Status', render: (a) => <StatusBadge status={a.status === 'Active' ? 'success' : 'warning'} label={a.status} /> },
    {
      key: 'id',
      title: 'Action',
      render: (a) => (
        <button
          onClick={() => setTransferTarget(a)}
          style={{ border: '1px solid var(--border-subtle)', background: 'var(--bg-surface-raised)', borderRadius: '6px', padding: '4px 8px', fontSize: '11px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
        >
          <ArrowRightLeft size={12} /> Transfer Room
        </button>
      ),
    },
  ];

  const handleAllocateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName) return;
    allocateRoom(studentName, classGrade, buildingName, roomNumber);
    setShowModal(false);
    setStudentName('');
  };

  const handleTransferSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!transferTarget) return;
    transferRoom(transferTarget.studentId, transferTarget.buildingName, newRoom);
    setTransferTarget(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', fontFamily: '"Outfit", sans-serif' }}>
      
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>Room Allocation & Transfer Desk</h3>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>Allocate new rooms to admitted students, process room transfers, and update bed vacancy rates.</p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          style={{ padding: '8px 14px', borderRadius: '8px', border: 'none', background: '#6366F1', color: '#FFF', fontSize: '12px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <Plus size={16} /> Allocate Room
        </button>
      </div>

      <DataGrid columns={columns} data={allocations} />

      {/* Allocate Room Modal */}
      {showModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex',
          alignItems: 'center', justifyContent: 'center', padding: '16px'
        }}>
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '24px', width: '100%', maxWidth: '460px' }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)' }}>Allocate Room to Student</h3>
            <form onSubmit={handleAllocateSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
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
                <label style={labelStyle}>Available Room Number</label>
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
                  Confirm Allocation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Transfer Room Modal */}
      {transferTarget && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex',
          alignItems: 'center', justifyContent: 'center', padding: '16px'
        }}>
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '24px', width: '100%', maxWidth: '440px' }}>
            <h3 style={{ margin: '0 0 14px 0', fontSize: '17px', fontWeight: 800, color: 'var(--text-primary)' }}>Transfer Student Room</h3>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '0 0 14px 0' }}>
              Transferring <strong>{transferTarget.studentName}</strong> from Room <strong>{transferTarget.roomNumber}</strong>.
            </p>
            <form onSubmit={handleTransferSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={labelStyle}>Select New Target Room</label>
                <select value={newRoom} onChange={(e) => setNewRoom(e.target.value)} style={inputStyle}>
                  {rooms.map((r) => (
                    <option key={r.id} value={r.roomNumber}>{r.roomNumber} ({r.roomType})</option>
                  ))}
                </select>
              </div>
              <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                <button type="button" onClick={() => setTransferTarget(null)} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface-raised)', color: 'var(--text-primary)', fontWeight: 700, cursor: 'pointer' }}>
                  Cancel
                </button>
                <button type="submit" style={{ flex: 1, padding: '10px', borderRadius: '8px', border: 'none', background: '#6366F1', color: '#FFF', fontWeight: 700, cursor: 'pointer' }}>
                  Process Transfer
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
