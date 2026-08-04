import React, { useState } from 'react';
import { 
  CreditCard, Banknote, ShieldAlert, Award, FileText, Download, Plus, 
  Settings, CheckCircle, Clock, Calendar, Users, Sparkles, TrendingUp, TrendingDown, RefreshCw,
  ArrowUpRight, ArrowDownRight, Bell, Landmark, Wallet, DollarSign, ArrowLeftRight, FileSpreadsheet,
  AlertTriangle, ShieldCheck, Eye, Search, Filter, Layers, MessageSquare, ChevronRight, FileCheck,
  CheckCircle2, AlertCircle, HelpCircle, Upload, Shield, Send, Activity
} from 'lucide-react';
import { PageLayout } from '../../components/erp/PageLayout';
import { Link, useNavigate } from 'react-router-dom';

export default function AccountantDashboard() {
  const navigate = useNavigate();
  const [toast, setToast] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <PageLayout>
      {toast && (
        <div style={{
          position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999,
          background: '#0F172A', color: '#FFF', border: '1px solid #3B82F6',
          borderRadius: '10px', padding: '12px 20px', boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
          fontFamily: '"Outfit", sans-serif', fontSize: '13px', fontWeight: 600
        }}>
          <span>{toast}</span>
        </div>
      )}

      {/* Main Container */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%', fontFamily: '"Outfit", sans-serif', background: '#F8FAFC', padding: '4px' }}>
        
        {/* TOP HEADER BANNER (Full Width) */}
        <div style={{
          background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '18px', padding: '20px 24px',
          display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px',
          boxShadow: '0 2px 10px rgba(15, 23, 42, 0.03)', width: '100%', boxSizing: 'border-box'
        }}>
          <div style={{ flex: '1 1 280px', minWidth: 0 }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px', marginBottom: '6px' }}>
              <h1 style={{ fontSize: 'clamp(20px, 4vw, 24px)', fontWeight: 800, color: '#0F172A', margin: 0, letterSpacing: '-0.5px' }}>
                Finance Workspace Control Panel
              </h1>
              <span style={{ padding: '4px 12px', borderRadius: '20px', background: '#DCFCE7', color: '#166534', fontSize: '12px', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#166534' }} /> FY 2024-25 Active
              </span>
            </div>
            <p style={{ fontSize: '13px', color: '#64748B', margin: '0 0 12px 0', maxWidth: '750px', lineHeight: 1.5 }}>
              Complete financial management of your institution including revenue, fee collections, expenses, payroll, banking, compliance & reporting.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#F1F5F9', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '6px 14px', fontSize: '12px', fontWeight: 600, color: '#334155' }}>
                <Calendar size={14} style={{ color: '#3B82F6' }} />
                Session: <span style={{ color: '#0F172A', fontWeight: 700 }}>April - March 2025</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: '8px', padding: '6px 14px', fontSize: '12px', fontWeight: 600, color: '#065F46' }}>
                <Landmark size={14} style={{ color: '#10B981' }} />
                Liquidity: <span style={{ color: '#047857', fontWeight: 800 }}>₹86.19 Lakhs</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
            <Link to="/fees" style={{ textDecoration: 'none' }}>
              <button style={{ padding: '10px 20px', borderRadius: '10px', border: '1px solid #3B82F6', background: '#EFF6FF', color: '#1D4ED8', fontSize: '13px', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s', display: 'inline-flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }}>
                Fee Management Hub →
              </button>
            </Link>
            <Link to="/finance/expenses" style={{ textDecoration: 'none' }}>
              <button style={{ padding: '10px 20px', borderRadius: '10px', border: 'none', background: '#2563EB', color: '#FFF', fontSize: '13px', fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 12px rgba(37,99,235,0.25)', transition: 'all 0.2s', display: 'inline-flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }}>
                Expenses & Payroll →
              </button>
            </Link>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────────────────────
            ROW 1 (EXACTLY 3 SECTIONS: Health Score | Total Revenue | Total Expenses)
        ───────────────────────────────────────────────────────────────────────────── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: '20px', width: '100%' }}>
          
          {/* Section 1: Financial Health Score */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '14px', boxShadow: '0 2px 8px rgba(15, 23, 42, 0.02)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '15px', fontWeight: 800, color: '#0F172A' }}>
              <ShieldCheck size={18} style={{ color: '#10B981' }} />
              Financial Health Score
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ position: 'relative', width: '84px', height: '84px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="84" height="84" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="42" stroke="#F1F5F9" strokeWidth="10" fill="none" />
                  <circle cx="50" cy="50" r="42" stroke="#10B981" strokeWidth="10" fill="none" strokeDasharray="264" strokeDashoffset="24" strokeLinecap="round" transform="rotate(-90 50 50)" />
                </svg>
                <div style={{ position: 'absolute', textAlign: 'center' }}>
                  <span style={{ fontSize: '22px', fontWeight: 900, color: '#0F172A', display: 'block', lineHeight: 1 }}>91</span>
                  <span style={{ fontSize: '10px', color: '#64748B', fontWeight: 700 }}>/100</span>
                </div>
              </div>

              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '5px', fontSize: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
                  <span>Revenue</span> <span style={{ fontWeight: 800, color: '#0F172A' }}>92%</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
                  <span>Expenses</span> <span style={{ fontWeight: 800, color: '#0F172A' }}>83%</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
                  <span>Liquidity</span> <span style={{ fontWeight: 800, color: '#0F172A' }}>90%</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
                  <span>Payroll</span> <span style={{ fontWeight: 800, color: '#0F172A' }}>96%</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
                  <span>Compliance</span> <span style={{ fontWeight: 800, color: '#0F172A' }}>88%</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #F1F5F9', paddingTop: '10px' }}>
              <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>Overall Status</span>
              <span style={{ background: '#DCFCE7', color: '#166534', padding: '3px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 800 }}>Healthy</span>
            </div>
          </div>

          {/* Section 2: Total Revenue (YTD) */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 2px 8px rgba(15, 23, 42, 0.02)' }}>
            <div>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Total Revenue (YTD)</span>
              <h2 style={{ fontSize: '26px', fontWeight: 900, color: '#10B981', margin: '8px 0 4px 0' }}>₹1,21,60,000</h2>
              <span style={{ fontSize: '12px', color: '#10B981', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <TrendingUp size={14} /> ↑ 12.4% vs last year
              </span>
            </div>
            <div style={{ height: '48px', marginTop: '12px' }}>
              <svg width="100%" height="100%" viewBox="0 0 200 40" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10B981" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path d="M0,35 Q30,25 60,30 T120,15 T180,10 L200,8 L200,40 L0,40 Z" fill="url(#revGrad)" />
                <path d="M0,35 Q30,25 60,30 T120,15 T180,10 L200,8" fill="none" stroke="#10B981" strokeWidth="2.5" />
              </svg>
            </div>
          </div>

          {/* Section 3: Total Expenses (YTD) */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 2px 8px rgba(15, 23, 42, 0.02)' }}>
            <div>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Total Expenses (YTD)</span>
              <h2 style={{ fontSize: '26px', fontWeight: 900, color: '#EF4444', margin: '8px 0 4px 0' }}>₹93,15,000</h2>
              <span style={{ fontSize: '12px', color: '#EF4444', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <TrendingDown size={14} /> ↑ 8.6% vs last year
              </span>
            </div>
            <div style={{ height: '48px', marginTop: '12px' }}>
              <svg width="100%" height="100%" viewBox="0 0 200 40" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="expGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#EF4444" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#EF4444" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path d="M0,30 Q40,15 80,25 T140,20 T180,12 L200,10 L200,40 L0,40 Z" fill="url(#expGrad)" />
                <path d="M0,30 Q40,15 80,25 T140,20 T180,12 L200,10" fill="none" stroke="#EF4444" strokeWidth="2.5" />
              </svg>
            </div>
          </div>

        </div>

        {/* ─────────────────────────────────────────────────────────────────────────────
            ROW 2 (EXACTLY 3 SECTIONS: Net Profit | Bank & Cash Balances | Liabilities & Budget)
        ───────────────────────────────────────────────────────────────────────────── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: '20px', width: '100%' }}>
          
          {/* Section 1: Net Profit (YTD) */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 2px 8px rgba(15, 23, 42, 0.02)' }}>
            <div>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Net Profit (YTD)</span>
              <h2 style={{ fontSize: '26px', fontWeight: 900, color: '#2563EB', margin: '8px 0 4px 0' }}>₹28,45,000</h2>
              <span style={{ fontSize: '12px', color: '#10B981', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <TrendingUp size={14} /> ↑ 21.3% vs last year
              </span>
            </div>
            <div style={{ height: '48px', marginTop: '12px' }}>
              <svg width="100%" height="100%" viewBox="0 0 200 40" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="profGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2563EB" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#2563EB" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path d="M0,38 Q30,30 70,18 T130,22 T170,10 L200,5 L200,40 L0,40 Z" fill="url(#profGrad)" />
                <path d="M0,38 Q30,30 70,18 T130,22 T170,10 L200,5" fill="none" stroke="#2563EB" strokeWidth="2.5" />
              </svg>
            </div>
          </div>

          {/* Section 2: Bank & Cash Balances */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px', boxShadow: '0 2px 8px rgba(15, 23, 42, 0.02)' }}>
            <div style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Landmark size={18} style={{ color: '#2563EB' }} /> Cash & Treasury Vault
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '14px' }}>
                <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 600, display: 'block' }}>Bank Balance</span>
                <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#2563EB', margin: '4px 0' }}>₹85,35,000</h3>
                <span style={{ fontSize: '10px', color: '#94A3B8', fontWeight: 600 }}>HDFC + ICICI + SBI</span>
              </div>
              <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '14px' }}>
                <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 600, display: 'block' }}>Petty Cash</span>
                <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#10B981', margin: '4px 0' }}>₹84,500</h3>
                <span style={{ fontSize: '10px', color: '#94A3B8', fontWeight: 600 }}>Today's Vault Box</span>
              </div>
            </div>
          </div>

          {/* Section 3: Liabilities & Budget Utilization */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px', boxShadow: '0 2px 8px rgba(15, 23, 42, 0.02)' }}>
            <div style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Wallet size={18} style={{ color: '#7C3AED' }} /> Payables & Budget Cap
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(120px, 100%), 1fr))', gap: '10px' }}>
              <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '12px 10px', textAlign: 'center' }}>
                <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 600, display: 'block' }}>Salaries</span>
                <h4 style={{ fontSize: '15px', fontWeight: 900, color: '#D97706', margin: '4px 0' }}>₹2.85L</h4>
                <span style={{ fontSize: '10px', color: '#D97706', fontWeight: 700 }}>Due 7d</span>
              </div>
              <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '12px 10px', textAlign: 'center' }}>
                <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 600, display: 'block' }}>Vendors</span>
                <h4 style={{ fontSize: '15px', fontWeight: 900, color: '#DC2626', margin: '4px 0' }}>₹5.32L</h4>
                <span style={{ fontSize: '10px', color: '#DC2626', fontWeight: 700 }}>Overdue</span>
              </div>
              <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '12px 10px', textAlign: 'center' }}>
                <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 600, display: 'block' }}>Budget</span>
                <h4 style={{ fontSize: '15px', fontWeight: 900, color: '#7C3AED', margin: '4px 0' }}>76.2%</h4>
                <span style={{ fontSize: '10px', color: '#64748B', fontWeight: 600 }}>In Cap</span>
              </div>
            </div>
          </div>

        </div>

        {/* ─────────────────────────────────────────────────────────────────────────────
            ROW 3 (EXACTLY 3 SECTIONS: Quick Actions | Pending Approvals | Alerts & Warnings)
        ───────────────────────────────────────────────────────────────────────────── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: '20px', width: '100%' }}>
          
          {/* Section 1: Accountant Quick Actions */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '22px', display: 'flex', flexDirection: 'column', gap: '16px', boxShadow: '0 2px 8px rgba(15, 23, 42, 0.02)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '15px', fontWeight: 800, color: '#0F172A' }}>
                <Sparkles size={18} style={{ color: '#2563EB' }} />
                Accountant Quick Actions
              </div>
              <button style={{ background: '#F1F5F9', border: 'none', borderRadius: '6px', padding: '5px 12px', fontSize: '12px', fontWeight: 700, color: '#475569', cursor: 'pointer' }}>Customize</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(120px, 100%), 1fr))', gap: '10px' }}>
              {[
                { label: 'Record Expense', icon: <FileText size={16} style={{ color: '#2563EB' }} />, route: '/finance/expenses' },
                { label: 'Process Payroll', icon: <Users size={16} style={{ color: '#7C3AED' }} />, route: '/finance/payroll' },
                { label: 'Create PO', icon: <FileCheck size={16} style={{ color: '#0891B2' }} />, route: '/finance/procurement' },
                { label: 'Approve Pay', icon: <CheckCircle2 size={16} style={{ color: '#059669' }} />, route: '/finance/expenses' },
                { label: 'Journal Entry', icon: <ArrowLeftRight size={16} style={{ color: '#D97706' }} />, route: '/finance/ledger' },
                { label: 'Issue Refund', icon: <Shield size={16} style={{ color: '#DB2777' }} />, route: '/finance/refunds' },
                { label: 'Reconcile', icon: <Landmark size={16} style={{ color: '#2563EB' }} />, route: '/finance/reconciliation' },
                { label: 'Export Ledger', icon: <Download size={16} style={{ color: '#475569' }} />, route: '/finance/reports' },
              ].map((qa, i) => (
                <button
                  key={i}
                  onClick={() => navigate(qa.route)}
                  style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '6px',
                    padding: '10px 4px', borderRadius: '12px', border: '1px solid #E2E8F0', background: '#F8FAFC',
                    cursor: 'pointer', transition: 'all 0.2s ease', minHeight: '80px'
                  }}
                >
                  <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: '#FFFFFF', display: 'grid', placeItems: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.04)', flexShrink: 0 }}>
                    {qa.icon}
                  </div>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#334155', textAlign: 'center', lineHeight: 1.2 }}>{qa.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Section 2: Pending Approvals */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '22px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 2px 8px rgba(15, 23, 42, 0.02)' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '15px', fontWeight: 800, color: '#0F172A', marginBottom: '14px' }}>
                <Clock size={18} style={{ color: '#D97706' }} />
                Pending Approvals
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
                {[
                  { label: 'Purchase Orders', count: 8, icon: <FileCheck size={14} style={{ color: '#2563EB' }} /> },
                  { label: 'Payroll Approvals', count: 2, icon: <Users size={14} style={{ color: '#7C3AED' }} /> },
                  { label: 'Expense Claims', count: 14, icon: <FileText size={14} style={{ color: '#D97706' }} /> },
                  { label: 'Refund Requests', count: 5, icon: <Shield size={14} style={{ color: '#DB2777' }} /> },
                  { label: 'Vendor Bills', count: 9, icon: <Landmark size={14} style={{ color: '#059669' }} /> },
                ].map((ap, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '7px 12px', borderRadius: '10px', background: '#F8FAFC', border: '1px solid #F1F5F9' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#334155', fontWeight: 600 }}>
                      {ap.icon} {ap.label}
                    </div>
                    <span style={{ padding: '2px 8px', borderRadius: '12px', background: '#EFF6FF', color: '#1D4ED8', fontWeight: 800, fontSize: '11px' }}>{ap.count}</span>
                  </div>
                ))}
              </div>
            </div>

            <button onClick={() => navigate('/finance/expenses')} style={{ marginTop: '12px', border: 'none', background: 'transparent', color: '#2563EB', fontSize: '12px', fontWeight: 700, cursor: 'pointer', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              View All Approvals →
            </button>
          </div>

          {/* Section 3: Alerts & Warnings */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '22px', display: 'flex', flexDirection: 'column', gap: '14px', boxShadow: '0 2px 8px rgba(15, 23, 42, 0.02)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h4 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: '#0F172A' }}>Alerts & Warnings</h4>
              <span style={{ fontSize: '12px', color: '#2563EB', fontWeight: 700, cursor: 'pointer' }}>View All</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
              {[
                { text: 'Budget exceeded in Maintenance category', time: '2h ago', level: 'high' },
                { text: 'Vendor payment to Dell is overdue', time: '3h ago', level: 'high' },
                { text: 'GST GSTR-3B filing due in 6 days', time: '5h ago', level: 'medium' },
                { text: 'Low cash balance alert in Petty Cash', time: '1d ago', level: 'medium' },
                { text: "5 high value PO's pending approval", time: '1d ago', level: 'medium' },
              ].map((alt, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 10px', borderRadius: '10px', background: alt.level === 'high' ? '#FEF2F2' : '#FFFBEB', border: `1px solid ${alt.level === 'high' ? '#FEE2E2' : '#FEF3C7'}` }}>
                  <span style={{ fontWeight: 600, color: alt.level === 'high' ? '#991B1B' : '#92400E', display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    <AlertTriangle size={14} style={{ flexShrink: 0 }} /> {alt.text}
                  </span>
                  <span style={{ fontSize: '10px', color: '#94A3B8', fontWeight: 600, flexShrink: 0 }}>{alt.time}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ─────────────────────────────────────────────────────────────────────────────
            ROW 4 (EXACTLY 3 SECTIONS: Cash Flow | Revenue Sources | Expense Trend)
        ───────────────────────────────────────────────────────────────────────────── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: '20px', width: '100%' }}>
          
          {/* Section 1: Cash Flow Overview */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', boxShadow: '0 2px 8px rgba(15, 23, 42, 0.02)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h4 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: '#0F172A' }}>Cash Flow Overview</h4>
              <span style={{ fontSize: '11px', color: '#64748B', background: '#F1F5F9', padding: '4px 10px', borderRadius: '6px', fontWeight: 600 }}>This Month ∨</span>
            </div>

            <div style={{ display: 'flex', gap: '16px', fontSize: '12px', fontWeight: 600 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#10B981' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981' }} /> Inflow</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#EF4444' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#EF4444' }} /> Outflow</span>
            </div>

            {/* Bar Chart Simulation */}
            <div style={{ height: '140px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '12px', borderBottom: '1px solid #E2E8F0', paddingBottom: '8px' }}>
              {[
                { label: '1 May', in: 60, out: 40 },
                { label: '8 May', in: 80, out: 55 },
                { label: '15 May', in: 95, out: 70 },
                { label: '22 May', in: 70, out: 50 },
                { label: '29 May', in: 85, out: 65 }
              ].map((bar, i) => (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', height: '100%', justifyContent: 'flex-end' }}>
                  <div style={{ display: 'flex', gap: '4px', alignItems: 'flex-end', height: '100%' }}>
                    <div style={{ width: '10px', height: `${bar.in}%`, background: '#10B981', borderRadius: '3px 3px 0 0' }} />
                    <div style={{ width: '10px', height: `${bar.out}%`, background: '#EF4444', borderRadius: '3px 3px 0 0' }} />
                  </div>
                  <span style={{ fontSize: '10px', color: '#94A3B8', fontWeight: 600 }}>{bar.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Revenue Sources (YTD) Donut */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', boxShadow: '0 2px 8px rgba(15, 23, 42, 0.02)' }}>
            <h4 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: '#0F172A' }}>Revenue Sources (YTD)</h4>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ position: 'relative', width: '100px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="100" height="100" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="38" stroke="#2563EB" strokeWidth="15" fill="none" strokeDasharray="140 100" strokeDashoffset="0" />
                  <circle cx="50" cy="50" r="38" stroke="#06B6D4" strokeWidth="15" fill="none" strokeDasharray="35 200" strokeDashoffset="-140" />
                  <circle cx="50" cy="50" r="38" stroke="#F59E0B" strokeWidth="15" fill="none" strokeDasharray="24 200" strokeDashoffset="-175" />
                  <circle cx="50" cy="50" r="38" stroke="#EC4899" strokeWidth="15" fill="none" strokeDasharray="16 200" strokeDashoffset="-199" />
                </svg>
                <div style={{ position: 'absolute', textAlign: 'center' }}>
                  <span style={{ fontSize: '11px', fontWeight: 900, color: '#0F172A', display: 'block', lineHeight: 1.1 }}>₹1.21Cr</span>
                  <span style={{ fontSize: '9px', color: '#64748B' }}>Total</span>
                </div>
              </div>

              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '5px', fontSize: '11px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#2563EB', fontWeight: 700 }}>● Tuition</span> <span style={{ fontWeight: 700 }}>58%</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#06B6D4', fontWeight: 700 }}>● Transport</span> <span style={{ fontWeight: 700 }}>15%</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#F59E0B', fontWeight: 700 }}>● Hostel</span> <span style={{ fontWeight: 700 }}>10%</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#EC4899', fontWeight: 700 }}>● Exam</span> <span style={{ fontWeight: 700 }}>7%</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#8B5CF6', fontWeight: 700 }}>● Library</span> <span style={{ fontWeight: 700 }}>5%</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748B', fontWeight: 700 }}>● Others</span> <span style={{ fontWeight: 700 }}>5%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Expense Trend (YTD) */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', boxShadow: '0 2px 8px rgba(15, 23, 42, 0.02)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h4 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: '#0F172A' }}>Expense Trend (YTD)</h4>
              <span style={{ fontSize: '11px', color: '#64748B', background: '#F1F5F9', padding: '4px 10px', borderRadius: '6px', fontWeight: 600 }}>This Year ∨</span>
            </div>

            <div style={{ display: 'flex', gap: '16px', fontSize: '12px', fontWeight: 600 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#EF4444' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#EF4444' }} /> Expense</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#2563EB' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#2563EB' }} /> Budget</span>
            </div>

            <div style={{ height: '140px', marginTop: '4px' }}>
              <svg width="100%" height="100%" viewBox="0 0 200 100" preserveAspectRatio="none">
                <line x1="0" y1="20" x2="200" y2="20" stroke="#F1F5F9" strokeWidth="1" />
                <line x1="0" y1="50" x2="200" y2="50" stroke="#F1F5F9" strokeWidth="1" />
                <line x1="0" y1="80" x2="200" y2="80" stroke="#F1F5F9" strokeWidth="1" />
                
                <path d="M10,75 L50,70 L90,60 L130,45 L170,30" fill="none" stroke="#2563EB" strokeWidth="2" strokeDasharray="4 4" />
                <path d="M10,70 L50,78 L90,50 L130,55 L170,35" fill="none" stroke="#EF4444" strokeWidth="2.5" />
                
                <circle cx="170" cy="35" r="4" fill="#EF4444" />
                <circle cx="170" cy="30" r="4" fill="#2563EB" />
              </svg>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#94A3B8', marginTop: '4px', fontWeight: 600 }}>
                <span>Jan</span> <span>Feb</span> <span>Mar</span> <span>Apr</span> <span>May</span>
              </div>
            </div>
          </div>

        </div>

        {/* ─────────────────────────────────────────────────────────────────────────────
            ROW 5 (EXACTLY 3 SECTIONS: Recent Activities | Financial Calendar | AI Insights)
        ───────────────────────────────────────────────────────────────────────────── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: '20px', width: '100%' }}>
          
          {/* Section 1: Recent Activities */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px', boxShadow: '0 2px 8px rgba(15, 23, 42, 0.02)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h4 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: '#0F172A' }}>Recent Activities</h4>
              <span style={{ fontSize: '12px', color: '#2563EB', fontWeight: 700, cursor: 'pointer' }}>View All</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '12px' }}>
              {[
                { title: 'Payroll for May processed', amount: '₹2,85,000', time: '10:25 AM', icon: <Users size={14} style={{ color: '#10B981' }} /> },
                { title: 'Expense added - Electricity Bill', amount: '₹48,500', time: '10:32 AM', icon: <FileText size={14} style={{ color: '#2563EB' }} /> },
                { title: 'Vendor payment made to Dell', amount: '₹1,25,000', time: '11:15 AM', icon: <Landmark size={14} style={{ color: '#D97706' }} /> },
                { title: 'Invoice generated for Class 10', detail: 'INV-1256', time: '11:30 AM', icon: <FileCheck size={14} style={{ color: '#7C3AED' }} /> },
                { title: 'Receipt issued to Aman Singh', detail: 'RCPT-4589', time: '12:10 PM', icon: <CheckCircle2 size={14} style={{ color: '#10B981' }} /> },
              ].map((act, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', paddingBottom: '10px', borderBottom: idx < 4 ? '1px solid #F1F5F9' : 'none' }}>
                  <div style={{ padding: '8px', borderRadius: '10px', background: '#F8FAFC', border: '1px solid #F1F5F9', flexShrink: 0 }}>{act.icon}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <span style={{ fontWeight: 700, color: '#0F172A', display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{act.title}</span>
                    <span style={{ fontSize: '11px', color: '#64748B' }}>{act.amount || act.detail}</span>
                  </div>
                  <span style={{ fontSize: '10px', color: '#94A3B8', fontWeight: 600, flexShrink: 0 }}>{act.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Financial Calendar */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px', boxShadow: '0 2px 8px rgba(15, 23, 42, 0.02)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h4 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: '#0F172A' }}>Financial Calendar</h4>
              <span style={{ fontSize: '12px', color: '#2563EB', fontWeight: 700, cursor: 'pointer' }} onClick={() => navigate('/finance/calendar')}>View Calendar</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '12px' }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: 800, color: '#64748B' }}>Today, 22 May</span>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', borderRadius: '10px', background: '#EFF6FF', border: '1px solid #DBEAFE', marginTop: '6px' }}>
                  <span style={{ fontWeight: 700, color: '#1D4ED8' }}>Payroll Review Meeting</span>
                  <span style={{ fontSize: '11px', color: '#2563EB', fontWeight: 700 }}>02:00 PM</span>
                </div>
              </div>

              <div>
                <span style={{ fontSize: '11px', fontWeight: 800, color: '#64748B' }}>Tomorrow, 23 May</span>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', borderRadius: '10px', background: '#FEF2F2', border: '1px solid #FEE2E2', marginTop: '6px' }}>
                  <span style={{ fontWeight: 700, color: '#991B1B' }}>Electricity Bill Due</span>
                  <span style={{ fontSize: '11px', color: '#EF4444', fontWeight: 700 }}>All Day</span>
                </div>
              </div>

              <div>
                <span style={{ fontSize: '11px', fontWeight: 800, color: '#64748B' }}>24 May</span>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', borderRadius: '10px', background: '#FFFBEB', border: '1px solid #FEF3C7', marginTop: '6px' }}>
                  <span style={{ fontWeight: 700, color: '#92400E' }}>Fee Collection Review</span>
                  <span style={{ fontSize: '11px', color: '#D97706', fontWeight: 700 }}>11:00 AM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: AI Financial Insights */}
          <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px', boxShadow: '0 2px 8px rgba(15, 23, 42, 0.02)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '15px', fontWeight: 800, color: '#0F172A' }}>
                <Sparkles size={18} style={{ color: '#7C3AED' }} /> AI Financial Insights
              </div>
              <span style={{ fontSize: '10px', background: '#7C3AED', color: '#FFF', padding: '3px 10px', borderRadius: '12px', fontWeight: 800 }}>Real-time</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '12px' }}>
              <div style={{ background: '#FFFFFF', padding: '12px 14px', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
                <span style={{ fontWeight: 800, color: '#DC2626', fontSize: '12px' }}>🔴 Fee Collection Shift (-8%)</span>
                <p style={{ margin: '6px 0', color: '#64748B', lineHeight: 1.4 }}>Class 10 Q2 installments delayed due to recent exam schedule.</p>
                <span style={{ fontWeight: 700, color: '#0F172A', display: 'block', marginBottom: '8px', fontSize: '11px' }}>Prediction: ₹4.2 Lakhs expected recovery in 12 days.</span>
                <button onClick={() => showNotification("Automated reminders sent!")} style={{ border: 'none', background: '#2563EB', color: '#FFF', padding: '6px 14px', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', fontSize: '11px' }}>Send Reminders</button>
              </div>

              <div style={{ background: '#FFFFFF', padding: '12px 14px', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
                <span style={{ fontWeight: 800, color: '#D97706', fontSize: '12px' }}>⚡ Utility Spike (+14%)</span>
                <p style={{ margin: '6px 0', color: '#64748B', lineHeight: 1.4 }}>Electricity bill for May rose to ₹48,500 due to non-stop lab AC usage.</p>
                <button onClick={() => showNotification("Energy audit logged!")} style={{ border: '1px solid #E2E8F0', background: '#F1F5F9', color: '#334155', padding: '6px 14px', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', fontSize: '11px', marginTop: '4px' }}>Log Energy Audit Request</button>
              </div>
            </div>
          </div>

        </div>

        {/* ─────────────────────────────────────────────────────────────────────────────
            ROW 6 (EXACTLY 3 SECTIONS: Financial Reports | Notifications | Upcoming Events)
        ───────────────────────────────────────────────────────────────────────────── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: '20px', width: '100%' }}>
          
          {/* Section 1: Financial Reports Quick Access */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '14px', boxShadow: '0 2px 8px rgba(15, 23, 42, 0.02)' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <h4 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: '#0F172A' }}>Financial Reports</h4>
                <span style={{ fontSize: '12px', color: '#2563EB', fontWeight: 700, cursor: 'pointer' }} onClick={() => navigate('/finance/reports')}>View All</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(84px, 1fr))', gap: '8px' }}>
                {[
                  { label: 'P&L Statement', icon: <FileText size={16} style={{ color: '#2563EB' }} /> },
                  { label: 'Balance Sheet', icon: <Landmark size={16} style={{ color: '#10B981' }} /> },
                  { label: 'Cash Flow', icon: <TrendingUp size={16} style={{ color: '#06B6D4' }} /> },
                  { label: 'Revenue Log', icon: <FileCheck size={16} style={{ color: '#7C3AED' }} /> },
                  { label: 'Expense Log', icon: <FileText size={16} style={{ color: '#EF4444' }} /> },
                  { label: 'Payroll Log', icon: <Users size={16} style={{ color: '#D97706' }} /> },
                  { label: 'Due Dues', icon: <AlertCircle size={16} style={{ color: '#DB2777' }} /> },
                  { label: 'Scholarships', icon: <Award size={16} style={{ color: '#3B82F6' }} /> },
                ].map((rep, idx) => (
                  <button
                    key={idx}
                    onClick={() => navigate('/finance/reports')}
                    style={{
                      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '6px',
                      padding: '8px 4px', borderRadius: '10px', border: '1px solid #E2E8F0', background: '#F8FAFC',
                      cursor: 'pointer', transition: 'all 0.2s ease', minHeight: '68px'
                    }}
                  >
                    <div style={{ padding: '5px', borderRadius: '8px', background: '#FFF', boxShadow: '0 2px 6px rgba(0,0,0,0.04)', flexShrink: 0 }}>{rep.icon}</div>
                    <span style={{ fontSize: '10px', fontWeight: 700, color: '#334155', textAlign: 'center', lineHeight: 1.1 }}>{rep.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid #F1F5F9', paddingTop: '12px', flexWrap: 'wrap' }}>
              <button onClick={() => showNotification("PDF Export started!")} style={{ padding: '6px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', background: '#FFFFFF', color: '#334155', fontSize: '11px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Download size={13} /> PDF
              </button>
              <button onClick={() => showNotification("Excel Export started!")} style={{ padding: '6px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', background: '#FFFFFF', color: '#334155', fontSize: '11px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <FileSpreadsheet size={13} /> Excel
              </button>
              <button onClick={() => showNotification("Report schedule form opened!")} style={{ padding: '6px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', background: '#FFFFFF', color: '#334155', fontSize: '11px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Calendar size={13} /> Schedule
              </button>
            </div>
          </div>

          {/* Section 2: Notifications Widget */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px', boxShadow: '0 2px 8px rgba(15, 23, 42, 0.02)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h4 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: '#0F172A' }}>Notifications</h4>
              <span style={{ fontSize: '12px', color: '#2563EB', fontWeight: 700, cursor: 'pointer' }} onClick={() => navigate('/notifications')}>View All</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12px' }}>
              {[
                { text: 'Fee collection for Class 10 is 8% lower than last month.', time: '5m ago', color: '#F59E0B' },
                { text: 'Electricity expense exceeded monthly budget by 14%.', time: '15m ago', color: '#EF4444' },
                { text: 'Payroll for July is due in 3 days.', time: '1h ago', color: '#2563EB' },
                { text: 'Vendor payment to Dell is overdue.', time: '2h ago', color: '#EF4444' },
                { text: 'New GST notification for GSTR-3B filing.', time: '3h ago', color: '#7C3AED' },
              ].map((nt, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', paddingBottom: '8px', borderBottom: idx < 4 ? '1px solid #F1F5F9' : 'none' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: nt.color, marginTop: '4px', flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <span style={{ color: '#334155', fontWeight: 600, display: 'block', lineHeight: 1.4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{nt.text}</span>
                    <span style={{ fontSize: '10px', color: '#94A3B8' }}>{nt.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Upcoming Financial Events */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px', boxShadow: '0 2px 8px rgba(15, 23, 42, 0.02)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h4 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: '#0F172A' }}>Upcoming Events</h4>
              <span style={{ fontSize: '12px', color: '#2563EB', fontWeight: 700, cursor: 'pointer' }} onClick={() => navigate('/finance/calendar')}>View Calendar</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12px' }}>
              {[
                { day: '25', month: 'MAY', title: 'Staff Payroll Processing', sub: 'Due in 3 Days' },
                { day: '28', month: 'MAY', title: 'GST Payment (GSTR-3B)', sub: 'Due in 6 Days' },
                { day: '31', month: 'MAY', title: 'Fee Due Date', sub: 'Due in 9 Days' },
                { day: '05', month: 'JUN', title: 'Vendor Payment - Dell', sub: 'Due in 14 Days' },
                { day: '10', month: 'JUN', title: 'Monthly Financial Audit', sub: 'Due in 19 Days' },
              ].map((ev, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#F8FAFC', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ fontSize: '13px', fontWeight: 900, color: '#0F172A', lineHeight: 1 }}>{ev.day}</span>
                    <span style={{ fontSize: '8px', fontWeight: 800, color: '#64748B' }}>{ev.month}</span>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <span style={{ fontWeight: 700, color: '#0F172A', display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{ev.title}</span>
                    <span style={{ fontSize: '10px', color: '#94A3B8' }}>{ev.sub}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ─────────────────────────────────────────────────────────────────────────────
            ROW 7 (EXACTLY 3 SECTIONS: Today's Summary | Top Expense Categories | Quick Shortcuts)
        ───────────────────────────────────────────────────────────────────────────── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: '20px', width: '100%' }}>
          
          {/* Section 1: Today's Summary Widget */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', boxShadow: '0 2px 8px rgba(15, 23, 42, 0.02)' }}>
            <h4 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: '#0F172A' }}>Today's Summary</h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748B' }}>Cash In</span>
                <span style={{ fontWeight: 800, color: '#0F172A' }}>₹12,46,000</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748B' }}>Cash Out</span>
                <span style={{ fontWeight: 800, color: '#0F172A' }}>₹8,74,000</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px dashed #E2E8F0', paddingTop: '6px' }}>
                <span style={{ color: '#64748B', fontWeight: 700 }}>Net Flow</span>
                <span style={{ fontWeight: 900, color: '#10B981' }}>+₹3,72,000</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2px' }}>
                <span style={{ color: '#64748B' }}>Receipts</span>
                <span style={{ fontWeight: 800, color: '#0F172A' }}>86</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748B' }}>Payments</span>
                <span style={{ fontWeight: 800, color: '#0F172A' }}>48</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748B' }}>Refunds</span>
                <span style={{ fontWeight: 800, color: '#0F172A' }}>5</span>
              </div>
            </div>

            <button onClick={() => navigate('/finance/cashbook')} style={{ marginTop: '4px', border: 'none', background: 'transparent', color: '#2563EB', fontSize: '12px', fontWeight: 700, cursor: 'pointer', textAlign: 'center' }}>
              View Detailed Summary →
            </button>
          </div>

          {/* Section 2: Top Expense Categories (YTD) */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', boxShadow: '0 2px 8px rgba(15, 23, 42, 0.02)' }}>
            <h4 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: '#0F172A' }}>Top Expense Categories (YTD)</h4>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ position: 'relative', width: '90px', height: '90px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="90" height="90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="36" stroke="#2563EB" strokeWidth="14" fill="none" strokeDasharray="110 200" strokeDashoffset="0" />
                  <circle cx="50" cy="50" r="36" stroke="#06B6D4" strokeWidth="14" fill="none" strokeDasharray="60 200" strokeDashoffset="-110" />
                  <circle cx="50" cy="50" r="36" stroke="#F59E0B" strokeWidth="14" fill="none" strokeDasharray="25 200" strokeDashoffset="-170" />
                  <circle cx="50" cy="50" r="36" stroke="#EC4899" strokeWidth="14" fill="none" strokeDasharray="18 200" strokeDashoffset="-195" />
                </svg>
              </div>

              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '11px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#2563EB', fontWeight: 700 }}>● Payroll</span> <span style={{ fontWeight: 700 }}>48%</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#06B6D4', fontWeight: 700 }}>● Electricity</span> <span style={{ fontWeight: 700 }}>28%</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#F59E0B', fontWeight: 700 }}>● Transport</span> <span style={{ fontWeight: 700 }}>11%</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#EC4899', fontWeight: 700 }}>● IT & Internet</span> <span style={{ fontWeight: 700 }}>8%</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#EF4444', fontWeight: 700 }}>● Maintenance</span> <span style={{ fontWeight: 700 }}>13%</span>
                </div>
              </div>
            </div>

            <button onClick={() => navigate('/finance/expenses')} style={{ marginTop: '2px', border: 'none', background: 'transparent', color: '#2563EB', fontSize: '12px', fontWeight: 700, cursor: 'pointer', textAlign: 'center' }}>
              View Full Report →
            </button>
          </div>

          {/* Section 3: Quick Shortcuts */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px', boxShadow: '0 2px 8px rgba(15, 23, 42, 0.02)' }}>
            <h4 style={{ fontSize: '15px', fontWeight: 800, margin: '0 0 2px 0', color: '#0F172A' }}>Quick Shortcuts</h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {[
                { label: 'Add New Vendor', route: '/finance/vendors' },
                { label: 'Create New Invoice', route: '/fees' },
                { label: 'Record Bank Deposit', route: '/finance/banking' },
                { label: 'Generate Balance Sheet', route: '/finance/reports' },
                { label: 'Download GST Report', route: '/finance/taxation' },
              ].map((sc, idx) => (
                <button
                  key={idx}
                  onClick={() => navigate(sc.route)}
                  style={{
                    padding: '8px 12px', borderRadius: '8px', border: '1px solid #EFF6FF', background: '#F8FAFC',
                    color: '#1E40AF', fontSize: '11px', fontWeight: 700, cursor: 'pointer', textAlign: 'left',
                    display: 'flex', alignItems: 'center', gap: '6px', transition: 'all 0.15s ease'
                  }}
                >
                  + {sc.label}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* ─────────────────────────────────────────────────────────────────────────────
            ROW 8 (FULL-WIDTH BOTTOM COMPARISON OVERVIEW)
        ───────────────────────────────────────────────────────────────────────────── */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '22px', display: 'flex', flexDirection: 'column', gap: '16px', boxShadow: '0 2px 8px rgba(15, 23, 42, 0.02)', width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h4 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: '#0F172A' }}>Monthly Comparison Overview</h4>
            <span style={{ fontSize: '12px', color: '#64748B', background: '#F1F5F9', padding: '5px 12px', borderRadius: '8px', fontWeight: 600 }}>April 2025 vs March 2025 ∨</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '20px', borderTop: '1px solid #F1F5F9', paddingTop: '16px' }}>
            <div>
              <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>Revenue</span>
              <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#0F172A', margin: '4px 0 2px 0' }}>₹1,21,60,000</h3>
              <span style={{ fontSize: '11px', color: '#10B981', fontWeight: 700 }}>↑ 12.4%</span>
            </div>
            <div>
              <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>Expenses</span>
              <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#0F172A', margin: '4px 0 2px 0' }}>₹93,15,000</h3>
              <span style={{ fontSize: '11px', color: '#EF4444', fontWeight: 700 }}>↑ 8.6%</span>
            </div>
            <div>
              <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>Net Profit</span>
              <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#0F172A', margin: '4px 0 2px 0' }}>₹28,45,000</h3>
              <span style={{ fontSize: '11px', color: '#10B981', fontWeight: 700 }}>↑ 21.3%</span>
            </div>
            <div>
              <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>Collection Efficiency</span>
              <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#0F172A', margin: '4px 0 2px 0' }}>92.6%</h3>
              <span style={{ fontSize: '11px', color: '#10B981', fontWeight: 700 }}>↑ 6.2%</span>
            </div>
            <div>
              <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>Expense Ratio</span>
              <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#0F172A', margin: '4px 0 2px 0' }}>76.2%</h3>
              <span style={{ fontSize: '11px', color: '#EF4444', fontWeight: 700 }}>↓ 2.1%</span>
            </div>
          </div>
        </div>

      </div>
    </PageLayout>
  );
}
