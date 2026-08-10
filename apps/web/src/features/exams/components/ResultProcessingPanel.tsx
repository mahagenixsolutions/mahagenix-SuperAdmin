import React from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, 
  Send, 
  Sliders, 
  FileSpreadsheet, 
  BarChart, 
  Lock 
} from 'lucide-react';

interface ResultProcessingPanelProps {
  onApproveResults: () => void;
  onPublishResults: () => void;
}

export const ResultProcessingPanel: React.FC<ResultProcessingPanelProps> = ({
  onApproveResults,
  onPublishResults
}) => {
  const classesProgress = [
    { name: 'Grade 10 Section A', total: 45, evaluated: 45, pct: 100, status: 'Ready for Approval', color: '#10B981' },
    { name: 'Grade 11 Section B', total: 42, evaluated: 42, pct: 100, status: 'Ready for Approval', color: '#10B981' },
    { name: 'Grade 12 Section A', total: 40, evaluated: 36, pct: 90, status: 'In Evaluation', color: '#3B82F6' },
    { name: 'Grade 9 Section B', total: 48, evaluated: 29, pct: 60, status: 'In Evaluation', color: '#F59E0B' }
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
            background: '#ECFDF5',
            color: '#10B981',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Send size={20} />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>
              Result Processing, Moderation & Portal Publishing Engine
            </h2>
            <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#64748B' }}>
              Final GPA computation, moderation curve controls, class-wise verification, and parent portal release.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={onApproveResults}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: '#3B7E5E',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            <CheckCircle2 size={14} /> Approve Results
          </button>

          <button
            onClick={onPublishResults}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: '#ECFDF5',
              color: '#047857',
              border: '1px solid #A7F3D0',
              padding: '8px 16px',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            <Send size={14} /> Publish to Portal
          </button>
        </div>
      </div>

      {/* Grid of Class-wise Evaluation Pipeline */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '16px'
      }}>
        {classesProgress.map((item) => (
          <div
            key={item.name}
            style={{
              background: '#F8FAFC',
              border: '1px solid #E2E8F0',
              borderRadius: '12px',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '12px'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 800, color: '#0F172A' }}>
                  {item.name}
                </h4>
                <span style={{ background: 'white', color: item.color, border: `1px solid ${item.color}`, padding: '2px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: 800 }}>
                  {item.pct}% Marked
                </span>
              </div>
              <div style={{ fontSize: '12px', color: '#64748B', marginTop: '4px' }}>
                {item.evaluated} of {item.total} scripts evaluated
              </div>
            </div>

            <div style={{ width: '100%', height: '6px', background: '#E2E8F0', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ width: `${item.pct}%`, height: '100%', background: item.color, borderRadius: '3px' }} />
            </div>

            <div style={{ fontSize: '11px', fontWeight: 700, color: item.color }}>
              Status: {item.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
