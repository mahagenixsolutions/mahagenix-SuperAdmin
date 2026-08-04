import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Edit,
  MoreVertical,
  GraduationCap,
  CheckCircle2,
  Trophy,
  Star,
  User,
  Briefcase,
  MapPin,
  Calendar,
  BookOpen,
  Cake,
  Flag,
  Globe,
  Mail,
  Phone,
  Clock,
  FileText,
  Sparkles,
  Quote,
  Check,
  Activity,
  Users,
  Award,
  PhoneCall,
  X,
  Save,
  CheckCircle
} from 'lucide-react';
import type { RootState } from '../../../store';

interface ProfileData {
  name: string;
  designation: string;
  branch: string;
  school: string;
  employeeId: string;
  since: string;
  experience: string;
  qualifications: string;
  dob: string;
  nationality: string;
  languages: string;
  email: string;
  phone: string;
  altPhone: string;
  officeHours: string;
  officeAddress: string;
  aboutMe: string;
}

export default function PrincipalProfilePage() {
  const user = useSelector((s: RootState) => s.auth.user);
  const navigate = useNavigate();

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 767.98);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // State for editable profile details
  const [profile, setProfile] = useState<ProfileData>({
    name: `${user?.first_name ?? 'Rajesh'} ${user?.last_name ?? 'Kumar'}`,
    designation: 'Principal',
    branch: 'Koranamgala Branch',
    school: 'Greenfield International School',
    employeeId: 'EMP-2024-001',
    since: 'April 1, 2018',
    experience: '8+ Years in Education Leadership',
    qualifications: 'M.Ed, B.Ed, MBA (Education Management)',
    dob: 'May 12, 1983',
    nationality: 'Indian',
    languages: 'English, Hindi, Kannada',
    email: 'principal@greenfield.edu.in',
    phone: '+91 98765 43210',
    altPhone: '+91 87654 32109',
    officeHours: 'Mon – Fri, 8:00 AM – 4:00 PM',
    officeAddress: 'Greenfield International School, Koranamgala, Bengaluru, Karnataka – 560034',
    aboutMe: 'Dedicated to creating an environment where students learn, grow, and become responsible global citizens.',
  });

  // Modal states
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDocsModalOpen, setIsDocsModalOpen] = useState(false);
  const [isActivitiesModalOpen, setIsActivitiesModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Edit form transient state
  const [editForm, setEditForm] = useState<ProfileData>(profile);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile(editForm);
    setIsEditModalOpen(false);
    showToast('Profile updated successfully!');
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: isMobile ? 14 : 20,
      padding: isMobile ? '12px 12px 30px' : '12px 0 40px',
      fontFamily: "'Inter', sans-serif",
      color: '#1F2937',
      maxWidth: 1400,
      margin: '0 auto',
      width: '100%',
      boxSizing: 'border-box',
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

      {/* Top Back Navigation Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        <button
          onClick={() => navigate('/dashboard')}
          style={{
            background: 'white',
            border: '1px solid #E5E7EB',
            color: '#4F46E5',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: isMobile ? 12 : 13,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: isMobile ? '6px 12px' : '8px 16px',
            borderRadius: 10,
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            transition: 'all 0.2s ease',
          }}
        >
          <ArrowLeft size={isMobile ? 14 : 16} /> Back to Executive Dashboard
        </button>
      </div>

      {/* ─────────────────────────────────────────────────────────────────────────────
          HERO BANNER HEADER (Match exact screenshot style - Desktop & Mobile)
         ───────────────────────────────────────────────────────────────────────────── */}
      <div style={{
        background: 'linear-gradient(135deg, #FAF8FF 0%, #F3E8FF 50%, #EEF2FF 100%)',
        border: '1px solid #ECEEFE',
        borderRadius: 20,
        padding: isMobile ? '16px' : '24px 28px',
        display: 'flex',
        flexDirection: 'column',
        gap: isMobile ? 16 : 20,
        boxShadow: '0 4px 20px rgba(99, 102, 241, 0.05)',
      }}>
        {/* Top Tier: Profile Info on Left + Action Buttons on Right */}
        <div style={{
          display: 'flex',
          alignItems: isMobile ? 'flex-start' : 'center',
          justifyContent: 'space-between',
          flexDirection: isMobile ? 'column' : 'row',
          gap: 16,
          width: '100%',
        }}>
          {/* Left Side: Avatar & Details */}
          <div style={{ display: 'flex', alignItems: isMobile ? 'flex-start' : 'center', gap: isMobile ? 14 : 20, flexWrap: 'wrap', flex: 1 }}>
            {/* Avatar Container with Green Online Badge */}
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <div style={{
                width: isMobile ? 72 : 92,
                height: isMobile ? 72 : 92,
                borderRadius: '50%',
                overflow: 'hidden',
                border: '4px solid #FFFFFF',
                boxShadow: '0 6px 18px rgba(99, 102, 241, 0.15)',
                background: 'linear-gradient(135deg, #6366F1, #818CF8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <img
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=300"
                  alt={profile.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
              {/* Green Online Dot */}
              <div style={{
                position: 'absolute',
                bottom: 2,
                right: 2,
                width: 14,
                height: 14,
                borderRadius: '50%',
                background: '#22C55E',
                border: '2.5px solid #FFFFFF',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              }} />
            </div>

            {/* Name & Subtitles */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <h1 style={{
                  fontSize: isMobile ? 20 : 24,
                  fontWeight: 800,
                  color: '#111827',
                  margin: 0,
                  letterSpacing: '-0.02em'
                }}>
                  {profile.name}
                </h1>
                {/* Verified Blue Badge */}
                <div style={{
                  background: '#4F46E5',
                  color: 'white',
                  borderRadius: '50%',
                  width: 18,
                  height: 18,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }} title="Verified Executive Profile">
                  <Check size={11} strokeWidth={3.5} />
                </div>
              </div>

              {/* Role & Branch */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: isMobile ? 12 : 13, color: '#4B5563', fontWeight: 600, flexWrap: 'wrap' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Briefcase size={13} style={{ color: '#6366F1' }} />
                  {profile.designation}
                </span>
                <span style={{ color: '#D1D5DB' }}>|</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <MapPin size={13} style={{ color: '#6366F1' }} />
                  {profile.branch}
                </span>
              </div>

              {/* School Name */}
              <div style={{ fontSize: 12, color: '#6B7280', fontWeight: 500 }}>
                {profile.school}
              </div>

              {/* Employee ID & Since Badges */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4, flexWrap: 'wrap' }}>
                <div style={{
                  background: '#FFFFFF',
                  border: '1px solid #E5E7EB',
                  borderRadius: 20,
                  padding: '3px 10px',
                  fontSize: 11,
                  color: '#6B7280',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 5,
                }}>
                  <span>ID:</span>
                  <span style={{ fontWeight: 700, color: '#111827' }}>{profile.employeeId}</span>
                </div>

                <div style={{
                  background: '#FFFFFF',
                  border: '1px solid #E5E7EB',
                  borderRadius: 20,
                  padding: '3px 10px',
                  fontSize: 11,
                  color: '#6B7280',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 5,
                }}>
                  <Calendar size={12} style={{ color: '#6366F1' }} />
                  <span>Since:</span>
                  <span style={{ fontWeight: 700, color: '#111827' }}>{profile.since}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons (Top Right on Desktop, Full Width on Mobile) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, width: isMobile ? '100%' : 'auto', alignSelf: isMobile ? 'stretch' : 'flex-start' }}>
            <button
              onClick={() => {
                setEditForm(profile);
                setIsEditModalOpen(true);
              }}
              style={{
                flex: isMobile ? 1 : 'none',
                background: '#5850EC',
                color: 'white',
                border: 'none',
                borderRadius: 10,
                padding: '8px 16px',
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                boxShadow: '0 4px 12px rgba(88, 80, 236, 0.3)',
              }}
            >
              <Edit size={14} /> Edit Profile
            </button>
            <button
              onClick={() => showToast('Options menu opened')}
              style={{
                background: '#FFFFFF',
                border: '1px solid #E5E7EB',
                color: '#6B7280',
                borderRadius: 10,
                width: 34,
                height: 34,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <MoreVertical size={16} />
            </button>
          </div>
        </div>

        {/* Bottom Tier: 4 Stat Cards Grid (4 horizontal columns on Desktop, 2x2 grid on Mobile) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
          gap: 12,
          width: '100%',
          paddingTop: 12,
          borderTop: '1px solid rgba(229, 231, 235, 0.6)',
        }}>
          {/* Stat 1: Years of Experience */}
          <div style={statCardStyle}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              <span style={{ fontSize: isMobile ? 17 : 19, fontWeight: 800, color: '#4F46E5' }}>8+</span>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#EEF2FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <GraduationCap size={14} color="#6366F1" />
              </div>
            </div>
            <span style={statLabelStyle}>Years Experience</span>
          </div>

          {/* Stat 2: Attendance */}
          <div style={statCardStyle}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              <span style={{ fontSize: isMobile ? 17 : 19, fontWeight: 800, color: '#059669' }}>100%</span>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CheckCircle2 size={14} color="#10B981" />
              </div>
            </div>
            <span style={statLabelStyle}>Attendance (Year)</span>
          </div>

          {/* Stat 3: Awards Received */}
          <div style={statCardStyle}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              <span style={{ fontSize: isMobile ? 17 : 19, fontWeight: 800, color: '#D97706' }}>15</span>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#FFFBEB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Trophy size={14} color="#F59E0B" />
              </div>
            </div>
            <span style={statLabelStyle}>Awards Received</span>
          </div>

          {/* Stat 4: Performance Rating */}
          <div style={statCardStyle}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              <span style={{ fontSize: isMobile ? 17 : 19, fontWeight: 800, color: '#2563EB' }}>4.8/5</span>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Star size={14} color="#3B82F6" />
              </div>
            </div>
            <span style={statLabelStyle}>Performance Rating</span>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────────────────
          BALANCED MASONRY LAYOUT (Left Main Column + Right Sidebar Column)
         ───────────────────────────────────────────────────────────────────────────── */}
      <div style={{
        display: 'flex',
        gap: 20,
        alignItems: 'flex-start',
        flexDirection: isMobile ? 'column' : 'row',
        width: '100%',
      }}>

        {/* ─── LEFT MAIN AREA (2/3 width) ─── */}
        <div style={{ width: '100%', flex: isMobile ? '1 1 100%' : '1 1 680px', display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* Top 2 Cards Row: Personal Info + Contact Info */}
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>

            {/* Card 1: Personal Information */}
            <div style={{ ...cardContainerStyle, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={cardHeaderStyle}>
                  <div style={iconBadgeStyle}>
                    <User size={16} color="#6366F1" />
                  </div>
                  <h3 style={cardTitleStyle}>Personal Information</h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <ProfileInfoRow icon={<BadgeIcon />} label="Employee ID" value={profile.employeeId} />
                  <ProfileInfoRow icon={<Briefcase size={14} color="#9CA3AF" />} label="Designation" value={profile.designation} />
                  <ProfileInfoRow icon={<MapPin size={14} color="#9CA3AF" />} label="Branch" value={profile.branch} />
                  <ProfileInfoRow icon={<Calendar size={14} color="#9CA3AF" />} label="Joining Date" value={profile.since} />
                  <ProfileInfoRow icon={<Star size={14} color="#9CA3AF" />} label="Experience" value={profile.experience} />
                  <ProfileInfoRow icon={<BookOpen size={14} color="#9CA3AF" />} label="Qualifications" value={profile.qualifications} />
                  <ProfileInfoRow icon={<Cake size={14} color="#9CA3AF" />} label="Date of Birth" value={profile.dob} />
                  <ProfileInfoRow icon={<Flag size={14} color="#9CA3AF" />} label="Nationality" value={profile.nationality} />
                  <ProfileInfoRow icon={<Globe size={14} color="#9CA3AF" />} label="Languages Known" value={profile.languages} isLast />
                </div>
              </div>
            </div>

            {/* Card 2: Contact & Office */}
            <div style={{ ...cardContainerStyle, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={cardHeaderStyle}>
                  <div style={iconBadgeStyle}>
                    <TargetIcon />
                  </div>
                  <h3 style={cardTitleStyle}>Contact & Office</h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <ProfileInfoRow icon={<Mail size={14} color="#9CA3AF" />} label="Email" value={profile.email} isLink />
                  <ProfileInfoRow icon={<Phone size={14} color="#9CA3AF" />} label="Phone" value={profile.phone} />
                  <ProfileInfoRow icon={<PhoneCall size={14} color="#9CA3AF" />} label="Alternative Phone" value={profile.altPhone} />
                  <ProfileInfoRow icon={<Clock size={14} color="#9CA3AF" />} label="Office Hours" value={profile.officeHours} />
                  <ProfileInfoRow icon={<MapPin size={14} color="#9CA3AF" />} label="Office Address" value={profile.officeAddress} isLast />
                </div>
              </div>

              {/* About Me Quote Box */}
              <div style={{
                background: 'linear-gradient(135deg, #F5F3FF 0%, #FAF8FF 100%)',
                border: '1px solid #EDE9FE',
                borderRadius: 14,
                padding: '14px 16px',
                marginTop: 16,
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#6366F1', fontWeight: 700, fontSize: 13 }}>
                  <Quote size={15} /> About Me
                </div>
                <p style={{
                  margin: 0,
                  fontSize: 12,
                  lineHeight: 1.5,
                  color: '#4B5563',
                  fontStyle: 'normal',
                }}>
                  "{profile.aboutMe}"
                </p>
              </div>
            </div>

          </div>

          {/* Card 3: Achievements & Awards (Full width of Left Area) */}
          <div style={cardContainerStyle}>
            <div style={cardHeaderStyle}>
              <div style={iconBadgeStyle}>
                <Trophy size={16} color="#6366F1" />
              </div>
              <h3 style={cardTitleStyle}>Achievements & Awards</h3>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 10 }}>
              <AwardItem
                icon={<Trophy size={16} color="#F59E0B" />}
                title="Best School Award 2024 — CBSE National"
                year="2024"
              />
              <AwardItem
                icon={<Award size={16} color="#3B82F6" />}
                title="100% Board Pass Rate — 3 Consecutive Years"
                year="2023"
              />
              <AwardItem
                icon={<Sparkles size={16} color="#10B981" />}
                title="Green School Certification"
                year="2023"
              />
              <AwardItem
                icon={<Star size={16} color="#8B5CF6" />}
                title="Digital Transformation Award — EduTech India"
                year="2022"
              />
            </div>
          </div>

        </div>

        {/* ─── RIGHT SIDEBAR COLUMN (1/3 width: Overview -> Documents -> Activities) ─── */}
        <div style={{ flex: isMobile ? '1 1 100%' : '1 1 340px', width: '100%', display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* Right Card 1: Profile Overview */}
          <div style={cardContainerStyle}>
            <div style={cardHeaderStyle}>
              <h3 style={cardTitleStyle}>Profile Overview</h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 2 }}>
              <ProgressBarItem label="Leadership" percent={92} color="#6366F1" />
              <ProgressBarItem label="Administration" percent={88} color="#2563EB" />
              <ProgressBarItem label="Academic Vision" percent={95} color="#10B981" />
              <ProgressBarItem label="Team Management" percent={90} color="#F97316" />
              <ProgressBarItem label="Innovation" percent={85} color="#EC4899" />
            </div>
          </div>

          {/* Right Card 2: Documents & Credentials */}
          <div style={cardContainerStyle}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={iconBadgeStyle}>
                  <FileText size={16} color="#6366F1" />
                </div>
                <h3 style={cardTitleStyle}>Documents & Credentials</h3>
              </div>
              <button
                onClick={() => setIsDocsModalOpen(true)}
                style={viewAllBtnStyle}
              >
                View All
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
              <DocumentRow name="Appointment Letter" />
              <DocumentRow name="Qualification Certificates" />
              <DocumentRow name="Experience Certificates" />
              <DocumentRow name="ID Proof" />
              <DocumentRow name="Pan Card" />
            </div>
          </div>

          {/* Right Card 3: Recent Activities */}
          <div style={cardContainerStyle}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={iconBadgeStyle}>
                  <Activity size={16} color="#6366F1" />
                </div>
                <h3 style={cardTitleStyle}>Recent Activities</h3>
              </div>
              <button
                onClick={() => setIsActivitiesModalOpen(true)}
                style={viewAllBtnStyle}
              >
                View All
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <ActivityItem
                icon={<CheckCircle2 size={14} color="#10B981" />}
                bgColor="#ECFDF5"
                text="Approved new infrastructure budget"
                time="2 hours ago"
              />
              <ActivityItem
                icon={<Users size={14} color="#F59E0B" />}
                bgColor="#FFFBEB"
                text="Reviewed staff performance reports"
                time="1 day ago"
              />
              <ActivityItem
                icon={<Calendar size={14} color="#EAB308" />}
                bgColor="#FEF9C3"
                text="Conducted academic committee meeting"
                time="2 days ago"
              />
              <ActivityItem
                icon={<MapPin size={14} color="#EF4444" />}
                bgColor="#FEF2F2"
                text="Visited primary school campus"
                time="3 days ago"
              />
            </div>
          </div>

        </div>

      </div>

      {/* Floating Action Button (Positioned safely above floating bus widget) */}
      <button
        onClick={() => showToast('Executive Assistant AI menu opened')}
        style={{
          position: 'fixed',
          bottom: 88,
          right: 28,
          width: 48,
          height: 48,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #6366F1, #4F46E5)',
          color: 'white',
          border: 'none',
          boxShadow: '0 8px 20px rgba(79, 70, 229, 0.35)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 99,
          transition: 'transform 0.2s ease',
        }}
        title="Executive AI Assistant"
      >
        <Sparkles size={20} />
      </button>

      {/* ─────────────────────────────────────────────────────────────────────────────
          MODALS & DRAWERS (Edit Profile, All Docs, All Activities)
         ───────────────────────────────────────────────────────────────────────────── */}

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div style={modalBackdropStyle}>
          <div style={modalContentStyle}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 16, borderBottom: '1px solid #E5E7EB' }}>
              <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#111827' }}>Edit Profile Information</h2>
              <button onClick={() => setIsEditModalOpen(false)} style={closeBtnStyle}><X size={18} /></button>
            </div>

            <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 16 }}>
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 14 }}>
                <FormField label="Full Name" value={editForm.name} onChange={(val) => setEditForm({ ...editForm, name: val })} />
                <FormField label="Designation" value={editForm.designation} onChange={(val) => setEditForm({ ...editForm, designation: val })} />
                <FormField label="Branch" value={editForm.branch} onChange={(val) => setEditForm({ ...editForm, branch: val })} />
                <FormField label="School" value={editForm.school} onChange={(val) => setEditForm({ ...editForm, school: val })} />
                <FormField label="Email" value={editForm.email} onChange={(val) => setEditForm({ ...editForm, email: val })} />
                <FormField label="Phone" value={editForm.phone} onChange={(val) => setEditForm({ ...editForm, phone: val })} />
                <FormField label="Alternative Phone" value={editForm.altPhone} onChange={(val) => setEditForm({ ...editForm, altPhone: val })} />
                <FormField label="Office Hours" value={editForm.officeHours} onChange={(val) => setEditForm({ ...editForm, officeHours: val })} />
              </div>
              <FormField label="Office Address" value={editForm.officeAddress} onChange={(val) => setEditForm({ ...editForm, officeAddress: val })} />
              <FormField label="About Me Quote" value={editForm.aboutMe} isTextArea onChange={(val) => setEditForm({ ...editForm, aboutMe: val })} />

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 12 }}>
                <button type="button" onClick={() => setIsEditModalOpen(false)} style={cancelBtnStyle}>Cancel</button>
                <button type="submit" style={saveBtnStyle}><Save size={16} /> Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Documents Modal */}
      {isDocsModalOpen && (
        <div style={modalBackdropStyle}>
          <div style={modalContentStyle}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 16, borderBottom: '1px solid #E5E7EB' }}>
              <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#111827' }}>Documents & Credentials Registry</h2>
              <button onClick={() => setIsDocsModalOpen(false)} style={closeBtnStyle}><X size={18} /></button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 16 }}>
              <DocumentRow name="Appointment Letter — Signed & Sealed" />
              <DocumentRow name="Qualification Certificates (M.Ed, B.Ed, MBA)" />
              <DocumentRow name="Experience Certificates & Tenure Records" />
              <DocumentRow name="ID Proof (Aadhaar & Passport)" />
              <DocumentRow name="Pan Card & Tax Registration" />
              <DocumentRow name="Background Verification Clearance" />
              <DocumentRow name="CBSE Academic Leadership Credentials" />
            </div>
          </div>
        </div>
      )}

      {/* Activities Modal */}
      {isActivitiesModalOpen && (
        <div style={modalBackdropStyle}>
          <div style={modalContentStyle}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 16, borderBottom: '1px solid #E5E7EB' }}>
              <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#111827' }}>Recent Executive Activities Log</h2>
              <button onClick={() => setIsActivitiesModalOpen(false)} style={closeBtnStyle}><X size={18} /></button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 16 }}>
              <ActivityItem icon={<CheckCircle2 size={15} color="#10B981" />} bgColor="#ECFDF5" text="Approved new infrastructure budget" time="2 hours ago" />
              <ActivityItem icon={<Users size={15} color="#F59E0B" />} bgColor="#FFFBEB" text="Reviewed staff performance reports" time="1 day ago" />
              <ActivityItem icon={<Calendar size={15} color="#EAB308" />} bgColor="#FEF9C3" text="Conducted academic committee meeting" time="2 days ago" />
              <ActivityItem icon={<MapPin size={15} color="#EF4444" />} bgColor="#FEF2F2" text="Visited primary school campus" time="3 days ago" />
              <ActivityItem icon={<Trophy size={15} color="#6366F1" />} bgColor="#EEF2FF" text="Received CBSE Excellence in Leadership Commendation" time="5 days ago" />
              <ActivityItem icon={<FileText size={15} color="#3B82F6" />} bgColor="#EFF6FF" text="Signed quarterly audit compliance report" time="1 week ago" />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HELPER COMPONENTS & STYLES (Matching exact visual details)
// ─────────────────────────────────────────────────────────────────────────────

function ProfileInfoRow({
  icon,
  label,
  value,
  isLast = false,
  isLink = false
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  isLast?: boolean;
  isLink?: boolean;
}) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '10px 0',
      borderBottom: isLast ? 'none' : '1px solid #F3F4F6',
      gap: 12,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
        {icon}
        <span style={{ fontSize: 12, fontWeight: 500, color: '#6B7280' }}>{label}</span>
      </div>
      <span style={{
        fontSize: 12,
        fontWeight: 600,
        color: isLink ? '#4F46E5' : '#111827',
        textAlign: 'right',
        wordBreak: 'break-word',
        maxWidth: '65%',
      }}>
        {value}
      </span>
    </div>
  );
}

function ProgressBarItem({ label, percent, color }: { label: string; percent: number; color: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12 }}>
        <span style={{ color: '#4B5563', fontWeight: 500 }}>{label}</span>
        <span style={{ color: '#111827', fontWeight: 700 }}>{percent}%</span>
      </div>
      <div style={{
        width: '100%',
        height: 6,
        background: '#F3F4F6',
        borderRadius: 10,
        overflow: 'hidden',
      }}>
        <div style={{
          width: `${percent}%`,
          height: '100%',
          background: color,
          borderRadius: 10,
          transition: 'width 0.6s ease',
        }} />
      </div>
    </div>
  );
}

function DocumentRow({ name }: { name: string }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '9px 12px',
      background: '#F9FAFB',
      border: '1px solid #F3F4F6',
      borderRadius: 10,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 26,
          height: 26,
          borderRadius: 6,
          background: '#EFF6FF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <FileText size={14} color="#3B82F6" />
        </div>
        <span style={{ fontSize: 12, fontWeight: 600, color: '#374151' }}>{name}</span>
      </div>
      <span style={{
        background: '#ECFDF5',
        color: '#059669',
        fontSize: 11,
        fontWeight: 600,
        padding: '3px 9px',
        borderRadius: 100,
      }}>
        Verified
      </span>
    </div>
  );
}

function AwardItem({ icon, title, year }: { icon: React.ReactNode; title: string; year: string }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '11px 14px',
      background: '#F9FAFB',
      border: '1px solid #F3F4F6',
      borderRadius: 10,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 30,
          height: 30,
          borderRadius: 8,
          background: '#FFFFFF',
          border: '1px solid #E5E7EB',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
        }}>
          {icon}
        </div>
        <span style={{ fontSize: 12.5, fontWeight: 600, color: '#1F2937' }}>{title}</span>
      </div>
      <span style={{
        background: '#EEF2FF',
        color: '#6366F1',
        fontSize: 11,
        fontWeight: 700,
        padding: '3px 9px',
        borderRadius: 6,
      }}>
        {year}
      </span>
    </div>
  );
}

function ActivityItem({ icon, bgColor, text, time }: { icon: React.ReactNode; bgColor: string; text: string; time: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
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
        <span style={{ fontSize: 12, fontWeight: 500, color: '#374151' }}>{text}</span>
      </div>
      <span style={{ fontSize: 11, color: '#9CA3AF', flexShrink: 0 }}>{time}</span>
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

// Icon Components
function BadgeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  );
}

function TargetIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#6366F1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

// Reusable Styles
const statCardStyle: React.CSSProperties = {
  background: '#FFFFFF',
  borderRadius: 14,
  padding: '11px 13px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: 4,
  boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
  border: '1px solid #F3F4F6',
  minWidth: 105,
};

const statLabelStyle: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 500,
  color: '#6B7280',
  marginTop: 2,
};

const cardContainerStyle: React.CSSProperties = {
  background: '#FFFFFF',
  border: '1px solid #E5E7EB',
  borderRadius: 18,
  padding: 18,
  boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
};

const cardHeaderStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  marginBottom: 14,
};

const iconBadgeStyle: React.CSSProperties = {
  width: 28,
  height: 28,
  borderRadius: '50%',
  background: '#EEF2FF',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const cardTitleStyle: React.CSSProperties = {
  fontSize: 14.5,
  fontWeight: 700,
  color: '#111827',
  margin: 0,
};

const viewAllBtnStyle: React.CSSProperties = {
  background: 'none',
  border: 'none',
  color: '#4F46E5',
  fontSize: 12,
  fontWeight: 600,
  cursor: 'pointer',
  padding: 0,
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
  padding: 12,
};

const modalContentStyle: React.CSSProperties = {
  background: '#FFFFFF',
  borderRadius: 20,
  padding: 20,
  maxWidth: 580,
  width: '100%',
  maxHeight: '90vh',
  overflowY: 'auto',
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
