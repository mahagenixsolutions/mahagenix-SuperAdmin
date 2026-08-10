export type NoticePriority = 'Critical' | 'High' | 'Medium' | 'Low';

export type NoticeStatus = 'Published' | 'Scheduled' | 'Draft' | 'Expired';

export type NoticeCategory = 
  | 'Academic Calendar' 
  | 'Examinations' 
  | 'Assignments' 
  | 'Online Classes' 
  | 'Lesson Plans' 
  | 'Curriculum' 
  | 'Results' 
  | 'PTM' 
  | 'Holiday Homework' 
  | 'Policy Updates' 
  | 'Department Circulars' 
  | 'Government Circulars';

export interface AcademicNoticeItem {
  id: string;
  title: string;
  description: string;
  category: NoticeCategory;
  priority: NoticePriority;
  department: string;
  createdBy: string;
  creatorAvatar: string;
  publishDate: string;
  expiryDate: string;
  targetAudience: string;
  attachments: { name: string; type: 'PDF' | 'DOCX' | 'XLSX'; size: string }[];
  readPercentage: number;
  acknowledgedPercentage: number;
  status: NoticeStatus;
}

export interface AcknowledgementTrackerItem {
  id: string;
  noticeTitle: string;
  targetGroup: string;
  totalRecipients: number;
  readCount: number;
  unreadCount: number;
  acknowledgedCount: number;
  pendingCount: number;
  lastReminderSent: string;
}

export interface AINoticeInsight {
  id: string;
  type: 'Unread Notice' | 'Dept Missing Ack' | 'Parent Unread' | 'Student Alert' | 'Reminder Rec';
  severity: 'Critical' | 'Warning' | 'Info' | 'Success';
  title: string;
  description: string;
  targetGroup: string;
  suggestedAction: string;
}

export interface NoticeAlert {
  id: string;
  timestamp: string;
  type: 'High Priority Circular' | 'Exam Notice Pending' | 'Assignment Deadline' | 'Result Publication' | 'Unread Count Alert';
  severity: 'high' | 'medium' | 'low';
  title: string;
  details: string;
  resolved: boolean;
}
