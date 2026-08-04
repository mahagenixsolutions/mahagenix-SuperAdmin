import React, { useState } from 'react';
import { DataGrid } from '../../../components/erp/DataGrid';
import type { GridColumn } from '../../../components/erp/DataGrid';
import { StatusBadge } from '../../../components/erp/StatusBadge';
import { DetailDrawer } from '../../../components/erp/DetailDrawer';
import { useLibraryStore } from '../shared/libraryStore';
import type { LibraryMember } from '../shared/types';
import { Users, UserCheck, ShieldAlert, Plus, Search } from 'lucide-react';

export default function MembersModule() {
  const { members, registerMember, circulation } = useLibraryStore();
  const [roleFilter, setRoleFilter] = useState<'All' | 'Student' | 'Teacher' | 'Staff'>('All');
  const [search, setSearch] = useState('');
  const [selectedMember, setSelectedMember] = useState<LibraryMember | null>(null);

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [role, setRole] = useState<'Student' | 'Teacher' | 'Staff'>('Student');
  const [gradeOrDept, setGradeOrDept] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const filteredMembers = members.filter((m) => {
    const matchRole = roleFilter === 'All' || m.role === roleFilter;
    const matchSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.memberNo.toLowerCase().includes(search.toLowerCase()) ||
      m.gradeOrDept.toLowerCase().includes(search.toLowerCase());
    return matchRole && matchSearch;
  });

  const columns: GridColumn<LibraryMember>[] = [
    { key: 'memberNo', title: 'Member ID', render: (m) => <span style={{ fontFamily: 'monospace', fontWeight: 700 }}>{m.memberNo}</span> },
    { key: 'name', title: 'Full Name', render: (m) => <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{m.name}</span> },
    { key: 'role', title: 'Role', render: (m) => <StatusBadge status={m.role === 'Student' ? 'info' : 'primary'} label={m.role} /> },
    { key: 'gradeOrDept', title: 'Class / Department', render: (m) => m.gradeOrDept },
    {
      key: 'currentlyBorrowed',
      title: 'Active Loans',
      render: (m) => (
        <span style={{ fontWeight: 700, color: m.currentlyBorrowed >= m.maxLimit ? '#EF4444' : 'var(--text-primary)' }}>
          {m.currentlyBorrowed} / {m.maxLimit} Books
        </span>
      ),
    },
    {
      key: 'unpaidFines',
      title: 'Unpaid Fines',
      render: (m) => (
        <span style={{ fontWeight: 700, color: m.unpaidFines > 0 ? '#EF4444' : 'var(--text-secondary)' }}>
          {m.unpaidFines > 0 ? `₹${m.unpaidFines}` : '₹0'}
        </span>
      ),
    },
    { key: 'status', title: 'Status', render: (m) => <StatusBadge status={m.status === 'Active' ? 'success' : 'danger'} label={m.status} /> },
    {
      key: 'id',
      title: 'Action',
      render: (m) => (
        <button
          onClick={() => setSelectedMember(m)}
          style={{ border: '1px solid var(--border-subtle)', background: 'var(--bg-surface-raised)', borderRadius: '6px', padding: '4px 8px', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}
        >
          View Profile
        </button>
      ),
    },
  ];

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !gradeOrDept) return;
    registerMember({
      name,
      role,
      gradeOrDept,
      email: email || `${name.toLowerCase().replace(/\s+/g, '.')}@school.edu`,
      phone: phone || '+91 99000 12345',
    });
    setShowModal(false);
    setName('');
    setGradeOrDept('');
    setEmail('');
    setPhone('');
  };

  const memberLoans = selectedMember
    ? circulation.filter((c) => c.memberId === selectedMember.id && c.status !== 'Returned')
    : [];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', fontFamily: '"Outfit", sans-serif' }}>
      
      {/* Header & Controls */}
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>Library Members Directory</h3>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>Manage Student, Teacher, and Staff library cards and borrowing privileges.</p>
        </div>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', border: '1px solid var(--border-subtle)', borderRadius: '8px', overflow: 'hidden' }}>
            {(['All', 'Student', 'Teacher', 'Staff'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setRoleFilter(r)}
                style={{ padding: '7px 12px', border: 'none', background: roleFilter === r ? '#4F46E5' : 'var(--bg-surface-raised)', color: roleFilter === r ? '#FFF' : 'var(--text-primary)', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}
              >
                {r}s
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowModal(true)}
            style={{ padding: '8px 14px', borderRadius: '8px', border: 'none', background: '#4F46E5', color: '#FFF', fontSize: '12px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Plus size={16} /> Register New Member
          </button>
        </div>
      </div>

      <DataGrid columns={columns} data={filteredMembers} />

      {/* Member Profile Drawer */}
      <DetailDrawer
        isOpen={!!selectedMember}
        onClose={() => setSelectedMember(null)}
        title={selectedMember ? `${selectedMember.name} — Profile` : 'Member Profile'}
      >
        {selectedMember && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontFamily: '"Outfit", sans-serif' }}>
            <div style={{ background: 'var(--bg-surface-raised)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#4F46E5' }}>{selectedMember.memberNo} • {selectedMember.role}</span>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', margin: '4px 0' }}>{selectedMember.name}</h3>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0 }}>Class / Department: {selectedMember.gradeOrDept}</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '12px' }}>
              <div style={{ padding: '10px', borderRadius: '8px', background: 'var(--bg-surface-raised)', border: '1px solid var(--border-subtle)' }}>
                <span style={{ color: 'var(--text-secondary)', display: 'block', fontSize: '11px' }}>Borrowed Quota</span>
                <strong style={{ color: selectedMember.currentlyBorrowed >= selectedMember.maxLimit ? '#EF4444' : 'var(--text-primary)' }}>{selectedMember.currentlyBorrowed} / {selectedMember.maxLimit} Books</strong>
              </div>
              <div style={{ padding: '10px', borderRadius: '8px', background: 'var(--bg-surface-raised)', border: '1px solid var(--border-subtle)' }}>
                <span style={{ color: 'var(--text-secondary)', display: 'block', fontSize: '11px' }}>Unpaid Fines</span>
                <strong style={{ color: selectedMember.unpaidFines > 0 ? '#EF4444' : '#10B981' }}>₹{selectedMember.unpaidFines}</strong>
              </div>
              <div style={{ padding: '10px', borderRadius: '8px', background: 'var(--bg-surface-raised)', border: '1px solid var(--border-subtle)' }}>
                <span style={{ color: 'var(--text-secondary)', display: 'block', fontSize: '11px' }}>Email</span>
                <strong style={{ color: 'var(--text-primary)' }}>{selectedMember.email}</strong>
              </div>
              <div style={{ padding: '10px', borderRadius: '8px', background: 'var(--bg-surface-raised)', border: '1px solid var(--border-subtle)' }}>
                <span style={{ color: 'var(--text-secondary)', display: 'block', fontSize: '11px' }}>Phone</span>
                <strong style={{ color: 'var(--text-primary)' }}>{selectedMember.phone}</strong>
              </div>
            </div>

            <div>
              <h4 style={{ fontSize: '14px', fontWeight: 800, margin: '0 0 8px 0', color: 'var(--text-primary)' }}>Current Active Loans ({memberLoans.length})</h4>
              {memberLoans.length === 0 ? (
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>No active borrowed books.</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {memberLoans.map((l) => (
                    <div key={l.id} style={{ padding: '10px', borderRadius: '8px', background: 'var(--bg-surface-raised)', border: '1px solid var(--border-subtle)', fontSize: '12px' }}>
                      <strong style={{ color: 'var(--text-primary)' }}>{l.bookTitle}</strong>
                      <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Issued: {l.issueDate} • Due: <span style={{ color: l.status === 'Overdue' ? '#EF4444' : 'inherit', fontWeight: 700 }}>{l.dueDate}</span></div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </DetailDrawer>

      {/* Register Member Modal */}
      {showModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex',
          alignItems: 'center', justifyContent: 'center', padding: '16px'
        }}>
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '24px', width: '100%', maxWidth: '460px' }}>
            <h3 style={{ margin: '0 0 14px 0', fontSize: '17px', fontWeight: 800, color: 'var(--text-primary)' }}>Register New Library Member</h3>
            <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={labelStyle}>Full Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} placeholder="e.g. Dr. Ramesh Kumar" required />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={labelStyle}>Member Role</label>
                  <select value={role} onChange={(e) => setRole(e.target.value as any)} style={inputStyle}>
                    <option value="Student">Student</option>
                    <option value="Teacher">Teacher</option>
                    <option value="Staff">Staff</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Class / Department</label>
                  <input type="text" value={gradeOrDept} onChange={(e) => setGradeOrDept(e.target.value)} style={inputStyle} placeholder="Class 10-A / Science Dept" required />
                </div>
              </div>
              <div>
                <label style={labelStyle}>Email Address</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} placeholder="email@school.edu" />
              </div>
              <div>
                <label style={labelStyle}>Phone Number</label>
                <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} style={inputStyle} placeholder="+91 98765 43210" />
              </div>
              <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                <button type="button" onClick={() => setShowModal(false)} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface-raised)', color: 'var(--text-primary)', fontWeight: 700, cursor: 'pointer' }}>
                  Cancel
                </button>
                <button type="submit" style={{ flex: 1, padding: '10px', borderRadius: '8px', border: 'none', background: '#4F46E5', color: '#FFF', fontWeight: 700, cursor: 'pointer' }}>
                  Generate Library Card
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
