import React from 'react';
import { motion } from 'framer-motion';
import { 
  Bell, 
  Send, 
  Plus, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  Users 
} from 'lucide-react';

interface NoticeHeroBannerProps {
  onCreateNotice: () => void;
  onPublishCircular: () => void;
}

export const NoticeHeroBanner: React.FC<NoticeHeroBannerProps> = ({
  onCreateNotice,
  onPublishCircular
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      style={{
        background: 'linear-gradient(135deg, #FFFFFF 0%, #F4F9F6 50%, #EAF5F0 100%)',
        border: '1px solid rgba(95, 175, 136, 0.25)',
        borderRadius: '16px',
        padding: '24px 28px',
        boxShadow: '0 8px 30px -4px rgba(95, 175, 136, 0.12)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '24px' }}>
        
        {/* Metrics Row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
          
          {/* Total Academic Notices */}
          <div style={{ minWidth: '130px' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Total Notices
            </div>
            <div style={{ fontSize: '30px', fontWeight: 800, color: '#3B7E5E', marginTop: '4px' }}>
              428
            </div>
            <div style={{ fontSize: '11px', color: '#047857', fontWeight: 600, marginTop: '2px' }}>
              Institutional Archive
            </div>
          </div>

          <div style={{ width: '1px', height: '44px', background: '#CBD5E1' }} />

          {/* Active Notices */}
          <div style={{ minWidth: '100px' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Active
            </div>
            <div style={{ fontSize: '26px', fontWeight: 800, color: '#10B981', marginTop: '4px' }}>
              18
            </div>
            <div style={{ fontSize: '11px', color: '#047857', fontWeight: 600, marginTop: '2px' }}>
              Live Broadcasts
            </div>
          </div>

          {/* Scheduled */}
          <div style={{ minWidth: '100px' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Scheduled
            </div>
            <div style={{ fontSize: '26px', fontWeight: 800, color: '#3B82F6', marginTop: '4px' }}>
              12
            </div>
            <div style={{ fontSize: '11px', color: '#1E40AF', fontWeight: 600, marginTop: '2px' }}>
              Queued Releases
            </div>
          </div>

          {/* Expired */}
          <div style={{ minWidth: '90px' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Expired
            </div>
            <div style={{ fontSize: '26px', fontWeight: 800, color: '#64748B', marginTop: '4px' }}>
              205
            </div>
            <div style={{ fontSize: '11px', color: '#94A3B8', fontWeight: 600, marginTop: '2px' }}>
              Archived
            </div>
          </div>

          <div style={{ width: '1px', height: '44px', background: '#CBD5E1' }} />

          {/* Acknowledgement Rate */}
          <div style={{ minWidth: '130px' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Ack Rate
            </div>
            <div style={{ fontSize: '26px', fontWeight: 800, color: '#3B7E5E', marginTop: '4px' }}>
              94%
            </div>
            <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600, marginTop: '2px' }}>
              Unread: 26 | Events: 9
            </div>
          </div>

        </div>

        {/* Quick Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={onCreateNotice}
            style={{
              background: '#3B7E5E',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '8px 14px',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Plus size={14} /> Create Notice
          </button>

          <button
            onClick={onPublishCircular}
            style={{
              background: 'white',
              color: '#1E293B',
              border: '1px solid #CBD5E1',
              borderRadius: '8px',
              padding: '8px 14px',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Send size={14} color="#3B7E5E" /> Publish Circular
          </button>
        </div>

      </div>
    </motion.div>
  );
};
