export type ExamStatus = 'Scheduled' | 'Live' | 'Evaluation' | 'Results Approved' | 'Published' | 'Completed' | 'Cancelled';

export type PaperStatus = 'Draft' | 'Submitted' | 'Pending Approval' | 'Approved' | 'Locked' | 'Published';

export type ExamTypeCategory = 'Mid-Term' | 'Final Term' | 'Unit Test' | 'Practical' | 'Mock Test';

export type PlatformEngine = 'EduVerse Secure Browser' | 'Google Meet' | 'Zoom' | 'Microsoft Teams';

export interface LiveExamSession {
  id: string;
  subject: string;
  examTitle: string;
  teacherName: string;
  teacherAvatar: string;
  grade: string;
  section: string;
  studentsJoined: number;
  totalStudents: number;
  attendancePercentage: number;
  timeRemainingMinutes: number;
  totalDurationMinutes: number;
  internetIssuesCount: number;
  warningsCount: number; // e.g. Tab switching / Proctoring alerts
  platform: PlatformEngine;
  status: 'Active' | 'Paused';
}

export interface ScheduledExam {
  id: string;
  title: string;
  subject: string;
  grade: string;
  section: string;
  examType: ExamTypeCategory;
  date: string;
  timeSlot: string;
  duration: string;
  hallRoom: string;
  chiefInvigilator: string;
  paperStatus: PaperStatus;
  status: ExamStatus;
  academicYear: string;
}

export interface QuestionPaperCard {
  id: string;
  subject: string;
  grade: string;
  teacherName: string;
  teacherAvatar: string;
  reviewerName: string;
  submissionDate: string;
  status: PaperStatus;
  totalMarks: number;
  questionCount: number;
  difficultyRating: 'Balanced' | 'Challenging' | 'Easy';
  qualityScore: number; // 0 - 100%
}

export interface TeacherExamResponsibility {
  id: string;
  teacherName: string;
  avatar: string;
  department: string;
  role: 'Invigilator' | 'Evaluator' | 'Question Setter' | 'Chief Examiner';
  paperSubmissionStatus: 'Submitted' | 'Pending' | 'Approved' | 'Overdue';
  invigilationSessions: number;
  evaluationProgress: number; // 0 - 100%
  answerSheetsPending: number;
  isLate: boolean;
  workloadScore: 'Light' | 'Moderate' | 'Heavy';
}

export interface PlatformTelemetry {
  id: string;
  name: PlatformEngine;
  status: 'Operational' | 'Degraded' | 'Maintenance';
  serverLoadPct: number;
  avgResponseTimeMs: number;
  activeSessions: number;
  failedSessions: number;
}

export interface AIExamInsight {
  id: string;
  type: 'Revision Alert' | 'Submission Delay' | 'At-Risk Students' | 'Attendance Forecast' | 'Paper Quality' | 'Difficulty Balance';
  severity: 'Critical' | 'Warning' | 'Info';
  title: string;
  description: string;
  affectedSubjectOrGrade: string;
  actionText: string;
}

export interface ExamReportItem {
  id: string;
  title: string;
  description: string;
  category: 'Schedule' | 'Attendance' | 'Results' | 'Faculty' | 'Student' | 'Questions';
}

export interface ExamAlert {
  id: string;
  time: string;
  type: 'Question Paper Missing' | 'Teacher Absent' | 'Server Warning' | 'Exam Clash' | 'Evaluation Overdue' | 'Late Approval';
  severity: 'high' | 'medium' | 'low';
  title: string;
  details: string;
  resolved: boolean;
}
