import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  GraduationCap,
  Calendar,
  Award,
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  FileText,
  Clock,
  Sparkles,
  Users,
  ChevronRight
} from 'lucide-react';
import { PageLayout } from '../../../components/erp/PageLayout';
import { PageHeader } from '../../../components/erp/PageHeader';
import { KPICard } from '../../../components/erp/KPICard';

// ─── 1. Academic Overview Page ────────────────────────────────────────────────
export function ExecutiveAcademicOverviewPage() {
  const navigate = useNavigate();

  return (
    <PageLayout>
      <PageHeader
        title="Academic Overview & Strategic Oversight"
        subtitle="Executive-level summary of academic performance, curriculum completion, and institutional benchmarks."
        breadcrumb={[
          { label: 'Leadership Workspace', path: '/dashboard' },
          { label: 'Academic Oversight', path: '/principal/academic-overview' },
          { label: 'Academic Overview', path: '/principal/academic-overview' },
        ]}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 16, fontFamily: "'Inter', sans-serif" }}>

        {/* Executive Academic KPIs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
          <KPICard title="ACADEMIC PASS RATE" value="94.8%" icon={<Award size={20} />} trend={{ value: '+2.1% YoY', isPositive: true }} tone="success" progress={94.8} />
          <KPICard title="CURRICULUM COMPLETION" value="88.5%" icon={<BookOpen size={20} />} trend={{ value: 'On Schedule', isPositive: true }} tone="info" progress={88.5} />
          <KPICard title="TEACHER : STUDENT RATIO" value="1 : 18" icon={<Users size={20} />} trend={{ value: 'Optimal Target', isPositive: true }} tone="purple" />
          <KPICard title="EXAM READINESS SCORE" value="92 / 100" icon={<GraduationCap size={20} />} trend={{ value: 'Target Exceeded', isPositive: true }} tone="success" progress={92} />
        </div>

        {/* Main 2-Column Overview */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20 }}>
          
          {/* Department Performance Matrix */}
          <div style={cardStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h3 style={cardTitleStyle}>Department Academic Performance Matrix</h3>
              <button onClick={() => navigate('/principal/examination-overview')} style={linkBtnStyle}>View Exam Analytics →</button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <AcademicDeptRow name="Mathematics & Statistics" passRate={96.2} completion={92} status="Excellent" statusTone="success" />
              <AcademicDeptRow name="Sciences (Physics, Chemistry, Bio)" passRate={94.5} completion={90} status="On Track" statusTone="success" />
              <AcademicDeptRow name="English & Humanities" passRate={95.8} completion={95} status="Excellent" statusTone="success" />
              <AcademicDeptRow name="Computer Science & AI" passRate={98.1} completion={96} status="Outstanding" statusTone="success" />
              <AcademicDeptRow name="Social Studies & History" passRate={89.4} completion={82} status="Attention Needed" statusTone="warning" />
            </div>
          </div>

          {/* Strategic Academic Recommendations */}
          <div style={{ ...cardStyle, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#4F46E5', fontWeight: 800, marginBottom: 14 }}>
                <Sparkles size={18} />
                Executive Academic Insights
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <AcademicInsightBox
                  tone="success"
                  title="Mathematics Mastery (+4.2%)"
                  text="Grade 10 & 12 mock test scores show strong improvement following revised remedial sessions."
                />
                <AcademicInsightBox
                  tone="warning"
                  title="Social Studies Curriculum Delay"
                  text="Grade 8 Social Studies is 2 weeks behind term schedule due to staff leave transitions."
                />
                <AcademicInsightBox
                  tone="info"
                  title="CBSE Board Inspection Readiness"
                  text="All academic syllabi, lab logs, and internal assessment portfolios ready for upcoming audit."
                />
              </div>
            </div>

            <button
              onClick={() => navigate('/principal/intelligence/insights')}
              style={{
                marginTop: 16,
                padding: '10px 16px',
                background: '#4F46E5',
                color: 'white',
                border: 'none',
                borderRadius: 10,
                fontWeight: 600,
                fontSize: 13,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
              }}
            >
              Open Full Intelligence Insights <ChevronRight size={16} />
            </button>
          </div>

        </div>

      </div>
    </PageLayout>
  );
}

// ─── 2. Executive School Calendar Page ───────────────────────────────────────
export function ExecutiveCalendarPage() {
  return (
    <PageLayout>
      <PageHeader
        title="Institutional Calendar & Milestone Oversight"
        subtitle="Executive view of academic terms, board exams, accreditation visits, and major school events."
        breadcrumb={[
          { label: 'Leadership Workspace', path: '/dashboard' },
          { label: 'Academic Oversight', path: '/principal/academic-overview' },
          { label: 'School Calendar', path: '/principal/calendar' },
        ]}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 16, fontFamily: "'Inter', sans-serif" }}>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
          <KPICard title="CURRENT TERM" value="Term 2 (Trimester)" icon={<Calendar size={20} />} trend={{ value: 'Active Academic Session', isPositive: true }} tone="primary" />
          <KPICard title="UPCOMING MILESTONES" value="4 Events (This Month)" icon={<Clock size={20} />} trend={{ value: 'Next: Exam Sign-Off' }} tone="warning" />
          <KPICard title="CBSE BOARD INSPECTION" value="14 Oct 2026" icon={<CheckCircle2 size={20} />} trend={{ value: 'Audit Confirmed', isPositive: true }} tone="purple" />
          <KPICard title="INSPECTION READINESS" value="98%" icon={<Award size={20} />} trend={{ value: '+3.2% vs last audit', isPositive: true }} tone="success" progress={98} />
        </div>

        {/* Milestone Schedule List */}
        <div style={cardStyle}>
          <h3 style={cardTitleStyle}>Key Institutional Milestones & Executive Schedule</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 14 }}>
            <CalendarMilestoneItem date="MAY 28, 2026" title="Term 1 Final Examination Sign-Off" category="Academic Governance" badgeColor="#EEF2FF" badgeText="#4F46E5" />
            <CalendarMilestoneItem date="JUN 05, 2026" title="CBSE Regional Academic Committee Inspection" category="Compliance & Audit" badgeColor="#ECFDF5" badgeText="#059669" />
            <CalendarMilestoneItem date="JUN 15, 2026" title="Annual Staff Appraisal & Career Advancement Review" category="HR Oversight" badgeColor="#FFFBEB" badgeText="#D97706" />
            <CalendarMilestoneItem date="JUL 01, 2026" title="Mid-Year Financial & Operating Budget Review" category="Finance Governance" badgeColor="#EFF6FF" badgeText="#2563EB" />
          </div>
        </div>

      </div>
    </PageLayout>
  );
}

// ─── 3. Executive Examination Overview Page ──────────────────────────────────
export function ExecutiveExamOverviewPage() {
  return (
    <PageLayout>
      <PageHeader
        title="Examination & Assessment Overview"
        subtitle="Strategic analysis of examination results, grade distributions, subject performance, and board readiness."
        breadcrumb={[
          { label: 'Leadership Workspace', path: '/dashboard' },
          { label: 'Academic Oversight', path: '/principal/academic-overview' },
          { label: 'Examination Overview', path: '/principal/examination-overview' },
        ]}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 16, fontFamily: "'Inter', sans-serif" }}>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
          <KPICard title="OVERALL PASS %" value="95.4%" icon={<Award size={20} />} trend={{ value: '+1.8% vs last term', isPositive: true }} tone="success" progress={95.4} />
          <KPICard title="DISTINCTION / A+ RATE" value="42.1%" icon={<TrendingUp size={20} />} trend={{ value: '+4.2% YoY', isPositive: true }} tone="purple" progress={42.1} />
          <KPICard title="SUBJECTS REQUIRING REVIEW" value="2 Subjects" icon={<AlertTriangle size={20} />} trend={{ value: 'Remedial Active', isPositive: false }} tone="warning" />
          <KPICard title="RESULT APPROVAL STATUS" value="Pending Final Sign-off" icon={<FileText size={20} />} trend={{ value: 'Stage 3 of 4' }} tone="info" />
        </div>

        {/* Grade Distribution & Class Performance */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          
          <div style={cardStyle}>
            <h3 style={cardTitleStyle}>Institutional Grade Distribution (Term 1)</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 14 }}>
              <GradeBarRow grade="A+ (90% - 100%)" count={284} percent={42} color="#10B981" />
              <GradeBarRow grade="A  (80% - 89%)" count={210} percent={31} color="#3B82F6" />
              <GradeBarRow grade="B  (70% - 79%)" count={122} percent={18} color="#6366F1" />
              <GradeBarRow grade="C  (60% - 69%)" count={41} percent={6} color="#F59E0B" />
              <GradeBarRow grade="Below 60% (Remedial)" count={20} percent={3} color="#EF4444" />
            </div>
          </div>

          <div style={cardStyle}>
            <h3 style={cardTitleStyle}>Class Performance Summary</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 14 }}>
              <ClassPerfRow className="Grade 12 Science" average="89.2%" passRate="100%" status="Outstanding" />
              <ClassPerfRow className="Grade 12 Commerce" average="86.5%" passRate="98%" status="Excellent" />
              <ClassPerfRow className="Grade 10 General" average="84.1%" passRate="95%" status="On Track" />
              <ClassPerfRow className="Grade 9 Section B" average="72.4%" passRate="88%" status="Review Required" />
            </div>
          </div>

        </div>

      </div>
    </PageLayout>
  );
}

// ─── HELPER COMPONENTS ───────────────────────────────────────────────────────

function AcademicDeptRow({ name, passRate, completion, status, statusTone }: { name: string; passRate: number; completion: number; status: string; statusTone: 'success' | 'warning' }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: '#F9FAFB', border: '1px solid #F3F4F6', borderRadius: 12 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: '#111827' }}>{name}</span>
        <span style={{ fontSize: 11, color: '#6B7280' }}>Pass Rate: {passRate}% • Syllabi Completed: {completion}%</span>
      </div>
      <span style={{ background: statusTone === 'success' ? '#ECFDF5' : '#FFFBEB', color: statusTone === 'success' ? '#059669' : '#D97706', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 100 }}>
        {status}
      </span>
    </div>
  );
}

function AcademicInsightBox({ title, text, tone }: { title: string; text: string; tone: 'success' | 'warning' | 'info' }) {
  const colors = {
    success: { bg: '#ECFDF5', border: '#A7F3D0', title: '#059669' },
    warning: { bg: '#FFFBEB', border: '#FDE68A', title: '#D97706' },
    info: { bg: '#EFF6FF', border: '#BFDBFE', title: '#2563EB' },
  }[tone];

  return (
    <div style={{ background: colors.bg, border: `1px solid ${colors.border}`, borderRadius: 12, padding: 12 }}>
      <span style={{ fontSize: 12, fontWeight: 700, color: colors.title }}>{title}</span>
      <p style={{ fontSize: 11.5, color: '#374151', margin: '4px 0 0 0', lineHeight: 1.4 }}>{text}</p>
    </div>
  );
}

function CalendarMilestoneItem({ date, title, category, badgeColor, badgeText }: { date: string; title: string; category: string; badgeColor: string; badgeText: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: '#F9FAFB', border: '1px solid #F3F4F6', borderRadius: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{ background: badgeColor, color: badgeText, padding: '6px 12px', borderRadius: 8, fontSize: 11, fontWeight: 800 }}>
          {date}
        </div>
        <span style={{ fontSize: 13, fontWeight: 700, color: '#111827' }}>{title}</span>
      </div>
      <span style={{ fontSize: 11, fontWeight: 600, color: '#6B7280' }}>{category}</span>
    </div>
  );
}

function GradeBarRow({ grade, count, percent, color }: { grade: string; count: number; percent: number; color: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
        <span style={{ color: '#4B5563', fontWeight: 600 }}>{grade}</span>
        <span style={{ color: '#111827', fontWeight: 700 }}>{count} Students ({percent}%)</span>
      </div>
      <div style={{ width: '100%', height: 6, background: '#F3F4F6', borderRadius: 10, overflow: 'hidden' }}>
        <div style={{ width: `${percent}%`, height: '100%', background: color, borderRadius: 10 }} />
      </div>
    </div>
  );
}

function ClassPerfRow({ className, average, passRate, status }: { className: string; average: string; passRate: string; status: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: '#F9FAFB', border: '1px solid #F3F4F6', borderRadius: 12 }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: '#111827' }}>{className}</span>
        <span style={{ fontSize: 11, color: '#6B7280' }}>Average Score: {average}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: '#059669' }}>{passRate} Pass</span>
        <span style={{ fontSize: 11, fontWeight: 600, color: '#6B7280' }}>{status}</span>
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

const linkBtnStyle: React.CSSProperties = {
  background: 'none',
  border: 'none',
  color: '#4F46E5',
  fontSize: 12,
  fontWeight: 600,
  cursor: 'pointer',
  padding: 0,
};
