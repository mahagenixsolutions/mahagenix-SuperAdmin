import React, { useState } from 'react';
import { DataGrid } from '../../../components/erp/DataGrid';
import type { GridColumn } from '../../../components/erp/DataGrid';
import { StatusBadge } from '../../../components/erp/StatusBadge';
import { useHostelStore } from '../shared/hostelStore';
import type { HostelFeeRecord } from '../shared/types';
import { CreditCard, Landmark, DollarSign, CheckCircle2, Printer } from 'lucide-react';

export default function HostelFeesModule() {
  const { fees, collectHostelFee } = useHostelStore();
  const [selectedFee, setSelectedFee] = useState<HostelFeeRecord | null>(null);
  const [payAmount, setPayAmount] = useState(35000);
  const [printReceipt, setPrintReceipt] = useState<HostelFeeRecord | null>(null);

  const columns: GridColumn<HostelFeeRecord>[] = [
    { key: 'id', title: 'Fee Ref #', render: (f) => <span style={{ fontFamily: 'monospace', fontWeight: 800 }}>{f.id}</span> },
    { key: 'studentName', title: 'Student Name', render: (f) => <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{f.studentName} (Room {f.roomNumber})</span> },
    { key: 'termSemester', title: 'Term / Session', render: (f) => f.termSemester },
    { key: 'totalFee', title: 'Total Fee', render: (f) => `₹${f.totalFee.toLocaleString()}` },
    { key: 'amountPaid', title: 'Amount Paid', render: (f) => <span style={{ fontWeight: 700, color: '#10B981' }}>₹{f.amountPaid.toLocaleString()}</span> },
    { key: 'dueDate', title: 'Due Date', render: (f) => f.dueDate },
    { key: 'status', title: 'Payment Status', render: (f) => <StatusBadge status={f.status === 'Paid' ? 'success' : f.status === 'Partial' ? 'warning' : 'danger'} label={f.status} /> },
    {
      key: 'id',
      title: 'Action',
      render: (f) =>
        f.status !== 'Paid' ? (
          <button
            onClick={() => { setSelectedFee(f); setPayAmount(f.totalFee - f.amountPaid); }}
            style={{ border: 'none', background: '#10B981', color: '#FFF', padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}
          >
            Collect Fee
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

  const handlePaySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFee) return;
    collectHostelFee(selectedFee.id, Number(payAmount));
    setPrintReceipt({ ...selectedFee, amountPaid: selectedFee.amountPaid + Number(payAmount), status: 'Paid' });
    setSelectedFee(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', fontFamily: '"Outfit", sans-serif' }}>
      
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>Hostel & Mess Fee Collection Desk</h3>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>Collect room slab fees, mess charges, track pending dues, and issue official ERP receipts.</p>
        </div>
      </div>

      <DataGrid columns={columns} data={fees} />

      {/* Collect Fee Modal */}
      {selectedFee && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex',
          alignItems: 'center', justifyContent: 'center', padding: '16px'
        }}>
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '24px', width: '100%', maxWidth: '440px' }}>
            <h3 style={{ margin: '0 0 14px 0', fontSize: '17px', fontWeight: 800, color: 'var(--text-primary)' }}>Collect Hostel & Mess Fee</h3>
            <div style={{ background: 'var(--bg-surface-raised)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-subtle)', marginBottom: '14px', fontSize: '12px' }}>
              <div><strong>Student:</strong> {selectedFee.studentName}</div>
              <div><strong>Room:</strong> {selectedFee.roomNumber} ({selectedFee.buildingName})</div>
              <div><strong>Total Due:</strong> ₹{selectedFee.totalFee.toLocaleString()}</div>
              <div><strong>Already Paid:</strong> ₹{selectedFee.amountPaid.toLocaleString()}</div>
              <div style={{ color: '#EF4444', fontWeight: 800, marginTop: '4px' }}>Remaining Balance: ₹{(selectedFee.totalFee - selectedFee.amountPaid).toLocaleString()}</div>
            </div>

            <form onSubmit={handlePaySubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={labelStyle}>Payment Amount (₹)</label>
                <input type="number" value={payAmount} onChange={(e) => setPayAmount(Number(e.target.value))} style={inputStyle} required />
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                <button type="button" onClick={() => setSelectedFee(null)} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface-raised)', color: 'var(--text-primary)', fontWeight: 700, cursor: 'pointer' }}>
                  Cancel
                </button>
                <button type="submit" style={{ flex: 1, padding: '10px', borderRadius: '8px', border: 'none', background: '#10B981', color: '#FFF', fontWeight: 700, cursor: 'pointer' }}>
                  Record Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Fee Receipt Modal */}
      {printReceipt && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex',
          alignItems: 'center', justifyContent: 'center', padding: '16px'
        }}>
          <div style={{ background: '#FFF', color: '#111827', borderRadius: '16px', padding: '24px', width: '100%', maxWidth: '420px', fontFamily: 'monospace' }}>
            <div style={{ textTransform: 'uppercase', textAlign: 'center', borderBottom: '2px dashed #374151', paddingBottom: '12px', marginBottom: '12px' }}>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800 }}>OFFICIAL HOSTEL FEE RECEIPT</h3>
              <p style={{ margin: '4px 0 0 0', fontSize: '11px' }}>SCHOOL ERP CAMPUS RESIDENCY</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px', marginBottom: '16px' }}>
              <div><strong>Receipt Ref:</strong> {printReceipt.id}</div>
              <div><strong>Student Name:</strong> {printReceipt.studentName}</div>
              <div><strong>Room & Block:</strong> Room {printReceipt.roomNumber} ({printReceipt.buildingName})</div>
              <div style={{ borderTop: '1px solid #E5E7EB', paddingTop: '6px', marginTop: '6px' }}>
                <div><strong>Hostel & Mess Fee:</strong> ₹{printReceipt.totalFee.toLocaleString()}</div>
                <div><strong>Amount Paid:</strong> ₹{printReceipt.amountPaid.toLocaleString()}</div>
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
