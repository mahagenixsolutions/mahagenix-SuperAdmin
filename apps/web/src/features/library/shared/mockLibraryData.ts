import type { 
  Book, InventoryCopy, CirculationRecord, BookReservation, LibraryMember, 
  Author, Publisher, CategoryItem, DigitalAsset, FineRecord, 
  AcquisitionRequest, LostDamagedRecord, ReadingProgram 
} from './types';

export const mockBooks: Book[] = [
  {
    id: 'BK-101',
    isbn: '978-0134685991',
    title: 'Fundamentals of Quantum Mechanics',
    author: 'Dr. David Griffiths',
    publisher: 'Pearson Education',
    category: 'Science',
    language: 'English',
    edition: '3rd Edition',
    publicationYear: 2018,
    totalCopies: 6,
    availableCopies: 4,
    shelfLocation: 'Shelf S-04 (Science Wing)',
    barcode: 'BC-992014',
    qrCode: 'QR-BK-101',
    description: 'Comprehensive textbook on introductory quantum mechanics principles, wave functions, and perturbation theory.',
    status: 'Available'
  },
  {
    id: 'BK-102',
    isbn: '978-0073383095',
    title: 'Calculus: Early Transcendentals',
    author: 'James Stewart',
    publisher: 'Cengage Learning',
    category: 'Mathematics',
    language: 'English',
    edition: '8th Edition',
    publicationYear: 2020,
    totalCopies: 8,
    availableCopies: 2,
    shelfLocation: 'Shelf M-02 (Math Section)',
    barcode: 'BC-881023',
    qrCode: 'QR-BK-102',
    description: 'Essential textbook for high school and undergraduate calculus, differential equations, and vector analysis.',
    status: 'Available'
  },
  {
    id: 'BK-103',
    isbn: '978-0199535569',
    title: 'A History of Ancient Civilizations',
    author: 'Arnold Toynbee',
    publisher: 'Oxford University Press',
    category: 'History',
    language: 'English',
    edition: '2nd Revised',
    publicationYear: 2015,
    totalCopies: 4,
    availableCopies: 0,
    shelfLocation: 'Shelf H-01 (History Rack)',
    barcode: 'BC-772910',
    qrCode: 'QR-BK-103',
    description: 'Analytical study of the rise and decline of ancient Mesopotamian, Egyptian, and Indus Valley civilizations.',
    status: 'Checked Out'
  },
  {
    id: 'BK-104',
    isbn: '978-0262033848',
    title: 'Introduction to Algorithms',
    author: 'Thomas H. Cormen',
    publisher: 'MIT Press',
    category: 'Technology',
    language: 'English',
    edition: '4th Edition',
    publicationYear: 2022,
    totalCopies: 5,
    availableCopies: 1,
    shelfLocation: 'Shelf T-05 (Computer Science)',
    barcode: 'BC-554102',
    qrCode: 'QR-BK-104',
    description: 'Definitive reference guide covering graph theory, dynamic programming, sorting algorithms, and data structures.',
    status: 'Low Stock'
  },
  {
    id: 'BK-105',
    isbn: '978-0743273565',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    publisher: 'Scribner',
    category: 'Literature',
    language: 'English',
    edition: 'Classics Edition',
    publicationYear: 2004,
    totalCopies: 10,
    availableCopies: 7,
    shelfLocation: 'Shelf L-03 (Fiction Rack)',
    barcode: 'BC-112093',
    qrCode: 'QR-BK-105',
    description: 'Classic American novel exploring themes of wealth, love, and ambition in the Jazz Age.',
    status: 'Available'
  }
];

export const mockInventory: InventoryCopy[] = [
  { id: 'INV-01', bookId: 'BK-101', bookTitle: 'Fundamentals of Quantum Mechanics', barcode: 'BC-992014-A', qrCode: 'QR-101-A', shelf: 'Shelf S-04', condition: 'Good', status: 'Available', addedDate: '2024-01-10' },
  { id: 'INV-02', bookId: 'BK-101', bookTitle: 'Fundamentals of Quantum Mechanics', barcode: 'BC-992014-B', qrCode: 'QR-101-B', shelf: 'Shelf S-04', condition: 'Good', status: 'Issued', addedDate: '2024-01-10' },
  { id: 'INV-03', bookId: 'BK-103', bookTitle: 'A History of Ancient Civilizations', barcode: 'BC-772910-A', qrCode: 'QR-103-A', shelf: 'Shelf H-01', condition: 'Fair', status: 'Issued', addedDate: '2023-08-15' },
  { id: 'INV-04', bookId: 'BK-104', bookTitle: 'Introduction to Algorithms', barcode: 'BC-554102-A', qrCode: 'QR-104-A', shelf: 'Shelf T-05', condition: 'Needs Repair', status: 'Under Audit', addedDate: '2022-09-01' }
];

export const mockCirculation: CirculationRecord[] = [
  { id: 'CIRC-901', bookId: 'BK-103', bookTitle: 'A History of Ancient Civilizations', isbn: '978-0199535569', memberId: 'STU-104', memberName: 'Aarav Sharma', memberRole: 'Student', classGrade: 'Class 10-A', issueDate: '2026-07-05', dueDate: '2026-07-19', status: 'Overdue', fineAmount: 25 },
  { id: 'CIRC-902', bookId: 'BK-102', bookTitle: 'Calculus: Early Transcendentals', isbn: '978-0073383095', memberId: 'TCH-201', memberName: 'Prof. Sunita Verma', memberRole: 'Teacher', classGrade: 'Math Dept', issueDate: '2026-07-12', dueDate: '2026-07-26', status: 'Issued', fineAmount: 0 },
  { id: 'CIRC-903', bookId: 'BK-101', bookTitle: 'Fundamentals of Quantum Mechanics', isbn: '978-0134685991', memberId: 'STU-108', memberName: 'Siya Patel', memberRole: 'Student', classGrade: 'Class 11-B', issueDate: '2026-07-15', dueDate: '2026-07-29', status: 'Issued', fineAmount: 0 },
  { id: 'CIRC-904', bookId: 'BK-105', bookTitle: 'The Great Gatsby', isbn: '978-0743273565', memberId: 'STU-112', memberName: 'Vivaan Mehta', memberRole: 'Student', classGrade: 'Class 9-C', issueDate: '2026-06-20', dueDate: '2026-07-04', returnDate: '2026-07-03', status: 'Returned', fineAmount: 0 }
];

export const mockReservations: BookReservation[] = [
  { id: 'RES-301', bookId: 'BK-103', bookTitle: 'A History of Ancient Civilizations', memberId: 'STU-115', memberName: 'Rohan Gupta', reserveDate: '2026-07-20', expiryDate: '2026-07-25', queueNo: 1, status: 'Pending' },
  { id: 'RES-302', bookId: 'BK-104', bookTitle: 'Introduction to Algorithms', memberId: 'TCH-204', memberName: 'Vikramaditya Roy', reserveDate: '2026-07-21', expiryDate: '2026-07-26', queueNo: 1, status: 'Ready for Pickup' }
];

export const mockMembers: LibraryMember[] = [
  { id: 'MBR-101', memberNo: 'LIB-STU-001', name: 'Aarav Sharma', role: 'Student', gradeOrDept: 'Class 10-A', email: 'aarav.sharma@school.edu', phone: '+91 98110 44332', currentlyBorrowed: 2, maxLimit: 3, unpaidFines: 25, status: 'Active', joinedDate: '2024-04-01' },
  { id: 'MBR-102', memberNo: 'LIB-TCH-005', name: 'Prof. Sunita Verma', role: 'Teacher', gradeOrDept: 'Mathematics Dept', email: 'sunita.v@school.edu', phone: '+91 98200 55441', currentlyBorrowed: 4, maxLimit: 10, unpaidFines: 0, status: 'Active', joinedDate: '2022-06-15' },
  { id: 'MBR-103', memberNo: 'LIB-STU-089', name: 'Siya Patel', role: 'Student', gradeOrDept: 'Class 11-B', email: 'siya.p@school.edu', phone: '+91 98330 11223', currentlyBorrowed: 1, maxLimit: 3, unpaidFines: 0, status: 'Active', joinedDate: '2023-04-01' }
];

export const mockAuthors: Author[] = [
  { id: 'ATH-01', name: 'Dr. David Griffiths', nationality: 'American', biography: 'Renowned physicist and author of leading standard physics textbooks.', booksCount: 4, famousWorks: ['Quantum Mechanics', 'Electrodynamics'] },
  { id: 'ATH-02', name: 'James Stewart', nationality: 'Canadian', biography: 'Prominent mathematician and author of world-famous Calculus series.', booksCount: 6, famousWorks: ['Calculus: Early Transcendentals', 'Precalculus'] },
  { id: 'ATH-03', name: 'Arnold Toynbee', nationality: 'British', biography: 'Philosopher of history and author of 12-volume A Study of History.', booksCount: 3, famousWorks: ['Ancient Civilizations', 'Study of History'] }
];

export const mockPublishers: Publisher[] = [
  { id: 'PUB-01', name: 'Pearson Education', contactPerson: 'Rajesh Nair', email: 'orders@pearson.co.in', phone: '+91 11 4455 6677', website: 'https://pearson.com', publishedCount: 142 },
  { id: 'PUB-02', name: 'Oxford University Press', contactPerson: 'Anita Rao', email: 'school.sales@oup.com', phone: '+91 11 2233 4455', website: 'https://global.oup.com', publishedCount: 215 },
  { id: 'PUB-03', name: 'Cengage Learning', contactPerson: 'Vikram Singh', email: 'contact@cengage.co.in', phone: '+91 22 6677 8899', website: 'https://cengage.co.in', publishedCount: 98 }
];

export const mockCategories: CategoryItem[] = [
  { id: 'CAT-01', name: 'Science & Physics', code: 'SCI-PHY', description: 'Physics, Chemistry, Biology, and Laboratory manuals', bookCount: 420, iconName: 'Atom' },
  { id: 'CAT-02', name: 'Mathematics & Statistics', code: 'MATH-STAT', description: 'Algebra, Geometry, Calculus, and Trigonometry', bookCount: 310, iconName: 'Calculator' },
  { id: 'CAT-03', name: 'History & World Civ', code: 'HIST-CIV', description: 'Ancient, Medieval, and Modern World History', bookCount: 260, iconName: 'Landmark' },
  { id: 'CAT-04', name: 'Computer & Tech', code: 'COMP-TECH', description: 'Coding, AI, Robotics, Data Structures & Web Dev', bookCount: 195, iconName: 'Cpu' },
  { id: 'CAT-05', name: 'Literature & Fiction', code: 'LIT-FIC', description: 'Classic Literature, Novels, Poetry, and Drama', bookCount: 540, iconName: 'BookOpen' }
];

export const mockDigitalAssets: DigitalAsset[] = [
  { id: 'DIG-01', title: 'Grade 10 Physics Master Formula PDF', type: 'PDF Notes', author: 'Physics Department', fileSize: '4.2 MB', downloads: 340, accessLevel: 'All', uploadDate: '2026-06-01' },
  { id: 'DIG-02', title: 'Advanced Calculus Lecture Series Audiobook', type: 'Audiobook', author: 'Prof. Stewart', fileSize: '145 MB', downloads: 185, accessLevel: 'Senior Students', uploadDate: '2026-05-15' },
  { id: 'DIG-03', title: 'CBSE Previous Year Board Question Papers 2020-2025', type: 'Research Paper', author: 'Academic Cell', fileSize: '18.5 MB', downloads: 890, accessLevel: 'All', uploadDate: '2026-04-10' }
];

export const mockFines: FineRecord[] = [
  { id: 'FN-101', memberId: 'STU-104', memberName: 'Aarav Sharma', bookTitle: 'A History of Ancient Civilizations', daysOverdue: 5, fineAmount: 25, status: 'Pending', date: '2026-07-21' },
  { id: 'FN-102', memberId: 'STU-088', memberName: 'Kavya Nair', bookTitle: 'Organic Chemistry Vol II', daysOverdue: 2, fineAmount: 10, status: 'Collected', date: '2026-07-18' }
];

export const mockAcquisitions: AcquisitionRequest[] = [
  { id: 'ACQ-501', poNumber: 'LIB-PO-2026-012', bookTitle: 'Artificial Intelligence: A Modern Approach', author: 'Stuart Russell', quantity: 5, estimatedCost: 14500, vendor: 'Pearson Education', requestedBy: 'Prof. Roy', status: 'Approved', date: '2026-07-10' },
  { id: 'ACQ-502', poNumber: 'LIB-PO-2026-014', bookTitle: 'CBSE Class 12 Science Reference Set', author: 'NCERT Panel', quantity: 20, estimatedCost: 18000, vendor: 'Oxford Press', requestedBy: 'Library Dept', status: 'Ordered', date: '2026-07-15' }
];

export const mockLostDamaged: LostDamagedRecord[] = [
  { id: 'LD-101', bookTitle: 'Introduction to Algorithms', barcode: 'BC-554102-A', memberName: 'Rahul Verma (Class 12-A)', type: 'Damaged', replacementCost: 1200, compensationStatus: 'Paid', repairStatus: 'Under Repair', reportedDate: '2026-07-08' },
  { id: 'LD-102', bookTitle: 'Modern World History', barcode: 'BC-332109-B', memberName: 'Ananya Sen (Class 9-B)', type: 'Lost', replacementCost: 650, compensationStatus: 'Pending', repairStatus: 'Written Off', reportedDate: '2026-07-14' }
];

export const mockReadingPrograms: ReadingProgram[] = [
  { id: 'PRG-01', title: 'Summer 100-Book Reading Challenge 2026', targetAudience: 'Classes 6 to 10', startDate: '2026-06-01', endDate: '2026-08-31', participantsCount: 145, goalBooksCount: 10, topReader: 'Rohan Gupta (14 books)', status: 'Active' },
  { id: 'PRG-02', title: 'Young Scientists STEM Literature Month', targetAudience: 'Senior Secondary', startDate: '2026-07-01', endDate: '2026-07-31', participantsCount: 88, goalBooksCount: 5, topReader: 'Siya Patel (6 books)', status: 'Active' }
];
