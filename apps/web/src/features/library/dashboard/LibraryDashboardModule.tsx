import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen, BookMarked, Users, Clock, AlertTriangle, CheckCircle2,
  Sparkles, Plus, Download, Bookmark, FileText, Search,
  ShieldAlert, TrendingUp, Layers, Landmark, RefreshCw, X, AlertCircle
} from 'lucide-react';
import { KPICard } from '../../../components/erp/KPICard';
import { useLibraryStore } from '../shared/libraryStore';

export default function LibraryDashboardModule() {
  const navigate = useNavigate();
  const {
    books,
    inventory,
    circulation,
    reservations,
    members,
    fines,
    digitalAssets,
    aiInsights,
    activities,
    toastMessage,
    showToast,
    issueBook,
    returnBook,
    renewBook,
    reserveBook,
    addBook,
    collectFine,
  } = useLibraryStore();

  // Modal States
  const [activeModal, setActiveModal] = useState<'issue' | 'return' | 'reserve' | 'add_book' | 'fine' | null>(null);

  // Form States
  const [issueMemberId, setIssueMemberId] = useState('');
  const [issueBookId, setIssueBookId] = useState('');
  const [issueDueDate, setIssueDueDate] = useState('');

  const [returnCircId, setReturnCircId] = useState('');
  const [returnCondition, setReturnCondition] = useState<'Good' | 'Fair' | 'Damaged' | 'Needs Repair'>('Good');
  const [returnFinePaid, setReturnFinePaid] = useState(true);

  const [reserveMemberId, setReserveMemberId] = useState('');
  const [reserveBookId, setReserveBookId] = useState('');

  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newIsbn, setNewIsbn] = useState('');
  const [newCategory, setNewCategory] = useState('Science');
  const [newCopies, setNewCopies] = useState(3);

  const [fineIdToPay, setFineIdToPay] = useState('');
  const [finePayMethod, setFinePayMethod] = useState('Cash Desk');

  // KPI Calculations
  const totalBooksCount = books.reduce((acc, b) => acc + b.totalCopies, 0);
  const availableCopiesCount = books.reduce((acc, b) => acc + b.availableCopies, 0);
  const issuedCount = circulation.filter((c) => c.status === 'Issued' || c.status === 'Renewed').length;
  const overdueCount = circulation.filter((c) => c.status === 'Overdue').length;
  const reservedCount = reservations.filter((r) => r.status === 'Pending' || r.status === 'Ready for Pickup').length;
  const lostDamagedCount = inventory.filter((i) => i.status === 'Lost' || i.condition === 'Damaged' || i.condition === 'Needs Repair').length;
  const activeMembersCount = members.filter((m) => m.status === 'Active').length;
  const todayIssuesCount = circulation.filter((c) => c.issueDate === new Date().toISOString().split('T')[0]).length;
  const todayReturnsCount = circulation.filter((c) => c.returnDate === new Date().toISOString().split('T')[0]).length;
  const pendingFinesTotal = fines.filter((f) => f.status === 'Pending').reduce((sum, f) => sum + f.fineAmount, 0);

  const handleIssueSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!issueMemberId || !issueBookId) {
      showToast('Please select both Member and Book.');
      return;
    }
    const success = issueBook(issueMemberId, issueBookId, issueDueDate || undefined);
    if (success) {
      setActiveModal(null);
      setIssueMemberId('');
      setIssueBookId('');
      setIssueDueDate('');
    }
  };

  const handleReturnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!returnCircId) return;
    returnBook(returnCircId, returnCondition, returnFinePaid);
    setActiveModal(null);
    setReturnCircId('');
  };

  const handleReserveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reserveMemberId || !reserveBookId) return;
    reserveBook(reserveMemberId, reserveBookId);
    setActiveModal(null);
    setReserveMemberId('');
    setReserveBookId('');
  };

  const handleAddBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;
    addBook({
      title: newTitle,
      author: newAuthor,
      isbn: newIsbn,
      category: newCategory,
      totalCopies: Number(newCopies) || 1,
    });
    setActiveModal(null);
    setNewTitle('');
    setNewAuthor('');
    setNewIsbn('');
  };

  const handleFineSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fineIdToPay) return;
    collectFine(fineIdToPay, finePayMethod);
    setActiveModal(null);
    setFineIdToPay('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', fontFamily: '"Outfit", sans-serif' }}>
      {toastMessage && (
        <div style={{
          position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999,
          background: '#10B981', color: '#FFF',
          borderRadius: '12px', padding: '12px 20px', boxShadow: '0 10px 25px rgba(16,185,129,0.3)',
          display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, fontSize: '13px'
        }}>
          <CheckCircle2 size={18} />
          {toastMessage}
        </div>
      )}

      {/* 1. Header Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #1E1B4B 0%, #312E81 100%)',
        borderRadius: '16px', padding: '24px', color: '#FFF', display: 'flex',
        justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px',
        boxShadow: '0 8px 24px rgba(49,46,129,0.25)'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 10px', borderRadius: '12px', background: 'rgba(255,255,255,0.15)', color: '#A5B4FC' }}>
              ● Academic Year 2025–2026
            </span>
            <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 10px', borderRadius: '12px', background: 'rgba(16,185,129,0.2)', color: '#34D399' }}>
              Library Workspace Active & Operational
            </span>
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: 800, margin: '6px 0', letterSpacing: '-0.5px' }}>
            Library Command Center
          </h2>
          <p style={{ fontSize: '13px', color: '#C7D2FE', margin: 0, maxWidth: '650px' }}>
            Enterprise management of physical catalog, circulation, digital repository, reservations, member fines, and AI reading analytics.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setActiveModal('issue')}
            style={{ padding: '10px 18px', borderRadius: '10px', border: 'none', background: '#4F46E5', color: '#FFF', fontWeight: 700, fontSize: '13px', cursor: 'pointer', boxShadow: '0 4px 12px rgba(79,70,229,0.3)' }}
          >
            + Issue Book
          </button>
          <button
            onClick={() => setActiveModal('return')}
            style={{ padding: '10px 18px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.1)', color: '#FFF', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}
          >
            Return Desk →
          </button>
        </div>
      </div>

      {/* 2. 12 KPI Metric Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '14px' }}>
        <KPICard title="TOTAL BOOKS" value={totalBooksCount.toString()} icon={<BookOpen size={20} />} trend={{ value: `${books.length} titles`, isPositive: true }} />
        <KPICard title="AVAILABLE BOOKS" value={availableCopiesCount.toString()} icon={<CheckCircle2 size={20} />} tone="success" />
        <KPICard title="ISSUED BOOKS" value={issuedCount.toString()} icon={<BookMarked size={20} />} tone="primary" />
        <KPICard title="RESERVED BOOKS" value={reservedCount.toString()} icon={<Bookmark size={20} />} tone="warning" />
        <KPICard title="OVERDUE BOOKS" value={overdueCount.toString()} icon={<AlertTriangle size={20} />} tone="danger" />
        <KPICard title="LOST / DAMAGED" value={lostDamagedCount.toString()} icon={<ShieldAlert size={20} />} tone="warning" />
        <KPICard title="ACTIVE MEMBERS" value={activeMembersCount.toString()} icon={<Users size={20} />} tone="info" />
        <KPICard title="TODAY'S ISSUES" value={todayIssuesCount.toString()} icon={<Clock size={20} />} tone="success" />
        <KPICard title="TODAY'S RETURNS" value={todayReturnsCount.toString()} icon={<CheckCircle2 size={20} />} tone="primary" />
        <KPICard title="PENDING FINES" value={`₹${pendingFinesTotal}`} icon={<Landmark size={20} />} tone="danger" />
        <KPICard title="DIGITAL RESOURCES" value={digitalAssets.length.toString()} icon={<Layers size={20} />} tone="info" />
        <KPICard title="ACQUISITION POs" value="2 Active" icon={<TrendingUp size={20} />} tone="primary" />
      </div>

      {/* 3. Quick Actions Toolbar */}
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '20px' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 800, margin: '0 0 14px 0', color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          ⚡ Quick Desk Actions
        </h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          <button onClick={() => setActiveModal('issue')} style={quickBtnStyle}>+ Issue Book</button>
          <button onClick={() => setActiveModal('return')} style={quickBtnStyle}>← Return Book</button>
          <button onClick={() => setActiveModal('reserve')} style={quickBtnStyle}>🔖 Reserve Book</button>
          <button onClick={() => setActiveModal('add_book')} style={quickBtnStyle}>+ Add New Book</button>
          <button onClick={() => navigate('/library/members')} style={quickBtnStyle}>👤 Register Member</button>
          <button onClick={() => setActiveModal('fine')} style={quickBtnStyle}>💳 Collect Fine</button>
          <button onClick={() => navigate('/library/acquisitions')} style={quickBtnStyle}>🛒 New Purchase PO</button>
          <button onClick={() => navigate('/library/reports')} style={quickBtnStyle}>📊 Generate Report</button>
        </div>
      </div>

      {/* 4. Split Section: Active Loans & Overdue Desk + AI Insights */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px' }}>
        
        {/* Active Circulation & Overdue */}
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Clock size={18} color="#4F46E5" />
              Active Circulation & Overdue Loans
            </h3>
            <button onClick={() => navigate('/library/circulation')} style={linkBtnStyle}>View All ({circulation.length}) →</button>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12.5px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-secondary)', textAlign: 'left' }}>
                  <th style={{ padding: '8px' }}>Book Title</th>
                  <th style={{ padding: '8px' }}>Member</th>
                  <th style={{ padding: '8px' }}>Due Date</th>
                  <th style={{ padding: '8px' }}>Status</th>
                  <th style={{ padding: '8px', textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {circulation.slice(0, 5).map((c) => (
                  <tr key={c.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '10px 8px', fontWeight: 700, color: 'var(--text-primary)' }}>{c.bookTitle}</td>
                    <td style={{ padding: '10px 8px', color: 'var(--text-secondary)' }}>
                      {c.memberName} <span style={{ fontSize: '10px', color: '#6B7280' }}>({c.classGrade})</span>
                    </td>
                    <td style={{ padding: '10px 8px', color: c.status === 'Overdue' ? '#EF4444' : 'var(--text-primary)', fontWeight: c.status === 'Overdue' ? 700 : 500 }}>
                      {c.dueDate}
                    </td>
                    <td style={{ padding: '10px 8px' }}>
                      <span style={{
                        padding: '2px 8px', borderRadius: '10px', fontSize: '10.5px', fontWeight: 700,
                        background: c.status === 'Overdue' ? '#FEE2E2' : c.status === 'Returned' ? '#D1FAE5' : '#EEF2FF',
                        color: c.status === 'Overdue' ? '#DC2626' : c.status === 'Returned' ? '#059669' : '#4F46E5',
                      }}>
                        {c.status}
                      </span>
                    </td>
                    <td style={{ padding: '10px 8px', textAlign: 'right' }}>
                      {c.status !== 'Returned' && (
                        <div style={{ display: 'flex', gap: '4px', justifyContent: 'flex-end' }}>
                          <button
                            onClick={() => {
                              setReturnCircId(c.id);
                              setActiveModal('return');
                            }}
                            style={{ padding: '4px 8px', borderRadius: '6px', border: '1px solid #10B981', background: '#ECFDF5', color: '#059669', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}
                          >
                            Return
                          </button>
                          <button
                            onClick={() => renewBook(c.id)}
                            style={{ padding: '4px 8px', borderRadius: '6px', border: '1px solid #6366F1', background: '#EEF2FF', color: '#4F46E5', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}
                          >
                            Renew
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* AI Knowledge & Analytics */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(79,70,229,0.06) 0%, rgba(99,102,241,0.04) 100%)',
          border: '1px solid rgba(79,70,229,0.2)', borderRadius: '16px', padding: '20px',
          display: 'flex', flexDirection: 'column', gap: '14px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)', fontWeight: 800, fontSize: '15px' }}>
              <Sparkles size={18} style={{ color: '#4F46E5' }} />
              AI Library Analytics & Forecasting
            </div>
            <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '12px', background: '#4F46E5', color: '#FFF' }}>
              Real-time Intelligence
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {aiInsights.map((insight) => (
              <div key={insight.id} style={{ background: 'var(--bg-surface)', padding: '12px 14px', borderRadius: '12px', border: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px', fontWeight: 800, color: '#4F46E5' }}>{insight.title}</span>
                  {insight.metric && (
                    <span style={{ fontSize: '10.5px', fontWeight: 700, background: '#EEF2FF', color: '#4F46E5', padding: '2px 8px', borderRadius: '10px' }}>
                      {insight.metric}
                    </span>
                  )}
                </div>
                <p style={{ fontSize: '11.5px', color: 'var(--text-secondary)', margin: 0 }}>
                  {insight.description}
                </p>
                {insight.actionText && (
                  <button
                    onClick={() => navigate('/library/acquisitions')}
                    style={{ alignSelf: 'flex-start', marginTop: '4px', border: 'none', background: 'none', color: '#2563EB', fontSize: '11px', fontWeight: 700, cursor: 'pointer', padding: 0 }}
                  >
                    {insight.actionText} →
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5. Bottom Section: Recent Activities & Reservation Queue */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px' }}>
        {/* Pending Reservations Queue */}
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Bookmark size={18} color="#8B5CF6" />
              Pending Reservation Queue ({reservations.length})
            </h3>
            <button onClick={() => navigate('/library/reservations')} style={linkBtnStyle}>Manage Queue →</button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {reservations.map((r) => (
              <div key={r.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', background: 'var(--bg-surface-raised)', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
                <div>
                  <span style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--text-primary)', display: 'block' }}>{r.bookTitle}</span>
                  <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Reserved by: {r.memberName} • Expiry: {r.expiryDate}</span>
                </div>
                <span style={{ padding: '3px 10px', borderRadius: '12px', background: '#F3E8FF', color: '#7C3AED', fontSize: '11px', fontWeight: 800 }}>
                  Queue #{r.queueNo}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Live Activity Feed */}
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '20px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 800, margin: '0 0 14px 0', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <TrendingUp size={18} color="#10B981" />
            Live Library Desk Activity
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {activities.slice(0, 5).map((act) => (
              <div key={act.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '12px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: act.badgeColor || '#4F46E5', marginTop: '5px', flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, color: 'var(--text-primary)', fontWeight: 500, lineHeight: 1.4 }}>{act.message}</p>
                  <span style={{ fontSize: '10px', color: '#9CA3AF' }}>{act.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────────────────
          MODALS FOR QUICK ACTIONS
         ───────────────────────────────────────────────────────────────────────────── */}

      {/* Issue Book Modal */}
      {activeModal === 'issue' && (
        <ModalWrapper title="Issue Book to Member" onClose={() => setActiveModal(null)}>
          <form onSubmit={handleIssueSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={labelStyle}>Select Member</label>
              <select value={issueMemberId} onChange={(e) => setIssueMemberId(e.target.value)} style={inputStyle} required>
                <option value="">-- Choose Member --</option>
                {members.map((m) => (
                  <option key={m.id} value={m.id}>{m.name} ({m.role} - {m.gradeOrDept}) [Loans: {m.currentlyBorrowed}/{m.maxLimit}]</option>
                ))}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Select Book (Catalog / Barcode)</label>
              <select value={issueBookId} onChange={(e) => setIssueBookId(e.target.value)} style={inputStyle} required>
                <option value="">-- Choose Book --</option>
                {books.map((b) => (
                  <option key={b.id} value={b.id}>{b.title} (Available: {b.availableCopies}/{b.totalCopies}) - {b.shelfLocation}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Custom Due Date (Optional)</label>
              <input type="date" value={issueDueDate} onChange={(e) => setIssueDueDate(e.target.value)} style={inputStyle} />
            </div>
            <button type="submit" style={submitBtnStyle}>Confirm & Issue Book</button>
          </form>
        </ModalWrapper>
      )}

      {/* Return Book Modal */}
      {activeModal === 'return' && (
        <ModalWrapper title="Return Book Desk" onClose={() => setActiveModal(null)}>
          <form onSubmit={handleReturnSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={labelStyle}>Select Issued Loan Record</label>
              <select value={returnCircId} onChange={(e) => setReturnCircId(e.target.value)} style={inputStyle} required>
                <option value="">-- Choose Active Loan --</option>
                {circulation.filter((c) => c.status !== 'Returned').map((c) => (
                  <option key={c.id} value={c.id}>{c.bookTitle} (Issued to: {c.memberName}) - Due: {c.dueDate}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Book Return Condition</label>
              <select value={returnCondition} onChange={(e) => setReturnCondition(e.target.value as any)} style={inputStyle}>
                <option value="Good">Good (Normal Return)</option>
                <option value="Fair">Fair (Minor Wear)</option>
                <option value="Needs Repair">Needs Repair (Torn Page/Binding)</option>
                <option value="Damaged">Damaged (Penalty Applied)</option>
              </select>
            </div>
            <button type="submit" style={submitBtnStyle}>Process Return & Update Inventory</button>
          </form>
        </ModalWrapper>
      )}

      {/* Reserve Book Modal */}
      {activeModal === 'reserve' && (
        <ModalWrapper title="Reserve Book Queue" onClose={() => setActiveModal(null)}>
          <form onSubmit={handleReserveSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={labelStyle}>Select Member</label>
              <select value={reserveMemberId} onChange={(e) => setReserveMemberId(e.target.value)} style={inputStyle} required>
                <option value="">-- Choose Member --</option>
                {members.map((m) => (
                  <option key={m.id} value={m.id}>{m.name} ({m.role})</option>
                ))}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Select Book</label>
              <select value={reserveBookId} onChange={(e) => setReserveBookId(e.target.value)} style={inputStyle} required>
                <option value="">-- Choose Book --</option>
                {books.map((b) => (
                  <option key={b.id} value={b.id}>{b.title} (Available: {b.availableCopies})</option>
                ))}
              </select>
            </div>
            <button type="submit" style={submitBtnStyle}>Add to Reservation Queue</button>
          </form>
        </ModalWrapper>
      )}

      {/* Add New Book Modal */}
      {activeModal === 'add_book' && (
        <ModalWrapper title="Add New Book Accession" onClose={() => setActiveModal(null)}>
          <form onSubmit={handleAddBookSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <label style={labelStyle}>Book Title</label>
              <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} style={inputStyle} placeholder="e.g. Advanced Physics Principles" required />
            </div>
            <div>
              <label style={labelStyle}>Author Name</label>
              <input type="text" value={newAuthor} onChange={(e) => setNewAuthor(e.target.value)} style={inputStyle} placeholder="e.g. Dr. H.C. Verma" required />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={labelStyle}>ISBN</label>
                <input type="text" value={newIsbn} onChange={(e) => setNewIsbn(e.target.value)} style={inputStyle} placeholder="978-0123456789" />
              </div>
              <div>
                <label style={labelStyle}>Copies</label>
                <input type="number" value={newCopies} onChange={(e) => setNewCopies(Number(e.target.value))} style={inputStyle} min={1} required />
              </div>
            </div>
            <div>
              <label style={labelStyle}>Category</label>
              <select value={newCategory} onChange={(e) => setNewCategory(e.target.value)} style={inputStyle}>
                <option value="Science">Science & Physics</option>
                <option value="Mathematics">Mathematics</option>
                <option value="History">History</option>
                <option value="Technology">Technology & Computer</option>
                <option value="Literature">Literature & Fiction</option>
              </select>
            </div>
            <button type="submit" style={submitBtnStyle}>Add Book & Generate Barcodes</button>
          </form>
        </ModalWrapper>
      )}

      {/* Collect Fine Modal */}
      {activeModal === 'fine' && (
        <ModalWrapper title="Collect Member Overdue Fine" onClose={() => setActiveModal(null)}>
          <form onSubmit={handleFineSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={labelStyle}>Select Pending Fine</label>
              <select value={fineIdToPay} onChange={(e) => setFineIdToPay(e.target.value)} style={inputStyle} required>
                <option value="">-- Choose Fine Record --</option>
                {fines.filter((f) => f.status === 'Pending').map((f) => (
                  <option key={f.id} value={f.id}>{f.memberName} - ₹{f.fineAmount} ({f.bookTitle})</option>
                ))}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Payment Method</label>
              <select value={finePayMethod} onChange={(e) => setFinePayMethod(e.target.value)} style={inputStyle}>
                <option value="Cash Desk">Cash Desk</option>
                <option value="Online Payment">Online Payment (UPI/Card)</option>
                <option value="Deduct from ERP Student Account">Deduct from ERP Student Account</option>
              </select>
            </div>
            <button type="submit" style={submitBtnStyle}>Collect Fine & Generate Receipt</button>
          </form>
        </ModalWrapper>
      )}
    </div>
  );
}

function ModalWrapper({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex',
      alignItems: 'center', justifyContent: 'center', padding: '16px'
    }}>
      <div style={{
        background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)',
        borderRadius: '16px', padding: '24px', width: '100%', maxWidth: '480px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ margin: 0, fontSize: '17px', fontWeight: 800, color: 'var(--text-primary)' }}>{title}</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}>
            <X size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

const quickBtnStyle: React.CSSProperties = {
  padding: '9px 14px',
  borderRadius: '8px',
  border: '1px solid var(--border-subtle)',
  background: 'var(--bg-surface-raised)',
  color: 'var(--text-primary)',
  fontSize: '12px',
  fontWeight: 700,
  cursor: 'pointer',
};

const linkBtnStyle: React.CSSProperties = {
  background: 'none',
  border: 'none',
  color: '#2563EB',
  fontSize: '12px',
  fontWeight: 700,
  cursor: 'pointer',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '12px',
  fontWeight: 700,
  color: 'var(--text-primary)',
  marginBottom: '4px',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px 12px',
  borderRadius: '8px',
  border: '1px solid var(--border-subtle)',
  background: 'var(--bg-surface-raised)',
  color: 'var(--text-primary)',
  fontSize: '13px',
  boxSizing: 'border-box',
};

const submitBtnStyle: React.CSSProperties = {
  padding: '11px',
  borderRadius: '8px',
  border: 'none',
  background: '#4F46E5',
  color: '#FFF',
  fontWeight: 700,
  fontSize: '13px',
  cursor: 'pointer',
  marginTop: '6px',
};
