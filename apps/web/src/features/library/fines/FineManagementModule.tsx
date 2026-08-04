import React, { useState } from 'react';
import { DataGrid } from '../../../components/erp/DataGrid';
import type { GridColumn } from '../../../components/erp/DataGrid';
import { StatusBadge } from '../../../components/erp/StatusBadge';
import { useLibraryStore } from '../shared/libraryStore';
import type { FineRecord } from '../shared/types';
import { Landmark, ShieldAlert, CheckCircle2, DollarSign, Printer } from 'lucide-react';

export default function FineManagementModule() {
  const { fines, collectFine, showToast } = useLibraryStore();
  const [selectedFine, setSelectedFine] = useState<FineRecord | null>(null);
  const [payMethod, setPayMethod] = useState('Cash Desk');
  const [waiveReason, setWaiveReason] = useState('');
  const [printReceipt, setPrintReceipt] = useState<FineRecord | null>(null);

  const handleCollectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFine) return;
    collectFine(selectedFine.id, payMethod, waiveReason || undefined);
    setPrintReceipt({ ...selectedFine, status: waiveReason ? 'Waived' : 'Collected' });
    setSelectedFine(null);
    setWaiveReason('');
  };

  const columns: GridColumn<FineRecord>[] = [
    { key: 'memberName', title: 'Member Name', render: (f) => <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{f.memberName}</span> },
    { key: 'bookTitle', title: 'Overdue Book', render: (f) => f.bookTitle },
    { key: 'daysOverdue', title: 'Days Overdue', render: (f) => <span style={{ fontWeight: 700, color: '#EF4444' }}>{f.daysOverdue} Days</span> },
    { key: 'fineAmount', title: 'Fine Amount', render: (f) => <span style={{ fontWeight: 800, color: '#EF4444' }}>₹{f.fineAmount}</span> },
    { key: 'date', title: 'Assessed Date', render: (f) => f.date },
    { key: 'status', title: 'Status', render: (f) => <StatusBadge status={f.status === 'Collected' ? 'success' : f.status === 'Waived' ? 'info' : 'danger'} label={f.status} /> },
    {
      key: 'id',
      title: 'Action',
      render: (f) =>
        f.status === 'Pending' ? (
          <button
            onClick={() => setSelectedFine(f)}
            style={{ border: 'none', background: '#10B981', color: '#FFF', padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}
          >
            Collect ₹{f.fineAmount} / Waive
          </button>
        ) : (
          <button
            onClick={() => setPrintReceipt(f)}
            style={{ border: '1px solid var(--border-subtle)', background: 'var(--bg-surface-raised)', color: 'var(--text-primary)', padding: '4px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            <Printer size={12} /> Receipt
          </button>
        ),
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', fontFamily: '"Outfit", sans-serif' }}>
      
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>Library Fine & Receipt Desk</h3>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>Collect overdue fines, issue official ERP payment receipts, or process Principal waivers.</p>
        </div>
      </div>

      <DataGrid columns={columns} data={fines} />

      {/* Collect / Waive Modal */}
      {selectedFine && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex',
          alignItems: 'center', justifyContent: 'center', padding: '16px'
        }}>
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '24px', width: '100%', maxWidth: '440px' }}>
            <h3 style={{ margin: '0 0 14px 0', fontSize: '17px', fontWeight: 800, color: 'var(--text-primary)' }}>Process Overdue Fine</h3>
            <div style={{ background: 'var(--bg-surface-raised)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-subtle)', marginBottom: '14px', fontSize: '12px' }}>
              <div><strong>Member:</strong> {selectedFine.memberName}</div>
              <div><strong>Book:</strong> {selectedFine.bookTitle}</div>
              <div><strong>Days Overdue:</strong> {selectedFine.daysOverdue} Days</div>
              <div style={{ color: '#EF4444', fontWeight: 800, fontSize: '14px', marginTop: '4px' }}>Total Fine: ₹{selectedFine.fineAmount}</div>
            </div>

            <form onSubmit={handleCollectSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={labelStyle}>Payment Method</label>
                <select value={payMethod} onChange={(e) => setPayMethod(e.target.value)} style={inputStyle}>
                  <option value="Cash Desk">Cash Desk</option>
                  <option value="Online Payment (UPI/Card)">Online Payment (UPI/Card)</option>
                  <option value="Deduct from ERP Student Account">Deduct from ERP Student Account</option>
                </select>
              </div>

              <div>
                <label style={labelStyle}>Waiver Reason (Optional)</label>
                <input type="text" value={waiveReason} onChange={(e) => setWaiveReason(e.target.value)} style={inputStyle} placeholder="e.g. Principal Exemption Approval #992" />
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                <button type="button" onClick={() => setSelectedFine(null)} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface-raised)', color: 'var(--text-primary)', fontWeight: 700, cursor: 'pointer' }}>
                  Cancel
                </button>
                <button type="submit" style={{ flex: 1, padding: '10px', borderRadius: '8px', border: 'none', background: '#10B981', color: '#FFF', fontWeight: 700, cursor: 'pointer' }}>
                  Confirm Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Fine Receipt Printable Modal */}
      {printReceipt && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex',
          alignItems: 'center', justifyContent: 'center', padding: '16px'
        }}>
          <div style={{ background: '#FFF', color: '#111827', borderRadius: '16px', padding: '24px', width: '100%', maxWidth: '420px', fontFamily: 'monospace' }}>
            <div style={{ textTransform: 'uppercase', textAlign: 'center', borderBottom: '2px dashed #374151', paddingBottom: '12px', marginBottom: '12px' }}>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800 }}>OFFICIAL FINE RECEIPT</h3>
              <p style={{ margin: '4px 0 0 0', fontSize: '11px' }}>SCHOOL ERP LIBRARY ACCOUNTING</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px', marginBottom: '16px' }}>
              <div><strong>Receipt Ref:</strong> {printReceipt.id}</div>
              <div><strong>Date:</strong> {printReceipt.date}</div>
              <div><strong>Payer Name:</strong> {printReceipt.memberName}</div>
              <div style={{ borderTop: '1px solid #E5E7EB', paddingTop: '6px', marginTop: '6px' }}>
                <div><strong>Book Title:</strong> {printReceipt.bookTitle}</div>
                <div><strong>Overdue Period:</strong> {printReceipt.daysOverdue} Days</div>
                <div><strong>Amount Paid:</strong> ₹{printReceipt.fineAmount}</div>
                <div><strong>Status:</strong> {printReceipt.status}</div>
              </div>
            </div>

            <div style={{ borderTop: '2px dashed #374151', paddingTop: '12px', textAlign: 'center' }}>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={() => setPrintReceipt(null)} style={{ flex: 1, padding: '8px', borderRadius: '6px', border: '1px solid #D1D5DB', background: '#F3F4F6', color: '#111827', fontWeight: 700, cursor: 'pointer' }}>Close</button>
                <button onClick={() => { window.print(); setPrintReceipt(null); }} style={{ flex: 1, padding: '8px', borderRadius: '6px', border: 'none', background: '#10B981', color: '#FFF', fontWeight: 700, cursor: 'pointer' }}>Print Official Receipt</button>
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
