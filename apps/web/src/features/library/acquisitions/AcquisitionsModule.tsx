import React, { useState } from 'react';
import { DataGrid } from '../../../components/erp/DataGrid';
import type { GridColumn } from '../../../components/erp/DataGrid';
import { StatusBadge } from '../../../components/erp/StatusBadge';
import { useLibraryStore } from '../shared/libraryStore';
import type { AcquisitionRequest } from '../shared/types';
import { ShoppingCart, FileText, CheckCircle2, Landmark, Plus } from 'lucide-react';

export default function AcquisitionsModule() {
  const { acquisitions, createAcquisition, receiveAcquisition } = useLibraryStore();
  const [showModal, setShowModal] = useState(false);

  // Form State
  const [bookTitle, setBookTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [quantity, setQuantity] = useState(5);
  const [estimatedCost, setEstimatedCost] = useState(7500);
  const [vendor, setVendor] = useState('Pearson Education');

  const columns: GridColumn<AcquisitionRequest>[] = [
    { key: 'poNumber', title: 'PO Number', render: (a) => <span style={{ fontFamily: 'monospace', fontWeight: 700 }}>{a.poNumber}</span> },
    { key: 'bookTitle', title: 'Book Title', render: (a) => <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{a.bookTitle}</span> },
    { key: 'quantity', title: 'Quantity', render: (a) => `${a.quantity} Copies` },
    { key: 'estimatedCost', title: 'Est. Budget', render: (a) => <span style={{ fontWeight: 800, color: '#4F46E5' }}>₹{a.estimatedCost.toLocaleString()}</span> },
    { key: 'vendor', title: 'Publisher Vendor', render: (a) => a.vendor },
    { key: 'status', title: 'Approval Status', render: (a) => <StatusBadge status={a.status === 'Received' ? 'success' : a.status === 'Approved' ? 'info' : 'warning'} label={a.status} /> },
    { key: 'date', title: 'Requested Date', render: (a) => a.date },
    {
      key: 'id',
      title: 'Action',
      render: (a) => (
        a.status !== 'Received' ? (
          <button
            onClick={() => receiveAcquisition(a.id)}
            style={{ border: 'none', background: '#10B981', color: '#FFF', borderRadius: '6px', padding: '4px 8px', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}
          >
            Receive Books → Catalog
          </button>
        ) : (
          <span style={{ fontSize: '11px', color: '#10B981', fontWeight: 700 }}>Stock Added</span>
        )
      ),
    },
  ];

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookTitle || !author) return;
    createAcquisition({
      bookTitle,
      author,
      quantity: Number(quantity),
      estimatedCost: Number(estimatedCost),
      vendor,
    });
    setShowModal(false);
    setBookTitle('');
    setAuthor('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', fontFamily: '"Outfit", sans-serif' }}>
      
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>Book Procurement & Acquisitions</h3>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>Purchase requests, publisher POs, new arrivals, and automated catalog stock population.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          style={{ padding: '8px 14px', borderRadius: '8px', border: 'none', background: '#4F46E5', color: '#FFF', fontSize: '12px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <Plus size={16} /> Create Purchase Request
        </button>
      </div>

      <DataGrid columns={columns} data={acquisitions} />

      {/* Create Purchase Request Modal */}
      {showModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex',
          alignItems: 'center', justifyContent: 'center', padding: '16px'
        }}>
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '24px', width: '100%', maxWidth: '440px' }}>
            <h3 style={{ margin: '0 0 14px 0', fontSize: '17px', fontWeight: 800, color: 'var(--text-primary)' }}>Create Book Acquisition Request PO</h3>
            <form onSubmit={handleCreateSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={labelStyle}>Requested Book Title</label>
                <input type="text" value={bookTitle} onChange={(e) => setBookTitle(e.target.value)} style={inputStyle} placeholder="e.g. Modern Physics Vol 3" required />
              </div>
              <div>
                <label style={labelStyle}>Author Name</label>
                <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} style={inputStyle} placeholder="e.g. Dr. Griffiths" required />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={labelStyle}>Quantity Copies</label>
                  <input type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} style={inputStyle} min={1} required />
                </div>
                <div>
                  <label style={labelStyle}>Estimated Cost (₹)</label>
                  <input type="number" value={estimatedCost} onChange={(e) => setEstimatedCost(Number(e.target.value))} style={inputStyle} required />
                </div>
              </div>
              <div>
                <label style={labelStyle}>Publisher Vendor</label>
                <select value={vendor} onChange={(e) => setVendor(e.target.value)} style={inputStyle}>
                  <option value="Pearson Education">Pearson Education</option>
                  <option value="Oxford University Press">Oxford University Press</option>
                  <option value="Cengage Learning">Cengage Learning</option>
                  <option value="S. Chand Publishing">S. Chand Publishing</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                <button type="button" onClick={() => setShowModal(false)} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface-raised)', color: 'var(--text-primary)', fontWeight: 700, cursor: 'pointer' }}>
                  Cancel
                </button>
                <button type="submit" style={{ flex: 1, padding: '10px', borderRadius: '8px', border: 'none', background: '#4F46E5', color: '#FFF', fontWeight: 700, cursor: 'pointer' }}>
                  Generate PO
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
