import React from 'react';
import {
  BookOpen,
  FileText,
  GraduationCap,
  Library,
  Bell,
  MessageSquare,
  CalendarCheck,
  SearchX,
  BarChart2,
  Calendar,
  Volume2,
  Users,
  Briefcase,
  UserCheck,
  DollarSign,
  CreditCard,
  Bus,
  Home,
  Book,
  Inbox,
  Filter,
  Plus,
  RefreshCw,
} from 'lucide-react';

export type EmptyStatePreset =
  | 'homework'
  | 'assignments'
  | 'courses'
  | 'books'
  | 'notifications'
  | 'messages'
  | 'attendance'
  | 'results'
  | 'reports'
  | 'events'
  | 'announcements'
  | 'visitors'
  | 'employees'
  | 'students'
  | 'finance'
  | 'transactions'
  | 'transport'
  | 'hostel'
  | 'library'
  | 'search'
  | 'generic';

export interface EmptyStateProps {
  preset?: EmptyStatePreset;
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  primaryActionLabel?: string;
  onPrimaryAction?: () => void;
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;
  suggestions?: string[];
  onSelectSuggestion?: (suggestion: string) => void;
  className?: string;
  style?: React.CSSProperties;
  compact?: boolean;
}

const PRESET_CONFIGS: Record<EmptyStatePreset, {
  title: string;
  description: string;
  icon: React.ReactNode;
  primaryLabel?: string;
  accentColor: string;
  bgGradient: string;
}> = {
  homework: {
    title: 'No Homework Assigned',
    description: 'You are all caught up! No active homework tasks or pending assignments for your classes.',
    icon: <FileText size={36} />,
    primaryLabel: 'Create Homework',
    accentColor: '#6366F1',
    bgGradient: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(129, 140, 248, 0.05) 100%)',
  },
  assignments: {
    title: 'No Assignments Found',
    description: 'There are no active coursework assignments or project submissions required at this time.',
    icon: <BookOpen size={36} />,
    primaryLabel: 'Add Assignment',
    accentColor: '#3B82F6',
    bgGradient: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(96, 165, 250, 0.05) 100%)',
  },
  courses: {
    title: 'No Enrolled Courses',
    description: 'You have not enrolled in any academic courses yet. Browse available curriculum modules.',
    icon: <GraduationCap size={36} />,
    primaryLabel: 'Explore Courses',
    accentColor: '#8B5CF6',
    bgGradient: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(167, 139, 250, 0.05) 100%)',
  },
  books: {
    title: 'No Books Issued',
    description: 'No library books are currently issued under this account. Explore the digital library catalog.',
    icon: <Book size={36} />,
    primaryLabel: 'Search Catalog',
    accentColor: '#0EA5E9',
    bgGradient: 'linear-gradient(135deg, rgba(14, 165, 233, 0.1) 0%, rgba(56, 189, 248, 0.05) 100%)',
  },
  notifications: {
    title: 'No New Notifications',
    description: 'You are completely up to date! System alerts and broadcast notices will appear here.',
    icon: <Bell size={36} />,
    primaryLabel: 'Notification Settings',
    accentColor: '#F59E0B',
    bgGradient: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(251, 191, 36, 0.05) 100%)',
  },
  messages: {
    title: 'No Conversations Active',
    description: 'Start a direct message with teachers, parents, or staff members to discuss progress.',
    icon: <MessageSquare size={36} />,
    primaryLabel: 'New Message',
    accentColor: '#10B981',
    bgGradient: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(52, 211, 153, 0.05) 100%)',
  },
  attendance: {
    title: 'No Attendance Logs Found',
    description: 'Attendance data for the selected date range or section has not been registered yet.',
    icon: <CalendarCheck size={36} />,
    primaryLabel: 'Mark Attendance',
    accentColor: '#059669',
    bgGradient: 'linear-gradient(135deg, rgba(5, 150, 105, 0.1) 0%, rgba(16, 185, 129, 0.05) 100%)',
  },
  results: {
    title: 'No Assessment Results',
    description: 'Examination scores and term grade transcripts have not been published for this student.',
    icon: <BarChart2 size={36} />,
    primaryLabel: 'Refresh Transcripts',
    accentColor: '#6366F1',
    bgGradient: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(167, 139, 250, 0.05) 100%)',
  },
  reports: {
    title: 'No Analytics Reports',
    description: 'No generated performance or financial reports match your current filter parameters.',
    icon: <FileText size={36} />,
    primaryLabel: 'Generate Report',
    accentColor: '#4F46E5',
    bgGradient: 'linear-gradient(135deg, rgba(79, 70, 229, 0.1) 0%, rgba(99, 102, 241, 0.05) 100%)',
  },
  events: {
    title: 'No Upcoming Events',
    description: 'There are no institutional sports meets, examinations, or cultural events scheduled today.',
    icon: <Calendar size={36} />,
    primaryLabel: 'Add School Event',
    accentColor: '#EC4899',
    bgGradient: 'linear-gradient(135deg, rgba(236, 72, 153, 0.1) 0%, rgba(244, 114, 182, 0.05) 100%)',
  },
  announcements: {
    title: 'No School Broadcasts',
    description: 'No executive circulars or principal notices have been published this week.',
    icon: <Volume2 size={36} />,
    primaryLabel: 'Post Announcement',
    accentColor: '#F43F5E',
    bgGradient: 'linear-gradient(135deg, rgba(244, 63, 94, 0.1) 0%, rgba(251, 113, 133, 0.05) 100%)',
  },
  visitors: {
    title: 'No Gate Visitors Today',
    description: 'The visitor check-in registry is currently clear. Recorded visitor entries will show here.',
    icon: <UserCheck size={36} />,
    primaryLabel: 'Register Visitor',
    accentColor: '#10B981',
    bgGradient: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(52, 211, 153, 0.05) 100%)',
  },
  employees: {
    title: 'No Faculty Found',
    description: 'No staff members or teachers match your search filter or department selection.',
    icon: <Briefcase size={36} />,
    primaryLabel: 'Add Staff Member',
    accentColor: '#8B5CF6',
    bgGradient: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(196, 181, 253, 0.05) 100%)',
  },
  students: {
    title: 'No Student Records Found',
    description: 'No active student profiles were found in this grade section or search criteria.',
    icon: <Users size={36} />,
    primaryLabel: 'Register Student',
    accentColor: '#3B82F6',
    bgGradient: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 197, 253, 0.05) 100%)',
  },
  finance: {
    title: 'No Financial Records',
    description: 'Fee ledgers and institutional ledger balance records have no pending entries.',
    icon: <DollarSign size={36} />,
    primaryLabel: 'Create Fee Ledger',
    accentColor: '#059669',
    bgGradient: 'linear-gradient(135deg, rgba(5, 150, 105, 0.1) 0%, rgba(52, 211, 153, 0.05) 100%)',
  },
  transactions: {
    title: 'No Recent Transactions',
    description: 'No fee receipts, vendor payments, or expense claims recorded during this period.',
    icon: <CreditCard size={36} />,
    primaryLabel: 'Record Payment',
    accentColor: '#10B981',
    bgGradient: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(110, 231, 183, 0.05) 100%)',
  },
  transport: {
    title: 'No Transport Records',
    description: 'No bus routes, vehicle assignments, or student commute passes found for this branch.',
    icon: <Bus size={36} />,
    primaryLabel: 'Add Bus Route',
    accentColor: '#F59E0B',
    bgGradient: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(253, 230, 138, 0.05) 100%)',
  },
  hostel: {
    title: 'No Hostel Boarders',
    description: 'There are no active resident students registered in the selected hostel dormitory.',
    icon: <Home size={36} />,
    primaryLabel: 'Assign Dorm Room',
    accentColor: '#8B5CF6',
    bgGradient: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(196, 181, 253, 0.05) 100%)',
  },
  library: {
    title: 'No Books in Catalog',
    description: 'The library repository currently has no catalog items or digital publications listed.',
    icon: <Library size={36} />,
    primaryLabel: 'Add Book Title',
    accentColor: '#0EA5E9',
    bgGradient: 'linear-gradient(135deg, rgba(14, 165, 233, 0.1) 0%, rgba(186, 230, 253, 0.05) 100%)',
  },
  search: {
    title: 'No Results Matching Search',
    description: 'We could not find any matches for your query. Try checking for spelling errors or clearing filters.',
    icon: <SearchX size={36} />,
    primaryLabel: 'Clear All Filters',
    accentColor: '#64748B',
    bgGradient: 'linear-gradient(135deg, rgba(100, 116, 139, 0.1) 0%, rgba(203, 213, 225, 0.05) 100%)',
  },
  generic: {
    title: 'No Data Available',
    description: 'There is no information to display right now. Try adding a new record or refreshing.',
    icon: <Inbox size={36} />,
    primaryLabel: 'Add Record',
    accentColor: '#6366F1',
    bgGradient: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(199, 210, 254, 0.05) 100%)',
  },
};

export const EmptyState: React.FC<EmptyStateProps> = ({
  preset = 'generic',
  title,
  description,
  icon,
  primaryActionLabel,
  onPrimaryAction,
  secondaryActionLabel,
  onSecondaryAction,
  suggestions,
  onSelectSuggestion,
  className = '',
  style = {},
  compact = false,
}) => {
  const config = PRESET_CONFIGS[preset] || PRESET_CONFIGS.generic;

  const displayTitle = title || config.title;
  const displayDescription = description || config.description;
  const displayIcon = icon || config.icon;
  const displayPrimaryLabel = primaryActionLabel || config.primaryLabel;

  return (
    <div
      className={`card empty-state-card ${className}`}
      style={{
        padding: compact ? '28px 20px' : '48px 32px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        background: 'var(--bg-surface, #FFFFFF)',
        border: '1px solid var(--border-subtle, #E2E8F0)',
        borderRadius: '24px',
        boxShadow: '0 4px 20px -2px rgba(15, 23, 42, 0.03)',
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        ...style,
      }}
    >
      {/* Decorative Vector Graphic Background Orb */}
      <div
        style={{
          position: 'absolute',
          top: '-40px',
          right: '-40px',
          width: '180px',
          height: '180px',
          borderRadius: '50%',
          background: config.bgGradient,
          filter: 'blur(36px)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-40px',
          left: '-40px',
          width: '180px',
          height: '180px',
          borderRadius: '50%',
          background: config.bgGradient,
          filter: 'blur(36px)',
          pointerEvents: 'none',
        }}
      />

      {/* Modern Illustration Badge */}
      <div
        style={{
          position: 'relative',
          width: compact ? '64px' : '84px',
          height: compact ? '64px' : '84px',
          borderRadius: '26px',
          background: config.bgGradient,
          border: `1.5px solid ${config.accentColor}30`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: config.accentColor,
          marginBottom: compact ? '16px' : '22px',
          boxShadow: `0 12px 28px -6px ${config.accentColor}25`,
        }}
      >
        {displayIcon}
        {/* Subtle accent ring */}
        <div
          style={{
            position: 'absolute',
            inset: -5,
            borderRadius: '30px',
            border: `1px dashed ${config.accentColor}40`,
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* Typography */}
      <h3
        style={{
          fontSize: compact ? '16px' : '20px',
          fontWeight: 700,
          color: 'var(--text-primary, #0F172A)',
          margin: '0 0 8px 0',
          letterSpacing: '-0.015em',
        }}
      >
        {displayTitle}
      </h3>

      <p
        style={{
          fontSize: compact ? '13px' : '14px',
          color: 'var(--text-secondary, #64748B)',
          margin: '0 0 24px 0',
          maxWidth: '460px',
          lineHeight: 1.55,
        }}
      >
        {displayDescription}
      </p>

      {/* Search Suggestions Pills (if search mode) */}
      {suggestions && suggestions.length > 0 && (
        <div style={{ marginBottom: '24px', width: '100%', maxWidth: '440px' }}>
          <div
            style={{
              fontSize: '11px',
              fontWeight: 700,
              color: 'var(--text-muted, #94A3B8)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '10px',
            }}
          >
            Popular Search Suggestions:
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
            {suggestions.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => onSelectSuggestion?.(item)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '100px',
                  border: '1px solid var(--border-subtle, #E2E8F0)',
                  background: 'var(--bg-tertiary, #F8FAFC)',
                  color: 'var(--text-secondary, #475569)',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = config.accentColor;
                  e.currentTarget.style.color = config.accentColor;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-subtle, #E2E8F0)';
                  e.currentTarget.style.color = 'var(--text-secondary, #475569)';
                }}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
        {onPrimaryAction && displayPrimaryLabel && (
          <button
            type="button"
            className="btn btn-primary"
            onClick={onPrimaryAction}
            style={{
              padding: compact ? '9px 18px' : '11px 24px',
              fontSize: '13px',
              fontWeight: 600,
              borderRadius: '12px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: config.accentColor,
              borderColor: config.accentColor,
              boxShadow: `0 4px 14px ${config.accentColor}40`,
            }}
          >
            <Plus size={16} />
            {displayPrimaryLabel}
          </button>
        )}

        {onSecondaryAction && secondaryActionLabel && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onSecondaryAction}
            style={{
              padding: compact ? '9px 18px' : '11px 24px',
              fontSize: '13px',
              fontWeight: 600,
              borderRadius: '12px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'var(--bg-secondary, #F1F5F9)',
              border: '1px solid var(--border-subtle, #E2E8F0)',
              color: 'var(--text-primary, #1E293B)',
            }}
          >
            <RefreshCw size={15} />
            {secondaryActionLabel}
          </button>
        )}
      </div>
    </div>
  );
};
