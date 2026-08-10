export type SettingsSectionKey =
  | 'academic-year'
  | 'curriculum'
  | 'grading'
  | 'attendance'
  | 'assignment'
  | 'lesson-plan'
  | 'online-learning'
  | 'online-exam'
  | 'question-bank'
  | 'notifications'
  | 'approval-workflow'
  | 'academic-calendar'
  | 'reports'
  | 'integrations';

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  settingName: string;
  changedBy: string;
  oldValue: string;
  newValue: string;
}

export interface AcademicSettingsConfig {
  academicYear: string;
  sessionRange: string;
  semesterSystem: boolean;
  termStructure: string;
  workingDays: string[];
  promotionPolicyPct: number;

  educationBoard: 'CBSE' | 'ICSE' | 'State Board' | 'IB' | 'Cambridge';
  curriculumVersion: string;
  syllabusTargetPct: number;
  autoCurriculumTracking: boolean;

  gradeScale: string;
  passPercentage: number;
  graceMarksMax: number;
  internalWeightagePct: number;
  practicalWeightagePct: number;
  finalExamWeightagePct: number;

  minAttendancePct: number;
  lateEntryThresholdMins: number;
  attendanceLockTime: string;
  autoParentAttendanceAlert: boolean;

  assignmentSubmissions: 'Physical' | 'Digital' | 'Mixed';
  latePenaltyPerDayPct: number;
  maxAttachments: number;
  autoAssignmentReminders: boolean;

  lessonPlanApprovalRequired: boolean;
  lessonPlanFrequency: 'Weekly' | 'Monthly';
  autoLessonPlanReminder: boolean;

  meetingProvider: 'Google Meet' | 'Zoom' | 'Microsoft Teams';
  defaultMeetingDurationMins: number;
  meetingRecordingEnabled: boolean;
  meetingWaitingRoom: boolean;

  onlineExamDurationMins: number;
  randomizeQuestions: boolean;
  negativeMarking: number;
  browserLockEnabled: boolean;

  questionReviewRequired: boolean;
  duplicateDetectionEnabled: boolean;
  aiQuestionGenEnabled: boolean;

  notifyTeachers: boolean;
  notifyStudents: boolean;
  notifyParents: boolean;

  lessonPlanApprovalWorkflow: boolean;
  assignmentApprovalWorkflow: boolean;
  questionApprovalWorkflow: boolean;
  examApprovalWorkflow: boolean;
  curriculumApprovalWorkflow: boolean;
  noticeApprovalWorkflow: boolean;
}
