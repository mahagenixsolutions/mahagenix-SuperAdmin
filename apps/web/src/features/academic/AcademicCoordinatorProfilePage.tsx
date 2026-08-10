import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Edit,
  Calendar,
  UserCheck,
  Download,
  Share2,
  BookOpen,
  Users,
  GraduationCap,
  Layers,
  Building,
  CheckCircle2,
  FileText,
  Shield,
  Activity,
  Award,
  Sparkles,
  BarChart3,
  Target,
  Briefcase,
  MapPin,
  Mail,
  Phone,
  Clock,
  Bell,
  Check,
  X,
  Eye,
  Search,
  ChevronRight,
  AlertTriangle,
  FileCheck
} from 'lucide-react';
import type { RootState } from '../../store';
import { ProfileLayout } from './layouts/ProfileLayout';

// ─────────────────────────────────────────────────────────────────────────────
// MOCK DATA TYPES & CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────

interface ProfileInfo {
  name: string;
  role: string;
  employeeId: string;
  campus: string;
  department: string;
  reportsTo: string;
  academicSession: string;
  yearsInRole: string;
  onlineStatus: boolean;
  avatarUrl: string;
  email: string;
  phone: string;
  officeHours: string;
  officeLocation: string;
  qualifications: string;
  bio: string;
}

interface ResponsibilityCard {
  id: string;
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ReactNode;
  badge: string;
}

interface KPIMetric {
  id: string;
  label: string;
  value: string | number;
  target?: string;
  trend: string;
  isPositive: boolean;
  icon: React.ReactNode;
}

interface AcademicObjective {
  id: string;
  title: string;
  targetDate: string;
  progress: number;
  status: 'On Track' | 'Ahead' | 'Needs Focus';
  description: string;
}

interface CompetencyMetric {
  id: string;
  name: string;
  score: number;
  level: string;
}

interface PendingApproval {
  id: string;
  title: string;
  category: 'Lesson Plans' | 'Question Banks' | 'Exam Papers' | 'Assignments' | 'Curriculum Changes' | 'Academic Notices' | 'Teacher Requests' | 'Committee Approvals';
  submittedBy: string;
  department: string;
  submittedDate: string;
  urgency: 'High' | 'Medium' | 'Normal';
  details: string;
}

interface SupervisedDepartment {
  id: string;
  name: string;
  coordinator: string;
  teachersCount: number;
  classesCount: number;
  curriculumProgress: number;
  complianceScore: number;
  riskStatus: 'Low' | 'Medium' | 'High';
  riskNotes?: string;
}

interface SupervisedTeacher {
  id: string;
  name: string;
  avatar: string;
  department: string;
  classesHandled: string;
  lessonPlanStatus: 'Approved' | 'Pending' | 'Late';
  attendanceRate: number;
  syllabusProgress: number;
  assessmentCompletion: number;
  academicHealth: 'Excellent' | 'Good' | 'Needs Review';
}

interface CommitteeRole {
  id: string;
  committeeName: string;
  role: string;
  frequency: string;
  membersCount: number;
  activeFocus: string;
}

interface CalendarResponsibility {
  id: string;
  title: string;
  type: 'Curriculum Reviews' | 'Department Meetings' | 'PTMs' | 'Exam Planning' | 'Academic Audits' | 'Teacher Workshops' | 'Lesson Plan Reviews';
  dueDate: string;
  time: string;
  location: string;
  status: 'Scheduled' | 'In Progress' | 'Upcoming';
}

interface AcademicDocument {
  id: string;
  title: string;
  category: string;
  format: 'PDF' | 'DOCX';
  size: string;
  lastUpdated: string;
  version: string;
}

interface Achievement {
  id: string;
  title: string;
  year: string;
  impact: string;
  description: string;
}

interface ActivityItem {
  id: string;
  title: string;
  category: string;
  timestamp: string;
  actor: string;
  badgeColor: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT MAIN
// ─────────────────────────────────────────────────────────────────────────────

export default function AcademicCoordinatorProfilePage() {
  const user = useSelector((s: RootState) => s.auth.user);
  const navigate = useNavigate();

  // Toast Notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  };

  // Profile Information State
  const [profile, setProfile] = useState<ProfileInfo>({
    name: user?.first_name ? `${user.first_name} ${user.last_name || ''}`.trim() : 'Dr. Ananya Roy',
    role: 'Academic Coordinator',
    employeeId: user?.id ? `EMP-AC-${user.id.substring(0, 5).toUpperCase()}` : 'EMP-AC-2026-088',
    campus: 'Main Campus - Senior Wing',
    department: 'Senior Secondary & Curriculum Governance',
    reportsTo: 'Dr. Rajesh Sharma (Principal)',
    academicSession: 'AY 2026 - 2027',
    yearsInRole: '6 Years in Academic Leadership',
    onlineStatus: true,
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300',
    email: user?.email || 'ananya.roy@eduverse.school',
    phone: '+91 98765 12340',
    officeHours: 'Mon - Fri, 08:00 AM - 04:30 PM',
    officeLocation: 'Academic Leadership Block, Office 204, Main Campus',
    qualifications: 'Ph.D. in Educational Pedagogy, M.Sc (Physics), B.Ed',
    bio: 'Academic leader committed to curriculum governance, teacher enablement, high-stakes examination oversight, and institutional academic excellence.',
  });

  // Modal States
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isDelegateOpen, setIsDelegateOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [selectedApproval, setSelectedApproval] = useState<PendingApproval | null>(null);
  const [selectedDept, setSelectedDept] = useState<SupervisedDepartment | null>(null);
  const [selectedTeacher, setSelectedTeacher] = useState<SupervisedTeacher | null>(null);
  const [selectedDoc, setSelectedDoc] = useState<AcademicDocument | null>(null);
  const [returnFeedback, setReturnFeedback] = useState('');
  const [isReturnModalOpen, setIsReturnModalOpen] = useState(false);
  const [itemToReturn, setItemToReturn] = useState<PendingApproval | null>(null);

  // Form State for Edit Profile
  const [editForm, setEditForm] = useState<ProfileInfo>(profile);

  // Filter States
  const [approvalCategory, setApprovalCategory] = useState<string>('All');
  const [teacherSearch, setTeacherSearch] = useState<string>('');
  const [teacherDeptFilter, setTeacherDeptFilter] = useState<string>('All');
  const [activityFilter] = useState<string>('All');

  // Approval Items List (Interactive)
  const [approvalsList, setApprovalsList] = useState<PendingApproval[]>([
    {
      id: 'app-01',
      title: 'Grade 10 Physics Unit 4: Optics & Refraction Lesson Plan',
      category: 'Lesson Plans',
      submittedBy: 'Dr. Vikram Malhotra',
      department: 'Science',
      submittedDate: 'Today, 09:15 AM',
      urgency: 'High',
      details: 'Comprehensive 14-period unit lesson plan with Bloom taxonomy objectives, lab experiments, and digital simulation links.'
    },
    {
      id: 'app-02',
      title: 'Grade 12 Mathematics Calculus Term-1 Question Bank (150 MCQs)',
      category: 'Question Banks',
      submittedBy: 'Mrs. Sunita Sharma',
      department: 'Mathematics',
      submittedDate: 'Today, 08:30 AM',
      urgency: 'High',
      details: 'Moderated question bank mapped against CBSE 2026 curriculum blueprint including assertion-reasoning questions.'
    },
    {
      id: 'app-03',
      title: 'Grade 11 Chemistry Mid-Term Moderated Exam Paper',
      category: 'Exam Papers',
      submittedBy: 'Dr. Vikram Malhotra',
      department: 'Science',
      submittedDate: 'Yesterday, 04:20 PM',
      urgency: 'High',
      details: 'Final blueprint and marking scheme for 70-mark theory exam paper requiring coordinator signoff before printing.'
    },
    {
      id: 'app-04',
      title: 'Grade 9 English Literature Creative Writing Project Assignment',
      category: 'Assignments',
      submittedBy: 'Mr. Robert D\'Souza',
      department: 'Languages',
      submittedDate: 'Yesterday, 02:10 PM',
      urgency: 'Medium',
      details: 'Interdisciplinary project rubric and assignment brief for Term 1 portfolio assessment.'
    },
    {
      id: 'app-05',
      title: 'Computer Science Curriculum Addition: Intro to Generative AI & Ethics',
      category: 'Curriculum Changes',
      submittedBy: 'Mr. Amit Verma',
      department: 'Computer Science',
      submittedDate: 'Aug 04, 2026',
      urgency: 'Medium',
      details: 'Proposed 6-hour elective module for Class 11 & 12 aligned with NEP 2020 AI literacy mandates.'
    },
    {
      id: 'app-06',
      title: 'Advisory Circular: Board Exam Mock Series Schedule & Guidelines',
      category: 'Academic Notices',
      submittedBy: 'Academic Cell Secretariat',
      department: 'Administration',
      submittedDate: 'Aug 03, 2026',
      urgency: 'High',
      details: 'Official notification to parents and faculty detailing test center rules, hall tickets, and mock dates.'
    },
    {
      id: 'app-07',
      title: 'Grade 10 Social Science History Pre-Board Exam Blueprint',
      category: 'Exam Papers',
      submittedBy: 'Ms. Priya Nair',
      department: 'Social Sciences',
      submittedDate: 'Aug 03, 2026',
      urgency: 'Normal',
      details: 'Sample paper and evaluation guide for Class 10 History & Civics board prep.'
    },
    {
      id: 'app-08',
      title: 'Grade 11 Biology Practical Lab Assessment Lesson Plan',
      category: 'Lesson Plans',
      submittedBy: 'Dr. Vikram Malhotra',
      department: 'Science',
      submittedDate: 'Aug 02, 2026',
      urgency: 'Normal',
      details: 'Practical lab session plan with safety compliance checklist for microscopy experiments.'
    }
  ]);

  // Handlers for Approvals
  const handleApprove = (id: string) => {
    const item = approvalsList.find(a => a.id === id);
    setApprovalsList(prev => prev.filter(a => a.id !== id));
    setSelectedApproval(null);
    showToast(`Approved: "${item?.title.substring(0, 35)}..." successfully!`);
  };

  const handleReturnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemToReturn) return;
    setApprovalsList(prev => prev.filter(a => a.id !== itemToReturn.id));
    setIsReturnModalOpen(false);
    setItemToReturn(null);
    setSelectedApproval(null);
    setReturnFeedback('');
    showToast('Item returned to author with revision feedback.');
  };

  // Handlers for Profile Save
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile(editForm);
    setIsEditProfileOpen(false);
    showToast('Academic Coordinator profile updated successfully!');
  };

  // Delegation Handler
  const [delegateTarget, setDelegateTarget] = useState('Dr. Vikram Malhotra (Science HOD)');
  const [delegateDate, setDelegateDate] = useState('2026-08-10');
  const [delegateTask, setDelegateTask] = useState('Lesson Plan Signoffs & Daily Approvals');
  const handleDelegateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDelegateOpen(false);
    showToast(`Responsibilities delegated to ${delegateTarget} through ${delegateDate}.`);
  };

  // Academic Responsibilities Data
  const responsibilities: ResponsibilityCard[] = [
    { id: 'r1', title: 'Grades Managed', value: 'Grades 9 - 12', subtitle: 'Senior High School Division', icon: <GraduationCap size={20} color="#5FAF88" />, badge: '4 Academic Levels' },
    { id: 'r2', title: 'Sections Managed', value: '24 Sections', subtitle: 'Sections A, B, C & D', icon: <Layers size={20} color="#5FAF88" />, badge: 'Active Cohorts' },
    { id: 'r3', title: 'Departments Coordinated', value: '6 Departments', subtitle: 'Science, Math, Languages, SS, CS, Comm.', icon: <Building size={20} color="#5FAF88" />, badge: 'Full Oversight' },
    { id: 'r4', title: 'Teachers Supervised', value: '48 Teachers', subtitle: 'Senior Faculty & HODs', icon: <Users size={20} color="#5FAF88" />, badge: '100% Onboarded' },
    { id: 'r5', title: 'Students Under Oversight', value: '1,420 Students', subtitle: 'Senior Wing Enrolled', icon: <UserCheck size={20} color="#5FAF88" />, badge: 'AY 2026-27' },
    { id: 'r6', title: 'Subjects Coordinated', value: '18 Subjects', subtitle: 'Core CBSE & Electives', icon: <BookOpen size={20} color="#5FAF88" />, badge: 'Curriculum Aligned' },
    { id: 'r7', title: 'Campuses Managed', value: '2 Campuses', subtitle: 'Main Campus & City Extension', icon: <MapPin size={20} color="#5FAF88" />, badge: 'Multi-Branch' },
    { id: 'r8', title: 'Current Session', value: 'AY 2026 - 2027', subtitle: 'Term 2 - Mid-Session', icon: <Calendar size={20} color="#5FAF88" />, badge: 'On Track' },
  ];

  // Academic KPI Overview Data
  const kpis: KPIMetric[] = [
    { id: 'k1', label: 'Teachers Managed', value: '48', trend: '100% Active', isPositive: true, icon: <Users size={18} color="#5FAF88" /> },
    { id: 'k2', label: 'Lesson Plans Reviewed', value: '342', target: '360 Total', trend: '+14 this week', isPositive: true, icon: <BookOpen size={18} color="#5FAF88" /> },
    { id: 'k3', label: 'Curriculum Completion', value: '88.5%', target: 'Target 85%', trend: '+3.5% ahead', isPositive: true, icon: <BarChart3 size={18} color="#5FAF88" /> },
    { id: 'k4', label: 'Academic Compliance', value: '96.8%', target: 'Audit Standard', trend: 'ISO Verified', isPositive: true, icon: <Shield size={18} color="#5FAF88" /> },
    { id: 'k5', label: 'Question Banks Approved', value: '124 Sets', trend: 'Exams Ready', isPositive: true, icon: <FileCheck size={18} color="#5FAF88" /> },
    { id: 'k6', label: 'Exam Papers Reviewed', value: '56 Papers', trend: 'Moderated', isPositive: true, icon: <FileText size={18} color="#5FAF88" /> },
    { id: 'k7', label: 'Academic Audits Conducted', value: '12 Audits', trend: 'Q3 Completed', isPositive: true, icon: <Activity size={18} color="#5FAF88" /> },
    { id: 'k8', label: 'Pending Reviews', value: approvalsList.length, trend: 'Action Needed', isPositive: false, icon: <Clock size={18} color="#F59E0B" /> },
    { id: 'k9', label: 'Notices Published', value: '24 Circulars', trend: 'Term 2 Active', isPositive: true, icon: <Bell size={18} color="#5FAF88" /> },
    { id: 'k10', label: 'Dept Meetings Conducted', value: '18 Sessions', trend: 'Minutes Filed', isPositive: true, icon: <Calendar size={18} color="#5FAF88" /> },
  ];

  // Current Academic Objectives Data
  const objectives: AcademicObjective[] = [
    { id: 'o1', title: 'Complete Syllabus before Target Date', targetDate: 'Oct 30, 2026', progress: 92, status: 'Ahead', description: 'Ensure Grade 10 & 12 Board syllabi complete 3 weeks prior to Mock Exams.' },
    { id: 'o2', title: 'Improve Student Attendance Across Senior Wing', targetDate: 'Term 2 End', progress: 93.4, status: 'On Track', description: 'Enforce daily digital attendance tracking & parent advisories for 95%+ attendance target.' },
    { id: 'o3', title: 'Increase Weekly Lesson Plan Compliance', targetDate: 'Ongoing', progress: 96, status: 'On Track', description: 'Mandate Friday HOD signoff gate for upcoming week lesson plans.' },
    { id: 'o4', title: 'Reduce Assignment Review & Grading Delays', targetDate: 'Sep 15, 2026', progress: 89, status: 'Needs Focus', description: 'Enforce 48-hour turn-around window for digital assignment feedback.' },
    { id: 'o5', title: 'Improve Board Examination Readiness Score', targetDate: 'Nov 15, 2026', progress: 85, status: 'On Track', description: 'Conduct 3 full-length Board Mock series with moderated question paper blueprints.' },
    { id: 'o6', title: 'Strengthen Academic Quality & NEP Framework', targetDate: 'Dec 2026', progress: 91, status: 'Ahead', description: 'Integrate competency-based rubrics across all senior secondary assessments.' },
  ];

  // Academic Portfolio Competencies
  const competencies: CompetencyMetric[] = [
    { id: 'c1', name: 'Curriculum Planning & Mapping', score: 96, level: 'Expert Leadership' },
    { id: 'c2', name: 'Lesson Plan Governance', score: 92, level: 'Advanced Quality' },
    { id: 'c3', name: 'Assessment & Moderation Quality', score: 94, level: 'Expert Auditor' },
    { id: 'c4', name: 'Academic Compliance & ISO Audit', score: 98, level: 'Master Controller' },
    { id: 'c5', name: 'Teacher Mentoring & Development', score: 88, level: 'Proficient Advisor' },
    { id: 'c6', name: 'Student Performance Analytics', score: 95, level: 'Expert Data Lead' },
    { id: 'c7', name: 'Pedagogical Innovation & AI Learning', score: 90, level: 'Advanced Educator' },
    { id: 'c8', name: 'Institutional Academic Oversight', score: 97, level: 'Executive Leader' },
  ];

  // Department Responsibility Data
  const supervisedDepartments: SupervisedDepartment[] = [
    { id: 'd1', name: 'Science Department', coordinator: 'Dr. Vikram Malhotra (HOD)', teachersCount: 12, classesCount: 16, curriculumProgress: 89, complianceScore: 98, riskStatus: 'Low', riskNotes: 'All syllabi on schedule. Practical labs fully audited.' },
    { id: 'd2', name: 'Mathematics Department', coordinator: 'Mrs. Sunita Sharma (HOD)', teachersCount: 10, classesCount: 14, curriculumProgress: 84, complianceScore: 94, riskStatus: 'Medium', riskNotes: 'Grade 11 Calculus unit running 4 days behind target schedule.' },
    { id: 'd3', name: 'English & World Languages', coordinator: 'Mr. Robert D\'Souza (HOD)', teachersCount: 8, classesCount: 12, curriculumProgress: 92, complianceScore: 96, riskStatus: 'Low', riskNotes: 'Creative writing rubrics integrated smoothly.' },
    { id: 'd4', name: 'Social Sciences & Humanities', coordinator: 'Ms. Priya Nair (HOD)', teachersCount: 7, classesCount: 10, curriculumProgress: 86, complianceScore: 92, riskStatus: 'Low', riskNotes: 'History & Geography projects submitted on time.' },
    { id: 'd5', name: 'Computer Science & Tech', coordinator: 'Mr. Amit Verma (HOD)', teachersCount: 6, classesCount: 8, curriculumProgress: 94, complianceScore: 99, riskStatus: 'Low', riskNotes: 'AI & Ethics elective module draft submitted for review.' },
    { id: 'd6', name: 'Commerce & Economics', coordinator: 'Dr. Meenakshi Sundaram (HOD)', teachersCount: 5, classesCount: 8, curriculumProgress: 88, complianceScore: 95, riskStatus: 'Low', riskNotes: 'Accountancy case studies completed.' }
  ];

  // Supervised Teacher Management Table Data
  const teachersList: SupervisedTeacher[] = [
    { id: 't1', name: 'Dr. Vikram Malhotra', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150', department: 'Science', classesHandled: '10A, 10B, 12A', lessonPlanStatus: 'Approved', attendanceRate: 98, syllabusProgress: 91, assessmentCompletion: 96, academicHealth: 'Excellent' },
    { id: 't2', name: 'Mrs. Sunita Sharma', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150', department: 'Mathematics', classesHandled: '9B, 10A, 11C', lessonPlanStatus: 'Pending', attendanceRate: 92, syllabusProgress: 84, assessmentCompletion: 90, academicHealth: 'Good' },
    { id: 't3', name: 'Mr. Robert D\'Souza', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150', department: 'Languages', classesHandled: '9A, 10C, 12B', lessonPlanStatus: 'Approved', attendanceRate: 96, syllabusProgress: 94, assessmentCompletion: 95, academicHealth: 'Excellent' },
    { id: 't4', name: 'Ms. Priya Nair', avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=150', department: 'Social Sciences', classesHandled: '9C, 10B, 11A', lessonPlanStatus: 'Approved', attendanceRate: 94, syllabusProgress: 88, assessmentCompletion: 92, academicHealth: 'Good' },
    { id: 't5', name: 'Mr. Amit Verma', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150', department: 'Computer Science', classesHandled: '11A, 11B, 12A, 12B', lessonPlanStatus: 'Approved', attendanceRate: 99, syllabusProgress: 96, assessmentCompletion: 98, academicHealth: 'Excellent' },
    { id: 't6', name: 'Dr. Meenakshi Sundaram', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150', department: 'Commerce', classesHandled: '11C, 12C', lessonPlanStatus: 'Late', attendanceRate: 90, syllabusProgress: 82, assessmentCompletion: 88, academicHealth: 'Needs Review' },
  ];

  // Filtered teachers list
  const filteredTeachers = teachersList.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(teacherSearch.toLowerCase()) || t.classesHandled.toLowerCase().includes(teacherSearch.toLowerCase());
    const matchesDept = teacherDeptFilter === 'All' || t.department === teacherDeptFilter;
    return matchesSearch && matchesDept;
  });

  // Academic Committees Data
  const committees: CommitteeRole[] = [
    { id: 'com-1', committeeName: 'Curriculum Governance Committee', role: 'Chairperson', frequency: 'Bi-Weekly', membersCount: 8, activeFocus: 'NEP 2020 Competency Integration' },
    { id: 'com-2', committeeName: 'Assessment & Moderation Board', role: 'Lead Convener', frequency: 'Weekly', membersCount: 12, activeFocus: 'Mid-Term Exam Blueprint Standardization' },
    { id: 'com-3', committeeName: 'Board Examination Cell', role: 'Chief Controller', frequency: 'As Scheduled', membersCount: 6, activeFocus: 'CBSE Class 10 & 12 Registration Verification' },
    { id: 'com-4', committeeName: 'Academic Planning & Quality Committee', role: 'Member Secretary', frequency: 'Monthly', membersCount: 10, activeFocus: 'ISO 9001 Quality Audit Prep' },
    { id: 'com-5', committeeName: 'PTM & Parent Advisory Board', role: 'Executive Advisor', frequency: 'Quarterly', membersCount: 14, activeFocus: 'Parent Academic Progress Digest' },
    { id: 'com-6', committeeName: 'School Improvement Committee', role: 'Quality Lead', frequency: 'Bi-Weekly', membersCount: 9, activeFocus: 'Digital Classroom Infrastructure' },
    { id: 'com-7', committeeName: 'Professional Development Committee', role: 'Coordinator', frequency: 'Monthly', membersCount: 7, activeFocus: 'Faculty AI Pedagogy Workshops' },
  ];

  // Calendar Responsibility Timeline Data
  const calendarEvents: CalendarResponsibility[] = [
    { id: 'cal-1', title: 'Weekly HOD Curriculum & Syllabus Sync', type: 'Curriculum Reviews', dueDate: 'Aug 10, 2026', time: '09:30 AM - 10:30 AM', location: 'Conference Room B', status: 'Scheduled' },
    { id: 'cal-2', title: 'Departmental Review: Mathematics & Science', type: 'Department Meetings', dueDate: 'Aug 12, 2026', time: '02:00 PM - 03:30 PM', location: 'Academic Leadership Office', status: 'Scheduled' },
    { id: 'cal-3', title: 'Term-1 Parent-Teacher Meeting Oversight', type: 'PTMs', dueDate: 'Aug 18, 2026', time: '08:30 AM - 01:30 PM', location: 'Main Auditorium', status: 'Upcoming' },
    { id: 'cal-4', title: 'Board Mock Examination Question Moderation', type: 'Exam Planning', dueDate: 'Aug 22, 2026', time: '11:00 AM - 01:00 PM', location: 'Exam Control Cell', status: 'Upcoming' },
    { id: 'cal-5', title: 'Internal ISO Academic Quality Audit', type: 'Academic Audits', dueDate: 'Aug 25, 2026', time: '09:00 AM - 04:00 PM', location: 'All Senior Departments', status: 'Upcoming' },
    { id: 'cal-6', title: 'Faculty Pedagogy Workshop: AI Tools in Education', type: 'Teacher Workshops', dueDate: 'Aug 28, 2026', time: '03:00 PM - 04:30 PM', location: 'AV Seminar Hall', status: 'Upcoming' },
    { id: 'cal-7', title: 'Term-2 Unit Plan Signoff & Compliance Review', type: 'Lesson Plan Reviews', dueDate: 'Sep 01, 2026', time: '10:00 AM - 01:00 PM', location: 'Coordinator Desk', status: 'Upcoming' },
  ];

  // Academic Documents Data
  const academicDocs: AcademicDocument[] = [
    { id: 'doc-1', title: 'Academic Calendar AY 2026-2027', category: 'Calendar', format: 'PDF', size: '2.4 MB', lastUpdated: 'Jul 15, 2026', version: 'v3.2' },
    { id: 'doc-2', title: 'Curriculum Framework & Syllabus Standards', category: 'Curriculum', format: 'PDF', size: '4.1 MB', lastUpdated: 'Jun 28, 2026', version: 'v2.0' },
    { id: 'doc-3', title: 'Academic Quality Standard & Policy Handbook', category: 'Policy', format: 'PDF', size: '3.8 MB', lastUpdated: 'Jun 10, 2026', version: 'v4.1' },
    { id: 'doc-4', title: 'Standardized Lesson Plan & Bloom Taxonomy Template', category: 'Templates', format: 'DOCX', size: '850 KB', lastUpdated: 'Jul 01, 2026', version: 'v1.5' },
    { id: 'doc-5', title: 'Assessment & Moderation Guidelines', category: 'Assessment', format: 'PDF', size: '1.9 MB', lastUpdated: 'May 20, 2026', version: 'v2.3' },
    { id: 'doc-6', title: 'CBSE Board Circular Compliance Digest 2026', category: 'Circulars', format: 'PDF', size: '1.2 MB', lastUpdated: 'Aug 01, 2026', version: 'v1.0' },
    { id: 'doc-7', title: 'Departmental Standard Operating Procedures (SOP)', category: 'SOPs', format: 'PDF', size: '2.8 MB', lastUpdated: 'Jun 05, 2026', version: 'v3.0' },
    { id: 'doc-8', title: 'Senior Faculty Governance & Mentorship Handbook', category: 'Handbook', format: 'PDF', size: '3.2 MB', lastUpdated: 'Jul 20, 2026', version: 'v2.1' },
    { id: 'doc-9', title: 'Question Paper Blueprint Moderation Template', category: 'Templates', format: 'DOCX', size: '940 KB', lastUpdated: 'Jul 12, 2026', version: 'v1.8' },
  ];

  // Academic Achievements Data
  const achievements: Achievement[] = [
    { id: 'ach-1', title: 'Successfully Implemented NEP 2020 Curriculum', year: '2025 - 2026', impact: '100% Competency Coverage', description: 'Transformed senior secondary curriculum with competency-based learning modules adopted across all 6 departments.' },
    { id: 'ach-2', title: 'Improved CBSE Class 12 Board Pass Percentage', year: '2026', impact: '99.4% Pass Rate (42% Distinction)', description: 'Led strategic academic intervention program resulting in highest historical board examination scores for the campus.' },
    { id: 'ach-3', title: 'Eliminated Syllabus Delays Across Senior Wing', year: '2025', impact: 'Zero Syllabus Lag', description: 'Pioneered real-time digital syllabus tracking system that ensured all subjects completed syllabus 3 weeks before exams.' },
    { id: 'ach-4', title: 'Completed Institutional ISO Quality Audit', year: '2026', impact: '98.4% Compliance Score', description: 'Headed internal quality team resulting in top-tier accreditation rating from the National Academic Audit Council.' },
    { id: 'ach-5', title: 'Introduced Digital Lesson Governance Workflow', year: '2025', impact: '6-Hour Turnaround Time', description: 'Digitized lesson plan submission and HOD signoff gates, reducing review latency from 5 days to under 6 hours.' },
    { id: 'ach-6', title: 'Established Unified Assessment Quality Standard', year: '2026', impact: 'Standardized Exam Blueprint', description: 'Developed standardized moderation rubrics and question paper templates now utilized across 6 campus branches.' }
  ];

  // Recent Academic Activities Data
  const activities: ActivityItem[] = [
    { id: 'act-1', title: 'Approved Grade 11 Physics Term-1 Lesson Plan', category: 'Approvals', timestamp: '10 mins ago', actor: 'Dr. Ananya Roy', badgeColor: '#10B981' },
    { id: 'act-2', title: 'Published Master Timetable for Q3 AY 2026-27', category: 'Timetable', timestamp: '2 hours ago', actor: 'Dr. Ananya Roy', badgeColor: '#3B82F6' },
    { id: 'act-3', title: 'Conducted Curriculum Review with Science HOD', category: 'Curriculum', timestamp: 'Yesterday, 03:30 PM', actor: 'Dr. Ananya Roy', badgeColor: '#8B5CF6' },
    { id: 'act-4', title: 'Approved Grade 10 Mathematics Board Mock Exam Paper', category: 'Approvals', timestamp: 'Yesterday, 11:15 AM', actor: 'Dr. Ananya Roy', badgeColor: '#10B981' },
    { id: 'act-5', title: 'Chaired Monthly Academic Planning Committee Session', category: 'Meetings', timestamp: 'Aug 04, 2026', actor: 'Dr. Ananya Roy', badgeColor: '#F59E0B' },
    { id: 'act-6', title: 'Published Parent Advisory Notice on Mid-Term Exams', category: 'Notices', timestamp: 'Aug 03, 2026', actor: 'Dr. Ananya Roy', badgeColor: '#EC4899' },
    { id: 'act-7', title: 'Mentored 4 New Senior Faculty Members on Pedagogy', category: 'Mentoring', timestamp: 'Aug 02, 2026', actor: 'Dr. Ananya Roy', badgeColor: '#6366F1' },
    { id: 'act-8', title: 'Completed Quarterly Academic Quality Audit for Humanities', category: 'Audits', timestamp: 'Jul 30, 2026', actor: 'Dr. Ananya Roy', badgeColor: '#14B8A6' }
  ];

  const filteredActivities = activityFilter === 'All' 
    ? activities 
    : activities.filter(a => a.category.toLowerCase() === activityFilter.toLowerCase());

  // Filtered approvals list by tab
  const filteredApprovals = approvalCategory === 'All'
    ? approvalsList
    : approvalsList.filter(a => a.category === approvalCategory);

  return (
    <div style={{
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      background: '#F8FAFC',
      color: '#0F172A',
      minHeight: '100vh',
      padding: '16px 20px 60px',
      maxWidth: 1440,
      margin: '0 auto',
      boxSizing: 'border-box',
    }}>
      
      {/* ─────────────────────────────────────────────────────────────────────────────
          TOAST NOTIFICATION
         ───────────────────────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            style={{
              position: 'fixed',
              top: 24,
              right: 24,
              background: '#5FAF88',
              color: '#FFFFFF',
              padding: '12px 20px',
              borderRadius: 12,
              boxShadow: '0 10px 30px rgba(95, 175, 136, 0.35)',
              fontWeight: 600,
              fontSize: 14,
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <CheckCircle2 size={18} />
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Back Navigation Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <button
          onClick={() => navigate('/dashboard')}
          style={{
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            color: '#334155',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: 13,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '8px 16px',
            borderRadius: 10,
            boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
            transition: 'all 0.2s ease',
          }}
        >
          <ArrowLeft size={16} /> Back to Academic Dashboard
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{
            background: 'rgba(95, 175, 136, 0.12)',
            color: '#3B7E5E',
            fontSize: 12,
            fontWeight: 700,
            padding: '4px 12px',
            borderRadius: 20,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6
          }}>
            <Shield size={13} color="#5FAF88" /> Executive Academic Workspace
          </span>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────────────────
          1. PROFILE HEADER (Production-Grade EduVerse Glassmorphic Banner)
         ───────────────────────────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        style={{
          background: 'linear-gradient(135deg, #FFFFFF 0%, #F4FAF6 100%)',
          border: '1px solid rgba(95, 175, 136, 0.25)',
          borderRadius: 20,
          padding: '24px 28px',
          boxShadow: '0 10px 30px -5px rgba(95, 175, 136, 0.08), 0 4px 12px rgba(0,0,0,0.02)',
          position: 'relative',
          overflow: 'hidden',
          marginBottom: 24,
        }}
      >
        {/* Subtle Decorative Background Accent */}
        <div style={{
          position: 'absolute',
          top: -40,
          right: -40,
          width: 220,
          height: 220,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(95, 175, 136, 0.12) 0%, rgba(255,255,255,0) 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
          position: 'relative',
          zIndex: 1,
        }}>
          {/* Main Header Info Row */}
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 20,
          }}>
            {/* Profile Avatar & Primary Titles */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, flex: 1, minWidth: 280 }}>
              <div style={{ position: 'relative', flexShrink: 0 }}>
                <img
                  src={profile.avatarUrl}
                  alt={profile.name}
                  style={{
                    width: 96,
                    height: 96,
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '4px solid #FFFFFF',
                    boxShadow: '0 8px 24px rgba(95, 175, 136, 0.25)',
                  }}
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                {/* EduVerse Green Pulsing Online Status Badge */}
                <div style={{
                  position: 'absolute',
                  bottom: 4,
                  right: 4,
                  width: 16,
                  height: 16,
                  borderRadius: '50%',
                  background: '#5FAF88',
                  border: '3px solid #FFFFFF',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                }} title="Active Online" />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                  <h1 style={{
                    fontSize: 26,
                    fontWeight: 800,
                    color: '#0F172A',
                    margin: 0,
                    letterSpacing: '-0.02em',
                  }}>
                    {profile.name}
                  </h1>
                  <span style={{
                    background: '#5FAF88',
                    color: '#FFFFFF',
                    borderRadius: 20,
                    padding: '3px 10px',
                    fontSize: 12,
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 5,
                    boxShadow: '0 2px 8px rgba(95, 175, 136, 0.3)',
                  }}>
                    <CheckCircle2 size={13} /> {profile.role}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 13, color: '#475569', fontWeight: 600, flexWrap: 'wrap' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <Briefcase size={14} color="#5FAF88" /> {profile.department}
                  </span>
                  <span style={{ color: '#CBD5E1' }}>•</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <MapPin size={14} color="#5FAF88" /> {profile.campus}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 12, color: '#64748B', marginTop: 2, flexWrap: 'wrap' }}>
                  <span>Reports To: <strong style={{ color: '#1E293B' }}>{profile.reportsTo}</strong></span>
                  <span style={{ color: '#CBD5E1' }}>•</span>
                  <span>Employee ID: <strong style={{ color: '#1E293B' }}>{profile.employeeId}</strong></span>
                  <span style={{ color: '#CBD5E1' }}>•</span>
                  <span>Session: <strong style={{ color: '#3B7E5E' }}>{profile.academicSession}</strong></span>
                </div>
              </div>
            </div>

            {/* Quick Actions Bar */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              flexWrap: 'wrap',
            }}>
              <button
                onClick={() => { setEditForm(profile); setIsEditProfileOpen(true); }}
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #CBD5E1',
                  color: '#1E293B',
                  borderRadius: 10,
                  padding: '9px 16px',
                  fontWeight: 600,
                  fontSize: 13,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 7,
                  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                  transition: 'all 0.2s',
                }}
              >
                <Edit size={15} color="#5FAF88" /> Edit Profile
              </button>

              <button
                onClick={() => setIsCalendarOpen(true)}
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #CBD5E1',
                  color: '#1E293B',
                  borderRadius: 10,
                  padding: '9px 16px',
                  fontWeight: 600,
                  fontSize: 13,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 7,
                  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                  transition: 'all 0.2s',
                }}
              >
                <Calendar size={15} color="#5FAF88" /> View Calendar
              </button>

              <button
                onClick={() => setIsDelegateOpen(true)}
                style={{
                  background: 'rgba(95, 175, 136, 0.12)',
                  border: '1px solid rgba(95, 175, 136, 0.3)',
                  color: '#3B7E5E',
                  borderRadius: 10,
                  padding: '9px 16px',
                  fontWeight: 700,
                  fontSize: 13,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 7,
                  transition: 'all 0.2s',
                }}
              >
                <UserCheck size={15} color="#5FAF88" /> Delegate Responsibilities
              </button>

              <button
                onClick={() => showToast('Downloading Academic Coordinator Executive Profile (PDF)...')}
                style={{
                  background: '#5FAF88',
                  border: 'none',
                  color: '#FFFFFF',
                  borderRadius: 10,
                  padding: '9px 16px',
                  fontWeight: 700,
                  fontSize: 13,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 7,
                  boxShadow: '0 4px 12px rgba(95, 175, 136, 0.3)',
                  transition: 'all 0.2s',
                }}
              >
                <Download size={15} /> Download Profile
              </button>

              <button
                onClick={() => setIsShareOpen(true)}
                title="Share Profile"
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #CBD5E1',
                  color: '#475569',
                  borderRadius: 10,
                  width: 38,
                  height: 38,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <Share2 size={16} />
              </button>
            </div>
          </div>

          {/* Quick Profile Summary Bar */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 12,
            paddingTop: 16,
            borderTop: '1px solid rgba(95, 175, 136, 0.18)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 34, height: 34, borderRadius: 8, background: 'rgba(95, 175, 136, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Clock size={17} color="#5FAF88" />
              </div>
              <div>
                <div style={{ fontSize: 11, color: '#64748B', fontWeight: 600 }}>TENURE IN ROLE</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>{profile.yearsInRole}</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 34, height: 34, borderRadius: 8, background: 'rgba(95, 175, 136, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Mail size={17} color="#5FAF88" />
              </div>
              <div>
                <div style={{ fontSize: 11, color: '#64748B', fontWeight: 600 }}>OFFICIAL EMAIL</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>{profile.email}</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 34, height: 34, borderRadius: 8, background: 'rgba(95, 175, 136, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Phone size={17} color="#5FAF88" />
              </div>
              <div>
                <div style={{ fontSize: 11, color: '#64748B', fontWeight: 600 }}>DIRECT EXTENSION</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>{profile.phone}</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 34, height: 34, borderRadius: 8, background: 'rgba(95, 175, 136, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <GraduationCap size={17} color="#5FAF88" />
              </div>
              <div>
                <div style={{ fontSize: 11, color: '#64748B', fontWeight: 600 }}>QUALIFICATIONS</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>{profile.qualifications}</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ─────────────────────────────────────────────────────────────────────────────
          MAIN CONTENT LAYOUT (2 Columns: Main Content 70% + Sticky Sidebar 30%)
         ───────────────────────────────────────────────────────────────────────────── */}
      <div className="academic-main-grid">
        
        {/* LEFT COLUMN MAIN CONTENT */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

          {/* ─────────────────────────────────────────────────────────────────────────
              2. ACADEMIC RESPONSIBILITIES (Ownership Cards Grid)
             ───────────────────────────────────────────────────────────────────────── */}
          <section>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 28, height: 28, borderRadius: 6, background: '#5FAF88', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF' }}>
                  <Layers size={16} />
                </div>
                <h2 style={{ fontSize: 18, fontWeight: 800, color: '#0F172A', margin: 0 }}>
                  Academic Responsibilities & Scope
                </h2>
              </div>
              <span style={{ fontSize: 12, color: '#64748B', fontWeight: 600 }}>Institutional Ownership</span>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
              gap: 14,
            }}>
              {responsibilities.map((r, idx) => (
                <motion.div
                  key={r.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.04 }}
                  whileHover={{ y: -3, boxShadow: '0 8px 20px rgba(95, 175, 136, 0.12)' }}
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    borderRadius: 14,
                    padding: '16px 18px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: 10,
                    boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      background: 'rgba(95, 175, 136, 0.12)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      {r.icon}
                    </div>
                    <span style={{
                      fontSize: 10,
                      fontWeight: 700,
                      color: '#3B7E5E',
                      background: 'rgba(95, 175, 136, 0.12)',
                      padding: '2px 8px',
                      borderRadius: 12,
                    }}>
                      {r.badge}
                    </span>
                  </div>

                  <div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: '#64748B', marginBottom: 2 }}>{r.title}</div>
                    <div style={{ fontSize: 18, fontWeight: 800, color: '#0F172A' }}>{r.value}</div>
                    <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 2 }}>{r.subtitle}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* ─────────────────────────────────────────────────────────────────────────
              3. ACADEMIC KPI OVERVIEW
             ───────────────────────────────────────────────────────────────────────── */}
          <section style={{
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: 18,
            padding: 20,
            boxShadow: '0 4px 14px rgba(0,0,0,0.02)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <BarChart3 size={20} color="#5FAF88" />
                <h2 style={{ fontSize: 18, fontWeight: 800, color: '#0F172A', margin: 0 }}>
                  Academic KPI Overview
                </h2>
              </div>
              <span style={{ fontSize: 12, color: '#5FAF88', fontWeight: 700, background: 'rgba(95, 175, 136, 0.12)', padding: '4px 10px', borderRadius: 12 }}>
                AY 2026-27 Live Operational Metrics
              </span>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))',
              gap: 12,
            }}>
              {kpis.map(kpi => (
                <div
                  key={kpi.id}
                  style={{
                    background: '#F8FAFC',
                    border: '1px solid #F1F5F9',
                    borderRadius: 12,
                    padding: 14,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 6,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: '#64748B' }}>{kpi.label}</span>
                    {kpi.icon}
                  </div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: '#0F172A' }}>{kpi.value}</div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 11 }}>
                    <span style={{ color: kpi.isPositive ? '#3B7E5E' : '#D97706', fontWeight: 700 }}>{kpi.trend}</span>
                    {kpi.target && <span style={{ color: '#94A3B8' }}>{kpi.target}</span>}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ─────────────────────────────────────────────────────────────────────────
              4. CURRENT ACADEMIC OBJECTIVES (Strategic Goals with Progress Bars)
             ───────────────────────────────────────────────────────────────────────── */}
          <section style={{
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: 18,
            padding: 20,
            boxShadow: '0 4px 14px rgba(0,0,0,0.02)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Target size={20} color="#5FAF88" />
                <h2 style={{ fontSize: 18, fontWeight: 800, color: '#0F172A', margin: 0 }}>
                  Current Strategic Academic Objectives
                </h2>
              </div>
              <span style={{ fontSize: 12, color: '#64748B', fontWeight: 600 }}>Term 2 Key Deliverables</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {objectives.map(obj => (
                <div
                  key={obj.id}
                  style={{
                    background: '#F8FAFC',
                    border: '1px solid #E2E8F0',
                    borderRadius: 12,
                    padding: 16,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                    <div style={{ fontWeight: 700, fontSize: 14, color: '#0F172A' }}>{obj.title}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{
                        fontSize: 11,
                        fontWeight: 700,
                        padding: '2px 8px',
                        borderRadius: 10,
                        background: obj.status === 'Ahead' ? 'rgba(95, 175, 136, 0.15)' : 'rgba(59, 130, 246, 0.12)',
                        color: obj.status === 'Ahead' ? '#3B7E5E' : '#2563EB',
                      }}>
                        {obj.status}
                      </span>
                      <span style={{ fontSize: 12, fontWeight: 800, color: '#3B7E5E' }}>{obj.progress}%</span>
                    </div>
                  </div>

                  <p style={{ margin: '0 0 10px 0', fontSize: 12, color: '#64748B', lineHeight: 1.5 }}>
                    {obj.description}
                  </p>

                  {/* Animated Progress Bar */}
                  <div style={{
                    width: '100%',
                    height: 8,
                    background: '#E2E8F0',
                    borderRadius: 4,
                    overflow: 'hidden',
                  }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${obj.progress}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      style={{
                        height: '100%',
                        background: 'linear-gradient(90deg, #5FAF88 0%, #3B7E5E 100%)',
                        borderRadius: 4,
                      }}
                    />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#94A3B8', marginTop: 6 }}>
                    <span>Target Date: {obj.targetDate}</span>
                    <span>Completion Status: {obj.progress}% Achieved</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ─────────────────────────────────────────────────────────────────────────
              5. ACADEMIC PORTFOLIO (Professional Competency Metrics)
             ───────────────────────────────────────────────────────────────────────── */}
          <section style={{
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: 18,
            padding: 20,
            boxShadow: '0 4px 14px rgba(0,0,0,0.02)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Award size={20} color="#5FAF88" />
                <h2 style={{ fontSize: 18, fontWeight: 800, color: '#0F172A', margin: 0 }}>
                  Academic Portfolio & Competency Metrics
                </h2>
              </div>
              <span style={{ fontSize: 12, color: '#5FAF88', fontWeight: 700 }}>Verified Audit Score: 94.5%</span>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: 14,
            }}>
              {competencies.map(comp => (
                <div
                  key={comp.id}
                  style={{
                    background: '#F8FAFC',
                    border: '1px solid #F1F5F9',
                    borderRadius: 12,
                    padding: 14,
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: '#1E293B' }}>{comp.name}</span>
                    <span style={{ fontSize: 12, fontWeight: 800, color: '#3B7E5E' }}>{comp.score}%</span>
                  </div>
                  <div style={{ fontSize: 11, color: '#64748B', marginBottom: 8 }}>{comp.level}</div>
                  
                  <div style={{ width: '100%', height: 6, background: '#E2E8F0', borderRadius: 3, overflow: 'hidden' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${comp.score}%` }}
                      transition={{ duration: 0.7 }}
                      style={{ height: '100%', background: '#5FAF88', borderRadius: 3 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ─────────────────────────────────────────────────────────────────────────
              6. PENDING APPROVAL CENTER (Interactive Dashboard)
             ───────────────────────────────────────────────────────────────────────── */}
          <section id="pending-approval-center" style={{
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: 18,
            padding: 20,
            boxShadow: '0 4px 14px rgba(0,0,0,0.02)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <FileCheck size={20} color="#5FAF88" />
                <div>
                  <h2 style={{ fontSize: 18, fontWeight: 800, color: '#0F172A', margin: 0 }}>
                    Pending Approval Center
                  </h2>
                  <p style={{ margin: 0, fontSize: 12, color: '#64748B' }}>
                    Signoff gate for lesson plans, exam papers, question banks, and circulars
                  </p>
                </div>
              </div>
              <span style={{
                background: approvalsList.length > 0 ? '#FEF3C7' : '#DCFCE7',
                color: approvalsList.length > 0 ? '#B45309' : '#15803D',
                fontWeight: 700,
                fontSize: 12,
                padding: '4px 12px',
                borderRadius: 20,
              }}>
                {approvalsList.length} Items Awaiting Signoff
              </span>
            </div>

            {/* Approval Filter Tabs */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              overflowX: 'auto',
              paddingBottom: 8,
              marginBottom: 16,
              borderBottom: '1px solid #F1F5F9',
            }}>
              {['All', 'Lesson Plans', 'Question Banks', 'Exam Papers', 'Assignments', 'Curriculum Changes', 'Academic Notices'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setApprovalCategory(cat)}
                  style={{
                    background: approvalCategory === cat ? '#5FAF88' : '#F1F5F9',
                    color: approvalCategory === cat ? '#FFFFFF' : '#475569',
                    border: 'none',
                    borderRadius: 20,
                    padding: '6px 14px',
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.2s',
                  }}
                >
                  {cat} {cat === 'All' ? `(${approvalsList.length})` : ''}
                </button>
              ))}
            </div>

            {/* Approval Items List */}
            {filteredApprovals.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 20px', color: '#64748B' }}>
                <CheckCircle2 size={40} color="#5FAF88" style={{ marginBottom: 10, opacity: 0.8 }} />
                <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>No Pending Approvals</h3>
                <p style={{ margin: '4px 0 0 0', fontSize: 13 }}>All items in this category have been reviewed and signed off.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {filteredApprovals.map(app => (
                  <motion.div
                    key={app.id}
                    layout
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    style={{
                      background: '#F8FAFC',
                      border: '1px solid #E2E8F0',
                      borderRadius: 14,
                      padding: 16,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 10,
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 4 }}>
                          <span style={{
                            background: 'rgba(95, 175, 136, 0.15)',
                            color: '#3B7E5E',
                            fontSize: 11,
                            fontWeight: 700,
                            padding: '2px 8px',
                            borderRadius: 6,
                          }}>
                            {app.category}
                          </span>
                          <span style={{
                            background: app.urgency === 'High' ? '#FEE2E2' : '#F1F5F9',
                            color: app.urgency === 'High' ? '#DC2626' : '#475569',
                            fontSize: 11,
                            fontWeight: 700,
                            padding: '2px 8px',
                            borderRadius: 6,
                          }}>
                            {app.urgency} Priority
                          </span>
                          <span style={{ fontSize: 12, color: '#64748B' }}>
                            Dept: <strong style={{ color: '#0F172A' }}>{app.department}</strong>
                          </span>
                        </div>
                        <h4 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: '#0F172A' }}>
                          {app.title}
                        </h4>
                        <div style={{ fontSize: 12, color: '#64748B', marginTop: 4 }}>
                          Submitted by <strong style={{ color: '#334155' }}>{app.submittedBy}</strong> • {app.submittedDate}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                        <button
                          onClick={() => setSelectedApproval(app)}
                          style={{
                            background: '#FFFFFF',
                            border: '1px solid #CBD5E1',
                            color: '#334155',
                            padding: '7px 12px',
                            borderRadius: 8,
                            fontSize: 12,
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 5,
                          }}
                        >
                          <Eye size={14} /> Review
                        </button>

                        <button
                          onClick={() => { setItemToReturn(app); setIsReturnModalOpen(true); }}
                          style={{
                            background: '#FEF2F2',
                            border: '1px solid #FCA5A5',
                            color: '#DC2626',
                            padding: '7px 12px',
                            borderRadius: 8,
                            fontSize: 12,
                            fontWeight: 600,
                            cursor: 'pointer',
                          }}
                        >
                          Return
                        </button>

                        <button
                          onClick={() => handleApprove(app.id)}
                          style={{
                            background: '#5FAF88',
                            border: 'none',
                            color: '#FFFFFF',
                            padding: '7px 14px',
                            borderRadius: 8,
                            fontSize: 12,
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 5,
                            boxShadow: '0 2px 6px rgba(95, 175, 136, 0.3)',
                          }}
                        >
                          <Check size={14} /> Approve
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </section>

          {/* ─────────────────────────────────────────────────────────────────────────
              7. DEPARTMENT RESPONSIBILITY
             ───────────────────────────────────────────────────────────────────────── */}
          <section style={{
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: 18,
            padding: 20,
            boxShadow: '0 4px 14px rgba(0,0,0,0.02)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Building size={20} color="#5FAF88" />
                <h2 style={{ fontSize: 18, fontWeight: 800, color: '#0F172A', margin: 0 }}>
                  Supervised Departments Governance
                </h2>
              </div>
              <span style={{ fontSize: 12, color: '#64748B', fontWeight: 600 }}>6 Academic Departments</span>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: 14,
            }}>
              {supervisedDepartments.map(dept => (
                <div
                  key={dept.id}
                  style={{
                    background: '#F8FAFC',
                    border: '1px solid #E2E8F0',
                    borderRadius: 14,
                    padding: 16,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: 12,
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                      <h4 style={{ margin: 0, fontSize: 15, fontWeight: 800, color: '#0F172A' }}>
                        {dept.name}
                      </h4>
                      <span style={{
                        fontSize: 10,
                        fontWeight: 700,
                        padding: '2px 8px',
                        borderRadius: 10,
                        background: dept.riskStatus === 'Low' ? 'rgba(95, 175, 136, 0.15)' : '#FEF3C7',
                        color: dept.riskStatus === 'Low' ? '#3B7E5E' : '#B45309',
                      }}>
                        {dept.riskStatus} Risk
                      </span>
                    </div>

                    <div style={{ fontSize: 12, color: '#64748B', marginBottom: 10 }}>
                      Coordinator: <strong style={{ color: '#1E293B' }}>{dept.coordinator}</strong>
                    </div>

                    <div style={{ display: 'flex', gap: 16, fontSize: 12, color: '#475569', marginBottom: 10 }}>
                      <span><strong>{dept.teachersCount}</strong> Faculty</span>
                      <span><strong>{dept.classesCount}</strong> Sections</span>
                    </div>

                    {/* Progress */}
                    <div style={{ marginBottom: 6 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 4 }}>
                        <span style={{ color: '#64748B' }}>Curriculum Progress</span>
                        <span style={{ fontWeight: 700, color: '#3B7E5E' }}>{dept.curriculumProgress}%</span>
                      </div>
                      <div style={{ height: 6, background: '#E2E8F0', borderRadius: 3, overflow: 'hidden' }}>
                        <div style={{ width: `${dept.curriculumProgress}%`, height: '100%', background: '#5FAF88' }} />
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedDept(dept)}
                    style={{
                      background: '#FFFFFF',
                      border: '1px solid #CBD5E1',
                      color: '#334155',
                      borderRadius: 8,
                      padding: '7px 12px',
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 6,
                    }}
                  >
                    View Department Details <ChevronRight size={14} />
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* ─────────────────────────────────────────────────────────────────────────
              8. TEACHER MANAGEMENT TABLE
             ───────────────────────────────────────────────────────────────────────── */}
          <section style={{
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: 18,
            padding: 20,
            boxShadow: '0 4px 14px rgba(0,0,0,0.02)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Users size={20} color="#5FAF88" />
                <h2 style={{ fontSize: 18, fontWeight: 800, color: '#0F172A', margin: 0 }}>
                  Teacher Management & Academic Compliance
                </h2>
              </div>

              {/* Search and Dept Filter */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                <div style={{ position: 'relative' }}>
                  <Search size={14} color="#94A3B8" style={{ position: 'absolute', left: 10, top: 10 }} />
                  <input
                    type="text"
                    placeholder="Search teacher..."
                    value={teacherSearch}
                    onChange={(e) => setTeacherSearch(e.target.value)}
                    style={{
                      padding: '7px 12px 7px 30px',
                      border: '1px solid #CBD5E1',
                      borderRadius: 8,
                      fontSize: 12,
                      width: 160,
                      outline: 'none',
                    }}
                  />
                </div>

                <select
                  value={teacherDeptFilter}
                  onChange={(e) => setTeacherDeptFilter(e.target.value)}
                  style={{
                    padding: '7px 12px',
                    border: '1px solid #CBD5E1',
                    borderRadius: 8,
                    fontSize: 12,
                    background: '#FFFFFF',
                    cursor: 'pointer',
                  }}
                >
                  <option value="All">All Departments</option>
                  <option value="Science">Science</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Languages">Languages</option>
                  <option value="Social Sciences">Social Sciences</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Commerce">Commerce</option>
                </select>
              </div>
            </div>

            {/* Table */}
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: '#F8FAFC', borderBottom: '2px solid #E2E8F0', color: '#475569', fontSize: 12, fontWeight: 700 }}>
                    <th style={{ padding: '10px 12px' }}>Teacher</th>
                    <th style={{ padding: '10px 12px' }}>Department</th>
                    <th style={{ padding: '10px 12px' }}>Classes</th>
                    <th style={{ padding: '10px 12px' }}>Lesson Plan</th>
                    <th style={{ padding: '10px 12px' }}>Attendance %</th>
                    <th style={{ padding: '10px 12px' }}>Syllabus %</th>
                    <th style={{ padding: '10px 12px' }}>Academic Health</th>
                    <th style={{ padding: '10px 12px', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTeachers.map(t => (
                    <tr key={t.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                      <td style={{ padding: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <img src={t.avatar} alt={t.name} style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover' }} />
                          <span style={{ fontWeight: 700, color: '#0F172A' }}>{t.name}</span>
                        </div>
                      </td>
                      <td style={{ padding: '12px', color: '#475569' }}>{t.department}</td>
                      <td style={{ padding: '12px', color: '#64748B', fontWeight: 600 }}>{t.classesHandled}</td>
                      <td style={{ padding: '12px' }}>
                        <span style={{
                          fontSize: 11,
                          fontWeight: 700,
                          padding: '3px 8px',
                          borderRadius: 6,
                          background: t.lessonPlanStatus === 'Approved' ? 'rgba(95, 175, 136, 0.15)' : t.lessonPlanStatus === 'Pending' ? '#FEF3C7' : '#FEE2E2',
                          color: t.lessonPlanStatus === 'Approved' ? '#3B7E5E' : t.lessonPlanStatus === 'Pending' ? '#B45309' : '#DC2626',
                        }}>
                          {t.lessonPlanStatus}
                        </span>
                      </td>
                      <td style={{ padding: '12px', fontWeight: 700, color: '#0F172A' }}>{t.attendanceRate}%</td>
                      <td style={{ padding: '12px', fontWeight: 700, color: '#3B7E5E' }}>{t.syllabusProgress}%</td>
                      <td style={{ padding: '12px' }}>
                        <span style={{
                          fontSize: 11,
                          fontWeight: 700,
                          padding: '3px 8px',
                          borderRadius: 6,
                          background: t.academicHealth === 'Excellent' ? '#DCFCE7' : t.academicHealth === 'Good' ? '#DBEAFE' : '#FEF3C7',
                          color: t.academicHealth === 'Excellent' ? '#15803D' : t.academicHealth === 'Good' ? '#1D4ED8' : '#B45309',
                        }}>
                          {t.academicHealth}
                        </span>
                      </td>
                      <td style={{ padding: '12px', textAlign: 'right' }}>
                        <button
                          onClick={() => setSelectedTeacher(t)}
                          style={{
                            background: '#FFFFFF',
                            border: '1px solid #CBD5E1',
                            color: '#334155',
                            borderRadius: 6,
                            padding: '4px 10px',
                            fontSize: 12,
                            fontWeight: 600,
                            cursor: 'pointer',
                          }}
                        >
                          View Teacher
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* ─────────────────────────────────────────────────────────────────────────
              9. ACADEMIC COMMITTEES & LEADERSHIP ROLES
             ───────────────────────────────────────────────────────────────────────── */}
          <section style={{
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: 18,
            padding: 20,
            boxShadow: '0 4px 14px rgba(0,0,0,0.02)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Shield size={20} color="#5FAF88" />
                <h2 style={{ fontSize: 18, fontWeight: 800, color: '#0F172A', margin: 0 }}>
                  Academic Committees & Governance Leadership
                </h2>
              </div>
              <span style={{ fontSize: 12, color: '#64748B', fontWeight: 600 }}>7 Active Committees</span>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: 12,
            }}>
              {committees.map(com => (
                <div
                  key={com.id}
                  style={{
                    background: '#F8FAFC',
                    border: '1px solid #E2E8F0',
                    borderRadius: 12,
                    padding: 14,
                  }}
                >
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#0F172A', marginBottom: 4 }}>
                    {com.committeeName}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: '#3B7E5E', background: 'rgba(95, 175, 136, 0.15)', padding: '2px 8px', borderRadius: 6 }}>
                      Role: {com.role}
                    </span>
                    <span style={{ fontSize: 11, color: '#64748B' }}>{com.frequency}</span>
                  </div>
                  <div style={{ fontSize: 11, color: '#64748B' }}>
                    Focus: <span style={{ color: '#334155' }}>{com.activeFocus}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ─────────────────────────────────────────────────────────────────────────
              10. ACADEMIC CALENDAR RESPONSIBILITY
             ───────────────────────────────────────────────────────────────────────── */}
          <section style={{
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: 18,
            padding: 20,
            boxShadow: '0 4px 14px rgba(0,0,0,0.02)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Calendar size={20} color="#5FAF88" />
                <h2 style={{ fontSize: 18, fontWeight: 800, color: '#0F172A', margin: 0 }}>
                  Academic Calendar Responsibilities
                </h2>
              </div>
              <button
                onClick={() => setIsCalendarOpen(true)}
                style={{
                  background: 'rgba(95, 175, 136, 0.12)',
                  border: 'none',
                  color: '#3B7E5E',
                  borderRadius: 8,
                  padding: '6px 12px',
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                Open Calendar View
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {calendarEvents.map(evt => (
                <div
                  key={evt.id}
                  style={{
                    background: '#F8FAFC',
                    border: '1px solid #F1F5F9',
                    borderRadius: 10,
                    padding: 12,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{
                      background: '#5FAF88',
                      color: '#FFFFFF',
                      borderRadius: 8,
                      padding: '6px 10px',
                      fontSize: 11,
                      fontWeight: 800,
                      textAlign: 'center',
                    }}>
                      {evt.dueDate.split(',')[0]}
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>{evt.title}</div>
                      <div style={{ fontSize: 11, color: '#64748B', marginTop: 2 }}>
                        {evt.time} • Location: {evt.location}
                      </div>
                    </div>
                  </div>

                  <span style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: '#3B7E5E',
                    background: 'rgba(95, 175, 136, 0.12)',
                    padding: '3px 10px',
                    borderRadius: 10,
                  }}>
                    {evt.type}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* ─────────────────────────────────────────────────────────────────────────
              11. ACADEMIC DOCUMENT LIBRARY
             ───────────────────────────────────────────────────────────────────────── */}
          <section style={{
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: 18,
            padding: 20,
            boxShadow: '0 4px 14px rgba(0,0,0,0.02)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <FileText size={20} color="#5FAF88" />
                <div>
                  <h2 style={{ fontSize: 18, fontWeight: 800, color: '#0F172A', margin: 0 }}>
                    Academic Document & Governance Library
                  </h2>
                  <p style={{ margin: 0, fontSize: 12, color: '#64748B' }}>
                    Institutional frameworks, curriculum blueprints, policies, and templates
                  </p>
                </div>
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: 12,
            }}>
              {academicDocs.map(doc => (
                <div
                  key={doc.id}
                  style={{
                    background: '#F8FAFC',
                    border: '1px solid #E2E8F0',
                    borderRadius: 12,
                    padding: 14,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: 10,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <div style={{
                      width: 32,
                      height: 32,
                      borderRadius: 8,
                      background: doc.format === 'PDF' ? '#FEE2E2' : '#DBEAFE',
                      color: doc.format === 'PDF' ? '#DC2626' : '#2563EB',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: 11,
                      flexShrink: 0,
                    }}>
                      {doc.format}
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#0F172A', lineHeight: 1.3 }}>
                        {doc.title}
                      </div>
                      <div style={{ fontSize: 11, color: '#64748B', marginTop: 4 }}>
                        {doc.size} • {doc.version} • Updated {doc.lastUpdated}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: 8 }}>
                    <button
                      onClick={() => setSelectedDoc(doc)}
                      style={{
                        flex: 1,
                        background: '#FFFFFF',
                        border: '1px solid #CBD5E1',
                        color: '#334155',
                        borderRadius: 6,
                        padding: '5px 10px',
                        fontSize: 11,
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 4,
                      }}
                    >
                      <Eye size={12} /> View Document
                    </button>
                    <button
                      onClick={() => showToast(`Downloading ${doc.title}...`)}
                      style={{
                        background: 'rgba(95, 175, 136, 0.12)',
                        border: 'none',
                        color: '#3B7E5E',
                        borderRadius: 6,
                        padding: '5px 10px',
                        fontSize: 11,
                        fontWeight: 700,
                        cursor: 'pointer',
                      }}
                    >
                      <Download size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ─────────────────────────────────────────────────────────────────────────
              12. ACADEMIC ACHIEVEMENTS
             ───────────────────────────────────────────────────────────────────────── */}
          <section style={{
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: 18,
            padding: 20,
            boxShadow: '0 4px 14px rgba(0,0,0,0.02)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Sparkles size={20} color="#5FAF88" />
                <h2 style={{ fontSize: 18, fontWeight: 800, color: '#0F172A', margin: 0 }}>
                  Professional Academic Achievements
                </h2>
              </div>
              <span style={{ fontSize: 12, color: '#64748B', fontWeight: 600 }}>Leadership Milestones</span>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: 14,
            }}>
              {achievements.map(ach => (
                <div
                  key={ach.id}
                  style={{
                    background: 'linear-gradient(135deg, #FAFDFB 0%, #F4FAF6 100%)',
                    border: '1px solid rgba(95, 175, 136, 0.25)',
                    borderRadius: 14,
                    padding: 16,
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <span style={{ fontSize: 11, fontWeight: 800, color: '#3B7E5E', background: 'rgba(95, 175, 136, 0.15)', padding: '2px 8px', borderRadius: 10 }}>
                      {ach.impact}
                    </span>
                    <span style={{ fontSize: 11, color: '#64748B', fontWeight: 600 }}>{ach.year}</span>
                  </div>
                  <h4 style={{ margin: '4px 0 6px 0', fontSize: 14, fontWeight: 800, color: '#0F172A' }}>
                    {ach.title}
                  </h4>
                  <p style={{ margin: 0, fontSize: 12, color: '#475569', lineHeight: 1.4 }}>
                    {ach.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ─────────────────────────────────────────────────────────────────────────
              13. RECENT ACADEMIC ACTIVITIES
             ───────────────────────────────────────────────────────────────────────── */}
          <section style={{
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: 18,
            padding: 20,
            boxShadow: '0 4px 14px rgba(0,0,0,0.02)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Activity size={20} color="#5FAF88" />
                <h2 style={{ fontSize: 18, fontWeight: 800, color: '#0F172A', margin: 0 }}>
                  Recent Activity Log & Audit Trail
                </h2>
              </div>
              <span style={{ fontSize: 12, color: '#64748B', fontWeight: 600 }}>Real-time Audit Feed</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {filteredActivities.map(act => (
                <div
                  key={act.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    background: '#F8FAFC',
                    borderRadius: 10,
                    border: '1px solid #F1F5F9',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{
                      width: 10,
                      height: 10,
                      borderRadius: '50%',
                      background: act.badgeColor,
                    }} />
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>{act.title}</div>
                      <div style={{ fontSize: 11, color: '#64748B', marginTop: 2 }}>
                        Action by <strong>{act.actor}</strong>
                      </div>
                    </div>
                  </div>
                  <span style={{ fontSize: 11, color: '#94A3B8', fontWeight: 600 }}>{act.timestamp}</span>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* ─────────────────────────────────────────────────────────────────────────
            14. ACADEMIC INSIGHTS SIDEBAR (Sticky Executive Panel)
           ───────────────────────────────────────────────────────────────────────── */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
          position: 'sticky',
          top: 20,
        }}>

          {/* Widget 1: Academic Health Score */}
          <div style={{
            background: 'linear-gradient(135deg, #FFFFFF 0%, #F4FAF6 100%)',
            border: '1px solid rgba(95, 175, 136, 0.3)',
            borderRadius: 18,
            padding: 20,
            boxShadow: '0 8px 24px rgba(95, 175, 136, 0.1)',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: '#3B7E5E', letterSpacing: '0.05em', marginBottom: 12 }}>
              INSTITUTIONAL ACADEMIC HEALTH SCORE
            </div>

            {/* Circular Gauge Representation */}
            <div style={{
              width: 110,
              height: 110,
              borderRadius: '50%',
              background: 'conic-gradient(#5FAF88 0% 94%, #E2E8F0 94% 100%)',
              margin: '0 auto 12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 6px 18px rgba(95, 175, 136, 0.25)',
            }}>
              <div style={{
                width: 90,
                height: 90,
                borderRadius: '50%',
                background: '#FFFFFF',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <span style={{ fontSize: 28, fontWeight: 900, color: '#0F172A', lineHeight: 1 }}>94</span>
                <span style={{ fontSize: 10, fontWeight: 700, color: '#3B7E5E' }}>/ 100 Excellent</span>
              </div>
            </div>

            <p style={{ margin: 0, fontSize: 12, color: '#475569', lineHeight: 1.4 }}>
              Senior secondary wing is operating at <strong>94% peak academic health</strong> based on curriculum velocity, audit compliance, and teacher feedback.
            </p>
          </div>

          {/* Widget 2: Pending Reviews Quick Alert */}
          <div style={{
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: 16,
            padding: 16,
            boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <span style={{ fontSize: 13, fontWeight: 800, color: '#0F172A' }}>Action Required</span>
              <span style={{ fontSize: 11, fontWeight: 700, background: '#FEE2E2', color: '#DC2626', padding: '2px 8px', borderRadius: 10 }}>
                {approvalsList.length} Pending
              </span>
            </div>
            <div style={{ fontSize: 12, color: '#475569', lineHeight: 1.4, marginBottom: 12 }}>
              3 high-priority exam papers and question banks are awaiting your final moderation signoff today.
            </div>
            <button
              onClick={() => {
                const el = document.getElementById('pending-approval-center');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              style={{
                width: '100%',
                background: '#5FAF88',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: 8,
                padding: '8px 12px',
                fontSize: 12,
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Go to Approval Center
            </button>
          </div>

          {/* Widget 3: Departments Requiring Attention */}
          <div style={{
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: 16,
            padding: 16,
            boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
              <AlertTriangle size={16} color="#D97706" />
              <h4 style={{ margin: 0, fontSize: 14, fontWeight: 800, color: '#0F172A' }}>
                Department Risk Watch
              </h4>
            </div>

            <div style={{ background: '#FEF3C7', border: '1px solid #FDE68A', borderRadius: 10, padding: 12 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#B45309', marginBottom: 2 }}>
                Mathematics Department
              </div>
              <div style={{ fontSize: 11, color: '#78350F', lineHeight: 1.4 }}>
                Grade 11 Calculus module is running 4 days behind target schedule. HOD meeting scheduled for Aug 12.
              </div>
            </div>
          </div>

          {/* Widget 4: Institutional Compliance Badge */}
          <div style={{
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: 16,
            padding: 16,
            boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
          }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: '#0F172A' }}>
              Institutional Compliance Status
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748B' }}>CBSE Board Regulations:</span>
                <span style={{ fontWeight: 700, color: '#3B7E5E' }}>100% Compliant</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748B' }}>NEP 2020 Framework:</span>
                <span style={{ fontWeight: 700, color: '#3B7E5E' }}>Aligned & Verified</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748B' }}>ISO 9001 Quality Audit:</span>
                <span style={{ fontWeight: 700, color: '#3B7E5E' }}>Passed (98.4%)</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* ─────────────────────────────────────────────────────────────────────────────
          MODALS & DRAWERS
         ───────────────────────────────────────────────────────────────────────────── */}

      {/* 1. Edit Profile Modal */}
      {isEditProfileOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(15, 23, 42, 0.5)', backdropFilter: 'blur(4px)',
          zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20
        }}>
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            style={{
              background: '#FFFFFF', borderRadius: 16, maxWidth: 540, width: '100%',
              padding: 24, boxShadow: '0 20px 40px rgba(0,0,0,0.15)', maxHeight: '90vh', overflowY: 'auto'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: '#0F172A' }}>Edit Academic Leadership Profile</h3>
              <button onClick={() => setIsEditProfileOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
            </div>

            <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 700, color: '#475569' }}>Full Name & Honorific</label>
                <input type="text" value={editForm.name} onChange={e => setEditForm({ ...editForm, name: e.target.value })} style={{ width: '100%', padding: '8px 12px', border: '1px solid #CBD5E1', borderRadius: 8, marginTop: 4 }} />
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 700, color: '#475569' }}>Department & Scope</label>
                <input type="text" value={editForm.department} onChange={e => setEditForm({ ...editForm, department: e.target.value })} style={{ width: '100%', padding: '8px 12px', border: '1px solid #CBD5E1', borderRadius: 8, marginTop: 4 }} />
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 700, color: '#475569' }}>Campus Location</label>
                <input type="text" value={editForm.campus} onChange={e => setEditForm({ ...editForm, campus: e.target.value })} style={{ width: '100%', padding: '8px 12px', border: '1px solid #CBD5E1', borderRadius: 8, marginTop: 4 }} />
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 700, color: '#475569' }}>Official Email</label>
                <input type="email" value={editForm.email} onChange={e => setEditForm({ ...editForm, email: e.target.value })} style={{ width: '100%', padding: '8px 12px', border: '1px solid #CBD5E1', borderRadius: 8, marginTop: 4 }} />
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 700, color: '#475569' }}>Direct Extension Phone</label>
                <input type="text" value={editForm.phone} onChange={e => setEditForm({ ...editForm, phone: e.target.value })} style={{ width: '100%', padding: '8px 12px', border: '1px solid #CBD5E1', borderRadius: 8, marginTop: 4 }} />
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 700, color: '#475569' }}>Academic Qualifications</label>
                <input type="text" value={editForm.qualifications} onChange={e => setEditForm({ ...editForm, qualifications: e.target.value })} style={{ width: '100%', padding: '8px 12px', border: '1px solid #CBD5E1', borderRadius: 8, marginTop: 4 }} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 16 }}>
                <button type="button" onClick={() => setIsEditProfileOpen(false)} style={{ background: '#F1F5F9', border: 'none', padding: '9px 16px', borderRadius: 8, fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
                <button type="submit" style={{ background: '#5FAF88', color: '#FFF', border: 'none', padding: '9px 20px', borderRadius: 8, fontWeight: 700, cursor: 'pointer' }}>Save Changes</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* 2. Delegate Responsibilities Modal */}
      {isDelegateOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(15, 23, 42, 0.5)', backdropFilter: 'blur(4px)',
          zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20
        }}>
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            style={{
              background: '#FFFFFF', borderRadius: 16, maxWidth: 480, width: '100%',
              padding: 24, boxShadow: '0 20px 40px rgba(0,0,0,0.15)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: '#0F172A' }}>Delegate Coordinator Responsibilities</h3>
              <button onClick={() => setIsDelegateOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
            </div>

            <form onSubmit={handleDelegateSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 700, color: '#475569' }}>Select Faculty / HOD Delegatee</label>
                <select value={delegateTarget} onChange={e => setDelegateTarget(e.target.value)} style={{ width: '100%', padding: '8px 12px', border: '1px solid #CBD5E1', borderRadius: 8, marginTop: 4, background: '#FFF' }}>
                  <option value="Dr. Vikram Malhotra (Science HOD)">Dr. Vikram Malhotra (Science HOD)</option>
                  <option value="Mrs. Sunita Sharma (Mathematics HOD)">Mrs. Sunita Sharma (Mathematics HOD)</option>
                  <option value="Mr. Robert D'Souza (Languages HOD)">Mr. Robert D'Souza (Languages HOD)</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: 12, fontWeight: 700, color: '#475569' }}>Delegation Tasks & Signoff Authority</label>
                <input type="text" value={delegateTask} onChange={e => setDelegateTask(e.target.value)} style={{ width: '100%', padding: '8px 12px', border: '1px solid #CBD5E1', borderRadius: 8, marginTop: 4 }} />
              </div>

              <div>
                <label style={{ fontSize: 12, fontWeight: 700, color: '#475569' }}>Delegation Valid Until</label>
                <input type="date" value={delegateDate} onChange={e => setDelegateDate(e.target.value)} style={{ width: '100%', padding: '8px 12px', border: '1px solid #CBD5E1', borderRadius: 8, marginTop: 4 }} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 16 }}>
                <button type="button" onClick={() => setIsDelegateOpen(false)} style={{ background: '#F1F5F9', border: 'none', padding: '9px 16px', borderRadius: 8, fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
                <button type="submit" style={{ background: '#5FAF88', color: '#FFF', border: 'none', padding: '9px 20px', borderRadius: 8, fontWeight: 700, cursor: 'pointer' }}>Confirm Delegation</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* 3. Review Approval Modal */}
      {selectedApproval && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(15, 23, 42, 0.5)', backdropFilter: 'blur(4px)',
          zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20
        }}>
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            style={{
              background: '#FFFFFF', borderRadius: 16, maxWidth: 580, width: '100%',
              padding: 24, boxShadow: '0 20px 40px rgba(0,0,0,0.15)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <span style={{ background: 'rgba(95, 175, 136, 0.15)', color: '#3B7E5E', padding: '3px 10px', borderRadius: 10, fontSize: 12, fontWeight: 700 }}>
                {selectedApproval.category} Preview
              </span>
              <button onClick={() => setSelectedApproval(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
            </div>

            <h3 style={{ margin: '0 0 8px 0', fontSize: 18, fontWeight: 800, color: '#0F172A' }}>
              {selectedApproval.title}
            </h3>

            <div style={{ fontSize: 12, color: '#64748B', marginBottom: 16 }}>
              Submitted by <strong style={{ color: '#1E293B' }}>{selectedApproval.submittedBy}</strong> ({selectedApproval.department} Dept) • {selectedApproval.submittedDate}
            </div>

            <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 12, padding: 16, fontSize: 13, color: '#334155', lineHeight: 1.5, marginBottom: 20 }}>
              {selectedApproval.details}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
              <button onClick={() => { setItemToReturn(selectedApproval); setIsReturnModalOpen(true); }} style={{ background: '#FEF2F2', color: '#DC2626', border: '1px solid #FCA5A5', padding: '9px 16px', borderRadius: 8, fontWeight: 600, cursor: 'pointer' }}>
                Return with Revision Notes
              </button>
              <button onClick={() => handleApprove(selectedApproval.id)} style={{ background: '#5FAF88', color: '#FFF', border: 'none', padding: '9px 20px', borderRadius: 8, fontWeight: 700, cursor: 'pointer' }}>
                Signoff & Approve
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* 4. Return Feedback Modal */}
      {isReturnModalOpen && itemToReturn && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(15, 23, 42, 0.5)', backdropFilter: 'blur(4px)',
          zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20
        }}>
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            style={{
              background: '#FFFFFF', borderRadius: 16, maxWidth: 460, width: '100%',
              padding: 24, boxShadow: '0 20px 40px rgba(0,0,0,0.15)'
            }}
          >
            <h3 style={{ margin: '0 0 8px 0', fontSize: 16, fontWeight: 800, color: '#0F172A' }}>
              Return to Author for Revision
            </h3>
            <p style={{ fontSize: 12, color: '#64748B', margin: '0 0 14px 0' }}>
              Provide constructive feedback for {itemToReturn.submittedBy} regarding "{itemToReturn.title}".
            </p>

            <form onSubmit={handleReturnSubmit}>
              <textarea
                required
                rows={4}
                placeholder="Enter specific changes required before approval..."
                value={returnFeedback}
                onChange={e => setReturnFeedback(e.target.value)}
                style={{ width: '100%', padding: 12, border: '1px solid #CBD5E1', borderRadius: 8, fontSize: 13, outline: 'none', resize: 'vertical' }}
              />

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 16 }}>
                <button type="button" onClick={() => setIsReturnModalOpen(false)} style={{ background: '#F1F5F9', border: 'none', padding: '8px 14px', borderRadius: 8, fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
                <button type="submit" style={{ background: '#DC2626', color: '#FFF', border: 'none', padding: '8px 18px', borderRadius: 8, fontWeight: 700, cursor: 'pointer' }}>Return to Author</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* 5. View Department Modal */}
      {selectedDept && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(15, 23, 42, 0.5)', backdropFilter: 'blur(4px)',
          zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20
        }}>
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            style={{
              background: '#FFFFFF', borderRadius: 16, maxWidth: 500, width: '100%',
              padding: 24, boxShadow: '0 20px 40px rgba(0,0,0,0.15)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: '#0F172A' }}>{selectedDept.name} Overview</h3>
              <button onClick={() => setSelectedDept(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 13 }}>
              <div>Department Head: <strong>{selectedDept.coordinator}</strong></div>
              <div>Supervised Faculty: <strong>{selectedDept.teachersCount} Teachers</strong></div>
              <div>Class Sections: <strong>{selectedDept.classesCount} Active Classes</strong></div>
              <div>Curriculum Velocity: <strong>{selectedDept.curriculumProgress}% Completed</strong></div>
              <div>ISO Audit Score: <strong>{selectedDept.complianceScore}% Compliant</strong></div>
              <div style={{ background: '#F8FAFC', padding: 12, borderRadius: 8, border: '1px solid #E2E8F0', marginTop: 8 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#64748B' }}>RISK ASSESSMENT NOTES:</div>
                <div style={{ color: '#334155', marginTop: 2 }}>{selectedDept.riskNotes}</div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 20 }}>
              <button onClick={() => setSelectedDept(null)} style={{ background: '#5FAF88', color: '#FFF', border: 'none', padding: '8px 18px', borderRadius: 8, fontWeight: 700, cursor: 'pointer' }}>Close Overview</button>
            </div>
          </motion.div>
        </div>
      )}

      {/* 6. View Teacher Modal */}
      {selectedTeacher && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(15, 23, 42, 0.5)', backdropFilter: 'blur(4px)',
          zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20
        }}>
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            style={{
              background: '#FFFFFF', borderRadius: 16, maxWidth: 460, width: '100%',
              padding: 24, boxShadow: '0 20px 40px rgba(0,0,0,0.15)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: '#0F172A' }}>Faculty Academic Profile</h3>
              <button onClick={() => setSelectedTeacher(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
              <img src={selectedTeacher.avatar} alt={selectedTeacher.name} style={{ width: 54, height: 54, borderRadius: '50%', objectFit: 'cover' }} />
              <div>
                <div style={{ fontSize: 16, fontWeight: 800, color: '#0F172A' }}>{selectedTeacher.name}</div>
                <div style={{ fontSize: 12, color: '#64748B' }}>{selectedTeacher.department} Dept • Classes: {selectedTeacher.classesHandled}</div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13, background: '#F8FAFC', padding: 14, borderRadius: 10, border: '1px solid #E2E8F0' }}>
              <div>Lesson Plan Status: <strong>{selectedTeacher.lessonPlanStatus}</strong></div>
              <div>Attendance Submission: <strong>{selectedTeacher.attendanceRate}%</strong></div>
              <div>Syllabus Progress: <strong>{selectedTeacher.syllabusProgress}%</strong></div>
              <div>Assessment Completion: <strong>{selectedTeacher.assessmentCompletion}%</strong></div>
              <div>Academic Health Category: <strong style={{ color: '#3B7E5E' }}>{selectedTeacher.academicHealth}</strong></div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 20 }}>
              <button onClick={() => setSelectedTeacher(null)} style={{ background: '#5FAF88', color: '#FFF', border: 'none', padding: '8px 18px', borderRadius: 8, fontWeight: 700, cursor: 'pointer' }}>Close Profile</button>
            </div>
          </motion.div>
        </div>
      )}

      {/* 7. View Document Modal */}
      {selectedDoc && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(15, 23, 42, 0.5)', backdropFilter: 'blur(4px)',
          zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20
        }}>
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            style={{
              background: '#FFFFFF', borderRadius: 16, maxWidth: 520, width: '100%',
              padding: 24, boxShadow: '0 20px 40px rgba(0,0,0,0.15)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <span style={{ background: '#DBEAFE', color: '#1D4ED8', padding: '3px 10px', borderRadius: 8, fontSize: 11, fontWeight: 700 }}>
                {selectedDoc.format} Reader
              </span>
              <button onClick={() => setSelectedDoc(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
            </div>

            <h3 style={{ margin: '0 0 6px 0', fontSize: 18, fontWeight: 800, color: '#0F172A' }}>
              {selectedDoc.title}
            </h3>
            <div style={{ fontSize: 12, color: '#64748B', marginBottom: 16 }}>
              Category: {selectedDoc.category} • Size: {selectedDoc.size} • Version: {selectedDoc.version}
            </div>

            <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 12, padding: 20, textAlign: 'center', color: '#475569', marginBottom: 20 }}>
              <FileText size={48} color="#5FAF88" style={{ marginBottom: 10 }} />
              <div style={{ fontWeight: 700, fontSize: 14, color: '#0F172A' }}>Institutional Governance Resource</div>
              <div style={{ fontSize: 12, color: '#64748B', marginTop: 4 }}>This official document is verified for AY 2026-2027 compliance.</div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
              <button onClick={() => setSelectedDoc(null)} style={{ background: '#F1F5F9', border: 'none', padding: '8px 16px', borderRadius: 8, fontWeight: 600, cursor: 'pointer' }}>Close</button>
              <button onClick={() => { showToast(`Downloading ${selectedDoc.title}...`); setSelectedDoc(null); }} style={{ background: '#5FAF88', color: '#FFF', border: 'none', padding: '8px 20px', borderRadius: 8, fontWeight: 700, cursor: 'pointer' }}>Download Resource</button>
            </div>
          </motion.div>
        </div>
      )}

      {/* 8. Share Contact Modal */}
      {isShareOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(15, 23, 42, 0.5)', backdropFilter: 'blur(4px)',
          zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20
        }}>
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            style={{
              background: '#FFFFFF', borderRadius: 16, maxWidth: 400, width: '100%',
              padding: 24, boxShadow: '0 20px 40px rgba(0,0,0,0.15)', textAlign: 'center'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: '#0F172A' }}>Share Coordinator Contact</h3>
              <button onClick={() => setIsShareOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
            </div>

            <div style={{ background: '#F8FAFC', padding: 16, borderRadius: 12, border: '1px solid #E2E8F0', marginBottom: 16 }}>
              <div style={{ fontWeight: 800, fontSize: 16, color: '#0F172A' }}>{profile.name}</div>
              <div style={{ fontSize: 12, color: '#5FAF88', fontWeight: 700 }}>Academic Coordinator</div>
              <div style={{ fontSize: 12, color: '#64748B', marginTop: 6 }}>{profile.email}</div>
              <div style={{ fontSize: 12, color: '#64748B' }}>{profile.phone}</div>
            </div>

            <button
              onClick={() => {
                navigator.clipboard?.writeText?.(`${profile.name} - ${profile.role}\nEmail: ${profile.email}\nPhone: ${profile.phone}`);
                showToast('Contact card copied to clipboard!');
                setIsShareOpen(false);
              }}
              style={{ width: '100%', background: '#5FAF88', color: '#FFF', border: 'none', padding: '10px', borderRadius: 8, fontWeight: 700, cursor: 'pointer' }}
            >
              Copy vCard Details
            </button>
          </motion.div>
        </div>
      )}

      {/* 9. Calendar Modal */}
      {isCalendarOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(15, 23, 42, 0.5)', backdropFilter: 'blur(4px)',
          zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20
        }}>
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            style={{
              background: '#FFFFFF', borderRadius: 16, maxWidth: 540, width: '100%',
              padding: 24, boxShadow: '0 20px 40px rgba(0,0,0,0.15)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: '#0F172A' }}>Academic Coordinator Schedule</h3>
              <button onClick={() => setIsCalendarOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxHeight: 380, overflowY: 'auto' }}>
              {calendarEvents.map(evt => (
                <div key={evt.id} style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 10, padding: 12 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>{evt.title}</div>
                  <div style={{ fontSize: 11, color: '#64748B', marginTop: 2 }}>{evt.dueDate} • {evt.time} • {evt.location}</div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
              <button onClick={() => setIsCalendarOpen(false)} style={{ background: '#5FAF88', color: '#FFF', border: 'none', padding: '8px 18px', borderRadius: 8, fontWeight: 700, cursor: 'pointer' }}>Close Calendar</button>
            </div>
          </motion.div>
        </div>
      )}

    </div>
  );
}
