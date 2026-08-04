import type { 
  HREmployee, JobOpening, Candidate, OnboardingTask, HRDepartment, 
  HRDesignation, HRAttendance, HRLeave, PayrollCoordination, 
  PerformanceReview, TrainingProgram, HRDocument, AssetItem, 
  ComplianceRecord, HRAnnouncement 
} from './types';

export const mockEmployees: HREmployee[] = [
  {
    id: 'EMP-101',
    empId: 'SCH-EMP-001',
    name: 'Dr. Rajesh Sharma',
    email: 'rajesh.sharma@school.edu',
    phone: '+91 98100 12345',
    department: 'Academic',
    designation: 'Principal',
    joiningDate: '2018-06-01',
    employmentType: 'Full-Time',
    status: 'Active',
    salaryGrade: 'Grade E1 (Executive)',
    qualification: 'Ph.D. in Educational Leadership',
    experienceYears: 18,
    emergencyContact: 'Mrs. Sunita Sharma (+91 98100 54321)'
  },
  {
    id: 'EMP-102',
    empId: 'SCH-EMP-042',
    name: 'Ananya Deshmukh',
    email: 'ananya.d@school.edu',
    phone: '+91 98220 33445',
    department: 'Human Resources',
    designation: 'HR Manager',
    joiningDate: '2021-03-15',
    employmentType: 'Full-Time',
    status: 'Active',
    salaryGrade: 'Grade M2 (Management)',
    qualification: 'MBA in Human Resource Management',
    experienceYears: 9,
    emergencyContact: 'Mr. Rohan Deshmukh (+91 98220 99887)'
  },
  {
    id: 'EMP-103',
    empId: 'SCH-EMP-088',
    name: 'Vikramaditya Roy',
    email: 'vikram.roy@school.edu',
    phone: '+91 98330 66778',
    department: 'IT',
    designation: 'IT Administrator',
    joiningDate: '2022-08-10',
    employmentType: 'Full-Time',
    status: 'Active',
    salaryGrade: 'Grade T1 (Technical)',
    qualification: 'B.Tech in Computer Science',
    experienceYears: 6,
    emergencyContact: 'Mr. Amit Roy (+91 98330 11223)'
  },
  {
    id: 'EMP-104',
    empId: 'SCH-EMP-105',
    name: 'Sunita Verma',
    email: 'sunita.v@school.edu',
    phone: '+91 98440 88990',
    department: 'Academic',
    designation: 'Senior Teacher (Mathematics)',
    joiningDate: '2019-04-01',
    employmentType: 'Full-Time',
    status: 'Active',
    salaryGrade: 'Grade T3 (Teaching)',
    qualification: 'M.Sc. in Mathematics, B.Ed.',
    experienceYears: 12,
    emergencyContact: 'Mr. Suresh Verma (+91 98440 22334)'
  },
  {
    id: 'EMP-105',
    empId: 'SCH-EMP-140',
    name: 'Ramesh Gupta',
    email: 'ramesh.g@school.edu',
    phone: '+91 98550 44556',
    department: 'Finance',
    designation: 'Senior Accountant',
    joiningDate: '2020-11-01',
    employmentType: 'Full-Time',
    status: 'Active',
    salaryGrade: 'Grade F2 (Finance)',
    qualification: 'M.Com, Chartered Accountant (CA)',
    experienceYears: 10,
    emergencyContact: 'Mrs. Neha Gupta (+91 98550 77889)'
  }
];

export const mockJobOpenings: JobOpening[] = [
  {
    id: 'JOB-201',
    positionTitle: 'Senior Physics Teacher (Classes 11-12)',
    department: 'Academic',
    requiredExperience: '5+ Years',
    salaryRange: '₹6,50,000 - ₹8,50,000 P.A.',
    employmentType: 'Full-Time',
    deadline: '2026-08-15',
    hiringManager: 'Dr. Rajesh Sharma',
    applicationsCount: 14,
    status: 'Open'
  },
  {
    id: 'JOB-202',
    positionTitle: 'Assistant Librarian',
    department: 'Library',
    requiredExperience: '2+ Years',
    salaryRange: '₹3,50,000 - ₹4,50,000 P.A.',
    employmentType: 'Full-Time',
    deadline: '2026-08-20',
    hiringManager: 'Ananya Deshmukh',
    applicationsCount: 8,
    status: 'Open'
  }
];

export const mockCandidates: Candidate[] = [
  {
    id: 'CND-101',
    name: 'Dr. Alok Nath',
    position: 'Senior Physics Teacher (Classes 11-12)',
    email: 'alok.nath@gmail.com',
    phone: '+91 97110 22334',
    appliedDate: '2026-07-10',
    experienceYears: 7,
    rating: 4.8,
    interviewStatus: 'Interviewing'
  },
  {
    id: 'CND-102',
    name: 'Pooja Hegde',
    position: 'Assistant Librarian',
    email: 'pooja.h@yahoo.com',
    phone: '+91 97220 44556',
    appliedDate: '2026-07-12',
    experienceYears: 3,
    rating: 4.5,
    interviewStatus: 'Offered'
  }
];

export const mockOnboarding: OnboardingTask[] = [
  {
    id: 'ONB-01',
    candidateName: 'Pooja Hegde',
    position: 'Assistant Librarian',
    department: 'Library',
    docVerification: 'Completed',
    empIdGenerated: true,
    accountCreated: true,
    assetAssigned: false,
    status: 'In Progress',
    startDate: '2026-08-01'
  }
];

export const mockDepartments: HRDepartment[] = [
  { id: 'DEP-01', name: 'Academic & Faculty', headOfDept: 'Dr. Rajesh Sharma', employeeCount: 42, annualBudget: '₹2.85 Cr', status: 'Active' },
  { id: 'DEP-02', name: 'Administration', headOfDept: 'Ananya Deshmukh', employeeCount: 12, annualBudget: '₹65 Lakhs', status: 'Active' },
  { id: 'DEP-03', name: 'Finance & Accounts', headOfDept: 'Ramesh Gupta', employeeCount: 5, annualBudget: '₹42 Lakhs', status: 'Active' },
  { id: 'DEP-04', name: 'Library & Knowledge Center', headOfDept: 'Joel Fernandes', employeeCount: 4, annualBudget: '₹18 Lakhs', status: 'Active' },
  { id: 'DEP-05', name: 'IT & Systems', headOfDept: 'Vikramaditya Roy', employeeCount: 6, annualBudget: '₹35 Lakhs', status: 'Active' }
];

export const mockDesignations: HRDesignation[] = [
  { id: 'DSG-01', title: 'Principal', department: 'Academic', payGrade: 'Executive E1', activeCount: 1 },
  { id: 'DSG-02', title: 'Senior Teacher', department: 'Academic', payGrade: 'Teaching T3', activeCount: 28 },
  { id: 'DSG-03', title: 'HR Manager', department: 'Administration', payGrade: 'Manager M2', activeCount: 2 },
  { id: 'DSG-04', title: 'Senior Accountant', department: 'Finance', payGrade: 'Finance F2', activeCount: 3 },
  { id: 'DSG-05', title: 'IT Administrator', department: 'IT', payGrade: 'Tech T1', activeCount: 4 }
];

export const mockAttendance: HRAttendance[] = [
  { id: 'ATT-101', empId: 'SCH-EMP-001', empName: 'Dr. Rajesh Sharma', department: 'Academic', date: '2026-07-22', checkIn: '07:50 AM', checkOut: '04:30 PM', status: 'Present', overtimeHours: 0 },
  { id: 'ATT-102', empId: 'SCH-EMP-042', empName: 'Ananya Deshmukh', department: 'Human Resources', date: '2026-07-22', checkIn: '08:05 AM', checkOut: '04:45 PM', status: 'Present', overtimeHours: 0.5 },
  { id: 'ATT-103', empId: 'SCH-EMP-088', empName: 'Vikramaditya Roy', department: 'IT', date: '2026-07-22', checkIn: '08:25 AM', checkOut: '--', status: 'Late', overtimeHours: 0 }
];

export const mockLeaves: HRLeave[] = [
  { id: 'LEV-501', empId: 'SCH-EMP-105', empName: 'Sunita Verma', department: 'Academic', leaveType: 'Casual Leave', startDate: '2026-07-24', endDate: '2026-07-25', durationDays: 2, reason: 'Family engagement', status: 'Pending' },
  { id: 'LEV-502', empId: 'SCH-EMP-140', empName: 'Ramesh Gupta', department: 'Finance', leaveType: 'Sick Leave', startDate: '2026-07-20', endDate: '2026-07-21', durationDays: 2, reason: 'Viral fever', status: 'Approved' }
];

export const mockPayrollCoordination: PayrollCoordination[] = [
  { id: 'PAY-801', empId: 'SCH-EMP-001', empName: 'Dr. Rajesh Sharma', department: 'Academic', baseSalary: 125000, allowances: 25000, deductions: 12000, netPayout: 138000, financeSyncStatus: 'Synced' },
  { id: 'PAY-802', empId: 'SCH-EMP-042', empName: 'Ananya Deshmukh', department: 'Human Resources', baseSalary: 75000, allowances: 12000, deductions: 6500, netPayout: 80500, financeSyncStatus: 'Synced' }
];

export const mockPerformanceReviews: PerformanceReview[] = [
  { id: 'PRF-301', empId: 'SCH-EMP-105', empName: 'Sunita Verma', department: 'Academic', reviewPeriod: 'FY 2025-26 Q1', kpiScore: 94, rating: 5, reviewer: 'Dr. Rajesh Sharma', promotionRecommended: 'Yes' }
];

export const mockTrainingPrograms: TrainingProgram[] = [
  { id: 'TRN-101', title: 'Modern Pedagogy & AI Tools in Classroom', trainer: 'Dr. Mehta (IIT Delhi Panel)', startDate: '2026-08-05', endDate: '2026-08-07', enrolledCount: 35, completionRate: 98, skillsCovered: ['AI Tools', 'Lesson Planning', 'Smart Boards'] }
];

export const mockHRDocuments: HRDocument[] = [
  { id: 'DOC-901', empName: 'Sunita Verma', docType: 'Appointment Letter', fileName: 'Sunita_Verma_Appointment.pdf', uploadDate: '2019-04-01', status: 'Verified' }
];

export const mockAssets: AssetItem[] = [
  { id: 'AST-401', assetCode: 'AST-LAP-089', assetType: 'Laptop', assignedToEmp: 'Vikramaditya Roy', serialNumber: 'Dell-Latitude-7420', assignmentDate: '2022-08-10', condition: 'Good' }
];

export const mockCompliance: ComplianceRecord[] = [
  { id: 'CMP-101', empName: 'Dr. Rajesh Sharma', backgroundCheck: 'Passed', policyAck: 'Signed', contractExpiry: '2028-05-31', alertLevel: 'Normal' }
];

export const mockHRAnnouncements: HRAnnouncement[] = [
  { id: 'ANC-01', title: 'Independence Day Celebration Guidelines & Staff Duties', category: 'HR Notice', targetAudience: 'All Staff', publishedDate: '2026-07-20', author: 'Ananya Deshmukh' }
];
