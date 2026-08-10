import React from 'react';
import { motion } from 'framer-motion';
import type { AssignmentAlert } from '../types';
import { 
  Bell, 
  AlertTriangle, 
  Clock, 
  Users, 
  CheckCircle2 
} from 'lucide-react';

interface RightSidebarAlertsProps {
  alerts: AssignmentAlert[];
  onResolveAlert: (id: string) => void;
}

export const RightSidebarAlerts: React.FC<RightSidebarAlertsProps> = ({ alerts, onResolveAlert }) => {
  const getAlertIcon = (type: AssignmentAlert['type']) => {
    switch (type) {
      case 'Assignment Overdue':
        return <Clock size={15} color="#EF4444" />;
      case 'Teacher Evaluation Pending':
        return <AlertTriangle size={15} color="#F59E0B" />;
      case 'Low Submission Rate':
        return <AlertTriangle size={15} color="#EF4444" />;
      case 'Student Inactive':
        return <Users size={15} color="#F59E0B" />;
      case 'Approval Required':
        return <Clock size={15} color="#3B82F6" />;
    }
  };

  return (
    <div style={{
      background: 'white',
      border: '1px solid #E2E8F0',
      borderRadius: '16px',
      padding: '20px',
      boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.03)',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '12px', borderBottom: '1px solid #F1F5F9' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            background: '#FEF2F2',
            color: '#EF4444',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Bell size={16} />
          </div>
          <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: '#0F172A' }}>
            Today's Assignment Alerts
          </h3>
        </div>

        <span style={{ fontSize: '11px', fontWeight: 700, color: '#EF4444', background: '#FEF2F2', padding: '2px 8px', borderRadius: '10px' }}>
          {alerts.filter(a => !a.resolved).length} Urgent
        </span>
      </div>

      {/* List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {alerts.map((alt) => (
          <motion.div
            key={alt.id}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            style={{
              background: alt.severity === 'high' ? '#FEF2F2' : '#FFFBEB',
              border: `1px solid ${alt.severity === 'high' ? '#FCA5A5' : '#FDE68A'}`,
              borderRadius: '10px',
              padding: '12px 14px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                {getAlertIcon(alt.type)}
                <span style={{ fontSize: '12px', fontWeight: 800, color: alt.severity === 'high' ? '#991B1B' : '#92400E' }}>
                  {alt.type}
                </span>
              </div>
              <span style={{ fontSize: '10px', fontWeight: 600, color: '#64748B' }}>
                {alt.timestamp}
              </span>
            </div>

            <div style={{ fontSize: '12px', fontWeight: 700, color: '#1E293B' }}>
              {alt.title}
            </div>

            <div style={{ fontSize: '11px', color: '#64748B' }}>
              {alt.details}
            </div>

            {!alt.resolved ? (
              <button
                onClick={() => onResolveAlert(alt.id)}
                style={{
                  alignSelf: 'flex-end',
                  background: 'transparent',
                  border: 'none',
                  color: alt.severity === 'high' ? '#DC2626' : '#B45309',
                  fontSize: '11px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  marginTop: '4px'
                }}
              >
                Resolve Alert ✓
              </button>
            ) : (
              <span style={{ alignSelf: 'flex-end', fontSize: '10px', fontWeight: 700, color: '#10B981' }}>
                ✓ Resolved
              </span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};
