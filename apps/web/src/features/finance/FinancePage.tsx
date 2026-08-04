import React from 'react';
import { PageLayout } from '../../components/erp/PageLayout';
import FeeManagementModule from './fees/FeeManagementModule';
import ExpensesModule from './expenses/ExpensesModule';
import PayrollModule from './payroll/PayrollModule';
import InvoicesBillingModule from './invoices/InvoicesBillingModule';
import AccountsReceivableModule from './receivables/AccountsReceivableModule';
import AccountsPayableModule from './payables/AccountsPayableModule';
import VendorsModule from './vendors/VendorsModule';
import ProcurementModule from './procurement/ProcurementModule';
import BankingModule from './banking/BankingModule';
import CashBookModule from './cashbook/CashBookModule';
import BudgetModule from './budget/BudgetModule';
import AssetManagementModule from './assets/AssetManagementModule';
import TaxationModule from './taxation/TaxationModule';
import FinancialReportsModule from './reports/FinancialReportsModule';
import FinanceIntelligenceModule from './intelligence/FinanceIntelligenceModule';
import FinanceSettingsModule from './settings/FinanceSettingsModule';
import { Link } from 'react-router-dom';

export type FinanceTab =
  | 'fees' | 'expenses' | 'payroll' | 'invoices'
  | 'receivables' | 'payables' | 'vendors' | 'procurement' | 'banking'
  | 'cashbook' | 'budget' | 'assets' | 'taxation' | 'reports'
  | 'intelligence' | 'settings';

interface FinancePageProps {
  defaultTab?: FinanceTab;
}

export default function FinancePage({ defaultTab = 'fees' }: FinancePageProps) {
  const titles: Record<FinanceTab, { title: string; subtitle: string }> = {
    fees: { title: 'Student Fee Management & Collections', subtitle: 'Fee collection register, pending dues, late fee calculations, scholarships, concessions & receipts.' },
    expenses: { title: 'Expense Management & Approvals', subtitle: 'Track utility bills, maintenance expenses, lab equipment, vendor bills & multi-tier approval vouchers.' },
    payroll: { title: 'Payroll Coordination & Salaries', subtitle: 'Teacher & staff salary register, allowances, PF, ESI, TDS deductions, approvals & pay slips.' },
    invoices: { title: 'Invoices & Billing Register', subtitle: 'Generate institutional invoices, billing receipts, credit/debit notes & templates.' },
    receivables: { title: 'Accounts Receivable & Aging', subtitle: 'Outstanding fee dues, payment aging reports (0-90+ days) & automated collection reminders.' },
    payables: { title: 'Accounts Payable & Vendor Bills', subtitle: 'Pending vendor bills, purchase bill matching, payment schedules & vendor ledgers.' },
    vendors: { title: 'Procurement & Vendor Directory', subtitle: 'Supplier profiles, purchase orders (PO), purchase requests (PR), contracts & rating logs.' },
    procurement: { title: 'Procurement & Purchase Orders', subtitle: 'Manage Purchase Requests, PO approvals, Goods Received Notes (GRN) & vendor payments.' },
    banking: { title: 'Banking, Cashbook & Treasury', subtitle: 'Institutional bank account balances (HDFC, ICICI, SBI), daily vault cashbook & reconciliation.' },
    cashbook: { title: 'Daily Cash Book Ledger', subtitle: 'Daily Cash In vs Cash Out ledger, cashier balancing & vault opening/closing totals.' },
    budget: { title: 'Annual Budget & Allocations', subtitle: 'Annual budget allocations (FY 2026-27), department spending caps, utilization & variance analysis.' },
    assets: { title: 'Fixed Asset Register & Depreciation', subtitle: 'Asset catalog, purchase logs, depreciation schedules (Straight-line / WDV) & disposals.' },
    taxation: { title: 'Taxation & GST Compliance', subtitle: 'GST returns (GSTR-1, GSTR-3B), TDS deductions, tax challans & compliance calendar.' },
    reports: { title: 'Financial Reports & Audit Statements', subtitle: 'Balance Sheet, Profit & Loss (P&L), Cash Flow statement, Trial Balance & PDF/Excel exports.' },
    intelligence: { title: 'AI Finance Intelligence & Forecasts', subtitle: 'AI Financial Health Score (94/100), revenue/expense ML forecasts & cost optimization alerts.' },
    settings: { title: 'Finance Settings & Governance', subtitle: 'Configure Financial Year (FY 2026-27), fee/expense category trees, tax rates & approval rules.' },
  };

  const currentInfo = titles[defaultTab] || titles.fees;

  return (
    <PageLayout>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: '100%', fontFamily: "'Inter', sans-serif" }}>

        {/* Header Banner */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid #E5E7EB',
          borderRadius: 18,
          padding: '24px 28px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 16,
          boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
        }}>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 800, color: '#111827', margin: '0 0 4px 0', letterSpacing: '-0.02em' }}>
              {currentInfo.title}
            </h1>
            <p style={{ fontSize: 13, color: '#6B7280', margin: 0 }}>
              {currentInfo.subtitle}
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Link to="/finance/fees" style={{ textDecoration: 'none' }}>
              <div style={{
                padding: '9px 16px', borderRadius: 10, background: '#3B82F6',
                color: '#FFF', fontWeight: 600, fontSize: 13, boxShadow: '0 2px 6px rgba(59,130,246,0.3)',
                display: 'flex', alignItems: 'center', gap: 6
              }}>
                Student Fee Collection →
              </div>
            </Link>
          </div>
        </div>

        {/* Render Tab Module */}
        {defaultTab === 'fees' && <FeeManagementModule />}
        {defaultTab === 'expenses' && <ExpensesModule />}
        {defaultTab === 'payroll' && <PayrollModule />}
        {defaultTab === 'invoices' && <InvoicesBillingModule />}
        {defaultTab === 'receivables' && <AccountsReceivableModule />}
        {defaultTab === 'payables' && <AccountsPayableModule />}
        {defaultTab === 'vendors' && <VendorsModule />}
        {defaultTab === 'procurement' && <ProcurementModule />}
        {defaultTab === 'banking' && <BankingModule />}
        {defaultTab === 'cashbook' && <CashBookModule />}
        {defaultTab === 'budget' && <BudgetModule />}
        {defaultTab === 'assets' && <AssetManagementModule />}
        {defaultTab === 'taxation' && <TaxationModule />}
        {defaultTab === 'reports' && <FinancialReportsModule />}
        {defaultTab === 'intelligence' && <FinanceIntelligenceModule />}
        {defaultTab === 'settings' && <FinanceSettingsModule />}

      </div>
    </PageLayout>
  );
}
