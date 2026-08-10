import React from 'react';
import { PageHeader } from '../components/PageHeader';
import type { BreadcrumbItem } from '../components/PageHeader';
import { KPIGrid } from '../components/KPIGrid';

export interface SettingsLayoutProps {
  breadcrumbs?: BreadcrumbItem[];
  title: string;
  subtitle?: string;
  roleBadge?: string;
  headerActions?: React.ReactNode;

  kpiCards?: React.ReactNode;
  categoryNav?: React.ReactNode;

  mainConfigContent: React.ReactNode;
  previewOrSidebar?: React.ReactNode;

  auditStream?: React.ReactNode;
}

export const SettingsLayout: React.FC<SettingsLayoutProps> = ({
  breadcrumbs,
  title,
  subtitle,
  roleBadge = 'SYSTEM SETTINGS',
  headerActions,

  kpiCards,
  categoryNav,

  mainConfigContent,
  previewOrSidebar,

  auditStream,
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

      {categoryNav && <div>{categoryNav}</div>}

      <div className="academic-main-grid" style={{ alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', minWidth: 0 }}>
          {mainConfigContent}
        </div>
        {previewOrSidebar && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', minWidth: 0 }}>
            {previewOrSidebar}
          </div>
        )}
      </div>

      {auditStream && <div>{auditStream}</div>}
    </div>
  );
};
