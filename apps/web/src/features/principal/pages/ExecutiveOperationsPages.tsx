import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  DollarSign,
  Building,
  CheckCircle2,
  AlertTriangle,
  Clock,
  FileText,
  Sparkles,
  ChevronRight,
  TrendingUp,
  UserCheck,
  Briefcase
} from 'lucide-react';
import { PageLayout } from '../../../components/erp/PageLayout';
import { PageHeader } from '../../../components/erp/PageHeader';
import { KPICard } from '../../../components/erp/KPICard';

// ─── 1. Executive HR Oversight Page ─────────────────────────────────────────
export function ExecutiveHROversightPage() {
  const navigate = useNavigate();

  return (
    <PageLayout>
      <PageHeader
        title="Human Resources Executive Oversight"
        subtitle="Executive monitoring of workforce health, staffing levels, attrition risks, and pending executive approvals."
        breadcrumb={[
          { label: 'Leadership Workspace', path: '/dashboard' },
          { label: 'Operations', path: '/principal/operations/hr' },
          { label: 'HR', path: '/principal/operations/hr' },
        ]}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 16, fontFamily: "'Inter', sans-serif" }}>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
          <KPICard title="TOTAL WORKFORCE" value="69 Staff" icon={<Users size={20} />} trend={{ value: '+4 this month', isPositive: true }} tone="info" />
          <KPICard title="STAFF ATTENDANCE" value="96.2%" icon={<UserCheck size={20} />} tone="success" />
          <KPICard title="PENDING LEAVE APPROVALS" value="1 Request" icon={<Clock size={20} />} tone="warning" />
          <KPICard title="OPEN HIRING POSITIONS" value="2 Roles" icon={<Briefcase size={20} />} tone="info" />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20 }}>
          
          <div style={cardStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <h3 style={cardTitleStyle}>Department Workforce & Attrition Health</h3>
              <button onClick={() => navigate('/principal/approvals')} style={linkBtnStyle}>Open Approval Center →</button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <DeptHealthRow name="Teaching Faculty (Academic)" total={42} attendance="97%" attritionRisk="Low Risk" statusColor="#059669" />
              <DeptHealthRow name="Administrative & Office Staff" total={18} attendance="94%" attritionRisk="Low Risk" statusColor="#059669" />
              <DeptHealthRow name="Accounts & Finance Team" total={5} attendance="98%" attritionRisk="Stable" statusColor="#059669" />
              <DeptHealthRow name="Transport & Logistics Staff" total={2} attendance="92%" attritionRisk="Medium Risk" statusColor="#D97706" />
              <DeptHealthRow name="Hostel & Facilities Operations" total={2} attendance="90%" attritionRisk="Low Risk" statusColor="#059669" />
            </div>
          </div>

          <div style={cardStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#4F46E5', fontWeight: 800, marginBottom: 14 }}>
              <Sparkles size={18} />
              HR Executive Alerts
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <ExecutiveAlertBox tone="warning" title="Overtime Alert: IT Administrator" text="Vikramaditya Roy logged 18 hours overtime in last 14 days. Workload rebalance recommended." />
              <ExecutiveAlertBox tone="success" title="Annual Performance Review Complete" text="94% of faculty completed Q1 performance reviews. High retention score." />
              <ExecutiveAlertBox tone="info" title="New Mathematics Faculty Onboarded" text="John Doe joined as Senior Mathematics Teacher. Onboarding checklist 100% complete." />
            </div>
          </div>

        </div>

      </div>
    </PageLayout>
  );
}

// ─── 2. Executive Finance Oversight Page ──────────────────────────────────────
export function ExecutiveFinanceOversightPage() {
  const navigate = useNavigate();

  return (
    <PageLayout>
      <PageHeader
        title="Finance & Budget Executive Oversight"
        subtitle="Executive monitoring of fee collections, budget health, operational expenses, and financial audit approvals."
        breadcrumb={[
          { label: 'Leadership Workspace', path: '/dashboard' },
          { label: 'Operations', path: '/principal/operations/hr' },
          { label: 'Finance', path: '/principal/operations/finance' },
        ]}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 16, fontFamily: "'Inter', sans-serif" }}>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
          <KPICard title="FEE COLLECTION (Q2)" value="₹1.84 Cr" icon={<DollarSign size={20} />} trend={{ value: '92.4% Collected', isPositive: true }} tone="success" />
          <KPICard title="OUTSTANDING DUES" value="₹15.2 L" icon={<AlertTriangle size={20} />} tone="warning" />
          <KPICard title="OPERATING EXPENSE (MTD)" value="₹34.8 L" icon={<TrendingUp size={20} />} tone="info" />
          <KPICard title="PENDING EXPENSE APPROVALS" value="2 Items" icon={<Clock size={20} />} tone="warning" />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          
          <div style={cardStyle}>
            <h3 style={cardTitleStyle}>Revenue & Fee Collection Summary</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 14 }}>
              <FinanceBarRow label="Tuition & Academic Fees" collected="₹1.42 Cr" target="₹1.50 Cr" percent={94} color="#10B981" />
              <FinanceBarRow label="Transport Fee Collection" collected="₹24.5 L" target="₹26.0 L" percent={94} color="#3B82F6" />
              <FinanceBarRow label="Hostel & Mess Fee Collection" collected="₹12.0 L" target="₹14.0 L" percent={85} color="#F59E0B" />
              <FinanceBarRow label="Lab & Annual Activity Fees" collected="₹5.5 L" target="₹6.0 L" percent={91} color="#6366F1" />
            </div>
          </div>

          <div style={cardStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <h3 style={cardTitleStyle}>Pending Executive Expense Approvals</h3>
              <button onClick={() => navigate('/principal/approvals')} style={linkBtnStyle}>Review All →</button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <PendingExpenseItem title="Science Lab Equipment & Consumables Order" vendor="Sigma Scientific Ltd" amount="₹2,45,000" date="Today" />
              <PendingExpenseItem title="Campus CCTV Expansion & Turnstile Hardware" vendor="TechGuard Systems" amount="₹1,80,000" date="Yesterday" />
              <PendingExpenseItem title="Annual Sports Day Trophies & Catering Advance" vendor="Apex Events" amount="₹65,000" date="2 days ago" />
            </div>
          </div>

        </div>

      </div>
    </PageLayout>
  );
}

// ─── 3. Executive Reception Oversight Page ────────────────────────────────────
export function ExecutiveReceptionOversightPage() {
  return (
    <PageLayout>
      <PageHeader
        title="Front-Office & Visitor Executive Oversight"
        subtitle="Executive monitoring of admission enquiries, visitor footfall, gatepass requests, and VIP appointments."
        breadcrumb={[
          { label: 'Leadership Workspace', path: '/dashboard' },
          { label: 'Operations', path: '/principal/operations/hr' },
          { label: 'Reception', path: '/principal/operations/reception' },
        ]}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 16, fontFamily: "'Inter', sans-serif" }}>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
          <KPICard title="ADMISSION ENQUIRIES (THIS MONTH)" value="142 Enquiries" icon={<FileText size={20} />} trend={{ value: '+18% vs last month', isPositive: true }} tone="success" />
          <KPICard title="ENQUIRY CONVERSION RATE" value="68.4%" icon={<TrendingUp size={20} />} tone="success" />
          <KPICard title="DAILY VISITOR FOOTFALL" value="28 Visitors" icon={<Users size={20} />} tone="info" />
          <KPICard title="PENDING GATEPASS APPROVALS" value="1 Pass" icon={<Building size={20} />} tone="warning" />
        </div>

        <div style={cardStyle}>
          <h3 style={cardTitleStyle}>Front-Office & Reception KPI Summary</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(180px, 100%), 1fr))', gap: 14, marginTop: 14 }}>
            <ReceptionKpiBox label="Walk-in Parent Enquiries" value="48" subtext="84% positive feedback" />
            <ReceptionKpiBox label="VIP Appointments Scheduled" value="6" subtext="Principal calendar synced" />
            <ReceptionKpiBox label="Certificates Issued" value="32" subtext="Average turnaround: 24 hrs" />
          </div>
        </div>

      </div>
    </PageLayout>
  );
}

// ─── HELPER COMPONENTS ───────────────────────────────────────────────────────

function DeptHealthRow({ name, total, attendance, attritionRisk, statusColor }: { name: string; total: number; attendance: string; attritionRisk: string; statusColor: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: '#F9FAFB', border: '1px solid #F3F4F6', borderRadius: 12 }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: '#111827' }}>{name}</span>
        <span style={{ fontSize: 11, color: '#6B7280' }}>Total Staff: {total} • Attendance: {attendance}</span>
      </div>
      <span style={{ fontSize: 11, fontWeight: 700, color: statusColor, background: '#ECFDF5', padding: '3px 10px', borderRadius: 100 }}>
        {attritionRisk}
      </span>
    </div>
  );
}

function ExecutiveAlertBox({ title, text, tone }: { title: string; text: string; tone: 'warning' | 'success' | 'info' }) {
  const colors = {
    warning: { bg: '#FFFBEB', border: '#FDE68A', title: '#D97706' },
    success: { bg: '#ECFDF5', border: '#A7F3D0', title: '#059669' },
    info: { bg: '#EFF6FF', border: '#BFDBFE', title: '#2563EB' },
  }[tone];

  return (
    <div style={{ background: colors.bg, border: `1px solid ${colors.border}`, borderRadius: 12, padding: 12 }}>
      <span style={{ fontSize: 12, fontWeight: 700, color: colors.title }}>{title}</span>
      <p style={{ fontSize: 11.5, color: '#374151', margin: '4px 0 0 0', lineHeight: 1.4 }}>{text}</p>
    </div>
  );
}

function FinanceBarRow({ label, collected, target, percent, color }: { label: string; collected: string; target: string; percent: number; color: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
        <span style={{ color: '#4B5563', fontWeight: 600 }}>{label}</span>
        <span style={{ color: '#111827', fontWeight: 700 }}>{collected} / {target} ({percent}%)</span>
      </div>
      <div style={{ width: '100%', height: 6, background: '#F3F4F6', borderRadius: 10, overflow: 'hidden' }}>
        <div style={{ width: `${percent}%`, height: '100%', background: color, borderRadius: 10 }} />
      </div>
    </div>
  );
}

function PendingExpenseItem({ title, vendor, amount, date }: { title: string; vendor: string; amount: string; date: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: '#F9FAFB', border: '1px solid #F3F4F6', borderRadius: 12 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <span style={{ fontSize: 12.5, fontWeight: 700, color: '#111827' }}>{title}</span>
        <span style={{ fontSize: 11, color: '#6B7280' }}>Vendor: {vendor} • Submitted {date}</span>
      </div>
      <span style={{ fontSize: 13, fontWeight: 800, color: '#4F46E5' }}>{amount}</span>
    </div>
  );
}

function ReceptionKpiBox({ label, value, subtext }: { label: string; value: string; subtext: string }) {
  return (
    <div style={{ background: '#F9FAFB', border: '1px solid #F3F4F6', borderRadius: 12, padding: 14, display: 'flex', flexDirection: 'column', gap: 4 }}>
      <span style={{ fontSize: 11, color: '#6B7280', fontWeight: 500 }}>{label}</span>
      <span style={{ fontSize: 20, fontWeight: 800, color: '#111827' }}>{value}</span>
      <span style={{ fontSize: 10.5, color: '#059669', fontWeight: 600 }}>{subtext}</span>
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
