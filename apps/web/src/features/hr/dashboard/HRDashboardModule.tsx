import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  UserCheck,
  Briefcase,
  UserPlus,
  Calendar,
  Clock,
  FileText,
  Folder,
  Cake,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  TrendingDown,
  ChevronRight,
  Shield,
  Award,
  GraduationCap,
  Download,
  AlertTriangle,
  Heart,
  Activity,
  Plus,
  Zap,
  Check,
  Search,
  DollarSign
} from 'lucide-react';

export default function HRDashboardModule() {
  const navigate = useNavigate();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 20,
      width: '100%',
      fontFamily: "'Inter', sans-serif",
      color: '#1F2937',
      paddingBottom: 40,
    }}>

      {/* Toast Notification */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          top: 24,
          right: 24,
          background: '#10B981',
          color: 'white',
          padding: '12px 20px',
          borderRadius: 12,
          boxShadow: '0 10px 25px -5px rgba(16, 185, 129, 0.4)',
          fontWeight: 600,
          fontSize: 14,
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}>
          <CheckCircle2 size={18} />
          {toastMessage}
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────────────────
          1. HEADER BANNER
         ───────────────────────────────────────────────────────────────────────────── */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 16,
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <h1 style={{ fontSize: 24, fontWeight: 800, color: '#111827', margin: 0, letterSpacing: '-0.02em' }}>
              HR Command Center
            </h1>
            <span style={{
              background: '#ECFDF5',
              color: '#059669',
              fontSize: 11,
              fontWeight: 600,
              padding: '3px 12px',
              borderRadius: 100,
            }}>
              HR Workspace Active
            </span>
          </div>
          <p style={{ fontSize: 13, color: '#6B7280', margin: 0 }}>
            Manage complete employee lifecycle: recruitment, onboarding, attendance, leave, payroll & performance.
          </p>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button
            onClick={() => navigate('/hr/employees')}
            style={{
              background: '#5850EC',
              color: 'white',
              border: 'none',
              borderRadius: 10,
              padding: '9px 18px',
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              boxShadow: '0 4px 12px rgba(88, 80, 236, 0.3)',
            }}
          >
            <Plus size={16} /> Add Employee
          </button>
          <button
            onClick={() => navigate('/hr/leave')}
            style={{
              background: '#FFFFFF',
              border: '1px solid #E5E7EB',
              color: '#111827',
              borderRadius: 10,
              padding: '9px 16px',
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
            }}
          >
            Leave Approvals (1) <ChevronRight size={16} />
          </button>
        </div>
      </div>



      {/* ─────────────────────────────────────────────────────────────────────────────
          3. 10 KPI METRIC CARDS (2 Rows of 5 Cards)
         ───────────────────────────────────────────────────────────────────────────── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {/* Row 1 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12 }}>
          <KPIMetricCard
            title="Total Employees"
            value="69"
            subtext="from last month"
            trend="↑ 4 this month"
            isPositiveTrend
            icon={<Users size={18} color="#6366F1" />}
            bgColor="#EEF2FF"
          />
          <KPIMetricCard
            title="Teaching Staff"
            value="42"
            subtext="60.9% of total"
            icon={<GraduationCap size={18} color="#2563EB" />}
            bgColor="#EFF6FF"
          />
          <KPIMetricCard
            title="Non-Teaching Staff"
            value="27"
            subtext="39.1% of total"
            icon={<Briefcase size={18} color="#10B981" />}
            bgColor="#ECFDF5"
          />
          <KPIMetricCard
            title="New Hires (Q2)"
            value="6"
            subtext="vs last quarter"
            trend="↑ 20%"
            isPositiveTrend
            icon={<UserPlus size={18} color="#D97706" />}
            bgColor="#FFFBEB"
          />
          <KPIMetricCard
            title="Open Positions"
            value="2"
            subtext="View openings →"
            isLink
            onLinkClick={() => navigate('/hr/openings')}
            icon={<Briefcase size={18} color="#EC4899" />}
            bgColor="#FDF2F8"
          />
        </div>

        {/* Row 2 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12 }}>
          <KPIMetricCard
            title="Employees On Leave"
            value="2"
            subtext="View all on leave →"
            isLink
            onLinkClick={() => navigate('/hr/leave')}
            icon={<Calendar size={18} color="#6366F1" />}
            bgColor="#EEF2FF"
          />
          <KPIMetricCard
            title="Attendance Today"
            value="3 Present"
            subtext="96% present rate"
            icon={<CheckCircle2 size={18} color="#2563EB" />}
            bgColor="#EFF6FF"
          />
          <KPIMetricCard
            title="Pending Leave Requests"
            value="1"
            subtext="Requires approval"
            icon={<FileText size={18} color="#D97706" />}
            bgColor="#FFFBEB"
          />
          <KPIMetricCard
            title="Pending Documents"
            value="3"
            subtext="View pending →"
            isLink
            onLinkClick={() => navigate('/hr/documents')}
            icon={<Folder size={18} color="#EAB308" />}
            bgColor="#FEF9C3"
          />
          <KPIMetricCard
            title="Upcoming Birthdays"
            value="2"
            subtext="Next 7 days"
            icon={<Cake size={18} color="#EC4899" />}
            bgColor="#FDF2F8"
          />
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────────────────
          4. ROW 2: ANALYTICS & EVENTS CARDS (3 Columns)
         ───────────────────────────────────────────────────────────────────────────── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: 16,
        alignItems: 'stretch',
      }}>

        {/* Card 1: Employee Distribution (Doughnut Chart) */}
        <div style={sectionCardStyle}>
          <h3 style={sectionTitleStyle}>Employee Distribution</h3>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, marginTop: 10 }}>
            {/* SVG Doughnut */}
            <div style={{ position: 'relative', width: 130, height: 130, flexShrink: 0 }}>
              <svg width="130" height="130" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="38" fill="none" stroke="#6366F1" strokeWidth="14" strokeDasharray="145 100" strokeDashoffset="0" />
                <circle cx="50" cy="50" r="38" fill="none" stroke="#2563EB" strokeWidth="14" strokeDasharray="93 150" strokeDashoffset="-145" />
                <circle cx="50" cy="50" r="38" fill="none" stroke="#10B981" strokeWidth="14" strokeDasharray="27 200" strokeDashoffset="-238" />
                <circle cx="50" cy="50" r="38" fill="none" stroke="#F59E0B" strokeWidth="14" strokeDasharray="10 230" strokeDashoffset="-265" />
              </svg>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <span style={{ fontSize: 20, fontWeight: 800, color: '#111827', lineHeight: 1 }}>69</span>
                <span style={{ fontSize: 10, color: '#6B7280', fontWeight: 500 }}>Total</span>
              </div>
            </div>

            {/* Doughnut Legend */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
              <LegendRow color="#6366F1" label="Teaching Staff" count="42" percent="60.9%" />
              <LegendRow color="#2563EB" label="Non-Teaching Staff" count="27" percent="39.1%" />
              <LegendRow color="#10B981" label="Contract Staff" count="8" percent="11.6%" />
              <LegendRow color="#F59E0B" label="Interns" count="2" percent="2.9%" />
            </div>
          </div>
        </div>

        {/* Card 2: Department Wise Distribution */}
        <div style={sectionCardStyle}>
          <h3 style={sectionTitleStyle}>Department Wise Distribution</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 10 }}>
            <DeptProgressRow label="Administration" count={18} percent="26.1%" color="#818CF8" />
            <DeptProgressRow label="Teaching" count={42} percent="60.9%" color="#2563EB" />
            <DeptProgressRow label="Accounts" count={5} percent="7.2%" color="#10B981" />
            <DeptProgressRow label="Transport" count={2} percent="2.9%" color="#F97316" />
            <DeptProgressRow label="Hostel" count={2} percent="2.9%" color="#EC4899" />
          </div>
        </div>

        {/* Card 3: Upcoming Events */}
        <div style={sectionCardStyle}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <h3 style={{ ...sectionTitleStyle, margin: 0 }}>Upcoming Events</h3>
            <button onClick={() => showToast('Calendar view opened')} style={linkBtnStyle}>View Calendar →</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <EventRow month="MAY" day="26" color="#EEF2FF" textColor="#4F46E5" title="Monthly HR Review Meeting" subtitle="Tomorrow • 11:00 AM" />
            <EventRow month="MAY" day="31" color="#EFF6FF" textColor="#2563EB" title="Payroll Processing" subtitle="In 5 days • 09:00 AM" />
            <EventRow month="JUN" day="05" color="#EEF2FF" textColor="#6366F1" title="Employee Training Program" subtitle="In 10 days • 10:00 AM" />
            <EventRow month="JUN" day="15" color="#FDF2F8" textColor="#EC4899" title="Performance Appraisal Cycle" subtitle="In 20 days • 09:30 AM" />
          </div>
        </div>

      </div>

      {/* ─────────────────────────────────────────────────────────────────────────────
          5. ROW 3: HR MANAGER QUICK DESK ACTIONS
         ───────────────────────────────────────────────────────────────────────────── */}
      <div style={sectionCardStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
          <Zap size={18} color="#EC4899" fill="#EC4899" />
          <h3 style={{ ...sectionTitleStyle, margin: 0 }}>HR Manager Quick Desk Actions</h3>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: 10,
        }}>
          <QuickActionPill icon={<Users size={15} color="#6366F1" />} title="Add Employee" sub="to Directory" onClick={() => navigate('/hr/employees')} />
          <QuickActionPill icon={<Briefcase size={15} color="#2563EB" />} title="Create Job" sub="Opening" onClick={() => navigate('/hr/openings')} />
          <QuickActionPill icon={<CheckCircle2 size={15} color="#10B981" />} title="Approve Leave" sub="Request" onClick={() => navigate('/hr/leave')} />
          <QuickActionPill icon={<Search size={15} color="#3B82F6" />} title="Start Recruitment" sub="Process" onClick={() => navigate('/hr/openings')} />
          <QuickActionPill icon={<GraduationCap size={15} color="#F59E0B" />} title="Assign Training" sub="Workshop" onClick={() => navigate('/hr/training')} />
          <QuickActionPill icon={<FileText size={15} color="#2563EB" />} title="Upload Document" sub="Bulk Upload" onClick={() => navigate('/hr/documents')} />
          <QuickActionPill icon={<Users size={15} color="#8B5CF6" />} title="Generate ID Card" sub="Employee ID" onClick={() => navigate('/hr/employees')} />
          <QuickActionPill icon={<Download size={15} color="#0284C7" />} title="Export HR Report" sub="Summary" onClick={() => navigate('/hr/reports')} />
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────────────────
          6. ROW 4: AI HR INSIGHTS & RECENT ACTIVITIES (2 Cards Grid)
         ───────────────────────────────────────────────────────────────────────────── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: 16,
        alignItems: 'stretch',
      }}>

        {/* AI HR Insights Card */}
        <div style={{ ...sectionCardStyle, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Sparkles size={18} color="#2563EB" />
                <h3 style={{ ...sectionTitleStyle, margin: 0 }}>AI HR Insights</h3>
              </div>
              <span style={{
                background: '#EFF6FF',
                color: '#2563EB',
                fontSize: 11,
                fontWeight: 600,
                padding: '3px 10px',
                borderRadius: 100,
              }}>
                Live Intelligence
              </span>
            </div>

            {/* 3 Alert Box Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(240px, 100%), 1fr))', gap: 10, marginBottom: 16 }}>
              <InsightAlertBox
                type="warning"
                title="High Overtime Risk"
                text="3 employees logged more than 12 hours overtime this week."
                linkText="View Details →"
                onClick={() => navigate('/hr/attendance')}
              />
              <InsightAlertBox
                type="success"
                title="Performance Spotlight"
                text="12 employees with excellent performance this month."
                linkText="View Top Performers →"
                onClick={() => navigate('/hr/performance')}
              />
              <InsightAlertBox
                type="purple"
                title="Skill Gap Alert"
                text="Digital Marketing skills gap identified in 6 departments."
                linkText="View Skill Analysis →"
                onClick={() => navigate('/hr/training')}
              />
            </div>
          </div>

          {/* Bottom 2 Score Box Metrics */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {/* Health Score */}
            <div style={{
              background: '#F9FAFB',
              border: '1px solid #F3F4F6',
              borderRadius: 12,
              padding: '12px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#EEF2FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Heart size={16} color="#6366F1" />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#111827' }}>Workforce Health Score</span>
                  <span style={{ fontSize: 10, color: '#6B7280' }}>Overall workforce engagement score.</span>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 2 }}>
                <span style={{ fontSize: 20, fontWeight: 800, color: '#111827' }}>87</span>
                <span style={{ fontSize: 12, color: '#6B7280', fontWeight: 600 }}>/100</span>
              </div>
            </div>

            {/* Retention Risk */}
            <div style={{
              background: '#F9FAFB',
              border: '1px solid #F3F4F6',
              borderRadius: 12,
              padding: '12px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#FDF2F8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Users size={16} color="#EC4899" />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#111827' }}>Retention Risk</span>
                  <span style={{ fontSize: 10, color: '#6B7280' }}>3 employees at risk of leaving soon.</span>
                </div>
              </div>
              <span style={{
                background: '#ECFDF5',
                color: '#059669',
                fontSize: 11,
                fontWeight: 600,
                padding: '3px 10px',
                borderRadius: 100,
              }}>
                Low Risk
              </span>
            </div>
          </div>
        </div>

        {/* Recent Activities Card */}
        <div style={sectionCardStyle}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <h3 style={{ ...sectionTitleStyle, margin: 0 }}>Recent Activities</h3>
            <button onClick={() => showToast('Activities log opened')} style={linkBtnStyle}>View All →</button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <ActivityItem icon={<Users size={14} color="#10B981" />} bgColor="#ECFDF5" text="New employee John Doe joined as Mathematics Teacher" time="2 hours ago" />
            <ActivityItem icon={<CheckCircle2 size={14} color="#F59E0B" />} bgColor="#FFFBEB" text="Leave request approved for Priya Sharma" time="3 hours ago" />
            <ActivityItem icon={<Activity size={14} color="#2563EB" />} bgColor="#EFF6FF" text="Monthly attendance report generated" time="5 hours ago" />
            <ActivityItem icon={<Award size={14} color="#8B5CF6" />} bgColor="#EEF2FF" text="Performance review completed for 12 employees" time="1 day ago" />
            <ActivityItem icon={<Calendar size={14} color="#EC4899" />} bgColor="#FDF2F8" text="Training program scheduled for next week" time="1 day ago" />
          </div>
        </div>

      </div>

      {/* ─────────────────────────────────────────────────────────────────────────────
          7. ROW 5: BOTTOM SUMMARY METRIC BAR (5 Columns)
         ───────────────────────────────────────────────────────────────────────────── */}
      <div style={sectionCardStyle}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: 16,
        }}>
          <BottomMetricColumn label="Avg. Attendance (This Month)" value="96%" trend="↑ 2% vs last month" isGreenTrend />
          <BottomMetricColumn label="Avg. Leave Rate (This Month)" value="4%" trend="↓ 1% vs last month" isGreenTrend />
          <BottomMetricColumn label="Active Recruitments" value="5" sublink="View all recruitments →" onLinkClick={() => navigate('/hr/openings')} />
          <BottomMetricColumn label="Training Completion Rate" value="94%" trend="↑ 5% vs last month" isGreenTrend />
          <BottomMetricColumn label="Payroll Processing" value="On Track" statusText="Next payroll: 31 May 2024" isGreenValue />
        </div>
      </div>

    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HELPER COMPONENTS & STYLES
// ─────────────────────────────────────────────────────────────────────────────



function KPIMetricCard({
  title,
  value,
  subtext,
  trend,
  isPositiveTrend,
  isLink,
  onLinkClick,
  icon,
  bgColor
}: {
  title: string;
  value: string;
  subtext: string;
  trend?: string;
  isPositiveTrend?: boolean;
  isLink?: boolean;
  onLinkClick?: () => void;
  icon: React.ReactNode;
  bgColor: string;
}) {
  return (
    <div style={{
      background: '#FFFFFF',
      border: '1px solid #E5E7EB',
      borderRadius: 14,
      padding: '14px 16px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      gap: 10,
      boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 11, fontWeight: 500, color: '#6B7280' }}>{title}</span>
        <div style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: bgColor,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          {icon}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <span style={{ fontSize: 22, fontWeight: 800, color: '#111827', lineHeight: 1.1 }}>{value}</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11 }}>
          {trend && (
            <span style={{ color: isPositiveTrend ? '#059669' : '#DC2626', fontWeight: 600 }}>
              {trend}
            </span>
          )}
          {isLink ? (
            <button onClick={onLinkClick} style={{ background: 'none', border: 'none', color: '#2563EB', fontWeight: 600, padding: 0, cursor: 'pointer', fontSize: 11 }}>
              {subtext}
            </button>
          ) : (
            <span style={{ color: '#9CA3AF' }}>{subtext}</span>
          )}
        </div>
      </div>
    </div>
  );
}

function LegendRow({ color, label, count, percent }: { color: string; label: string; count: string; percent: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 11 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: color }} />
        <span style={{ color: '#4B5563', fontWeight: 500 }}>{label}</span>
      </div>
      <span style={{ color: '#111827', fontWeight: 700 }}>{count} ({percent})</span>
    </div>
  );
}

function DeptProgressRow({ label, count, percent, color }: { label: string; count: number; percent: string; color: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 11.5 }}>
        <span style={{ color: '#4B5563', fontWeight: 500 }}>{label}</span>
        <span style={{ color: '#111827', fontWeight: 700 }}>{count} ({percent})</span>
      </div>
      <div style={{ width: '100%', height: 5, background: '#F3F4F6', borderRadius: 10, overflow: 'hidden' }}>
        <div style={{ width: percent, height: '100%', background: color, borderRadius: 10 }} />
      </div>
    </div>
  );
}

function EventRow({ month, day, color, textColor, title, subtitle }: { month: string; day: string; color: string; textColor: string; title: string; subtitle: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '6px 0' }}>
      <div style={{
        width: 40,
        height: 40,
        borderRadius: 10,
        background: color,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}>
        <span style={{ fontSize: 9, fontWeight: 800, color: textColor, textTransform: 'uppercase', lineHeight: 1 }}>{month}</span>
        <span style={{ fontSize: 14, fontWeight: 800, color: textColor, lineHeight: 1 }}>{day}</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: '#111827', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{title}</span>
        <span style={{ fontSize: 10.5, color: '#6B7280' }}>{subtitle}</span>
      </div>
    </div>
  );
}

function QuickActionPill({ icon, title, sub, onClick }: { icon: React.ReactNode; title: string; sub: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '10px 12px',
        background: '#FAF8FF',
        border: '1px solid #ECEEFE',
        borderRadius: 12,
        cursor: 'pointer',
        textAlign: 'left',
        transition: 'all 0.15s ease',
      }}
    >
      <div style={{
        width: 28,
        height: 28,
        borderRadius: 8,
        background: '#FFFFFF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
      }}>
        {icon}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: '#111827', lineHeight: 1.2 }}>{title}</span>
        <span style={{ fontSize: 10, color: '#6B7280', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{sub}</span>
      </div>
    </button>
  );
}

function InsightAlertBox({ type, title, text, linkText, onClick }: { type: 'warning' | 'success' | 'purple'; title: string; text: string; linkText: string; onClick: () => void }) {
  const styles = {
    warning: { bg: '#FFFBEB', border: '#FDE68A', title: '#D97706', link: '#D97706' },
    success: { bg: '#ECFDF5', border: '#A7F3D0', title: '#059669', link: '#059669' },
    purple: { bg: '#F5F3FF', border: '#DDD6FE', title: '#6366F1', link: '#6366F1' },
  }[type];

  return (
    <div style={{
      background: styles.bg,
      border: `1px solid ${styles.border}`,
      borderRadius: 12,
      padding: 12,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      gap: 8,
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: styles.title }}>{title}</span>
        <p style={{ fontSize: 11, color: '#4B5563', margin: 0, lineHeight: 1.4 }}>{text}</p>
      </div>
      <button onClick={onClick} style={{ background: 'none', border: 'none', color: styles.link, fontSize: 11, fontWeight: 700, padding: 0, cursor: 'pointer', textAlign: 'left' }}>
        {linkText}
      </button>
    </div>
  );
}

function ActivityItem({ icon, bgColor, text, time }: { icon: React.ReactNode; bgColor: string; text: string; time: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
        <div style={{
          width: 26,
          height: 26,
          borderRadius: '50%',
          background: bgColor,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          {icon}
        </div>
        <span style={{ fontSize: 11.5, fontWeight: 500, color: '#374151', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{text}</span>
      </div>
      <span style={{ fontSize: 10.5, color: '#9CA3AF', flexShrink: 0 }}>{time}</span>
    </div>
  );
}

function BottomMetricColumn({ label, value, trend, sublink, isGreenTrend, isGreenValue, statusText, onLinkClick }: {
  label: string;
  value: string;
  trend?: string;
  sublink?: string;
  isGreenTrend?: boolean;
  isGreenValue?: boolean;
  statusText?: string;
  onLinkClick?: () => void;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <span style={{ fontSize: 11, color: '#6B7280', fontWeight: 500 }}>{label}</span>
      <span style={{ fontSize: 20, fontWeight: 800, color: isGreenValue ? '#059669' : '#111827', lineHeight: 1.1 }}>{value}</span>
      {trend && (
        <span style={{ fontSize: 11, color: isGreenTrend ? '#059669' : '#DC2626', fontWeight: 600 }}>{trend}</span>
      )}
      {sublink && (
        <button onClick={onLinkClick} style={{ background: 'none', border: 'none', color: '#2563EB', fontSize: 11, fontWeight: 600, padding: 0, cursor: 'pointer', textAlign: 'left' }}>
          {sublink}
        </button>
      )}
      {statusText && (
        <span style={{ fontSize: 10.5, color: '#9CA3AF' }}>{statusText}</span>
      )}
    </div>
  );
}

// Reusable Styles
const sectionCardStyle: React.CSSProperties = {
  background: '#FFFFFF',
  border: '1px solid #E5E7EB',
  borderRadius: 18,
  padding: 20,
  boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
};

const sectionTitleStyle: React.CSSProperties = {
  fontSize: 15,
  fontWeight: 700,
  color: '#111827',
  margin: 0,
};

const linkBtnStyle: React.CSSProperties = {
  background: 'none',
  border: 'none',
  color: '#2563EB',
  fontSize: 12,
  fontWeight: 600,
  cursor: 'pointer',
  padding: 0,
};
