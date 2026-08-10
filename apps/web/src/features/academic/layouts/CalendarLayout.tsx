import React from 'react';
import { PageHeader } from '../components/PageHeader';
import type { BreadcrumbItem } from '../components/PageHeader';
import { KPIGrid } from '../components/KPIGrid';

export interface CalendarLayoutProps {
  breadcrumbs?: BreadcrumbItem[];
  title: string;
  subtitle?: string;
  roleBadge?: string;
  headerActions?: React.ReactNode;

  kpiCards?: React.ReactNode;
  toolbar?: React.ReactNode;

  calendarContent: React.ReactNode;
  sidebarContent?: React.ReactNode;

  activityTimeline?: React.ReactNode;
}

export const CalendarLayout: React.FC<CalendarLayoutProps> = ({
  breadcrumbs,
  title,
  subtitle,
  roleBadge = 'SCHEDULING & TIMETABLE',
  headerActions,

  kpiCards,
  toolbar,

  calendarContent,
  sidebarContent,

  activityTimeline,
}) => {
  return (
    <div className="academic-page-container" style={{ display: 'flex', flexDirection: 'column', gap: '32px', width: '100%', boxSizing: 'border-box' }}>
      <PageHeader
        breadcrumbs={breadcrumbs}
        title={title}
        subtitle={subtitle}
        roleBadge={roleBadge}
        actions={headerActions}
      />

      {kpiCards && <KPIGrid>{kpiCards}</KPIGrid>}

      {toolbar && <div>{toolbar}</div>}

      <div className="academic-main-grid" style={{ alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', minWidth: 0 }}>
          {calendarContent}
        </div>
        {sidebarContent && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', minWidth: 0 }}>
            {sidebarContent}
          </div>
        )}
      </div>

      {activityTimeline && <div>{activityTimeline}</div>}
    </div>
  );
};
