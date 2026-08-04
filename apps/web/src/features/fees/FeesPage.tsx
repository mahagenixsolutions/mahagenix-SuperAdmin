import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PageLayout } from '../../components/erp/PageLayout';
import { PageHeader } from '../../components/erp/PageHeader';
import { DataGrid } from '../../components/erp/DataGrid';
import type { GridColumn } from '../../components/erp/DataGrid';
import { KPICard } from '../../components/erp/KPICard';
import { Tabs } from '../../components/ui/Tabs';
import { 
  Plus, CreditCard, Banknote, ShieldAlert, Award,
  Layers, Percent, TrendingDown, TrendingUp, FileText,
  Download, Calendar, Tag, ShieldCheck, DollarSign
} from 'lucide-react';

interface FeeStructureItem {
  className: string;
  tuitionFee: string;
  termFee: string;
  examFee: string;
  total: string;
}

interface FeeTransaction {
  id: string;
  studentName: string;
  className: string;
  amount: string;
  date: string;
  method: string;
  receiptNo: string;
}

interface PendingFeeItem {
  id: string;
  studentName: string;
  className: string;
  pendingAmount: string;
  daysOverdue: number;
  fineAmount: string;
}

interface ScholarshipItem {
  studentName: string;
  className: string;
  scholarshipName: string;
  waiverPercent: string;
}

const mockStructures: FeeStructureItem[] = [
  { className: 'Class 10 A', tuitionFee: '₹40,000', termFee: '₹15,000', examFee: '₹5,000', total: '₹60,000' },
  { className: 'Class 9 A', tuitionFee: '₹35,000', termFee: '₹10,000', examFee: '₹3,000', total: '₹48,000' },
  { className: 'Class 5 B', tuitionFee: '₹30,000', termFee: '₹12,000', examFee: '₹3,000', total: '₹45,000' }
];

const mockTransactions: FeeTransaction[] = [
  { id: 'txn-1', studentName: 'John Doe', className: 'Class 10 A', amount: '₹15,000', date: '2026-06-30', method: 'Online UPI', receiptNo: 'REC-901' },
  { id: 'txn-2', studentName: 'Sanya Malhotra', className: 'Class 5 B', amount: '₹45,000', date: '2026-06-28', method: 'Card Swipe', receiptNo: 'REC-902' }
];

const mockPending: PendingFeeItem[] = [
  { id: 'pend-1', studentName: 'Rohan Gupta', className: 'Class 1 A', pendingAmount: '₹18,000', daysOverdue: 5, fineAmount: '₹250' },
  { id: 'pend-2', studentName: 'Aditya Roy', className: 'Class 3 A', pendingAmount: '₹24,000', daysOverdue: 12, fineAmount: '₹600' }
];

const mockScholarships: ScholarshipItem[] = [
  { studentName: 'John Doe', className: 'Class 10 A', scholarshipName: 'Merit Scholarship', waiverPercent: '50% Waiver' },
  { studentName: 'Kabir Verma', className: 'Class 9 A', scholarshipName: 'Sports Excellence Waiver', waiverPercent: '100% Waiver' }
];

export interface ExpenseItem {
  id: string;
  date: string;
  category: string;
  description: string;
  amount: string;
  payee: string;
  status: 'Paid' | 'Pending';
}

export interface IncomeItem {
  category: string;
  monthlyReceipts: string;
  annualForecast: string;
  growth: string;
}

export interface InvoiceItem {
  id: string;
  invoiceNo: string;
  studentName: string;
  className: string;
  dueDate: string;
  amount: string;
  status: 'Sent' | 'Paid' | 'Overdue';
}

const mockExpenses: ExpenseItem[] = [
  { id: 'exp-1', date: '2026-07-15', category: 'Utilities', description: 'Electricity bill for campus building A', amount: '₹45,000', payee: 'State Electricity Board', status: 'Paid' },
  { id: 'exp-2', date: '2026-07-12', category: 'Supplies', description: 'Classroom science lab chemicals & tubes', amount: '₹12,500', payee: 'Apex Diagnostics', status: 'Paid' },
  { id: 'exp-3', date: '2026-07-10', category: 'Maintenance', description: 'HVAC repairs in auditorium', amount: '₹28,000', payee: 'Perfect Air Services', status: 'Paid' },
  { id: 'exp-4', date: '2026-07-08', category: 'Transport', description: 'School bus fuel and maintenance', amount: '₹35,000', payee: 'Bharat Petroleum', status: 'Paid' }
];

const mockIncome: IncomeItem[] = [
  { category: 'Tuition Fees', monthlyReceipts: '₹7,20,000', annualForecast: '₹86,40,000', growth: '+12.5%' },
  { category: 'Transport Fees', monthlyReceipts: '₹98,000', annualForecast: '₹11,76,000', growth: '+8.2%' },
  { category: 'Hostel Fees', monthlyReceipts: '₹1,20,000', annualForecast: '₹14,40,000', growth: '+15.0%' },
  { category: 'Admission Fees', monthlyReceipts: '₹45,000', annualForecast: '₹5,40,000', growth: '+20.1%' },
  { category: 'Exam Fees', monthlyReceipts: '₹32,000', annualForecast: '₹3,84,000', growth: '+4.5%' }
];

const mockInvoices: InvoiceItem[] = [
  { id: 'inv-1', invoiceNo: 'INV-2026-001', studentName: 'Rohan Gupta', className: 'Class 1 A', dueDate: '2026-07-15', amount: '₹18,000', status: 'Overdue' },
  { id: 'inv-2', invoiceNo: 'INV-2026-002', studentName: 'Aditya Roy', className: 'Class 3 A', dueDate: '2026-07-20', amount: '₹24,000', status: 'Overdue' },
  { id: 'inv-3', invoiceNo: 'INV-2026-003', studentName: 'Ria Sen', className: 'Class 10 A', dueDate: '2026-07-30', amount: '₹60,000', status: 'Sent' },
  { id: 'inv-4', invoiceNo: 'INV-2026-004', studentName: 'Sanya Malhotra', className: 'Class 5 B', dueDate: '2026-06-28', amount: '₹45,000', status: 'Paid' }
];

const FeesPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const activeTab = (searchParams.get('tab') || 'dashboard') as
    | 'dashboard'
    | 'structure'
    | 'scholarships'
    | 'discounts'
    | 'expenses'
    | 'income'
    | 'invoices'
    | 'receipts';

  const setActiveTab = (tab: string) => {
    setSearchParams({ tab });
  };

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const structureColumns: GridColumn<FeeStructureItem>[] = [
    { key: 'className', header: 'Class Room', sortable: true },
    { key: 'tuitionFee', header: 'Tuition Fee' },
    { key: 'termFee', header: 'Term Fee' },
    { key: 'examFee', header: 'Exam Fee' },
    { key: 'total', header: 'Total Slabs', sortable: true }
  ];

  const transactionColumns: GridColumn<FeeTransaction>[] = [
    { key: 'receiptNo', header: 'Receipt No', sortable: true },
    { key: 'studentName', header: 'Student Name', sortable: true },
    { key: 'className', header: 'Class Room' },
    { key: 'amount', header: 'Amount Paid', sortable: true },
    { key: 'date', header: 'Transaction Date', sortable: true },
    { key: 'method', header: 'Payment Method' }
  ];

  const pendingColumns: GridColumn<PendingFeeItem>[] = [
    { key: 'studentName', header: 'Student Name', sortable: true },
    { key: 'className', header: 'Class Room' },
    { key: 'pendingAmount', header: 'Pending Dues', sortable: true },
    { key: 'daysOverdue', header: 'Days Overdue', sortable: true },
    { key: 'fineAmount', header: 'Accrued Fines', sortable: true }
  ];

  const scholarshipColumns: GridColumn<ScholarshipItem>[] = [
    { key: 'studentName', header: 'Student Name', sortable: true },
    { key: 'className', header: 'Class Room' },
    { key: 'scholarshipName', header: 'Waiver Scheme', sortable: true },
    { key: 'waiverPercent', header: 'Scholarship Details' }
  ];

  const expenseColumns: GridColumn<ExpenseItem>[] = [
    { key: 'date', header: 'Date', sortable: true },
    { key: 'category', header: 'Category', sortable: true },
    { key: 'description', header: 'Description' },
    { key: 'amount', header: 'Amount', sortable: true },
    { key: 'payee', header: 'Payee / Vendor', sortable: true },
    { key: 'status', header: 'Status' }
  ];

  const incomeColumns: GridColumn<IncomeItem>[] = [
    { key: 'category', header: 'Income Stream', sortable: true },
    { key: 'monthlyReceipts', header: 'Monthly Receipts' },
    { key: 'annualForecast', header: 'Annual Forecasted' },
    { key: 'growth', header: 'Year-over-Year Growth' }
  ];

  const invoiceColumns: GridColumn<InvoiceItem>[] = [
    { key: 'invoiceNo', header: 'Invoice ID', sortable: true },
    { key: 'studentName', header: 'Student Name', sortable: true },
    { key: 'className', header: 'Class Room' },
    { key: 'dueDate', header: 'Due Date', sortable: true },
    { key: 'amount', header: 'Invoice Amount', sortable: true },
    { key: 'status', header: 'Status' }
  ];

  const allTabs = [
    { id: 'dashboard', label: 'Dashboard', icon: <CreditCard size={15} /> },
    { id: 'structure', label: 'Fee Structure', icon: <Layers size={15} /> },
    { id: 'scholarships', label: 'Scholarships', icon: <Award size={15} /> },
    { id: 'discounts', label: 'Discounts', icon: <Percent size={15} /> },
    { id: 'expenses', label: 'Expenses', icon: <TrendingDown size={15} /> },
    { id: 'income', label: 'Income', icon: <TrendingUp size={15} /> },
    { id: 'invoices', label: 'Invoices', icon: <FileText size={15} /> },
    { id: 'receipts', label: 'Receipts', icon: <Download size={15} /> },
  ];

  const headerContent = {
    title: 'Fees & Invoices Hub',
    subtitle: 'Manage classroom tuition fee configurations, record payments collection, and student waivers',
    breadcrumbs: [{ label: 'Fees' }],
    actionText: '+ Configure Slabs',
    toastText: 'Opening slab configurations...',
  };

  return (
    <PageLayout>
      {toastMessage && (
        <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 9999 }}>
          <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 10, padding: '12px 20px', boxShadow: 'var(--shadow-lg)' }}>
            <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)' }}>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Page Header */}
      <PageHeader
        title={headerContent.title}
        subtitle={headerContent.subtitle}
        breadcrumbs={headerContent.breadcrumbs}
        actions={
          <button 
            className="btn btn-primary btn-sm" 
            style={{ display: 'flex', gap: '6px', alignItems: 'center' }}
            onClick={() => triggerToast(headerContent.toastText)}
          >
            <Plus size={15} /> {headerContent.actionText}
          </button>
        }
      />

      {/* KPI Section */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '24px',
        marginTop: '24px',
        marginBottom: '24px'
      }}>
        <KPICard title="Total Receivable" value="₹12,45,000" icon={<CreditCard size={20} />} accentColor="var(--accent-primary)" />
        <KPICard title="Fees Collected" value="₹8,92,000" icon={<Banknote size={20} />} accentColor="var(--accent-success)" />
        <KPICard title="Pending Dues" value="₹3,53,000" icon={<ShieldAlert size={20} />} accentColor="var(--accent-danger)" />
        <KPICard title="Waivers Disbursed" value="₹42,000" icon={<Award size={20} />} accentColor="var(--accent-violet)" />
      </div>

      {/* Navigation Tabs */}
      <Tabs
        tabs={allTabs}
        activeTab={activeTab}
        onChange={(id) => setActiveTab(id as any)}
        variant="default"
        style={{ marginBottom: '20px' }}
      />

      <div style={{ marginTop: '24px' }}>
        {/* Tab 1: Fee Dashboard */}
        {activeTab === 'dashboard' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px' }}>
              <div className="card" style={{ padding: '20px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px' }}>Fee Collections Summary</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Academic Year Target</span>
                    <strong style={{ fontSize: '15px', color: 'var(--text-primary)' }}>₹25,00,000</strong>
                  </div>
                  <div style={{ height: '8px', background: 'var(--bg-surface-raised)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: '74%', height: '100%', background: 'linear-gradient(90deg, var(--accent-primary) 0%, var(--accent-success) 100%)', borderRadius: '4px' }}></div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-secondary)' }}>
                    <span>Collected: 74%</span>
                    <span>Remaining: ₹6,55,000</span>
                  </div>
                </div>
              </div>

              <div className="card" style={{ padding: '20px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px' }}>Fine Policy Rules</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px dashed var(--border-subtle)' }}>
                    <span>Late Payment Grace Term</span>
                    <strong style={{ color: 'var(--text-primary)' }}>7 Days</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px dashed var(--border-subtle)' }}>
                    <span>Accruing Penalty Rate</span>
                    <strong style={{ color: 'var(--accent-danger)' }}>₹50 / Day</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Max Penalty Limit</span>
                    <strong style={{ color: 'var(--text-primary)' }}>₹2,500 Max</strong>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="card" style={{ padding: '20px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px' }}>Recent Collections Activity</h3>
              <DataGrid
                columns={transactionColumns}
                data={mockTransactions}
                keyField="id"
              />
            </div>
          </div>
        )}

        {/* Tab 2: Fee Structure */}
        {activeTab === 'structure' && (
          <div className="card" style={{ padding: '20px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>Tuition Fee Slabs per Grade</h3>
              <button className="btn btn-secondary btn-sm" onClick={() => triggerToast('Opening Fee slab creator...')}>+ Add Slab</button>
            </div>
            <DataGrid
              columns={structureColumns}
              data={mockStructures}
              keyField="className"
            />
          </div>
        )}

        {/* Tab 3: Scholarships */}
        {activeTab === 'scholarships' && (
          <div className="card" style={{ padding: '20px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>Student Scholarship Waivers</h3>
              <button className="btn btn-secondary btn-sm" onClick={() => triggerToast('Opening Scholarship grant forms...')}>+ Grant Scholarship</button>
            </div>
            <DataGrid
              columns={scholarshipColumns}
              data={mockScholarships}
              keyField="studentName"
            />
          </div>
        )}

        {/* Tab 4: Discounts */}
        {activeTab === 'discounts' && (
          <div className="card" style={{ padding: '20px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>Active Sibling & Staff Discount Slabs</h3>
              <button className="btn btn-secondary btn-sm" onClick={() => triggerToast('Opening discount configurations...')}>+ Configure Discounts</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginTop: '12px' }}>
              {[
                { name: 'Sibling Waiver', rate: '10% Off Tuition', desc: 'Applicable to families with multiple children enrolled in current term.' },
                { name: 'Staff Child Waiver', rate: '25% Off Tuition', desc: 'Applicable to children of full-time teaching faculty and administrators.' },
                { name: 'Sports Merit Waiver', rate: '15% Off Term Fees', desc: 'Applicable to students representing state or national level athletics.' }
              ].map((disc, idx) => (
                <div key={idx} style={{ padding: '16px', background: 'var(--bg-surface-raised)', border: '1px solid var(--border-subtle)', borderRadius: '8px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '120px' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <strong style={{ fontSize: '14px', color: 'var(--text-primary)' }}>{disc.name}</strong>
                      <span style={{ fontSize: '12px', background: 'var(--accent-success-surface)', color: 'var(--accent-success)', padding: '2px 8px', borderRadius: '4px', fontWeight: 600 }}>{disc.rate}</span>
                    </div>
                    <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.4 }}>{disc.desc}</p>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
                    <button className="btn btn-ghost btn-sm" style={{ padding: '2px 6px', fontSize: '11px', border: '1px solid var(--border-subtle)' }} onClick={() => triggerToast(`Configuring ${disc.name}...`)}>Edit Rules</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: Expenses */}
        {activeTab === 'expenses' && (
          <div className="card" style={{ padding: '20px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>School Expenses & Expenditures</h3>
              <button className="btn btn-secondary btn-sm" onClick={() => triggerToast('Opening Expense Logger panel...')}>+ Record Expense</button>
            </div>
            <DataGrid
              columns={expenseColumns}
              data={mockExpenses}
              keyField="id"
              actions={(row) => (
                <button 
                  className="btn btn-ghost btn-sm"
                  onClick={() => triggerToast(`Viewing invoice/voucher for payee: ${row.payee}`)}
                  style={{ border: '1px solid var(--border-subtle)', fontSize: '12px' }}
                >
                  View Voucher
                </button>
              )}
            />
          </div>
        )}

        {/* Tab 6: Income */}
        {activeTab === 'income' && (
          <div className="card" style={{ padding: '20px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>School Revenue & Income Streams</h3>
              <button className="btn btn-secondary btn-sm" onClick={() => triggerToast('Generating Income Statements...')}>Export Excel</button>
            </div>
            <DataGrid
              columns={incomeColumns}
              data={mockIncome}
              keyField="category"
            />
          </div>
        )}

        {/* Tab 7: Invoices */}
        {activeTab === 'invoices' && (
          <div className="card" style={{ padding: '20px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>Student Fee Invoices</h3>
              <button className="btn btn-secondary btn-sm" onClick={() => triggerToast('Opening invoice batch generator...')}>+ Create Invoice</button>
            </div>
            <DataGrid
              columns={invoiceColumns}
              data={mockInvoices}
              keyField="id"
              actions={(row) => (
                <button 
                  className="btn btn-secondary btn-sm"
                  onClick={() => triggerToast(`Overdue reminder sent to student: ${row.studentName}`)}
                  style={{ fontSize: '12px' }}
                >
                  Remind
                </button>
              )}
            />
          </div>
        )}

        {/* Tab 8: Receipts */}
        {activeTab === 'receipts' && (
          <div className="card" style={{ padding: '20px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>Transaction Payment Receipts</h3>
              <button className="btn btn-secondary btn-sm" onClick={() => triggerToast('Exporting transaction receipt report...')}>Export Report</button>
            </div>
            <DataGrid
              columns={transactionColumns}
              data={mockTransactions}
              keyField="id"
              actions={(row) => (
                <button 
                  className="btn btn-ghost btn-sm"
                  onClick={() => triggerToast(`🎟️ Downloading receipt PDF for transaction ref: ${row.receiptNo}`)}
                  style={{ border: '1px solid var(--border-subtle)', fontSize: '12px' }}
                >
                  Download PDF
                </button>
              )}
            />
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default FeesPage;
