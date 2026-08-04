import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Building, Bed, Users, Calendar, Clock, AlertTriangle, CheckCircle2,
  Sparkles, Plus, ShieldCheck, Utensils, Wrench, FileText, HeartPulse, X, ShieldAlert
} from 'lucide-react';
import { KPICard } from '../../../components/erp/KPICard';
import { useHostelStore } from '../shared/hostelStore';

export default function HostelDashboardModule() {
  const navigate = useNavigate();
  const {
    buildings,
    rooms,
    students,
    wardens,
    attendance,
    visitors,
    gatePasses,
    complaints,
    inventory,
    fees,
    medicalCases,
    incidents,
    aiInsights,
    activities,
    toastMessage,
    allocateRoom,
    registerVisitor,
    issueGatePass,
    createComplaint,
    logMedicalEmergency,
  } = useHostelStore();

  // Modal States
  const [activeModal, setActiveModal] = useState<'allocate' | 'visitor' | 'gatepass' | 'complaint' | 'medical' | null>(null);

  // Form States
  const [allocStudentName, setAllocStudentName] = useState('');
  const [allocClassGrade, setAllocClassGrade] = useState('Class 10-A');
  const [allocBuilding, setAllocBuilding] = useState(buildings[0]?.buildingName || '');
  const [allocRoom, setAllocRoom] = useState(rooms[0]?.roomNumber || 'A-101');

  const [visitorName, setVisitorName] = useState('');
  const [visitorRelation, setVisitorRelation] = useState('Parent / Guardian');
  const [visStudentName, setVisStudentName] = useState('');
  const [visRoom, setVisRoom] = useState('');
  const [visPhone, setVisPhone] = useState('');

  const [passStudentName, setPassStudentName] = useState('');
  const [passRoom, setPassRoom] = useState('A-101');
  const [passBuilding, setPassBuilding] = useState(buildings[0]?.buildingName || '');
  const [passType, setPassType] = useState<'Local Outing' | 'Weekend Leave' | 'Emergency Outing'>('Local Outing');
  const [passOutTime, setPassOutTime] = useState('04:00 PM');
  const [passExpTime, setPassExpTime] = useState('07:30 PM');

  const [cmpStudentName, setCmpStudentName] = useState('');
  const [cmpRoom, setCmpRoom] = useState('A-101');
  const [cmpCategory, setCmpCategory] = useState<'Electrical' | 'Plumbing' | 'Carpentry & Furniture' | 'Cleaning & Hygiene' | 'Wi-Fi / Internet'>('Electrical');
  const [cmpDesc, setCmpDesc] = useState('');
  const [cmpPriority, setCmpPriority] = useState<'Low' | 'Medium' | 'High' | 'Emergency'>('Medium');

  const [medStudentName, setMedStudentName] = useState('');
  const [medRoom, setMedRoom] = useState('A-101');
  const [medSymptoms, setMedSymptoms] = useState('');
  const [medSeverity, setMedSeverity] = useState<'Mild' | 'Moderate' | 'Severe' | 'Critical'>('Mild');

  // KPI Calculations
  const totalCapacityBeds = buildings.reduce((acc, b) => acc + b.totalCapacityBeds, 0);
  const occupiedBedsCount = buildings.reduce((acc, b) => acc + b.occupiedBeds, 0);
  const availableBedsCount = buildings.reduce((acc, b) => acc + b.availableBeds, 0);
  const openComplaintsCount = complaints.filter((c) => c.status !== 'Resolved').length;
  const pendingFeesCount = fees.filter((f) => f.status === 'Unpaid' || f.status === 'Partial').length;

  const handleAllocateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!allocStudentName) return;
    allocateRoom(allocStudentName, allocClassGrade, allocBuilding, allocRoom);
    setActiveModal(null);
    setAllocStudentName('');
  };

  const handleVisitorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!visitorName || !visStudentName) return;
    registerVisitor(visitorName, visitorRelation, visStudentName, visRoom || 'A-101', visPhone || '+91 98000 00000');
    setActiveModal(null);
    setVisitorName('');
    setVisStudentName('');
  };

  const handleGatePassSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passStudentName) return;
    issueGatePass(passStudentName, passRoom, passBuilding, passType, passOutTime, passExpTime);
    setActiveModal(null);
    setPassStudentName('');
  };

  const handleComplaintSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cmpStudentName || !cmpDesc) return;
    createComplaint(cmpStudentName, cmpRoom, buildings[0]?.buildingName || '', cmpCategory, cmpDesc, cmpPriority);
    setActiveModal(null);
    setCmpStudentName('');
    setCmpDesc('');
  };

  const handleMedicalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!medStudentName || !medSymptoms) return;
    logMedicalEmergency(medStudentName, medRoom, buildings[0]?.buildingName || '', medSymptoms, medSeverity);
    setActiveModal(null);
    setMedStudentName('');
    setMedSymptoms('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', fontFamily: '"Outfit", sans-serif' }}>
      {toastMessage && (
        <div style={{
          position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999,
          background: '#6366F1', color: '#FFF',
          borderRadius: '12px', padding: '12px 20px', boxShadow: '0 10px 25px rgba(99,102,241,0.3)',
          display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, fontSize: '13px'
        }}>
          <CheckCircle2 size={18} />
          {toastMessage}
        </div>
      )}

      {/* 1. Header Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #1E1B4B 0%, #312E81 100%)',
        borderRadius: '16px', padding: '24px', color: '#FFF', display: 'flex',
        justify: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px',
        boxShadow: '0 8px 24px rgba(49,46,129,0.25)'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 10px', borderRadius: '12px', background: 'rgba(255,255,255,0.15)', color: '#C7D2FE' }}>
              ● Academic Year 2025–2026
            </span>
            <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 10px', borderRadius: '12px', background: 'rgba(99,102,241,0.3)', color: '#E0E7FF' }}>
              Hostel Health Score: 95.4% • Occupancy: {occupiedBedsCount}/{totalCapacityBeds} Beds ({Math.round((occupiedBedsCount / totalCapacityBeds) * 100)}%)
            </span>
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: 800, margin: '6px 0', letterSpacing: '-0.5px' }}>
            Hostel Management Command Center
          </h2>
          <p style={{ fontSize: '13px', color: '#C7D2FE', margin: 0, maxWidth: '650px' }}>
            Campus accommodation operations: room allocations, warden shift rosters, night roll call, visitor gate passes, mess menus, and student infirmary care.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setActiveModal('allocate')}
            style={{ padding: '10px 18px', borderRadius: '10px', border: 'none', background: '#6366F1', color: '#FFF', fontWeight: 700, fontSize: '13px', cursor: 'pointer', boxShadow: '0 4px 12px rgba(99,102,241,0.3)' }}
          >
            + Allocate Room
          </button>
          <button
            onClick={() => navigate('/hostel/visitors')}
            style={{ padding: '10px 18px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.1)', color: '#FFF', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}
          >
            Gate Passes ({gatePasses.length}) →
          </button>
        </div>
      </div>

      {/* 2. 12 KPI Metric Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '14px' }}>
        <KPICard title="TOTAL HOSTEL STUDENTS" value={students.length.toString()} icon={<Users size={20} />} trend={{ value: '100% Registered', isPositive: true }} />
        <KPICard title="TOTAL BUILDINGS" value={`${buildings.length} Blocks`} icon={<Building size={20} />} tone="info" />
        <KPICard title="TOTAL ROOMS" value={`${rooms.length * 30} Rooms`} icon={<Bed size={20} />} tone="primary" />
        <KPICard title="OCCUPIED BEDS" value={`${occupiedBedsCount} Occupied`} icon={<CheckCircle2 size={20} />} tone="success" />
        <KPICard title="AVAILABLE BEDS" value={`${availableBedsCount} Vacant`} icon={<Bed size={20} />} tone="warning" />
        <KPICard title="TODAY'S ATTENDANCE" value="98.5% Present" icon={<Calendar size={20} />} tone="success" />
        <KPICard title="VISITORS TODAY" value={`${visitors.length} Visitors`} icon={<Users size={20} />} tone="info" />
        <KPICard title="PENDING COMPLAINTS" value={`${openComplaintsCount} Open`} icon={<AlertTriangle size={20} />} tone="warning" />
        <KPICard title="MAINTENANCE REQUESTS" value={`${complaints.filter((c) => c.status === 'In Progress').length} In Progress`} icon={<Wrench size={20} />} tone="warning" />
        <KPICard title="PENDING HOSTEL FEES" value={`${pendingFeesCount} Dues`} icon={<FileText size={20} />} tone="danger" />
        <KPICard title="MEDICAL CASES" value={medicalCases.length.toString()} icon={<HeartPulse size={20} />} tone="danger" />
        <KPICard title="DISCIPLINARY CASES" value={incidents.length.toString()} icon={<ShieldAlert size={20} />} tone="warning" />
      </div>

      {/* 3. Quick Actions Toolbar */}
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '20px' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 800, margin: '0 0 14px 0', color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          ⚡ Hostel Manager Quick Desk Actions
        </h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          <button onClick={() => setActiveModal('allocate')} style={quickBtnStyle}>+ Allocate Room</button>
          <button onClick={() => navigate('/hostel/allocation')} style={quickBtnStyle}>⇄ Transfer Student</button>
          <button onClick={() => navigate('/hostel/attendance')} style={quickBtnStyle}>📋 Mark Night Roll Call</button>
          <button onClick={() => setActiveModal('visitor')} style={quickBtnStyle}>👤 Register Visitor</button>
          <button onClick={() => setActiveModal('gatepass')} style={quickBtnStyle}>🎫 Issue Gate Pass</button>
          <button onClick={() => setActiveModal('complaint')} style={quickBtnStyle}>🔧 Log Complaint</button>
          <button onClick={() => setActiveModal('medical')} style={quickBtnStyle}>🏥 Log Medical Emergency</button>
          <button onClick={() => navigate('/hostel/fees')} style={quickBtnStyle}>💳 Collect Hostel Fee</button>
          <button onClick={() => navigate('/hostel/reports')} style={quickBtnStyle}>📊 Generate Report</button>
        </div>
      </div>

      {/* 4. Split View: Night Roll Call Status & Visitors / Complaints */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px' }}>
        
        {/* Visitors & Gate Pass Desk */}
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Users size={18} color="#6366F1" />
              Active Campus Visitors & Gate Passes
            </h3>
            <button onClick={() => navigate('/hostel/visitors')} style={linkBtnStyle}>View All ({visitors.length}) →</button>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12.5px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-secondary)', textAlign: 'left' }}>
                  <th style={{ padding: '8px' }}>Visitor</th>
                  <th style={{ padding: '8px' }}>Student / Room</th>
                  <th style={{ padding: '8px' }}>Entry Time</th>
                  <th style={{ padding: '8px' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {visitors.map((v) => (
                  <tr key={v.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '10px 8px' }}>
                      <strong style={{ color: 'var(--text-primary)', display: 'block' }}>{v.visitorName}</strong>
                      <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{v.relation}</span>
                    </td>
                    <td style={{ padding: '10px 8px' }}>
                      <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{v.studentName}</span>
                      <span style={{ fontSize: '11px', color: 'var(--text-secondary)', display: 'block' }}>Room {v.studentRoom}</span>
                    </td>
                    <td style={{ padding: '10px 8px', color: 'var(--text-primary)' }}>{v.entryTime}</td>
                    <td style={{ padding: '10px 8px' }}>
                      <span style={{
                        padding: '2px 8px', borderRadius: '10px', fontSize: '10.5px', fontWeight: 700,
                        background: v.status === 'In Campus' ? '#EEF2FF' : '#D1FAE5',
                        color: v.status === 'In Campus' ? '#4F46E5' : '#059669',
                      }}>
                        {v.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* AI Residency Intelligence Panel */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(99,102,241,0.06) 0%, rgba(16,185,129,0.04) 100%)',
          border: '1px solid rgba(99,102,241,0.2)', borderRadius: '16px', padding: '20px',
          display: 'flex', flexDirection: 'column', gap: '14px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)', fontWeight: 800, fontSize: '15px' }}>
              <Sparkles size={18} style={{ color: '#6366F1' }} />
              AI Hostel Residency & Curfew Telematics
            </div>
            <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '12px', background: '#6366F1', color: '#FFF' }}>
              Live Telematics
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {aiInsights.map((insight) => (
              <div key={insight.id} style={{ background: 'var(--bg-surface)', padding: '12px 14px', borderRadius: '12px', border: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px', fontWeight: 800, color: '#4F46E5' }}>{insight.title}</span>
                  {insight.metric && (
                    <span style={{ fontSize: '10.5px', fontWeight: 700, background: '#EEF2FF', color: '#4F46E5', padding: '2px 8px', borderRadius: '10px' }}>
                      {insight.metric}
                    </span>
                  )}
                </div>
                <p style={{ fontSize: '11.5px', color: 'var(--text-secondary)', margin: 0 }}>
                  {insight.description}
                </p>
                {insight.actionText && (
                  <button
                    onClick={() => navigate('/hostel/attendance')}
                    style={{ alignSelf: 'flex-start', marginTop: '4px', border: 'none', background: 'none', color: '#2563EB', fontSize: '11px', fontWeight: 700, cursor: 'pointer', padding: 0 }}
                  >
                    {insight.actionText} →
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5. Bottom Section: Complaints Queue & Live Activity */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px' }}>
        {/* Pending Maintenance & Complaints Queue */}
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Wrench size={18} color="#F59E0B" />
              Room Complaints & Maintenance Work Orders ({complaints.length})
            </h3>
            <button onClick={() => navigate('/hostel/complaints')} style={linkBtnStyle}>View All →</button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {complaints.map((c) => (
              <div key={c.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', background: 'var(--bg-surface-raised)', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
                <div>
                  <span style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--text-primary)', display: 'block' }}>Room {c.roomNumber} • {c.category}</span>
                  <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{c.description}</span>
                </div>
                <span style={{ padding: '3px 10px', borderRadius: '12px', background: c.status === 'Resolved' ? '#D1FAE5' : '#FEF3C7', color: c.status === 'Resolved' ? '#059669' : '#D97706', fontSize: '11px', fontWeight: 800 }}>
                  {c.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Live Activity Feed */}
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '20px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 800, margin: '0 0 14px 0', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Building size={18} color="#6366F1" />
            Live Hostel Activity Feed
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {activities.slice(0, 5).map((act) => (
              <div key={act.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '12px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: act.badgeColor || '#6366F1', marginTop: '5px', flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, color: 'var(--text-primary)', fontWeight: 500, lineHeight: 1.4 }}>{act.message}</p>
                  <span style={{ fontSize: '10px', color: '#9CA3AF' }}>{act.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────────────────
          MODALS FOR QUICK ACTIONS
         ───────────────────────────────────────────────────────────────────────────── */}

      {/* Allocate Room Modal */}
      {activeModal === 'allocate' && (
        <ModalWrapper title="Allocate Room to Student" onClose={() => setActiveModal(null)}>
          <form onSubmit={handleAllocateSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <label style={labelStyle}>Student Full Name</label>
              <input type="text" value={allocStudentName} onChange={(e) => setAllocStudentName(e.target.value)} style={inputStyle} placeholder="e.g. Rahul Sharma" required />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={labelStyle}>Class Grade</label>
                <input type="text" value={allocClassGrade} onChange={(e) => setAllocClassGrade(e.target.value)} style={inputStyle} required />
              </div>
              <div>
                <label style={labelStyle}>Select Building Block</label>
                <select value={allocBuilding} onChange={(e) => setAllocBuilding(e.target.value)} style={inputStyle}>
                  {buildings.map((b) => (
                    <option key={b.id} value={b.buildingName}>{b.buildingName}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label style={labelStyle}>Select Available Room</label>
              <select value={allocRoom} onChange={(e) => setAllocRoom(e.target.value)} style={inputStyle}>
                {rooms.map((r) => (
                  <option key={r.id} value={r.roomNumber}>{r.roomNumber} ({r.roomType} — {r.availableBeds} beds vacant)</option>
                ))}
              </select>
            </div>
            <button type="submit" style={submitBtnStyle}>Confirm & Allocate Room</button>
          </form>
        </ModalWrapper>
      )}

      {/* Register Visitor Modal */}
      {activeModal === 'visitor' && (
        <ModalWrapper title="Register Campus Visitor" onClose={() => setActiveModal(null)}>
          <form onSubmit={handleVisitorSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <label style={labelStyle}>Visitor Name</label>
              <input type="text" value={visitorName} onChange={(e) => setVisitorName(e.target.value)} style={inputStyle} placeholder="e.g. Ramesh Patel" required />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={labelStyle}>Relation with Student</label>
                <input type="text" value={visitorRelation} onChange={(e) => setVisitorRelation(e.target.value)} style={inputStyle} placeholder="e.g. Father" required />
              </div>
              <div>
                <label style={labelStyle}>Visitor Phone</label>
                <input type="text" value={visPhone} onChange={(e) => setVisPhone(e.target.value)} style={inputStyle} placeholder="+91 98000 00000" required />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={labelStyle}>Resident Student Name</label>
                <input type="text" value={visStudentName} onChange={(e) => setVisStudentName(e.target.value)} style={inputStyle} placeholder="e.g. Siya Patel" required />
              </div>
              <div>
                <label style={labelStyle}>Student Room Number</label>
                <input type="text" value={visRoom} onChange={(e) => setVisRoom(e.target.value)} style={inputStyle} placeholder="B-201" required />
              </div>
            </div>
            <button type="submit" style={submitBtnStyle}>Register Visitor & Generate Pass</button>
          </form>
        </ModalWrapper>
      )}

      {/* Issue Gate Pass Modal */}
      {activeModal === 'gatepass' && (
        <ModalWrapper title="Issue Student Gate Pass" onClose={() => setActiveModal(null)}>
          <form onSubmit={handleGatePassSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <label style={labelStyle}>Student Name</label>
              <input type="text" value={passStudentName} onChange={(e) => setPassStudentName(e.target.value)} style={inputStyle} placeholder="e.g. Aarav Sharma" required />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={labelStyle}>Pass Type</label>
                <select value={passType} onChange={(e) => setPassType(e.target.value as any)} style={inputStyle}>
                  <option value="Local Outing">Local Outing</option>
                  <option value="Weekend Leave">Weekend Leave</option>
                  <option value="Emergency Outing">Emergency Outing</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Room Number</label>
                <input type="text" value={passRoom} onChange={(e) => setPassRoom(e.target.value)} style={inputStyle} required />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={labelStyle}>Out Time</label>
                <input type="text" value={passOutTime} onChange={(e) => setPassOutTime(e.target.value)} style={inputStyle} required />
              </div>
              <div>
                <label style={labelStyle}>Expected Return Time</label>
                <input type="text" value={passExpTime} onChange={(e) => setPassExpTime(e.target.value)} style={inputStyle} required />
              </div>
            </div>
            <button type="submit" style={submitBtnStyle}>Issue Approved Gate Pass</button>
          </form>
        </ModalWrapper>
      )}

      {/* Log Complaint Modal */}
      {activeModal === 'complaint' && (
        <ModalWrapper title="Log Student Grievance / Repair Complaint" onClose={() => setActiveModal(null)}>
          <form onSubmit={handleComplaintSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={labelStyle}>Student Name</label>
                <input type="text" value={cmpStudentName} onChange={(e) => setCmpStudentName(e.target.value)} style={inputStyle} placeholder="e.g. Aarav Sharma" required />
              </div>
              <div>
                <label style={labelStyle}>Room Number</label>
                <input type="text" value={cmpRoom} onChange={(e) => setCmpRoom(e.target.value)} style={inputStyle} required />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={labelStyle}>Category</label>
                <select value={cmpCategory} onChange={(e) => setCmpCategory(e.target.value as any)} style={inputStyle}>
                  <option value="Electrical">Electrical</option>
                  <option value="Plumbing">Plumbing</option>
                  <option value="Carpentry & Furniture">Carpentry & Furniture</option>
                  <option value="Cleaning & Hygiene">Cleaning & Hygiene</option>
                  <option value="Wi-Fi / Internet">Wi-Fi / Internet</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Priority</label>
                <select value={cmpPriority} onChange={(e) => setCmpPriority(e.target.value as any)} style={inputStyle}>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Emergency">Emergency</option>
                </select>
              </div>
            </div>
            <div>
              <label style={labelStyle}>Complaint Description</label>
              <input type="text" value={cmpDesc} onChange={(e) => setCmpDesc(e.target.value)} style={inputStyle} placeholder="e.g. Bathroom tap leaking heavily." required />
            </div>
            <button type="submit" style={submitBtnStyle}>Create Work Order</button>
          </form>
        </ModalWrapper>
      )}

      {/* Log Medical Emergency Modal */}
      {activeModal === 'medical' && (
        <ModalWrapper title="Log Medical Emergency Alert" onClose={() => setActiveModal(null)}>
          <form onSubmit={handleMedicalSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={labelStyle}>Student Name</label>
                <input type="text" value={medStudentName} onChange={(e) => setMedStudentName(e.target.value)} style={inputStyle} placeholder="e.g. Siya Patel" required />
              </div>
              <div>
                <label style={labelStyle}>Room Number</label>
                <input type="text" value={medRoom} onChange={(e) => setMedRoom(e.target.value)} style={inputStyle} required />
              </div>
            </div>
            <div>
              <label style={labelStyle}>Symptoms / Medical Emergency Details</label>
              <input type="text" value={medSymptoms} onChange={(e) => setMedSymptoms(e.target.value)} style={inputStyle} placeholder="e.g. High fever (103°F) and breathing difficulty." required />
            </div>
            <div>
              <label style={labelStyle}>Severity Level</label>
              <select value={medSeverity} onChange={(e) => setMedSeverity(e.target.value as any)} style={inputStyle}>
                <option value="Mild">Mild</option>
                <option value="Moderate">Moderate</option>
                <option value="Severe">Severe</option>
                <option value="Critical">Critical</option>
              </select>
            </div>
            <button type="submit" style={{ ...submitBtnStyle, background: '#DC2626' }}>Dispatch Medical Emergency Alert</button>
          </form>
        </ModalWrapper>
      )}
    </div>
  );
}

function ModalWrapper({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex',
      alignItems: 'center', justifyContent: 'center', padding: '16px'
    }}>
      <div style={{
        background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)',
        borderRadius: '16px', padding: '24px', width: '100%', maxWidth: '480px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ margin: 0, fontSize: '17px', fontWeight: 800, color: 'var(--text-primary)' }}>{title}</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}>
            <X size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

const quickBtnStyle: React.CSSProperties = {
  padding: '9px 14px',
  borderRadius: '8px',
  border: '1px solid var(--border-subtle)',
  background: 'var(--bg-surface-raised)',
  color: 'var(--text-primary)',
  fontSize: '12px',
  fontWeight: 700,
  cursor: 'pointer',
};

const linkBtnStyle: React.CSSProperties = {
  background: 'none',
  border: 'none',
  color: '#2563EB',
  fontSize: '12px',
  fontWeight: 700,
  cursor: 'pointer',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '12px',
  fontWeight: 700,
  color: 'var(--text-primary)',
  marginBottom: '4px',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px 12px',
  borderRadius: '8px',
  border: '1px solid var(--border-subtle)',
  background: 'var(--bg-surface-raised)',
  color: 'var(--text-primary)',
  fontSize: '13px',
  boxSizing: 'border-box',
};

const submitBtnStyle: React.CSSProperties = {
  padding: '11px',
  borderRadius: '8px',
  border: 'none',
  background: '#6366F1',
  color: '#FFF',
  fontWeight: 700,
  fontSize: '13px',
  cursor: 'pointer',
  marginTop: '6px',
};
