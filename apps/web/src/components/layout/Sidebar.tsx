import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/authSlice';
import type { RootState } from '../../store';
import { NAVIGATION_CONFIG } from '../../core/navigation/navigation.config';
import { UserRole } from '@edutrack/shared-types';
import { ROLE_PERMISSIONS } from '../../core/permissions/ROLE_PERMISSIONS';
import { ROLE_NAVIGATION } from '../../core/navigation/roleNavigation.config';
import React from 'react';
import { motion } from 'framer-motion';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((s: RootState) => s.auth.user);

  const checkActive = (to: string) => {
    const currentPath = location.pathname + location.search;
    
    // If the path is exact match
    if (currentPath === to) {
      return true;
    }
    
    // Fallback: If URL is exactly "/fees", treat it as "/fees?tab=dashboard"
    if (location.pathname === '/fees' && location.search === '') {
      if (to === '/fees?tab=dashboard') {
        return true;
      }
    }
    
    // Default pathname matching for standard paths (without query parameters)
    if (!to.includes('?')) {
      return location.pathname === to;
    }
    
    return false;
  };
  
  // Create a helper to check permission directly since we can't call hooks in a map function easily
  const hasPermission = (permission?: string) => {
    if (!permission) return true;
    if (!user || !user.role) return false;
    const rolePermissions = ROLE_PERMISSIONS[user.role as UserRole];
    return rolePermissions?.includes(permission as any) ?? false;
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const initials = user ? `${user.first_name?.[0] ?? ''}${user.last_name?.[0] ?? ''}`.toUpperCase() : '??';

  // Use role-specific configuration if available, otherwise fall back to generic configuration
  const userRole = user?.role as UserRole;
  const activeNavConfig = (userRole && ROLE_NAVIGATION[userRole]) ? ROLE_NAVIGATION[userRole] : NAVIGATION_CONFIG;

  // Filter navigation items by user permissions
  const filteredNavItems = activeNavConfig.map((section) => {
    const items = section.items.filter((item) => hasPermission(item.permission));
    return { ...section, items };
  }).filter((section) => section.items.length > 0);

  const [collapsedSections, setCollapsedSections] = React.useState<Record<string, boolean>>(() => ({
    'Overview': false,
    'Leadership': false,
    'Academic Oversight': false,
    'Operations': false,
    'Campus Operations': false,
    'Intelligence': false,
    'Finance Management': false,
    'Human Resources': false,
    'Organization': false,
  }));

  const toggleSection = (sectionName: string) => {
    if (collapsed) return;
    setCollapsedSections(prev => ({
      ...prev,
      [sectionName]: !prev[sectionName]
    }));
  };

  return (
    <aside
      className={`sidebar${collapsed ? ' collapsed' : ''}`}
      style={{
        width: collapsed ? '80px' : '260px',
        backgroundColor: '#ffffff',
        borderRight: '1px solid #e5e7eb',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        transition: 'width 0.2s',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '24px 20px', gap: '12px' }}>
        <div style={{
          width: '32px', height: '32px', borderRadius: '8px', background: '#4f46e5',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7l10 5 10-5-10-5z" fill="white" />
            <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
        {!collapsed && <span style={{ fontSize: '18px', fontWeight: 800, color: '#111827', letterSpacing: '-0.5px' }}>EduTrack AI</span>}
      </div>

      {/* User Info Header */}
      {!collapsed && (
        <div style={{ padding: '0 20px 20px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px', height: '40px', borderRadius: '50%', background: '#1e1b4b',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white', fontWeight: 700, fontSize: '14px', flexShrink: 0
            }}>
              {initials}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '14px', fontWeight: 700, color: '#111827', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                {user ? `${user.first_name} ${user.last_name}` : 'Meera Verma'}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#6b7280' }}><path d="m6 9 6 6 6-6"/></svg>
              </span>
              <span style={{ fontSize: '11px', fontWeight: 600, color: '#6b7280', marginTop: '2px' }}>
                {user?.role?.replace('_', ' ') || 'Academic Coordinator'}
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }} />
                <span style={{ fontSize: '11px', fontWeight: 600, color: '#10b981' }}>Online</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav style={{ flex: 1, overflowY: 'auto', padding: '0 12px' }} className="sidebar-nav-scroll">
        {filteredNavItems.map((section) => (
          <div key={section.section} style={{ marginBottom: '20px' }}>
            {!collapsed && (
              <div style={{ padding: '0 12px 10px 12px', fontSize: '11px', fontWeight: 800, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                {section.section}
              </div>
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {section.items.map((item) => {
                const isActive = checkActive(item.to);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    title={collapsed ? item.label : undefined}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px',
                      borderRadius: '8px', textDecoration: 'none',
                      backgroundColor: isActive ? '#eef2ff' : 'transparent',
                      color: isActive ? '#4f46e5' : '#4b5563',
                      fontWeight: isActive ? 700 : 600,
                      fontSize: '13px',
                      transition: 'all 0.15s ease',
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = '#f3f4f6';
                        e.currentTarget.style.color = '#111827';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = '#4b5563';
                      }
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: isActive ? '#4f46e5' : '#6b7280' }}>
                      <Icon />
                    </span>
                    {!collapsed && <span>{item.label}</span>}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer Area: Academic Year & Support */}
      <div style={{ padding: '20px', borderTop: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        
        {/* Academic Year Dropdown */}
        {!collapsed && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <span style={{ fontSize: '11px', fontWeight: 600, color: '#6b7280' }}>Academic Year</span>
            <button style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              width: '100%', padding: '10px 12px', background: '#ffffff',
              border: '1px solid #d1d5db', borderRadius: '8px', cursor: 'pointer',
              color: '#111827', fontSize: '13px', fontWeight: 600
            }}>
              2026 - 2027
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#6b7280' }}><path d="m6 9 6 6 6-6"/></svg>
            </button>
          </div>
        )}

        {/* Support Card */}
        {!collapsed && (
          <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '16px', border: '1px solid #e2e8f0' }}>
            <h4 style={{ margin: '0 0 4px 0', fontSize: '13px', fontWeight: 700, color: '#111827' }}>Need Help?</h4>
            <p style={{ margin: '0 0 12px 0', fontSize: '11px', color: '#64748b', lineHeight: 1.4 }}>Our support team is ready to help you.</p>
            <button style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              width: '100%', padding: '8px 12px', background: '#ffffff', color: '#4f46e5',
              border: '1px solid #e0e7ff', borderRadius: '8px', fontSize: '12px', fontWeight: 600,
              cursor: 'pointer', boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
            }}>
              Contact Support
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 18v-6a9 9 0 0 1 18 0v6"/>
                <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>
              </svg>
            </button>
          </div>
        )}

        {collapsed && (
          <button
            onClick={handleLogout}
            style={{
              width: '40px', height: '40px', borderRadius: '8px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: '#fef2f2', color: '#ef4444', border: 'none', cursor: 'pointer'
            }}
          >
            <LogoutIcon />
          </button>
        )}
      </div>
      
      {/* Scrollbar styles to hide it nicely */}
      <style>{`
        .sidebar-nav-scroll::-webkit-scrollbar {
          width: 4px;
        }
        .sidebar-nav-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .sidebar-nav-scroll::-webkit-scrollbar-thumb {
          background: #e5e7eb;
          border-radius: 4px;
        }
        .sidebar-nav-scroll:hover::-webkit-scrollbar-thumb {
          background: #d1d5db;
        }
      `}</style>
    </aside>
  );
}

// ─── Icon Components ──────────────────────────────────────────────────────────
const icon = (path: string) => () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d={path} />
  </svg>
);

const LogoutIcon = icon(
  'M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z',
);
