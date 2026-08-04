import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Edit,
  Building,
  Calendar,
  FileText,
  ClipboardList,
  Bell,
  Shield,
  GraduationCap,
  Users,
  Mail,
  Clock,
  Phone,
  MapPin,
  Check,
  CheckCircle,
  X,
  Save,
  Lock,
  Sliders,
  Award
} from 'lucide-react';

type SettingsTab = 'branch' | 'academic' | 'exam' | 'attendance' | 'notifications' | 'security';

interface BranchData {
  schoolName: string;
  branchName: string;
  boardAffiliation: string;
  schoolTimings: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  established: string;
  status: string;
}

export default function PrincipalSettingsPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<SettingsTab>('branch');

  // Branch data state
  const [branchData, setBranchData] = useState<BranchData>({
    schoolName: 'Greenfield International School',
    branchName: 'Koramangala Branch',
    boardAffiliation: 'CBSE',
    schoolTimings: '8:00 AM – 3:30 PM',
    contactEmail: 'koramangala@greenfield.edu.in',
    contactPhone: '+91 80 4567 8901',
    address: '123 Education Lane, Koramangala, Bangalore – 560034, Karnataka, India',
    established: '2018',
    status: 'Active',
  });

  // Modal & Toast States
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState<BranchData>(branchData);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSaveBranch = (e: React.FormEvent) => {
    e.preventDefault();
    setBranchData(editForm);
    setIsEditModalOpen(false);
    showToast('Branch settings updated successfully!');
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 20,
      padding: '12px 0 40px',
      fontFamily: "'Inter', sans-serif",
      color: '#1F2937',
      maxWidth: 1400,
      margin: '0 auto',
      width: '100%',
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
          <CheckCircle size={18} />
          {toastMessage}
        </div>
      )}

      {/* Back Button */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <button
          onClick={() => navigate('/dashboard')}
          style={{
            background: 'none',
            border: 'none',
            color: '#4F46E5',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: 13,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: 0,
          }}
        >
          <ArrowLeft size={16} /> Back to Dashboard
        </button>
      </div>

      {/* ─────────────────────────────────────────────────────────────────────────────
          HERO BANNER HEADER (Matching exact screenshot illustration & header)
         ───────────────────────────────────────────────────────────────────────────── */}
      <div style={{
        background: 'linear-gradient(135deg, #FAF8FF 0%, #F3E8FF 50%, #EEF2FF 100%)',
        border: '1px solid #ECEEFE',
        borderRadius: 20,
        padding: '24px 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 20,
        boxShadow: '0 4px 20px rgba(99, 102, 241, 0.04)',
      }}>
        {/* Left Side: Title & Description */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, maxWidth: 500 }}>
          <h1 style={{
            fontSize: 26,
            fontWeight: 800,
            color: '#111827',
            margin: 0,
            letterSpacing: '-0.02em',
          }}>
            Branch Settings
          </h1>
          <p style={{
            fontSize: 13,
            color: '#6B7280',
            margin: 0,
            fontWeight: 400,
            lineHeight: 1.5,
          }}>
            Manage and configure your branch details, timings, and contact information.
          </p>
        </div>

        {/* Center/Right: Vector School Building Illustration Sticker */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <div style={{
            position: 'relative',
            width: 180,
            height: 90,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            {/* Stylized School Illustration SVG */}
            <svg width="180" height="90" viewBox="0 0 200 100" fill="none">
              {/* Ground line */}
              <path d="M10 90H190" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />
              {/* Side Trees */}
              <circle cx="25" cy="72" r="10" fill="#86EFAC" />
              <rect x="23" y="78" width="4" height="12" fill="#15803D" />
              <circle cx="175" cy="72" r="10" fill="#86EFAC" />
              <rect x="173" y="78" width="4" height="12" fill="#15803D" />
              {/* Building Base */}
              <rect x="45" y="40" width="110" height="50" rx="4" fill="#C7D2FE" />
              <rect x="75" y="25" width="50" height="65" rx="4" fill="#A5B4FC" />
              {/* Roof Tower */}
              <path d="M100 8L115 25H85L100 8Z" fill="#818CF8" />
              <rect x="99" y="3" width="2" height="7" fill="#6366F1" />
              <path d="M101 3L110 6L101 9V3Z" fill="#818CF8" />
              {/* Clock */}
              <circle cx="100" cy="38" r="6" fill="white" />
              <circle cx="100" cy="38" r="1" fill="#475569" />
              <path d="M100 38V34M100 38H103" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" />
              {/* Door */}
              <rect x="92" y="68" width="16" height="22" rx="2" fill="#4338CA" />
              {/* Windows Grid */}
              <rect x="53" y="48" width="10" height="12" rx="2" fill="white" />
              <rect x="67" y="48" width="10" height="12" rx="2" fill="white" />
              <rect x="123" y="48" width="10" height="12" rx="2" fill="white" />
              <rect x="137" y="48" width="10" height="12" rx="2" fill="white" />
              <rect x="53" y="66" width="10" height="12" rx="2" fill="white" />
              <rect x="67" y="66" width="10" height="12" rx="2" fill="white" />
              <rect x="123" y="66" width="10" height="12" rx="2" fill="white" />
              <rect x="137" y="66" width="10" height="12" rx="2" fill="white" />
              <rect x="83" y="50" width="10" height="12" rx="2" fill="white" />
              <rect x="107" y="50" width="10" height="12" rx="2" fill="white" />
            </svg>
          </div>

          {/* Edit Branch Button */}
          <button
            onClick={() => {
              setEditForm(branchData);
              setIsEditModalOpen(true);
            }}
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
              transition: 'all 0.2s ease',
            }}
          >
            <Edit size={15} /> Edit Branch Details
          </button>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────────────────
          TOP HORIZONTAL TABS BAR (Matching screenshot exactly)
         ───────────────────────────────────────────────────────────────────────────── */}
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        background: 'var(--bg-surface-raised, #F1F5F9)',
        border: '1px solid var(--border-subtle, rgba(226, 232, 240, 0.8))',
        borderRadius: '9999px',
        padding: '4px 6px',
        maxWidth: '100%',
        overflowX: 'auto',
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 4,
          overflowX: 'auto',
          scrollbarWidth: 'none',
        }}>
          <TabButton
            active={activeTab === 'branch'}
            onClick={() => setActiveTab('branch')}
            icon={<Building size={16} />}
            label="Branch Settings"
          />
          <TabButton
            active={activeTab === 'academic'}
            onClick={() => setActiveTab('academic')}
            icon={<Calendar size={16} />}
            label="Academic Year"
          />
          <TabButton
            active={activeTab === 'exam'}
            onClick={() => setActiveTab('exam')}
            icon={<FileText size={16} />}
            label="Exam Config"
          />
          <TabButton
            active={activeTab === 'attendance'}
            onClick={() => setActiveTab('attendance')}
            icon={<ClipboardList size={16} />}
            label="Attendance"
          />
          <TabButton
            active={activeTab === 'notifications'}
            onClick={() => setActiveTab('notifications')}
            icon={<Bell size={16} />}
            label="Notifications"
          />
          <TabButton
            active={activeTab === 'security'}
            onClick={() => setActiveTab('security')}
            icon={<Shield size={16} />}
            label="Security"
          />
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────────────────
          TAB 1: BRANCH SETTINGS CONTENT (Match exact screenshot structure)
         ───────────────────────────────────────────────────────────────────────────── */}
      {activeTab === 'branch' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Top Branch Profile Header Card */}
          <div style={{
            background: 'linear-gradient(135deg, #FAF8FF 0%, #FFFFFF 100%)',
            border: '1px solid #E5E7EB',
            borderRadius: 18,
            padding: '24px 28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 20,
            boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
          }}>
            {/* Left: School Graphic Badge + Branch Title */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              <div style={{
                width: 76,
                height: 76,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #EEF2FF, #E0E7FF)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(99, 102, 241, 0.12)',
                border: '3px solid #FFFFFF',
              }}>
                {/* School graphic */}
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#6366F1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <h2 style={{ fontSize: 20, fontWeight: 800, color: '#111827', margin: 0 }}>
                  {branchData.branchName}
                </h2>
                <div style={{ fontSize: 13, color: '#6B7280', fontWeight: 500 }}>
                  {branchData.schoolName}
                </div>
                <div style={{ marginTop: 2 }}>
                  <span style={{
                    background: '#ECFDF5',
                    color: '#059669',
                    fontSize: 12,
                    fontWeight: 600,
                    padding: '3px 12px',
                    borderRadius: 100,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 5,
                  }}>
                    <Check size={13} strokeWidth={3} /> {branchData.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: 2 Detail Stat Badges */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              {/* Stat 1: Established */}
              <div style={{
                background: '#FFFFFF',
                border: '1px solid #F3F4F6',
                borderRadius: 14,
                padding: '14px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                minWidth: 160,
                boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
              }}>
                <div style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  background: '#EEF2FF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Users size={18} color="#6366F1" />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: 11, color: '#6B7280', fontWeight: 500 }}>Established</span>
                  <span style={{ fontSize: 15, fontWeight: 700, color: '#111827' }}>{branchData.established}</span>
                </div>
              </div>

              {/* Stat 2: Board Affiliation */}
              <div style={{
                background: '#FFFFFF',
                border: '1px solid #F3F4F6',
                borderRadius: 14,
                padding: '14px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                minWidth: 160,
                boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
              }}>
                <div style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  background: '#ECFDF5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <GraduationCap size={18} color="#10B981" />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: 11, color: '#6B7280', fontWeight: 500 }}>Board Affiliation</span>
                  <span style={{ fontSize: 15, fontWeight: 700, color: '#111827' }}>{branchData.boardAffiliation}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main 2-Column Branch Details Card */}
          <div style={{
            background: '#FFFFFF',
            border: '1px solid #E5E7EB',
            borderRadius: 18,
            padding: '24px 28px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '24px 36px',
            }}>
              {/* Row 1: School Name | Branch Name */}
              <DetailRowItem
                icon={<Building size={16} color="#6366F1" />}
                label="School Name"
                value={branchData.schoolName}
              />
              <DetailRowItem
                icon={<Building size={16} color="#6366F1" />}
                label="Branch Name"
                value={branchData.branchName}
              />

              {/* Row 2: Board Affiliation | School Timings */}
              <DetailRowItem
                icon={<Mail size={16} color="#6366F1" />}
                label="Board Affiliation"
                value={branchData.boardAffiliation}
              />
              <DetailRowItem
                icon={<Clock size={16} color="#6366F1" />}
                label="School Timings"
                value={branchData.schoolTimings}
              />

              {/* Row 3: Contact Email | Contact Phone */}
              <DetailRowItem
                icon={<Mail size={16} color="#6366F1" />}
                label="Contact Email"
                value={branchData.contactEmail}
              />
              <DetailRowItem
                icon={<Phone size={16} color="#6366F1" />}
                label="Contact Phone"
                value={branchData.contactPhone}
              />

              {/* Row 4 (Spans Full Width): Address */}
              <div style={{ gridColumn: '1 / -1' }}>
                <DetailRowItem
                  icon={<MapPin size={16} color="#6366F1" />}
                  label="Address"
                  value={branchData.address}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────────────────
          TAB 2: ACADEMIC YEAR
         ───────────────────────────────────────────────────────────────────────────── */}
      {activeTab === 'academic' && (
        <div style={panelContainerStyle}>
          <div style={panelHeaderStyle}>
            <Calendar size={18} color="#6366F1" />
            <h2 style={panelTitleStyle}>Academic Year Configuration</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <DetailRowItem icon={<Calendar size={16} color="#6366F1" />} label="Current Academic Year" value="2026 – 2027" />
            <DetailRowItem icon={<Clock size={16} color="#6366F1" />} label="Term Schedule" value="3 Terms (Trimester System)" />
            <DetailRowItem icon={<Calendar size={16} color="#6366F1" />} label="Academic Start Date" value="April 1, 2026" />
            <DetailRowItem icon={<Calendar size={16} color="#6366F1" />} label="Academic End Date" value="March 31, 2027" />
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────────────────
          TAB 3: EXAM CONFIG
         ───────────────────────────────────────────────────────────────────────────── */}
      {activeTab === 'exam' && (
        <div style={panelContainerStyle}>
          <div style={panelHeaderStyle}>
            <FileText size={18} color="#6366F1" />
            <h2 style={panelTitleStyle}>Exam & Evaluation System Config</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <DetailRowItem icon={<Award size={16} color="#6366F1" />} label="Grading Policy" value="CBSE 10-Point Scale (A1 to E)" />
            <DetailRowItem icon={<CheckCircle size={16} color="#6366F1" />} label="Minimum Passing Mark" value="33% Aggregate" />
            <DetailRowItem icon={<Sliders size={16} color="#6366F1" />} label="Report Card Template" value="CBSE Standard Executive Template" />
            <DetailRowItem icon={<Shield size={16} color="#6366F1" />} label="Result Approval Lock" value="Principal Sign-Off Required" />
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────────────────
          TAB 4: ATTENDANCE
         ───────────────────────────────────────────────────────────────────────────── */}
      {activeTab === 'attendance' && (
        <div style={panelContainerStyle}>
          <div style={panelHeaderStyle}>
            <ClipboardList size={18} color="#6366F1" />
            <h2 style={panelTitleStyle}>Attendance Policy Settings</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <DetailRowItem icon={<Clock size={16} color="#6366F1" />} label="Morning Gate Cutoff" value="8:15 AM" />
            <DetailRowItem icon={<Users size={16} color="#6366F1" />} label="Minimum Mandatory Attendance" value="75% Total Days" />
            <DetailRowItem icon={<Bell size={16} color="#6366F1" />} label="Automated Parent SMS Alert" value="Enabled (Sent at 9:00 AM)" />
            <DetailRowItem icon={<Shield size={16} color="#6366F1" />} label="Biometric RFID Scanner" value="Integrated Live Gate Turnstile" />
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────────────────
          TAB 5: NOTIFICATIONS
         ───────────────────────────────────────────────────────────────────────────── */}
      {activeTab === 'notifications' && (
        <div style={panelContainerStyle}>
          <div style={panelHeaderStyle}>
            <Bell size={18} color="#6366F1" />
            <h2 style={panelTitleStyle}>Broadcast & Executive Alerts</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <DetailRowItem icon={<Mail size={16} color="#6366F1" />} label="Executive Daily Digest Email" value="Enabled (Sent at 7:00 AM)" />
            <DetailRowItem icon={<Bell size={16} color="#6366F1" />} label="Emergency Security Lockdown Alert" value="High Priority Broadcast" />
            <DetailRowItem icon={<Phone size={16} color="#6366F1" />} label="SMS Gateway Integration" value="Active (Fast2SMS Enterprise)" />
            <DetailRowItem icon={<FileText size={16} color="#6366F1" />} label="Monthly Financial Audit Summary" value="Subscribed" />
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────────────────
          TAB 6: SECURITY
         ───────────────────────────────────────────────────────────────────────────── */}
      {activeTab === 'security' && (
        <div style={panelContainerStyle}>
          <div style={panelHeaderStyle}>
            <Lock size={18} color="#6366F1" />
            <h2 style={panelTitleStyle}>Security & Governance Policy</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <DetailRowItem icon={<Lock size={16} color="#6366F1" />} label="Two-Factor Authentication (2FA)" value="Required for All Staff" />
            <DetailRowItem icon={<Shield size={16} color="#6366F1" />} label="Session Auto-Timeout" value="30 Minutes Inactivity" />
            <DetailRowItem icon={<FileText size={16} color="#6366F1" />} label="Audit Log Data Retention" value="7 Years Immutable Storage" />
            <DetailRowItem icon={<Users size={16} color="#6366F1" />} label="Role-Based Access Control" value="Enforced (RBAC v2.4)" />
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────────────────
          EDIT BRANCH DETAILS MODAL
         ───────────────────────────────────────────────────────────────────────────── */}
      {isEditModalOpen && (
        <div style={modalBackdropStyle}>
          <div style={modalContentStyle}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 16, borderBottom: '1px solid #E5E7EB' }}>
              <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#111827' }}>Edit Branch Details</h2>
              <button onClick={() => setIsEditModalOpen(false)} style={closeBtnStyle}><X size={18} /></button>
            </div>

            <form onSubmit={handleSaveBranch} style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 16 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <FormField label="School Name" value={editForm.schoolName} onChange={(val) => setEditForm({ ...editForm, schoolName: val })} />
                <FormField label="Branch Name" value={editForm.branchName} onChange={(val) => setEditForm({ ...editForm, branchName: val })} />
                <FormField label="Board Affiliation" value={editForm.boardAffiliation} onChange={(val) => setEditForm({ ...editForm, boardAffiliation: val })} />
                <FormField label="School Timings" value={editForm.schoolTimings} onChange={(val) => setEditForm({ ...editForm, schoolTimings: val })} />
                <FormField label="Contact Email" value={editForm.contactEmail} onChange={(val) => setEditForm({ ...editForm, contactEmail: val })} />
                <FormField label="Contact Phone" value={editForm.contactPhone} onChange={(val) => setEditForm({ ...editForm, contactPhone: val })} />
              </div>
              <FormField label="Branch Address" value={editForm.address} isTextArea onChange={(val) => setEditForm({ ...editForm, address: val })} />

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 12 }}>
                <button type="button" onClick={() => setIsEditModalOpen(false)} style={cancelBtnStyle}>Cancel</button>
                <button type="submit" style={saveBtnStyle}><Save size={16} /> Save Branch Details</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HELPER COMPONENTS & STYLES
// ─────────────────────────────────────────────────────────────────────────────

function TabButton({
  active,
  onClick,
  icon,
  label
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '8px 18px',
        border: 'none',
        borderRadius: '9999px',
        background: active ? '#ffffff' : 'transparent',
        fontSize: 13,
        fontWeight: active ? 700 : 600,
        color: active ? '#0284C7' : '#475569',
        cursor: 'pointer',
        boxShadow: active ? '0 2px 8px rgba(2, 132, 199, 0.12), 0 1px 3px rgba(0, 0, 0, 0.06)' : 'none',
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        whiteSpace: 'nowrap',
      }}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

function DetailRowItem({
  icon,
  label,
  value
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
      <div style={{
        width: 36,
        height: 36,
        borderRadius: '50%',
        background: '#EEF2FF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}>
        {icon}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1, minWidth: 0 }}>
        <span style={{ fontSize: 11, fontWeight: 500, color: '#6B7280' }}>{label}</span>
        <span style={{
          fontSize: 13.5,
          fontWeight: 700,
          color: '#111827',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}>
          {value}
        </span>
      </div>
    </div>
  );
}

function FormField({
  label,
  value,
  onChange,
  isTextArea = false
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  isTextArea?: boolean;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label style={{ fontSize: 12, fontWeight: 600, color: '#4B5563' }}>{label}</label>
      {isTextArea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          style={{
            padding: '8px 12px',
            borderRadius: 8,
            border: '1px solid #D1D5DB',
            fontSize: 13,
            fontFamily: 'inherit',
          }}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{
            padding: '8px 12px',
            borderRadius: 8,
            border: '1px solid #D1D5DB',
            fontSize: 13,
            fontFamily: 'inherit',
          }}
        />
      )}
    </div>
  );
}

const panelContainerStyle: React.CSSProperties = {
  background: '#FFFFFF',
  border: '1px solid #E5E7EB',
  borderRadius: 18,
  padding: '24px 28px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
};

const panelHeaderStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  marginBottom: 20,
};

const panelTitleStyle: React.CSSProperties = {
  fontSize: 16,
  fontWeight: 700,
  color: '#111827',
  margin: 0,
};

const modalBackdropStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'rgba(0, 0, 0, 0.4)',
  backdropFilter: 'blur(4px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
};

const modalContentStyle: React.CSSProperties = {
  background: '#FFFFFF',
  borderRadius: 20,
  padding: 24,
  maxWidth: 580,
  width: '90%',
  boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
};

const closeBtnStyle: React.CSSProperties = {
  background: 'none',
  border: 'none',
  color: '#9CA3AF',
  cursor: 'pointer',
  padding: 4,
};

const cancelBtnStyle: React.CSSProperties = {
  background: '#F3F4F6',
  color: '#4B5563',
  border: 'none',
  borderRadius: 8,
  padding: '8px 16px',
  fontSize: 13,
  fontWeight: 600,
  cursor: 'pointer',
};

const saveBtnStyle: React.CSSProperties = {
  background: '#4F46E5',
  color: 'white',
  border: 'none',
  borderRadius: 8,
  padding: '8px 16px',
  fontSize: 13,
  fontWeight: 600,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: 6,
};
