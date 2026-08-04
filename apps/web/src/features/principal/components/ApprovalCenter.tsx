import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ApprovalItem, ApprovalCategory } from '../services/principalDashboard.service';
import { Tabs } from '../../../components/ui/Tabs';
import { MoreVertical, Eye, Check, X } from 'lucide-react';

const CATEGORIES: { key: ApprovalCategory | 'all'; label: string; icon: string }[] = [
  { key: 'all', label: 'All', icon: '📋' },
  { key: 'admissions', label: 'Admissions', icon: '📝' },
  { key: 'leave', label: 'Leave', icon: '🗓️' },
  { key: 'results', label: 'Results', icon: '📊' },
  { key: 'events', label: 'Events', icon: '🎪' },
  { key: 'announcements', label: 'Notices', icon: '📢' },
  { key: 'certificates', label: 'Certificates', icon: '📜' },
  { key: 'staff', label: 'Staff', icon: '👤' },
  { key: 'parents', label: 'Parents', icon: '👪' },
];

interface Props {
  approvals: ApprovalItem[];
  counts: Record<string, number>;
  activeFilter: ApprovalCategory | 'all';
  onFilterChange: (f: ApprovalCategory | 'all') => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  compact?: boolean;
}

export default function ApprovalCenter({
  approvals, counts, activeFilter, onFilterChange, onApprove, onReject, compact,
}: Props) {
  const navigate = useNavigate();
  const [selectedItemForModal, setSelectedItemForModal] = useState<ApprovalItem | null>(null);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 767.98);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const displayed = compact ? approvals.slice(0, 5) : approvals;

  return (
    <div style={cardStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h3 style={titleStyle}>
          <span style={{ width: 4, height: 16, borderRadius: 2, background: '#8B5CF6', flexShrink: 0 }} />
          Approval Center
        </h3>
        {compact && (
          <button onClick={() => navigate('/principal/approvals')} style={linkBtn}>
            View All →
          </button>
        )}
      </div>

      {/* Category pills */}
      <div style={{ marginBottom: 16 }}>
        <Tabs
          tabs={CATEGORIES.map(cat => ({
            id: cat.key,
            label: cat.label,
            icon: cat.icon,
            badge: (counts[cat.key] ?? 0) > 0 ? counts[cat.key] : undefined
          }))}
          activeTab={activeFilter}
          onChange={(id) => onFilterChange(id as any)}
          variant="scrollable"
        />
      </div>

      {/* Approval items */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {displayed.length === 0 && (
          <div style={{ padding: 24, textAlign: 'center', color: 'var(--text-muted)', fontSize: 13 }}>
            No pending approvals in this category ✓
          </div>
        )}
        {displayed.map(item => (
          <ApprovalRow
            key={item.id}
            item={item}
            isMobile={isMobile}
            isMenuOpen={activeMenuId === item.id}
            onToggleMenu={() => setActiveMenuId(activeMenuId === item.id ? null : item.id)}
            onCloseMenu={() => setActiveMenuId(null)}
            onOpenModal={() => {
              setActiveMenuId(null);
              setSelectedItemForModal(item);
            }}
            onApprove={onApprove}
            onReject={onReject}
          />
        ))}
      </div>

      {/* Popup Detail Modal */}
      {selectedItemForModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(15, 23, 42, 0.6)',
            backdropFilter: 'blur(4px)',
            padding: '16px',
          }}
          onClick={() => setSelectedItemForModal(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '480px',
              background: '#ffffff',
              borderRadius: '20px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              animation: 'slideUpToast 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)' }}>
                Request Details
              </h3>
              <button
                onClick={() => setSelectedItemForModal(null)}
                style={{
                  background: 'var(--bg-tertiary)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: 'var(--text-secondary)',
                }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Details Grid */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', background: 'var(--bg-surface-raised)', padding: '16px', borderRadius: '14px' }}>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>Requested Item</div>
                <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>{selectedItemForModal.title}</div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '2px' }}>Requested By</div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>{selectedItemForModal.requestedBy}</div>
                </div>

                <div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '2px' }}>Category</div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', textTransform: 'capitalize' }}>{selectedItemForModal.category}</div>
                </div>

                <div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '2px' }}>Requested Date</div>
                  <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{selectedItemForModal.requestedDate}</div>
                </div>

                <div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '2px' }}>Priority</div>
                  <span style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    display: 'inline-block',
                    background: selectedItemForModal.priority === 'high' ? 'rgba(239, 68, 68, 0.1)' : selectedItemForModal.priority === 'medium' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(59, 130, 246, 0.1)',
                    color: selectedItemForModal.priority === 'high' ? '#EF4444' : selectedItemForModal.priority === 'medium' ? '#F59E0B' : '#3B82F6',
                  }}>
                    {selectedItemForModal.priority}
                  </span>
                </div>
              </div>

              {selectedItemForModal.description && (
                <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '10px' }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>Description / Reason</div>
                  <div style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{selectedItemForModal.description}</div>
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', paddingTop: '8px' }}>
              <button
                onClick={() => {
                  onReject(selectedItemForModal.id);
                  setSelectedItemForModal(null);
                }}
                style={{
                  flex: 1,
                  padding: '10px 16px',
                  borderRadius: '10px',
                  border: '1px solid #EF4444',
                  background: 'rgba(239, 68, 68, 0.08)',
                  color: '#EF4444',
                  fontWeight: 700,
                  fontSize: '14px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                }}
              >
                <X size={16} /> Reject
              </button>

              <button
                onClick={() => {
                  onApprove(selectedItemForModal.id);
                  setSelectedItemForModal(null);
                }}
                style={{
                  flex: 1,
                  padding: '10px 16px',
                  borderRadius: '10px',
                  border: 'none',
                  background: '#22C55E',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '14px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  boxShadow: '0 4px 12px rgba(34, 197, 94, 0.25)',
                }}
              >
                <Check size={16} /> Approve
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ApprovalRow({ item, isMobile, isMenuOpen, onToggleMenu, onCloseMenu, onOpenModal, onApprove, onReject }: {
  item: ApprovalItem;
  isMobile: boolean;
  isMenuOpen: boolean;
  onToggleMenu: () => void;
  onCloseMenu: () => void;
  onOpenModal: () => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}) {
  const [hoveredAction, setHoveredAction] = useState<string | null>(null);

  const priorityColors = {
    high: { bg: 'var(--color-danger-surface)', color: 'var(--accent-danger)' },
    medium: { bg: 'var(--color-warning-surface)', color: 'var(--accent-warning)' },
    low: { bg: 'var(--bg-tertiary)', color: 'var(--text-muted)' },
  };
  const pc = priorityColors[item.priority];

  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '12px 14px', background: 'var(--bg-surface-raised)',
      border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)',
      gap: 12, position: 'relative',
    }}>
      <div 
        onClick={() => isMobile && onOpenModal()}
        style={{ flex: 1, minWidth: 0, cursor: isMobile ? 'pointer' : 'default' }}
      >
        {/* Field 1: Title & Priority */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {item.title}
          </span>
          <span style={{
            fontSize: 10, fontWeight: 600, padding: '2px 6px', borderRadius: 4,
            background: pc.bg, color: pc.color, textTransform: 'uppercase', flexShrink: 0
          }}>
            {item.priority}
          </span>
        </div>

        {/* Field 2: Requester & Requested Date */}
        <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
          {item.requestedBy} · {item.requestedDate}
        </div>
      </div>

      {/* Desktop Actions */}
      {!isMobile && (
        <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
          <button
            onClick={() => onApprove(item.id)}
            onMouseEnter={() => setHoveredAction('approve')}
            onMouseLeave={() => setHoveredAction(null)}
            style={{
              ...actionBtn,
              background: hoveredAction === 'approve' ? '#22C55E' : 'var(--color-secondary-surface)',
              color: hoveredAction === 'approve' ? '#fff' : 'var(--accent-success)',
              borderColor: 'var(--accent-success)',
            }}
          >
            ✓ Approve
          </button>
          <button
            onClick={() => onReject(item.id)}
            onMouseEnter={() => setHoveredAction('reject')}
            onMouseLeave={() => setHoveredAction(null)}
            style={{
              ...actionBtn,
              background: hoveredAction === 'reject' ? '#EF4444' : 'var(--color-danger-surface)',
              color: hoveredAction === 'reject' ? '#fff' : 'var(--accent-danger)',
              borderColor: 'var(--accent-danger)',
            }}
          >
            ✕ Reject
          </button>
        </div>
      )}

      {/* Mobile Three Dots Action Button */}
      {isMobile && (
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleMenu();
            }}
            title="More Options"
            style={{
              border: 'none',
              background: isMenuOpen ? 'var(--bg-tertiary)' : 'transparent',
              color: 'var(--text-secondary)',
              borderRadius: '50%',
              width: '34px',
              height: '34px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <MoreVertical size={18} />
          </button>

          {/* Popover Menu Dropdown */}
          {isMenuOpen && (
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                marginTop: '4px',
                background: '#ffffff',
                borderRadius: '12px',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.15), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
                border: '1px solid var(--border-subtle)',
                zIndex: 100,
                minWidth: '150px',
                padding: '6px',
                display: 'flex',
                flexDirection: 'column',
                gap: '2px',
              }}
            >
              <button
                onClick={onOpenModal}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  width: '100%',
                  padding: '8px 12px',
                  border: 'none',
                  background: 'transparent',
                  color: 'var(--text-primary)',
                  fontSize: '13px',
                  fontWeight: 600,
                  borderRadius: '6px',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <Eye size={15} style={{ color: '#4F46E5' }} /> Show Details
              </button>
              <button
                onClick={() => {
                  onCloseMenu();
                  onApprove(item.id);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  width: '100%',
                  padding: '8px 12px',
                  border: 'none',
                  background: 'transparent',
                  color: '#16A34A',
                  fontSize: '13px',
                  fontWeight: 600,
                  borderRadius: '6px',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <Check size={15} /> Approve
              </button>
              <button
                onClick={() => {
                  onCloseMenu();
                  onReject(item.id);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  width: '100%',
                  padding: '8px 12px',
                  border: 'none',
                  background: 'transparent',
                  color: '#DC2626',
                  fontSize: '13px',
                  fontWeight: 600,
                  borderRadius: '6px',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <X size={15} /> Reject
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Styles ────────────────────────────────────────────────────────────────

const cardStyle: React.CSSProperties = {
  background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)',
  borderRadius: 'var(--radius-lg)', padding: 20,
  boxShadow: 'var(--shadow-sm)', fontFamily: 'Inter, sans-serif',
};

const titleStyle: React.CSSProperties = {
  fontSize: 15, fontWeight: 700, color: 'var(--text-primary)',
  margin: 0, display: 'flex', alignItems: 'center', gap: 8,
};

const linkBtn: React.CSSProperties = {
  background: 'none', border: 'none', color: '#4F46E5',
  fontSize: 12, fontWeight: 600, cursor: 'pointer',
};

const actionBtn: React.CSSProperties = {
  padding: '5px 10px', borderRadius: 'var(--radius-sm)',
  fontSize: 11, fontWeight: 600, cursor: 'pointer',
  border: '1px solid', transition: 'all 0.2s',
};
