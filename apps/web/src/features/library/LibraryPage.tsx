import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PageLayout } from '../../components/erp/PageLayout';
import { PageHeader } from '../../components/erp/PageHeader';
import { LibraryProvider } from './shared/libraryStore';
import LibraryDashboardModule from './dashboard/LibraryDashboardModule';
import BookCatalogModule from './catalog/BookCatalogModule';
import BookInventoryModule from './inventory/BookInventoryModule';
import IssueBooksModule from './issue/IssueBooksModule';
import ReturnBooksModule from './returns/ReturnBooksModule';
import ReservationsModule from './reservations/ReservationsModule';
import MembersModule from './members/MembersModule';
import AuthorsPublishersModule from './authors/AuthorsPublishersModule';
import CategoriesModule from './categories/CategoriesModule';
import DigitalLibraryModule from './digital/DigitalLibraryModule';
import FineManagementModule from './fines/FineManagementModule';
import AcquisitionsModule from './acquisitions/AcquisitionsModule';
import LostDamagedModule from './lost-damaged/LostDamagedModule';
import ReadingProgramsModule from './reading-programs/ReadingProgramsModule';
import ReportsAnalyticsModule from './reports/ReportsAnalyticsModule';
import LibrarySettingsModule from './settings/LibrarySettingsModule';

export default function LibraryPage() {
  const location = useLocation();

  const getActiveTab = () => {
    const path = location.pathname;
    if (path.includes('/catalog')) return 'catalog';
    if (path.includes('/inventory')) return 'inventory';
    if (path.includes('/circulation')) return 'circulation';
    if (path.includes('/issue')) return 'issue';
    if (path.includes('/returns')) return 'returns';
    if (path.includes('/reservations')) return 'reservations';
    if (path.includes('/members')) return 'members';
    if (path.includes('/authors') || path.includes('/publishers')) return 'authors';
    if (path.includes('/categories')) return 'categories';
    if (path.includes('/digital')) return 'digital';
    if (path.includes('/fines')) return 'fines';
    if (path.includes('/acquisitions')) return 'acquisitions';
    if (path.includes('/lost-damaged')) return 'lost-damaged';
    if (path.includes('/reading-programs')) return 'reading-programs';
    if (path.includes('/reports') || path.includes('/analytics')) return 'reports';
    if (path.includes('/settings')) return 'settings';
    return 'dashboard';
  };

  const activeTab = getActiveTab();

  const renderModule = () => {
    switch (activeTab) {
      case 'catalog':
        return <BookCatalogModule />;
      case 'inventory':
        return <BookInventoryModule />;
      case 'circulation':
      case 'issue':
        return <IssueBooksModule />;
      case 'returns':
        return <ReturnBooksModule />;
      case 'reservations':
        return <ReservationsModule />;
      case 'members':
        return <MembersModule />;
      case 'authors':
        return <AuthorsPublishersModule />;
      case 'categories':
        return <CategoriesModule />;
      case 'digital':
        return <DigitalLibraryModule />;
      case 'fines':
        return <FineManagementModule />;
      case 'acquisitions':
        return <AcquisitionsModule />;
      case 'lost-damaged':
        return <LostDamagedModule />;
      case 'reading-programs':
        return <ReadingProgramsModule />;
      case 'reports':
        return <ReportsAnalyticsModule />;
      case 'settings':
        return <LibrarySettingsModule />;
      case 'dashboard':
      default:
        return <LibraryDashboardModule />;
    }
  };

  const getHeaderTitle = () => {
    switch (activeTab) {
      case 'catalog': return 'Book Catalog & Search';
      case 'inventory': return 'Library Inventory & Stock';
      case 'circulation':
      case 'issue': return 'Circulation & Issue Desk';
      case 'returns': return 'Return Desk & Condition Inspection';
      case 'reservations': return 'Book Reservation Queue';
      case 'members': return 'Library Members Directory';
      case 'authors': return 'Authors & Publishers Directory';
      case 'categories': return 'Book Categories Classification';
      case 'digital': return 'Digital Library & eBooks';
      case 'fines': return 'Fines & Receipts Management';
      case 'acquisitions': return 'Book Acquisitions & Procurement';
      case 'lost-damaged': return 'Lost & Damaged Books Desk';
      case 'reading-programs': return 'Student Reading Challenges';
      case 'reports': return 'Library Reports & Analytics';
      case 'settings': return 'Library Settings & Policy Rules';
      default: return 'Library Command Center';
    }
  };

  return (
    <LibraryProvider>
      <PageLayout>
        <PageHeader
          title={getHeaderTitle()}
          subtitle="Manage complete lifecycle of physical and digital assets, members, circulation, fines, and reading programs."
          breadcrumb={[
            { label: 'Workspace', path: '/' },
            { label: 'Library Workspace', path: '/library/catalog' },
            { label: getHeaderTitle(), path: location.pathname }
          ]}
        />
        
        <div style={{ marginTop: '16px' }}>
          {renderModule()}
        </div>
      </PageLayout>
    </LibraryProvider>
  );
}

