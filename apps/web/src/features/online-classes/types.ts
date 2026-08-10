export type MeetingPlatform = 'Google Meet' | 'Microsoft Teams' | 'Zoom' | 'Jitsi';

export type ClassStatus = 'Live' | 'Upcoming' | 'Completed' | 'Cancelled' | 'Rescheduled';

export type TeacherStatus = 'Available' | 'Teaching' | 'On Leave' | 'Meeting' | 'Internet Issue';

export type RequestType = 'Need Rescheduling' | 'Platform Request' | 'Additional Class Request' | 'Recording Request';

export interface LiveOnlineClass {
  id: string;
  subject: string;
  topic: string;
  teacherId: string;
  teacherName: string;
  teacherAvatar: string;
  teacherDept: string;
  grade: string;
  section: string;
  startTime: string;
  durationMinutes: number;
  elapsedMinutes: number;
  studentsJoined: number;
  totalStudents: number;
  attendancePercentage: number;
  platform: MeetingPlatform;
  meetingLink: string;
  status: ClassStatus;
  isRecordingActive: boolean;
  engagementScore: number; // 0 - 100%
  audioQuality: 'Excellent' | 'Good' | 'Poor';
}

export interface ScheduledClass {
  id: string;
  timeSlot: string;
  subject: string;
  topic: string;
  grade: string;
  section: string;
  teacherName: string;
  teacherAvatar: string;
  platform: MeetingPlatform;
  meetingLink: string;
  status: ClassStatus;
  attendance?: string;
  recordingUrl?: string;
  preparationStatus: 'Ready' | 'Link Pending' | 'Co-Host Required' | 'Materials Uploaded';
}

export interface TeacherAvailability {
  id: string;
  name: string;
  avatar: string;
  department: string;
  status: TeacherStatus;
  lastOnline: string;
  nextClassTime?: string;
  nextClassSubject?: string;
  todayClassesCount: number;
  networkQuality: '100% Fiber' | 'Stable 4G' | 'Fluctuating' | 'Offline';
}

export interface ClassRequest {
  id: string;
  teacherName: string;
  teacherAvatar: string;
  requestType: RequestType;
  className: string;
  subject: string;
  originalTime: string;
  proposedTime?: string;
  reason: string;
  requestedPlatform?: MeetingPlatform;
  submittedTime: string;
  urgency: 'High' | 'Medium' | 'Low';
}

export interface PlatformHealthItem {
  id: string;
  name: MeetingPlatform;
  icon: string;
  apiStatus: 'Operational' | 'Degraded' | 'Maintenance' | 'Outage';
  connectionQuality: number; // e.g. 99.9%
  latencyMs: number;
  meetingFailuresToday: number;
  activeSessions: number;
  maxSimultaneousLimit: number;
}

export interface AIInsight {
  id: string;
  type: 'Low Attendance' | 'Late Start' | 'Low Participation' | 'Over Duration' | 'Cancellation Pattern' | 'Teacher Overload';
  severity: 'Critical' | 'Warning' | 'Info';
  title: string;
  description: string;
  affectedClassOrTeacher: string;
  suggestedAction: string;
  actionLabel: string;
}

export interface ClassRecording {
  id: string;
  subject: string;
  topic: string;
  gradeSection: string;
  teacherName: string;
  duration: string;
  fileSize: string;
  date: string;
  recordingStatus: 'Processed' | 'Processing' | 'Failed';
  publishStatus: 'Published' | 'Private' | 'Pending Review';
  videoUrl: string;
  views: number;
}

export interface RealtimeAlert {
  id: string;
  timestamp: string;
  type: 'Teacher Absent' | 'Meeting Failed' | 'Low Attendance' | 'Platform Outage' | 'Network Issue' | 'Recording Failed';
  severity: 'high' | 'medium' | 'low';
  title: string;
  details: string;
  read: boolean;
}
