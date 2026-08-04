import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store';
import { Calendar, User, Clock, Building, BarChart2, Download } from 'lucide-react';

interface Props {
  onGenerateReport: () => void;
  onExportData: () => void;
}

export default function PrincipalHeader({ onGenerateReport, onExportData }: Props) {
  const user = useSelector((s: RootState) => s.auth.user);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 767.98);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div style={{
      background: 'linear-gradient(135deg, #4f46e5 0%, #3730a3 100%)',
      color: '#ffffff',
      borderRadius: '20px',
      padding: isMobile ? '20px 16px' : '32px 32px 28px',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: '0 10px 25px -5px rgba(79, 70, 229, 0.3), 0 8px 10px -6px rgba(79, 70, 229, 0.3)',
      fontFamily: 'Inter, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      gap: isMobile ? '16px' : '32px',
    }}>
      {/* Top Section: Greeting and Action Buttons */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: isMobile ? 'stretch' : 'flex-start',
        flexDirection: isMobile ? 'column' : 'row',
        gap: isMobile ? '16px' : '20px',
        zIndex: 2,
      }}>
        {/* Left Side: Avatar and Greeting */}
        <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '12px' : '20px' }}>
          {/* Avatar Circle */}
          <div style={{
            width: isMobile ? '48px' : '64px',
            height: isMobile ? '48px' : '64px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.15)',
            border: '2px solid rgba(255, 255, 255, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: isMobile ? '16px' : '22px',
            fontWeight: 700,
            color: '#ffffff',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
            flexShrink: 0,
          }}>
            {user?.first_name?.[0] ?? 'R'}{user?.last_name?.[0] ?? 'K'}
          </div>

          <div>
            <h1 style={{
              fontSize: isMobile ? '20px' : '28px',
              fontWeight: 800,
              margin: 0,
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              Good afternoon, {user?.first_name ?? 'Rajesh'}! 👋
            </h1>
            <p style={{
              fontSize: isMobile ? '12px' : '14px',
              color: 'rgba(255, 255, 255, 0.8)',
              margin: '4px 0 0 0',
              fontWeight: 500,
            }}>
              Here's what's happening at Eduverse International School
            </p>
          </div>
        </div>

        {/* Right Side: Action Buttons */}
        <div style={{
          display: 'flex',
          gap: '10px',
          width: isMobile ? '100%' : 'auto',
        }}>
          <button
            onClick={onGenerateReport}
            style={{
              flex: isMobile ? 1 : 'none',
              background: '#ffffff',
              color: '#4f46e5',
              border: 'none',
              borderRadius: '10px',
              padding: isMobile ? '10px 12px' : '10px 20px',
              fontSize: isMobile ? '12px' : '13px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              whiteSpace: 'nowrap',
            }}
          >
            <BarChart2 size={15} /> Generate Report
          </button>
          
          <button
            onClick={onExportData}
            style={{
              flex: isMobile ? 1 : 'none',
              background: 'transparent',
              color: '#ffffff',
              border: '1px solid rgba(255, 255, 255, 0.4)',
              borderRadius: '10px',
              padding: isMobile ? '10px 12px' : '10px 20px',
              fontSize: isMobile ? '12px' : '13px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              whiteSpace: 'nowrap',
            }}
          >
            <Download size={15} /> Export Data
          </button>
        </div>
      </div>

      {/* Bottom Section: Metadata Info Badges */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: isMobile ? '8px' : '12px',
        width: '100%',
        zIndex: 2,
      }}>
        {[
          { icon: <Calendar size={13} />, label: 'School Year', value: '2025 – 2026' },
          { icon: <User size={13} />, label: 'Role', value: 'Principal' },
          { icon: <Clock size={13} />, label: 'Last Login', value: 'Today, 10:24 AM' },
          { icon: <Building size={13} />, label: 'Branch', value: 'Main Campus' },
        ].map((item, idx) => (
          <div
            key={idx}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: isMobile ? '8px 10px' : '10px 16px',
              background: 'rgba(255, 255, 255, 0.12)',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              borderRadius: '10px',
              fontSize: isMobile ? '11px' : '13px',
              color: 'rgba(255, 255, 255, 0.95)',
              fontWeight: 500,
              backdropFilter: 'blur(6px)',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
            }}
          >
            <span style={{ color: 'rgba(255, 255, 255, 0.8)', display: 'inline-flex', flexShrink: 0 }}>{item.icon}</span>
            <span style={{ color: 'rgba(255, 255, 255, 0.7)', fontWeight: 400 }}>{item.label}:</span>
            <span style={{ fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.value}</span>
          </div>
        ))}
      </div>

      {/* Background Vector Building Illustration - Hidden on mobile to avoid text overlap */}
      {!isMobile && (
        <div style={{
          position: 'absolute',
          right: '20px',
          bottom: '-10px',
          width: '280px',
          height: '180px',
          opacity: 0.95,
          zIndex: 1,
          pointerEvents: 'none',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
        }}>
          <svg viewBox="0 0 300 200" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="150" cy="160" rx="100" ry="25" fill="#312e81" opacity="0.4" />
            <path d="M70 140 C 65 120, 85 110, 80 140 Z" fill="#10B981" />
            <circle cx="75" cy="120" r="15" fill="#059669" />
            <circle cx="85" cy="125" r="10" fill="#34D399" />
            <rect x="73" y="135" width="4" height="25" fill="#78350F" />
            <path d="M110 110 L150 130 L150 170 L110 150 Z" fill="#818CF8" />
            <path d="M150 130 L210 100 L210 140 L150 170 Z" fill="#C7D2FE" />
            <path d="M150 90 L210 60 L230 75 L150 110 Z" fill="#E0E7FF" />
            <path d="M110 110 L150 90 L150 130 Z" fill="#4F46E5" />
            <path d="M150 90 L210 60 L150 110 Z" fill="#6366F1" />
            <path d="M170 140 L185 132 L185 152 L170 160 Z" fill="#312E81" />
            <path d="M172 142 L183 135 L183 151 L172 158 Z" fill="#F59E0B" />
            <path d="M162 118 L170 114 L170 124 L162 128 Z" fill="#312E81" />
            <path d="M164 120 L168 116 L168 122 L164 126 Z" fill="#E0E7FF" />
            <path d="M180 110 L188 106 L188 116 L180 120 Z" fill="#312E81" />
            <path d="M182 112 L186 108 L186 114 L182 118 Z" fill="#E0E7FF" />
            <path d="M195 102 L203 98 L203 108 L195 112 Z" fill="#312E81" />
            <path d="M197 104 L201 100 L201 106 L197 110 Z" fill="#E0E7FF" />
            <circle cx="175" cy="100" r="6" fill="#ffffff" />
            <circle cx="175" cy="100" r="5" fill="#312E81" />
            <rect x="235" y="115" width="4" height="25" fill="#78350F" />
            <circle cx="237" cy="105" r="18" fill="#10B981" />
            <circle cx="245" cy="110" r="12" fill="#34D399" />
            <circle cx="228" cy="102" r="10" fill="#059669" />
            <path d="M220 40 C215 30, 235 25, 240 30 C245 25, 265 30, 260 40 Z" fill="#ffffff" opacity="0.35" />
            <path d="M60 50 C55 42, 70 38, 75 42 C80 38, 95 42, 90 50 Z" fill="#ffffff" opacity="0.25" />
          </svg>
        </div>
      )}
    </div>
  );
}
