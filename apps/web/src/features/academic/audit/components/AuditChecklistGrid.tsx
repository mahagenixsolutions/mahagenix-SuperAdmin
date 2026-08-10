import React from 'react';
import { motion } from 'framer-motion';
import type { AuditChecklistItem } from '../types';
import { 
  CheckSquare, 
  CheckCircle2, 
  AlertTriangle, 
  Eye 
} from 'lucide-react';

interface AuditChecklistGridProps {
  checklist: AuditChecklistItem[];
  onReviewChecklist: (item: AuditChecklistItem) => void;
}

export const AuditChecklistGrid: React.FC<AuditChecklistGridProps> = ({
  checklist,
  onReviewChecklist
}) => {
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
            <CheckSquare size={20} />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>
              Institutional Quality Audit Checklist Status
            </h2>
            <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#64748B' }}>
              Core academic standards audit checklist across 10 key operational categories.
            </p>
          </div>
        </div>

        <span style={{ fontSize: '12px', fontWeight: 700, color: '#3B7E5E', background: '#EAF5F0', padding: '6px 14px', borderRadius: '20px' }}>
          10/10 Compliance Domains Active
        </span>
      </div>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '16px'
      }}>
        {checklist.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ y: -2 }}
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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 800, color: '#0F172A' }}>
                {item.category}
              </h4>

              <span style={{
                background: item.status === 'Compliant' ? '#ECFDF5' : '#FEF3C7',
                color: item.status === 'Compliant' ? '#047857' : '#B45309',
                border: `1px solid ${item.status === 'Compliant' ? '#A7F3D0' : '#FDE68A'}`,
                padding: '2px 8px',
                borderRadius: '6px',
                fontSize: '11px',
                fontWeight: 700
              }}>
                {item.status}
              </span>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 800, color: '#0F172A', marginBottom: '4px' }}>
                <span>Score: {item.compliancePct}%</span>
                <span style={{ fontSize: '11px', color: '#64748B' }}>Risk: {item.riskLevel}</span>
              </div>
              <div style={{ width: '100%', height: '6px', background: '#E2E8F0', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ width: `${item.compliancePct}%`, height: '100%', background: item.compliancePct >= 90 ? '#5FAF88' : '#F59E0B', borderRadius: '3px' }} />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', color: '#64748B' }}>
              <span>Last: {item.lastReviewedDate}</span>
              <button
                onClick={() => onReviewChecklist(item)}
                style={{
                  background: 'white',
                  border: '1px solid #CBD5E1',
                  borderRadius: '6px',
                  padding: '4px 10px',
                  fontSize: '11px',
                  fontWeight: 600,
                  color: '#1E293B',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <Eye size={12} /> Audit Details
              </button>
            </div>

          </motion.div>
        ))}
      </div>
    </div>
  );
};
