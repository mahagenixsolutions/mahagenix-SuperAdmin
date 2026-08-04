export const HR_TYPES_VERSION = '1.0.0';

export interface HREmployee {
  id: string;
  empId: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  joiningDate: string;
  employmentType: 'Full-Time' | 'Part-Time' | 'Contract';
  status: 'Active' | 'On Leave' | 'Terminated';
  salaryGrade: string;
  qualification: string;
  experienceYears: number;
  emergencyContact: string;
  avatar?: string;
}

export interface JobOpening {
  id: string;
  positionTitle: string;
  department: string;
  requiredExperience: string;
  salaryRange: string;
  employmentType: 'Full-Time' | 'Part-Time' | 'Contract';
  deadline: string;
  hiringManager: string;
  applicationsCount: number;
  status: 'Open' | 'Closed' | 'Draft';
}

export interface Candidate {
  id: string;
  name: string;
  position: string;
  email: string;
  phone: string;
  appliedDate: string;
  experienceYears: number;
  rating: number;
  interviewStatus: 'Applied' | 'Screened' | 'Interviewing' | 'Offered' | 'Rejected';
  resumeUrl?: string;
}

export interface OnboardingTask {
  id: string;
  candidateName: string;
  position: string;
  department: string;
  docVerification: 'Completed' | 'Pending';
  empIdGenerated: boolean;
  accountCreated: boolean;
  assetAssigned: boolean;
  status: 'In Progress' | 'Completed';
  startDate: string;
}

export interface HRDepartment {
  id: string;
  name: string;
  headOfDept: string;
  employeeCount: number;
  annualBudget: string;
  status: 'Active' | 'Inactive';
}

export interface HRDesignation {
  id: string;
  title: string;
  department: string;
  payGrade: string;
  activeCount: number;
}

export interface HRAttendance {
  id: string;
  empId: string;
  empName: string;
  department: string;
  date: string;
  checkIn: string;
  checkOut: string;
  status: 'Present' | 'Late' | 'Absent' | 'Half Day';
  overtimeHours: number;
}

export interface HRLeave {
  id: string;
  empId: string;
  empName: string;
  department: string;
  leaveType: 'Sick Leave' | 'Casual Leave' | 'Earned Leave' | 'Maternity Leave' | 'Emergency Leave';
  startDate: string;
  endDate: string;
  durationDays: number;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

export interface PayrollCoordination {
  id: string;
  empId: string;
  empName: string;
  department: string;
  baseSalary: number;
  allowances: number;
  deductions: number;
  netPayout: number;
  financeSyncStatus: 'Synced' | 'Pending Sync';
}

export interface PerformanceReview {
  id: string;
  empId: string;
  empName: string;
  department: string;
  reviewPeriod: string;
  kpiScore: number;
  rating: number; // 1 to 5
  reviewer: string;
  promotionRecommended: 'Yes' | 'No' | 'Under Evaluation';
}

export interface TrainingProgram {
  id: string;
  title: string;
  trainer: string;
  startDate: string;
  endDate: string;
  enrolledCount: number;
  completionRate: number;
  skillsCovered: string[];
}

export interface HRDocument {
  id: string;
  empName: string;
  docType: 'Offer Letter' | 'Appointment Letter' | 'Contract' | 'ID Proof' | 'Certificate';
  fileName: string;
  uploadDate: string;
  expiryDate?: string;
  status: 'Verified' | 'Pending Verification' | 'Expired';
}

export interface AssetItem {
  id: string;
  assetCode: string;
  assetType: 'Laptop' | 'Desktop' | 'Tablet' | 'Access Card' | 'Projector' | 'Equipment';
  assignedToEmp: string;
  serialNumber: string;
  assignmentDate: string;
  condition: 'Good' | 'Fair' | 'Damaged';
}

export interface ComplianceRecord {
  id: string;
  empName: string;
  backgroundCheck: 'Passed' | 'Pending';
  policyAck: 'Signed' | 'Pending';
  contractExpiry: string;
  alertLevel: 'Normal' | 'Warning' | 'Urgent';
}

export interface HRAnnouncement {
  id: string;
  title: string;
  category: 'HR Notice' | 'Policy Update' | 'Holiday Notice' | 'Training Announcement';
  targetAudience: string;
  publishedDate: string;
  author: string;
}
