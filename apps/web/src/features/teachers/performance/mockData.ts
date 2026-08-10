import type { 
  FacultyPerformanceItem, 
  ClassroomObservationItem, 
  AIFacultyInsight, 
  FacultyAlert 
} from './types';

export const mockFacultyPerformanceList: FacultyPerformanceItem[] = [
  {
    id: 'fac-101',
    teacherName: 'Dr. Rajesh Sharma',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
    employeeId: 'EMP-MATH-01',
    department: 'Mathematics',
    subjectsTaught: ['Higher Mathematics', 'Calculus'],
    gradesTaught: ['Grade 10 A', 'Grade 12 B'],
    overallScorePct: 98.4,
    ratingTier: 'A+ Outstanding',
    studentPassPct: 98.8,
    syllabusCompletionPct: 98.0,
    avgMarkingSpeedDays: 1.2,
    attendancePct: 99.2,
    studentRating: 4.9,
    lastAppraisalDate: 'Jul 15, 2026'
  },
  {
    id: 'fac-102',
    teacherName: 'Mrs. Kavitha Menon',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150',
    employeeId: 'EMP-PHYS-02',
    department: 'Physics',
    subjectsTaught: ['Physics', 'Electromagnetism'],
    gradesTaught: ['Grade 11 B', 'Grade 12 A'],
    overallScorePct: 96.2,
    ratingTier: 'A+ Outstanding',
    studentPassPct: 96.5,
    syllabusCompletionPct: 96.0,
    avgMarkingSpeedDays: 1.8,
    attendancePct: 98.5,
    studentRating: 4.8,
    lastAppraisalDate: 'Jun 20, 2026'
  },
  {
    id: 'fac-103',
    teacherName: 'Dr. Sonia Gandhi',
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=150',
    employeeId: 'EMP-CHEM-04',
    department: 'Chemistry',
    subjectsTaught: ['Organic Chemistry'],
    gradesTaught: ['Grade 12 A', 'Grade 12 B'],
    overallScorePct: 84.5,
    ratingTier: 'B Meets Expectations',
    studentPassPct: 88.0,
    syllabusCompletionPct: 82.0,
    avgMarkingSpeedDays: 3.5,
    attendancePct: 94.0,
    studentRating: 4.2,
    lastAppraisalDate: 'May 10, 2026'
  },
  {
    id: 'fac-104',
    teacherName: 'Mrs. Anita Desai',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=150',
    employeeId: 'EMP-SOC-09',
    department: 'Social Studies',
    subjectsTaught: ['History', 'Civics'],
    gradesTaught: ['Grade 9 B', 'Grade 10 C'],
    overallScorePct: 78.2,
    ratingTier: 'C Needs Improvement',
    studentPassPct: 82.5,
    syllabusCompletionPct: 76.0,
    avgMarkingSpeedDays: 2.4,
    attendancePct: 92.5,
    studentRating: 3.9,
    lastAppraisalDate: 'Apr 28, 2026'
  },
  {
    id: 'fac-105',
    teacherName: 'Mr. Suresh Raina',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
    employeeId: 'EMP-ENG-12',
    department: 'English',
    subjectsTaught: ['English Literature'],
    gradesTaught: ['Grade 8 A', 'Grade 9 A'],
    overallScorePct: 68.0,
    ratingTier: 'PIP Required',
    studentPassPct: 72.0,
    syllabusCompletionPct: 70.0,
    avgMarkingSpeedDays: 4.2,
    attendancePct: 89.0,
    studentRating: 3.4,
    lastAppraisalDate: 'Mar 12, 2026'
  }
];

export const mockObservations: ClassroomObservationItem[] = [
  {
    id: 'obs-1',
    teacherName: 'Mrs. Kavitha Menon',
    teacherAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150',
    subject: 'Physics (Electromagnetism)',
    grade: 'Grade 11 B',
    observerName: 'Dr. V. Verma (HOD Science)',
    observationDate: 'Aug 04, 2026',
    pedagogyScore: 5,
    engagementScore: 5,
    managementScore: 4,
    overallRating: 4.7,
    status: 'Completed'
  },
  {
    id: 'obs-2',
    teacherName: 'Dr. Sonia Gandhi',
    teacherAvatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=150',
    subject: 'Organic Chemistry',
    grade: 'Grade 12 A',
    observerName: 'Academic Coordinator',
    observationDate: 'Aug 02, 2026',
    pedagogyScore: 4,
    engagementScore: 3,
    managementScore: 4,
    overallRating: 3.7,
    status: 'Follow-up Required'
  }
];

export const mockAIFacultyInsights: AIFacultyInsight[] = [
  {
    id: 'ai-fac-1',
    type: 'Award Candidate',
    severity: 'Success',
    title: 'Dr. Rajesh Sharma Eligible for State Educator Award',
    description: 'Maintained 98.4% performance index and 4.9/5 student rating for 3 consecutive terms.',
    targetTeacher: 'Dr. Rajesh Sharma (Mathematics)',
    suggestedAction: 'Nominate for Institutional Excellence Award.'
  },
  {
    id: 'ai-fac-2',
    type: 'Syllabus Lag',
    severity: 'Warning',
    title: 'Grade 9 History Syllabus 14% Behind Schedule',
    description: 'Mrs. Anita Desai has covered 76% of planned chapters vs target 90% before Mid-Term.',
    targetTeacher: 'Mrs. Anita Desai (Social Studies)',
    suggestedAction: 'Schedule extra tutorial periods before exams.'
  },
  {
    id: 'ai-fac-3',
    type: 'Evaluation Backlog',
    severity: 'Critical',
    title: 'Dr. Sonia Gandhi Marking SLA Delay (3.5 Days)',
    description: 'Answer script evaluation turnaround time exceeds the 48-hour school policy.',
    targetTeacher: 'Dr. Sonia Gandhi (Chemistry)',
    suggestedAction: 'Assign co-evaluator for Organic Chem papers.'
  }
];

export const mockFacultyAlerts: FacultyAlert[] = [
  {
    id: 'alt-fac-1',
    timestamp: '09:30 AM',
    type: 'Appraisal Overdue',
    severity: 'high',
    title: 'Annual appraisal overdue for 6 faculty members',
    details: 'Q2 performance review deadline passed for Social Studies dept.',
    resolved: false
  },
  {
    id: 'alt-fac-2',
    timestamp: '08:45 AM',
    type: 'Syllabus Lag Warning',
    severity: 'medium',
    title: 'Social Studies & English syllabus lag detected',
    details: 'Curriculum progress 12% below mid-term readiness threshold.',
    resolved: false
  },
  {
    id: 'alt-fac-3',
    timestamp: '08:15 AM',
    type: 'PIP Review Deadline',
    severity: 'high',
    title: 'PIP 60-day review for Mr. Suresh Raina',
    details: 'Follow-up classroom observation required before Friday.',
    resolved: false
  }
];

export const feedbackBreakdownData = [
  { category: 'Teaching Clarity', rating: 4.8 },
  { category: 'Punctuality & Discipline', rating: 4.9 },
  { category: 'Doubt Resolution', rating: 4.7 },
  { category: 'Subject Knowledge', rating: 4.9 },
  { category: 'Empathy & Approachability', rating: 4.6 }
];

export const departmentProgressData = [
  { dept: 'Mathematics', completion: 98, target: 95 },
  { dept: 'Physics', completion: 96, target: 95 },
  { dept: 'Chemistry', completion: 82, target: 95 },
  { dept: 'Computer Science', completion: 95, target: 95 },
  { dept: 'Social Studies', completion: 76, target: 95 }
];
