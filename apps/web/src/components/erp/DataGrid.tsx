import React, { useState, useEffect, useMemo } from 'react';
import { MoreVertical, X } from 'lucide-react';

export interface GridColumn<T> {
  key: keyof T | string;
  header?: string;
  title?: string; // alias for header, used in transport modules
  render?: (row: T) => React.ReactNode;
  sortable?: boolean;
  mobilePriority?: 'high' | 'low';
}

interface DataGridProps<T> {
  columns: GridColumn<T>[];
  data: T[];
  keyField?: keyof T;
  isLoading?: boolean;
  selectedIds?: string[];
  onSelectionChange?: (selectedIds: string[]) => void;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  onSort?: (key: string, order: 'asc' | 'desc') => void;
  emptyState?: React.ReactNode;
  actions?: (row: T) => React.ReactNode;
  // Pagination
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  totalRecords?: number;
}

export function DataGrid<T>({
  columns,
  data,
  keyField,
  isLoading = false,
  selectedIds = [],
  onSelectionChange,
  sortBy,
  sortOrder,
  onSort,
  emptyState,
  actions,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  totalRecords = 0,
}: DataGridProps<T>) {
  const [localPage, setLocalPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedRowDetails, setSelectedRowDetails] = useState<T | null>(null);

  const getRowKey = (row: T, idx: number): string => {
    if (keyField && row[keyField] !== undefined && row[keyField] !== null) {
      return String(row[keyField]);
    }
    const r = row as any;
    if (r.id !== undefined && r.id !== null) return String(r.id);
    if (r.empId !== undefined && r.empId !== null) return String(r.empId);
    if (r.receipt !== undefined && r.receipt !== null) return String(r.receipt);
    if (r.period !== undefined && r.period !== null) return String(r.period);
    return `row-${idx}`;
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 767.98);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isAllSelected = data.length > 0 && selectedIds.length === data.length;

  const handleSelectAll = () => {
    if (!onSelectionChange) return;
    if (isAllSelected) {
      onSelectionChange([]);
    } else {
      onSelectionChange(data.map((row) => String(row[keyField])));
    }
  };

  const handleSelectRow = (id: string) => {
    if (!onSelectionChange) return;
    if (selectedIds.includes(id)) {
      onSelectionChange(selectedIds.filter((item) => item !== id));
    } else {
      onSelectionChange([...selectedIds, id]);
    }
  };

  const handleSortClick = (key: string) => {
    if (!onSort) return;
    const newOrder = sortBy === key && sortOrder === 'asc' ? 'desc' : 'asc';
    onSort(key, newOrder);
  };

  // Pagination Configuration
  const isPageControlled = typeof onPageChange === 'function';
  const displayPageSize = 10;

  const activePage = isPageControlled ? currentPage : localPage;
  const activeTotalPages = isPageControlled ? totalPages : Math.ceil(data.length / displayPageSize);
  const activeTotalRecords = isPageControlled ? totalRecords : data.length;

  const displayData = useMemo(() => {
    if (isPageControlled) {
      return data;
    }
    if (data.length <= displayPageSize) {
      return data;
    }
    const start = (localPage - 1) * displayPageSize;
    return data.slice(start, start + displayPageSize);
  }, [data, isPageControlled, localPage]);

  // Reset local page when dataset length changes (e.g. search/filter queries)
  useEffect(() => {
    if (!isPageControlled) {
      setLocalPage(1);
    }
  }, [data.length, isPageControlled]);

  if (isLoading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', background: 'var(--bg-surface)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)' }}>
        <div style={{ display: 'inline-block', width: '32px', height: '32px', border: '3px solid var(--border-subtle)', borderTopColor: 'var(--color-primary)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        <p style={{ marginTop: '12px', color: 'var(--text-secondary)' }}>Loading records...</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div style={{ background: 'var(--bg-surface)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)' }}>
        {emptyState || (
          <div style={{ padding: '60px 24px', textAlign: 'center' }}>
            <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '15px' }}>No records found</p>
          </div>
        )}
      </div>
    );
  }

  if (isMobile) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Mobile Selection Header (Optional) */}
        {onSelectionChange && data.length > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '0 4px' }}>
            <input type="checkbox" checked={isAllSelected} onChange={handleSelectAll} style={{ width: '18px', height: '18px' }} />
            <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-secondary)' }}>Select All</span>
          </div>
        )}
        
        {displayData.map((row, idx) => {
          const id = getRowKey(row, idx);
          const isSelected = selectedIds.includes(id);
          
          const highPriorityCols = columns.filter(c => c.mobilePriority === 'high');
          const colsToShow = (highPriorityCols.length > 0 ? highPriorityCols : columns).slice(0, 2);
          
          return (
            <div key={id} className="mobile-table-card" style={{
              background: isSelected ? 'rgba(79, 142, 247, 0.04)' : 'var(--bg-surface)', 
              border: isSelected ? '1px solid var(--color-primary)' : '1px solid var(--border-subtle)', 
              borderRadius: 'var(--radius-lg)', 
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              boxShadow: 'var(--shadow-sm)',
              position: 'relative'
            }}>
              {onSelectionChange && (
                <div style={{ position: 'absolute', top: '16px', left: '16px' }}>
                  <input type="checkbox" checked={isSelected} onChange={() => handleSelectRow(id)} style={{ width: '18px', height: '18px' }} />
                </div>
              )}
              
              <div style={{ paddingLeft: onSelectionChange ? '32px' : '0', paddingRight: '24px' }}>
                {colsToShow.map(col => (
                  <div key={String(col.key)} style={{ marginBottom: '8px' }}>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '2px', textTransform: 'uppercase', fontWeight: 600 }}>{col.header ?? col.title}</div>
                    <div style={{ fontSize: '14px', color: 'var(--text-primary)' }}>
                      {col.render ? col.render(row) : (row[col.key as keyof T] as any)}
                    </div>
                  </div>
                ))}
              </div>
              
              <button 
                onClick={() => setSelectedRowDetails(row)}
                style={{ position: 'absolute', top: '12px', right: '12px', background: 'var(--bg-secondary)', border: 'none', borderRadius: '50%', color: 'var(--text-secondary)', cursor: 'pointer', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <MoreVertical size={16} />
              </button>
            </div>
          );
        })}
        
        {/* Modal for Details */}
        {selectedRowDetails && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'flex-end', background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)' }} onClick={() => setSelectedRowDetails(null)}>
             <div 
               style={{ width: '100%', background: 'var(--bg-surface)', borderTopLeftRadius: '24px', borderTopRightRadius: '24px', padding: '24px', maxHeight: '85vh', overflowY: 'auto', animation: 'slideUpToast 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}
               onClick={(e) => e.stopPropagation()}
             >
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                 <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)' }}>Details</h3>
                 <button onClick={() => setSelectedRowDetails(null)} style={{ background: 'var(--bg-secondary)', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-secondary)' }}>
                   <X size={16} />
                 </button>
               </div>
               
               <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                 {columns.map(col => (
                   <div key={String(col.key)} style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px' }}>
                     <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px', fontWeight: 600 }}>{col.header ?? col.title}</div>
                     <div style={{ fontSize: '14px', color: 'var(--text-primary)' }}>
                       {col.render ? col.render(selectedRowDetails) : (selectedRowDetails[col.key as keyof T] as any)}
                     </div>
                   </div>
                 ))}
               </div>
               
               {actions && (
                 <div style={{ marginTop: '24px', display: 'flex', gap: '12px', flexDirection: 'column', borderTop: '1px solid var(--border-subtle)', paddingTop: '20px' }}>
                   {actions(selectedRowDetails)}
                 </div>
               )}
             </div>
          </div>
        )}

        {activeTotalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 4px', marginTop: '8px' }}>
            <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              Showing {displayData.length} of {activeTotalRecords} records
            </span>
            <div style={{ display: 'flex', gap: '6px' }}>
              <button
                className="btn btn-secondary"
                style={{ padding: '6px 12px', fontSize: '13px' }}
                disabled={activePage === 1}
                onClick={() => isPageControlled ? onPageChange(activePage - 1) : setLocalPage(activePage - 1)}
              >
                Prev
              </button>
              <button
                className="btn btn-secondary"
                style={{ padding: '6px 12px', fontSize: '13px' }}
                disabled={activePage === activeTotalPages}
                onClick={() => isPageControlled ? onPageChange(activePage + 1) : setLocalPage(activePage + 1)}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ background: 'var(--bg-surface)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table className="table" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'var(--bg-surface-raised)', borderBottom: '1px solid var(--border-subtle)' }}>
                {onSelectionChange && (
                  <th style={{ width: '48px', padding: '12px 16px' }}>
                    <input type="checkbox" checked={isAllSelected} onChange={handleSelectAll} />
                  </th>
                )}
                {columns.map((col) => (
                  <th
                    key={String(col.key)}
                    style={{
                      padding: '12px 16px',
                      color: 'var(--text-secondary)',
                      fontWeight: 600,
                      fontSize: '13px',
                      cursor: col.sortable ? 'pointer' : 'default',
                      userSelect: 'none',
                    }}
                    onClick={() => col.sortable && handleSortClick(String(col.key))}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {col.header ?? col.title}
                      {col.sortable && (
                        <span style={{ display: 'inline-flex', flexDirection: 'column', color: sortBy === String(col.key) ? 'var(--color-primary)' : 'var(--text-muted)' }}>
                          <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={sortBy === String(col.key) && sortOrder === 'desc' ? 'M19 9l-7 7-7-7' : 'M5 15l7-7 7 7'} />
                          </svg>
                        </span>
                      )}
                    </div>
                  </th>
                ))}
                {actions && <th style={{ width: '80px', padding: '12px 16px', textAlign: 'right' }}>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {displayData.map((row, idx) => {
                const id = getRowKey(row, idx);
                const isSelected = selectedIds.includes(id);
                return (
                  <tr
                    key={id}
                    style={{
                      borderBottom: '1px solid var(--border-subtle)',
                      background: isSelected ? 'rgba(79, 142, 247, 0.04)' : 'transparent',
                    }}
                  >
                    {onSelectionChange && (
                      <td style={{ padding: '12px 16px' }}>
                        <input type="checkbox" checked={isSelected} onChange={() => handleSelectRow(id)} />
                      </td>
                    )}
                    {columns.map((col) => (
                      <td key={String(col.key)} style={{ padding: '12px 16px', fontSize: '13px', color: 'var(--text-primary)' }}>
                        {col.render ? col.render(row) : (row[col.key as keyof T] as any)}
                      </td>
                    ))}
                    {actions && (
                      <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', gap: '8px', justifyContent: 'flex-end' }}>{actions(row)}</div>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {activeTotalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 4px' }}>
          <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            Showing {displayData.length} of {activeTotalRecords} records
          </span>
          <div style={{ display: 'flex', gap: '6px' }}>
            <button
              className="btn btn-secondary"
              style={{ padding: '6px 12px', fontSize: '13px' }}
              disabled={activePage === 1}
              onClick={() => {
                if (isPageControlled) {
                  onPageChange(activePage - 1);
                } else {
                  setLocalPage(activePage - 1);
                }
              }}
            >
              Previous
            </button>
            <button
              className="btn btn-secondary"
              style={{ padding: '6px 12px', fontSize: '13px' }}
              disabled={activePage === activeTotalPages}
              onClick={() => {
                if (isPageControlled) {
                  onPageChange(activePage + 1);
                } else {
                  setLocalPage(activePage + 1);
                }
              }}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DataGrid;
