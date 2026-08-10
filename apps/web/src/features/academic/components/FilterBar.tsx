import React from 'react';
import { Search, Filter } from 'lucide-react';

export interface FilterOption {
  label: string;
  value: string;
}

export interface FilterGroup {
  id: string;
  label: string;
  options: FilterOption[];
  value: string;
  onChange: (val: string) => void;
}

export interface FilterBarProps {
  searchQuery?: string;
  onSearchChange?: (q: string) => void;
  searchPlaceholder?: string;
  filterGroups?: FilterGroup[];
  customRightAction?: React.ReactNode;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  searchQuery,
  onSearchChange,
  searchPlaceholder = 'Search records, subjects, teachers...',
  filterGroups = [],
  customRightAction,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justify: 'space-between',
        gap: '16px',
        flexWrap: 'wrap',
        padding: '16px 20px',
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '16px',
        boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
        width: '100%',
        boxSizing: 'border-box'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: '1 1 300px', flexWrap: 'wrap' }}>
        {onSearchChange && (
          <div style={{ position: 'relative', flex: '1 1 240px', minWidth: '200px' }}>
            <Search size={16} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              value={searchQuery || ''}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={searchPlaceholder}
              style={{
                width: '100%',
                padding: '9px 12px 9px 36px',
                borderRadius: '10px',
                border: '1px solid #cbd5e1',
                fontSize: '13px',
                outline: 'none',
                boxSizing: 'border-box',
                background: '#f8fafc',
                color: '#0f172a'
              }}
            />
          </div>
        )}

        {filterGroups.map((group) => (
          <div key={group.id} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <select
              value={group.value}
              onChange={(e) => group.onChange(e.target.value)}
              style={{
                padding: '9px 12px',
                borderRadius: '10px',
                border: '1px solid #cbd5e1',
                fontSize: '13px',
                fontWeight: 600,
                color: '#334155',
                background: '#ffffff',
                cursor: 'pointer',
                outline: 'none'
              }}
            >
              {group.options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      {customRightAction && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {customRightAction}
        </div>
      )}
    </div>
  );
};
