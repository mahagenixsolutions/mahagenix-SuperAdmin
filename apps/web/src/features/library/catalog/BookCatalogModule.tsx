import React, { useState } from 'react';
import {
  Search, Grid, List, BookOpen, MapPin, Plus, CheckCircle2, AlertTriangle, Layers
} from 'lucide-react';
import { DataGrid } from '../../../components/erp/DataGrid';
import type { GridColumn } from '../../../components/erp/DataGrid';
import { StatusBadge } from '../../../components/erp/StatusBadge';
import { DetailDrawer } from '../../../components/erp/DetailDrawer';
import { useLibraryStore } from '../shared/libraryStore';
import type { Book } from '../shared/types';

export default function BookCatalogModule() {
  const { books, addBook, issueBook, reserveBook, showToast } = useLibraryStore();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedAvailability, setSelectedAvailability] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  // Add Book Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setIsbn] = useState('');
  const [category, setCategory] = useState('Science');
  const [publisher, setPublisher] = useState('Pearson Education');
  const [shelfLocation, setShelfLocation] = useState('Shelf S-04');
  const [totalCopies, setTotalCopies] = useState(3);
  const [description, setDescription] = useState('');

  const filteredBooks = books.filter((b) => {
    const matchSearch =
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.isbn.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase());
    const matchCategory = !selectedCategory || b.category === selectedCategory;
    const matchLanguage = !selectedLanguage || b.language === selectedLanguage;
    const matchAvailability =
      !selectedAvailability ||
      (selectedAvailability === 'Available' ? b.availableCopies > 0 : b.availableCopies === 0);
    return matchSearch && matchCategory && matchLanguage && matchAvailability;
  });

  const columns: GridColumn<Book>[] = [
    { key: 'isbn', title: 'ISBN', render: (b) => <span style={{ fontFamily: 'monospace', fontWeight: 600 }}>{b.isbn}</span> },
    { key: 'title', title: 'Book Title', render: (b) => <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{b.title}</span> },
    { key: 'author', title: 'Author', render: (b) => b.author },
    { key: 'category', title: 'Category', render: (b) => <StatusBadge status="info" label={b.category} /> },
    { key: 'publisher', title: 'Publisher', render: (b) => b.publisher },
    {
      key: 'availableCopies',
      title: 'Availability',
      render: (b) => (
        <span style={{ fontWeight: 700, color: b.availableCopies > 0 ? '#10B981' : '#EF4444' }}>
          {b.availableCopies} / {b.totalCopies} Copies
        </span>
      ),
    },
    { key: 'shelfLocation', title: 'Shelf Location', render: (b) => <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{b.shelfLocation}</span> },
    {
      key: 'id',
      title: 'Action',
      render: (b) => (
        <button
          onClick={() => setSelectedBook(b)}
          style={{ border: '1px solid var(--border-subtle)', background: 'var(--bg-surface-raised)', borderRadius: '6px', padding: '4px 8px', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}
        >
          View Details
        </button>
      ),
    },
  ];

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !author) {
      showToast('Title and Author are required.');
      return;
    }
    addBook({
      title,
      author,
      isbn: isbn || '978-0123456789',
      category,
      publisher,
      shelfLocation,
      totalCopies: Number(totalCopies) || 1,
      description,
    });
    setShowAddModal(false);
    setTitle('');
    setAuthor('');
    setIsbn('');
    setDescription('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', fontFamily: '"Outfit", sans-serif' }}>
      
      {/* Search & Advanced Filters Bar */}
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: '280px', background: 'var(--bg-surface-raised)', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '8px 12px' }}>
            <Search size={16} style={{ color: 'var(--text-secondary)' }} />
            <input
              type="text"
              placeholder="Search by Book Title, Author, ISBN..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '13px', color: 'var(--text-primary)' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={selectStyle}
            >
              <option value="">All Categories</option>
              <option value="Science">Science</option>
              <option value="Mathematics">Mathematics</option>
              <option value="History">History</option>
              <option value="Technology">Technology</option>
              <option value="Literature">Literature</option>
            </select>

            <select
              value={selectedAvailability}
              onChange={(e) => setSelectedAvailability(e.target.value)}
              style={selectStyle}
            >
              <option value="">All Availability</option>
              <option value="Available">Available Only</option>
              <option value="Out">Checked Out</option>
            </select>

            <div style={{ display: 'flex', border: '1px solid var(--border-subtle)', borderRadius: '8px', overflow: 'hidden' }}>
              <button
                onClick={() => setViewMode('grid')}
                style={{ padding: '8px 12px', border: 'none', background: viewMode === 'grid' ? '#4F46E5' : 'var(--bg-surface-raised)', color: viewMode === 'grid' ? '#FFF' : 'var(--text-primary)', cursor: 'pointer' }}
              >
                <Grid size={16} />
              </button>
              <button
                onClick={() => setViewMode('table')}
                style={{ padding: '8px 12px', border: 'none', background: viewMode === 'table' ? '#4F46E5' : 'var(--bg-surface-raised)', color: viewMode === 'table' ? '#FFF' : 'var(--text-primary)', cursor: 'pointer' }}
              >
                <List size={16} />
              </button>
            </div>

            <button
              onClick={() => setShowAddModal(true)}
              style={{ padding: '8px 14px', borderRadius: '8px', border: 'none', background: '#4F46E5', color: '#FFF', fontWeight: 700, fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <Plus size={16} /> Add Book
            </button>
          </div>
        </div>
      </div>

      {/* Grid or Table Display */}
      {viewMode === 'grid' ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              onClick={() => setSelectedBook(book)}
              style={{
                background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '12px',
                padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '12px',
                cursor: 'pointer', transition: 'all 0.15s ease', boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <span style={{ fontSize: '10px', fontWeight: 800, padding: '2px 8px', borderRadius: '4px', background: 'rgba(79,70,229,0.1)', color: '#4F46E5' }}>
                    {book.category}
                  </span>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: book.availableCopies > 0 ? '#10B981' : '#EF4444' }}>
                    {book.availableCopies > 0 ? `${book.availableCopies} Available` : 'Checked Out'}
                  </span>
                </div>
                <h4 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)', margin: '4px 0 2px 0', lineHeight: 1.3 }}>
                  {book.title}
                </h4>
                <span style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'block', fontWeight: 600 }}>
                  By {book.author}
                </span>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block', marginTop: '4px' }}>
                  Publisher: {book.publisher} ({book.publicationYear})
                </span>
              </div>

              <div style={{ borderTop: '1px dashed var(--border-subtle)', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', color: 'var(--text-secondary)' }}>
                <span><MapPin size={12} style={{ display: 'inline', marginRight: '4px' }} /> {book.shelfLocation}</span>
                <span style={{ fontFamily: 'monospace' }}>{book.isbn}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <DataGrid columns={columns} data={filteredBooks} />
      )}

      {/* Book Details Drawer */}
      <DetailDrawer
        isOpen={!!selectedBook}
        onClose={() => setSelectedBook(null)}
        title={selectedBook ? selectedBook.title : 'Book Details'}
      >
        {selectedBook && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontFamily: '"Outfit", sans-serif' }}>
            <div style={{ background: 'var(--bg-surface-raised)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#4F46E5', textTransform: 'uppercase' }}>{selectedBook.category} • {selectedBook.language}</span>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', margin: '4px 0' }}>{selectedBook.title}</h3>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0 }}>By {selectedBook.author}</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '12px' }}>
              <div style={{ padding: '10px', borderRadius: '8px', background: 'var(--bg-surface-raised)', border: '1px solid var(--border-subtle)' }}>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '11px' }}>ISBN</span>
                <strong style={{ fontFamily: 'monospace', color: 'var(--text-primary)' }}>{selectedBook.isbn}</strong>
              </div>
              <div style={{ padding: '10px', borderRadius: '8px', background: 'var(--bg-surface-raised)', border: '1px solid var(--border-subtle)' }}>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '11px' }}>Available Copies</span>
                <strong style={{ color: selectedBook.availableCopies > 0 ? '#10B981' : '#EF4444' }}>{selectedBook.availableCopies} / {selectedBook.totalCopies}</strong>
              </div>
              <div style={{ padding: '10px', borderRadius: '8px', background: 'var(--bg-surface-raised)', border: '1px solid var(--border-subtle)' }}>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '11px' }}>Publisher</span>
                <strong style={{ color: 'var(--text-primary)' }}>{selectedBook.publisher}</strong>
              </div>
              <div style={{ padding: '10px', borderRadius: '8px', background: 'var(--bg-surface-raised)', border: '1px solid var(--border-subtle)' }}>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '11px' }}>Shelf Location</span>
                <strong style={{ color: 'var(--text-primary)' }}>{selectedBook.shelfLocation}</strong>
              </div>
            </div>

            <div style={{ padding: '12px', borderRadius: '8px', background: 'var(--bg-surface-raised)', border: '1px solid var(--border-subtle)' }}>
              <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-primary)', display: 'block', marginBottom: '4px' }}>Description</span>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>{selectedBook.description}</p>
            </div>
          </div>
        )}
      </DetailDrawer>

      {/* Add Book Modal */}
      {showAddModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex',
          alignItems: 'center', justifyContent: 'center', padding: '16px'
        }}>
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '24px', width: '100%', maxWidth: '500px' }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)' }}>Add New Book to Catalog</h3>
            <form onSubmit={handleAddSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={labelStyle}>Title</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} style={inputStyle} required />
              </div>
              <div>
                <label style={labelStyle}>Author</label>
                <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} style={inputStyle} required />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={labelStyle}>ISBN</label>
                  <input type="text" value={isbn} onChange={(e) => setIsbn(e.target.value)} style={inputStyle} placeholder="978-..." />
                </div>
                <div>
                  <label style={labelStyle}>Total Copies</label>
                  <input type="number" value={totalCopies} onChange={(e) => setTotalCopies(Number(e.target.value))} style={inputStyle} min={1} required />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={labelStyle}>Category</label>
                  <select value={category} onChange={(e) => setCategory(e.target.value)} style={inputStyle}>
                    <option value="Science">Science</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="History">History</option>
                    <option value="Technology">Technology</option>
                    <option value="Literature">Literature</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Shelf Rack</label>
                  <input type="text" value={shelfLocation} onChange={(e) => setShelfLocation(e.target.value)} style={inputStyle} />
                </div>
              </div>
              <div>
                <label style={labelStyle}>Description</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} style={{ ...inputStyle, height: '70px', resize: 'none' }} />
              </div>
              <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                <button type="button" onClick={() => setShowAddModal(false)} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface-raised)', color: 'var(--text-primary)', fontWeight: 700, cursor: 'pointer' }}>
                  Cancel
                </button>
                <button type="submit" style={{ flex: 1, padding: '10px', borderRadius: '8px', border: 'none', background: '#4F46E5', color: '#FFF', fontWeight: 700, cursor: 'pointer' }}>
                  Save & Generate Copies
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const selectStyle: React.CSSProperties = {
  border: '1px solid var(--border-subtle)',
  background: 'var(--bg-surface-raised)',
  borderRadius: '8px',
  padding: '8px 12px',
  fontSize: '12px',
  color: 'var(--text-primary)',
  outline: 'none',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '12px',
  fontWeight: 700,
  color: 'var(--text-primary)',
  marginBottom: '4px',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '9px 12px',
  borderRadius: '8px',
  border: '1px solid var(--border-subtle)',
  background: 'var(--bg-surface-raised)',
  color: 'var(--text-primary)',
  fontSize: '13px',
  boxSizing: 'border-box',
};
