import React, { useState } from 'react';
import { DataGrid } from '../../../components/erp/DataGrid';
import type { GridColumn } from '../../../components/erp/DataGrid';
import { StatusBadge } from '../../../components/erp/StatusBadge';
import { useLibraryStore } from '../shared/libraryStore';
import type { CirculationRecord } from '../shared/types';
import { CheckCircle2, RotateCcw, AlertTriangle, ShieldCheck, Printer } from 'lucide-react';

export default function ReturnBooksModule() {
  const { circulation, returnBook, renewBook, showToast } = useLibraryStore();
  const [selectedCirc, setSelectedCirc] = useState<CirculationRecord | null>(null);
  const [condition, setCondition] = useState<'Good' | 'Fair' | 'Damaged' | 'Needs Repair'>('Good');
  const [finePaid, setFinePaid] = useState(true);
  const [waiveReason, setWaiveReason] = useState('');
  const [printReceipt, setPrintReceipt] = useState<CirculationRecord | null>(null);

  const handleReturnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCirc) return;
    returnBook(selectedCirc.id, condition, finePaid, waiveReason || undefined);
    setPrintReceipt(selectedCirc);
    setSelectedCirc(null);
    setWaiveReason('');
  };

  const columns: GridColumn<CirculationRecord>[] = [
    { key: 'bookTitle', title: 'Book Title', render: (c) => <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{c.bookTitle}</span> },
    { key: 'memberName', title: 'Borrower', render: (c) => <span>{c.memberName} <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>({c.classGrade})</span></span> },
    { key: 'issueDate', title: 'Issue Date', render: (c) => c.issueDate },
    { key: 'dueDate', title: 'Due Date', render: (c) => <span style={{ fontWeight: 700, color: c.status === 'Overdue' ? '#EF4444' : 'var(--text-primary)' }}>{c.dueDate}</span> },
    {
      key: 'fineAmount',
      title: 'Fine Assessed',
      render: (c) => (
        <span style={{ fontWeight: 700, color: c.fineAmount > 0 ? '#EF4444' : 'var(--text-secondary)' }}>
          {c.fineAmount > 0 ? `₹${c.fineAmount}` : '₹0'}
        </span>
      ),
    },
    { key: 'status', title: 'Status', render: (c) => <StatusBadge status={c.status === 'Returned' ? 'success' : c.status === 'Overdue' ? 'danger' : 'info'} label={c.status} /> },
    {
      key: 'id',
      title: 'Desk Actions',
      render: (c) =>
        c.status !== 'Returned' ? (
          <div style={{ display: 'flex', gap: '6px' }}>
            <button
              onClick={() => setSelectedCirc(c)}
              style={{ border: 'none', background: '#10B981', color: '#FFF', padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}
            >
              Check-in Book
            </button>
            <button
              onClick={() => renewBook(c.id)}
              style={{ border: '1px solid var(--border-subtle)', background: 'var(--bg-surface-raised)', color: 'var(--text-primary)', padding: '4px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}
            >
              Renew 14d
            </button>
          </div>
        ) : (
          <span style={{ fontSize: '11px', color: '#10B981', fontWeight: 700 }}>Returned on {c.returnDate}</span>
        ),
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', fontFamily: '"Outfit", sans-serif' }}>
      
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>Return Desk & Condition Check</h3>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>Process book check-ins, auto-calculate overdue fines, inspect wear/tear, and issue receipts.</p>
        </div>
      </div>

      <DataGrid columns={columns} data={circulation} />

      {/* Return Modal */}
      {selectedCirc && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex',
          alignItems: 'center', justifyContent: 'center', padding: '16px'
        }}>
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '24px', width: '100%', maxWidth: '460px' }}>
            <h3 style={{ margin: '0 0 14px 0', fontSize: '17px', fontWeight: 800, color: 'var(--text-primary)' }}>Book Check-in Inspection</h3>
            <div style={{ background: 'var(--bg-surface-raised)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-subtle)', marginBottom: '14px', fontSize: '12px' }}>
              <div><strong>Book:</strong> {selectedCirc.bookTitle}</div>
              <div><strong>Borrower:</strong> {selectedCirc.memberName} ({selectedCirc.classGrade})</div>
              <div><strong>Due Date:</strong> {selectedCirc.dueDate}</div>
            </div>

            <form onSubmit={handleReturnSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={labelStyle}>Physical Condition</label>
                <select value={condition} onChange={(e) => setCondition(e.target.value as any)} style={inputStyle}>
                  <option value="Good">Good (Normal Condition)</option>
                  <option value="Fair">Fair (Slight Wear)</option>
                  <option value="Needs Repair">Needs Repair (Torn Spine/Page)</option>
                  <option value="Damaged">Damaged (+₹250 Penalty)</option>
                </select>
              </div>

              <div>
                <label style={labelStyle}>Fine Payment Status</label>
                <select value={finePaid ? 'paid' : 'unpaid'} onChange={(e) => setFinePaid(e.target.value === 'paid')} style={inputStyle}>
                  <option value="paid">Collect Fine Now (Cash / Online)</option>
                  <option value="unpaid">Add Fine to Member Outstanding Balance</option>
                </select>
              </div>

              <div>
                <label style={labelStyle}>Waiver Reason (Optional)</label>
                <input type="text" value={waiveReason} onChange={(e) => setWaiveReason(e.target.value)} style={inputStyle} placeholder="e.g. Medical Leave Exemption" />
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                <button type="button" onClick={() => setSelectedCirc(null)} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface-raised)', color: 'var(--text-primary)', fontWeight: 700, cursor: 'pointer' }}>
                  Cancel
                </button>
                <button type="submit" style={{ flex: 1, padding: '10px', borderRadius: '8px', border: 'none', background: '#10B981', color: '#FFF', fontWeight: 700, cursor: 'pointer' }}>
                  Confirm Return & Receipt
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Printable Return Receipt Modal */}
      {printReceipt && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex',
          alignItems: 'center', justifyContent: 'center', padding: '16px'
        }}>
          <div style={{ background: '#FFF', color: '#111827', borderRadius: '16px', padding: '24px', width: '100%', maxWidth: '420px', fontFamily: 'monospace' }}>
            <div style={{ textTransform: 'uppercase', textAlign: 'center', borderBottom: '2px dashed #374151', paddingBottom: '12px', marginBottom: '12px' }}>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800 }}>LIBRARY RETURN RECEIPT</h3>
              <p style={{ margin: '4px 0 0 0', fontSize: '11px' }}>CHECK-IN CONFIRMATION</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px', marginBottom: '16px' }}>
              <div><strong>Ref:</strong> {printReceipt.id}</div>
              <div><strong>Return Date:</strong> {new Date().toISOString().split('T')[0]}</div>
              <div><strong>Member:</strong> {printReceipt.memberName}</div>
              <div style={{ borderTop: '1px solid #E5E7EB', paddingTop: '6px', marginTop: '6px' }}>
                <div><strong>Book:</strong> {printReceipt.bookTitle}</div>
                <div><strong>Condition:</strong> {condition}</div>
                <div><strong>Fine Assessed:</strong> ₹{printReceipt.fineAmount} ({finePaid ? 'PAID' : 'PENDING'})</div>
              </div>
            </div>

            <div style={{ borderTop: '2px dashed #374151', paddingTop: '12px', textAlign: 'center' }}>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={() => setPrintReceipt(null)} style={{ flex: 1, padding: '8px', borderRadius: '6px', border: '1px solid #D1D5DB', background: '#F3F4F6', color: '#111827', fontWeight: 700, cursor: 'pointer' }}>Close</button>
                <button onClick={() => { window.print(); setPrintReceipt(null); }} style={{ flex: 1, padding: '8px', borderRadius: '6px', border: 'none', background: '#10B981', color: '#FFF', fontWeight: 700, cursor: 'pointer' }}>Print Receipt</button>
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
