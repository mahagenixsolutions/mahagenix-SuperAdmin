export interface AcademicHealthMetrics {
  overallReadiness: number;
  timetableHealth: number;
  curriculumCompletion: number;
  examinationReadiness: number;
  lessonPlanCompliance: number;
  teacherAllocation: number;
}

export interface CurriculumProgress {
  grade: string;
  progress: number;
  status: 'on-track' | 'at-risk' | 'delayed';
  chaptersPending: number;
}

export interface LessonPlanApproval {
  id: string;
  teacher: string;
  subject: string;
  grade: string;
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface AcademicAlert {
  id: string;
  type: 'conflict' | 'delay' | 'shortage' | 'risk';
  message: string;
  severity: 'high' | 'medium' | 'low';
}

export interface ExamReadiness {
  examName: string;
  date: string;
  questionPaperReady: boolean;
  invigilatorsAssigned: boolean;
  hallTicketsGenerated: boolean;
}

export const AcademicCommandService = {
  getHealthMetrics: (): AcademicHealthMetrics => ({
    overallReadiness: 88,
    timetableHealth: 95,
    curriculumCompletion: 76,
    examinationReadiness: 82,
    lessonPlanCompliance: 91,
    teacherAllocation: 98,
  }),

  getCurriculumProgress: (): CurriculumProgress[] => [
    { grade: 'Class 10', progress: 85, status: 'on-track', chaptersPending: 3 },
    { grade: 'Class 12', progress: 82, status: 'on-track', chaptersPending: 4 },
    { grade: 'Class 9', progress: 65, status: 'at-risk', chaptersPending: 8 },
    { grade: 'Class 11', progress: 58, status: 'delayed', chaptersPending: 12 },
  ],

  getPendingLessonPlans: (): LessonPlanApproval[] => [
    { id: 'lp-1', teacher: 'Sarah Jenkins', subject: 'Mathematics', grade: 'Class 10 A', submittedAt: '2 hours ago', status: 'pending' },
    { id: 'lp-2', teacher: 'Dr. Aris Vance', subject: 'Physics', grade: 'Class 12 B', submittedAt: '4 hours ago', status: 'pending' },
    { id: 'lp-3', teacher: 'Elena Rostova', subject: 'English', grade: 'Class 9 A', submittedAt: '1 day ago', status: 'pending' },
  ],

  getExamReadiness: (): ExamReadiness[] => [
    { examName: 'Mid-Term Exams (Class 10)', date: '2026-08-15', questionPaperReady: true, invigilatorsAssigned: true, hallTicketsGenerated: false },
    { examName: 'Unit Test II (Class 9)', date: '2026-08-22', questionPaperReady: false, invigilatorsAssigned: false, hallTicketsGenerated: false },
  ],

  getAcademicAlerts: (): AcademicAlert[] => [
    { id: 'al-1', type: 'conflict', message: 'Double booking detected in Science Lab 2 (Period 3)', severity: 'high' },
    { id: 'al-2', type: 'delay', message: 'Class 11 Chemistry curriculum is 12% behind schedule', severity: 'medium' },
    { id: 'al-3', type: 'shortage', message: 'Substitute required for Mrs. Rao (Class 8 English)', severity: 'high' },
    { id: 'al-4', type: 'risk', message: 'Low pass rate prediction for Grade 9 Mathematics', severity: 'low' },
  ],
  
  getTeacherWorkload: () => [
    { teacher: 'S. Jenkins', periods: 28, status: 'overloaded' },
    { teacher: 'A. Vance', periods: 22, status: 'optimal' },
    { teacher: 'E. Rostova', periods: 16, status: 'underutilized' },
    { teacher: 'R. Sharma', periods: 24, status: 'optimal' },
  ]
};
