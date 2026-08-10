import React from 'react';
import { motion } from 'framer-motion';
import { noticeCategoryCards } from '../mockData';
import { 
  Grid, 
  Calendar, 
  FileText, 
  BookOpen, 
  Video, 
  Layers, 
  Sparkles, 
  Award, 
  Users, 
  Briefcase, 
  ShieldCheck, 
  Building2, 
  FileCheck 
} from 'lucide-react';

interface NoticeCategoriesGridProps {
  onSelectCategory: (cat: string) => void;
}

export const NoticeCategoriesGrid: React.FC<NoticeCategoriesGridProps> = ({ onSelectCategory }) => {
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Calendar': return <Calendar size={18} color="#3B7E5E" />;
      case 'FileText': return <FileText size={18} color="#3B82F6" />;
      case 'BookOpen': return <BookOpen size={18} color="#10B981" />;
      case 'Video': return <Video size={18} color="#8B5CF6" />;
      case 'Layers': return <Layers size={18} color="#F59E0B" />;
      case 'Sparkles': return <Sparkles size={18} color="#EC4899" />;
      case 'Award': return <Award size={18} color="#10B981" />;
      case 'Users': return <Users size={18} color="#6366F1" />;
      case 'Briefcase': return <Briefcase size={18} color="#F97316" />;
      case 'ShieldCheck': return <ShieldCheck size={18} color="#3B7E5E" />;
      case 'Building2': return <Building2 size={18} color="#06B6D4" />;
      case 'FileCheck': return <FileCheck size={18} color="#3B82F6" />;
      default: return <Grid size={18} color="#3B7E5E" />;
    }
  };

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
            <Grid size={20} />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>
              Academic Notice Categories & Communication Domains
            </h2>
            <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#64748B' }}>
              Filter and organize circulars across 12 academic operational domains.
            </p>
          </div>
        </div>

        <span style={{ fontSize: '12px', fontWeight: 700, color: '#3B7E5E', background: '#EAF5F0', padding: '6px 14px', borderRadius: '20px' }}>
          12 Categories Active
        </span>
      </div>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '12px'
      }}>
        {noticeCategoryCards.map((cat) => (
          <motion.button
            key={cat.title}
            onClick={() => onSelectCategory(cat.title)}
            whileHover={{ y: -2 }}
            style={{
              background: '#F8FAFC',
              border: '1px solid #E2E8F0',
              borderRadius: '12px',
              padding: '14px',
              textAlign: 'left',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '8px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'white', border: '1px solid #CBD5E1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {getCategoryIcon(cat.icon)}
              </div>
              <span style={{ fontSize: '12px', fontWeight: 800, color: '#0F172A' }}>{cat.title}</span>
            </div>

            <span style={{ fontSize: '11px', fontWeight: 700, color: '#3B7E5E', background: '#EAF5F0', padding: '2px 6px', borderRadius: '6px' }}>
              {cat.count}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};
