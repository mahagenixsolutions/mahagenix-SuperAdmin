import type { 
  LiveExamSession, 
  ScheduledExam, 
  QuestionPaperCard, 
  TeacherExamResponsibility, 
  PlatformTelemetry, 
  AIExamInsight, 
  ExamAlert 
} from './types';

export const mockLiveExamSessions: LiveExamSession[] = [
  {
    id: 'live-ex-1',
    subject: 'Mathematics',
    examTitle: 'Grade 10 Mid-Term Higher Mathematics',
    teacherName: 'Dr. Rajesh Sharma',
    teacherAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
    grade: 'Grade 10',
    section: 'A',
    studentsJoined: 44,
    totalStudents: 45,
    attendancePercentage: 97.7,
    timeRemainingMinutes: 38,
    totalDurationMinutes: 120,
    internetIssuesCount: 1,
    warningsCount: 2,
    platform: 'EduVerse Secure Browser',
    status: 'Active'
  },
  {
    id: 'live-ex-2',
    subject: 'Physics',
    examTitle: 'Grade 11 Quantum Mechanics & Electromagnetism',
    teacherName: 'Mrs. Kavitha Menon',
    teacherAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150',
    grade: 'Grade 11',
    section: 'B',
    studentsJoined: 41,
    totalStudents: 42,
    attendancePercentage: 97.6,
    timeRemainingMinutes: 15,
    totalDurationMinutes: 90,
    internetIssuesCount: 0,
    warningsCount: 0,
    platform: 'EduVerse Secure Browser',
    status: 'Active'
  },
  {
    id: 'live-ex-3',
    subject: 'Chemistry',
    examTitle: 'Grade 12 Organic Synthesis Mid-Term',
    teacherName: 'Dr. Sonia Gandhi',
    teacherAvatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=150',
    grade: 'Grade 12',
    section: 'A',
    studentsJoined: 38,
    totalStudents: 40,
    attendancePercentage: 95.0,
    timeRemainingMinutes: 52,
    totalDurationMinutes: 120,
    internetIssuesCount: 2,
    warningsCount: 4,
    platform: 'Google Meet',
    status: 'Active'
  },
  {
    id: 'live-ex-4',
    subject: 'Computer Science',
    examTitle: 'Grade 11 Data Structures & C++ Algorithms',
    teacherName: 'Prof. Vikramaditya Verma',
    teacherAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    grade: 'Grade 11',
    section: 'C',
    studentsJoined: 36,
    totalStudents: 36,
    attendancePercentage: 100.0,
    timeRemainingMinutes: 65,
    totalDurationMinutes: 120,
    internetIssuesCount: 0,
    warningsCount: 1,
    platform: 'EduVerse Secure Browser',
    status: 'Active'
  }
];

export const mockScheduledExams: ScheduledExam[] = [
  {
    id: 'ex-101',
    title: 'Mid-Term Higher Mathematics',
    subject: 'Mathematics',
    grade: 'Grade 10',
    section: 'A',
    examType: 'Mid-Term',
    date: '2026-08-12',
    timeSlot: '09:00 AM - 12:00 PM',
    duration: '3 hrs',
    hallRoom: 'Main Academic Block Hall 1',
    chiefInvigilator: 'Dr. Rajesh Sharma',
    paperStatus: 'Approved',
    status: 'Live',
    academicYear: '2026-2027'
  },
  {
    id: 'ex-102',
    title: 'Mid-Term Theoretical Physics',
    subject: 'Physics',
    grade: 'Grade 11',
    section: 'B',
    examType: 'Mid-Term',
    date: '2026-08-12',
    timeSlot: '10:00 AM - 11:30 AM',
    duration: '1.5 hrs',
    hallRoom: 'Science Wing Lab 2',
    chiefInvigilator: 'Mrs. Kavitha Menon',
    paperStatus: 'Approved',
    status: 'Live',
    academicYear: '2026-2027'
  },
  {
    id: 'ex-103',
    title: 'Unit Test II - Advanced Chemistry',
    subject: 'Chemistry',
    grade: 'Grade 9',
    section: 'A',
    examType: 'Unit Test',
    date: '2026-08-15',
    timeSlot: '01:00 PM - 02:30 PM',
    duration: '1.5 hrs',
    hallRoom: 'Online Portal Exam Hub',
    chiefInvigilator: 'Dr. Sonia Gandhi',
    paperStatus: 'Approved',
    status: 'Scheduled',
    academicYear: '2026-2027'
  },
  {
    id: 'ex-104',
    title: 'World History & Civilizations',
    subject: 'Social Studies',
    grade: 'Grade 9',
    section: 'B',
    examType: 'Mid-Term',
    date: '2026-08-18',
    timeSlot: '09:00 AM - 11:00 AM',
    duration: '2 hrs',
    hallRoom: 'Auditorium Block B',
    chiefInvigilator: 'Mrs. Anita Desai',
    paperStatus: 'Pending Approval',
    status: 'Scheduled',
    academicYear: '2026-2027'
  },
  {
    id: 'ex-105',
    title: 'English Literature & Essay Writing',
    subject: 'English',
    grade: 'Grade 10',
    section: 'C',
    examType: 'Mid-Term',
    date: '2026-08-20',
    timeSlot: '02:00 PM - 04:00 PM',
    duration: '2 hrs',
    hallRoom: 'Online Portal Exam Hub',
    chiefInvigilator: 'Ms. Sarah Jenkins',
    paperStatus: 'Locked',
    status: 'Scheduled',
    academicYear: '2026-2027'
  }
];

export const mockQuestionPaperKanban: QuestionPaperCard[] = [
  {
    id: 'qp-1',
    subject: 'Mathematics',
    grade: 'Grade 10',
    teacherName: 'Mr. Arun Sharma',
    teacherAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
    reviewerName: 'Dr. Rajesh Sharma (HOD)',
    submissionDate: 'Aug 02, 2026',
    status: 'Approved',
    totalMarks: 100,
    questionCount: 45,
    difficultyRating: 'Balanced',
    qualityScore: 96
  },
  {
    id: 'qp-2',
    subject: 'Physics',
    grade: 'Grade 11',
    teacherName: 'Mrs. Kavitha Menon',
    teacherAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150',
    reviewerName: 'Dr. Rajesh Sharma (HOD)',
    submissionDate: 'Aug 04, 2026',
    status: 'Approved',
    totalMarks: 70,
    questionCount: 35,
    difficultyRating: 'Challenging',
    qualityScore: 92
  },
  {
    id: 'qp-3',
    subject: 'History & Civics',
    grade: 'Grade 9',
    teacherName: 'Mrs. Anita Desai',
    teacherAvatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=150',
    reviewerName: 'Prof. V. Verma',
    submissionDate: 'Aug 05, 2026',
    status: 'Pending Approval',
    totalMarks: 80,
    questionCount: 40,
    difficultyRating: 'Balanced',
    qualityScore: 88
  },
  {
    id: 'qp-4',
    subject: 'Chemistry',
    grade: 'Grade 12',
    teacherName: 'Dr. Sonia Gandhi',
    teacherAvatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=150',
    reviewerName: 'Dr. Ananya Roy',
    submissionDate: 'Aug 01, 2026',
    status: 'Locked',
    totalMarks: 100,
    questionCount: 50,
    difficultyRating: 'Challenging',
    qualityScore: 98
  },
  {
    id: 'qp-5',
    subject: 'Biology Lab Practical',
    grade: 'Grade 9',
    teacherName: 'Dr. Ananya Roy',
    teacherAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150',
    reviewerName: 'Dr. Sonia Gandhi',
    submissionDate: 'Aug 06, 2026',
    status: 'Submitted',
    totalMarks: 50,
    questionCount: 25,
    difficultyRating: 'Easy',
    qualityScore: 85
  },
  {
    id: 'qp-6',
    subject: 'Economics',
    grade: 'Grade 12',
    teacherName: 'Mr. Rajesh Khanna',
    teacherAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150',
    reviewerName: 'Mrs. Anita Desai',
    submissionDate: 'Aug 06, 2026',
    status: 'Draft',
    totalMarks: 100,
    questionCount: 30,
    difficultyRating: 'Balanced',
    qualityScore: 78
  }
];

export const mockTeacherResponsibilities: TeacherExamResponsibility[] = [
  {
    id: 'tr-1',
    teacherName: 'Dr. Rajesh Sharma',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
    department: 'Physics & Science',
    role: 'Chief Examiner',
    paperSubmissionStatus: 'Approved',
    invigilationSessions: 6,
    evaluationProgress: 84,
    answerSheetsPending: 18,
    isLate: false,
    workloadScore: 'Heavy'
  },
  {
    id: 'tr-2',
    teacherName: 'Mrs. Kavitha Menon',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150',
    department: 'Mathematics',
    role: 'Evaluator',
    paperSubmissionStatus: 'Approved',
    invigilationSessions: 4,
    evaluationProgress: 92,
    answerSheetsPending: 8,
    isLate: false,
    workloadScore: 'Moderate'
  },
  {
    id: 'tr-3',
    teacherName: 'Dr. Sonia Gandhi',
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=150',
    department: 'Chemistry',
    role: 'Question Setter',
    paperSubmissionStatus: 'Approved',
    invigilationSessions: 5,
    evaluationProgress: 45,
    answerSheetsPending: 42,
    isLate: true,
    workloadScore: 'Heavy'
  },
  {
    id: 'tr-4',
    teacherName: 'Mrs. Anita Desai',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=150',
    department: 'Social Studies',
    role: 'Invigilator',
    paperSubmissionStatus: 'Pending',
    invigilationSessions: 3,
    evaluationProgress: 60,
    answerSheetsPending: 24,
    isLate: false,
    workloadScore: 'Moderate'
  }
];

export const mockPlatformTelemetry: PlatformTelemetry[] = [
  {
    id: 'pl-1',
    name: 'EduVerse Secure Browser',
    status: 'Operational',
    serverLoadPct: 38,
    avgResponseTimeMs: 16,
    activeSessions: 12,
    failedSessions: 0
  },
  {
    id: 'pl-2',
    name: 'Google Meet',
    status: 'Operational',
    serverLoadPct: 24,
    avgResponseTimeMs: 22,
    activeSessions: 4,
    failedSessions: 0
  },
  {
    id: 'pl-3',
    name: 'Zoom',
    status: 'Operational',
    serverLoadPct: 18,
    avgResponseTimeMs: 14,
    activeSessions: 2,
    failedSessions: 0
  },
  {
    id: 'pl-4',
    name: 'Microsoft Teams',
    status: 'Operational',
    serverLoadPct: 15,
    avgResponseTimeMs: 28,
    activeSessions: 2,
    failedSessions: 0
  }
];

export const mockAIExamInsights: AIExamInsight[] = [
  {
    id: 'ai-ex-1',
    type: 'Revision Alert',
    severity: 'Critical',
    title: 'Grade 11 Electromagnetism Low Mastery Alert',
    description: 'Mock test analysis shows 34% of Grade 11 Science students scored below threshold in Electromagnetism.',
    affectedSubjectOrGrade: 'Grade 11 Physics',
    actionText: 'Schedule Targeted Revision Session'
  },
  {
    id: 'ai-ex-2',
    type: 'Submission Delay',
    severity: 'Warning',
    title: 'Question Paper Submission Overdue',
    description: 'Grade 9 History Mid-Term paper submission missed initial deadline by 2 days.',
    affectedSubjectOrGrade: 'Mrs. Anita Desai (Social Studies)',
    actionText: 'Send Automated HOD Reminder'
  },
  {
    id: 'ai-ex-3',
    type: 'At-Risk Students',
    severity: 'Warning',
    title: '14 Students At Risk of Failing Mid-Term',
    description: 'Predictive analytics based on internal unit tests flag 14 candidates needing remedial intervention.',
    affectedSubjectOrGrade: 'Grade 10 & Grade 12 Math/Chemistry',
    actionText: 'Issue Remedial Counseling Mandate'
  },
  {
    id: 'ai-ex-4',
    type: 'Paper Quality',
    severity: 'Info',
    title: 'Question Paper Difficulty Balance Score: 94%',
    description: 'Bloom\'s taxonomy distribution across all approved Grade 10 papers complies with CBSE guidelines.',
    affectedSubjectOrGrade: 'Grade 10 Examinations',
    actionText: 'View Quality Audit Certificate'
  }
];

export const mockExamAlerts: ExamAlert[] = [
  {
    id: 'alt-ex-1',
    time: '10:05 AM',
    type: 'Question Paper Missing',
    severity: 'high',
    title: 'Grade 9 History paper review pending',
    details: 'HOD approval missing for Grade 9 History paper scheduled on Aug 18.',
    resolved: false
  },
  {
    id: 'alt-ex-2',
    time: '09:42 AM',
    type: 'Exam Clash',
    severity: 'high',
    title: 'Timetable overlap detected in Grade 11 Electives',
    details: 'French Language and Economics exam slots coincide on Aug 22.',
    resolved: false
  },
  {
    id: 'alt-ex-3',
    time: '08:30 AM',
    type: 'Evaluation Overdue',
    severity: 'medium',
    title: 'Grade 12 Chemistry paper marking delayed',
    details: '42 answer scripts pending evaluation past 48-hour SLA.',
    resolved: true
  }
];

export const passPercentageData = [
  { term: 'Unit Test I', passRate: 88, target: 85 },
  { term: 'Mid-Term 2025', passRate: 91, target: 85 },
  { term: 'Final Term 2025', passRate: 94, target: 85 },
  { term: 'Unit Test II', passRate: 92, target: 85 },
  { term: 'Mid-Term 2026', passRate: 95, target: 85 }
];

export const gradeDistributionData = [
  { grade: 'A+ (90-100%)', count: 340, fill: '#10B981' },
  { grade: 'A (80-89%)', count: 480, fill: '#3B7E5E' },
  { grade: 'B+ (70-79%)', count: 320, fill: '#3B82F6' },
  { grade: 'B (60-69%)', count: 180, fill: '#8B5CF6' },
  { grade: 'C (50-59%)', count: 70, fill: '#F59E0B' },
  { grade: 'F (Below 50%)', count: 30, fill: '#EF4444' }
];

export const questionTypeData = [
  { type: 'MCQ / Objective', percentage: 55, color: '#5FAF88' },
  { type: 'Short Descriptive', percentage: 25, color: '#3B82F6' },
  { type: 'Coding / Algorithmic', percentage: 10, color: '#8B5CF6' },
  { type: 'Diagram / Practical', percentage: 10, color: '#F59E0B' }
];
