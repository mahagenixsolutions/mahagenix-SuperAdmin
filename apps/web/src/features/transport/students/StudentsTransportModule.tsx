import React, { useState } from 'react';
import { DataGrid } from '../../../components/erp/DataGrid';
import type { GridColumn } from '../../../components/erp/DataGrid';
import { StatusBadge } from '../../../components/erp/StatusBadge';
import { DetailDrawer } from '../../../components/erp/DetailDrawer';
import { useTransportStore } from '../shared/transportStore';
import type { StudentTransportAssignment } from '../shared/types';
import { Users, MapPin, Bus, CheckCircle2, Plus, Search, Phone } from 'lucide-react';

export default function StudentsTransportModule() {
  const { students, buses, routes, assignStudentToBus } = useTransportStore();
  const [search, setSearch] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<StudentTransportAssignment | null>(null);

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [studentName, setStudentName] = useState('');
  const [classGrade, setClassGrade] = useState('Class 10-A');
  const [busNumber, setBusNumber] = useState(buses[0]?.busNumber || 'BUS-01');
  const [routeName, setRouteName] = useState(routes[0]?.routeName || 'North Circuit Express');
  const [pickupPoint, setPickupPoint] = useState('');
  const [dropPoint, setDropPoint] = useState('School Main Gate');
  const [parentPhone, setParentPhone] = useState('+91 98765 43210');

  const filteredStudents = students.filter((s) => {
    const matchSearch =
      s.studentName.toLowerCase().includes(search.toLowerCase()) ||
      s.studentId.toLowerCase().includes(search.toLowerCase()) ||
      s.routeName.toLowerCase().includes(search.toLowerCase());
    return matchSearch;
  });

  const columns: GridColumn<StudentTransportAssignment>[] = [
    { key: 'studentId', title: 'Student ID', render: (s) => <span style={{ fontFamily: 'monospace', fontWeight: 700 }}>{s.studentId}</span> },
    { key: 'studentName', title: 'Student Name', render: (s) => <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{s.studentName}</span> },
    { key: 'classGrade', title: 'Class Grade', render: (s) => s.classGrade },
    { key: 'busNumber', title: 'Assigned Bus', render: (s) => <span style={{ fontWeight: 800, color: '#10B981' }}>{s.busNumber}</span> },
    { key: 'routeName', title: 'Route Name', render: (s) => <StatusBadge status="info" label={s.routeName} /> },
    { key: 'pickupPoint', title: 'Pickup Stop', render: (s) => <span style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>{s.pickupPoint}</span> },
    { key: 'status', title: 'Status', render: (s) => <StatusBadge status={s.status === 'Assigned' ? 'success' : 'warning'} label={s.status} /> },
    {
      key: 'id',
      title: 'Action',
      render: (s) => (
        <button
          onClick={() => setSelectedStudent(s)}
          style={{ border: '1px solid var(--border-subtle)', background: 'var(--bg-surface-raised)', borderRadius: '6px', padding: '4px 8px', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}
        >
          View Details
        </button>
      ),
    },
  ];

  const handleAssignSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName || !pickupPoint) return;
    assignStudentToBus({
      studentName,
      classGrade,
      busNumber,
      routeName,
      pickupPoint,
      dropPoint,
      parentPhone,
    });
    setShowModal(false);
    setStudentName('');
    setPickupPoint('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', fontFamily: '"Outfit", sans-serif' }}>
      
      {/* Header Bar */}
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>Student Bus Allocation Directory</h3>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>Assign students to bus routes, pickup/drop points, and parent contact alerts.</p>
        </div>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--bg-surface-raised)', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '6px 12px' }}>
            <Search size={14} style={{ color: 'var(--text-secondary)' }} />
            <input
              type="text"
              placeholder="Search Student or Route..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '12px', color: 'var(--text-primary)' }}
            />
          </div>

          <button
            onClick={() => setShowModal(true)}
            style={{ padding: '8px 14px', borderRadius: '8px', border: 'none', background: '#10B981', color: '#FFF', fontSize: '12px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Plus size={16} /> Assign Student to Bus
          </button>
        </div>
      </div>

      <DataGrid columns={columns} data={filteredStudents} />

      {/* Student Transport Detail Drawer */}
      <DetailDrawer
        isOpen={!!selectedStudent}
        onClose={() => setSelectedStudent(null)}
        title={selectedStudent ? `${selectedStudent.studentName} — Transport Card` : 'Student Transport Card'}
      >
        {selectedStudent && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontFamily: '"Outfit", sans-serif' }}>
            <div style={{ background: 'var(--bg-surface-raised)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#10B981', textTransform: 'uppercase' }}>{selectedStudent.studentId} • {selectedStudent.classGrade}</span>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', margin: '4px 0' }}>{selectedStudent.studentName}</h3>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0 }}>Parent Phone: {selectedStudent.parentPhone}</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '12px' }}>
              <div style={{ padding: '10px', borderRadius: '8px', background: 'var(--bg-surface-raised)', border: '1px solid var(--border-subtle)' }}>
                <span style={{ color: 'var(--text-secondary)', display: 'block', fontSize: '11px' }}>Assigned Bus</span>
                <strong style={{ color: 'var(--text-primary)' }}>{selectedStudent.busNumber}</strong>
              </div>
              <div style={{ padding: '10px', borderRadius: '8px', background: 'var(--bg-surface-raised)', border: '1px solid var(--border-subtle)' }}>
                <span style={{ color: 'var(--text-secondary)', display: 'block', fontSize: '11px' }}>Assigned Route</span>
                <strong style={{ color: 'var(--text-primary)' }}>{selectedStudent.routeName}</strong>
              </div>
              <div style={{ padding: '10px', borderRadius: '8px', background: 'var(--bg-surface-raised)', border: '1px solid var(--border-subtle)' }}>
                <span style={{ color: 'var(--text-secondary)', display: 'block', fontSize: '11px' }}>Pickup Point</span>
                <strong style={{ color: 'var(--text-primary)' }}>{selectedStudent.pickupPoint} ({selectedStudent.pickupTime})</strong>
              </div>
              <div style={{ padding: '10px', borderRadius: '8px', background: 'var(--bg-surface-raised)', border: '1px solid var(--border-subtle)' }}>
                <span style={{ color: 'var(--text-secondary)', display: 'block', fontSize: '11px' }}>Drop Point</span>
                <strong style={{ color: 'var(--text-primary)' }}>{selectedStudent.dropPoint} ({selectedStudent.dropTime})</strong>
              </div>
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
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '24px', width: '100%', maxWidth: '480px' }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)' }}>Assign Student to Bus Route</h3>
            <form onSubmit={handleAssignSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={labelStyle}>Student Full Name</label>
                <input type="text" value={studentName} onChange={(e) => setStudentName(e.target.value)} style={inputStyle} placeholder="e.g. Siya Patel" required />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={labelStyle}>Class Grade</label>
                  <input type="text" value={classGrade} onChange={(e) => setClassGrade(e.target.value)} style={inputStyle} required />
                </div>
                <div>
                  <label style={labelStyle}>Assign Bus #</label>
                  <select value={busNumber} onChange={(e) => setBusNumber(e.target.value)} style={inputStyle}>
                    {buses.map((b) => (
                      <option key={b.id} value={b.busNumber}>{b.busNumber}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label style={labelStyle}>Assigned Route</label>
                <select value={routeName} onChange={(e) => setRouteName(e.target.value)} style={inputStyle}>
                  {routes.map((r) => (
                    <option key={r.id} value={r.routeName}>{r.routeName}</option>
                  ))}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Pickup Point / Stop</label>
                <input type="text" value={pickupPoint} onChange={(e) => setPickupPoint(e.target.value)} style={inputStyle} placeholder="e.g. Hebbal Circle Stop #3" required />
              </div>
              <div>
                <label style={labelStyle}>Parent Phone Number</label>
                <input type="text" value={parentPhone} onChange={(e) => setParentPhone(e.target.value)} style={inputStyle} required />
              </div>
              <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                <button type="button" onClick={() => setShowModal(false)} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface-raised)', color: 'var(--text-primary)', fontWeight: 700, cursor: 'pointer' }}>
                  Cancel
                </button>
                <button type="submit" style={{ flex: 1, padding: '10px', borderRadius: '8px', border: 'none', background: '#10B981', color: '#FFF', fontWeight: 700, cursor: 'pointer' }}>
                  Assign Student
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
