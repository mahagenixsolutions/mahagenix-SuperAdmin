export interface AdmissionEnquiry {
  id: string;
  enquiryNumber: string;
  studentName: string;
  parentName: string;
  phone: string;
  email: string;
  interestedGrade: string;
  channel: 'Walk-in' | 'Online Form' | 'Phone Call' | 'Referral';
  enquiryDate: string;
  followUpDate: string;
  counsellingStatus: 'New Lead' | 'Counselling Scheduled' | 'Campus Tour Completed' | 'Application Submitted' | 'Closed - Converted' | 'Closed - Dropped';
  notes?: string;
}

export interface VisitorPass {
  id: string;
  badgeNumber: string;
  visitorName: string;
  phone: string;
  relation: string;
  purpose: 'Parent Meeting' | 'Vendor Meeting' | 'Admission Inquiry' | 'Official Work' | 'Student Pickup';
  hostEmployee: string;
  idProofType: 'Aadhaar Card' | 'Driving License' | 'PAN Card' | 'Passport';
  idProofNumber: string;
  checkInTime: string;
  checkOutTime?: string;
  isBlacklisted: boolean;
  status: 'In Campus' | 'Checked Out' | 'Overstay Alert';
}

export interface AppointmentRecord {
  id: string;
  appointmentCode: string;
  visitorName: string;
  relation: string;
  phone: string;
  hostName: string;
  hostRole: 'Principal' | 'Vice Principal' | 'Academic Coordinator' | 'Class Teacher' | 'Counsellor';
  date: string;
  timeSlot: string;
  purpose: string;
  status: 'Upcoming' | 'In Meeting' | 'Completed' | 'Cancelled' | 'Rescheduled';
}

export interface StudentHelpDeskRequest {
  id: string;
  requestCode: string;
  studentId: string;
  studentName: string;
  classGrade: string;
  requestType: 'Bonafide Certificate' | 'Transfer Certificate' | 'Duplicate ID Card' | 'Mark Sheet Copy' | 'General Complaint';
  dateFiled: string;
  targetDate: string;
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  status: 'Received' | 'Processing' | 'Ready for Pickup' | 'Issued';
}

export interface ParentHelpDeskTicket {
  id: string;
  ticketNumber: string;
  parentName: string;
  studentName: string;
  classGrade: string;
  phone: string;
  category: 'Admission Queries' | 'Fee Structure' | 'Transport Route' | 'Certificate Request' | 'Complaint' | 'Principal Meeting';
  subject: string;
  dateCreated: string;
  assignedStaff: string;
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
}

export interface CertificateRecord {
  id: string;
  certificateNumber: string;
  certificateType: 'Bonafide Certificate' | 'Transfer Certificate' | 'Study Certificate' | 'Character Certificate' | 'Fee Payment Certificate';
  studentId: string;
  studentName: string;
  classGrade: string;
  issueDate: string;
  verificationCode: string;
  issuedBy: string;
  status: 'Draft' | 'Approved' | 'Printed' | 'Delivered';
}

export interface GatePassRecord {
  id: string;
  passNumber: string;
  passType: 'Student Exit Pass' | 'Visitor Exit Pass' | 'Parent Pickup Pass' | 'Staff Exit Pass';
  personName: string;
  studentClassRoom?: string;
  outTime: string;
  expectedInTime?: string;
  approvedBy: string;
  reason: string;
  status: 'Approved' | 'Out Side' | 'Returned' | 'Expired';
}

export interface PhoneCallLog {
  id: string;
  callRef: string;
  callType: 'Incoming' | 'Outgoing' | 'Missed';
  callerName: string;
  callerPhone: string;
  recipientDepartment: 'Admissions' | 'Principal Office' | 'Accounts' | 'Transport' | 'General Inquiry';
  callTime: string;
  durationMinutes: number;
  notes: string;
  followUpRequired: boolean;
  followUpDate?: string;
}

export interface CommunicationMessage {
  id: string;
  messageRef: string;
  channel: 'SMS' | 'Email' | 'Broadcast Circular' | 'Emergency Alert';
  recipientGroup: 'All Parents' | 'Class 10 Parents' | 'Staff' | 'Admission Leads';
  subject: string;
  content: string;
  sentDate: string;
  deliveryCount: number;
  status: 'Scheduled' | 'Sent' | 'Delivered';
}

export interface LostFoundItem {
  id: string;
  itemCode: string;
  type: 'Lost' | 'Found';
  itemName: string;
  category: 'Water Bottle' | 'Bag / Backpack' | 'Books & Stationery' | 'Electronics & Watch' | 'Clothing / Uniform';
  locationFoundLost: string;
  dateReported: string;
  reportedBy: string;
  claimedBy?: string;
  status: 'Unclaimed' | 'Claimed' | 'Disposed';
}

export interface ReceptionAnnouncement {
  id: string;
  announcementCode: string;
  title: string;
  category: 'School Notice' | 'Parent Notice' | 'Student Notice' | 'Staff Notice' | 'Emergency Alert';
  targetAudience: string;
  publishDate: string;
  expiryDate: string;
  publishedBy: string;
  priority: 'Normal' | 'High' | 'Critical';
  readCount: number;
}

export interface ReceptionSettings {
  officeOpeningTime: string; // e.g. "08:00 AM"
  officeClosingTime: string; // e.g. "05:00 PM"
  maxVisitorPassValidityHours: number;
  autoSmsOnVisitorCheckIn: boolean;
  autoSmsOnGatePassApproval: boolean;
  chiefReceptionistHelpline: string;
}

export interface AiReceptionInsight {
  id: string;
  type: 'footfall' | 'conversion' | 'telephony' | 'helpdesk';
  title: string;
  description: string;
  metric?: string;
  actionText?: string;
  impact: 'High' | 'Medium' | 'Low';
}
