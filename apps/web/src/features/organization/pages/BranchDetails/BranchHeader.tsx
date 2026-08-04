import { MapPin, Pencil, Download, MoreHorizontal, UserCheck, User, UserCog } from 'lucide-react';
import type { CompleteBranchData } from './mockData';

interface Props {
  branch: CompleteBranchData;
  onEdit: () => void;
  onExport: () => void;
}

export default function BranchHeader({ branch, onEdit, onExport }: Props) {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
      borderRadius: '16px',
      padding: '28px',
      color: '#ffffff',
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.3)',
      fontFamily: 'Inter, sans-serif'
    }}>
      {/* Top Section: Title & Actions */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <h1 style={{ fontSize: '28px', fontWeight: 800, margin: 0, letterSpacing: '-0.02em' }}>
              {branch.name}
            </h1>
            <span style={{
              background: '#10b981',
              color: '#ffffff',
              padding: '4px 10px',
              borderRadius: '6px',
              fontWeight: 700,
              fontSize: '11px',
              letterSpacing: '0.05em',
              textTransform: 'uppercase'
            }}>
              {branch.status}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px', fontSize: '13px', color: '#94a3b8', flexWrap: 'wrap' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <MapPin size={13} style={{ display: 'inline-block', verticalAlign: 'middle' }} /> {branch.location}
            </span>
            <span>•</span>
            <span>{branch.info.board}</span>
            <span>•</span>
            <span>{branch.info.medium} Medium</span>
          </div>
        </div>

        {/* Top-Right Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <button
            onClick={onEdit}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '9px 16px', fontSize: '13px', fontWeight: 600,
              background: 'rgba(255, 255, 255, 0.1)', color: '#ffffff',
              border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: '8px',
              cursor: 'pointer', transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.18)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
          >
            <Pencil size={12} /> Edit Branch
          </button>
          <button
            onClick={onExport}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '9px 16px', fontSize: '13px', fontWeight: 600,
              background: '#2563eb', color: '#ffffff',
              border: 'none', borderRadius: '8px',
              cursor: 'pointer', transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#1d4ed8'}
            onMouseLeave={(e) => e.currentTarget.style.background = '#2563eb'}
          >
            <Download size={12} /> Export Report
          </button>
          <button
            onClick={() => alert('Opening actions menu...')}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: '38px', height: '38px',
              background: 'rgba(255, 255, 255, 0.05)', color: '#ffffff',
              border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '8px',
              cursor: 'pointer', transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'}
          >
            <MoreHorizontal size={14} />
          </button>
        </div>
      </div>

      {/* Middle Section: Leadership Profiles */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '16px',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        paddingTop: '20px',
        paddingBottom: '20px'
      }}>
        {/* Principal */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '42px', height: '42px', borderRadius: '50%',
            background: branch.leadership.principal.avatarBg,
            color: branch.leadership.principal.avatarColor,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 700, fontSize: '18px'
          }}>
            <UserCheck size={20} />
          </div>
          <div>
            <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 700, letterSpacing: '0.05em' }}>PRINCIPAL</div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#f8fafc', marginTop: 1 }}>{branch.leadership.principal.name}</div>
          </div>
        </div>


        {/* School Admin */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '42px', height: '42px', borderRadius: '50%',
            background: branch.leadership.admin.avatarBg,
            color: branch.leadership.admin.avatarColor,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 700, fontSize: '18px'
          }}>
            <UserCog size={20} />
          </div>
          <div>
            <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 700, letterSpacing: '0.05em' }}>SCHOOL ADMIN</div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#f8fafc', marginTop: 1 }}>{branch.leadership.admin.name}</div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Micro Details & KPI Highlights */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))',
        gap: '12px'
      }}>
        <div>
          <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 700, letterSpacing: '0.05em' }}>ACADEMIC YEAR</div>
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#f8fafc', marginTop: 3 }}>{branch.academicYear}</div>
        </div>
        <div>
          <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 700, letterSpacing: '0.05em' }}>ESTABLISHED</div>
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#f8fafc', marginTop: 3 }}>{branch.establishedYear}</div>
        </div>
        <div>
          <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 700, letterSpacing: '0.05em' }}>CAPACITY</div>
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#f8fafc', marginTop: 3 }}>{branch.info.capacity} Students</div>
        </div>
        <div>
          <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 700, letterSpacing: '0.05em' }}>OCCUPANCY</div>
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#f59e0b', marginTop: 3 }}>{branch.occupancyPercent}%</div>
        </div>
        <div>
          <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 700, letterSpacing: '0.05em' }}>REVENUE</div>
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#10b981', marginTop: 3 }}>{branch.revenue}</div>
        </div>
        <div>
          <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 700, letterSpacing: '0.05em' }}>EXPENSE</div>
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#ef4444', marginTop: 3 }}>{branch.expense}</div>
        </div>
        <div>
          <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 700, letterSpacing: '0.05em' }}>HEALTH SCORE</div>
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#a855f7', marginTop: 3 }}>{branch.healthScore}%</div>
        </div>
      </div>
    </div>
  );
}
