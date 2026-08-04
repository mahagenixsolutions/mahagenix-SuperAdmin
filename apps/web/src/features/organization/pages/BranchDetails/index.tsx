import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  GraduationCap, 
  DollarSign, 
  Users, 
  UserCheck, 
  Building, 
  Bus, 
  FileText, 
  ClipboardList, 
  Settings, 
  ArrowLeft 
} from 'lucide-react';
import { mockBranchDetails } from './mockData';
import { Tabs } from '../../../../components/ui/Tabs';

// Subcomponents
import BranchHeader from './BranchHeader';
import BranchQuickActions from './BranchQuickActions';
import BranchKPIs from './BranchKPIs';

// Tabs Views
import BranchHealthCard from './overview/BranchHealthCard';
import AIInsightsCard from './overview/AIInsightsCard';
import BranchInformation from './overview/BranchInformation';
import BranchComparison from './overview/BranchComparison';
import RecentTimeline from './overview/RecentTimeline';
import Announcements from './overview/Announcements';

import AcademicInsights from './academics/AcademicInsights';
import FinancialSummary from './finance/FinancialSummary';
import PeopleSummary from './people/PeopleSummary';
import OperationsSummary from './operations/OperationsSummary';
import DocumentsSummary from './documents/DocumentsSummary';
import SettingsSummary from './settings/SettingsSummary';

type TabKey =
  | 'overview'
  | 'academics'
  | 'finance'
  | 'students'
  | 'teachers'
  | 'infrastructure'
  | 'transport'
  | 'documents'
  | 'activity'
  | 'settings';

export default function BranchDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabKey>('overview');

  const branch = mockBranchDetails[id || ''] || mockBranchDetails['branch-koramangala'];

  const handleActionClick = (actionName: string) => {
    alert(`Quick Action Triggered: ${actionName.replace('-', ' ').toUpperCase()} inside ${branch.name}`);
  };

  const tabs: { key: TabKey; label: string; icon: React.ReactNode }[] = [
    { key: 'overview', label: 'Overview', icon: <LayoutDashboard size={14} /> },
    { key: 'academics', label: 'Academics', icon: <GraduationCap size={14} /> },
    { key: 'finance', label: 'Finance', icon: <DollarSign size={14} /> },
    { key: 'students', label: 'Students', icon: <Users size={14} /> },
    { key: 'teachers', label: 'Teachers', icon: <UserCheck size={14} /> },
    { key: 'infrastructure', label: 'Infrastructure', icon: <Building size={14} /> },
    { key: 'transport', label: 'Transport', icon: <Bus size={14} /> },
    { key: 'documents', label: 'Documents', icon: <FileText size={14} /> },
    { key: 'activity', label: 'Activity', icon: <ClipboardList size={14} /> },
    { key: 'settings', label: 'Settings', icon: <Settings size={14} /> }
  ];

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case 'academics':
        return <AcademicInsights data={branch.academics} />;
      case 'finance':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <FinancialSummary data={branch.finance} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
              <BranchComparison currentBranch={branch} />
            </div>
          </div>
        );
      case 'students':
        return <PeopleSummary students={branch.students} teachers={branch.teachers} />;
      case 'teachers':
        return <PeopleSummary students={branch.students} teachers={branch.teachers} />;
      case 'infrastructure':
        return <OperationsSummary infrastructure={branch.infrastructure} branchName={branch.name} />;
      case 'transport':
        return <OperationsSummary infrastructure={branch.infrastructure} branchName={branch.name} />;
      case 'documents':
        return <DocumentsSummary compliance={branch.compliance} />;
      case 'activity':
        return <RecentTimeline activities={branch.activities} />;
      case 'settings':
        return <SettingsSummary />;
      case 'overview':
      default:
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Health & AI Insights */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
              <BranchHealthCard health={branch.health} />
              <AIInsightsCard />
            </div>

            {/* Branch Details Profile */}
            <BranchInformation info={branch.info} />

            {/* Comparison & Broadcasts */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
              <BranchComparison currentBranch={branch} />
              <Announcements announcements={branch.announcements} />
            </div>

            {/* Timelines */}
            <RecentTimeline activities={branch.activities} />
          </div>
        );
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
      paddingBottom: '40px',
      fontFamily: 'Inter, sans-serif'
    }}>
      {/* Back button link */}
      <div style={{ paddingTop: '20px' }}>
        <button
          onClick={() => navigate('/org/branches')}
          style={{
            background: 'none',
            border: 'none',
            color: '#2563eb',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '13px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: 0
          }}
        >
          <ArrowLeft size={16} /> Back to Branches Directory
        </button>
      </div>

      {/* Hero Header component */}
      <BranchHeader
        branch={branch}
        onEdit={() => handleActionClick('edit-branch')}
        onExport={() => handleActionClick('generate-report')}
      />

      {/* Sticky Quick Actions component */}
      <BranchQuickActions onActionClick={handleActionClick} />

      {/* Grouped Executive KPIs Dashboard */}
      <BranchKPIs branch={branch} />

      {/* Performance tab switcher navigation */}
      <Tabs
        tabs={tabs.map(t => ({ id: t.key, label: t.label, icon: t.icon }))}
        activeTab={activeTab}
        onChange={(id) => setActiveTab(id as TabKey)}
        variant="scrollable"
        style={{ marginTop: '10px' }}
      />

      {/* Render Dynamic Tab Content */}
      <div style={{ minHeight: '300px' }}>
        {renderActiveTabContent()}
      </div>
    </div>
  );
}
