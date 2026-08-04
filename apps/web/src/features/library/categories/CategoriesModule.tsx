import React from 'react';
import { mockCategories } from '../shared/mockLibraryData';
import { BookOpen, Layers, Plus } from 'lucide-react';

export default function CategoriesModule() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', fontFamily: '"Outfit", sans-serif' }}>
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>Book Categories & Classification System</h3>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>Dewey Decimal and custom curriculum categories for book organization.</p>
        </div>
        <button style={{ padding: '8px 14px', borderRadius: '8px', border: 'none', background: '#4F46E5', color: '#FFF', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}>
          + Add Category
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '14px' }}>
        {mockCategories.map(cat => (
          <div key={cat.id} style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, padding: '2px 8px', borderRadius: '4px', background: 'rgba(79,70,229,0.1)', color: '#4F46E5' }}>{cat.code}</span>
              <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-primary)' }}>{cat.bookCount} Books</span>
            </div>
            <h4 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>{cat.name}</h4>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.4 }}>{cat.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
