export type AssignmentStatus = 'Draft' | 'Scheduled' | 'Published' | 'Submission Open' | 'Evaluation' | 'Completed' | 'Archived';

export interface AssignmentItem {
  id: string;
  title: string;
  subject: string;
  grade: string;
  section: string;
  teacherName: string;
  teacherAvatar: string;
  teacherDept: string;
  dueDate: string;
  totalStudents: number;
  submittedStudents: number;
  evaluatedStudents: number;
  submissionPercentage: number;
  evaluationPercentage: number;
  maxMarks: number;
  status: AssignmentStatus;
  isOverdue: boolean;
  qualityScore: number; // 0 - 100%
}

export interface TeacherAssignmentPerformance {
  id: string;
  teacherName: string;
  avatar: string;
  department: string;
  assignmentsCreated: number;
  avgEvaluationDays: number;
  pendingEvaluationsCount: number;
  avgMarksAwardedPct: number;
  studentCompletionRatePct: number;
  lateReviewsCount: number;
  slaStatus: 'Optimal' | 'Warning' | 'Overdue';
}

export interface AIAssignmentInsight {
  id: string;
  type: 'Evaluation Delay' | 'Low Completion' | 'Student Frequent Miss' | 'Heavy Workload' | 'Difficulty Balance';
  severity: 'Critical' | 'Warning' | 'Info';
  title: string;
  description: string;
  target: string;
  suggestedAction: string;
}

export interface AssignmentAlert {
  id: string;
  timestamp: string;
  type: 'Assignment Overdue' | 'Teacher Evaluation Pending' | 'Low Submission Rate' | 'Student Inactive' | 'Approval Required';
  severity: 'high' | 'medium' | 'low';
  title: string;
  details: string;
  resolved: boolean;
}
