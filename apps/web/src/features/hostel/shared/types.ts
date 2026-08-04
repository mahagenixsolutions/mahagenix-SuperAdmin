export interface HostelBuilding {
  id: string;
  buildingName: string;
  buildingCode: string;
  genderCategory: 'Boys Hostel' | 'Girls Hostel' | 'Co-ed Block';
  totalFloors: number;
  totalRooms: number;
  totalCapacityBeds: number;
  occupiedBeds: number;
  availableBeds: number;
  chiefWardenName: string;
  chiefWardenPhone: string;
  status: 'Operational' | 'Full' | 'Under Maintenance';
}

export interface HostelRoom {
  id: string;
  roomNumber: string;
  buildingName: string;
  floorNo: number;
  roomType: 'Single Deluxe' | 'Double Sharing' | 'Triple Sharing' | 'Four Bed Dorm';
  capacityBeds: number;
  occupiedBeds: number;
  availableBeds: number;
  monthlyFee: number;
  furnitureDetails: string[];
  condition: 'Excellent' | 'Good' | 'Needs Minor Repair';
  status: 'Available' | 'Fully Occupied' | 'Under Inspection';
}

export interface HostelStudent {
  id: string;
  studentId: string;
  studentName: string;
  classGrade: string;
  gender: 'Male' | 'Female';
  buildingName: string;
  roomNumber: string;
  bedNumber: string;
  guardianName: string;
  guardianPhone: string;
  emergencyContact: string;
  medicalConditions?: string;
  feeStatus: 'Paid' | 'Pending' | 'Overdue';
  status: 'Resident' | 'Vacated' | 'On Leave' | 'Suspended';
}

export interface RoomAllocationRecord {
  id: string;
  studentId: string;
  studentName: string;
  classGrade: string;
  buildingName: string;
  roomNumber: string;
  bedNumber: string;
  allocationDate: string;
  validTillDate: string;
  allocatedBy: string;
  status: 'Active' | 'Transferred' | 'Vacated';
}

export interface WardenRecord {
  id: string;
  name: string;
  role: 'Chief Warden' | 'Assistant Warden' | 'Night Supervisor' | 'Mess Incharge';
  assignedBuilding: string;
  phone: string;
  email: string;
  dutyShift: 'Morning (6 AM - 2 PM)' | 'Evening (2 PM - 10 PM)' | 'Night (10 PM - 6 AM)';
  attendanceStatus: 'Present' | 'On Duty' | 'On Leave';
}

export interface HostelAttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  roomNumber: string;
  buildingName: string;
  date: string;
  morningStatus: 'Present' | 'Absent' | 'On Leave';
  nightRollCallStatus: 'Present' | 'Absent' | 'Late Return';
  returnTime?: string;
  remarks?: string;
}

export interface MessMenuRecord {
  id: string;
  dayOfWeek: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  breakfast: string;
  lunch: string;
  snacks: string;
  dinner: string;
  dietType: 'Pure Veg' | 'Non-Veg Available';
  qualityRating: number; // e.g. 4.8 / 5
}

export interface VisitorRecord {
  id: string;
  visitorName: string;
  relation: string;
  studentName: string;
  studentRoom: string;
  phone: string;
  visitDate: string;
  entryTime: string;
  exitTime?: string;
  gatePassId: string;
  status: 'In Campus' | 'Exited' | 'Overstay Alert';
}

export interface GatePassRecord {
  id: string;
  studentId: string;
  studentName: string;
  roomNumber: string;
  buildingName: string;
  passType: 'Local Outing' | 'Weekend Leave' | 'Emergency Outing';
  outTime: string;
  expectedInTime: string;
  actualInTime?: string;
  approvedBy: string;
  status: 'Approved' | 'Out Side' | 'Returned' | 'Late Return Alert';
}

export interface ComplaintRecord {
  id: string;
  studentName: string;
  roomNumber: string;
  buildingName: string;
  category: 'Electrical' | 'Plumbing' | 'Carpentry & Furniture' | 'Cleaning & Hygiene' | 'Wi-Fi / Internet';
  description: string;
  dateFiled: string;
  priority: 'Low' | 'Medium' | 'High' | 'Emergency';
  assignedTech?: string;
  status: 'Pending' | 'In Progress' | 'Resolved';
}

export interface HostelInventoryItem {
  id: string;
  itemName: string;
  category: 'Furniture' | 'Bedding & Linen' | 'Electrical' | 'Kitchen & Mess' | 'Sanitary';
  totalQuantity: number;
  inUseQuantity: number;
  inStockQuantity: number;
  damagedQuantity: number;
  location: string;
  lastAuditDate: string;
}

export interface HostelFeeRecord {
  id: string;
  studentId: string;
  studentName: string;
  roomNumber: string;
  buildingName: string;
  termSemester: string;
  hostelFeeAmount: number;
  messFeeAmount: number;
  totalFee: number;
  amountPaid: number;
  dueDate: string;
  status: 'Paid' | 'Partial' | 'Unpaid' | 'Overdue';
}

export interface MedicalEmergencyRecord {
  id: string;
  studentId: string;
  studentName: string;
  roomNumber: string;
  buildingName: string;
  symptomsDetails: string;
  reportedDate: string;
  severity: 'Mild' | 'Moderate' | 'Severe' | 'Critical';
  infirmaryAttendant: string;
  actionTaken: string;
  hospitalized: boolean;
  parentNotified: boolean;
  status: 'Under Care' | 'Recovered' | 'Referred to Hospital';
}

export interface DisciplinaryIncidentRecord {
  id: string;
  studentId: string;
  studentName: string;
  roomNumber: string;
  buildingName: string;
  violationType: 'Curfew Breach' | 'Unauthorized Visitor' | 'Noise Violation' | 'Smoking / Substance' | 'Property Damage';
  date: string;
  reportedBy: string;
  actionTaken: 'Verbal Warning' | 'Written Warning' | 'Fine Imposed' | 'Parent Called' | 'Suspension';
  fineAmount?: number;
  status: 'Open' | 'Resolved';
}

export interface HostelSettings {
  curfewTimeNight: string; // e.g. "09:30 PM"
  morningRollCallTime: string; // e.g. "07:00 AM"
  maxVisitorDurationHours: number;
  roomTransferApprovalRequired: boolean;
  enableParentSmsRollCall: boolean;
  enableGatePassBarcode: boolean;
  chiefWardenHelpline: string;
}

export interface AiHostelInsight {
  id: string;
  type: 'occupancy' | 'maintenance' | 'curfew_risk' | 'mess_waste' | 'fee_risk';
  title: string;
  description: string;
  metric?: string;
  actionText?: string;
  impact: 'High' | 'Medium' | 'Low';
}
