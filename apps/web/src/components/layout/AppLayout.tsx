import { useState, useEffect, useRef } from 'react';
import { Outlet, useNavigate, useLocation, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import type { RootState } from '../../store';
import Sidebar from './Sidebar';
import { logout, switchMockRole } from '../../store/authSlice';

const BREADCRUMB_MAP: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/analytics': 'Analytics',
  '/notifications': 'Notifications',
  '/audit-logs': 'Audit Logs',
  '/reports': 'Reports',
  '/finance': 'Finance Portal',
  '/library': 'Library Workspace',
  '/transport': 'Transport Workspace',
  '/hostel': 'Hostel Workspace',
  '/hr': 'Human Resources Workspace',
  '/reception': 'Reception Workspace',
  '/security': 'Security Command Center',
  '/settings': 'Settings',
  '/org/branches': 'School Branches',
  '/org/principals': 'Branch Administrators Directory',
  '/org/analytics/academic': 'Academic Analytics',
  '/org/analytics/financial': 'Financial Analytics',
  '/org/analytics/hr': 'HR Analytics',
  '/org/announcements': 'Announcements',
  '/org/communication': 'Communication',
  '/org/branding': 'Organization Profile',
  '/org/documents': 'Organization Documents',
  '/org/reports': 'Organization Reports',
  '/org/audit-logs': 'Organization Audit Logs',
  '/org/subscription': 'Organization Subscription',
  '/org/settings': 'Organization Settings',
  '/principal/approvals': 'Executive Approval Center',
  '/principal/profile': 'Executive Profile',
  '/principal/settings': 'Executive Settings',
};

export default function AppLayout() {
  const [collapsed, setCollapsed] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth <= 1023;
    }
    return false;
  });
  
  // Collapse sidebar automatically on mount / resize if on tablet or mobile viewport
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1023) {
        setCollapsed(true);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const user = useSelector((s: RootState) => s.auth.user);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const pageTitle = BREADCRUMB_MAP[location.pathname] || 'EduTrack AI';

  // Sync dark theme state from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('edutrack_theme') || '';
    document.documentElement.dataset.theme = savedTheme;
  }, []);

  // User Profile dropdown state
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  // Global Search state for staff
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Handle hotkeys (focus search with '/')
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement !== searchInputRef.current) {
        e.preventDefault();
        searchInputRef.current?.focus();
      } else if (e.key === 'Escape') {
        setShowSearchResults(false);
        searchInputRef.current?.blur();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    setShowSearchResults(query.trim().length > 1);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };
  return (
    <div className="app-layout">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      
      {/* Floating Circle Desktop Toggle Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="desktop-sidebar-toggle"
        style={{
          position: 'fixed',
          top: 28,
          left: collapsed ? 'calc(var(--sidebar-collapsed) - 12px)' : 'calc(var(--sidebar-width) - 12px)',
          width: 24,
          height: 24,
          borderRadius: '50%',
          background: 'var(--bg-surface)',
          border: '1.5px solid var(--border-color)',
          color: 'var(--text-primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 1001,
          boxShadow: 'var(--shadow-sm)',
          transition: 'left 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), background-color 0.2s ease, border-color 0.2s ease',
          padding: 0,
        }}
        title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
      >
        {collapsed ? (
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        ) : (
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        )}
      </button>

      {!collapsed && (
        <div
          className="mobile-backdrop"
          onClick={() => setCollapsed(true)}
          style={{
            display: 'none',
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.3)',
            backdropFilter: 'blur(3px)',
            zIndex: 99,
          }}
        />
      )}

      <div className={`main-content${collapsed ? ' sidebar-collapsed' : ''}`}>
        {/* Topbar */}
        <header className="topbar">
          <div className="topbar-left">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <button
                  className="mobile-menu-toggle"
                  onClick={() => setCollapsed(!collapsed)}
                  style={{
                    display: 'none',
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-primary)',
                    cursor: 'pointer',
                    padding: 8,
                    borderRadius: 'var(--radius-md)',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  title="Toggle menu"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </svg>
                </button>
                <div className="breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-muted)', fontFamily: 'Inter, sans-serif' }}>
                  <span className="mobile-hidden">EduTrack AI</span>
                  <span className="mobile-hidden" style={{ color: 'var(--text-muted)' }}>&gt;</span>
                  {location.pathname.includes('/analytics/') && (
                    <>
                      <span className="mobile-hidden">Analytics</span>
                      <span className="mobile-hidden" style={{ color: 'var(--text-muted)' }}>&gt;</span>
                    </>
                  )}
                  <span className="breadcrumb-current" style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{pageTitle}</span>
                </div>
              </div>
          </div>

          <div className="topbar-right">
            {/* Global Search for Staff */}
            <div className="search-bar mobile-hidden" style={{ position: 'relative' }}>
              <span className="search-bar-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--text-muted)">
                  <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                </svg>
              </span>
              <input
                ref={searchInputRef}
                type="search"
                className="form-input"
                placeholder="Search staff, reports, branches... (Ctrl + /)"
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => searchQuery.trim().length > 1 && setShowSearchResults(true)}
                style={{ height: 38, fontSize: 13, paddingRight: 12 }}
              />

              {showSearchResults && (
                <>
                  <div
                    style={{
                      position: 'fixed',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      zIndex: 999,
                    }}
                    onClick={() => setShowSearchResults(false)}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      right: 0,
                      marginTop: 8,
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-md)',
                      boxShadow: 'var(--shadow-lg)',
                      zIndex: 1000,
                      maxHeight: 280,
                      overflowY: 'auto',
                      padding: 8,
                    }}
                  >
                    <div style={{ padding: 8, fontSize: 12, color: 'var(--text-muted)' }}>
                      Quick Links matching "{searchQuery}":
                    </div>
                    {[
                      { label: 'Finance Workspace', path: '/finance' },
                      { label: 'HR Workspace', path: '/hr' },
                      { label: 'Reception & Visitors', path: '/reception' },
                      { label: 'Library Desk', path: '/library' },
                      { label: 'Transport & Fleet', path: '/transport' },
                      { label: 'Hostel & Roll Call', path: '/hostel' },
                      { label: 'Security Command Center', path: '/security' },
                      { label: 'Executive Analytics', path: '/analytics' },
                    ]
                      .filter(item => item.label.toLowerCase().includes(searchQuery.toLowerCase()))
                      .map(item => (
                        <button
                          key={item.path}
                          onClick={() => {
                            navigate(item.path);
                            setShowSearchResults(false);
                            setSearchQuery('');
                          }}
                          style={{
                            display: 'block',
                            width: '100%',
                            padding: '8px 12px',
                            border: 'none',
                            background: 'none',
                            color: 'var(--text-primary)',
                            textAlign: 'left',
                            borderRadius: 'var(--radius-sm)',
                            cursor: 'pointer',
                            fontSize: 13,
                            fontWeight: 500,
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-primary)')}
                          onMouseLeave={(e) => (e.currentTarget.style.background = 'none')}
                        >
                          {item.label}
                        </button>
                      ))}
                  </div>
                </>
              )}
            </div>


            {/* Notifications */}
            <button
              id="topbar-notifications"
              onClick={() => navigate('/notifications')}
              style={{
                position: 'relative',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                width: 38,
                height: 38,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'var(--text-secondary)',
                transition: 'var(--transition-fast)',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
              </svg>
              <span style={{
                position: 'absolute',
                top: -4,
                right: -4,
                background: '#ef4444',
                color: 'white',
                borderRadius: '50%',
                width: 16,
                height: 16,
                fontSize: 10,
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'Inter, sans-serif'
              }}>
                3
              </span>
            </button>

            {/* Theme toggle */}
            <button
              id="topbar-theme"
              className="mobile-hidden"
              style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                width: 38,
                height: 38,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'var(--text-secondary)',
              }}
              onClick={() => {
                const html = document.documentElement;
                const nextTheme = html.dataset.theme === 'dark' ? '' : 'dark';
                html.dataset.theme = nextTheme;
                localStorage.setItem('edutrack_theme', nextTheme);
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z" />
              </svg>
            </button>

            {/* User avatar menu */}
            <select
              value={user?.role || 'ORGANIZATION_ADMIN'}
              onChange={(event) => {
                dispatch(switchMockRole(event.target.value as any));
                navigate('/dashboard');
              }}
              className="form-select demo-role-switcher"
              title="Switch demo role"
              style={{ height: 38, width: 160, fontSize: 12, fontWeight: 700 }}
            >
              <option value="ORGANIZATION_ADMIN">Organization Admin</option>
              <option value="PRINCIPAL">Principal</option>
              <option value="ACADEMIC_COORDINATOR">Academic Coordinator</option>
              <option value="ACCOUNTANT">Accountant</option>
              <option value="HR">HR Manager</option>
              <option value="LIBRARIAN">Librarian</option>
              <option value="TRANSPORT_MANAGER">Transport Manager</option>
              <option value="HOSTEL_MANAGER">Hostel Manager</option>
              <option value="RECEPTIONIST">Receptionist</option>
              <option value="SECURITY">Security Officer</option>
            </select>

            {/* User avatar menu */}
            <div style={{ position: 'relative' }}>
              <div
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '4px 8px',
                  borderRadius: 'var(--radius-md)',
                  cursor: 'pointer',
                }}
              >
                <div
                  className="avatar-fallback"
                  style={{
                    width: 34,
                    height: 34,
                    background:
                      'linear-gradient(135deg, var(--color-primary), var(--color-primary-light))',
                    color: 'white',
                    fontSize: 12,
                    fontWeight: 700,
                  }}
                >
                  {user ? `${user.first_name?.[0] ?? ''}${user.last_name?.[0] ?? ''}` : '??'}
                </div>
                <div
                  style={{ display: 'none', textDecoration: 'none' }}
                  className="md-visible-flex"
                >
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      lineHeight: 1.2,
                    }}
                  >
                    {user?.first_name} {user?.last_name}
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: 'var(--text-muted)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {user?.role?.replace('_', ' ')}
                  </div>
                </div>
              </div>

              {showUserDropdown && (
                <>
                  <div
                    style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 999 }}
                    onClick={() => setShowUserDropdown(false)}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '100%',
                      right: 0,
                      marginTop: 8,
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-md)',
                      boxShadow: 'var(--shadow-lg)',
                      zIndex: 1000,
                      minWidth: 220,
                      maxWidth: 'min(280px, calc(100vw - 24px))',
                      maxHeight: 'min(520px, calc(100dvh - 80px))',
                      overflowY: 'auto',
                      padding: 4,
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    {/* User Info Header */}
                    <div
                      style={{
                        padding: '8px 12px',
                        borderBottom: '1px solid var(--border-color)',
                        marginBottom: 4,
                      }}
                    >
                      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>
                        {user?.first_name} {user?.last_name}
                      </div>
                      <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{user?.email}</div>
                    </div>

                    {/* Logout */}
                    <button
                      onClick={handleLogout}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        width: '100%',
                        padding: '8px 12px',
                        border: 'none',
                        background: 'none',
                        color: 'var(--color-danger)',
                        borderRadius: 'var(--radius-sm)',
                        cursor: 'pointer',
                        textAlign: 'left',
                        fontSize: 13,
                        fontWeight: 500,
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-primary)')}
                      onMouseLeave={(e) => (e.currentTarget.style.background = 'none')}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
                      </svg>
                      <span>Logout</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="page-container" style={{ overflowX: 'hidden' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease: [0.25, 0.8, 0.25, 1] }}
              style={{ width: '100%', height: '100%' }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
