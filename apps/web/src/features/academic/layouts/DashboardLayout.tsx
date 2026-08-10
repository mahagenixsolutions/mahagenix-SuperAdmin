import React from 'react';
import { PageHeader } from '../components/PageHeader';
import type { BreadcrumbItem } from '../components/PageHeader';
import { HeroBanner } from '../components/HeroBanner';
import type { HeroBannerAction } from '../components/HeroBanner';
import { KPIGrid } from '../components/KPIGrid';

export interface DashboardLayoutProps {
  breadcrumbs?: BreadcrumbItem[];
  title: string;
  subtitle?: string;
  roleBadge?: string;
  headerActions?: React.ReactNode;

  heroTitle?: string;
  heroDescription?: string;
  heroBadge?: string;
  heroActions?: HeroBannerAction[];

  kpiCards?: React.ReactNode;
  quickActionsBar?: React.ReactNode;
  filterBar?: React.ReactNode;

  primaryContent: React.ReactNode;
  sidebarContent?: React.ReactNode;

  secondaryAnalytics?: React.ReactNode;
  reportsTable?: React.ReactNode;
  aiPanel?: React.ReactNode;
  activityTimeline?: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  breadcrumbs,
  title,
  subtitle,
  roleBadge = 'ACADEMIC OPERATIONS',
  headerActions,

  heroTitle,
  heroDescription,
  heroBadge,
  heroActions,

  kpiCards,
  quickActionsBar,
  filterBar,

  primaryContent,
  sidebarContent,

  secondaryAnalytics,
  reportsTable,
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

      {/* 2. Hero Banner */}
      {heroTitle && heroDescription && (
        <HeroBanner
          title={heroTitle}
          description={heroDescription}
          badge={heroBadge}
          quickActions={heroActions}
        />
      )}

      {/* 3. KPI Cards Row */}
      {kpiCards && <KPIGrid>{kpiCards}</KPIGrid>}

      {/* 4. Quick Actions */}
      {quickActionsBar && <div>{quickActionsBar}</div>}

      {/* 5. Filters / Search */}
      {filterBar && <div>{filterBar}</div>}

      {/* 6. Primary Content + Insights Sidebar (70% / 30% desktop) */}
      <div className="academic-main-grid" style={{ alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', minWidth: 0 }}>
          {primaryContent}
        </div>
        {sidebarContent && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', minWidth: 0 }}>
            {sidebarContent}
          </div>
        )}
      </div>

      {/* 7. Secondary Analytics */}
      {secondaryAnalytics && <div>{secondaryAnalytics}</div>}

      {/* 8. Reports / Tables */}
      {reportsTable && <div>{reportsTable}</div>}

      {/* 9. AI Intelligence Panel */}
      {aiPanel && <div>{aiPanel}</div>}

      {/* 10. Activity & Audit Timeline */}
      {activityTimeline && <div>{activityTimeline}</div>}
    </div>
  );
};
