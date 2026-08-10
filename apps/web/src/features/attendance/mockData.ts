import type { 
  ClassAttendanceFeed, 
  AtRiskStudent, 
  TeacherComplianceItem, 
  AIAttendanceInsight, 
  AttendanceAlert 
} from './types';

export const mockClassAttendanceFeeds: ClassAttendanceFeed[] = [
  {
    id: 'caf-1',
    className: 'Grade 10',
    section: 'A',
    teacherName: 'Dr. Rajesh Sharma',
    teacherAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
    attendancePct: 97.7,
    presentCount: 44,
    absentCount: 1,
    lateCount: 0,
    submissionTime: '08:15 AM',
    status: 'Submitted'
  },
  {
    id: 'caf-2',
    className: 'Grade 11',
    section: 'B',
    teacherName: 'Mrs. Kavitha Menon',
    teacherAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150',
    attendancePct: 92.8,
    presentCount: 39,
    absentCount: 3,
    lateCount: 2,
    submissionTime: '08:20 AM',
    status: 'Submitted'
  },
  {
    id: 'caf-3',
    className: 'Grade 9',
    section: 'B',
    teacherName: 'Mrs. Anita Desai',
    teacherAvatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=150',
    attendancePct: 83.3,
    presentCount: 40,
    absentCount: 6,
    lateCount: 2,
    submissionTime: '08:45 AM',
    status: 'Delayed'
  },
  {
    id: 'caf-4',
    className: 'Grade 12',
    section: 'A',
    teacherName: 'Dr. Sonia Gandhi',
    teacherAvatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=150',
    attendancePct: 0.0,
    presentCount: 0,
    absentCount: 0,
    lateCount: 0,
    submissionTime: 'Pending',
    status: 'Pending'
  }
];

export const mockAtRiskStudents: AtRiskStudent[] = [
  {
    id: 'ars-1',
    studentName: 'Aarav Patel',
    studentAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=150',
    studentCode: 'STD-2026-904',
    grade: 'Grade 9',
    section: 'B',
    attendancePct: 68.5,
    daysAbsent: 14,
    parentContacted: true,
    warningStatus: 'Final Warning Issued',
    riskLevel: 'Critical',
    parentName: 'Mr. Vikram Patel',
    parentPhone: '+91 98765 43210'
  },
  {
    id: 'ars-2',
    studentName: 'Rohan Gupta',
    studentAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    studentCode: 'STD-2026-121',
    grade: 'Grade 12',
    section: 'A',
    attendancePct: 71.2,
    daysAbsent: 11,
    parentContacted: true,
    warningStatus: '2nd Advisory Notice',
    riskLevel: 'Severe',
    parentName: 'Mrs. Sunita Gupta',
    parentPhone: '+91 98123 45678'
  },
  {
    id: 'ars-3',
    studentName: 'Sanya Malhotra',
    studentAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
    studentCode: 'STD-2026-118',
    grade: 'Grade 11',
    section: 'C',
    attendancePct: 74.0,
    daysAbsent: 9,
    parentContacted: false,
    warningStatus: '1st Advisory Notice',
    riskLevel: 'Moderate',
    parentName: 'Mr. Rakesh Malhotra',
    parentPhone: '+91 97111 22334'
  }
];

export const mockTeacherCompliance: TeacherComplianceItem[] = [
  {
    id: 'tc-1',
    teacherName: 'Dr. Rajesh Sharma',
    teacherAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
    department: 'Mathematics',
    submittedCount: 45,
    pendingCount: 0,
    lateSubmissionCount: 0,
    avgSubmissionTime: '08:12 AM',
    complianceScorePct: 100
  },
  {
    id: 'tc-2',
    teacherName: 'Mrs. Kavitha Menon',
    teacherAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150',
    department: 'Physics',
    submittedCount: 44,
    pendingCount: 0,
    lateSubmissionCount: 1,
    avgSubmissionTime: '08:18 AM',
    complianceScorePct: 98
  },
  {
    id: 'tc-3',
    teacherName: 'Dr. Sonia Gandhi',
    teacherAvatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=150',
    department: 'Chemistry',
    submittedCount: 38,
    pendingCount: 4,
    lateSubmissionCount: 3,
    avgSubmissionTime: '08:42 AM',
    complianceScorePct: 88
  }
];

export const mockAIAttendanceInsights: AIAttendanceInsight[] = [
  {
    id: 'ai-att-1',
    type: 'Risk Prediction',
    severity: 'Critical',
    title: '18 Students Predicted to Fall Below 75% CBSE Limit',
    description: 'Based on current absence frequency, 18 candidates risk hall ticket withholding.',
    affectedTarget: 'Grade 9 & 11 At-Risk Cohort',
    suggestedIntervention: 'Issue automated Parent Advisory Notice & schedule Coordinator counseling.'
  },
  {
    id: 'ai-att-2',
    type: 'Weekday Pattern',
    severity: 'Warning',
    title: 'Friday Absence Spike Detected (2.4x Higher)',
    description: 'Student absenteeism rises by 140% on Fridays across Grade 11 & 12 sections.',
    affectedTarget: 'Grade 11 & 12 Fridays',
    suggestedIntervention: 'Schedule mandatory lab sessions or surprise quizzes on Fridays.'
  },
  {
    id: 'ai-att-3',
    type: 'Teacher Delay',
    severity: 'Warning',
    title: '4 Classes Pending Daily Attendance (>30 Mins)',
    description: 'Chemistry & Humanities morning period attendance rosters not submitted.',
    affectedTarget: 'Grade 12 Chemistry & History',
    suggestedIntervention: 'Dispatch instant SMS alert to assigned class teachers.'
  }
];

export const mockAttendanceAlerts: AttendanceAlert[] = [
  {
    id: 'alt-att-1',
    timestamp: '08:45 AM',
    type: 'Attendance Not Submitted',
    severity: 'high',
    title: '4 Classes pending attendance submission',
    details: 'Grade 12 Section A attendance delayed past 08:30 AM deadline.',
    resolved: false
  },
  {
    id: 'alt-att-2',
    timestamp: '08:30 AM',
    type: 'Low Attendance Class',
    severity: 'high',
    title: 'Grade 9 Section B attendance dropped to 83.3%',
    details: '6 students absent today in Grade 9 B.',
    resolved: false
  },
  {
    id: 'alt-att-3',
    timestamp: '08:15 AM',
    type: 'Student Attendance Warning',
    severity: 'medium',
    title: 'Aarav Patel (Grade 9 B) absent 3 consecutive days',
    details: 'Parent notification pending dispatch.',
    resolved: false
  }
];

export const dailyAttendanceTrendData = [
  { day: 'Mon', rate: 94.2, absent: 130 },
  { day: 'Tue', rate: 95.1, absent: 110 },
  { day: 'Wed', rate: 94.8, absent: 118 },
  { day: 'Thu', rate: 93.4, absent: 146 },
  { day: 'Fri', rate: 90.2, absent: 210 }
];

export const absenceReasonData = [
  { name: 'Medical Leave', value: 45, fill: '#3B82F6' },
  { name: 'Personal Leave', value: 25, fill: '#3B7E5E' },
  { name: 'Unapproved Absence', value: 15, fill: '#EF4444' },
  { name: 'Sports / Competition', value: 10, fill: '#8B5CF6' },
  { name: 'Unknown / Unverified', value: 5, fill: '#F59E0B' }
];

export const gradeAttendanceData = [
  { grade: 'Grade 8', pct: 95.8, present: 480, absent: 21, late: 4 },
  { grade: 'Grade 9', pct: 91.2, present: 510, absent: 49, late: 12 },
  { grade: 'Grade 10', pct: 96.4, present: 490, absent: 18, late: 5 },
  { grade: 'Grade 11', pct: 92.1, present: 485, absent: 41, late: 7 },
  { grade: 'Grade 12', pct: 91.5, present: 491, absent: 45, late: 4 }
];
