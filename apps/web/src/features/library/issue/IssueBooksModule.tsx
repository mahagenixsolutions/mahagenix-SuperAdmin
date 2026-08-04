import React, { useState } from 'react';
import { BookOpen, Printer, CheckCircle2, UserCheck, Calendar, Search } from 'lucide-react';
import { DataGrid } from '../../../components/erp/DataGrid';
import type { GridColumn } from '../../../components/erp/DataGrid';
import { StatusBadge } from '../../../components/erp/StatusBadge';
import { useLibraryStore } from '../shared/libraryStore';
import type { CirculationRecord } from '../shared/types';

export default function IssueBooksModule() {
  const { books, members, circulation, issueBook, showToast } = useLibraryStore();
  const [selectedMemberId, setSelectedMemberId] = useState(members[0]?.id || '');
  const [selectedBookId, setSelectedBookId] = useState(books[0]?.id || '');
  const [customDueDate, setCustomDueDate] = useState('');
  const [printSlip, setPrintSlip] = useState<CirculationRecord | null>(null);

  const selectedMember = members.find((m) => m.id === selectedMemberId);
  const selectedBook = books.find((b) => b.id === selectedBookId);

  const handleIssueSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMemberId || !selectedBookId) return;

    const success = issueBook(selectedMemberId, selectedBookId, customDueDate || undefined);
    if (success) {
      const latest = circulation[0]; // Recent record
      if (latest) {
        setPrintSlip(latest);
      }
    }
  };

  const columns: GridColumn<CirculationRecord>[] = [
    { key: 'bookTitle', title: 'Book Title', render: (c) => <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{c.bookTitle}</span> },
    { key: 'memberName', title: 'Issued To', render: (c) => <span>{c.memberName} <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>({c.classGrade})</span></span> },
    { key: 'issueDate', title: 'Issue Date', render: (c) => c.issueDate },
    { key: 'dueDate', title: 'Due Date', render: (c) => <span style={{ fontWeight: 700, color: c.status === 'Overdue' ? '#EF4444' : 'var(--text-primary)' }}>{c.dueDate}</span> },
    { key: 'status', title: 'Status', render: (c) => <StatusBadge status={c.status === 'Issued' ? 'success' : c.status === 'Overdue' ? 'danger' : 'info'} label={c.status} /> },
    {
      key: 'id',
      title: 'Action',
      render: (c) => (
        <button
          onClick={() => setPrintSlip(c)}
          style={{ border: '1px solid var(--border-subtle)', background: 'var(--bg-surface-raised)', borderRadius: '6px', padding: '4px 8px', fontSize: '11px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
        >
          <Printer size={12} /> Print Slip
        </button>
      ),
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', fontFamily: '"Outfit", sans-serif' }}>
      
      {/* Issue Form Card */}
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '14px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 800, margin: 0, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <BookOpen size={18} style={{ color: '#4F46E5' }} /> Circulation Desk — Issue Book
        </h3>

        <form onSubmit={handleIssueSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
          <div>
            <label style={labelStyle}>Select Member</label>
            <select
              value={selectedMemberId}
              onChange={(e) => setSelectedMemberId(e.target.value)}
              style={inputStyle}
              required
            >
              {members.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name} ({m.role} - {m.gradeOrDept}) [{m.currentlyBorrowed}/{m.maxLimit} Books]
                </option>
              ))}
            </select>
          </div>

          <div>
            <label style={labelStyle}>Select Book from Catalog</label>
            <select
              value={selectedBookId}
              onChange={(e) => setSelectedBookId(e.target.value)}
              style={inputStyle}
              required
            >
              {books.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.title} (Available: {b.availableCopies}/{b.totalCopies}) - {b.shelfLocation}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label style={labelStyle}>Custom Due Date (Optional)</label>
            <input
              type="date"
              value={customDueDate}
              onChange={(e) => setCustomDueDate(e.target.value)}
              style={inputStyle}
            />
          </div>

          <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px', flexWrap: 'wrap', gap: '10px' }}>
            {selectedMember && selectedBook && (
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                Member Status: <strong style={{ color: selectedMember.currentlyBorrowed >= selectedMember.maxLimit ? '#EF4444' : '#10B981' }}>{selectedMember.currentlyBorrowed}/{selectedMember.maxLimit} Borrowed</strong> | Book Stock: <strong>{selectedBook.availableCopies} Copies Available</strong>
              </div>
            )}
            <button
              type="submit"
              style={{ padding: '10px 24px', borderRadius: '8px', border: 'none', background: '#4F46E5', color: '#FFF', fontWeight: 700, fontSize: '13px', cursor: 'pointer', boxShadow: '0 4px 12px rgba(79,70,229,0.25)' }}
            >
              Confirm & Issue Book →
            </button>
          </div>
        </form>
      </div>

      {/* Circulation History Table */}
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '14px', padding: '16px' }}>
        <h4 style={{ fontSize: '15px', fontWeight: 800, margin: '0 0 12px 0', color: 'var(--text-primary)' }}>Active Circulation Log</h4>
        <DataGrid columns={columns} data={circulation} />
      </div>

      {/* Printable Issue Slip Modal */}
      {printSlip && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex',
          alignItems: 'center', justifyContent: 'center', padding: '16px'
        }}>
          <div style={{ background: '#FFF', color: '#111827', borderRadius: '16px', padding: '24px', width: '100%', maxWidth: '420px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)', fontFamily: 'monospace' }}>
            <div style={{ textTransform: 'uppercase', textAlign: 'center', borderBottom: '2px dashed #374151', paddingBottom: '12px', marginBottom: '12px' }}>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800 }}>SCHOOL ERP LIBRARY DESK</h3>
              <p style={{ margin: '4px 0 0 0', fontSize: '11px' }}>BOOK ISSUE RECEIPT & BORROW SLIP</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px', marginBottom: '16px' }}>
              <div><strong>Receipt Ref:</strong> {printSlip.id}</div>
              <div><strong>Date:</strong> {printSlip.issueDate}</div>
              <div><strong>Member:</strong> {printSlip.memberName} ({printSlip.classGrade})</div>
              <div><strong>Role:</strong> {printSlip.memberRole}</div>
              <div style={{ borderTop: '1px solid #E5E7EB', paddingTop: '6px', marginTop: '6px' }}>
                <div><strong>Book Title:</strong> {printSlip.bookTitle}</div>
                <div><strong>ISBN:</strong> {printSlip.isbn}</div>
                <div><strong>Due Date:</strong> <span style={{ textDecoration: 'underline', fontWeight: 800 }}>{printSlip.dueDate}</span></div>
              </div>
            </div>

            <div style={{ borderTop: '2px dashed #374151', paddingTop: '12px', textAlign: 'center', fontSize: '11px' }}>
              <p style={{ margin: 0 }}>Please return book on or before Due Date to avoid ₹5/day overdue fine penalty.</p>
              <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
                <button onClick={() => setPrintSlip(null)} style={{ flex: 1, padding: '8px', borderRadius: '6px', border: '1px solid #D1D5DB', background: '#F3F4F6', color: '#111827', fontWeight: 700, cursor: 'pointer' }}>Close</button>
                <button onClick={() => { window.print(); setPrintSlip(null); }} style={{ flex: 1, padding: '8px', borderRadius: '6px', border: 'none', background: '#4F46E5', color: '#FFF', fontWeight: 700, cursor: 'pointer' }}>Print Slip</button>
              </div>
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
