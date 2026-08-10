export type RiskLevel = 'Low' | 'Moderate' | 'High' | 'Critical';

export type CorrectiveStatus = 'Open' | 'In Progress' | 'Under Verification' | 'Resolved';

export interface AuditChecklistItem {
  id: string;
  category: string;
  compliancePct: number;
  status: 'Compliant' | 'Needs Review' | 'Non-Compliant';
  lastReviewedDate: string;
  riskLevel: RiskLevel;
  reviewer: string;
}

export interface DepartmentAuditItem {
  id: string;
  departmentName: string;
  headName: string;
  headAvatar: string;
  compliancePct: number;
  auditScore: number; // 0 - 100
  pendingIssuesCount: number;
  criticalFindingsCount: number;
  auditDate: string;
  status: 'Healthy' | 'Advisory' | 'At Risk';
}

export interface TeacherAuditCompliance {
  id: string;
  teacherName: string;
  avatar: string;
  department: string;
  lessonPlansPct: number;
  homeworkPct: number;
  assignmentsPct: number;
  attendancePct: number;
  assessmentPct: number;
  syllabusPct: number;
  overallScorePct: number;
  riskLevel: RiskLevel;
}

export interface CurriculumComplianceItem {
  id: string;
  subject: string;
  grade: string;
  teacherName: string;
  expectedProgressPct: number;
  actualProgressPct: number;
  variancePct: number;
  status: 'On Track' | 'Slight Lag' | 'Critical Delay';
  riskLevel: RiskLevel;
}

export interface CorrectiveActionItem {
  id: string;
  issueTitle: string;
  department: string;
  assignedTo: string;
  priority: 'High' | 'Medium' | 'Low';
  deadline: string;
  progressPct: number;
  status: CorrectiveStatus;
  commentsCount: number;
}

export interface AIAuditInsight {
  id: string;
  type: 'Department Risk' | 'Teacher Support' | 'Curriculum Delay' | 'Assessment Quality' | 'Intervention';
  severity: 'Critical' | 'Warning' | 'Info' | 'Success';
  title: string;
  description: string;
  affectedTarget: string;
  suggestedIntervention: string;
}

export interface AuditAlert {
  id: string;
  timestamp: string;
  type: 'Lesson Plan Missed' | 'Syllabus Delay' | 'Homework Compliance Drop' | 'Exam Prep Incomplete' | 'Department Lag';
  severity: 'high' | 'medium' | 'low';
  title: string;
  details: string;
  resolved: boolean;
}
