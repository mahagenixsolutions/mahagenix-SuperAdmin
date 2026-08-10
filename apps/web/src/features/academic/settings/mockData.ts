import type { AcademicSettingsConfig, AuditLogEntry } from './types';

export const initialAcademicSettings: AcademicSettingsConfig = {
  academicYear: '2026-2027',
  sessionRange: 'April 2026 – March 2027',
  semesterSystem: false,
  termStructure: 'Two Terms (Term 1 & Term 2)',
  workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
  promotionPolicyPct: 33,

  educationBoard: 'CBSE',
  curriculumVersion: 'v2026.2 (NCERT / CBSE Blueprint)',
  syllabusTargetPct: 95,
  autoCurriculumTracking: true,

  gradeScale: '10-Point CGPA Scale (CBSE Standard)',
  passPercentage: 33,
  graceMarksMax: 5,
  internalWeightagePct: 20,
  practicalWeightagePct: 30,
  finalExamWeightagePct: 50,

  minAttendancePct: 75,
  lateEntryThresholdMins: 15,
  attendanceLockTime: '11:00 AM',
  autoParentAttendanceAlert: true,

  assignmentSubmissions: 'Mixed',
  latePenaltyPerDayPct: 10,
  maxAttachments: 5,
  autoAssignmentReminders: true,

  lessonPlanApprovalRequired: true,
  lessonPlanFrequency: 'Weekly',
  autoLessonPlanReminder: true,

  meetingProvider: 'Google Meet',
  defaultMeetingDurationMins: 45,
  meetingRecordingEnabled: true,
  meetingWaitingRoom: true,

  onlineExamDurationMins: 60,
  randomizeQuestions: true,
  negativeMarking: 0.25,
  browserLockEnabled: true,

  questionReviewRequired: true,
  duplicateDetectionEnabled: true,
  aiQuestionGenEnabled: true,

  notifyTeachers: true,
  notifyStudents: true,
  notifyParents: true,

  lessonPlanApprovalWorkflow: true,
  assignmentApprovalWorkflow: true,
  questionApprovalWorkflow: true,
  examApprovalWorkflow: true,
  curriculumApprovalWorkflow: true,
  noticeApprovalWorkflow: true
};

export const mockAuditLogs: AuditLogEntry[] = [
  {
    id: 'log-1',
    timestamp: 'Aug 05, 2026, 04:30 PM',
    settingName: 'Minimum Mandatory Attendance Threshold',
    changedBy: 'Academic Coordinator',
    oldValue: '70%',
    newValue: '75%'
  },
  {
    id: 'log-2',
    timestamp: 'Aug 04, 2026, 11:15 AM',
    settingName: 'Lesson Plan HOD Approval Workflow',
    changedBy: 'Academic Coordinator',
    oldValue: 'Disabled',
    newValue: 'Enabled (Weekly Signoff)'
  },
  {
    id: 'log-3',
    timestamp: 'Aug 02, 2026, 09:00 AM',
    settingName: 'Online Exam Proctored Browser Lock',
    changedBy: 'Academic Coordinator',
    oldValue: 'Disabled',
    newValue: 'Enabled (Strict Mode)'
  }
];
