import React, { useState, useEffect } from 'react';
import { Check, X, ShieldAlert, Award, Calendar, Bookmark, Bell, ArrowRight, MoreVertical, Eye } from 'lucide-react';
import type { ApprovalItem } from '../services/principalDashboard.service';

interface AnnouncementItem {
  id: string;
  tag: string;
  tagColor: string;
  time: string;
  title: string;
  desc: string;
}

interface Props {
  approvals: ApprovalItem[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

const CATEGORIES = [
  { id: 'all', label: 'All', icon: '📋' },
  { id: 'admissions', label: 'Admissions', icon: '📝' },
  { id: 'leave', label: 'Leaves', icon: '🗓️' },
  { id: 'results', label: 'Results', icon: '📊' },
  { id: 'staff', label: 'Staff', icon: '👤' },
];

export default function ApprovalsAndAnnouncements({ approvals, onApprove, onReject }: Props) {
  const [activeFilter, setActiveFilter] = useState<'all' | string>('all');
  const [selectedItemForModal, setSelectedItemForModal] = useState<ApprovalItem | null>(null);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 767.98);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const filtered = approvals.filter(item => {
    if (item.status !== 'pending') return false;
    if (activeFilter === 'all') return true;
    return item.category === activeFilter;
  });

  // Calculate counts for filters
  const getFilterCount = (catId: string) => {
    const pending = approvals.filter(item => item.status === 'pending');
    if (catId === 'all') return pending.length;
    return pending.filter(item => item.category === catId).length;
  };

  // Mock announcements list matching the mockup image
  const announcements: AnnouncementItem[] = [
    {
      id: 'ann-1',
      tag: 'NEW',
      tagColor: 'var(--color-primary)',
      time: '10 min ago',
      title: 'Annual Sports Day',
      desc: 'Join us for the Annual Sports Day on June 10, 2026.',
    },
    {
      id: 'ann-2',
      tag: 'General',
      tagColor: 'var(--text-muted)',
      time: '2 hours ago',
      title: 'PTM Schedule Released',
      desc: 'Parent-teacher meeting will be held on June 8, 2026.',
    },
    {
      id: 'ann-3',
      tag: 'Events',
      tagColor: 'var(--accent-violet)',
      time: '5 hours ago',
      title: 'Library Week Celebration',
      desc: 'Exciting activities planned from June 1 - June 7.',
    },
  ];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
      gap: '24px',
      width: '100%',
    }}>
      {/* Approval Center Column */}
      <div className="card" style={{
        background: '#ffffff',
        borderRadius: '16px',
        border: '1px solid var(--border-subtle)',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.02)',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Inter, sans-serif',
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px 24px',
          borderBottom: '1px solid var(--border-subtle)',
        }}>
          <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '3px', height: '14px', background: '#8B5CF6', borderRadius: '2px' }} />
            Approval Center
          </h3>
        </div>

        {/* Subtabs Filter pills */}
        <div style={{
          display: 'flex',
          gap: '8px',
          padding: '16px 24px',
          borderBottom: '1px solid var(--border-subtle)',
          overflowX: 'auto',
          scrollbarWidth: 'none',
        }}>
          {CATEGORIES.map(cat => {
            const count = getFilterCount(cat.id);
            const isActive = activeFilter === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 12px',
                  borderRadius: '99px',
                  fontSize: '12px',
                  fontWeight: 600,
                  border: '1px solid var(--border-subtle)',
                  borderColor: isActive ? '#4F46E5' : 'var(--border-subtle)',
                  background: isActive ? '#4F46E5' : 'var(--bg-tertiary)',
                  color: isActive ? '#ffffff' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s',
                }}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
                {count > 0 && (
                  <span style={{
                    fontSize: '10px',
                    fontWeight: 700,
                    marginLeft: '4px',
                    padding: '1px 6px',
                    borderRadius: '99px',
                    background: isActive ? 'rgba(255, 255, 255, 0.25)' : 'var(--bg-surface)',
                    color: isActive ? '#ffffff' : 'var(--text-muted)',
                  }}>
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Pending Requests List */}
        <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '32px 0', color: 'var(--text-muted)', fontSize: '13px' }}>
              No pending approvals in this category ✓
            </div>
          ) : (
            filtered.slice(0, 5).map((item) => {
              const isMenuOpen = activeMenuId === item.id;
              
              return (
                <div key={item.id} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingBottom: '14px',
                  borderBottom: '1px solid var(--border-subtle)',
                  position: 'relative',
                  gap: '12px',
                }}>
                  <div 
                    onClick={() => setSelectedItemForModal(item)}
                    style={{ display: 'flex', gap: '12px', alignItems: 'center', minWidth: 0, flex: 1, cursor: 'pointer' }}
                  >
                    {/* User Initial Circle */}
                    <div style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      background: 'var(--bg-tertiary)',
                      color: 'var(--text-secondary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '13px',
                      flexShrink: 0,
                    }}>
                      {item.requestedBy ? item.requestedBy[0] : item.title[0]}
                    </div>

                    <div style={{ minWidth: 0, flex: 1 }}>
                      {/* Field 1: Title (Request Name) */}
                      <div style={{
                        fontSize: '14px',
                        fontWeight: 700,
                        color: 'var(--text-primary)',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}>
                        {item.title}
                      </div>

                      {/* Field 2: Requested date & priority badge */}
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px', flexWrap: 'wrap' }}>
                        <span>Requested: {item.requestedDate}</span>
                        <span style={{
                          fontSize: '10px',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          padding: '2px 8px',
                          borderRadius: '4px',
                          background: item.priority === 'high' ? 'rgba(239, 68, 68, 0.1)' : item.priority === 'medium' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(59, 130, 246, 0.1)',
                          color: item.priority === 'high' ? '#EF4444' : item.priority === 'medium' ? '#F59E0B' : '#3B82F6',
                        }}>
                          {item.priority}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Desktop Inline Actions (Visible on big screens >=768px) */}
                  {!isMobile && (
                    <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                      <button
                        onClick={() => onApprove(item.id)}
                        style={{
                          border: '1px solid #22C55E',
                          background: 'rgba(34, 197, 94, 0.05)',
                          color: '#22C55E',
                          borderRadius: '6px',
                          padding: '6px 14px',
                          fontSize: '12px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        <Check size={13} /> Approve
                      </button>
                      <button
                        onClick={() => onReject(item.id)}
                        style={{
                          border: '1px solid #EF4444',
                          background: 'rgba(239, 68, 68, 0.05)',
                          color: '#EF4444',
                          borderRadius: '6px',
                          padding: '6px 14px',
                          fontSize: '12px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        <X size={13} /> Reject
                      </button>
                    </div>
                  )}

                  {/* Three Dots Action Button (Visible on small screens <768px only) */}
                  {isMobile && (
                    <div style={{ position: 'relative', marginLeft: '4px' }}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveMenuId(isMenuOpen ? null : item.id);
                        }}
                        title="More Options"
                        style={{
                          border: 'none',
                          background: isMenuOpen ? 'var(--bg-tertiary)' : 'transparent',
                          color: 'var(--text-secondary)',
                          borderRadius: '50%',
                          width: '36px',
                          height: '36px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                        }}
                      >
                        <MoreVertical size={18} />
                      </button>

                      {/* Popover Options Dropdown */}
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
                            minWidth: '160px',
                            padding: '6px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '2px',
                          }}
                        >
                          <button
                            onClick={() => {
                              setActiveMenuId(null);
                              setSelectedItemForModal(item);
                            }}
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
                              setActiveMenuId(null);
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
                              setActiveMenuId(null);
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
            })
          )}
        </div>

        {/* Footer View All approvals */}
        <div style={{
          padding: '16px 24px',
          borderTop: '1px solid var(--border-subtle)',
          textAlign: 'center',
        }}>
          <button
            onClick={() => alert('Loading approvals logs page...')}
            style={{
              background: '#4F46E50D',
              border: 'none',
              borderRadius: '8px',
              color: '#4F46E5',
              padding: '8px 24px',
              fontSize: '13px',
              fontWeight: 700,
              width: '100%',
              cursor: 'pointer',
            }}
          >
            View All Approvals
          </button>
        </div>
      </div>

      {/* Recent Announcements Column */}
      <div className="card" style={{
        background: '#ffffff',
        borderRadius: '16px',
        border: '1px solid var(--border-subtle)',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.02)',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Inter, sans-serif',
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px 24px',
          borderBottom: '1px solid var(--border-subtle)',
        }}>
          <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '3px', height: '14px', background: '#3b82f6', borderRadius: '2px' }} />
            Recent Announcements
          </h3>
          <button
            onClick={() => alert('Navigating to notices...')}
            style={{ fontSize: '12px', fontWeight: 600, background: 'none', border: 'none', color: '#4F46E5', cursor: 'pointer' }}
          >
            View All ›
          </button>
        </div>

        {/* Announcements list */}
        <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '20px', flex: 1 }}>
          {announcements.map((item, idx) => (
            <div key={item.id} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                background: 'rgba(59, 130, 246, 0.1)',
                color: '#3b82f6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <Bell size={16} />
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: '8px',
                  flexWrap: 'wrap'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', minWidth: 0, flex: 1 }}>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.3 }}>{item.title}</span>
                    <span style={{
                      fontSize: '10px',
                      fontWeight: 700,
                      background: item.tag === 'NEW' ? 'rgba(79, 70, 229, 0.15)' : item.tag === 'Events' ? 'rgba(139, 92, 246, 0.15)' : 'var(--bg-tertiary)',
                      color: item.tag === 'NEW' ? '#4F46E5' : item.tag === 'Events' ? '#8B5CF6' : 'var(--text-secondary)',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      textTransform: 'uppercase',
                      whiteSpace: 'nowrap',
                      flexShrink: 0,
                    }}>
                      {item.tag}
                    </span>
                  </div>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)', whiteSpace: 'nowrap', flexShrink: 0 }}>{item.time}</span>
                </div>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '4px 0 0 0', lineHeight: 1.4 }}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
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
