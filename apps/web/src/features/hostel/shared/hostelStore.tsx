import React, { createContext, useContext, useState } from 'react';
import type {
  HostelBuilding, HostelRoom, HostelStudent, RoomAllocationRecord,
  WardenRecord, HostelAttendanceRecord, MessMenuRecord, VisitorRecord,
  GatePassRecord, ComplaintRecord, HostelInventoryItem, HostelFeeRecord,
  MedicalEmergencyRecord, DisciplinaryIncidentRecord, HostelSettings, AiHostelInsight
} from './types';
import {
  mockHostelBuildings, mockHostelRooms, mockHostelStudents,
  mockRoomAllocations, mockWardens, mockHostelAttendance,
  mockMessMenu, mockVisitors, mockGatePasses, mockComplaints,
  mockHostelInventory, mockHostelFees, mockMedicalCases,
  mockDisciplinaryIncidents, mockAiHostelInsights
} from './mockHostelData';

export interface HostelActivityLog {
  id: string;
  type: 'allocation' | 'visitor' | 'gatepass' | 'complaint' | 'fee' | 'medical' | 'discipline' | 'rollcall';
  message: string;
  timestamp: string;
  badgeColor?: string;
}

const defaultSettings: HostelSettings = {
  curfewTimeNight: '09:30 PM',
  morningRollCallTime: '07:00 AM',
  maxVisitorDurationHours: 2,
  roomTransferApprovalRequired: true,
  enableParentSmsRollCall: true,
  enableGatePassBarcode: true,
  chiefWardenHelpline: '+91 80 4000 9999',
};

interface HostelContextType {
  buildings: HostelBuilding[];
  rooms: HostelRoom[];
  students: HostelStudent[];
  allocations: RoomAllocationRecord[];
  wardens: WardenRecord[];
  attendance: HostelAttendanceRecord[];
  messMenu: MessMenuRecord[];
  visitors: VisitorRecord[];
  gatePasses: GatePassRecord[];
  complaints: ComplaintRecord[];
  inventory: HostelInventoryItem[];
  fees: HostelFeeRecord[];
  medicalCases: MedicalEmergencyRecord[];
  incidents: DisciplinaryIncidentRecord[];
  settings: HostelSettings;
  aiInsights: AiHostelInsight[];
  activities: HostelActivityLog[];
  toastMessage: string | null;
  showToast: (msg: string) => void;

  // Workflows
  allocateRoom: (studentName: string, classGrade: string, buildingName: string, roomNumber: string) => void;
  transferRoom: (studentId: string, newBuilding: string, newRoom: string) => void;
  registerVisitor: (visitorName: string, relation: string, studentName: string, studentRoom: string, phone: string) => void;
  issueGatePass: (studentName: string, roomNumber: string, buildingName: string, passType: GatePassRecord['passType'], outTime: string, expectedInTime: string) => void;
  createComplaint: (studentName: string, roomNumber: string, buildingName: string, category: ComplaintRecord['category'], description: string, priority: ComplaintRecord['priority']) => void;
  resolveComplaint: (complaintId: string) => void;
  collectHostelFee: (feeId: string, amount: number) => void;
  logMedicalEmergency: (studentName: string, roomNumber: string, buildingName: string, symptoms: string, severity: MedicalEmergencyRecord['severity']) => void;
  recordDisciplinaryIncident: (studentName: string, roomNumber: string, buildingName: string, violationType: DisciplinaryIncidentRecord['violationType'], actionTaken: DisciplinaryIncidentRecord['actionTaken']) => void;
  markNightRollCall: (attendanceId: string, status: HostelAttendanceRecord['nightRollCallStatus'], remarks?: string) => void;
  updateSettings: (newSettings: Partial<HostelSettings>) => void;
}

const HostelContext = createContext<HostelContextType | undefined>(undefined);

export function HostelProvider({ children }: { children: React.ReactNode }) {
  const [buildings, setBuildings] = useState<HostelBuilding[]>(mockHostelBuildings);
  const [rooms, setRooms] = useState<HostelRoom[]>(mockHostelRooms);
  const [students, setStudents] = useState<HostelStudent[]>(mockHostelStudents);
  const [allocations, setAllocations] = useState<RoomAllocationRecord[]>(mockRoomAllocations);
  const [wardens, setWardens] = useState<WardenRecord[]>(mockWardens);
  const [attendance, setAttendance] = useState<HostelAttendanceRecord[]>(mockHostelAttendance);
  const [messMenu, setMessMenu] = useState<MessMenuRecord[]>(mockMessMenu);
  const [visitors, setVisitors] = useState<VisitorRecord[]>(mockVisitors);
  const [gatePasses, setGatePasses] = useState<GatePassRecord[]>(mockGatePasses);
  const [complaints, setComplaints] = useState<ComplaintRecord[]>(mockComplaints);
  const [inventory, setInventory] = useState<HostelInventoryItem[]>(mockHostelInventory);
  const [fees, setFees] = useState<HostelFeeRecord[]>(mockHostelFees);
  const [medicalCases, setMedicalCases] = useState<MedicalEmergencyRecord[]>(mockMedicalCases);
  const [incidents, setIncidents] = useState<DisciplinaryIncidentRecord[]>(mockDisciplinaryIncidents);
  const [settings, setSettings] = useState<HostelSettings>(defaultSettings);
  const [aiInsights, setAiInsights] = useState<AiHostelInsight[]>(mockAiHostelInsights);

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [activities, setActivities] = useState<HostelActivityLog[]>([
    { id: 'ACT-1', type: 'allocation', message: 'Allocated Bed #1 in Room A-101 to Aarav Sharma', timestamp: '20 mins ago', badgeColor: '#10B981' },
    { id: 'ACT-2', type: 'visitor', message: 'Visitor Mahesh Sharma checked in to meet Aarav Sharma', timestamp: '45 mins ago', badgeColor: '#4F46E5' },
    { id: 'ACT-3', type: 'complaint', message: 'Logged Electrical Repair work order for Room A-101', timestamp: '1 hour ago', badgeColor: '#F59E0B' },
    { id: 'ACT-4', type: 'rollcall', message: 'Night Roll Call completed for Tagore Senior Boys Block A (98% Present)', timestamp: 'Yesterday 09:45 PM', badgeColor: '#059669' },
  ]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const addActivity = (type: HostelActivityLog['type'], message: string, badgeColor = '#10B981') => {
    const newAct: HostelActivityLog = {
      id: `ACT-${Date.now()}`,
      type,
      message,
      timestamp: 'Just now',
      badgeColor,
    };
    setActivities((prev) => [newAct, ...prev]);
  };

  // Workflow 1: Allocate Room
  const allocateRoom = (studentName: string, classGrade: string, buildingName: string, roomNumber: string) => {
    const newStudentId = `STU-${Math.floor(100 + Math.random() * 900)}`;
    const newHostelStudent: HostelStudent = {
      id: `HST-${Math.floor(100 + Math.random() * 900)}`,
      studentId: newStudentId,
      studentName,
      classGrade,
      gender: buildingName.toLowerCase().includes('girls') ? 'Female' : 'Male',
      buildingName,
      roomNumber,
      bedNumber: 'Bed #1',
      guardianName: 'Guardian Parent',
      guardianPhone: '+91 98000 00000',
      emergencyContact: '+91 98000 00000',
      feeStatus: 'Paid',
      status: 'Resident',
    };

    setStudents((prev) => [newHostelStudent, ...prev]);

    // Update Room Occupancy
    setRooms((prev) =>
      prev.map((r) =>
        r.roomNumber === roomNumber ? { ...r, occupiedBeds: r.occupiedBeds + 1, availableBeds: Math.max(0, r.availableBeds - 1) } : r
      )
    );

    // Add Allocation Record
    const newAlloc: RoomAllocationRecord = {
      id: `ALC-${Math.floor(100 + Math.random() * 900)}`,
      studentId: newStudentId,
      studentName,
      classGrade,
      buildingName,
      roomNumber,
      bedNumber: 'Bed #1',
      allocationDate: new Date().toISOString().split('T')[0],
      validTillDate: '2026-05-31',
      allocatedBy: 'Hostel Manager',
      status: 'Active',
    };
    setAllocations((prev) => [newAlloc, ...prev]);

    addActivity('allocation', `Allocated Room ${roomNumber} in ${buildingName} to ${studentName}`, '#10B981');
    showToast(`Room ${roomNumber} allocated to ${studentName}! Parent & Student notified.`);
  };

  // Workflow 2: Transfer Room
  const transferRoom = (studentId: string, newBuilding: string, newRoom: string) => {
    setStudents((prev) =>
      prev.map((s) => (s.studentId === studentId ? { ...s, buildingName: newBuilding, roomNumber: newRoom } : s))
    );
    addActivity('allocation', `Transferred student ${studentId} to ${newRoom} (${newBuilding})`, '#4F46E5');
    showToast(`Room transfer successful for student ${studentId}!`);
  };

  // Workflow 3: Register Visitor
  const registerVisitor = (visitorName: string, relation: string, studentName: string, studentRoom: string, phone: string) => {
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const gatePassId = `GP-${Math.floor(100 + Math.random() * 900)}`;

    const newVisitor: VisitorRecord = {
      id: `VIS-${Math.floor(100 + Math.random() * 900)}`,
      visitorName,
      relation,
      studentName,
      studentRoom,
      phone,
      visitDate: new Date().toISOString().split('T')[0],
      entryTime: timeNow,
      gatePassId,
      status: 'In Campus',
    };

    setVisitors((prev) => [newVisitor, ...prev]);
    addActivity('visitor', `Visitor ${visitorName} registered to meet ${studentName} (${studentRoom})`, '#4F46E5');
    showToast(`Visitor ${visitorName} registered! Gate pass ${gatePassId} generated.`);
  };

  // Workflow 4: Issue Gate Pass
  const issueGatePass = (
    studentName: string,
    roomNumber: string,
    buildingName: string,
    passType: GatePassRecord['passType'],
    outTime: string,
    expectedInTime: string
  ) => {
    const newPass: GatePassRecord = {
      id: `GP-${Math.floor(100 + Math.random() * 900)}`,
      studentId: `STU-${Math.floor(100 + Math.random() * 900)}`,
      studentName,
      roomNumber,
      buildingName,
      passType,
      outTime,
      expectedInTime,
      approvedBy: 'Hostel Chief Warden',
      status: 'Approved',
    };

    setGatePasses((prev) => [newPass, ...prev]);
    addActivity('gatepass', `Issued ${passType} Gate Pass for ${studentName} (${roomNumber})`, '#10B981');
    showToast(`Gate Pass issued for ${studentName}! Security & Warden notified.`);
  };

  // Workflow 5: Create Complaint
  const createComplaint = (
    studentName: string,
    roomNumber: string,
    buildingName: string,
    category: ComplaintRecord['category'],
    description: string,
    priority: ComplaintRecord['priority']
  ) => {
    const newCmp: ComplaintRecord = {
      id: `CMP-${Math.floor(100 + Math.random() * 900)}`,
      studentName,
      roomNumber,
      buildingName,
      category,
      description,
      dateFiled: new Date().toISOString().split('T')[0],
      priority,
      status: 'Pending',
    };

    setComplaints((prev) => [newCmp, ...prev]);
    addActivity('complaint', `Filed ${category} complaint for Room ${roomNumber} (${priority} Priority)`, '#F59E0B');
    showToast(`Complaint filed! Work order created & assigned to maintenance team.`);
  };

  // Workflow 6: Resolve Complaint
  const resolveComplaint = (complaintId: string) => {
    setComplaints((prev) =>
      prev.map((c) => (c.id === complaintId ? { ...c, status: 'Resolved' } : c))
    );
    showToast('Complaint marked as resolved. Student notified!');
  };

  // Workflow 7: Collect Hostel Fee
  const collectHostelFee = (feeId: string, amount: number) => {
    setFees((prev) =>
      prev.map((f) => {
        if (f.id === feeId) {
          const newPaid = f.amountPaid + amount;
          const newStatus = newPaid >= f.totalFee ? 'Paid' : 'Partial';
          return { ...f, amountPaid: newPaid, status: newStatus };
        }
        return f;
      })
    );
    addActivity('fee', `Collected ₹${amount} hostel fee payment for Ref ${feeId}`, '#10B981');
    showToast(`Hostel fee payment of ₹${amount} recorded! Official receipt generated.`);
  };

  // Workflow 8: Log Medical Emergency
  const logMedicalEmergency = (
    studentName: string,
    roomNumber: string,
    buildingName: string,
    symptoms: string,
    severity: MedicalEmergencyRecord['severity']
  ) => {
    const newMed: MedicalEmergencyRecord = {
      id: `MED-${Math.floor(100 + Math.random() * 900)}`,
      studentId: `STU-${Math.floor(100 + Math.random() * 900)}`,
      studentName,
      roomNumber,
      buildingName,
      symptomsDetails: symptoms,
      reportedDate: new Date().toISOString().split('T')[0],
      severity,
      infirmaryAttendant: 'Nurse Mary Kutty',
      actionTaken: 'First aid & observation in infirmary',
      hospitalized: false,
      parentNotified: true,
      status: 'Under Care',
    };

    setMedicalCases((prev) => [newMed, ...prev]);
    addActivity('medical', `EMERGENCY ALERT: ${severity} case reported for ${studentName} (${roomNumber})`, '#DC2626');
    showToast(`Medical emergency logged! Principal, Infirmary & Parents notified.`);
  };

  // Workflow 9: Record Disciplinary Incident
  const recordDisciplinaryIncident = (
    studentName: string,
    roomNumber: string,
    buildingName: string,
    violationType: DisciplinaryIncidentRecord['violationType'],
    actionTaken: DisciplinaryIncidentRecord['actionTaken']
  ) => {
    const newDisc: DisciplinaryIncidentRecord = {
      id: `DISC-${Math.floor(100 + Math.random() * 900)}`,
      studentId: `STU-${Math.floor(100 + Math.random() * 900)}`,
      studentName,
      roomNumber,
      buildingName,
      violationType,
      date: new Date().toISOString().split('T')[0],
      reportedBy: 'Night Supervisor',
      actionTaken,
      status: 'Open',
    };

    setIncidents((prev) => [newDisc, ...prev]);
    addActivity('discipline', `Logged ${violationType} for ${studentName} (${actionTaken})`, '#EF4444');
    showToast(`Disciplinary incident logged for ${studentName}. Action record updated.`);
  };

  // Workflow 10: Mark Night Roll Call Attendance
  const markNightRollCall = (attendanceId: string, status: HostelAttendanceRecord['nightRollCallStatus'], remarks?: string) => {
    setAttendance((prev) =>
      prev.map((a) => (a.id === attendanceId ? { ...a, nightRollCallStatus: status, remarks } : a))
    );
    showToast('Night Roll Call attendance record updated!');
  };

  // Workflow 11: Settings
  const updateSettings = (newSettings: Partial<HostelSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
    showToast('Hostel curfew rules & gate timings saved!');
  };

  return (
    <HostelContext.Provider
      value={{
        buildings,
        rooms,
        students,
        allocations,
        wardens,
        attendance,
        messMenu,
        visitors,
        gatePasses,
        complaints,
        inventory,
        fees,
        medicalCases,
        incidents,
        settings,
        aiInsights,
        activities,
        toastMessage,
        showToast,
        allocateRoom,
        transferRoom,
        registerVisitor,
        issueGatePass,
        createComplaint,
        resolveComplaint,
        collectHostelFee,
        logMedicalEmergency,
        recordDisciplinaryIncident,
        markNightRollCall,
        updateSettings,
      }}
    >
      {children}
    </HostelContext.Provider>
  );
}

export function useHostelStore() {
  const context = useContext(HostelContext);
  if (!context) {
    throw new Error('useHostelStore must be used within a HostelProvider');
  }
  return context;
}
