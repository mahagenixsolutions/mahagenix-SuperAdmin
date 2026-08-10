import type { 
  AssignmentItem, 
  TeacherAssignmentPerformance, 
  AIAssignmentInsight, 
  AssignmentAlert 
} from './types';

export const mockAssignments: AssignmentItem[] = [
  {
    id: 'asg-101',
    title: 'Electromagnetic Induction Numerical Problem Set',
    subject: 'Physics',
    grade: 'Grade 11',
    section: 'B',
    teacherName: 'Mrs. Kavitha Menon',
    teacherAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150',
    teacherDept: 'Science',
    dueDate: 'Today, 05:00 PM',
    totalStudents: 42,
    submittedStudents: 39,
    evaluatedStudents: 30,
    submissionPercentage: 92.8,
    evaluationPercentage: 76.9,
    maxMarks: 20,
    status: 'Submission Open',
    isOverdue: false,
    qualityScore: 96
  },
  {
    id: 'asg-102',
    title: 'Quadratic Equations & Roots Assignment #4',
    subject: 'Mathematics',
    grade: 'Grade 10',
    section: 'A',
    teacherName: 'Dr. Rajesh Sharma',
    teacherAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
    teacherDept: 'Mathematics',
    dueDate: 'Yesterday, 11:59 PM',
    totalStudents: 45,
    submittedStudents: 44,
    evaluatedStudents: 44,
    submissionPercentage: 97.7,
    evaluationPercentage: 100.0,
    maxMarks: 25,
    status: 'Completed',
    isOverdue: false,
    qualityScore: 98
  },
  {
    id: 'asg-103',
    title: 'Organic Reaction Mechanism Flowcharts',
    subject: 'Chemistry',
    grade: 'Grade 12',
    section: 'A',
    teacherName: 'Dr. Sonia Gandhi',
    teacherAvatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=150',
    teacherDept: 'Chemistry',
    dueDate: 'Aug 08, 2026',
    totalStudents: 40,
    submittedStudents: 28,
    evaluatedStudents: 10,
    submissionPercentage: 70.0,
    evaluationPercentage: 35.7,
    maxMarks: 30,
    status: 'Evaluation',
    isOverdue: false,
    qualityScore: 91
  },
  {
    id: 'asg-104',
    title: 'C++ Binary Search Tree Implementation',
    subject: 'Computer Science',
    grade: 'Grade 12',
    section: 'C',
    teacherName: 'Prof. Vikramaditya Verma',
    teacherAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    teacherDept: 'Technology',
    dueDate: 'Aug 10, 2026',
    totalStudents: 36,
    submittedStudents: 18,
    evaluatedStudents: 0,
    submissionPercentage: 50.0,
    evaluationPercentage: 0.0,
    maxMarks: 50,
    status: 'Published',
    isOverdue: false,
    qualityScore: 97
  },
  {
    id: 'asg-105',
    title: 'French Revolution Essay & Cause Analysis',
    subject: 'Social Studies',
    grade: 'Grade 9',
    section: 'B',
    teacherName: 'Mrs. Anita Desai',
    teacherAvatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=150',
    teacherDept: 'Social Sciences',
    dueDate: 'Aug 04, 2026',
    totalStudents: 48,
    submittedStudents: 32,
    evaluatedStudents: 15,
    submissionPercentage: 66.7,
    evaluationPercentage: 46.8,
    maxMarks: 20,
    status: 'Evaluation',
    isOverdue: true,
    qualityScore: 84
  }
];

export const mockTeacherPerformance: TeacherAssignmentPerformance[] = [
  {
    id: 'tp-1',
    teacherName: 'Dr. Rajesh Sharma',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
    department: 'Mathematics',
    assignmentsCreated: 18,
    avgEvaluationDays: 1.2,
    pendingEvaluationsCount: 2,
    avgMarksAwardedPct: 86.4,
    studentCompletionRatePct: 96.5,
    lateReviewsCount: 0,
    slaStatus: 'Optimal'
  },
  {
    id: 'tp-2',
    teacherName: 'Mrs. Kavitha Menon',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150',
    department: 'Physics',
    assignmentsCreated: 15,
    avgEvaluationDays: 1.8,
    pendingEvaluationsCount: 9,
    avgMarksAwardedPct: 82.1,
    studentCompletionRatePct: 92.0,
    lateReviewsCount: 1,
    slaStatus: 'Optimal'
  },
  {
    id: 'tp-3',
    teacherName: 'Dr. Sonia Gandhi',
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=150',
    department: 'Chemistry',
    assignmentsCreated: 14,
    avgEvaluationDays: 3.5,
    pendingEvaluationsCount: 18,
    avgMarksAwardedPct: 78.5,
    studentCompletionRatePct: 84.2,
    lateReviewsCount: 5,
    slaStatus: 'Overdue'
  },
  {
    id: 'tp-4',
    teacherName: 'Mrs. Anita Desai',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=150',
    department: 'Social Studies',
    assignmentsCreated: 12,
    avgEvaluationDays: 2.4,
    pendingEvaluationsCount: 17,
    avgMarksAwardedPct: 81.0,
    studentCompletionRatePct: 82.5,
    lateReviewsCount: 3,
    slaStatus: 'Warning'
  }
];

export const mockAIAssignmentInsights: AIAssignmentInsight[] = [
  {
    id: 'ai-asg-1',
    type: 'Evaluation Delay',
    severity: 'Critical',
    title: 'Evaluation Backlog Alert in Chemistry',
    description: 'Dr. Sonia Gandhi has 18 answer scripts pending evaluation past the 48-hour SLA deadline.',
    target: 'Dr. Sonia Gandhi (Grade 12 Chemistry)',
    suggestedAction: 'Send HOD marking reminder & reassign co-evaluator.'
  },
  {
    id: 'ai-asg-2',
    type: 'Low Completion',
    severity: 'Warning',
    title: 'Low Submission Rate in Grade 9 Social Studies',
    description: 'French Revolution essay submission rate is currently 66.7% (16 students missing).',
    target: 'Grade 9 Section B',
    suggestedAction: 'Issue automated reminder SMS to parents of unsubmitted students.'
  },
  {
    id: 'ai-asg-3',
    type: 'Heavy Workload',
    severity: 'Warning',
    title: 'Grade 11 Assignment Heavy Workload Warning',
    description: 'Grade 11 students have 4 major assignments due on Friday across Physics, Chemistry, Math, & CS.',
    target: 'Grade 11 Students',
    suggestedAction: 'Recommend shifting Computer Science deadline to Monday.'
  },
  {
    id: 'ai-asg-4',
    type: 'Student Frequent Miss',
    severity: 'Info',
    title: '12 Students Repeatedly Missing Deadlines',
    description: '12 students across Grade 10 & 12 have missed 3+ consecutive assignment deadlines.',
    target: 'Remedial Counseling List',
    suggestedAction: 'Schedule Academic Counselor intervention session.'
  }
];

export const mockAssignmentAlerts: AssignmentAlert[] = [
  {
    id: 'alt-asg-1',
    timestamp: '10:15 AM',
    type: 'Assignment Overdue',
    severity: 'high',
    title: 'Grade 9 History essay deadline passed',
    details: '16 students missed the deadline for French Revolution analysis.',
    resolved: false
  },
  {
    id: 'alt-asg-2',
    timestamp: '09:20 AM',
    type: 'Teacher Evaluation Pending',
    severity: 'medium',
    title: '18 Chemistry scripts pending evaluation',
    details: 'Past 48-hour marking SLA limit for Grade 12 Organic Chemistry.',
    resolved: false
  },
  {
    id: 'alt-asg-3',
    timestamp: '08:45 AM',
    type: 'Approval Required',
    severity: 'low',
    title: 'Grade 10 Math assignment policy approval',
    details: 'Mr. Sharma submitted updated grading rubric policy.',
    resolved: true
  }
];

export const submissionTrendData = [
  { day: 'Mon', submitted: 240, pending: 40 },
  { day: 'Tue', submitted: 310, pending: 35 },
  { day: 'Wed', submitted: 290, pending: 30 },
  { day: 'Thu', submitted: 380, pending: 25 },
  { day: 'Fri', submitted: 420, pending: 20 },
  { day: 'Sat', submitted: 180, pending: 15 }
];

export const sectionCompletionData = [
  { section: 'Grade 8 A', rate: 95 },
  { section: 'Grade 9 A', rate: 92 },
  { section: 'Grade 9 B', rate: 83 },
  { section: 'Grade 10 A', rate: 98 },
  { section: 'Grade 11 B', rate: 93 },
  { section: 'Grade 12 A', rate: 89 }
];
