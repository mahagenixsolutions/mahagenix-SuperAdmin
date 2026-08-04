import React, { useState, useEffect } from 'react';
import { FileText, Download, TrendingUp, DollarSign, ArrowUpRight, ArrowDownRight, Layers } from 'lucide-react';

export default function FinancialReportsModule() {
  const [activeTab, setActiveTab] = useState<'pnl' | 'balance' | 'cashflow' | 'payroll' | 'vendors'>('pnl');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 767.98);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', fontFamily: '"Outfit", sans-serif' }}>
      {/* Header Tabs & Download Button (Responsive Desktop & Mobile) */}
      <div style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'space-between',
        alignItems: isMobile ? 'stretch' : 'center',
        background: 'var(--bg-surface)',
        padding: '16px',
        borderRadius: '12px',
        border: '1px solid var(--border-subtle)',
        gap: '12px',
      }}>
        {/* Scrollable Tabs on Mobile */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          background: 'var(--bg-surface-raised, #F1F5F9)',
          border: '1px solid var(--border-subtle, rgba(226, 232, 240, 0.8))',
          borderRadius: '9999px',
          padding: '4px 6px',
          gap: '4px',
          overflowX: 'auto',
          maxWidth: '100%',
          WebkitOverflowScrolling: 'touch',
        }}>
          {[
            { id: 'pnl', label: 'Profit & Loss Statement' },
            { id: 'balance', label: 'Balance Sheet' },
            { id: 'cashflow', label: 'Cash Flow Statement' },
            { id: 'payroll', label: 'Payroll Report' },
            { id: 'vendors', label: 'Vendor Outstandings' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                padding: '8px 16px',
                borderRadius: '9999px',
                border: 'none',
                background: activeTab === tab.id ? '#ffffff' : 'transparent',
                color: activeTab === tab.id ? '#0284C7' : '#475569',
                fontSize: '12.5px',
                fontWeight: activeTab === tab.id ? 700 : 600,
                cursor: 'pointer',
                boxShadow: activeTab === tab.id ? '0 2px 8px rgba(2, 132, 199, 0.12), 0 1px 3px rgba(0, 0, 0, 0.06)' : 'none',
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <button style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px',
          padding: '9px 16px',
          borderRadius: '8px',
          border: '1px solid var(--border-subtle)',
          background: 'var(--bg-surface-raised)',
          color: 'var(--text-primary)',
          fontSize: '12.5px',
          fontWeight: 600,
          cursor: 'pointer',
          whiteSpace: 'nowrap',
          width: isMobile ? '100%' : 'auto',
        }}>
          <Download size={14} /> Download Financial Package (PDF)
        </button>
      </div>

      {/* P&L View */}
      {activeTab === 'pnl' && (
        <div style={{ background: 'var(--bg-surface)', borderRadius: '14px', border: '1px solid var(--border-subtle)', padding: isMobile ? '16px' : '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'space-between',
            alignItems: isMobile ? 'flex-start' : 'center',
            borderBottom: '1px solid var(--border-subtle)',
            paddingBottom: '14px',
            gap: isMobile ? 8 : 12,
          }}>
            <div>
              <h3 style={{ fontSize: isMobile ? '16px' : '18px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                Institutional Statement of Profit & Loss
              </h3>
              <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Academic Session 2024-25 (YTD)</span>
            </div>
            <span style={{ fontSize: isMobile ? '15px' : '18px', fontWeight: 800, color: '#10B981', background: isMobile ? '#ECFDF5' : 'transparent', padding: isMobile ? '4px 10px' : 0, borderRadius: 8 }}>
              Net Surplus: ₹28,45,000
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '14px' : '24px' }}>
            {/* Revenue Column */}
            <div style={{ background: 'var(--bg-surface-raised)', padding: '18px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
              <h4 style={{ fontSize: '13.5px', fontWeight: 800, color: '#10B981', margin: '0 0 12px 0' }}>TOTAL OPERATIONAL REVENUE</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Tuition & Academic Fees</span>
                  <span style={{ fontWeight: 700 }}>₹98,50,000</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Transport & Bus Fees</span>
                  <span style={{ fontWeight: 700 }}>₹14,20,000</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Hostel & Mess Charges</span>
                  <span style={{ fontWeight: 700 }}>₹8,90,000</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px dashed var(--border-subtle)', paddingTop: '8px', fontWeight: 800 }}>
                  <span>Gross Income</span>
                  <span style={{ color: '#10B981' }}>₹1,21,60,000</span>
                </div>
              </div>
            </div>

            {/* Expenses Column */}
            <div style={{ background: 'var(--bg-surface-raised)', padding: '18px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
              <h4 style={{ fontSize: '13.5px', fontWeight: 800, color: '#EF4444', margin: '0 0 12px 0' }}>TOTAL OPERATIONAL EXPENSES</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Staff & Teacher Payroll</span>
                  <span style={{ fontWeight: 700 }}>₹62,40,000</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Campus Utilities (Electricity & Water)</span>
                  <span style={{ fontWeight: 700 }}>₹8,50,000</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Lab Consumables & IT Assets</span>
                  <span style={{ fontWeight: 700 }}>₹12,25,000</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px dashed var(--border-subtle)', paddingTop: '8px', fontWeight: 800 }}>
                  <span>Gross Expenditure</span>
                  <span style={{ color: '#EF4444' }}>₹93,15,000</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Balance Sheet Preview */}
      {activeTab === 'balance' && (
        <div style={{ background: 'var(--bg-surface)', borderRadius: '14px', border: '1px solid var(--border-subtle)', padding: isMobile ? '16px' : '24px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 800, margin: '0 0 14px 0', color: 'var(--text-primary)' }}>Institutional Balance Sheet</h3>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '20px', fontSize: '13px' }}>
            <div style={{ background: 'var(--bg-surface-raised)', padding: '16px', borderRadius: '10px' }}>
              <h4 style={{ fontWeight: 800, color: 'var(--accent-primary)', margin: '0 0 10px 0' }}>ASSETS</h4>
              <p style={{ margin: '4px 0' }}>Cash & Bank Balances: ₹86,19,500</p>
              <p style={{ margin: '4px 0' }}>Outstanding Fee Receivables: ₹18,40,000</p>
              <p style={{ margin: '4px 0' }}>IT & Furniture Fixed Assets: ₹1,45,00,000</p>
              <h4 style={{ marginTop: '14px', fontWeight: 800 }}>Total Assets: ₹2,49,59,500</h4>
            </div>
            <div style={{ background: 'var(--bg-surface-raised)', padding: '16px', borderRadius: '10px' }}>
              <h4 style={{ fontWeight: 800, color: '#F59E0B', margin: '0 0 10px 0' }}>LIABILITIES & RESERVES</h4>
              <p style={{ margin: '4px 0' }}>Vendor Payables: ₹5,32,000</p>
              <p style={{ margin: '4px 0' }}>Pending Payroll Liabilities: ₹2,85,000</p>
              <p style={{ margin: '4px 0' }}>General Reserve Corpus: ₹2,41,42,500</p>
              <h4 style={{ marginTop: '14px', fontWeight: 800 }}>Total Liabilities: ₹2,49,59,500</h4>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
