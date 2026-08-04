import type { 
  SecurityVisitor, GateLogEntry, StudentExitPermit, StaffEntryLog, 
  SecurityVehicle, DeliveryItem, GuardPatrol, SecurityIncident, 
  EmergencyAlert, CCTVCamera, LostFoundSecurity, SecurityCheckpoint 
} from './types';

export const mockSecurityVisitors: SecurityVisitor[] = [
  { id: 'SEC-VST-101', passNumber: 'GP-2026-801', visitorName: 'Mr. Alok Verma', phone: '+91 98111 44556', relation: 'Parent', purpose: 'Admission Counselling', hostEmployee: 'Ananya Deshmukh (HR)', checkInTime: '10:15 AM', checkOutTime: '11:30 AM', idProofType: 'Aadhaar Card', idProofNumber: 'XXXX-XXXX-9012', status: 'Checked Out' },
  { id: 'SEC-VST-102', passNumber: 'GP-2026-802', visitorName: 'Rohan Deshmukh', phone: '+91 98333 11223', relation: 'Vendor', purpose: 'IT Infrastructure Inspection', hostEmployee: 'Vikramaditya Roy (IT)', checkInTime: '11:45 AM', idProofType: 'Driving License', idProofNumber: 'KA-01-2018091', status: 'In Premises' }
];

export const mockGateLogs: GateLogEntry[] = [
  { id: 'GATE-01', logCode: 'GATE-LOG-001', gateNumber: 'Gate 1 (Main Entrance)', personType: 'Visitor', personName: 'Rohan Deshmukh', verificationMethod: 'QR Code', entryTime: '11:45 AM', status: 'In Campus' },
  { id: 'GATE-02', logCode: 'GATE-LOG-002', gateNumber: 'Gate 2 (Bus Gate)', personType: 'Student', personName: 'Ishaan Verma', verificationMethod: 'RFID', entryTime: '08:10 AM', exitTime: '11:00 AM', status: 'Exited' }
];

export const mockStudentExits: StudentExitPermit[] = [
  { id: 'EXT-101', passNumber: 'SEP-2026-042', studentId: 'STU-101', studentName: 'Ishaan Verma', classGrade: 'Class 11-A', exitReason: 'Medical Emergency', guardianName: 'Mr. Alok Verma', guardianPhone: '+91 98111 44556', approvalStatus: 'Approved by Principal', exitTime: '11:00 AM', expectedReturnTime: '02:00 PM', status: 'Active Exit' }
];

export const mockStaffEntries: StaffEntryLog[] = [
  { id: 'STF-201', empId: 'EMP-014', staffName: 'Rajesh Sharma', designation: 'Senior Physics Teacher', department: 'Academics', rfidCardId: 'RFID-9012', checkInTime: '08:05 AM', status: 'On Duty' }
];

export const mockSecurityVehicles: SecurityVehicle[] = [
  { id: 'VEH-301', passNumber: 'VP-2026-012', vehicleNumber: 'KA-04-MB-4412', vehicleType: 'School Bus', driverName: 'Suresh Kumar', driverPhone: '+91 98777 66554', entryGate: 'Gate 2 (Bus Gate)', entryTime: '07:30 AM', parkingSlot: 'Bus Bay 04', status: 'Parked In Campus' }
];

export const mockDeliveries: DeliveryItem[] = [
  { id: 'DEL-401', deliveryCode: 'DEL-2026-089', courierCompany: 'Amazon', vendorName: 'Amazon Logistics', packageCount: 3, recipientName: 'Library Head Desk', recipientDept: 'Library', entryTime: '10:30 AM', deliveryStatus: 'Delivered to Recipient' }
];

export const mockGuardPatrols: GuardPatrol[] = [
  { id: 'PAT-501', patrolCode: 'PAT-2026-01', routeName: 'Perimeter Wall Routine', guardName: 'Head Guard Balwan Singh', assignedShift: 'Day Shift', checkpointsTotal: 8, checkpointsCovered: 8, startTime: '09:00 AM', endTime: '10:00 AM', status: 'Completed' }
];

export const mockIncidents: SecurityIncident[] = [
  { id: 'INC-601', incidentCode: 'INC-2026-004', category: 'Property Damage', severity: 'Medium', location: 'Junior Playground Fence', reportedBy: 'Guard Ramu', reportedTime: '02:15 PM', description: 'Minor fence mesh damage reported near boundary tree.', evidenceAttached: true, resolutionStatus: 'Under Investigation' }
];

export const mockEmergencyAlerts: EmergencyAlert[] = [
  { id: 'EMG-701', alertCode: 'ALT-2026-001', alertType: 'Medical Emergency', location: 'Basketball Court', triggeredBy: 'Physical Education Teacher', triggerTime: '11:20 AM', status: 'All Clear / Resolved' }
];

export const mockCCTV: CCTVCamera[] = [
  { id: 'CAM-801', cameraCode: 'CAM-G1-01', cameraName: 'Gate 1 Main Entrance HD', location: 'Gate 1 Outer Arch', resolution: '4K 60FPS', status: 'Online', recordingHealth: '100% Healthy' },
  { id: 'CAM-802', cameraCode: 'CAM-HST-04', cameraName: 'Hostel Courtyard Dome', location: 'Nalanda Hostel Gate', resolution: '1080P HD', status: 'Online', recordingHealth: '100% Healthy' }
];

export const mockLostFoundSec: LostFoundSecurity[] = [
  { id: 'LST-901', itemCode: 'LF-SEC-012', itemName: 'Titan Wrist Watch (Silver Dial)', category: 'Valuables', locationFound: 'Auditorium Row C', foundTime: '01:30 PM', custodyGuard: 'Guard Ramu', status: 'Custody at Gate 1' }
];

export const mockCheckpoints: SecurityCheckpoint[] = [
  { id: 'CHK-101', checkpointCode: 'CP-01', checkpointName: 'Main Gate Perimeter South', location: 'South Gate Wall', assignedGuard: 'Head Guard Balwan Singh', scanInterval: 'Every 2 Hours', lastScannedTime: '10:00 AM', status: 'Active' }
];
