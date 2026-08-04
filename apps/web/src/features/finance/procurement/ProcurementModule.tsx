import React, { useState } from 'react';
import { ShoppingBag, FileText, CheckCircle, Clock, Plus, ArrowRight, Truck, PackageCheck } from 'lucide-react';
import { mockProcurement } from '../shared/mockFinanceData';
import type { ProcurementItem } from '../shared/types';

export default function ProcurementModule() {
  const [procurements, setProcurements] = useState<ProcurementItem[]>(mockProcurement);
  const [toast, setToast] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleApprovePO = (id: string) => {
    setProcurements(procurements.map(p => p.id === id ? { ...p, status: 'Approved by Principal' } : p));
    showNotification(`Purchase Order ${id} approved by Principal!`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', fontFamily: '"Outfit", sans-serif' }}>
      {toast && (
        <div style={{
          position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999,
          background: 'var(--bg-secondary)', border: '1px solid #3B82F6',
          borderRadius: '10px', padding: '12px 20px', boxShadow: 'var(--shadow-lg)'
        }}>
          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>{toast}</span>
        </div>
      )}

      {/* Overview Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '14px', padding: '18px' }}>
          <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>COMMITTED PO AMOUNT</span>
          <h3 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--accent-primary)', margin: '6px 0 0 0' }}>₹6,64,000</h3>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>3 Active POs</span>
        </div>

        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '14px', padding: '18px' }}>
          <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>WORKFLOW STAGE</span>
          <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#F59E0B', margin: '6px 0 0 0' }}>1 Pending Approval</h3>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Computer Science Lab PO</span>
        </div>
      </div>

      {/* Action Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-surface)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
        <div>
          <h3 style={{ fontSize: '16px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>School Procurement & Purchase Orders</h3>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>Purchase Requests → PO Approval → Goods Received (GRN) → Vendor Payments.</p>
        </div>

        <button 
          onClick={() => showNotification("Purchase Request workflow opened.")}
          style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 16px', borderRadius: '8px', border: 'none', background: 'var(--accent-primary)', color: '#FFF', fontSize: '13px', cursor: 'pointer', fontWeight: 700 }}
        >
          <Plus size={16} /> Create PO Request
        </button>
      </div>

      {/* Procurement Lifecycle Table */}
      <div style={{ background: 'var(--bg-surface)', borderRadius: '14px', border: '1px solid var(--border-subtle)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
          <thead>
            <tr style={{ background: 'var(--bg-surface-raised)', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-secondary)', fontWeight: 600 }}>
              <th style={{ padding: '12px 16px' }}>PO NUMBER</th>
              <th style={{ padding: '12px 16px' }}>DEPARTMENT & REQUESTOR</th>
              <th style={{ padding: '12px 16px' }}>VENDOR</th>
              <th style={{ padding: '12px 16px' }}>TOTAL VALUE</th>
              <th style={{ padding: '12px 16px' }}>LIFECYCLE STAGE</th>
              <th style={{ padding: '12px 16px', textAlign: 'right' }}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {procurements.map((p) => (
              <tr key={p.id} style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}>
                <td style={{ padding: '14px 16px', fontWeight: 700, color: 'var(--accent-primary)' }}>{p.poNumber}</td>
                <td style={{ padding: '14px 16px' }}>
                  <div style={{ fontWeight: 700 }}>{p.department}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Req by: {p.requestedBy}</div>
                </td>
                <td style={{ padding: '14px 16px', fontWeight: 600 }}>{p.vendorName}</td>
                <td style={{ padding: '14px 16px', fontWeight: 800, color: 'var(--text-primary)' }}>
                  ₹{p.totalAmount.toLocaleString('en-IN')}
                </td>
                <td style={{ padding: '14px 16px' }}>
                  <span style={{
                    padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 700,
                    background: p.status === 'Goods Received' ? 'rgba(16,185,129,0.1)' : 'rgba(245,158,11,0.1)',
                    color: p.status === 'Goods Received' ? '#10B981' : '#F59E0B'
                  }}>
                    {p.status}
                  </span>
                </td>
                <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                  {p.status === 'Pending Approval' ? (
                    <button 
                      onClick={() => handleApprovePO(p.id)}
                      style={{ padding: '6px 12px', borderRadius: '6px', border: 'none', background: '#3B82F6', color: '#FFF', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}
                    >
                      Approve PO
                    </button>
                  ) : (
                    <button 
                      onClick={() => showNotification(`GRN details loaded for ${p.poNumber}`)}
                      style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface-raised)', color: 'var(--text-primary)', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}
                    >
                      View GRN
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
