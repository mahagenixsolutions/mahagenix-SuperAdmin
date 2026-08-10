export type AttendanceHealthStatus = 'Excellent' | 'Good' | 'Fair' | 'Critical';

export type RiskLevel = 'Critical' | 'Severe' | 'Moderate' | 'Low';

export interface ClassAttendanceFeed {
  id: string;
  className: string;
  section: string;
  teacherName: string;
  teacherAvatar: string;
  attendancePct: number;
  presentCount: number;
  absentCount: number;
  lateCount: number;
  submissionTime: string;
  status: 'Submitted' | 'Pending' | 'Delayed';
}

export interface AtRiskStudent {
  id: string;
  studentName: string;
  studentAvatar: string;
  studentCode: string;
  grade: string;
  section: string;
  attendancePct: number;
  daysAbsent: number;
  parentContacted: boolean;
  warningStatus: string;
  riskLevel: RiskLevel;
  parentName: string;
  parentPhone: string;
}

export interface TeacherComplianceItem {
  id: string;
  teacherName: string;
  teacherAvatar: string;
  department: string;
  submittedCount: number;
  pendingCount: number;
  lateSubmissionCount: number;
  avgSubmissionTime: string;
  complianceScorePct: number;
}

export interface AIAttendanceInsight {
  id: string;
  type: 'Risk Prediction' | 'Declining Grade' | 'Teacher Delay' | 'Weekday Pattern' | 'Intervention';
  severity: 'Critical' | 'Warning' | 'Info';
  title: string;
  description: string;
  affectedTarget: string;
  suggestedIntervention: string;
}

export interface AttendanceAlert {
  id: string;
  timestamp: string;
  type: 'Attendance Not Submitted' | 'Low Attendance Class' | 'Teacher Absent' | 'Network Issue' | 'Holiday Conflict' | 'Student Attendance Warning';
  severity: 'high' | 'medium' | 'low';
  title: string;
  details: string;
  resolved: boolean;
}
