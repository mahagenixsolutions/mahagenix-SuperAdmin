import type {
  AdmissionEnquiry, VisitorPass, AppointmentRecord,
  StudentHelpDeskRequest, ParentHelpDeskTicket, CertificateRecord,
  GatePassRecord, PhoneCallLog, CommunicationMessage, LostFoundItem,
  ReceptionAnnouncement, AiReceptionInsight
} from './types';

export const mockAdmissionEnquiries: AdmissionEnquiry[] = [
  {
    id: 'ENQ-101',
    enquiryNumber: 'ADM-2025-089',
    studentName: 'Kabir Varma',
    parentName: 'Rohan Varma',
    phone: '+91 98765 43210',
    email: 'rohan.v@gmail.com',
    interestedGrade: 'Class 6',
    channel: 'Walk-in',
    enquiryDate: '2026-07-22',
    followUpDate: '2026-07-25',
    counsellingStatus: 'Campus Tour Completed',
    notes: 'Parent visited campus; impressed with STEM robotics lab.',
  },
  {
    id: 'ENQ-102',
    enquiryNumber: 'ADM-2025-090',
    studentName: 'Riya Deshmukh',
    parentName: 'Anand Deshmukh',
    phone: '+91 98220 11223',
    email: 'anand.d@outlook.com',
    interestedGrade: 'Class 11-Science',
    channel: 'Online Form',
    enquiryDate: '2026-07-23',
    followUpDate: '2026-07-24',
    counsellingStatus: 'New Lead',
    notes: 'Inquired about IIT-JEE coaching integrated batch.',
  },
  {
    id: 'ENQ-103',
    enquiryNumber: 'ADM-2025-091',
    studentName: 'Aditya Kulkarni',
    parentName: 'Suresh Kulkarni',
    phone: '+91 98110 99887',
    email: 'suresh.k@gmail.com',
    interestedGrade: 'Class 1',
    channel: 'Phone Call',
    enquiryDate: '2026-07-21',
    followUpDate: '2026-07-26',
    counsellingStatus: 'Application Submitted',
    notes: 'Form submitted; entrance assessment scheduled.',
  },
];

export const mockVisitorPasses: VisitorPass[] = [
  {
    id: 'VIS-301',
    badgeNumber: 'BADGE-042',
    visitorName: 'Rohan Varma',
    phone: '+91 98765 43210',
    relation: 'Parent / Prospect',
    purpose: 'Admission Inquiry',
    hostEmployee: 'Mrs. Sunita Deshmukh (Admission Counsellor)',
    idProofType: 'Aadhaar Card',
    idProofNumber: 'XXXX-XXXX-8890',
    checkInTime: '10:15 AM',
    isBlacklisted: false,
    status: 'In Campus',
  },
  {
    id: 'VIS-302',
    badgeNumber: 'BADGE-043',
    visitorName: 'Vijay Kumar',
    phone: '+91 98330 55443',
    relation: 'Vendor Representative',
    purpose: 'Vendor Meeting',
    hostEmployee: 'Mr. Rajesh Iyer (Accounts Officer)',
    idProofType: 'Driving License',
    idProofNumber: 'KA-01-2021-9988',
    checkInTime: '09:30 AM',
    checkOutTime: '11:15 AM',
    isBlacklisted: false,
    status: 'Checked Out',
  },
];

export const mockAppointments: AppointmentRecord[] = [
  {
    id: 'APT-501',
    appointmentCode: 'APT-2026-12',
    visitorName: 'Dr. Meena Swaminathan',
    relation: 'Parent of Arjun (Class 10)',
    phone: '+91 98440 22334',
    hostName: 'Dr. Ramesh Chandra',
    hostRole: 'Principal',
    date: '2026-07-23',
    timeSlot: '11:30 AM - 12:00 PM',
    purpose: 'Discussion regarding national olympiad sponsorship.',
    status: 'Upcoming',
  },
  {
    id: 'APT-502',
    appointmentCode: 'APT-2026-13',
    visitorName: 'Sanjay Mehta',
    relation: 'Parent of Vivaan (Class 9)',
    phone: '+91 98440 99887',
    hostName: 'Prof. Alok Verma',
    hostRole: 'Academic Coordinator',
    date: '2026-07-23',
    timeSlot: '02:00 PM - 02:30 PM',
    purpose: 'Academic progress and elective subject choice.',
    status: 'Upcoming',
  },
];

export const mockStudentHelpDesk: StudentHelpDeskRequest[] = [
  {
    id: 'SHD-801',
    requestCode: 'REQ-STU-441',
    studentId: 'STU-104',
    studentName: 'Aarav Sharma',
    classGrade: 'Class 10-A',
    requestType: 'Bonafide Certificate',
    dateFiled: '2026-07-22',
    targetDate: '2026-07-24',
    priority: 'Medium',
    status: 'Ready for Pickup',
  },
  {
    id: 'SHD-802',
    requestCode: 'REQ-STU-442',
    studentId: 'STU-112',
    studentName: 'Vivaan Mehta',
    classGrade: 'Class 9-C',
    requestType: 'Duplicate ID Card',
    dateFiled: '2026-07-23',
    targetDate: '2026-07-25',
    priority: 'Low',
    status: 'Processing',
  },
];

export const mockParentHelpDesk: ParentHelpDeskTicket[] = [
  {
    id: 'PHD-901',
    ticketNumber: 'TKT-PAR-901',
    parentName: 'Pravin Patel',
    studentName: 'Siya Patel',
    classGrade: 'Class 11-B',
    phone: '+91 98330 11223',
    category: 'Fee Structure',
    subject: 'Receipt required for term fee payment',
    dateCreated: '2026-07-22',
    assignedStaff: 'Accounts Desk',
    status: 'In Progress',
  },
];

export const mockCertificates: CertificateRecord[] = [
  {
    id: 'CRT-201',
    certificateNumber: 'CERT-2026-781',
    certificateType: 'Bonafide Certificate',
    studentId: 'STU-104',
    studentName: 'Aarav Sharma',
    classGrade: 'Class 10-A',
    issueDate: '2026-07-23',
    verificationCode: 'VER-8829-BONA',
    issuedBy: 'Principal Office / Reception',
    status: 'Approved',
  },
  {
    id: 'CRT-202',
    certificateNumber: 'CERT-2026-782',
    certificateType: 'Transfer Certificate',
    studentId: 'STU-115',
    studentName: 'Ananya Sen',
    classGrade: 'Class 12-A',
    issueDate: '2026-07-20',
    verificationCode: 'VER-9910-TC',
    issuedBy: 'Principal Office',
    status: 'Printed',
  },
];

export const mockGatePasses: GatePassRecord[] = [
  {
    id: 'GP-601',
    passNumber: 'GP-2026-441',
    passType: 'Student Exit Pass',
    personName: 'Aarav Sharma',
    studentClassRoom: 'Class 10-A (Room A-101)',
    outTime: '02:30 PM',
    expectedInTime: '05:30 PM',
    approvedBy: 'Vice Principal & Warden',
    reason: 'Dental appointment visit with parent.',
    status: 'Approved',
  },
  {
    id: 'GP-602',
    passNumber: 'GP-2026-442',
    passType: 'Visitor Exit Pass',
    personName: 'Vijay Kumar (Vendor)',
    outTime: '11:15 AM',
    approvedBy: 'Accounts Officer',
    reason: 'Official vendor meeting completed.',
    status: 'Returned',
  },
];

export const mockCallLogs: PhoneCallLog[] = [
  {
    id: 'CALL-101',
    callRef: 'CALL-091',
    callType: 'Incoming',
    callerName: 'Sunita Rao',
    callerPhone: '+91 98110 33221',
    recipientDepartment: 'Admissions',
    callTime: '09:45 AM',
    durationMinutes: 4,
    notes: 'Inquired about fee structure for Class 1 entry.',
    followUpRequired: true,
    followUpDate: '2026-07-24',
  },
  {
    id: 'CALL-102',
    callRef: 'CALL-092',
    callType: 'Outgoing',
    callerName: 'Mahesh Sharma',
    callerPhone: '+91 98110 44332',
    recipientDepartment: 'General Inquiry',
    callTime: '10:30 AM',
    durationMinutes: 2,
    notes: 'Confirmed pickup timing for Aarav Sharma.',
    followUpRequired: false,
  },
];

export const mockCommunications: CommunicationMessage[] = [
  {
    id: 'COMM-301',
    messageRef: 'MSG-881',
    channel: 'SMS',
    recipientGroup: 'All Parents',
    subject: 'Parent-Teacher Meeting Reminder',
    content: 'Dear Parent, PTM is scheduled for Saturday 26th July from 09:00 AM to 01:00 PM.',
    sentDate: '2026-07-22',
    deliveryCount: 1250,
    status: 'Delivered',
  },
];

export const mockLostFoundItems: LostFoundItem[] = [
  {
    id: 'LF-701',
    itemCode: 'LF-2026-09',
    type: 'Found',
    itemName: 'Blue Milton Thermosteel Water Bottle',
    category: 'Water Bottle',
    locationFoundLost: 'Main Basketball Court Bench',
    dateReported: '2026-07-22',
    reportedBy: 'Security Guard Ramesh',
    status: 'Unclaimed',
  },
];

export const mockAnnouncements: ReceptionAnnouncement[] = [
  {
    id: 'ANC-401',
    announcementCode: 'ANC-2026-15',
    title: 'Annual Sports Meet 2026 Trials Announcement',
    category: 'School Notice',
    targetAudience: 'All Students & Staff',
    publishDate: '2026-07-21',
    expiryDate: '2026-07-30',
    publishedBy: 'Principal Office',
    priority: 'Normal',
    readCount: 840,
  },
];

export const mockAiReceptionInsights: AiReceptionInsight[] = [
  {
    id: 'INS-REC-01',
    type: 'footfall',
    title: 'Peak Front-Office Footfall Forecast',
    description: 'Expected 45+ walk-in visitors today between 10:00 AM – 12:30 PM due to Class 11 counselling & PTM passes.',
    metric: 'Peak: 10:30 AM',
    actionText: 'Deploy Extra Reception Staff',
    impact: 'High',
  },
  {
    id: 'INS-REC-02',
    type: 'conversion',
    title: 'Admission Lead Follow-up Alert',
    description: '8 walk-in enquiries from yesterday require follow-up calls before 02:00 PM to maximize conversion.',
    metric: '8 Pending Calls',
    actionText: 'Open Telephony Follow-up Queue',
    impact: 'High',
  },
  {
    id: 'INS-REC-03',
    type: 'helpdesk',
    title: 'Bonafide Certificate Demand Surge',
    description: '14 Bonafide certificate requests pending for passport/visa applications. Batch print queue ready.',
    metric: '14 Certificates',
    actionText: 'Print Batch Certificates',
    impact: 'Medium',
  },
];
