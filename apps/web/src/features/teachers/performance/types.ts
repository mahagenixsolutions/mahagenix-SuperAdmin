export type PerformanceTier = 'A+ Outstanding' | 'A Exceeds Expectations' | 'B Meets Expectations' | 'C Needs Improvement' | 'PIP Required';

export interface FacultyPerformanceItem {
  id: string;
  teacherName: string;
  avatar: string;
  employeeId: string;
  department: string;
  subjectsTaught: string[];
  gradesTaught: string[];
  overallScorePct: number;
  ratingTier: PerformanceTier;
  studentPassPct: number;
  syllabusCompletionPct: number;
  avgMarkingSpeedDays: number;
  attendancePct: number;
  studentRating: number; // 0 - 5.0
  lastAppraisalDate: string;
}

export interface ClassroomObservationItem {
  id: string;
  teacherName: string;
  teacherAvatar: string;
  subject: string;
  grade: string;
  observerName: string;
  observationDate: string;
  pedagogyScore: number; // 1-5
  engagementScore: number; // 1-5
  managementScore: number; // 1-5
  overallRating: number;
  status: 'Completed' | 'Scheduled' | 'Follow-up Required';
}

export interface AIFacultyInsight {
  id: string;
  type: 'Award Candidate' | 'Syllabus Lag' | 'PIP Warning' | 'Evaluation Backlog' | 'Intervention';
  severity: 'Critical' | 'Warning' | 'Info' | 'Success';
  title: string;
  description: string;
  targetTeacher: string;
  suggestedAction: string;
}

export interface FacultyAlert {
  id: string;
  timestamp: string;
  type: 'Appraisal Overdue' | 'Observation Pending' | 'Syllabus Lag Warning' | 'Feedback Drop' | 'PIP Review Deadline';
  severity: 'high' | 'medium' | 'low';
  title: string;
  details: string;
  resolved: boolean;
}
