import React from 'react';
import { PageHeader } from '../components/PageHeader';
import type { BreadcrumbItem } from '../components/PageHeader';
import { KPIGrid } from '../components/KPIGrid';

export interface ProfileLayoutProps {
  breadcrumbs?: BreadcrumbItem[];
  title: string;
  subtitle?: string;
  roleBadge?: string;
  headerActions?: React.ReactNode;

  heroProfileCard?: React.ReactNode;
  kpiCards?: React.ReactNode;

  mainContent: React.ReactNode;
  sidebarContent?: React.ReactNode;

  activityTimeline?: React.ReactNode;
}

export const ProfileLayout: React.FC<ProfileLayoutProps> = ({
  breadcrumbs,
  title,
  subtitle,
  roleBadge = 'PROFILE & FACULTY',
  headerActions,

  heroProfileCard,
  kpiCards,

  mainContent,
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

      {heroProfileCard && <div>{heroProfileCard}</div>}

      {kpiCards && <KPIGrid>{kpiCards}</KPIGrid>}

      <div className="academic-main-grid" style={{ alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', minWidth: 0 }}>
          {mainContent}
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
