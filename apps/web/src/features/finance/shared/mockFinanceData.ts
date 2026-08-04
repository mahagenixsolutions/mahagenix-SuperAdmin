import type { 
  ExpenseItem, PayrollRecord, ProcurementItem, BankAccount, CashBookEntry, 
  ReconciliationRecord, JournalEntry, RefundRecord, DepartmentBudget, 
  Vendor, TaxReportItem, FinancialAuditLog, FinancialCalendarEvent 
} from './types';

export const mockExpenses: ExpenseItem[] = [
  { id: 'EXP-101', title: 'Monthly Electricity Bill', category: 'Electricity', vendor: 'State Electricity Board', amount: 48500, date: '2026-07-15', status: 'Approved', approvedBy: 'Dr. Ramesh Sharma (Principal)', billNumber: 'EL-99824', notes: 'High usage due to ACs in summer labs' },
  { id: 'EXP-102', title: 'High-Speed Fiber Internet', category: 'Internet', vendor: 'Airtel Enterprise', amount: 12000, date: '2026-07-18', status: 'Approved', approvedBy: 'Dr. Ramesh Sharma (Principal)', billNumber: 'BB-4421' },
  { id: 'EXP-103', title: 'Computer Lab Upgrades', category: 'Computers', vendor: 'Dell India Solutions', amount: 245000, date: '2026-07-20', status: 'Pending', billNumber: 'INV-8871', notes: '15 new i7 desktop units for Senior Lab' },
  { id: 'EXP-104', title: 'Science Lab Consumables', category: 'Lab Equipment', vendor: 'BioChem Supplies Ltd', amount: 34200, date: '2026-07-19', status: 'Approved', approvedBy: 'Rajesh Verma (Accountant)', billNumber: 'BC-1102' },
  { id: 'EXP-105', title: 'Campus CCTV Maintenance', category: 'Maintenance', vendor: 'SecureTech Systems', amount: 18500, date: '2026-07-12', status: 'Approved', approvedBy: 'Dr. Ramesh Sharma (Principal)', billNumber: 'ST-552' }
];

export const mockPayroll: PayrollRecord[] = [
  { id: 'PAY-001', staffId: 'TCH-101', staffName: 'Sunita Sharma', role: 'Teacher', month: 'July 2026', baseSalary: 65000, allowances: 8000, pfDeduction: 3600, esiDeduction: 0, tdsDeduction: 4200, netSalary: 65200, status: 'Processed', paymentDate: '2026-07-31', paymentMethod: 'Direct Deposit' },
  { id: 'PAY-002', staffId: 'TCH-102', staffName: 'Vikramaditya Roy', role: 'Teacher', month: 'July 2026', baseSalary: 72000, allowances: 9500, pfDeduction: 4000, esiDeduction: 0, tdsDeduction: 5500, netSalary: 72000, status: 'Processed', paymentDate: '2026-07-31', paymentMethod: 'Direct Deposit' },
  { id: 'PAY-003', staffId: 'ADM-201', staffName: 'Rajesh Verma', role: 'Admin', month: 'July 2026', baseSalary: 55000, allowances: 5000, pfDeduction: 3200, esiDeduction: 0, tdsDeduction: 2800, netSalary: 54000, status: 'Pending', paymentMethod: 'Bank Transfer' },
  { id: 'PAY-004', staffId: 'SUP-301', staffName: 'Mahesh Kumar', role: 'Support Staff', month: 'July 2026', baseSalary: 22000, allowances: 2000, pfDeduction: 1800, esiDeduction: 350, tdsDeduction: 0, netSalary: 21850, status: 'Pending', paymentMethod: 'Bank Transfer' }
];

export const mockProcurement: ProcurementItem[] = [
  { id: 'PR-901', poNumber: 'PO-2026-044', department: 'Computer Science', requestedBy: 'Prof. Ananya Sen', vendorName: 'Dell India Solutions', items: [{ name: 'Dell OptiPlex 7090', quantity: 10, unitPrice: 52000, total: 520000 }], totalAmount: 520000, status: 'Pending Approval', createdDate: '2026-07-18', expectedDelivery: '2026-08-05' },
  { id: 'PR-902', poNumber: 'PO-2026-042', department: 'Sports & Athletics', requestedBy: 'Coach Baljit Singh', vendorName: 'Cosco Sports India', items: [{ name: 'Football & Basketball Gear', quantity: 45, unitPrice: 1200, total: 54000 }], totalAmount: 54000, status: 'Approved by Principal', createdDate: '2026-07-14', expectedDelivery: '2026-07-28' },
  { id: 'PR-903', poNumber: 'PO-2026-039', department: 'Library', requestedBy: 'Meenakshi Iyer', vendorName: 'Oxford Publishing House', items: [{ name: 'Class 9-12 Reference Books', quantity: 200, unitPrice: 450, total: 90000 }], totalAmount: 90000, status: 'Goods Received', createdDate: '2026-07-05', expectedDelivery: '2026-07-15' }
];

export const mockBankAccounts: BankAccount[] = [
  { id: 'BNK-01', bankName: 'HDFC Bank', accountName: 'School Operational Main', accountNumber: '50100239481023', ifscCode: 'HDFC0001245', branch: 'Connaught Place', accountType: 'Current', currentBalance: 4285000, unclearedAmount: 65000, lastReconciledDate: '2026-07-20' },
  { id: 'BNK-02', bankName: 'ICICI Bank', accountName: 'Fee Collection Escrow', accountNumber: '00290159483011', ifscCode: 'ICIC0000029', branch: 'Civil Lines', accountType: 'Current', currentBalance: 1850000, unclearedAmount: 120000, lastReconciledDate: '2026-07-21' },
  { id: 'BNK-03', bankName: 'State Bank of India', accountName: 'Salary & PF Disbursement', accountNumber: '30491029384910', ifscCode: 'SBIN0004521', branch: 'Main Branch', accountType: 'Current', currentBalance: 2400000, unclearedAmount: 0, lastReconciledDate: '2026-07-15' },
  { id: 'BNK-04', bankName: 'School Cash Vault', accountName: 'Petty Cash Box', accountNumber: 'CASH-VAULT-01', ifscCode: 'N/A', branch: 'Finance Office', accountType: 'Cash Vault', currentBalance: 84500, unclearedAmount: 0, lastReconciledDate: '2026-07-22' }
];

export const mockCashBook: CashBookEntry[] = [
  { id: 'CB-501', date: '2026-07-22', voucherNo: 'VCH-1201', description: 'Counter Fee Collection - Class 8B (Cash)', cashIn: 18500, cashOut: 0, category: 'Fee Collection', handoverCashier: 'Rajesh Verma' },
  { id: 'CB-502', date: '2026-07-22', voucherNo: 'VCH-1202', description: 'Petty Cash - Science Lab Urgent Glassware', cashIn: 0, cashOut: 2400, category: 'Lab Supplies', handoverCashier: 'Rajesh Verma' },
  { id: 'CB-503', date: '2026-07-22', voucherNo: 'VCH-1203', description: 'Counter Fee Collection - Class 10A (Cash)', cashIn: 24000, cashOut: 0, category: 'Fee Collection', handoverCashier: 'Rajesh Verma' },
  { id: 'CB-504', date: '2026-07-21', voucherNo: 'VCH-1199', description: 'Staff Refreshments & Meeting Expenses', cashIn: 0, cashOut: 1800, category: 'Hospitality', handoverCashier: 'Pooja Nair' }
];

export const mockReconciliations: ReconciliationRecord[] = [
  { id: 'REC-01', date: '2026-07-21', gateway: 'UPI Gateway', referenceNo: 'UPI-992810293', bookAmount: 12500, bankAmount: 12500, discrepancy: 0, status: 'Matched' },
  { id: 'REC-02', date: '2026-07-21', gateway: 'POS Terminal', referenceNo: 'POS-449102', bookAmount: 25000, bankAmount: 24500, discrepancy: -500, status: 'Unmatched' },
  { id: 'REC-03', date: '2026-07-20', gateway: 'Bank Statement', referenceNo: 'NEFT-881923', bookAmount: 48000, bankAmount: 48000, discrepancy: 0, status: 'Matched' }
];

export const mockJournals: JournalEntry[] = [
  {
    id: 'JNL-101',
    journalNo: 'JNL-2026-089',
    date: '2026-07-21',
    description: 'Adjustment for electricity bill payment via HDFC Bank',
    entries: [
      { accountName: 'Utility Expense Account', accountCode: '5010', debit: 48500, credit: 0 },
      { accountName: 'HDFC Operational Account', accountCode: '1010', debit: 0, credit: 48500 }
    ],
    postedBy: 'Rajesh Verma',
    status: 'Posted'
  },
  {
    id: 'JNL-102',
    journalNo: 'JNL-2026-090',
    date: '2026-07-22',
    description: 'Fee discount write-off for Merit Scholarship (Siya Patel)',
    entries: [
      { accountName: 'Scholarship & Waiver Expense', accountCode: '5040', debit: 15000, credit: 0 },
      { accountName: 'Student Accounts Receivable', accountCode: '1020', debit: 0, credit: 15000 }
    ],
    postedBy: 'Rajesh Verma',
    status: 'Posted'
  }
];

export const mockRefunds: RefundRecord[] = [
  { id: 'RFD-101', refundNo: 'RFD-2026-012', studentName: 'Rohan Deshmukh', rollNo: '10-A-42', class: 'Class 10 A', category: 'Admission Cancellation', amount: 25000, status: 'Approved', requestedDate: '2026-07-10', approvedBy: 'Dr. Ramesh Sharma' },
  { id: 'RFD-102', refundNo: 'RFD-2026-014', studentName: 'Kavya Nair', rollNo: '6-B-18', class: 'Class 6 B', category: 'Duplicate Payment', amount: 8500, status: 'Pending Approval', requestedDate: '2026-07-18' }
];

export const mockBudgets: DepartmentBudget[] = [
  { id: 'BDG-01', department: 'Science & Research Labs', annualAllocation: 1200000, spentToDate: 780000, committedPOs: 120000, remaining: 300000, utilizationPercent: 75 },
  { id: 'BDG-02', department: 'IT & Digital Infrastructure', annualAllocation: 2500000, spentToDate: 1850000, committedPOs: 520000, remaining: 130000, utilizationPercent: 94.8 },
  { id: 'BDG-03', department: 'Sports & Student Activities', annualAllocation: 800000, spentToDate: 420000, committedPOs: 54000, remaining: 326000, utilizationPercent: 59.25 },
  { id: 'BDG-04', department: 'Campus Operations & Security', annualAllocation: 3000000, spentToDate: 2100000, committedPOs: 185000, remaining: 715000, utilizationPercent: 76.1 }
];

export const mockVendors: Vendor[] = [
  { id: 'VND-01', vendorName: 'State Electricity Board', category: 'Utilities', gstin: '07AAACE1234F1Z1', contactPerson: 'Nitin Gadkari', phone: '+91 98110 22334', email: 'billing@seb.gov.in', outstandingBalance: 0, totalPaid: 582000, rating: 4.8 },
  { id: 'VND-02', vendorName: 'Dell India Solutions', category: 'IT Hardware', gstin: '29AAAAA0000A1Z5', contactPerson: 'Suresh Raina', phone: '+91 98200 44556', email: 'edu@dell.co.in', outstandingBalance: 520000, totalPaid: 1250000, rating: 4.9 },
  { id: 'VND-03', vendorName: 'Airtel Enterprise', category: 'Telecommunications', gstin: '07AAACA2734L1ZB', contactPerson: 'Priya Sharma', phone: '+91 98100 11223', email: 'corporate@airtel.in', outstandingBalance: 12000, totalPaid: 144000, rating: 4.7 }
];

export const mockTaxReport: TaxReportItem[] = [
  { period: 'Q1 (Apr - Jun 2026)', gstCollected: 345000, gstPaidInputCredit: 210000, netGstPayable: 135000, tdsDeducted: 48000, status: 'Filed' },
  { period: 'July 2026 (Monthly)', gstCollected: 120000, gstPaidInputCredit: 75000, netGstPayable: 45000, tdsDeducted: 16500, status: 'Filing Pending' }
];

export const mockAuditLogs: FinancialAuditLog[] = [
  { id: 'AUD-901', timestamp: '2026-07-22 10:30:15', user: 'Rajesh Verma (Accountant)', action: 'Created Fee Receipt', module: 'Fee Management', amount: 12000, details: 'Generated Receipt RCP-1256 for Aarav Sharma (Class 10 A)', ipAddress: '192.168.1.45' },
  { id: 'AUD-902', timestamp: '2026-07-22 09:45:22', user: 'Rajesh Verma (Accountant)', action: 'Approved Expense', module: 'Expenses', amount: 34200, details: 'Approved Expense EXP-104 for Lab Supplies', ipAddress: '192.168.1.45' },
  { id: 'AUD-903', timestamp: '2026-07-21 16:10:05', user: 'Dr. Ramesh Sharma (Principal)', action: 'Approved Purchase Order', module: 'Procurement', amount: 54000, details: 'Approved PO-2026-042 for Sports Department', ipAddress: '192.168.1.10' }
];

export const mockCalendarEvents: FinancialCalendarEvent[] = [
  { id: 'EVT-01', date: '2026-07-25', title: 'Monthly Staff Payroll Disbursal', category: 'Payroll', amount: 2850000, urgency: 'high' },
  { id: 'EVT-02', date: '2026-07-31', title: 'Quarterly GST Return Filing (GSTR-3B)', category: 'Tax Due', amount: 135000, urgency: 'high' },
  { id: 'EVT-03', date: '2026-08-05', title: 'Q2 Fee Installment Due Date', category: 'Fee Deadline', amount: 4500000, urgency: 'medium' },
  { id: 'EVT-04', date: '2026-08-10', title: 'Dell India PO Disbursement', category: 'Vendor Payment', amount: 520000, urgency: 'medium' }
];
