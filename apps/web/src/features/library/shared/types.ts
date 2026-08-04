export const LIBRARY_TYPES_VERSION = '1.0.0';

export type BookStatus = 'Available' | 'Checked Out' | 'Reserved' | 'Low Stock' | 'Out of Stock';

export interface Book {
  id: string;
  isbn: string;
  title: string;
  author: string;
  publisher: string;
  category: string;
  language: string;
  edition: string;
  publicationYear: number;
  totalCopies: number;
  availableCopies: number;
  shelfLocation: string;
  barcode: string;
  qrCode: string;
  description: string;
  coverUrl?: string;
  status: BookStatus;
}

export interface InventoryCopy {
  id: string;
  bookId: string;
  bookTitle: string;
  barcode: string;
  qrCode: string;
  shelf: string;
  condition: 'Good' | 'Fair' | 'Damaged' | 'Needs Repair';
  status: 'Available' | 'Issued' | 'Reserved' | 'Under Audit' | 'Lost';
  addedDate: string;
}

export interface CirculationRecord {
  id: string;
  bookId: string;
  bookTitle: string;
  isbn: string;
  memberId: string;
  memberName: string;
  memberRole: 'Student' | 'Teacher' | 'Staff';
  classGrade?: string;
  issueDate: string;
  dueDate: string;
  returnDate?: string;
  status: 'Issued' | 'Returned' | 'Overdue' | 'Renewed';
  fineAmount: number;
}

export interface BookReservation {
  id: string;
  bookId: string;
  bookTitle: string;
  memberId: string;
  memberName: string;
  reserveDate: string;
  expiryDate: string;
  queueNo: number;
  status: 'Pending' | 'Ready for Pickup' | 'Fulfilled' | 'Expired' | 'Cancelled';
}

export interface LibraryMember {
  id: string;
  memberNo: string;
  name: string;
  role: 'Student' | 'Teacher' | 'Staff';
  gradeOrDept: string;
  email: string;
  phone: string;
  currentlyBorrowed: number;
  maxLimit: number;
  unpaidFines: number;
  status: 'Active' | 'Suspended' | 'On Leave';
  joinedDate: string;
}

export interface Author {
  id: string;
  name: string;
  nationality: string;
  biography: string;
  booksCount: number;
  famousWorks: string[];
}

export interface Publisher {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  website: string;
  publishedCount: number;
}

export interface CategoryItem {
  id: string;
  name: string;
  code: string;
  description: string;
  bookCount: number;
  iconName: string;
}

export interface DigitalAsset {
  id: string;
  title: string;
  type: 'eBook' | 'PDF Notes' | 'Research Paper' | 'Journal' | 'Audiobook' | 'Video';
  author: string;
  fileSize: string;
  downloads: number;
  accessLevel: 'All' | 'Teachers Only' | 'Senior Students';
  uploadDate: string;
}

export interface FineRecord {
  id: string;
  memberId: string;
  memberName: string;
  bookTitle: string;
  daysOverdue: number;
  fineAmount: number;
  status: 'Pending' | 'Collected' | 'Waived';
  date: string;
  waivedBy?: string;
}

export interface AcquisitionRequest {
  id: string;
  poNumber: string;
  bookTitle: string;
  author: string;
  quantity: number;
  estimatedCost: number;
  vendor: string;
  requestedBy: string;
  status: 'Requested' | 'Approved' | 'Ordered' | 'Received';
  date: string;
}

export interface LostDamagedRecord {
  id: string;
  bookTitle: string;
  barcode: string;
  memberName: string;
  type: 'Lost' | 'Damaged';
  replacementCost: number;
  compensationStatus: 'Pending' | 'Paid' | 'Waived';
  repairStatus: 'Under Repair' | 'Replaced' | 'Written Off';
  reportedDate: string;
}

export interface ReadingProgram {
  id: string;
  title: string;
  targetAudience: string;
  startDate: string;
  endDate: string;
  participantsCount: number;
  goalBooksCount: number;
  topReader: string;
  status: 'Active' | 'Upcoming' | 'Completed';
}

export interface LibrarySettings {
  maxBooksStudent: number;
  maxBooksTeacher: number;
  maxBooksStaff: number;
  durationDaysStudent: number;
  durationDaysTeacher: number;
  durationDaysStaff: number;
  finePerDay: number;
  gracePeriodDays: number;
  reservationPickupWindowDays: number;
  maxRenewals: number;
  barcodePrefix: string;
  enableSmsAlerts: boolean;
  enableEmailReminders: boolean;
  libraryTimings: string;
}

export interface AiLibraryInsight {
  id: string;
  type: 'demand' | 'overdue_prediction' | 'low_stock' | 'recommendation' | 'health';
  title: string;
  description: string;
  metric?: string;
  actionText?: string;
  impact: 'High' | 'Medium' | 'Low';
}

