import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, FileSpreadsheet, Paperclip } from 'lucide-react';

export const NoticeDocumentLibrary: React.FC = () => {
  const documents = [
    { name: 'CBSE_MidTerm_Timetable_2026.pdf', type: 'PDF', category: 'Examinations', size: '2.4 MB', downloads: 1420 },
    { name: 'Government_Education_Circular_2026.pdf', type: 'PDF', category: 'Government Circulars', size: '3.1 MB', downloads: 860 },
    { name: 'Internal_Assessment_Guidelines.docx', type: 'DOCX', category: 'Assignments', size: '1.8 MB', downloads: 620 },
    { name: 'Faculty_Lesson_Plan_Policy.pdf', type: 'PDF', category: 'Policy Updates', size: '1.2 MB', downloads: 86 }
  ];

  return (
    <div style={{
      background: 'white',
      border: '1px solid #E2E8F0',
      borderRadius: '16px',
      padding: '24px',
      boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.03)'
    }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid #F1F5F9' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            background: '#EAF5F0',
            color: '#3B7E5E',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <FileText size={20} />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>
              Attached Document & Official Circular Library
            </h2>
            <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#64748B' }}>
              Central repository for downloadable CBSE circulars, exam blueprints, and policy PDFs.
            </p>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '12px'
      }}>
        {documents.map((doc) => (
          <div
            key={doc.name}
            style={{
              background: '#F8FAFC',
              border: '1px solid #E2E8F0',
              borderRadius: '10px',
              padding: '14px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '10px'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Paperclip size={16} color="#3B7E5E" />
                <span style={{ fontSize: '12px', fontWeight: 800, color: '#0F172A' }}>{doc.name}</span>
              </div>
              <div style={{ fontSize: '11px', color: '#64748B', marginTop: '4px' }}>
                {doc.category} • {doc.size}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', color: '#3B7E5E', fontWeight: 700 }}>
              <span>{doc.downloads} Downloads</span>
              <button style={{ background: 'white', border: '1px solid #CBD5E1', padding: '4px 8px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Download size={12} /> Download
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
