import React, { createContext, useContext, useState } from 'react';
import type {
  AdmissionEnquiry, VisitorPass, AppointmentRecord,
  StudentHelpDeskRequest, ParentHelpDeskTicket, CertificateRecord,
  GatePassRecord, PhoneCallLog, CommunicationMessage, LostFoundItem,
  ReceptionAnnouncement, ReceptionSettings, AiReceptionInsight
} from './types';
import {
  mockAdmissionEnquiries, mockVisitorPasses, mockAppointments,
  mockStudentHelpDesk, mockParentHelpDesk, mockCertificates,
  mockGatePasses, mockCallLogs, mockCommunications, mockLostFoundItems,
  mockAnnouncements, mockAiReceptionInsights
} from './mockReceptionData';

export interface ReceptionActivityLog {
  id: string;
  type: 'enquiry' | 'visitor' | 'appointment' | 'helpdesk' | 'certificate' | 'gatepass' | 'call' | 'announcement';
  message: string;
  timestamp: string;
  badgeColor?: string;
}

const defaultSettings: ReceptionSettings = {
  officeOpeningTime: '08:00 AM',
  officeClosingTime: '05:00 PM',
  maxVisitorPassValidityHours: 4,
  autoSmsOnVisitorCheckIn: true,
  autoSmsOnGatePassApproval: true,
  chiefReceptionistHelpline: '+91 80 4000 1111',
};

interface ReceptionContextType {
  enquiries: AdmissionEnquiry[];
  visitors: VisitorPass[];
  appointments: AppointmentRecord[];
  studentRequests: StudentHelpDeskRequest[];
  parentTickets: ParentHelpDeskTicket[];
  certificates: CertificateRecord[];
  gatePasses: GatePassRecord[];
  callLogs: PhoneCallLog[];
  communications: CommunicationMessage[];
  lostFoundItems: LostFoundItem[];
  announcements: ReceptionAnnouncement[];
  settings: ReceptionSettings;
  aiInsights: AiReceptionInsight[];
  activities: ReceptionActivityLog[];
  toastMessage: string | null;
  showToast: (msg: string) => void;

  // Workflows
  createEnquiry: (studentName: string, parentName: string, phone: string, email: string, grade: string, channel: AdmissionEnquiry['channel']) => void;
  registerVisitor: (visitorName: string, phone: string, relation: string, purpose: VisitorPass['purpose'], hostEmployee: string, idType: VisitorPass['idProofType'], idNum: string) => void;
  checkOutVisitor: (visitorId: string) => void;
  bookAppointment: (visitorName: string, relation: string, phone: string, hostName: string, hostRole: AppointmentRecord['hostRole'], date: string, timeSlot: string, purpose: string) => void;
  createStudentRequest: (studentId: string, studentName: string, classGrade: string, requestType: StudentHelpDeskRequest['requestType']) => void;
  createParentTicket: (parentName: string, studentName: string, phone: string, category: ParentHelpDeskTicket['category'], subject: string) => void;
  issueCertificate: (studentId: string, studentName: string, classGrade: string, certificateType: CertificateRecord['certificateType']) => void;
  issueGatePass: (personName: string, passType: GatePassRecord['passType'], reason: string, outTime: string) => void;
  logPhoneCall: (callerName: string, callerPhone: string, callType: PhoneCallLog['callType'], dept: PhoneCallLog['recipientDepartment'], notes: string, followUp: boolean) => void;
  sendCommunication: (channel: CommunicationMessage['channel'], recipientGroup: CommunicationMessage['recipientGroup'], subject: string, content: string) => void;
  reportLostFoundItem: (type: LostFoundItem['type'], itemName: string, category: LostFoundItem['category'], location: string) => void;
  createAnnouncement: (title: string, category: ReceptionAnnouncement['category'], audience: string, priority: ReceptionAnnouncement['priority']) => void;
  updateSettings: (newSettings: Partial<ReceptionSettings>) => void;
}

const ReceptionContext = createContext<ReceptionContextType | undefined>(undefined);

export function ReceptionProvider({ children }: { children: React.ReactNode }) {
  const [enquiries, setEnquiries] = useState<AdmissionEnquiry[]>(mockAdmissionEnquiries);
  const [visitors, setVisitors] = useState<VisitorPass[]>(mockVisitorPasses);
  const [appointments, setAppointments] = useState<AppointmentRecord[]>(mockAppointments);
  const [studentRequests, setStudentRequests] = useState<StudentHelpDeskRequest[]>(mockStudentHelpDesk);
  const [parentTickets, setParentTickets] = useState<ParentHelpDeskTicket[]>(mockParentHelpDesk);
  const [certificates, setCertificates] = useState<CertificateRecord[]>(mockCertificates);
  const [gatePasses, setGatePasses] = useState<GatePassRecord[]>(mockGatePasses);
  const [callLogs, setCallLogs] = useState<PhoneCallLog[]>(mockCallLogs);
  const [communications, setCommunications] = useState<CommunicationMessage[]>(mockCommunications);
  const [lostFoundItems, setLostFoundItems] = useState<LostFoundItem[]>(mockLostFoundItems);
  const [announcements, setAnnouncements] = useState<ReceptionAnnouncement[]>(mockAnnouncements);
  const [settings, setSettings] = useState<ReceptionSettings>(defaultSettings);
  const [aiInsights, setAiInsights] = useState<AiReceptionInsight[]>(mockAiReceptionInsights);

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [activities, setActivities] = useState<ReceptionActivityLog[]>([
    { id: 'ACT-1', type: 'visitor', message: 'Registered Visitor Rohan Varma (Badge BADGE-042)', timestamp: '15 mins ago', badgeColor: '#6366F1' },
    { id: 'ACT-2', type: 'enquiry', message: 'Created Admission Lead ADM-2025-089 for Class 6', timestamp: '30 mins ago', badgeColor: '#10B981' },
    { id: 'ACT-3', type: 'certificate', message: 'Issued Bonafide Certificate CERT-2026-781 for Aarav Sharma', timestamp: '1 hour ago', badgeColor: '#F59E0B' },
    { id: 'ACT-4', type: 'appointment', message: 'Booked Principal Appointment with Dr. Meena Swaminathan', timestamp: '2 hours ago', badgeColor: '#4F46E5' },
  ]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const addActivity = (type: ReceptionActivityLog['type'], message: string, badgeColor = '#6366F1') => {
    const newAct: ReceptionActivityLog = {
      id: `ACT-${Date.now()}`,
      type,
      message,
      timestamp: 'Just now',
      badgeColor,
    };
    setActivities((prev) => [newAct, ...prev]);
  };

  // Workflow 1: Create Admission Enquiry
  const createEnquiry = (studentName: string, parentName: string, phone: string, email: string, grade: string, channel: AdmissionEnquiry['channel']) => {
    const newEnq: AdmissionEnquiry = {
      id: `ENQ-${Math.floor(100 + Math.random() * 900)}`,
      enquiryNumber: `ADM-2025-${Math.floor(100 + Math.random() * 900)}`,
      studentName,
      parentName,
      phone,
      email,
      interestedGrade: grade,
      channel,
      enquiryDate: new Date().toISOString().split('T')[0],
      followUpDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
      counsellingStatus: 'New Lead',
    };
    setEnquiries((prev) => [newEnq, ...prev]);
    addActivity('enquiry', `Created Admission Lead ${newEnq.enquiryNumber} for ${studentName} (${grade})`, '#10B981');
    showToast(`Admission Lead ${newEnq.enquiryNumber} created! Principal & Counsellor notified.`);
  };

  // Workflow 2: Register Visitor & Badge
  const registerVisitor = (
    visitorName: string,
    phone: string,
    relation: string,
    purpose: VisitorPass['purpose'],
    hostEmployee: string,
    idType: VisitorPass['idProofType'],
    idNum: string
  ) => {
    const badgeNumber = `BADGE-${Math.floor(10 + Math.random() * 90)}`;
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newVis: VisitorPass = {
      id: `VIS-${Math.floor(100 + Math.random() * 900)}`,
      badgeNumber,
      visitorName,
      phone,
      relation,
      purpose,
      hostEmployee,
      idProofType: idType,
      idProofNumber: idNum,
      checkInTime: timeNow,
      isBlacklisted: false,
      status: 'In Campus',
    };
    setVisitors((prev) => [newVis, ...prev]);
    addActivity('visitor', `Registered Visitor ${visitorName} (${badgeNumber}) to meet ${hostEmployee}`, '#6366F1');
    showToast(`Visitor ${visitorName} registered! Badge ${badgeNumber} issued & Host notified.`);
  };

  // Workflow 3: Check-Out Visitor
  const checkOutVisitor = (visitorId: string) => {
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setVisitors((prev) =>
      prev.map((v) => (v.id === visitorId ? { ...v, checkOutTime: timeNow, status: 'Checked Out' } : v))
    );
    showToast('Visitor checked out successfully! Badge returned.');
  };

  // Workflow 4: Book Appointment
  const bookAppointment = (
    visitorName: string,
    relation: string,
    phone: string,
    hostName: string,
    hostRole: AppointmentRecord['hostRole'],
    date: string,
    timeSlot: string,
    purpose: string
  ) => {
    const newApt: AppointmentRecord = {
      id: `APT-${Math.floor(100 + Math.random() * 900)}`,
      appointmentCode: `APT-2026-${Math.floor(10 + Math.random() * 90)}`,
      visitorName,
      relation,
      phone,
      hostName,
      hostRole,
      date,
      timeSlot,
      purpose,
      status: 'Upcoming',
    };
    setAppointments((prev) => [newApt, ...prev]);
    addActivity('appointment', `Booked ${hostRole} appointment for ${visitorName} at ${timeSlot}`, '#4F46E5');
    showToast(`Appointment ${newApt.appointmentCode} booked with ${hostName}!`);
  };

  // Workflow 5: Create Student Help Desk Request
  const createStudentRequest = (studentId: string, studentName: string, classGrade: string, requestType: StudentHelpDeskRequest['requestType']) => {
    const newReq: StudentHelpDeskRequest = {
      id: `SHD-${Math.floor(100 + Math.random() * 900)}`,
      requestCode: `REQ-STU-${Math.floor(100 + Math.random() * 900)}`,
      studentId,
      studentName,
      classGrade,
      requestType,
      dateFiled: new Date().toISOString().split('T')[0],
      targetDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
      priority: 'Medium',
      status: 'Processing',
    };
    setStudentRequests((prev) => [newReq, ...prev]);
    addActivity('helpdesk', `Filed Student Support Request ${newReq.requestCode} (${requestType})`, '#F59E0B');
    showToast(`Student Request ${newReq.requestCode} logged! Track status in Help Desk.`);
  };

  // Workflow 6: Create Parent Help Desk Ticket
  const createParentTicket = (parentName: string, studentName: string, phone: string, category: ParentHelpDeskTicket['category'], subject: string) => {
    const newTicket: ParentHelpDeskTicket = {
      id: `PHD-${Math.floor(100 + Math.random() * 900)}`,
      ticketNumber: `TKT-PAR-${Math.floor(100 + Math.random() * 900)}`,
      parentName,
      studentName,
      classGrade: 'Class 10-A',
      phone,
      category,
      subject,
      dateCreated: new Date().toISOString().split('T')[0],
      assignedStaff: 'Front Office Desk',
      status: 'Open',
    };
    setParentTickets((prev) => [newTicket, ...prev]);
    addActivity('helpdesk', `Opened Parent Support Ticket ${newTicket.ticketNumber}`, '#F59E0B');
    showToast(`Parent Support Ticket ${newTicket.ticketNumber} created!`);
  };

  // Workflow 7: Issue Official Certificate
  const issueCertificate = (studentId: string, studentName: string, classGrade: string, certificateType: CertificateRecord['certificateType']) => {
    const newCert: CertificateRecord = {
      id: `CRT-${Math.floor(100 + Math.random() * 900)}`,
      certificateNumber: `CERT-2026-${Math.floor(100 + Math.random() * 900)}`,
      certificateType,
      studentId,
      studentName,
      classGrade,
      issueDate: new Date().toISOString().split('T')[0],
      verificationCode: `VER-${Math.floor(1000 + Math.random() * 9000)}-OFFICIAL`,
      issuedBy: 'Front Office Desk',
      status: 'Printed',
    };
    setCertificates((prev) => [newCert, ...prev]);
    addActivity('certificate', `Issued ${certificateType} ${newCert.certificateNumber} for ${studentName}`, '#10B981');
    showToast(`Certificate ${newCert.certificateNumber} generated & ready for print/delivery!`);
  };

  // Workflow 8: Issue Gate Pass
  const issueGatePass = (personName: string, passType: GatePassRecord['passType'], reason: string, outTime: string) => {
    const newPass: GatePassRecord = {
      id: `GP-${Math.floor(100 + Math.random() * 900)}`,
      passNumber: `GP-2026-${Math.floor(100 + Math.random() * 900)}`,
      passType,
      personName,
      outTime,
      approvedBy: 'Front Office Chief',
      reason,
      status: 'Approved',
    };
    setGatePasses((prev) => [newPass, ...prev]);
    addActivity('gatepass', `Issued Gate Pass ${newPass.passNumber} for ${personName}`, '#6366F1');
    showToast(`Gate Pass ${newPass.passNumber} issued! Security notified.`);
  };

  // Workflow 9: Log Phone Call
  const logPhoneCall = (callerName: string, callerPhone: string, callType: PhoneCallLog['callType'], dept: PhoneCallLog['recipientDepartment'], notes: string, followUp: boolean) => {
    const newCall: PhoneCallLog = {
      id: `CALL-${Math.floor(100 + Math.random() * 900)}`,
      callRef: `CALL-${Math.floor(100 + Math.random() * 900)}`,
      callType,
      callerName,
      callerPhone,
      recipientDepartment: dept,
      callTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      durationMinutes: 3,
      notes,
      followUpRequired: followUp,
      followUpDate: followUp ? new Date(Date.now() + 86400000).toISOString().split('T')[0] : undefined,
    };
    setCallLogs((prev) => [newCall, ...prev]);
    addActivity('call', `Logged ${callType} phone call from ${callerName}`, '#8B5CF6');
    showToast(`Phone call log saved for ${callerName}!`);
  };

  // Workflow 10: Send Communication Broadcast
  const sendCommunication = (channel: CommunicationMessage['channel'], recipientGroup: CommunicationMessage['recipientGroup'], subject: string, content: string) => {
    const newComm: CommunicationMessage = {
      id: `COMM-${Math.floor(100 + Math.random() * 900)}`,
      messageRef: `MSG-${Math.floor(100 + Math.random() * 900)}`,
      channel,
      recipientGroup,
      subject,
      content,
      sentDate: new Date().toISOString().split('T')[0],
      deliveryCount: recipientGroup.includes('All') ? 1200 : 150,
      status: 'Delivered',
    };
    setCommunications((prev) => [newComm, ...prev]);
    addActivity('announcement', `Sent ${channel} broadcast "${subject}" to ${recipientGroup}`, '#06B6D4');
    showToast(`${channel} broadcast sent to ${recipientGroup}!`);
  };

  // Workflow 11: Report Lost & Found Item
  const reportLostFoundItem = (type: LostFoundItem['type'], itemName: string, category: LostFoundItem['category'], location: string) => {
    const newItem: LostFoundItem = {
      id: `LF-${Math.floor(100 + Math.random() * 900)}`,
      itemCode: `LF-2026-${Math.floor(10 + Math.random() * 90)}`,
      type,
      itemName,
      category,
      locationFoundLost: location,
      dateReported: new Date().toISOString().split('T')[0],
      reportedBy: 'Front Office Reception',
      status: 'Unclaimed',
    };
    setLostFoundItems((prev) => [newItem, ...prev]);
    showToast(`Lost & Found item ${newItem.itemCode} recorded!`);
  };

  // Workflow 12: Create Announcement
  const createAnnouncement = (title: string, category: ReceptionAnnouncement['category'], audience: string, priority: ReceptionAnnouncement['priority']) => {
    const newAnc: ReceptionAnnouncement = {
      id: `ANC-${Math.floor(100 + Math.random() * 900)}`,
      announcementCode: `ANC-2026-${Math.floor(10 + Math.random() * 90)}`,
      title,
      category,
      targetAudience: audience,
      publishDate: new Date().toISOString().split('T')[0],
      expiryDate: new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0],
      publishedBy: 'Reception Desk',
      priority,
      readCount: 0,
    };
    setAnnouncements((prev) => [newAnc, ...prev]);
    addActivity('announcement', `Published Announcement "${title}" for ${audience}`, '#EC4899');
    showToast(`Notice "${title}" published across portal!`);
  };

  // Workflow 13: Update Settings
  const updateSettings = (newSettings: Partial<ReceptionSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
    showToast('Front office operational policies saved!');
  };

  return (
    <ReceptionContext.Provider
      value={{
        enquiries,
        visitors,
        appointments,
        studentRequests,
        parentTickets,
        certificates,
        gatePasses,
        callLogs,
        communications,
        lostFoundItems,
        announcements,
        settings,
        aiInsights,
        activities,
        toastMessage,
        showToast,
        createEnquiry,
        registerVisitor,
        checkOutVisitor,
        bookAppointment,
        createStudentRequest,
        createParentTicket,
        issueCertificate,
        issueGatePass,
        logPhoneCall,
        sendCommunication,
        reportLostFoundItem,
        createAnnouncement,
        updateSettings,
      }}
    >
      {children}
    </ReceptionContext.Provider>
  );
}

export function useReceptionStore() {
  const context = useContext(ReceptionContext);
  if (!context) {
    throw new Error('useReceptionStore must be used within a ReceptionProvider');
  }
  return context;
}
