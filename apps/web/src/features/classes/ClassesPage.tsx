import React, { useState } from 'react';
import { 
  Calendar, Users, Building, Search, Plus, Filter, Settings, 
  ChevronLeft, ChevronRight, Zap, RefreshCw, Save, CheckCircle, AlertCircle, Play, Clock
} from 'lucide-react';

export default function ClassesPage() {
  const [selectedGrade, setSelectedGrade] = useState('Grade 10');
  const [selectedSection, setSelectedSection] = useState('A');

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const periods = [
    { id: 1, time: '08:00 - 08:45' },
    { id: 2, time: '08:45 - 09:30' },
    { id: 3, time: '09:30 - 10:15' },
    { id: 'B1', time: '10:15 - 10:30', isBreak: true, label: 'Short Break' },
    { id: 4, time: '10:30 - 11:15' },
    { id: 5, time: '11:15 - 12:00' },
    { id: 6, time: '12:00 - 12:45' },
    { id: 'B2', time: '12:45 - 13:30', isBreak: true, label: 'Lunch Break' },
    { id: 7, time: '13:30 - 14:15' },
    { id: 8, time: '14:15 - 15:00' },
  ];

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column', gap: '20px', height: 'calc(100vh - 40px)', overflow: 'hidden' }}>
      
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexShrink: 0 }}>
        <div>
          <h1 style={{ margin: '0 0 4px 0', fontSize: '24px', fontWeight: 800, color: '#111827' }}>Timetable Studio</h1>
          <p style={{ margin: 0, color: '#6b7280', fontSize: '13px' }}>Plan, optimize, and publish weekly schedules.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button style={{ 
            display: 'flex', alignItems: 'center', gap: '8px', 
            background: 'white', color: '#111827', border: '1px solid #d1d5db', 
            padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' 
          }}>
            <RefreshCw size={14} /> Auto-Generate
          </button>
          <button style={{ 
            display: 'flex', alignItems: 'center', gap: '8px', 
            background: 'white', color: '#111827', border: '1px solid #d1d5db', 
            padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' 
          }}>
            <Save size={14} /> Save Draft
          </button>
          <button style={{ 
            display: 'flex', alignItems: 'center', gap: '8px', 
            background: '#10b981', color: 'white', border: 'none', 
            padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' 
          }}>
            <Play size={14} /> Publish Timetable
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'white', padding: '12px 20px', borderRadius: '12px', border: '1px solid #e5e7eb', flexShrink: 0 }}>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderRight: '1px solid #e5e7eb', paddingRight: '16px' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#6b7280' }}>Grade</span>
            <select 
              value={selectedGrade} onChange={e => setSelectedGrade(e.target.value)}
              style={{ border: '1px solid #d1d5db', borderRadius: '6px', padding: '6px 24px 6px 12px', fontSize: '13px', fontWeight: 600, background: '#f9fafb', outline: 'none' }}
            >
              {['Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'].map(g => <option key={g}>{g}</option>)}
            </select>
            <select 
              value={selectedSection} onChange={e => setSelectedSection(e.target.value)}
              style={{ border: '1px solid #d1d5db', borderRadius: '6px', padding: '6px 24px 6px 12px', fontSize: '13px', fontWeight: 600, background: '#f9fafb', outline: 'none' }}
            >
              {['A', 'B', 'C', 'D'].map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          
          <div style={{ display: 'flex', background: '#f1f5f9', borderRadius: '6px', padding: '4px' }}>
            <button style={{ background: '#2563eb', color: 'white', border: 'none', padding: '4px 12px', borderRadius: '4px', fontSize: '12px', fontWeight: 600 }}>Class View</button>
            <button style={{ background: 'transparent', color: '#64748b', border: 'none', padding: '4px 12px', borderRadius: '4px', fontSize: '12px', fontWeight: 600 }}>Teacher View</button>
            <button style={{ background: 'transparent', color: '#64748b', border: 'none', padding: '4px 12px', borderRadius: '4px', fontSize: '12px', fontWeight: 600 }}>Room View</button>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 600, color: '#ef4444', background: '#fef2f2', padding: '6px 12px', borderRadius: '6px' }}>
            <AlertCircle size={14} /> 2 Conflicts Detected
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 600, color: '#10b981', background: '#ecfdf5', padding: '6px 12px', borderRadius: '6px' }}>
            <Zap size={14} /> AI Optimized (98%)
          </div>
        </div>
      </div>

      {/* Main Studio Area */}
      <div style={{ display: 'flex', gap: '20px', flex: 1, minHeight: 0 }}>
        
        {/* Left Sidebar (Draggable Elements) */}
        <div style={{ width: '280px', background: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ padding: '16px', borderBottom: '1px solid #e5e7eb', background: '#f8fafc' }}>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 700 }}>Unassigned Subjects</h3>
            <div style={{ position: 'relative' }}>
              <Search size={14} style={{ position: 'absolute', left: 10, top: 9, color: '#9ca3af' }} />
              <input 
                type="text" 
                placeholder="Search subject or teacher..." 
                style={{ width: '100%', padding: '8px 10px 8px 30px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '12px', outline: 'none' }}
              />
            </div>
          </div>
          <div style={{ padding: '12px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              { sub: 'Physics Lab', t: 'M. Sharma', c: 2, color: '#8b5cf6', bg: '#f3e8ff' },
              { sub: 'Physical Education', t: 'R. Singh', c: 1, color: '#10b981', bg: '#ecfdf5' },
              { sub: 'Library', t: 'K. Desai', c: 1, color: '#3b82f6', bg: '#eff6ff' },
              { sub: 'Art & Craft', t: 'A. Gupta', c: 1, color: '#f59e0b', bg: '#fffbeb' },
            ].map((item, i) => (
              <div key={i} style={{ 
                padding: '12px', background: 'white', border: '1px solid #e5e7eb', borderRadius: '8px', 
                cursor: 'grab', display: 'flex', flexDirection: 'column', gap: '6px',
                borderLeft: `4px solid ${item.color}`, boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: '#111827' }}>{item.sub}</span>
                  <span style={{ fontSize: '10px', fontWeight: 700, color: item.color, background: item.bg, padding: '2px 6px', borderRadius: '4px' }}>
                    {item.c} left
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#6b7280' }}>
                  <Users size={12} /> {item.t}
                </div>
              </div>
            ))}
            
            {/* Substitute Teachers widget */}
            <div style={{ marginTop: '16px' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '8px' }}>Available Substitutes</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px', background: '#f8fafc', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                  <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 700 }}>SD</div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '12px', fontWeight: 600 }}>S. Dixit (Math)</span>
                    <span style={{ fontSize: '10px', color: '#64748b' }}>Free: P3, P4</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Timetable Grid */}
        <div style={{ flex: 1, background: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', overflowX: 'auto', overflowY: 'auto' }}>
          <table style={{ width: '100%', minWidth: '900px', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ position: 'sticky', top: 0, left: 0, zIndex: 10, background: '#f8fafc', borderRight: '1px solid #e5e7eb', borderBottom: '1px solid #e5e7eb', padding: '12px', width: '80px', textAlign: 'center' }}>
                  <Clock size={16} color="#6b7280" />
                </th>
                {days.map(day => (
                  <th key={day} style={{ position: 'sticky', top: 0, background: '#f8fafc', borderBottom: '1px solid #e5e7eb', borderRight: '1px solid #e5e7eb', padding: '12px', textAlign: 'center', fontSize: '13px', fontWeight: 700, color: '#111827' }}>
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {periods.map(period => (
                <tr key={period.id}>
                  <td style={{ position: 'sticky', left: 0, zIndex: 5, background: 'white', borderRight: '1px solid #e5e7eb', borderBottom: '1px solid #e5e7eb', padding: '12px 8px', textAlign: 'center' }}>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: '#111827' }}>{period.isBreak ? '' : `P${period.id}`}</div>
                    <div style={{ fontSize: '10px', color: '#6b7280', marginTop: '2px' }}>{period.time}</div>
                  </td>
                  
                  {period.isBreak ? (
                    <td colSpan={5} style={{ background: '#f1f5f9', borderBottom: '1px solid #e5e7eb', textAlign: 'center', padding: '8px' }}>
                      <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748b', letterSpacing: '2px', textTransform: 'uppercase' }}>{period.label}</span>
                    </td>
                  ) : (
                    days.map(day => {
                      // Mock some data based on day and period
                      const isConflict = day === 'Tuesday' && period.id === 4;
                      const isEmpty = day === 'Friday' && period.id === 7;
                      
                      return (
                        <td key={`${day}-${period.id}`} style={{ borderRight: '1px solid #e5e7eb', borderBottom: '1px solid #e5e7eb', padding: '8px', verticalAlign: 'top', height: '80px', width: '20%' }}>
                          {isEmpty ? (
                            <div style={{ height: '100%', border: '1px dashed #cbd5e1', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', background: '#f8fafc', cursor: 'pointer' }}>
                              <Plus size={16} />
                            </div>
                          ) : (
                            <div style={{ 
                              height: '100%', background: isConflict ? '#fef2f2' : 'white', 
                              border: `1px solid ${isConflict ? '#fca5a5' : '#e2e8f0'}`, 
                              borderLeft: `4px solid ${isConflict ? '#ef4444' : '#3b82f6'}`,
                              borderRadius: '6px', padding: '8px', display: 'flex', flexDirection: 'column', gap: '4px',
                              cursor: 'pointer'
                            }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <span style={{ fontSize: '12px', fontWeight: 700, color: isConflict ? '#b91c1c' : '#1e293b', lineHeight: 1.2 }}>
                                  {isConflict ? 'Mathematics' : 'Mathematics'}
                                </span>
                                {isConflict && <AlertCircle size={14} color="#ef4444" />}
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '10px', color: '#64748b' }}>
                                <Users size={10} /> M. Iyer {isConflict && <span style={{ color: '#ef4444', fontWeight: 600 }}>(Double Booked)</span>}
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '10px', color: '#64748b' }}>
                                <Building size={10} /> Room 102
                              </div>
                            </div>
                          )}
                        </td>
                      );
                    })
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
}
