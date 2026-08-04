import React, { useState } from 'react';
import { DataGrid } from '../../../components/erp/DataGrid';
import type { GridColumn } from '../../../components/erp/DataGrid';
import { StatusBadge } from '../../../components/erp/StatusBadge';
import { useLibraryStore } from '../shared/libraryStore';
import type { DigitalAsset } from '../shared/types';
import { Download, FileText, Headphones, Video, BookOpen, Layers, Plus } from 'lucide-react';

export default function DigitalLibraryModule() {
  const { digitalAssets, addDigitalAsset, showToast } = useLibraryStore();
  const [filterType, setFilterType] = useState('All');
  const [showModal, setShowModal] = useState(false);

  // Modal Form State
  const [title, setTitle] = useState('');
  const [type, setType] = useState<'eBook' | 'PDF Notes' | 'Research Paper' | 'Journal' | 'Audiobook'>('PDF Notes');
  const [author, setAuthor] = useState('');
  const [fileSize, setFileSize] = useState('5.2 MB');
  const [accessLevel, setAccessLevel] = useState<'All' | 'Teachers Only' | 'Senior Students'>('All');

  const filteredAssets = digitalAssets.filter((a) => filterType === 'All' || a.type === filterType);

  const handleDownload = (assetTitle: string) => {
    showToast(`Downloading "${assetTitle}"...`);
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !author) return;
    addDigitalAsset({
      title,
      type,
      author,
      fileSize,
      accessLevel,
    });
    setShowModal(false);
    setTitle('');
    setAuthor('');
  };

  const columns: GridColumn<DigitalAsset>[] = [
    { key: 'title', title: 'Asset Title', render: (a) => <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{a.title}</span> },
    { key: 'type', title: 'Asset Type', render: (a) => <StatusBadge status="info" label={a.type} /> },
    { key: 'author', title: 'Author / Contributor', render: (a) => a.author },
    { key: 'fileSize', title: 'File Size', render: (a) => a.fileSize },
    { key: 'downloads', title: 'Total Downloads', render: (a) => <span style={{ fontWeight: 800, color: '#10B981' }}>{a.downloads}</span> },
    { key: 'accessLevel', title: 'Access Level', render: (a) => <StatusBadge status={a.accessLevel === 'All' ? 'success' : 'warning'} label={a.accessLevel} /> },
    {
      key: 'id',
      title: 'Download',
      render: (a) => (
        <button
          onClick={() => handleDownload(a.title)}
          style={{ border: 'none', background: '#4F46E5', color: '#FFF', padding: '5px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
        >
          <Download size={12} /> Download
        </button>
      ),
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', fontFamily: '"Outfit", sans-serif' }}>
      
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>Digital Knowledge Repository & eBooks</h3>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>PDF Lecture Notes, eBooks, Audiobooks, Educational Videos, and Research Papers.</p>
        </div>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)} style={selectStyle}>
            <option value="All">All Resource Types</option>
            <option value="PDF Notes">PDF Notes</option>
            <option value="eBook">eBooks</option>
            <option value="Research Paper">Research Papers</option>
            <option value="Audiobook">Audiobooks</option>
          </select>

          <button
            onClick={() => setShowModal(true)}
            style={{ padding: '8px 14px', borderRadius: '8px', border: 'none', background: '#4F46E5', color: '#FFF', fontSize: '12px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Plus size={16} /> Upload Digital Resource
          </button>
        </div>
      </div>

      <DataGrid columns={columns} data={filteredAssets} />

      {/* Upload Modal */}
      {showModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex',
          alignItems: 'center', justifyContent: 'center', padding: '16px'
        }}>
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '24px', width: '100%', maxWidth: '440px' }}>
            <h3 style={{ margin: '0 0 14px 0', fontSize: '17px', fontWeight: 800, color: 'var(--text-primary)' }}>Upload Digital Resource</h3>
            <form onSubmit={handleUploadSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={labelStyle}>Resource Title</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} style={inputStyle} placeholder="e.g. CBSE Grade 12 Math Practice PDF" required />
              </div>
              <div>
                <label style={labelStyle}>Author / Department</label>
                <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} style={inputStyle} placeholder="e.g. Mathematics Cell" required />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={labelStyle}>Asset Type</label>
                  <select value={type} onChange={(e) => setType(e.target.value as any)} style={inputStyle}>
                    <option value="PDF Notes">PDF Notes</option>
                    <option value="eBook">eBook</option>
                    <option value="Research Paper">Research Paper</option>
                    <option value="Audiobook">Audiobook</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Access Policy</label>
                  <select value={accessLevel} onChange={(e) => setAccessLevel(e.target.value as any)} style={inputStyle}>
                    <option value="All">All Members</option>
                    <option value="Teachers Only">Teachers Only</option>
                    <option value="Senior Students">Senior Secondary</option>
                  </select>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                <button type="button" onClick={() => setShowModal(false)} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface-raised)', color: 'var(--text-primary)', fontWeight: 700, cursor: 'pointer' }}>
                  Cancel
                </button>
                <button type="submit" style={{ flex: 1, padding: '10px', borderRadius: '8px', border: 'none', background: '#4F46E5', color: '#FFF', fontWeight: 700, cursor: 'pointer' }}>
                  Upload Resource
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
  fontSize: '11px',
  fontWeight: 800,
  color: 'var(--text-secondary)',
  textTransform: 'uppercase',
  marginBottom: '6px',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '9px 12px',
  borderRadius: '8px',
  border: '1px solid var(--border-subtle)',
  background: 'var(--bg-surface-raised)',
  color: 'var(--text-primary)',
  outline: 'none',
  fontSize: '13px',
};
