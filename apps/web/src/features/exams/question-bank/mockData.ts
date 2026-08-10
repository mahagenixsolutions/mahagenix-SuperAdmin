import type { 
  QuestionItem, 
  CurriculumCoverageItem, 
  RecentQuestionActivity, 
  QuestionAlert 
} from './types';

export const mockQuestions: QuestionItem[] = [
  {
    id: 'q-101',
    questionText: 'Derive Faraday\'s Law of Electromagnetic Induction and calculate the induced EMF in a coil rotating in a uniform magnetic field B.',
    subject: 'Physics',
    grade: 'Grade 11',
    chapter: 'Chapter 6: Electromagnetic Induction',
    topic: 'Faraday\'s Law & Magnetic Flux',
    type: 'Descriptive',
    difficulty: 'HOTS',
    bloomsTaxonomy: 'Analyzing',
    marks: 5,
    estimatedTimeMinutes: 12,
    createdByTeacher: 'Dr. Rajesh Sharma',
    teacherAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
    status: 'Approved',
    usageCount: 14,
    qualityScore: 98,
    createdDate: 'Aug 01, 2026',
    reviewerName: 'Dr. V. Verma (HOD)'
  },
  {
    id: 'q-102',
    questionText: 'Which of the following matrices is non-singular if det(A) ≠ 0?',
    options: ['A) Null Matrix', 'B) Invertible Matrix', 'C) Singular Matrix', 'D) Symmetric Matrix Only'],
    correctAnswer: 'B) Invertible Matrix',
    subject: 'Mathematics',
    grade: 'Grade 10',
    chapter: 'Chapter 3: Matrices & Determinants',
    topic: 'Inverse of a Square Matrix',
    type: 'MCQ',
    difficulty: 'Easy',
    bloomsTaxonomy: 'Remembering',
    marks: 1,
    estimatedTimeMinutes: 2,
    createdByTeacher: 'Mrs. Kavitha Menon',
    teacherAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150',
    status: 'Approved',
    usageCount: 22,
    qualityScore: 95,
    createdDate: 'Jul 28, 2026',
    reviewerName: 'Mr. Arun Sharma'
  },
  {
    id: 'q-103',
    questionText: 'Write a C++ function `TreeNode* invertTree(TreeNode* root)` that performs a mirror inversion of a Binary Tree in O(N) time.',
    subject: 'Computer Science',
    grade: 'Grade 12',
    chapter: 'Chapter 8: Data Structures & Trees',
    topic: 'Binary Search Tree Algorithms',
    type: 'Coding',
    difficulty: 'Hard',
    bloomsTaxonomy: 'Applying',
    marks: 8,
    estimatedTimeMinutes: 20,
    createdByTeacher: 'Prof. Vikramaditya Verma',
    teacherAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    status: 'Approved',
    usageCount: 9,
    qualityScore: 99,
    createdDate: 'Aug 03, 2026',
    reviewerName: 'Academic Board'
  },
  {
    id: 'q-104',
    questionText: 'A chemical reaction A + B → C exhibits zero-order kinetics with respect to A. Analyze the reaction rate curve when concentration of B is doubled.',
    subject: 'Chemistry',
    grade: 'Grade 12',
    chapter: 'Chapter 4: Chemical Kinetics',
    topic: 'Order of Reaction & Rate Law',
    type: 'Case Study',
    difficulty: 'Medium',
    bloomsTaxonomy: 'Evaluating',
    marks: 4,
    estimatedTimeMinutes: 10,
    createdByTeacher: 'Dr. Sonia Gandhi',
    teacherAvatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=150',
    status: 'Under Review',
    usageCount: 0,
    qualityScore: 89,
    createdDate: 'Aug 05, 2026',
    reviewerName: 'Dr. Ananya Roy'
  },
  {
    id: 'q-105',
    questionText: 'Draw a labelled schematic diagram of the Human Nephron showing Bowman\'s capsule, Glomerulus, and Loop of Henle.',
    subject: 'Biology',
    grade: 'Grade 9',
    chapter: 'Chapter 5: Human Physiology & Excretion',
    topic: 'Structure of the Nephron',
    type: 'Diagram',
    difficulty: 'Medium',
    bloomsTaxonomy: 'Understanding',
    marks: 5,
    estimatedTimeMinutes: 10,
    createdByTeacher: 'Dr. Ananya Roy',
    teacherAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150',
    status: 'Submitted',
    usageCount: 0,
    qualityScore: 91,
    createdDate: 'Aug 06, 2026',
    reviewerName: 'HOD Biology'
  },
  {
    id: 'q-106',
    questionText: 'Evaluate the socioeconomic factors leading to the French Revolution of 1789, focusing on the Estates-General taxation structure.',
    subject: 'Social Studies',
    grade: 'Grade 9',
    chapter: 'Chapter 1: The French Revolution',
    topic: 'French Society during Late 18th Century',
    type: 'Descriptive',
    difficulty: 'Medium',
    bloomsTaxonomy: 'Creating',
    marks: 5,
    estimatedTimeMinutes: 15,
    createdByTeacher: 'Mrs. Anita Desai',
    teacherAvatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=150',
    status: 'Draft',
    usageCount: 0,
    qualityScore: 82,
    createdDate: 'Aug 06, 2026'
  }
];

export const mockCurriculumCoverage: CurriculumCoverageItem[] = [
  {
    id: 'cc-1',
    subject: 'Mathematics',
    coveragePct: 92,
    totalChapters: 15,
    coveredChapters: 14,
    missingChapters: ['Chapter 12: Vectors & 3D Geometry'],
    totalQuestions: 4120
  },
  {
    id: 'cc-2',
    subject: 'Science (Physics / Chem / Bio)',
    coveragePct: 87,
    totalChapters: 18,
    coveredChapters: 16,
    missingChapters: ['Chapter 9: Organic Reaction Mechanisms II', 'Chapter 14: Semiconductors'],
    totalQuestions: 5240
  },
  {
    id: 'cc-3',
    subject: 'English Literature & Language',
    coveragePct: 94,
    totalChapters: 12,
    coveredChapters: 11,
    missingChapters: ['Chapter 6: Advanced Rhetoric & Debates'],
    totalQuestions: 3100
  },
  {
    id: 'cc-4',
    subject: 'Social Studies',
    coveragePct: 83,
    totalChapters: 14,
    coveredChapters: 12,
    missingChapters: ['Chapter 7: World Economy Post-WWII', 'Chapter 11: Democratic Rights'],
    totalQuestions: 2850
  },
  {
    id: 'cc-5',
    subject: 'Computer Science',
    coveragePct: 90,
    totalChapters: 10,
    coveredChapters: 9,
    missingChapters: ['Chapter 10: Graph Theory & Shortest Path'],
    totalQuestions: 3110
  }
];

export const mockRecentActivities: RecentQuestionActivity[] = [
  {
    id: 'act-1',
    timestamp: '10 mins ago',
    user: 'Dr. Sonia Gandhi',
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=150',
    action: 'Submitted',
    details: 'Submitted 25 new Grade 12 Organic Chemistry questions for Mid-Term review.'
  },
  {
    id: 'act-2',
    timestamp: '45 mins ago',
    user: 'Academic Coordinator',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
    action: 'Approved',
    details: 'Approved 18 Physics & Calculus questions submitted by Mrs. Kavitha Menon.'
  },
  {
    id: 'act-3',
    timestamp: '2 hours ago',
    user: 'EduVerse AI Engine',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    action: 'AI Generated',
    details: 'Generated 45 HOTS questions for Grade 10 Mathematics algebra module.'
  },
  {
    id: 'act-4',
    timestamp: '5 hours ago',
    user: 'Mr. Arun Sharma',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
    action: 'Imported',
    details: 'Bulk imported 200 CBSE exemplar questions from standard Excel template.'
  }
];

export const mockQuestionAlerts: QuestionAlert[] = [
  {
    id: 'alt-q-1',
    timestamp: '09:30 AM',
    type: 'Duplicate Detected',
    severity: 'high',
    title: 'Duplicate question detected in Grade 10 Math',
    details: 'Question #Q-102 shares 98% semantic similarity with #Q-084.',
    resolved: false
  },
  {
    id: 'alt-q-2',
    timestamp: '08:45 AM',
    type: 'Approval Pending',
    severity: 'medium',
    title: '245 questions pending review > 48 hours',
    details: 'HOD approval overdue for Grade 9 Social Studies question paper block.',
    resolved: false
  },
  {
    id: 'alt-q-3',
    timestamp: '08:10 AM',
    type: 'Curriculum Gap',
    severity: 'high',
    title: 'Missing questions for Grade 12 Physics Ch 14',
    details: 'Semiconductors chapter has 0 HOTS questions in the repository.',
    resolved: false
  }
];

export const questionsPerSubjectData = [
  { subject: 'Physics', count: 3450, approved: 3200 },
  { subject: 'Mathematics', count: 4120, approved: 3900 },
  { subject: 'Chemistry', count: 3200, approved: 2950 },
  { subject: 'Biology', count: 2590, approved: 2400 },
  { subject: 'Computer Sci', count: 3110, approved: 2850 },
  { subject: 'English', count: 1950, approved: 1680 }
];

export const difficultyDistributionData = [
  { level: 'Easy (1-2 Marks)', count: 6447, fill: '#10B981' },
  { level: 'Medium (3-4 Marks)', count: 8289, fill: '#3B7E5E' },
  { level: 'Hard (5+ Marks)', count: 2578, fill: '#3B82F6' },
  { level: 'HOTS / Olympiad', count: 1106, fill: '#8B5CF6' }
];
