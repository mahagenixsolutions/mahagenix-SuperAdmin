import React, { useState } from 'react';
import { 
  Plus, Search, Filter, Download, FileText, CheckCircle, XCircle, 
  Clock, AlertCircle, Upload, DollarSign, Tag, Building 
} from 'lucide-react';
import { mockExpenses } from '../shared/mockFinanceData';
import type { ExpenseItem } from '../shared/types';
import DataGrid from '../../../components/erp/DataGrid';
import type { GridColumn } from '../../../components/erp/DataGrid';
import { StatusBadge } from '../../../components/erp/StatusBadge';

export default function ExpensesModule() {
  const [expenses, setExpenses] = useState<ExpenseItem[]>(mockExpenses);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // New Expense Form State
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<ExpenseItem['category']>('Electricity');
  const [newVendor, setNewVendor] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [newBillNo, setNewBillNo] = useState('');
  const [newNotes, setNewNotes] = useState('');

  const showNotification = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newAmount || !newVendor) return;

    const newItem: ExpenseItem = {
      id: `EXP-${Math.floor(100 + Math.random() * 900)}`,
      title: newTitle,
      category: newCategory,
      vendor: newVendor,
      amount: parseFloat(newAmount),
      date: new Date().toISOString().split('T')[0],
      status: 'Pending',
      billNumber: newBillNo || `BILL-${Math.floor(1000 + Math.random() * 9000)}`,
      notes: newNotes
    };

    setExpenses([newItem, ...expenses]);
    setShowAddModal(false);
    showNotification(`Expense "${newTitle}" created and sent for approval.`);
    setNewTitle('');
    setNewVendor('');
    setNewAmount('');
    setNewBillNo('');
    setNewNotes('');
  };

  const handleApprove = (id: string) => {
    setExpenses(expenses.map(e => e.id === id ? { ...e, status: 'Approved', approvedBy: 'Rajesh Verma (Accountant)' } : e));
    showNotification(`Expense ${id} approved successfully!`);
  };

  const filteredExpenses = expenses.filter(exp => {
    const matchesSearch = exp.title.toLowerCase().includes(search.toLowerCase()) || 
                          exp.vendor.toLowerCase().includes(search.toLowerCase()) ||
                          exp.billNumber.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCategory === 'All' || exp.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const totalSpent = expenses.filter(e => e.status === 'Approved').reduce((acc, e) => acc + e.amount, 0);
  const totalPending = expenses.filter(e => e.status === 'Pending').reduce((acc, e) => acc + e.amount, 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', fontFamily: '"Outfit", sans-serif' }}>
      {toast && (
        <div style={{
          position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999,
          background: 'var(--bg-secondary)', border: '1px solid var(--accent-primary)',
          borderRadius: '10px', padding: '12px 20px', boxShadow: 'var(--shadow-lg)'
        }}>
          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>{toast}</span>
        </div>
      )}

      {/* Header Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '14px', padding: '18px' }}>
          <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>TOTAL APPROVED EXPENSES</span>
          <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#EF4444', margin: '6px 0 0 0' }}>₹{totalSpent.toLocaleString('en-IN')}</h3>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>FY 2024-25 YTD</span>
        </div>

        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '14px', padding: '18px' }}>
          <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>PENDING APPROVALS</span>
          <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#F59E0B', margin: '6px 0 0 0' }}>₹{totalPending.toLocaleString('en-IN')}</h3>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{expenses.filter(e => e.status === 'Pending').length} bills awaiting approval</span>
        </div>

        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '14px', padding: '18px' }}>
          <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>CATEGORIES TRACKED</span>
          <h3 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--accent-primary)', margin: '6px 0 0 0' }}>10 Active</h3>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Utilities, Maintenance, IT, Lab</span>
        </div>
      </div>

      {/* Action & Filter Bar */}
      <div style={{ 
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px',
        background: 'var(--bg-surface)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-subtle)' 
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: '280px' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="text"
              placeholder="Search by expense title, vendor, or bill number..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: '100%', padding: '9px 12px 9px 36px', borderRadius: '8px',
                background: 'var(--bg-surface-raised)', border: '1px solid var(--border-subtle)',
                color: 'var(--text-primary)', fontSize: '13px', outline: 'none'
              }}
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{
              padding: '9px 12px', borderRadius: '8px', background: 'var(--bg-surface-raised)',
              border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', fontSize: '13px'
            }}
          >
            <option value="All">All Categories</option>
            <option value="Electricity">Electricity</option>
            <option value="Water">Water</option>
            <option value="Internet">Internet</option>
            <option value="Computers">Computers</option>
            <option value="Lab Equipment">Lab Equipment</option>
            <option value="Maintenance">Maintenance</option>
          </select>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            onClick={() => showNotification("Expense report exported as CSV.")}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 14px', borderRadius: '8px',
              border: '1px solid var(--border-subtle)', background: 'var(--bg-surface-raised)',
              color: 'var(--text-primary)', fontSize: '13px', cursor: 'pointer', fontWeight: 600
            }}
          >
            <Download size={15} /> Export
          </button>

          <button 
            onClick={() => setShowAddModal(true)}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 16px', borderRadius: '8px',
              border: 'none', background: 'var(--accent-primary)', color: '#FFF', fontSize: '13px', cursor: 'pointer', fontWeight: 700
            }}
          >
            <Plus size={16} /> Add Expense
          </button>
        </div>
      </div>

      {/* Expenses Table */}
      <div style={{ background: 'var(--bg-surface)', borderRadius: '14px', border: '1px solid var(--border-subtle)', padding: '16px' }}>
        <DataGrid<ExpenseItem>
          columns={[
            {
              key: 'id',
              title: 'EXPENSE ID',
              mobilePriority: 'high',
              render: (exp) => <span style={{ fontWeight: 700, color: 'var(--accent-primary)' }}>{exp.id}</span>,
            },
            {
              key: 'title',
              title: 'TITLE & VENDOR',
              mobilePriority: 'high',
              render: (exp) => (
                <div>
                  <div style={{ fontWeight: 700 }}>{exp.title}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{exp.vendor}</div>
                </div>
              ),
            },
            {
              key: 'amount',
              title: 'AMOUNT',
              mobilePriority: 'high',
              render: (exp) => (
                <span style={{ fontWeight: 800, color: '#EF4444' }}>
                  ₹{exp.amount.toLocaleString('en-IN')}
                </span>
              ),
            },
            {
              key: 'category',
              title: 'CATEGORY',
              render: (exp) => (
                <span style={{ padding: '4px 8px', borderRadius: '6px', background: 'rgba(59,130,246,0.1)', color: '#3B82F6', fontSize: '11px', fontWeight: 600 }}>
                  {exp.category}
                </span>
              ),
            },
            {
              key: 'billNumber',
              title: 'BILL NO',
              render: (exp) => <span style={{ fontFamily: 'monospace', fontSize: '12px' }}>{exp.billNumber}</span>,
            },
            {
              key: 'date',
              title: 'DATE',
              render: (exp) => <span style={{ color: 'var(--text-secondary)' }}>{exp.date}</span>,
            },
            {
              key: 'status',
              title: 'STATUS',
              render: (exp) => (
                <StatusBadge
                  status={exp.status === 'Approved' ? 'success' : 'warning'}
                  label={exp.status}
                />
              ),
            },
          ]}
          data={filteredExpenses}
          keyField="id"
          rowActions={[
            {
              label: 'Approve',
              icon: <CheckCircle size={15} />,
              onClick: (exp) => handleApprove(exp.id),
            },
          ]}
        />
      </div>

      {/* Add Expense Modal */}
      {showAddModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', zIndex: 999,
          display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px'
        }}>
          <div style={{
            background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)',
            borderRadius: '16px', width: '100%', maxWidth: '500px', padding: '24px', boxShadow: 'var(--shadow-lg)'
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: 800, margin: '0 0 16px 0', color: 'var(--text-primary)' }}>Record New School Expense</h3>
            <form onSubmit={handleAddExpense} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>Expense Title</label>
                <input 
                  type="text" required placeholder="e.g. Monthly Lab Internet"
                  value={newTitle} onChange={(e) => setNewTitle(e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface-raised)', color: 'var(--text-primary)', marginTop: '4px' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>Category</label>
                  <select
                    value={newCategory} onChange={(e) => setNewCategory(e.target.value as any)}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface-raised)', color: 'var(--text-primary)', marginTop: '4px' }}
                  >
                    <option value="Electricity">Electricity</option>
                    <option value="Water">Water</option>
                    <option value="Internet">Internet</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Computers">Computers</option>
                    <option value="Lab Equipment">Lab Equipment</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="Security">Security</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>Amount (₹)</label>
                  <input 
                    type="number" required placeholder="45000"
                    value={newAmount} onChange={(e) => setNewAmount(e.target.value)}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface-raised)', color: 'var(--text-primary)', marginTop: '4px' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>Vendor / Supplier</label>
                  <input 
                    type="text" required placeholder="State Electricity Board"
                    value={newVendor} onChange={(e) => setNewVendor(e.target.value)}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface-raised)', color: 'var(--text-primary)', marginTop: '4px' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>Bill / Invoice No.</label>
                  <input 
                    type="text" placeholder="BILL-9921"
                    value={newBillNo} onChange={(e) => setNewBillNo(e.target.value)}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface-raised)', color: 'var(--text-primary)', marginTop: '4px' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>Notes & Justification</label>
                <textarea 
                  rows={2} placeholder="Brief description of the expense..."
                  value={newNotes} onChange={(e) => setNewNotes(e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface-raised)', color: 'var(--text-primary)', marginTop: '4px' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                <button 
                  type="button" onClick={() => setShowAddModal(false)}
                  style={{ padding: '9px 16px', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface-raised)', color: 'var(--text-primary)', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  style={{ padding: '9px 18px', borderRadius: '8px', border: 'none', background: 'var(--accent-primary)', color: '#FFF', fontWeight: 700, cursor: 'pointer' }}
                >
                  Save & Request Approval
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
