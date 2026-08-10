import type { 
  LiveOnlineClass, 
  ScheduledClass, 
  TeacherAvailability, 
  ClassRequest, 
  PlatformHealthItem, 
  AIInsight, 
  ClassRecording, 
  RealtimeAlert 
} from './types';

export const mockLiveClasses: LiveOnlineClass[] = [
  {
    id: 'live-1',
    subject: 'Physics',
    topic: 'Electromagnetic Induction & Faraday\'s Law',
    teacherId: 'tch-101',
    teacherName: 'Dr. Rajesh Sharma',
    teacherAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
    teacherDept: 'Department of Science',
    grade: 'Grade 11',
    section: 'B',
    startTime: '10:00 AM',
    durationMinutes: 60,
    elapsedMinutes: 42,
    studentsJoined: 42,
    totalStudents: 45,
    attendancePercentage: 93.3,
    platform: 'Google Meet',
    meetingLink: 'https://meet.google.com/edu-phys-g11b',
    status: 'Live',
    isRecordingActive: true,
    engagementScore: 91,
    audioQuality: 'Excellent'
  },
  {
    id: 'live-2',
    subject: 'Mathematics',
    topic: 'Integral Calculus & Area Under Curves',
    teacherId: 'tch-102',
    teacherName: 'Mrs. Kavitha Menon',
    teacherAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150',
    teacherDept: 'Department of Mathematics',
    grade: 'Grade 12',
    section: 'A',
    startTime: '10:15 AM',
    durationMinutes: 45,
    elapsedMinutes: 27,
    studentsJoined: 38,
    totalStudents: 40,
    attendancePercentage: 95.0,
    platform: 'Microsoft Teams',
    meetingLink: 'https://teams.microsoft.com/l/meetup-join/edu-math-12a',
    status: 'Live',
    isRecordingActive: true,
    engagementScore: 94,
    audioQuality: 'Excellent'
  },
  {
    id: 'live-3',
    subject: 'Biology',
    topic: 'Cellular Respiration & ATP Synthesis',
    teacherId: 'tch-103',
    teacherName: 'Dr. Ananya Roy',
    teacherAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150',
    teacherDept: 'Department of Life Sciences',
    grade: 'Grade 9',
    section: 'A',
    startTime: '10:30 AM',
    durationMinutes: 45,
    elapsedMinutes: 12,
    studentsJoined: 46,
    totalStudents: 48,
    attendancePercentage: 95.8,
    platform: 'Zoom',
    meetingLink: 'https://zoom.us/j/9847123908',
    status: 'Live',
    isRecordingActive: true,
    engagementScore: 89,
    audioQuality: 'Good'
  },
  {
    id: 'live-4',
    subject: 'Computer Science',
    topic: 'Data Structures: Binary Search Trees',
    teacherId: 'tch-104',
    teacherName: 'Prof. Vikramaditya Verma',
    teacherAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    teacherDept: 'Department of Technology',
    grade: 'Grade 12',
    section: 'C',
    startTime: '10:15 AM',
    durationMinutes: 60,
    elapsedMinutes: 30,
    studentsJoined: 35,
    totalStudents: 36,
    attendancePercentage: 97.2,
    platform: 'Google Meet',
    meetingLink: 'https://meet.google.com/edu-cs-g12c',
    status: 'Live',
    isRecordingActive: true,
    engagementScore: 96,
    audioQuality: 'Excellent'
  },
  {
    id: 'live-5',
    subject: 'English Literature',
    topic: 'Analysis of Shakespearean Sonnets',
    teacherId: 'tch-105',
    teacherName: 'Ms. Sarah Jenkins',
    teacherAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150',
    teacherDept: 'Department of English',
    grade: 'Grade 10',
    section: 'A',
    startTime: '10:35 AM',
    durationMinutes: 45,
    elapsedMinutes: 7,
    studentsJoined: 41,
    totalStudents: 44,
    attendancePercentage: 93.1,
    platform: 'Microsoft Teams',
    meetingLink: 'https://teams.microsoft.com/l/meetup-join/edu-eng-10a',
    status: 'Live',
    isRecordingActive: true,
    engagementScore: 87,
    audioQuality: 'Good'
  },
  {
    id: 'live-6',
    subject: 'Chemistry',
    topic: 'Organic Synthesis & Reaction Mechanisms',
    teacherId: 'tch-106',
    teacherName: 'Dr. Sonia Gandhi',
    teacherAvatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=150',
    teacherDept: 'Department of Chemistry',
    grade: 'Grade 11',
    section: 'A',
    startTime: '10:00 AM',
    durationMinutes: 60,
    elapsedMinutes: 44,
    studentsJoined: 30,
    totalStudents: 44,
    attendancePercentage: 68.2, // Low attendance warning!
    platform: 'Zoom',
    meetingLink: 'https://zoom.us/j/9123847510',
    status: 'Live',
    isRecordingActive: false,
    engagementScore: 72,
    audioQuality: 'Fair'
  }
];

export const mockTodaySchedule: ScheduledClass[] = [
  {
    id: 'sch-1',
    timeSlot: '08:00 AM',
    subject: 'Mathematics',
    topic: 'Quadratic Equations & Roots',
    grade: 'Grade 10',
    section: 'A',
    teacherName: 'Mr. Arun Sharma',
    teacherAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
    platform: 'Google Meet',
    meetingLink: 'https://meet.google.com/edu-math-10a',
    status: 'Completed',
    attendance: '43/45 (95.5%)',
    recordingUrl: 'rec-801',
    preparationStatus: 'Ready'
  },
  {
    id: 'sch-2',
    timeSlot: '09:00 AM',
    subject: 'Physics',
    topic: 'Kinematics & Projectile Motion',
    grade: 'Grade 11',
    section: 'B',
    teacherName: 'Mrs. Kavitha Menon',
    teacherAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150',
    platform: 'Microsoft Teams',
    meetingLink: 'https://teams.microsoft.com/l/meetup-join/edu-phys-11b',
    status: 'Completed',
    attendance: '41/43 (95.3%)',
    recordingUrl: 'rec-802',
    preparationStatus: 'Ready'
  },
  {
    id: 'sch-3',
    timeSlot: '10:00 AM',
    subject: 'Biology',
    topic: 'Cellular Respiration & ATP Synthesis',
    grade: 'Grade 9',
    section: 'A',
    teacherName: 'Dr. Ananya Roy',
    teacherAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150',
    platform: 'Zoom',
    meetingLink: 'https://zoom.us/j/9847123908',
    status: 'Live',
    attendance: '46/48 (95.8%)',
    preparationStatus: 'Ready'
  },
  {
    id: 'sch-4',
    timeSlot: '11:15 AM',
    subject: 'History & Civics',
    topic: 'The Industrial Revolution in Europe',
    grade: 'Grade 9',
    section: 'B',
    teacherName: 'Mrs. Anita Desai',
    teacherAvatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=150',
    platform: 'Google Meet',
    meetingLink: 'https://meet.google.com/edu-hist-9b',
    status: 'Upcoming',
    preparationStatus: 'Deck Ready'
  },
  {
    id: 'sch-5',
    timeSlot: '12:00 PM',
    subject: 'Economics',
    topic: 'Macroeconomic Policies & Inflation Rate',
    grade: 'Grade 12',
    section: 'B',
    teacherName: 'Mr. Rajesh Khanna',
    teacherAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150',
    platform: 'Microsoft Teams',
    meetingLink: 'https://teams.microsoft.com/l/meetup-join/edu-econ-12b',
    status: 'Upcoming',
    preparationStatus: 'Link Pending'
  },
  {
    id: 'sch-6',
    timeSlot: '01:30 PM',
    subject: 'French Language',
    topic: 'Advanced Grammar & Conversational Drill',
    grade: 'Grade 11',
    section: 'C',
    teacherName: 'Mme. Claire Dubois',
    teacherAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150',
    platform: 'Jitsi',
    meetingLink: 'https://meet.jit.si/edu-french-11c',
    status: 'Rescheduled',
    preparationStatus: 'Co-Host Required'
  }
];

export const mockTeachersAvailability: TeacherAvailability[] = [
  {
    id: 'tch-101',
    name: 'Dr. Rajesh Sharma',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
    department: 'Physics',
    status: 'Teaching',
    lastOnline: 'Active Now',
    nextClassTime: '02:00 PM',
    nextClassSubject: 'Grade 12 Physics Lab',
    todayClassesCount: 4,
    networkQuality: '100% Fiber'
  },
  {
    id: 'tch-102',
    name: 'Mrs. Kavitha Menon',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150',
    department: 'Mathematics',
    status: 'Teaching',
    lastOnline: 'Active Now',
    nextClassTime: '01:30 PM',
    nextClassSubject: 'Grade 10 Remedial Math',
    todayClassesCount: 3,
    networkQuality: '100% Fiber'
  },
  {
    id: 'tch-103',
    name: 'Dr. Ananya Roy',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150',
    department: 'Biology',
    status: 'Teaching',
    lastOnline: 'Active Now',
    nextClassTime: '03:00 PM',
    nextClassSubject: 'Grade 9 Biology Seminar',
    todayClassesCount: 3,
    networkQuality: 'Stable 4G'
  },
  {
    id: 'tch-104',
    name: 'Prof. Vikramaditya Verma',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    department: 'Computer Science',
    status: 'Available',
    lastOnline: '3 mins ago',
    nextClassTime: '01:00 PM',
    nextClassSubject: 'Grade 11 Python Programming',
    todayClassesCount: 2,
    networkQuality: '100% Fiber'
  },
  {
    id: 'tch-105',
    name: 'Mr. Arvind Iyer',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
    department: 'Mathematics',
    status: 'On Leave',
    lastOnline: 'Yesterday',
    todayClassesCount: 0,
    networkQuality: 'Offline'
  },
  {
    id: 'tch-106',
    name: 'Dr. Sonia Gandhi',
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=150',
    department: 'Chemistry',
    status: 'Internet Issue',
    lastOnline: '12 mins ago',
    nextClassTime: '11:30 AM',
    nextClassSubject: 'Grade 10 Chemistry',
    todayClassesCount: 5,
    networkQuality: 'Fluctuating'
  },
  {
    id: 'tch-107',
    name: 'Mrs. Anita Desai',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=150',
    department: 'Social Studies',
    status: 'Meeting',
    lastOnline: '5 mins ago',
    nextClassTime: '11:15 AM',
    nextClassSubject: 'Grade 9 History',
    todayClassesCount: 3,
    networkQuality: '100% Fiber'
  }
];

export const mockClassRequests: ClassRequest[] = [
  {
    id: 'req-101',
    teacherName: 'Dr. Sonia Gandhi',
    teacherAvatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=150',
    requestType: 'Need Rescheduling',
    className: 'Grade 11 Chemistry',
    subject: 'Chemistry',
    originalTime: 'Today 11:30 AM',
    proposedTime: 'Today 02:30 PM',
    reason: 'Broadband connectivity disruption in home office. ISP resolving by 1 PM.',
    submittedTime: '15 mins ago',
    urgency: 'High'
  },
  {
    id: 'req-102',
    teacherName: 'Prof. Vikramaditya Verma',
    teacherAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    requestType: 'Platform Request',
    className: 'Grade 12 Computer Science',
    subject: 'Computer Science',
    originalTime: 'Today 01:00 PM',
    reason: 'Requesting Zoom license upgrade to enable breakout rooms for live coding workshops.',
    requestedPlatform: 'Zoom',
    submittedTime: '45 mins ago',
    urgency: 'Medium'
  },
  {
    id: 'req-103',
    teacherName: 'Mrs. Kavitha Menon',
    teacherAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150',
    requestType: 'Additional Class Request',
    className: 'Grade 12 Mathematics (Remedial)',
    subject: 'Mathematics',
    originalTime: 'Tomorrow 04:00 PM',
    reason: 'Special problem-solving session for weak calculus students ahead of mid-term test.',
    submittedTime: '2 hours ago',
    urgency: 'Low'
  },
  {
    id: 'req-104',
    teacherName: 'Ms. Sarah Jenkins',
    teacherAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150',
    requestType: 'Recording Request',
    className: 'Grade 10 English Literature',
    subject: 'English',
    originalTime: 'Today 10:35 AM',
    reason: 'Auto-publish recording to LMS immediately after class for absent Grade 10 debate team.',
    submittedTime: '1 hour ago',
    urgency: 'Medium'
  }
];

export const mockPlatformHealth: PlatformHealthItem[] = [
  {
    id: 'ph-1',
    name: 'Google Meet',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/9/9b/Google_Meet_icon_%282020%29.svg',
    apiStatus: 'Operational',
    connectionQuality: 99.9,
    latencyMs: 22,
    meetingFailuresToday: 0,
    activeSessions: 22,
    maxSimultaneousLimit: 100
  },
  {
    id: 'ph-2',
    name: 'Microsoft Teams',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/c/c9/Microsoft_Office_Teams_%282018%E2%80%93present%29.svg',
    apiStatus: 'Operational',
    connectionQuality: 99.8,
    latencyMs: 31,
    meetingFailuresToday: 0,
    activeSessions: 16,
    maxSimultaneousLimit: 80
  },
  {
    id: 'ph-3',
    name: 'Zoom',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Zoom_Communications_Logo.svg',
    apiStatus: 'Operational',
    connectionQuality: 100.0,
    latencyMs: 16,
    meetingFailuresToday: 0,
    activeSessions: 8,
    maxSimultaneousLimit: 50
  },
  {
    id: 'ph-4',
    name: 'Jitsi',
    icon: 'https://jitsi.org/wp-content/uploads/2018/06/jitsi-logo-blue.png',
    apiStatus: 'Operational',
    connectionQuality: 99.5,
    latencyMs: 42,
    meetingFailuresToday: 0,
    activeSessions: 2,
    maxSimultaneousLimit: 20
  }
];

export const mockAIInsights: AIInsight[] = [
  {
    id: 'ai-1',
    type: 'Low Attendance',
    severity: 'Critical',
    title: 'Low Attendance Alert in Grade 11 Chemistry',
    description: 'Attendance in Dr. Sonia Gandhi\'s Grade 11-A Chemistry class dropped to 68.2% (14 students missing).',
    affectedClassOrTeacher: 'Grade 11-A Chemistry',
    suggestedAction: 'Send automated SMS alert to parents of absent students & notify section coordinator.',
    actionLabel: 'Notify Parents & Coordinator'
  },
  {
    id: 'ai-2',
    type: 'Late Start',
    severity: 'Warning',
    title: 'Frequent Late Starts Detected',
    description: '2 faculty members started online sessions over 6 minutes after scheduled time twice this week.',
    affectedClassOrTeacher: 'Prof. Arvind Iyer & Ms. Sarah Jenkins',
    suggestedAction: 'Send automated calendar prompt & enable 5-minute pre-class audio chime.',
    actionLabel: 'Send Pre-Class Reminder'
  },
  {
    id: 'ai-3',
    type: 'Teacher Overload',
    severity: 'Warning',
    title: 'High Virtual Teaching Load Warning',
    description: 'Dr. Sonia Gandhi is scheduled for 5 consecutive live sessions today without bandwidth break.',
    affectedClassOrTeacher: 'Dr. Sonia Gandhi (5 sessions today)',
    suggestedAction: 'Reassign 02:30 PM session to substitute teacher or convert to recorded self-paced module.',
    actionLabel: 'Assign Substitute Teacher'
  },
  {
    id: 'ai-4',
    type: 'Over Duration',
    severity: 'Info',
    title: 'Class Duration Overrun Pattern',
    description: 'Grade 12 Calculus sessions consistently overrun scheduled time by 12+ minutes, causing delay in subsequent periods.',
    affectedClassOrTeacher: 'Grade 12 Mathematics (Mrs. Kavitha Menon)',
    suggestedAction: 'Extend default timetable block for Grade 12 Math from 45m to 60m.',
    actionLabel: 'Adjust Timetable Block'
  }
];

export const mockRecordings: ClassRecording[] = [
  {
    id: 'rec-1',
    subject: 'Physics',
    topic: 'Electromagnetic Waves & Radiation Properties',
    gradeSection: 'Grade 12-A',
    teacherName: 'Dr. Rajesh Sharma',
    duration: '52 mins',
    fileSize: '480 MB (MP4)',
    date: 'Today, 09:00 AM',
    recordingStatus: 'Processed',
    publishStatus: 'Published',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    views: 84
  },
  {
    id: 'rec-2',
    subject: 'Computer Science',
    topic: 'Object Oriented Principles in C++',
    gradeSection: 'Grade 11-C',
    teacherName: 'Prof. Vikramaditya Verma',
    duration: '45 mins',
    fileSize: '390 MB (MP4)',
    date: 'Today, 08:00 AM',
    recordingStatus: 'Processed',
    publishStatus: 'Published',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    views: 112
  },
  {
    id: 'rec-3',
    subject: 'Organic Chemistry',
    topic: 'Alcohols, Phenols & Ethers Detailed Mechanism',
    gradeSection: 'Grade 12-B',
    teacherName: 'Dr. Sonia Gandhi',
    duration: '58 mins',
    fileSize: '510 MB (MP4)',
    date: 'Yesterday, 02:00 PM',
    recordingStatus: 'Processed',
    publishStatus: 'Pending Review',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    views: 45
  },
  {
    id: 'rec-4',
    subject: 'English Literature',
    topic: 'Macbeth Act 3 Scene 2 Character Study',
    gradeSection: 'Grade 10-A',
    teacherName: 'Ms. Sarah Jenkins',
    duration: '42 mins',
    fileSize: '340 MB (MP4)',
    date: 'Yesterday, 11:00 AM',
    recordingStatus: 'Processing',
    publishStatus: 'Private',
    videoUrl: '',
    views: 0
  }
];

export const mockRealtimeAlerts: RealtimeAlert[] = [
  {
    id: 'alt-1',
    timestamp: '10:04 AM',
    type: 'Low Attendance',
    severity: 'high',
    title: 'Grade 11 Chemistry low attendance (68%)',
    details: 'Dr. Sonia Gandhi\'s session has only 30/44 students active.',
    read: false
  },
  {
    id: 'alt-2',
    timestamp: '09:50 AM',
    type: 'Network Issue',
    severity: 'medium',
    title: 'High latency detected for Prof. Verma',
    details: 'Packet loss of 4.2% on Google Meet node 14.',
    read: false
  },
  {
    id: 'alt-3',
    timestamp: '09:15 AM',
    type: 'Teacher Absent',
    severity: 'high',
    title: 'Mr. Arvind Iyer marked on leave',
    details: 'Grade 10 Math class substitute reassignment needed for 02:00 PM.',
    read: true
  },
  {
    id: 'alt-4',
    timestamp: '08:45 AM',
    type: 'Recording Failed',
    severity: 'low',
    title: 'Grade 9 History cloud recording retry success',
    details: 'Backup cloud mirror uploaded 340MB file successfully.',
    read: true
  }
];

export const attendanceTrendData = [
  { day: 'Mon', attendance: 91, target: 90 },
  { day: 'Tue', attendance: 94, target: 90 },
  { day: 'Wed', attendance: 92, target: 90 },
  { day: 'Thu', attendance: 89, target: 90 },
  { day: 'Fri', attendance: 95, target: 90 },
  { day: 'Sat', attendance: 88, target: 90 }
];

export const gradeWiseAttendanceData = [
  { grade: 'Grade 8', attendance: 95, totalStudents: 120 },
  { grade: 'Grade 9', attendance: 93, totalStudents: 140 },
  { grade: 'Grade 10', attendance: 94, totalStudents: 135 },
  { grade: 'Grade 11', attendance: 89, totalStudents: 150 },
  { grade: 'Grade 12', attendance: 92, totalStudents: 160 }
];

export const platformUsageData = [
  { name: 'Google Meet', sessions: 22, percentage: 46, color: '#34A853' },
  { name: 'MS Teams', sessions: 16, percentage: 33, color: '#6264A7' },
  { name: 'Zoom', sessions: 8, percentage: 17, color: '#2D8CFF' },
  { name: 'Jitsi', sessions: 2, percentage: 4, color: '#1D76BA' }
];
