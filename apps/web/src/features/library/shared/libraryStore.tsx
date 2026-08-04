import React, { createContext, useContext, useState } from 'react';
import type {
  Book, InventoryCopy, CirculationRecord, BookReservation, LibraryMember,
  Author, Publisher, CategoryItem, DigitalAsset, FineRecord,
  AcquisitionRequest, LostDamagedRecord, ReadingProgram, LibrarySettings, AiLibraryInsight
} from './types';
import {
  mockBooks, mockInventory, mockCirculation, mockReservations,
  mockMembers, mockAuthors, mockPublishers, mockCategories,
  mockDigitalAssets, mockFines, mockAcquisitions, mockLostDamaged, mockReadingPrograms
} from './mockLibraryData';

export interface ActivityLog {
  id: string;
  type: 'issue' | 'return' | 'renew' | 'reserve' | 'fine' | 'add_book' | 'acquisition';
  message: string;
  timestamp: string;
  badgeColor?: string;
}

const defaultSettings: LibrarySettings = {
  maxBooksStudent: 3,
  maxBooksTeacher: 10,
  maxBooksStaff: 5,
  durationDaysStudent: 14,
  durationDaysTeacher: 30,
  durationDaysStaff: 21,
  finePerDay: 5,
  gracePeriodDays: 2,
  reservationPickupWindowDays: 3,
  maxRenewals: 2,
  barcodePrefix: 'LIB-BC',
  enableSmsAlerts: true,
  enableEmailReminders: true,
  libraryTimings: 'Mon - Sat: 8:00 AM - 5:00 PM',
};

const defaultAiInsights: AiLibraryInsight[] = [
  {
    id: 'INS-01',
    type: 'demand',
    title: 'High Demand Surge: Computer Science',
    description: 'Demand for "Introduction to Algorithms" increased by 45% ahead of mid-term coding exams.',
    metric: '+45% Demand',
    actionText: 'Acquire 5 Extra Copies',
    impact: 'High'
  },
  {
    id: 'INS-02',
    type: 'overdue_prediction',
    title: 'Overdue Risk Warning',
    description: '3 students in Class 10-A have books due in 24h with a historical delay pattern.',
    metric: '3 At-Risk Loans',
    actionText: 'Send Automated SMS Reminder',
    impact: 'Medium'
  },
  {
    id: 'INS-03',
    type: 'recommendation',
    title: 'Recommended Purchase',
    description: 'STEM Literature Month feedback suggests adding 10 copies of "AI in 2026 Reference Manual".',
    metric: '12 Teacher Votes',
    actionText: 'Create Acquisition PO',
    impact: 'Medium'
  },
  {
    id: 'INS-04',
    type: 'low_stock',
    title: 'Low Stock Alert: Science Section',
    description: 'Physics & Chemistry textbooks have less than 15% available stock on shelf S-04.',
    metric: '2 Copies Left',
    actionText: 'Re-balance Shelves',
    impact: 'High'
  }
];

interface LibraryContextType {
  books: Book[];
  inventory: InventoryCopy[];
  circulation: CirculationRecord[];
  reservations: BookReservation[];
  members: LibraryMember[];
  authors: Author[];
  publishers: Publisher[];
  categories: CategoryItem[];
  digitalAssets: DigitalAsset[];
  fines: FineRecord[];
  acquisitions: AcquisitionRequest[];
  lostDamaged: LostDamagedRecord[];
  readingPrograms: ReadingProgram[];
  settings: LibrarySettings;
  aiInsights: AiLibraryInsight[];
  activities: ActivityLog[];
  toastMessage: string | null;
  showToast: (msg: string) => void;

  // Workflows
  issueBook: (memberId: string, bookId: string, customDueDate?: string) => boolean;
  returnBook: (circulationId: string, condition?: 'Good' | 'Fair' | 'Damaged' | 'Needs Repair', finePaid?: boolean, waiveReason?: string) => void;
  renewBook: (circulationId: string) => boolean;
  reserveBook: (memberId: string, bookId: string) => boolean;
  addBook: (newBook: Partial<Book>) => void;
  registerMember: (newMember: Partial<LibraryMember>) => void;
  collectFine: (fineId: string, paymentMethod?: string, waiveReason?: string) => void;
  createAcquisition: (req: Partial<AcquisitionRequest>) => void;
  receiveAcquisition: (acquisitionId: string) => void;
  addDigitalAsset: (asset: Partial<DigitalAsset>) => void;
  updateSettings: (newSettings: Partial<LibrarySettings>) => void;
}

const LibraryContext = createContext<LibraryContextType | undefined>(undefined);

export function LibraryProvider({ children }: { children: React.ReactNode }) {
  const [books, setBooks] = useState<Book[]>(mockBooks);
  const [inventory, setInventory] = useState<InventoryCopy[]>(mockInventory);
  const [circulation, setCirculation] = useState<CirculationRecord[]>(mockCirculation);
  const [reservations, setReservations] = useState<BookReservation[]>(mockReservations);
  const [members, setMembers] = useState<LibraryMember[]>(mockMembers);
  const [authors, setAuthors] = useState<Author[]>(mockAuthors);
  const [publishers, setPublishers] = useState<Publisher[]>(mockPublishers);
  const [categories, setCategories] = useState<CategoryItem[]>(mockCategories);
  const [digitalAssets, setDigitalAssets] = useState<DigitalAsset[]>(mockDigitalAssets);
  const [fines, setFines] = useState<FineRecord[]>(mockFines);
  const [acquisitions, setAcquisitions] = useState<AcquisitionRequest[]>(mockAcquisitions);
  const [lostDamaged, setLostDamaged] = useState<LostDamagedRecord[]>(mockLostDamaged);
  const [readingPrograms, setReadingPrograms] = useState<ReadingProgram[]>(mockReadingPrograms);
  const [settings, setSettings] = useState<LibrarySettings>(defaultSettings);
  const [aiInsights, setAiInsights] = useState<AiLibraryInsight[]>(defaultAiInsights);

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [activities, setActivities] = useState<ActivityLog[]>([
    { id: 'ACT-1', type: 'issue', message: 'Issued "Fundamentals of Quantum Mechanics" to Siya Patel (Class 11-B)', timestamp: '10 mins ago', badgeColor: '#4F46E5' },
    { id: 'ACT-2', type: 'return', message: 'Returned "The Great Gatsby" by Vivaan Mehta (Class 9-C)', timestamp: '35 mins ago', badgeColor: '#10B981' },
    { id: 'ACT-3', type: 'fine', message: 'Collected ₹25 fine from Aarav Sharma via Cash Desk', timestamp: '1 hour ago', badgeColor: '#F59E0B' },
    { id: 'ACT-4', type: 'reserve', message: 'Book Reservation #1 queued for "Introduction to Algorithms"', timestamp: '2 hours ago', badgeColor: '#8B5CF6' }
  ]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const addActivity = (type: ActivityLog['type'], message: string, badgeColor = '#4F46E5') => {
    const newAct: ActivityLog = {
      id: `ACT-${Date.now()}`,
      type,
      message,
      timestamp: 'Just now',
      badgeColor,
    };
    setActivities((prev) => [newAct, ...prev]);
  };

  // Workflow 1: Issue Book
  const issueBook = (memberId: string, bookId: string, customDueDate?: string): boolean => {
    const book = books.find((b) => b.id === bookId || b.barcode === bookId || b.isbn === bookId);
    const member = members.find((m) => m.id === memberId || m.memberNo === memberId);

    if (!book) {
      showToast('Error: Book not found in catalog.');
      return false;
    }
    if (!member) {
      showToast('Error: Library member not found.');
      return false;
    }
    if (book.availableCopies <= 0) {
      showToast(`Cannot issue: "${book.title}" has 0 available copies.`);
      return false;
    }
    if (member.currentlyBorrowed >= member.maxLimit) {
      showToast(`Cannot issue: ${member.name} has reached maximum borrow limit (${member.maxLimit} books).`);
      return false;
    }

    // Default due date calculation based on role
    const duration = member.role === 'Teacher' ? settings.durationDaysTeacher : member.role === 'Staff' ? settings.durationDaysStaff : settings.durationDaysStudent;
    const dueDate = customDueDate || new Date(Date.now() + duration * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const todayStr = new Date().toISOString().split('T')[0];

    const newCirculation: CirculationRecord = {
      id: `CIRC-${Math.floor(100000 + Math.random() * 900000)}`,
      bookId: book.id,
      bookTitle: book.title,
      isbn: book.isbn,
      memberId: member.id,
      memberName: member.name,
      memberRole: member.role,
      classGrade: member.gradeOrDept,
      issueDate: todayStr,
      dueDate: dueDate,
      status: 'Issued',
      fineAmount: 0,
    };

    setCirculation((prev) => [newCirculation, ...prev]);

    // Update book available copies
    setBooks((prev) =>
      prev.map((b) =>
        b.id === book.id
          ? {
              ...b,
              availableCopies: Math.max(0, b.availableCopies - 1),
              status: b.availableCopies - 1 <= 0 ? 'Checked Out' : b.availableCopies - 1 <= 2 ? 'Low Stock' : 'Available',
            }
          : b
      )
    );

    // Update member borrowed count
    setMembers((prev) =>
      prev.map((m) => (m.id === member.id ? { ...m, currentlyBorrowed: m.currentlyBorrowed + 1 } : m))
    );

    // Update copy status if matching in inventory
    setInventory((prev) => {
      const copyIndex = prev.findIndex((inv) => inv.bookId === book.id && inv.status === 'Available');
      if (copyIndex !== -1) {
        const updated = [...prev];
        updated[copyIndex] = { ...updated[copyIndex], status: 'Issued' };
        return updated;
      }
      return prev;
    });

    addActivity('issue', `Issued "${book.title}" to ${member.name} (${member.gradeOrDept}). Due: ${dueDate}`, '#4F46E5');
    showToast(`Book successfully issued to ${member.name}! Due date: ${dueDate}`);
    return true;
  };

  // Workflow 2: Return Book
  const returnBook = (
    circulationId: string,
    condition: 'Good' | 'Fair' | 'Damaged' | 'Needs Repair' = 'Good',
    finePaid = false,
    waiveReason?: string
  ) => {
    const circ = circulation.find((c) => c.id === circulationId);
    if (!circ) return;

    const todayStr = new Date().toISOString().split('T')[0];
    const isOverdue = circ.dueDate < todayStr && circ.status !== 'Returned';
    
    let calculatedFine = circ.fineAmount;
    if (isOverdue && calculatedFine === 0) {
      const days = Math.max(1, Math.floor((new Date(todayStr).getTime() - new Date(circ.dueDate).getTime()) / (1000 * 3600 * 24)));
      calculatedFine = days * settings.finePerDay;
    }

    if (condition === 'Damaged') {
      calculatedFine += 250; // Damage penalty
    }

    setCirculation((prev) =>
      prev.map((c) =>
        c.id === circulationId
          ? {
              ...c,
              status: 'Returned',
              returnDate: todayStr,
              fineAmount: calculatedFine,
            }
          : c
      )
    );

    // Increment book availability
    setBooks((prev) =>
      prev.map((b) =>
        b.id === circ.bookId
          ? {
              ...b,
              availableCopies: b.availableCopies + 1,
              status: 'Available',
            }
          : b
      )
    );

    // Decrement member borrowed count
    setMembers((prev) =>
      prev.map((m) =>
        m.id === circ.memberId
          ? {
              ...m,
              currentlyBorrowed: Math.max(0, m.currentlyBorrowed - 1),
              unpaidFines: finePaid || waiveReason ? m.unpaidFines : m.unpaidFines + calculatedFine,
            }
          : m
      )
    );

    // Handle fine record creation if fine > 0
    if (calculatedFine > 0) {
      const newFine: FineRecord = {
        id: `FN-${Math.floor(1000 + Math.random() * 9000)}`,
        memberId: circ.memberId,
        memberName: circ.memberName,
        bookTitle: circ.bookTitle,
        daysOverdue: Math.max(1, Math.floor((new Date(todayStr).getTime() - new Date(circ.dueDate).getTime()) / (1000 * 3600 * 24))),
        fineAmount: calculatedFine,
        status: finePaid ? 'Collected' : waiveReason ? 'Waived' : 'Pending',
        date: todayStr,
        waivedBy: waiveReason ? 'Librarian Admin' : undefined,
      };
      setFines((prev) => [newFine, ...prev]);
    }

    addActivity('return', `Returned "${circ.bookTitle}" from ${circ.memberName}. Condition: ${condition}`, '#10B981');
    showToast(`Book "${circ.bookTitle}" marked as returned!`);
  };

  // Workflow 3: Renew Book
  const renewBook = (circulationId: string): boolean => {
    const circ = circulation.find((c) => c.id === circulationId);
    if (!circ) return false;

    // Check if book has pending reservations
    const hasReservation = reservations.some((r) => r.bookId === circ.bookId && r.status === 'Pending');
    if (hasReservation) {
      showToast(`Cannot renew: "${circ.bookTitle}" has a pending reservation queue.`);
      return false;
    }

    const currentDue = new Date(circ.dueDate);
    const newDueDate = new Date(currentDue.getTime() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    setCirculation((prev) =>
      prev.map((c) =>
        c.id === circulationId
          ? { ...c, dueDate: newDueDate, status: 'Renewed' }
          : c
      )
    );

    addActivity('renew', `Renewed loan for "${circ.bookTitle}" (${circ.memberName}). New due date: ${newDueDate}`, '#6366F1');
    showToast(`Loan extended to ${newDueDate}`);
    return true;
  };

  // Workflow 4: Reserve Book
  const reserveBook = (memberId: string, bookId: string): boolean => {
    const book = books.find((b) => b.id === bookId);
    const member = members.find((m) => m.id === memberId);
    if (!book || !member) return false;

    const existingQueue = reservations.filter((r) => r.bookId === bookId && r.status === 'Pending').length;
    const today = new Date();
    const expiry = new Date(today.getTime() + settings.reservationPickupWindowDays * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    const newRes: BookReservation = {
      id: `RES-${Math.floor(100 + Math.random() * 900)}`,
      bookId: book.id,
      bookTitle: book.title,
      memberId: member.id,
      memberName: member.name,
      reserveDate: today.toISOString().split('T')[0],
      expiryDate: expiry,
      queueNo: existingQueue + 1,
      status: 'Pending',
    };

    setReservations((prev) => [newRes, ...prev]);
    addActivity('reserve', `Reserved "${book.title}" for ${member.name} (Queue #${existingQueue + 1})`, '#8B5CF6');
    showToast(`Reservation recorded! Queue Position: #${existingQueue + 1}`);
    return true;
  };

  // Workflow 5: Add Book
  const addBook = (newBookData: Partial<Book>) => {
    const id = `BK-${Math.floor(100 + Math.random() * 900)}`;
    const barcode = newBookData.barcode || `${settings.barcodePrefix}-${Math.floor(100000 + Math.random() * 900000)}`;
    const totalCopies = newBookData.totalCopies || 1;

    const fullBook: Book = {
      id,
      isbn: newBookData.isbn || '978-0000000000',
      title: newBookData.title || 'Untitled Book',
      author: newBookData.author || 'Unknown Author',
      publisher: newBookData.publisher || 'Independent Press',
      category: newBookData.category || 'General Literature',
      language: newBookData.language || 'English',
      edition: newBookData.edition || '1st Edition',
      publicationYear: newBookData.publicationYear || 2026,
      totalCopies: totalCopies,
      availableCopies: totalCopies,
      shelfLocation: newBookData.shelfLocation || 'Main Rack A-01',
      barcode: barcode,
      qrCode: `QR-${id}`,
      description: newBookData.description || 'Enterprise catalog accession entry.',
      status: 'Available',
    };

    setBooks((prev) => [fullBook, ...prev]);

    // Create inventory copies
    const newCopies: InventoryCopy[] = [];
    for (let i = 1; i <= totalCopies; i++) {
      newCopies.push({
        id: `INV-${Date.now()}-${i}`,
        bookId: id,
        bookTitle: fullBook.title,
        barcode: `${barcode}-${String.fromCharCode(64 + i)}`,
        qrCode: `QR-${id}-${i}`,
        shelf: fullBook.shelfLocation,
        condition: 'Good',
        status: 'Available',
        addedDate: new Date().toISOString().split('T')[0],
      });
    }
    setInventory((prev) => [...newCopies, ...prev]);

    // Increment category count
    setCategories((prev) =>
      prev.map((c) => (c.name.toLowerCase().includes(fullBook.category.toLowerCase()) ? { ...c, bookCount: c.bookCount + totalCopies } : c))
    );

    addActivity('add_book', `Added new book accession "${fullBook.title}" (${totalCopies} copies)`, '#10B981');
    showToast(`New book "${fullBook.title}" added to catalog with ${totalCopies} copies!`);
  };

  // Workflow 6: Register Member
  const registerMember = (newMemberData: Partial<LibraryMember>) => {
    const id = `MBR-${Math.floor(100 + Math.random() * 900)}`;
    const role = newMemberData.role || 'Student';
    const limit = role === 'Teacher' ? settings.maxBooksTeacher : role === 'Staff' ? settings.maxBooksStaff : settings.maxBooksStudent;

    const member: LibraryMember = {
      id,
      memberNo: `LIB-${role.substring(0, 3).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`,
      name: newMemberData.name || 'New Member',
      role,
      gradeOrDept: newMemberData.gradeOrDept || 'General',
      email: newMemberData.email || 'member@school.edu',
      phone: newMemberData.phone || '+91 99000 00000',
      currentlyBorrowed: 0,
      maxLimit: limit,
      unpaidFines: 0,
      status: 'Active',
      joinedDate: new Date().toISOString().split('T')[0],
    };

    setMembers((prev) => [member, ...prev]);
    showToast(`Library card generated for ${member.name} (${member.memberNo})!`);
  };

  // Workflow 7: Collect Fine
  const collectFine = (fineId: string, paymentMethod = 'Cash Desk', waiveReason?: string) => {
    const fine = fines.find((f) => f.id === fineId);
    if (!fine) return;

    setFines((prev) =>
      prev.map((f) =>
        f.id === fineId
          ? { ...f, status: waiveReason ? 'Waived' : 'Collected', waivedBy: waiveReason ? 'Librarian' : undefined }
          : f
      )
    );

    // Update member unpaid fines
    setMembers((prev) =>
      prev.map((m) =>
        m.id === fine.memberId
          ? { ...m, unpaidFines: Math.max(0, m.unpaidFines - fine.fineAmount) }
          : m
      )
    );

    addActivity('fine', `${waiveReason ? 'Waived' : 'Collected'} fine of ₹${fine.fineAmount} for ${fine.memberName} via ${paymentMethod}`, '#F59E0B');
    showToast(`Fine payment of ₹${fine.fineAmount} successfully processed!`);
  };

  // Workflow 8: Create Acquisition
  const createAcquisition = (req: Partial<AcquisitionRequest>) => {
    const newAcq: AcquisitionRequest = {
      id: `ACQ-${Math.floor(500 + Math.random() * 500)}`,
      poNumber: `LIB-PO-${new Date().getFullYear()}-${Math.floor(10 + Math.random() * 90)}`,
      bookTitle: req.bookTitle || 'Requested Book Title',
      author: req.author || 'Author Name',
      quantity: req.quantity || 5,
      estimatedCost: req.estimatedCost || 5000,
      vendor: req.vendor || 'Pearson Education',
      requestedBy: req.requestedBy || 'Librarian Desk',
      status: 'Requested',
      date: new Date().toISOString().split('T')[0],
    };

    setAcquisitions((prev) => [newAcq, ...prev]);
    showToast(`Acquisition request PO created: ${newAcq.poNumber}`);
  };

  // Workflow 9: Receive Acquisition -> Converts into Catalog Entry
  const receiveAcquisition = (acquisitionId: string) => {
    const acq = acquisitions.find((a) => a.id === acquisitionId);
    if (!acq) return;

    setAcquisitions((prev) =>
      prev.map((a) => (a.id === acquisitionId ? { ...a, status: 'Received' } : a))
    );

    // Auto-add to book catalog
    addBook({
      title: acq.bookTitle,
      author: acq.author,
      publisher: acq.vendor,
      totalCopies: acq.quantity,
      category: 'General Literature',
    });

    addActivity('acquisition', `Received Purchase Order ${acq.poNumber} (${acq.quantity} copies of "${acq.bookTitle}")`, '#059669');
    showToast(`Purchase order ${acq.poNumber} received! Stock automatically populated in Catalog.`);
  };

  // Workflow 10: Add Digital Asset
  const addDigitalAsset = (asset: Partial<DigitalAsset>) => {
    const newAsset: DigitalAsset = {
      id: `DIG-${Math.floor(10 + Math.random() * 90)}`,
      title: asset.title || 'Untitled E-Resource',
      type: asset.type || 'PDF Notes',
      author: asset.author || 'Faculty',
      fileSize: asset.fileSize || '5.0 MB',
      downloads: 0,
      accessLevel: asset.accessLevel || 'All',
      uploadDate: new Date().toISOString().split('T')[0],
    };

    setDigitalAssets((prev) => [newAsset, ...prev]);
    showToast(`Digital resource "${newAsset.title}" uploaded to library repository!`);
  };

  // Workflow 11: Settings
  const updateSettings = (newSettings: Partial<LibrarySettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
    showToast('Library policy settings updated!');
  };

  return (
    <LibraryContext.Provider
      value={{
        books,
        inventory,
        circulation,
        reservations,
        members,
        authors,
        publishers,
        categories,
        digitalAssets,
        fines,
        acquisitions,
        lostDamaged,
        readingPrograms,
        settings,
        aiInsights,
        activities,
        toastMessage,
        showToast,
        issueBook,
        returnBook,
        renewBook,
        reserveBook,
        addBook,
        registerMember,
        collectFine,
        createAcquisition,
        receiveAcquisition,
        addDigitalAsset,
        updateSettings,
      }}
    >
      {children}
    </LibraryContext.Provider>
  );
}

export function useLibraryStore() {
  const context = useContext(LibraryContext);
  if (!context) {
    throw new Error('useLibraryStore must be used within a LibraryProvider');
  }
  return context;
}
