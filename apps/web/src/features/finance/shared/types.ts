export const FINANCE_TYPES_VERSION = '1.0.0';

export type ApprovalStatus = 'Pending' | 'Approved' | 'Rejected' | 'In Review' | 'Processed';

export interface ExpenseItem {
  id: string;
  title: string;
  category: 'Electricity' | 'Water' | 'Internet' | 'Furniture' | 'Computers' | 'Lab Equipment' | 'Maintenance' | 'Security' | 'Events' | 'Miscellaneous';
  vendor: string;
  amount: number;
  date: string;
  status: ApprovalStatus;
  approvedBy?: string;
  billNumber: string;
  receiptUrl?: string;
  notes?: string;
}

export interface PayrollRecord {
  id: string;
  staffId: string;
  staffName: string;
  role: 'Teacher' | 'Admin' | 'Support Staff' | 'Security' | 'Management';
  month: string;
  baseSalary: number;
  allowances: number;
  pfDeduction: number;
  esiDeduction: number;
  tdsDeduction: number;
  netSalary: number;
  status: 'Pending' | 'Processed' | 'Paid';
  paymentDate?: string;
  paymentMethod?: 'Direct Deposit' | 'Bank Transfer' | 'Cheque';
}

export interface ProcurementItem {
  id: string;
  poNumber: string;
  department: string;
  requestedBy: string;
  vendorName: string;
  items: Array<{ name: string; quantity: number; unitPrice: number; total: number }>;
  totalAmount: number;
  status: 'Draft' | 'Pending Approval' | 'Approved by Principal' | 'Ordered' | 'Goods Received' | 'Paid';
  createdDate: string;
  expectedDelivery: string;
}

export interface BankAccount {
  id: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
  ifscCode: string;
  branch: string;
  accountType: 'Current' | 'Savings' | 'Overdraft' | 'Cash Vault';
  currentBalance: number;
  unclearedAmount: number;
  lastReconciledDate: string;
}

export interface CashBookEntry {
  id: string;
  date: string;
  voucherNo: string;
  description: string;
  cashIn: number;
  cashOut: number;
  category: string;
  handoverCashier: string;
}

export interface ReconciliationRecord {
  id: string;
  date: string;
  gateway: 'Bank Statement' | 'UPI Gateway' | 'POS Terminal' | 'Cash Box';
  referenceNo: string;
  bookAmount: number;
  bankAmount: number;
  discrepancy: number;
  status: 'Matched' | 'Unmatched' | 'Resolved';
}

export interface JournalEntry {
  id: string;
  journalNo: string;
  date: string;
  description: string;
  entries: Array<{
    accountName: string;
    accountCode: string;
    debit: number;
    credit: number;
  }>;
  postedBy: string;
  status: 'Draft' | 'Posted';
}

export interface RefundRecord {
  id: string;
  refundNo: string;
  studentName: string;
  rollNo: string;
  class: string;
  category: 'Admission Cancellation' | 'Security Deposit' | 'Duplicate Payment' | 'Scholarship Adjustment';
  amount: number;
  status: 'Requested' | 'Pending Approval' | 'Approved' | 'Refunded';
  requestedDate: string;
  approvedBy?: string;
}

export interface DepartmentBudget {
  id: string;
  department: string;
  annualAllocation: number;
  spentToDate: number;
  committedPOs: number;
  remaining: number;
  utilizationPercent: number;
}

export interface Vendor {
  id: string;
  vendorName: string;
  category: string;
  gstin: string;
  contactPerson: string;
  phone: string;
  email: string;
  outstandingBalance: number;
  totalPaid: number;
  rating: number;
}

export interface TaxReportItem {
  period: string;
  gstCollected: number;
  gstPaidInputCredit: number;
  netGstPayable: number;
  tdsDeducted: number;
  status: 'Filing Pending' | 'Filed' | 'Audited';
}

export interface FinancialAuditLog {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  module: string;
  amount?: number;
  details: string;
  ipAddress: string;
}

export interface FinancialCalendarEvent {
  id: string;
  date: string;
  title: string;
  category: 'Payroll' | 'Tax Due' | 'Fee Deadline' | 'Vendor Payment' | 'Audit';
  amount?: number;
  urgency: 'high' | 'medium' | 'low';
}
