import React from 'react';

export interface Column<T> {
  key: string;
  header: string;
  render?: (row: T) => React.ReactNode;
  isDetailsColumn?: boolean;
  align?: 'left' | 'center' | 'right';
  width?: string;
}

export interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (row: T, index: number) => string;
  title?: string;
  headerAction?: React.ReactNode;
  pagination?: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  };
  emptyText?: string;
}

export function DataTable<T>({
  columns,
  data,
  keyExtractor,
  title,
  headerAction,
  pagination,
  emptyText = 'No records available.',
}: DataTableProps<T>) {
  return (
    <div className="academic-card" style={{ padding: 0, overflow: 'hidden', width: '100%', boxSizing: 'border-box' }}>
      {(title || headerAction) && (
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid #e2e8f0',
            display: 'flex',
            justify: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px'
          }}
        >
          {title && (
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
              {title}
            </h3>
          )}
          {headerAction && <div>{headerAction}</div>}
        </div>
      )}

      <div className="academic-table-wrapper" style={{ border: 'none', borderRadius: 0 }}>
        <table>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={col.isDetailsColumn ? 'academic-col-details' : undefined}
                  style={{
                    padding: '14px 20px',
                    fontSize: '12px',
                    fontWeight: 700,
                    color: '#64748b',
                    textAlign: col.align || 'left',
                    width: col.width
                  }}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} style={{ padding: '32px', textAlign: 'center', color: '#64748b', fontSize: '13px' }}>
                  {emptyText}
                </td>
              </tr>
            ) : (
              data.map((row, i) => (
                <tr key={keyExtractor(row, i)} style={{ borderBottom: i === data.length - 1 ? 'none' : '1px solid #f1f5f9' }}>
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={col.isDetailsColumn ? 'academic-col-details' : undefined}
                      style={{
                        padding: '16px 20px',
                        fontSize: '13px',
                        color: '#334155',
                        textAlign: col.align || 'left'
                      }}
                    >
                      {col.render ? col.render(row) : (row as any)[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {pagination && (
        <div
          style={{
            padding: '14px 24px',
            borderTop: '1px solid #e2e8f0',
            display: 'flex',
            justify: 'space-between',
            alignItems: 'center',
            fontSize: '13px',
            color: '#64748b',
            background: '#ffffff'
          }}
        >
          <span>
            Page {pagination.currentPage} of {pagination.totalPages}
          </span>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              disabled={pagination.currentPage <= 1}
              onClick={() => pagination.onPageChange(pagination.currentPage - 1)}
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                background: pagination.currentPage <= 1 ? '#f1f5f9' : '#ffffff',
                cursor: pagination.currentPage <= 1 ? 'not-allowed' : 'pointer',
                fontSize: '12px',
                fontWeight: 600
              }}
            >
              Previous
            </button>
            <button
              disabled={pagination.currentPage >= pagination.totalPages}
              onClick={() => pagination.onPageChange(pagination.currentPage + 1)}
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                background: pagination.currentPage >= pagination.totalPages ? '#f1f5f9' : '#ffffff',
                cursor: pagination.currentPage >= pagination.totalPages ? 'not-allowed' : 'pointer',
                fontSize: '12px',
                fontWeight: 600
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
