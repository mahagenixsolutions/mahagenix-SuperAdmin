import React from 'react';
import {
  FileText,
  TrendingUp,
  Sparkles,
  Award,
  AlertTriangle,
  Shield,
  Activity,
  ChevronRight,
  CheckCircle2
} from 'lucide-react';
import { PageLayout } from '../../../components/erp/PageLayout';
import { PageHeader } from '../../../components/erp/PageHeader';
import { KPICard } from '../../../components/erp/KPICard';

// ─── 1. Executive Reports Page ────────────────────────────────────────────────
export function ExecutiveReportsPage() {
  return (
    <PageLayout>
      <PageHeader
        title="Executive Reports & Institutional Audit Hub"
        subtitle="Consolidated executive reports for academic governance, financial audits, HR attrition, and compliance."
        breadcrumb={[
          { label: 'Leadership Workspace', path: '/dashboard' },
          { label: 'Intelligence', path: '/principal/intelligence/reports' },
          { label: 'Reports', path: '/principal/intelligence/reports' },
        ]}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 16, fontFamily: "'Inter', sans-serif" }}>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
          <KPICard title="AUDITED REPORTS" value="24 Generated" icon={<FileText size={20} />} tone="info" />
          <KPICard title="COMPLIANCE SCORE" value="100%" icon={<Shield size={20} />} tone="success" />
          <KPICard title="FINANCIAL AUDIT" value="Verified" icon={<Award size={20} />} tone="success" />
          <KPICard title="ACADEMIC HEALTH" value="Grade A+" icon={<Activity size={20} />} tone="success" />
        </div>

        <div style={cardStyle}>
          <h3 style={cardTitleStyle}>Executive Reports Library</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 12, marginTop: 14 }}>
            <ReportDownloadCard title="Annual Institutional Performance Audit (2026)" type="PDF Executive Summary" size="4.2 MB" />
            <ReportDownloadCard title="CBSE Board Examination Readiness Report" type="PDF Audit Document" size="2.8 MB" />
            <ReportDownloadCard title="Q2 Financial Revenue & Budget Health Report" type="XLSX Audit Statement" size="1.6 MB" />
            <ReportDownloadCard title="HR Staff Attrition & Retention Analytics" type="PDF HR Report" size="3.1 MB" />
            <ReportDownloadCard title="Campus Safety, Transport & Security Compliance" type="PDF Audit Document" size="5.0 MB" />
            <ReportDownloadCard title="Hostel Facilities & Resident Welfare Report" type="PDF Report" size="2.2 MB" />
          </div>
        </div>

      </div>
    </PageLayout>
  );
}

// ─── 2. Executive Analytics Page ──────────────────────────────────────────────
export function ExecutiveAnalyticsPage() {
  return (
    <PageLayout>
      <PageHeader
        title="Multi-Dimensional Executive Analytics"
        subtitle="Cross-departmental interactive trend analytics for enrollment growth, academic trends, and fiscal health."
        breadcrumb={[
          { label: 'Leadership Workspace', path: '/dashboard' },
          { label: 'Intelligence', path: '/principal/intelligence/reports' },
          { label: 'Analytics', path: '/principal/intelligence/analytics' },
        ]}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 16, fontFamily: "'Inter', sans-serif" }}>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
          <KPICard title="YEAR-OVER-YEAR GROWTH" value="+12.4%" icon={<TrendingUp size={20} />} tone="success" />
          <KPICard title="RETENTION INDEX" value="98.1%" icon={<CheckCircle2 size={20} />} tone="success" />
          <KPICard title="BUDGET EFFICIENCY" value="96.5%" icon={<Activity size={20} />} tone="info" />
          <KPICard title="BRAND REPUTATION SCORE" value="4.9 / 5" icon={<Award size={20} />} tone="success" />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <div style={cardStyle}>
            <h3 style={cardTitleStyle}>5-Year Institutional Enrollment Trend</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 14 }}>
              <AnalyticsTrendBar year="2026 (Current)" count="1,450 Students" percent={98} color="#4F46E5" />
              <AnalyticsTrendBar year="2025" count="1,320 Students" percent={88} color="#6366F1" />
              <AnalyticsTrendBar year="2024" count="1,210 Students" percent={80} color="#818CF8" />
              <AnalyticsTrendBar year="2023" count="1,100 Students" percent={74} color="#A5B4FC" />
              <AnalyticsTrendBar year="2022" count="980 Students" percent={65} color="#C7D2FE" />
            </div>
          </div>

          <div style={cardStyle}>
            <h3 style={cardTitleStyle}>Department Operational Efficiency Index</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 14 }}>
              <AnalyticsTrendBar year="Academic Department" count="96.2% Score" percent={96} color="#10B981" />
              <AnalyticsTrendBar year="Finance & Accounts" count="94.5% Score" percent={94} color="#3B82F6" />
              <AnalyticsTrendBar year="Human Resources" count="95.0% Score" percent={95} color="#6366F1" />
              <AnalyticsTrendBar year="Campus & Transport" count="92.1% Score" percent={92} color="#F59E0B" />
              <AnalyticsTrendBar year="Front-Office Reception" count="98.0% Score" percent={98} color="#EC4899" />
            </div>
          </div>
        </div>

      </div>
    </PageLayout>
  );
}

// ─── 3. Executive Insights Page ───────────────────────────────────────────────
export function ExecutiveInsightsPage() {
  return (
    <PageLayout>
      <PageHeader
        title="Executive Insights & AI Decision Command Center"
        subtitle="Comprehensive institutional health score, AI recommendations, risk alerts, and monthly executive summaries."
        breadcrumb={[
          { label: 'Leadership Workspace', path: '/dashboard' },
          { label: 'Intelligence', path: '/principal/intelligence/reports' },
          { label: 'Executive Insights', path: '/principal/intelligence/insights' },
        ]}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 16, fontFamily: "'Inter', sans-serif" }}>

        {/* Top 4 Executive Score Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))', gap: 14 }}>
          {/* Institutional Health Score */}
          <div style={{ background: 'linear-gradient(135deg, #4F46E5 0%, #3730A3 100%)', borderRadius: 16, padding: 18, color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 11, fontWeight: 700, opacity: 0.9 }}>SCHOOL HEALTH SCORE</span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginTop: 8 }}>
              <span style={{ fontSize: 32, fontWeight: 800 }}>94</span>
              <span style={{ fontSize: 14, opacity: 0.8 }}>/ 100</span>
            </div>
            <span style={{ fontSize: 11, marginTop: 6, opacity: 0.9 }}>Grade A+ Institutional Rating</span>
          </div>

          {/* Budget Health */}
          <div style={{ background: 'linear-gradient(135deg, #059669 0%, #047857 100%)', borderRadius: 16, padding: 18, color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 11, fontWeight: 700, opacity: 0.9 }}>BUDGET HEALTH</span>
            <div style={{ fontSize: 26, fontWeight: 800, marginTop: 8 }}>Optimal</div>
            <span style={{ fontSize: 11, marginTop: 6, opacity: 0.9 }}>92.4% Revenue Collected</span>
          </div>

          {/* Risk Alerts */}
          <div style={{ background: 'linear-gradient(135deg, #D97706 0%, #B45309 100%)', borderRadius: 16, padding: 18, color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 11, fontWeight: 700, opacity: 0.9 }}>RISK ALERTS</span>
            <div style={{ fontSize: 26, fontWeight: 800, marginTop: 8 }}>1 Active</div>
            <span style={{ fontSize: 11, marginTop: 6, opacity: 0.9 }}>Grade 8 Social Studies delay</span>
          </div>

          {/* AI Decision Recommendations */}
          <div style={{ background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)', borderRadius: 16, padding: 18, color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 11, fontWeight: 700, opacity: 0.9 }}>AI RECOMMENDATIONS</span>
            <div style={{ fontSize: 26, fontWeight: 800, marginTop: 8 }}>3 Strategic</div>
            <span style={{ fontSize: 11, marginTop: 6, opacity: 0.9 }}>Ready for Principal action</span>
          </div>
        </div>

        {/* Detailed Insights Sections */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20 }}>

          {/* Left Column: AI Recommendations & Operational Bottlenecks */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            
            {/* AI Recommendations */}
            <div style={cardStyle}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#4F46E5', fontWeight: 800, marginBottom: 14 }}>
                <Sparkles size={18} />
                Strategic AI Recommendations
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <InsightItemBox
                  title="1. Approve Additional STEM Lab Hardware Grant"
                  desc="High demand in Robotics & AI courses (98% capacity). Allocating ₹1.5L from discretionary fund will increase student capacity by 40 seats."
                  actionText="Approve Grant Request →"
                />
                <InsightItemBox
                  title="2. Rebalance IT Administration Workload"
                  desc="Overtime risk flagged for Senior SysAdmin (18 hrs overtime). Recommend transferring routine asset logging to Junior Support Technician."
                  actionText="Send HR Notice →"
                />
                <InsightItemBox
                  title="3. Transition Transport Route 4 to High-Capacity Coach"
                  desc="Route 4 commuter volume reached 98% occupancy. Upgrading vehicle will reduce transit time by 15 mins."
                  actionText="Review Route Telematics →"
                />
              </div>
            </div>

            {/* Monthly Executive Summary */}
            <div style={cardStyle}>
              <h3 style={cardTitleStyle}>Monthly Executive Summary (May 2026)</h3>
              <p style={{ fontSize: 13, color: '#374151', lineHeight: 1.6, marginTop: 10 }}>
                Greenfield International School maintains an outstanding operational health score of <strong>94/100</strong>. Academic performance across all grades remains on target with a <strong>94.8%</strong> pass rate. Financial revenue collection reached <strong>92.4%</strong> of target for Q2. All campus facilities (Library, Transport, Hostel, Security) report 100% compliance with safety and governance standards.
              </p>
            </div>

          </div>

          {/* Right Column: Operational Bottlenecks & Department Matrix */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            
            <div style={cardStyle}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#D97706', fontWeight: 800, marginBottom: 14 }}>
                <AlertTriangle size={18} />
                Operational Bottlenecks
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <BottleneckItem title="Grade 8 Social Studies Syllabi Lag" text="2 weeks behind due to teacher leave transition. Remedial classes scheduled." />
                <BottleneckItem title="Hostel Block B Hot Water Heater Maintenance" text="Vendor service ticket aging: 3 days. Vendor contacted." />
              </div>
            </div>

            <div style={cardStyle}>
              <h3 style={cardTitleStyle}>Department Health Matrix</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 12 }}>
                <DeptMatrixRow dept="Academic" score="96 / 100" status="Excellent" />
                <DeptMatrixRow dept="Finance" score="94 / 100" status="On Track" />
                <DeptMatrixRow dept="Human Resources" score="95 / 100" status="Excellent" />
                <DeptMatrixRow dept="Campus Ops" score="92 / 100" status="Good" />
                <DeptMatrixRow dept="Security" score="99 / 100" status="Outstanding" />
              </div>
            </div>

          </div>

        </div>

      </div>
    </PageLayout>
  );
}

// ─── HELPER COMPONENTS ───────────────────────────────────────────────────────

function ReportDownloadCard({ title, type, size }: { title: string; type: string; size: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', background: '#F9FAFB', border: '1px solid #F3F4F6', borderRadius: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 34, height: 34, borderRadius: 8, background: '#EEF2FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <FileText size={18} color="#4F46E5" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#111827' }}>{title}</span>
          <span style={{ fontSize: 11, color: '#6B7280' }}>{type} • {size}</span>
        </div>
      </div>
      <button style={{ background: '#4F46E5', color: 'white', border: 'none', borderRadius: 8, padding: '6px 12px', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
        Download
      </button>
    </div>
  );
}

function AnalyticsTrendBar({ year, count, percent, color }: { year: string; count: string; percent: number; color: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
        <span style={{ color: '#4B5563', fontWeight: 600 }}>{year}</span>
        <span style={{ color: '#111827', fontWeight: 700 }}>{count}</span>
      </div>
      <div style={{ width: '100%', height: 6, background: '#F3F4F6', borderRadius: 10, overflow: 'hidden' }}>
        <div style={{ width: `${percent}%`, height: '100%', background: color, borderRadius: 10 }} />
      </div>
    </div>
  );
}

function InsightItemBox({ title, desc, actionText }: { title: string; desc: string; actionText: string }) {
  return (
    <div style={{ background: '#F9FAFB', border: '1px solid #F3F4F6', borderRadius: 12, padding: 14, display: 'flex', flexDirection: 'column', gap: 6 }}>
      <span style={{ fontSize: 13, fontWeight: 700, color: '#111827' }}>{title}</span>
      <p style={{ fontSize: 12, color: '#4B5563', margin: 0, lineHeight: 1.5 }}>{desc}</p>
      <button style={{ background: 'none', border: 'none', color: '#4F46E5', fontSize: 12, fontWeight: 700, padding: 0, cursor: 'pointer', textAlign: 'left', marginTop: 4 }}>
        {actionText}
      </button>
    </div>
  );
}

function BottleneckItem({ title, text }: { title: string; text: string }) {
  return (
    <div style={{ background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: 12, padding: 12, display: 'flex', flexDirection: 'column', gap: 4 }}>
      <span style={{ fontSize: 12, fontWeight: 700, color: '#D97706' }}>{title}</span>
      <p style={{ fontSize: 11.5, color: '#4B5563', margin: 0, lineHeight: 1.4 }}>{text}</p>
    </div>
  );
}

function DeptMatrixRow({ dept, score, status }: { dept: string; score: string; status: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '9px 12px', background: '#F9FAFB', border: '1px solid #F3F4F6', borderRadius: 10 }}>
      <span style={{ fontSize: 12.5, fontWeight: 600, color: '#374151' }}>{dept}</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: '#111827' }}>{score}</span>
        <span style={{ fontSize: 11, fontWeight: 600, color: '#059669' }}>{status}</span>
      </div>
    </div>
  );
}

const cardStyle: React.CSSProperties = {
  background: '#FFFFFF',
  border: '1px solid #E5E7EB',
  borderRadius: 18,
  padding: 20,
  boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
};

const cardTitleStyle: React.CSSProperties = {
  fontSize: 15,
  fontWeight: 700,
  color: '#111827',
  margin: 0,
};
