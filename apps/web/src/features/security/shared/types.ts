export const SECURITY_TYPES_VERSION = '1.0.0';

export interface SecurityVisitor {
  id: string;
  passNumber: string;
  visitorName: string;
  phone: string;
  relation: string;
  purpose: string;
  hostEmployee: string;
  checkInTime: string;
  checkOutTime?: string;
  idProofType: string;
  idProofNumber: string;
  status: 'In Premises' | 'Checked Out' | 'Blacklisted';
}

export interface GateLogEntry {
  id: string;
  logCode: string;
  gateNumber: 'Gate 1 (Main Entrance)' | 'Gate 2 (Bus Gate)' | 'Gate 3 (Staff Gate)';
  personType: 'Visitor' | 'Student' | 'Staff' | 'Vendor';
  personName: string;
  verificationMethod: 'QR Code' | 'RFID' | 'Biometric' | 'Manual';
  entryTime: string;
  exitTime?: string;
  status: 'In Campus' | 'Exited';
}

export interface StudentExitPermit {
  id: string;
  passNumber: string;
  studentId: string;
  studentName: string;
  classGrade: string;
  exitReason: 'Medical Emergency' | 'Parent Pickup' | 'Authorized Early Exit';
  guardianName: string;
  guardianPhone: string;
  approvalStatus: 'Approved by Principal' | 'Pending Approval';
  exitTime: string;
  expectedReturnTime: string;
  actualReturnTime?: string;
  status: 'Active Exit' | 'Returned' | 'Overdue';
}

export interface StaffEntryLog {
  id: string;
  empId: string;
  staffName: string;
  designation: string;
  department: string;
  rfidCardId: string;
  checkInTime: string;
  checkOutTime?: string;
  status: 'On Duty' | 'Checked Out' | 'Late Entry';
}

export interface SecurityVehicle {
  id: string;
  passNumber: string;
  vehicleNumber: string;
  vehicleType: 'School Bus' | 'Staff Car' | 'Visitor Car' | 'Vendor Truck';
  driverName: string;
  driverPhone: string;
  entryGate: string;
  entryTime: string;
  exitTime?: string;
  parkingSlot: string;
  status: 'Parked In Campus' | 'Exited';
}

export interface DeliveryItem {
  id: string;
  deliveryCode: string;
  courierCompany: 'Amazon' | 'BlueDart' | 'FedEx' | 'Local Vendor';
  vendorName: string;
  packageCount: number;
  recipientName: string;
  recipientDept: string;
  entryTime: string;
  deliveryStatus: 'Received at Gate' | 'Delivered to Recipient';
}

export interface GuardPatrol {
  id: string;
  patrolCode: string;
  routeName: string;
  guardName: string;
  assignedShift: 'Day Shift' | 'Night Shift';
  checkpointsTotal: number;
  checkpointsCovered: number;
  startTime: string;
  endTime?: string;
  status: 'Completed' | 'In Progress' | 'Missed Checkpoint';
}

export interface SecurityIncident {
  id: string;
  incidentCode: string;
  category: 'Security Breach' | 'Medical Emergency' | 'Student Misconduct' | 'Property Damage' | 'Suspicious Activity';
  severity: 'Low' | 'Medium' | 'Critical';
  location: string;
  reportedBy: string;
  reportedTime: string;
  description: string;
  evidenceAttached: boolean;
  resolutionStatus: 'Under Investigation' | 'Resolved' | 'Escalated to CSO';
}

export interface EmergencyAlert {
  id: string;
  alertCode: string;
  alertType: 'Fire Alarm' | 'Medical Emergency' | 'Campus Lockdown' | 'Evacuation' | 'Missing Student';
  location: string;
  triggeredBy: string;
  triggerTime: string;
  status: 'ACTIVE EMERGENCY' | 'All Clear / Resolved';
}

export interface CCTVCamera {
  id: string;
  cameraCode: string;
  cameraName: string;
  location: string;
  resolution: string;
  status: 'Online' | 'Offline' | 'Maintenance Required';
  recordingHealth: '100% Healthy' | 'Storage Warning';
}

export interface LostFoundSecurity {
  id: string;
  itemCode: string;
  itemName: string;
  category: 'Electronics' | 'Valuables' | 'Documents' | 'Clothing';
  locationFound: string;
  foundTime: string;
  custodyGuard: string;
  status: 'Custody at Gate 1' | 'Claimed';
}

export interface SecurityCheckpoint {
  id: string;
  checkpointCode: string;
  checkpointName: string;
  location: string;
  assignedGuard: string;
  scanInterval: string;
  lastScannedTime: string;
  status: 'Active' | 'Needs Audit';
}
