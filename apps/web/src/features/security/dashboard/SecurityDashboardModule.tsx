import React, { useState } from 'react';
import { 
  ShieldCheck, ShieldAlert, Users, Truck, AlertTriangle, Video, 
  Clock, Plus, CheckCircle2, Award, Search, Sparkles, MapPin, Eye
} from 'lucide-react';
import { KPICard } from '../../../components/erp/KPICard';
import { mockSecurityVisitors, mockGateLogs, mockStudentExits, mockIncidents, mockCCTV } from '../shared/mockSecurityData';
import { useNavigate } from 'react-router-dom';

export default function SecurityDashboardModule() {
  const navigate = useNavigate();
  const [toast, setToast] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const visitorsToday = mockSecurityVisitors.length;
  const studentsOut = mockStudentExits.length;
  const incidents = mockIncidents.length;
  const camerasOnline = mockCCTV.filter(c => c.status === 'Online').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', fontFamily: '"Outfit", sans-serif' }}>
      {toast && (
        <div style={{
          position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999,
          background: 'var(--bg-secondary)', border: '1px solid var(--accent-primary)',
          borderRadius: '10px', padding: '12px 20px', boxShadow: 'var(--shadow-lg)'
        }}>
          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>{toast}</span>
        </div>
      )}

      {/* Hero Overview Section */}
      <div style={{
        background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
        borderRadius: '16px', padding: '24px', color: '#FFF', display: 'flex',
        justify: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px',
        boxShadow: '0 8px 24px rgba(15,23,42,0.3)'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, padding: '3px 10px', borderRadius: '12px', background: 'rgba(255,255,255,0.15)', color: '#94A3B8' }}>
              ● Current Shift: Day Shift (08:00 AM - 04:00 PM)
            </span>
            <span style={{ fontSize: '12px', fontWeight: 700, padding: '3px 10px', borderRadius: '12px', background: 'rgba(16,185,129,0.3)', color: '#D1FAE5' }}>
              Perimeter Secure
            </span>
          </div>
          <h2 style={{ fontSize: '26px', fontWeight: 800, margin: '6px 0', letterSpacing: '-0.5px' }}>
            Campus Security & Gate Command Center
          </h2>
          <p style={{ fontSize: '13px', color: '#94A3B8', margin: 0, maxWidth: '650px' }}>
            Monitor gate entry/exit logs, visitor thermal badges, student early exit approvals, vehicle parking passes, CCTV camera health, and emergency alerts.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            onClick={() => navigate('/security/visitors')}
            style={{ padding: '10px 18px', borderRadius: '10px', border: 'none', background: '#3B82F6', color: '#FFF', fontWeight: 700, fontSize: '13px', cursor: 'pointer', boxShadow: '0 4px 12px rgba(59,130,246,0.3)' }}
          >
            + Register Visitor Pass
          </button>
          <button 
            onClick={() => navigate('/security/emergency')}
            style={{ padding: '10px 18px', borderRadius: '10px', border: '1px solid #EF4444', background: '#EF4444', color: '#FFF', fontWeight: 700, fontSize: '13px', cursor: 'pointer', boxShadow: '0 4px 12px rgba(239,68,68,0.3)' }}
          >
            Broadcast Emergency Alert 🚨
          </button>
        </div>
      </div>

      {/* 12 KPI Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
        <KPICard title="VISITORS TODAY" value={`${visitorsToday} Visitors`} icon={<Users size={20} />} trend={{ value: '2 Checked In', isPositive: true }} />
        <KPICard title="STUDENTS CHECKED OUT" value={`${studentsOut} Students`} icon={<Clock size={20} />} tone="info" />
        <KPICard title="STAFF ENTRIES" value="142 On Duty" icon={<Users size={20} />} tone="success" />
        <KPICard title="VEHICLE ENTRIES" value="12 Vehicles" icon={<Truck size={20} />} tone="primary" />
        <KPICard title="DELIVERIES" value="1 Received" icon={<CheckCircle2 size={20} />} tone="info" />
        <KPICard title="ACTIVE GUARDS" value="8 On Patrol" icon={<ShieldCheck size={20} />} tone="success" />
        <KPICard title="INCIDENTS TODAY" value={`${incidents} Report`} icon={<AlertTriangle size={20} />} tone="warning" />
        <KPICard title="EMERGENCY ALERTS" value="0 Active" icon={<ShieldAlert size={20} />} tone="success" />
        <KPICard title="PATROL COMPLETION" value="100% On Track" icon={<MapPin size={20} />} tone="success" />
        <KPICard title="CCTV CAMERAS ONLINE" value={`${camerasOnline}/24 Online`} icon={<Video size={20} />} tone="primary" />
        <KPICard title="BLACKLISTED VISITORS" value="0 Flags" icon={<Eye size={20} />} tone="success" />
        <KPICard title="GATE PASSES ACTIVE" value="1 Exit Pass" icon={<Award size={20} />} tone="info" />
      </div>

      {/* Quick Actions Bar */}
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '20px' }}>
        <h3 style={{ fontSize: '15px', fontWeight: 800, margin: '0 0 14px 0', color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          ⚡ Security Officer Quick Desk Actions
        </h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {[
            { label: 'Register Visitor & Thermal Pass', route: '/security/visitors' },
            { label: 'Verify QR Code / RFID Gate Entry', route: '/security/gate' },
            { label: 'Approve Student Exit Permit', route: '/security/student-exit' },
            { label: 'Issue Vehicle Parking Pass', route: '/security/vehicles' },
            { label: 'Receive Courier & Parcel Delivery', route: '/security/deliveries' },
            { label: 'Log Security / Medical Incident', route: '/security/incidents' },
            { label: 'Trigger Lockdown / Evacuation Alert', route: '/security/emergency' },
            { label: 'Check CCTV Camera Feed', route: '/security/cctv' },
            { label: 'Export Gate Entry & Exit Report', route: '/security/reports' },
          ].map((action, i) => (
            <button
              key={i}
              onClick={() => navigate(action.route)}
              style={{
                padding: '9px 14px', borderRadius: '8px', border: '1px solid var(--border-subtle)',
                background: 'var(--bg-surface-raised)', color: 'var(--text-primary)',
                fontSize: '12px', fontWeight: 700, cursor: 'pointer', transition: 'all 0.15s ease'
              }}
            >
              + {action.label}
            </button>
          ))}
        </div>
      </div>

      {/* AI Security Telematics & Insights */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(30,41,59,0.08) 0%, rgba(59,130,246,0.05) 100%)',
        border: '1px solid rgba(59,130,246,0.2)', borderRadius: '16px', padding: '20px',
        display: 'flex', flexDirection: 'column', gap: '14px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)', fontWeight: 800, fontSize: '16px' }}>
            <Sparkles size={20} style={{ color: '#3B82F6' }} />
            AI Perimeter Security & Patrol Telematics
          </div>
          <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '12px', background: '#3B82F6', color: '#FFF' }}>
            Live Camera Telematics
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px' }}>
          <div style={{ background: 'var(--bg-surface)', padding: '14px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
            <span style={{ fontWeight: 800, color: '#3B82F6', fontSize: '12px' }}>⚡ Peak Visitor Rush Prediction</span>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '4px 0' }}>
              Expected 25 parent visitors between 03:00 PM - 04:00 PM (School dismissal). Open Gate 2 lanes.
            </p>
            <button onClick={() => navigate('/security/gate')} style={{ border: 'none', background: '#3B82F6', color: '#FFF', padding: '5px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}>
              Open Extra Gate Lane →
            </button>
          </div>

          <div style={{ background: 'var(--bg-surface)', padding: '14px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
            <span style={{ fontWeight: 800, color: '#F59E0B', fontSize: '12px' }}>📍 Incident Hotspot Patrol Alert</span>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '4px 0' }}>
              Property damage reported at Junior Playground. Guard Ramu dispatched for GPS checkpoint scan.
            </p>
            <button onClick={() => navigate('/security/patrols')} style={{ border: '1px solid var(--border-subtle)', background: 'var(--bg-surface-raised)', color: 'var(--text-primary)', padding: '5px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}>
              Inspect Guard Patrol
            </button>
          </div>

          <div style={{ background: 'var(--bg-surface)', padding: '14px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
            <span style={{ fontWeight: 800, color: '#10B981', fontSize: '12px' }}>📹 CCTV Feed Telematics</span>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '4px 0' }}>
              All 24 perimeter cameras online with 100% storage health. Zero offline feeds.
            </p>
            <button onClick={() => navigate('/security/cctv')} style={{ border: 'none', background: '#10B981', color: '#FFF', padding: '5px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}>
              View CCTV Wall
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
