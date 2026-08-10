export type QuestionType = 'MCQ' | 'Descriptive' | 'Coding' | 'Case Study' | 'Diagram';

export type DifficultyLevel = 'Easy' | 'Medium' | 'Hard' | 'HOTS';

export type QuestionApprovalStatus = 'Draft' | 'Submitted' | 'Under Review' | 'Approved' | 'Rejected' | 'Archived';

export type BloomsTaxonomyLevel = 'Remembering' | 'Understanding' | 'Applying' | 'Analyzing' | 'Evaluating' | 'Creating';

export interface QuestionItem {
  id: string;
  questionText: string;
  options?: string[]; // For MCQs
  correctAnswer?: string;
  subject: string;
  grade: string;
  chapter: string;
  topic: string;
  type: QuestionType;
  difficulty: DifficultyLevel;
  bloomsTaxonomy: BloomsTaxonomyLevel;
  marks: number;
  estimatedTimeMinutes: number;
  createdByTeacher: string;
  teacherAvatar: string;
  status: QuestionApprovalStatus;
  usageCount: number;
  qualityScore: number; // 0 - 100%
  createdDate: string;
  reviewerName?: string;
  reviewComment?: string;
}

export interface CurriculumCoverageItem {
  id: string;
  subject: string;
  coveragePct: number;
  totalChapters: number;
  coveredChapters: number;
  missingChapters: string[];
  totalQuestions: number;
}

export interface RecentQuestionActivity {
  id: string;
  timestamp: string;
  user: string;
  avatar: string;
  action: 'Submitted' | 'Approved' | 'Rejected' | 'AI Generated' | 'Imported' | 'Archived';
  details: string;
}

export interface QuestionAlert {
  id: string;
  timestamp: string;
  type: 'Duplicate Detected' | 'Approval Pending' | 'Curriculum Gap' | 'Low Quality Flag' | 'Exam Deadline';
  severity: 'high' | 'medium' | 'low';
  title: string;
  details: string;
  resolved: boolean;
}
