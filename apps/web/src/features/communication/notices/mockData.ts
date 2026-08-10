import type { 
  AcademicNoticeItem, 
  AcknowledgementTrackerItem, 
  AINoticeInsight, 
  NoticeAlert 
} from './types';

export const mockAcademicNotices: AcademicNoticeItem[] = [
  {
    id: 'not-101',
    title: 'CBSE Mid-Term Examination Master Schedule 2026-27',
    description: 'Official timetable, exam room seating plan, permitted calculators, and invigilation duties for Grade 9 through Grade 12.',
    category: 'Examinations',
    priority: 'Critical',
    department: 'Examination Board',
    createdBy: 'Academic Coordinator',
    creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
    publishDate: 'Aug 05, 2026',
    expiryDate: 'Aug 25, 2026',
    targetAudience: 'All Teachers, Students & Parents (Grades 9-12)',
    attachments: [
      { name: 'CBSE_MidTerm_Timetable_2026.pdf', type: 'PDF', size: '2.4 MB' },
      { name: 'Invigilation_SLA_Rules.docx', type: 'DOCX', size: '850 KB' }
    ],
    readPercentage: 98,
    acknowledgedPercentage: 96,
    status: 'Published'
  },
  {
    id: 'not-102',
    title: 'Grade 10 & 12 Pre-Board Term Assignment Submission Advisory',
    description: 'Final submission deadline for internal assessment assignments, practical journals, and project dossiers.',
    category: 'Assignments',
    priority: 'High',
    department: 'Academics & Quality',
    createdBy: 'HOD Science',
    creatorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150',
    publishDate: 'Aug 04, 2026',
    expiryDate: 'Aug 18, 2026',
    targetAudience: 'Grade 10 & Grade 12 Students & Parents',
    attachments: [
      { name: 'Internal_Assessment_Guidelines.pdf', type: 'PDF', size: '1.8 MB' }
    ],
    readPercentage: 94,
    acknowledgedPercentage: 91,
    status: 'Published'
  },
  {
    id: 'not-103',
    title: 'Mandatory Faculty Lesson Plan Submission Policy Update',
    description: 'Updated weekly lesson plan submission workflow via EduVerse ERP. HOD approval required prior to Monday 08:00 AM.',
    category: 'Lesson Plans',
    priority: 'High',
    department: 'Academic Governance',
    createdBy: 'Principal Office',
    creatorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    publishDate: 'Aug 03, 2026',
    expiryDate: 'Aug 30, 2026',
    targetAudience: 'All Faculty Members (86 Teachers)',
    attachments: [
      { name: 'Lesson_Plan_ERP_Policy_2026.pdf', type: 'PDF', size: '1.2 MB' }
    ],
    readPercentage: 100,
    acknowledgedPercentage: 98,
    status: 'Published'
  },
  {
    id: 'not-104',
    title: 'Parent-Teacher Meeting (PTM) & Mid-Term Report Card Release',
    description: 'Schedule for Q2 Parent-Teacher Conference and digital distribution of report cards via EduVerse Parent Portal.',
    category: 'PTM',
    priority: 'Medium',
    department: 'Student Affairs',
    createdBy: 'Academic Coordinator',
    creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
    publishDate: 'Aug 10, 2026',
    expiryDate: 'Aug 20, 2026',
    targetAudience: 'All Parents & Class Teachers',
    attachments: [
      { name: 'PTM_TimeSlots_SlotBooking.pdf', type: 'PDF', size: '940 KB' }
    ],
    readPercentage: 0,
    acknowledgedPercentage: 0,
    status: 'Scheduled'
  }
];

export const mockAcknowledgementList: AcknowledgementTrackerItem[] = [
  {
    id: 'ack-1',
    noticeTitle: 'CBSE Mid-Term Examination Master Schedule 2026-27',
    targetGroup: 'Grade 9-12 Parents & Students (1,240)',
    totalRecipients: 1240,
    readCount: 1215,
    unreadCount: 25,
    acknowledgedCount: 1190,
    pendingCount: 50,
    lastReminderSent: 'Aug 06, 08:30 AM'
  },
  {
    id: 'ack-2',
    noticeTitle: 'Grade 10 & 12 Pre-Board Term Assignment Submission Advisory',
    targetGroup: 'Grade 10 & 12 Students (620)',
    totalRecipients: 620,
    readCount: 583,
    unreadCount: 37,
    acknowledgedCount: 564,
    pendingCount: 56,
    lastReminderSent: 'Aug 05, 04:15 PM'
  },
  {
    id: 'ack-3',
    noticeTitle: 'Mandatory Faculty Lesson Plan Submission Policy Update',
    targetGroup: 'All School Faculty (86 Teachers)',
    totalRecipients: 86,
    readCount: 86,
    unreadCount: 0,
    acknowledgedCount: 84,
    pendingCount: 2,
    lastReminderSent: 'Aug 04, 09:00 AM'
  }
];

export const mockAINoticeInsights: AINoticeInsight[] = [
  {
    id: 'ai-not-1',
    type: 'Parent Unread',
    severity: 'Critical',
    title: '25 Parents Have Not Viewed Mid-Term Exam Schedule',
    description: 'High priority exam notification unread by Grade 12 B parent cohort.',
    targetGroup: 'Grade 12 B Parents (25)',
    suggestedAction: 'Dispatch automated SMS & WhatsApp advisory now.'
  },
  {
    id: 'ai-not-2',
    type: 'Dept Missing Ack',
    severity: 'Warning',
    title: 'Chemistry Department Lesson Plan Policy Acknowledgment Pending',
    description: '2 faculty members in Chemistry dept have not signed digital acknowledgment.',
    targetGroup: 'Chemistry Faculty (2 Teachers)',
    suggestedAction: 'Send direct ERP app push notification reminder.'
  },
  {
    id: 'ai-not-3',
    type: 'Reminder Rec',
    severity: 'Info',
    title: 'Optimal Notice Engagement Window: 08:30 AM - 10:00 AM',
    description: 'Parent notification open rate reaches 96.4% when scheduled in early morning slots.',
    targetGroup: 'All Parent Communications',
    suggestedAction: 'Schedule upcoming PTM notice for Aug 10, 08:30 AM.'
  }
];

export const mockNoticeAlerts: NoticeAlert[] = [
  {
    id: 'alt-not-1',
    timestamp: '09:45 AM',
    type: 'High Priority Circular',
    severity: 'high',
    title: 'CBSE Mid-Term Exam circular published',
    details: '98% read rate achieved across senior secondary grades.',
    resolved: true
  },
  {
    id: 'alt-not-2',
    timestamp: '08:30 AM',
    type: 'Exam Notice Pending',
    severity: 'medium',
    title: 'Grade 9 Practical Exam schedule pending approval',
    details: 'Draft notification awaiting Academic Coordinator signoff.',
    resolved: false
  },
  {
    id: 'alt-not-3',
    timestamp: '08:00 AM',
    type: 'Assignment Deadline',
    severity: 'high',
    title: 'Pre-Board Assignment submission deadline tomorrow',
    details: '56 pending acknowledgements logged.',
    resolved: false
  }
];

export const noticeCategoryCards = [
  { title: 'Academic Calendar', count: 14, icon: 'Calendar' },
  { title: 'Examinations', count: 42, icon: 'FileText' },
  { title: 'Assignments', count: 86, icon: 'BookOpen' },
  { title: 'Online Classes', count: 32, icon: 'Video' },
  { title: 'Lesson Plans', count: 28, icon: 'Layers' },
  { title: 'Curriculum', count: 18, icon: 'Sparkles' },
  { title: 'Results', count: 24, icon: 'Award' },
  { title: 'PTM', count: 12, icon: 'Users' },
  { title: 'Holiday Homework', count: 38, icon: 'Briefcase' },
  { title: 'Policy Updates', count: 16, icon: 'ShieldCheck' },
  { title: 'Department Circulars', count: 72, icon: 'Building2' },
  { title: 'Government Circulars', count: 46, icon: 'FileCheck' }
];
