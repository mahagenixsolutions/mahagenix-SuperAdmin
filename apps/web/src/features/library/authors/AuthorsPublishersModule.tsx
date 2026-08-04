import React, { useState, useEffect } from 'react';
import { useLibraryStore } from '../shared/libraryStore';
import { User, Building, BookOpen, Globe, Mail, Phone, Plus } from 'lucide-react';

export default function AuthorsPublishersModule() {
  const { authors, publishers, categories } = useLibraryStore();
  const [tab, setTab] = useState<'authors' | 'publishers' | 'categories'>('authors');
  const [showAddAuthor, setShowAddAuthor] = useState(false);
  const [showAddPublisher, setShowAddPublisher] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 767.98);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', fontFamily: '"Outfit", sans-serif' }}>
      {/* Header Container (Responsive Tabs & Add Button) */}
      <div style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'space-between',
        alignItems: isMobile ? 'stretch' : 'center',
        borderBottom: '1px solid var(--border-subtle)',
        paddingBottom: '12px',
        gap: '12px',
      }}>
        {/* Scrollable Horizontal Pill Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          background: 'var(--bg-surface-raised, #F1F5F9)',
          border: '1px solid var(--border-subtle, rgba(226, 232, 240, 0.8))',
          borderRadius: '9999px',
          padding: '4px 6px',
          gap: '4px',
          overflowX: 'auto',
          maxWidth: '100%',
          WebkitOverflowScrolling: 'touch',
        }}>
          <button
            onClick={() => setTab('authors')}
            style={{
              padding: '8px 18px',
              borderRadius: '9999px',
              border: 'none',
              background: tab === 'authors' ? '#ffffff' : 'transparent',
              color: tab === 'authors' ? '#0284C7' : '#475569',
              fontWeight: tab === 'authors' ? 700 : 600,
              fontSize: '13px',
              cursor: 'pointer',
              boxShadow: tab === 'authors' ? '0 2px 8px rgba(2, 132, 199, 0.12), 0 1px 3px rgba(0, 0, 0, 0.06)' : 'none',
              transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            Authors Directory ({authors.length})
          </button>
          <button
            onClick={() => setTab('publishers')}
            style={{
              padding: '8px 18px',
              borderRadius: '9999px',
              border: 'none',
              background: tab === 'publishers' ? '#ffffff' : 'transparent',
              color: tab === 'publishers' ? '#0284C7' : '#475569',
              fontWeight: tab === 'publishers' ? 700 : 600,
              fontSize: '13px',
              cursor: 'pointer',
              boxShadow: tab === 'publishers' ? '0 2px 8px rgba(2, 132, 199, 0.12), 0 1px 3px rgba(0, 0, 0, 0.06)' : 'none',
              transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            Publishers Directory ({publishers.length})
          </button>
          <button
            onClick={() => setTab('categories')}
            style={{
              padding: '8px 18px',
              borderRadius: '9999px',
              border: 'none',
              background: tab === 'categories' ? '#ffffff' : 'transparent',
              color: tab === 'categories' ? '#0284C7' : '#475569',
              fontWeight: tab === 'categories' ? 700 : 600,
              fontSize: '13px',
              cursor: 'pointer',
              boxShadow: tab === 'categories' ? '0 2px 8px rgba(2, 132, 199, 0.12), 0 1px 3px rgba(0, 0, 0, 0.06)' : 'none',
              transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            Categories Classification ({categories.length})
          </button>
        </div>

        {tab === 'authors' ? (
          <button
            onClick={() => setShowAddAuthor(true)}
            style={{
              ...addBtnStyle,
              width: isMobile ? '100%' : 'auto',
              justifyContent: 'center',
            }}
          >
            <Plus size={16} /> Add Author
          </button>
        ) : tab === 'publishers' ? (
          <button
            onClick={() => setShowAddPublisher(true)}
            style={{
              ...addBtnStyle,
              width: isMobile ? '100%' : 'auto',
              justifyContent: 'center',
            }}
          >
            <Plus size={16} /> Add Publisher Vendor
          </button>
        ) : null}
      </div>

      {tab === 'authors' ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '14px' }}>
          {authors.map((auth) => (
            <div key={auth.id} style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>{auth.name}</h4>
                <span style={{ fontSize: '10px', fontWeight: 800, padding: '2px 8px', borderRadius: '4px', background: 'var(--bg-surface-raised)', color: 'var(--text-secondary)' }}>{auth.nationality}</span>
              </div>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.4 }}>{auth.biography}</p>
              <div style={{ borderTop: '1px dashed var(--border-subtle)', paddingTop: '8px', fontSize: '11px', color: 'var(--text-secondary)' }}>
                <strong>{auth.booksCount} Titles in Catalog:</strong> {auth.famousWorks.join(', ')}
              </div>
            </div>
          ))}
        </div>
      ) : tab === 'publishers' ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '14px' }}>
          {publishers.map((pub) => (
            <div key={pub.id} style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <h4 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>{pub.name}</h4>
              <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Contact: {pub.contactPerson}</span>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span><Mail size={12} style={{ display: 'inline', marginRight: '4px' }} /> {pub.email}</span>
                <span><Phone size={12} style={{ display: 'inline', marginRight: '4px' }} /> {pub.phone}</span>
                <span><Globe size={12} style={{ display: 'inline', marginRight: '4px' }} /> {pub.website}</span>
              </div>
              <div style={{ borderTop: '1px dashed var(--border-subtle)', paddingTop: '8px', fontSize: '11px', fontWeight: 700, color: '#4F46E5' }}>
                {pub.publishedCount} Titles Supplied
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '14px' }}>
          {categories.map((cat) => (
            <div key={cat.id} style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>{cat.name}</h4>
                <span style={{ fontSize: '10px', fontWeight: 800, padding: '2px 8px', borderRadius: '4px', background: '#EEF2FF', color: '#4F46E5', fontFamily: 'monospace' }}>{cat.code}</span>
              </div>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0 }}>{cat.description}</p>
              <div style={{ borderTop: '1px dashed var(--border-subtle)', paddingTop: '8px', fontSize: '11px', fontWeight: 700, color: '#10B981' }}>
                {cat.bookCount} Total Volumes Stocked
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const addBtnStyle: React.CSSProperties = {
  padding: '8px 14px',
  borderRadius: '8px',
  border: 'none',
  background: '#4F46E5',
  color: '#FFF',
  fontSize: '12px',
  fontWeight: 700,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  whiteSpace: 'nowrap',
};
