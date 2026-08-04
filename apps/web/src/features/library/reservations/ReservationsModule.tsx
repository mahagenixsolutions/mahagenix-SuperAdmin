import React, { useState } from 'react';
import { DataGrid } from '../../../components/erp/DataGrid';
import type { GridColumn } from '../../../components/erp/DataGrid';
import { StatusBadge } from '../../../components/erp/StatusBadge';
import { useLibraryStore } from '../shared/libraryStore';
import type { BookReservation } from '../shared/types';
import { Bookmark, Clock, CheckCircle2, Plus } from 'lucide-react';

export default function ReservationsModule() {
  const { reservations, books, members, reserveBook, issueBook, showToast } = useLibraryStore();
  const [showModal, setShowModal] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState(members[0]?.id || '');
  const [selectedBookId, setSelectedBookId] = useState(books[0]?.id || '');

  const columns: GridColumn<BookReservation>[] = [
    { key: 'queueNo', title: 'Queue #', render: (r) => <span style={{ fontWeight: 800, color: '#4F46E5' }}>#{r.queueNo}</span> },
    { key: 'bookTitle', title: 'Book Title', render: (r) => <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{r.bookTitle}</span> },
    { key: 'memberName', title: 'Reserved By', render: (r) => r.memberName },
    { key: 'reserveDate', title: 'Reserved Date', render: (r) => r.reserveDate },
    { key: 'expiryDate', title: 'Pickup Expiry', render: (r) => r.expiryDate },
    {
      key: 'status',
      title: 'Status',
      render: (r) => (
        <StatusBadge
          status={r.status === 'Ready for Pickup' ? 'success' : r.status === 'Pending' ? 'warning' : 'info'}
          label={r.status}
        />
      ),
    },
    {
      key: 'id',
      title: 'Action',
      render: (r) => (
        <div style={{ display: 'flex', gap: '6px' }}>
          <button
            onClick={() => {
              issueBook(r.memberId, r.bookId);
              showToast(`Reservation fulfilled for ${r.memberName}`);
            }}
            style={{ border: 'none', background: '#4F46E5', color: '#FFF', borderRadius: '6px', padding: '4px 8px', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}
          >
            Fulfill & Issue
          </button>
        </div>
      ),
    },
  ];

  const handleReserveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMemberId || !selectedBookId) return;
    reserveBook(selectedMemberId, selectedBookId);
    setShowModal(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', fontFamily: '"Outfit", sans-serif' }}>
      
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>Book Reservation Queue</h3>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>Manage hold requests and notification alerts for high-demand titles.</p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          style={{ padding: '8px 14px', borderRadius: '8px', border: 'none', background: '#4F46E5', color: '#FFF', fontSize: '12px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <Plus size={16} /> New Reservation
        </button>
      </div>

      <DataGrid columns={columns} data={reservations} />

      {/* New Reservation Modal */}
      {showModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex',
          alignItems: 'center', justifyContent: 'center', padding: '16px'
        }}>
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '24px', width: '100%', maxWidth: '440px' }}>
            <h3 style={{ margin: '0 0 14px 0', fontSize: '17px', fontWeight: 800, color: 'var(--text-primary)' }}>Add Book Reservation</h3>
            <form onSubmit={handleReserveSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={labelStyle}>Select Member</label>
                <select value={selectedMemberId} onChange={(e) => setSelectedMemberId(e.target.value)} style={inputStyle} required>
                  {members.map((m) => (
                    <option key={m.id} value={m.id}>{m.name} ({m.role} - {m.gradeOrDept})</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={labelStyle}>Select Book</label>
                <select value={selectedBookId} onChange={(e) => setSelectedBookId(e.target.value)} style={inputStyle} required>
                  {books.map((b) => (
                    <option key={b.id} value={b.id}>{b.title} (Available: {b.availableCopies}/{b.totalCopies})</option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                <button type="button" onClick={() => setShowModal(false)} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface-raised)', color: 'var(--text-primary)', fontWeight: 700, cursor: 'pointer' }}>
                  Cancel
                </button>
                <button type="submit" style={{ flex: 1, padding: '10px', borderRadius: '8px', border: 'none', background: '#4F46E5', color: '#FFF', fontWeight: 700, cursor: 'pointer' }}>
                  Add to Queue
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
