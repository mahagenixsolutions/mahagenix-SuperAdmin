import React from 'react';
import { PageHeader } from '../components/PageHeader';
import type { BreadcrumbItem } from '../components/PageHeader';
import { KPIGrid } from '../components/KPIGrid';

export interface ManagementLayoutProps {
  breadcrumbs?: BreadcrumbItem[];
  title: string;
  subtitle?: string;
  roleBadge?: string;
  headerActions?: React.ReactNode;

  kpiCards?: React.ReactNode;
  filterBar?: React.ReactNode;
  actionBar?: React.ReactNode;

  mainContent: React.ReactNode;
  sidePanel?: React.ReactNode;

  aiPanel?: React.ReactNode;
  activityTimeline?: React.ReactNode;
}

export const ManagementLayout: React.FC<ManagementLayoutProps> = ({
  breadcrumbs,
  title,
  subtitle,
  roleBadge = 'ACADEMIC OPERATIONS',
  headerActions,

  kpiCards,
  filterBar,
  actionBar,

  mainContent,
  sidePanel,

  aiPanel,
  activityTimeline,
}) => {
  return (
    <div className="academic-page-container" style={{ display: 'flex', flexDirection: 'column', gap: '32px', width: '100%', boxSizing: 'border-box' }}>
      {/* 1. Header */}
      <PageHeader
        breadcrumbs={breadcrumbs}
        title={title}
        subtitle={subtitle}
        roleBadge={roleBadge}
        actions={headerActions}
      />

      {/* 2. KPI Cards */}
      {kpiCards && <KPIGrid>{kpiCards}</KPIGrid>}

      {/* 3. Toolbar & Filters */}
      {filterBar && <div>{filterBar}</div>}

      {/* 4. Action Bar */}
      {actionBar && <div>{actionBar}</div>}

      {/* 5. Main Content Grid (70% Main / 30% Side Panel) */}
      <div className="academic-main-grid" style={{ alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', minWidth: 0 }}>
          {mainContent}
        </div>
        {sidePanel && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', minWidth: 0 }}>
            {sidePanel}
          </div>
        )}
      </div>

      {/* 6. AI Intelligence */}
      {aiPanel && <div>{aiPanel}</div>}

      {/* 7. Activity Log */}
      {activityTimeline && <div>{activityTimeline}</div>}
    </div>
  );
};
