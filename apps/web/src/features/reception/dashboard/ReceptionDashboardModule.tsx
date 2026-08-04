import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users, Calendar, Phone, Mail, FileText, CheckCircle2,
  Sparkles, Plus, Clock, ShieldAlert, Award, UserCheck, Search, HelpCircle, Bell, X, ShieldCheck
} from 'lucide-react';
import { KPICard } from '../../../components/erp/KPICard';
import { useReceptionStore } from '../shared/receptionStore';
import type { VisitorPass, AdmissionEnquiry, AppointmentRecord, CertificateRecord, GatePassRecord, PhoneCallLog, CommunicationMessage } from '../shared/types';

export default function ReceptionDashboardModule() {
  const navigate = useNavigate();
  const {
    enquiries,
    visitors,
    appointments,
    studentRequests,
    parentTickets,
    certificates,
    gatePasses,
    callLogs,
    communications,
    announcements,
    aiInsights,
    activities,
    toastMessage,
    createEnquiry,
    registerVisitor,
    checkOutVisitor,
    bookAppointment,
    issueCertificate,
    issueGatePass,
    logPhoneCall,
    sendCommunication,
  } = useReceptionStore();

  // Modals State
  const [activeModal, setActiveModal] = useState<'visitor' | 'enquiry' | 'appointment' | 'certificate' | 'gatepass' | 'call' | 'comm' | null>(null);

  // Form States
  const [visName, setVisName] = useState('');
  const [visPhone, setVisPhone] = useState('');
  const [visRelation, setVisRelation] = useState('Parent / Prospect');
  const [visPurpose, setVisPurpose] = useState<VisitorPass['purpose']>('Admission Inquiry');
  const [visHost, setVisHost] = useState('Mrs. Sunita Deshmukh (Admission Counsellor)');
  const [visIdType, setVisIdType] = useState<VisitorPass['idProofType']>('Aadhaar Card');
  const [visIdNum, setVisIdNum] = useState('');

  const [enqStudent, setEnqStudent] = useState('');
  const [enqParent, setEnqParent] = useState('');
  const [enqPhone, setEnqPhone] = useState('');
  const [enqEmail, setEnqEmail] = useState('');
  const [enqGrade, setEnqGrade] = useState('Class 6');
  const [enqChannel, setEnqChannel] = useState<AdmissionEnquiry['channel']>('Walk-in');

  const [aptVisitor, setAptVisitor] = useState('');
  const [aptRelation, setAptRelation] = useState('Parent');
  const [aptPhone, setAptPhone] = useState('');
  const [aptHost, setAptHost] = useState('Dr. Ramesh Chandra');
  const [aptRole, setAptRole] = useState<AppointmentRecord['hostRole']>('Principal');
  const [aptDate, setAptDate] = useState('2026-07-24');
  const [aptTime, setAptTime] = useState('11:00 AM - 11:30 AM');
  const [aptPurpose, setAptPurpose] = useState('Academic progress meeting');

  const [certStudentId, setCertStudentId] = useState('STU-104');
  const [certStudentName, setCertStudentName] = useState('');
  const [certGrade, setCertGrade] = useState('Class 10-A');
  const [certType, setCertType] = useState<CertificateRecord['certificateType']>('Bonafide Certificate');

  const [passPerson, setPassPerson] = useState('');
  const [passType, setPassType] = useState<GatePassRecord['passType']>('Student Exit Pass');
  const [passReason, setPassReason] = useState('Medical appointment');
  const [passTime, setPassTime] = useState('02:30 PM');

  const [callCaller, setCallCaller] = useState('');
  const [callPhone, setCallPhone] = useState('');
  const [callType, setCallType] = useState<PhoneCallLog['callType']>('Incoming');
  const [callDept, setCallDept] = useState<PhoneCallLog['recipientDepartment']>('Admissions');
  const [callNotes, setCallNotes] = useState('');
  const [callFollowUp, setCallFollowUp] = useState(true);

  const [commChannel, setCommChannel] = useState<CommunicationMessage['channel']>('SMS');
  const [commGroup, setCommGroup] = useState<CommunicationMessage['recipientGroup']>('All Parents');
  const [commSubject, setCommSubject] = useState('');
  const [commContent, setCommContent] = useState('');

  // KPI Calculations
  const inCampusVisitorsCount = visitors.filter((v) => v.status === 'In Campus').length;
  const todayAppointmentsCount = appointments.length;
  const pendingRequestsCount = studentRequests.filter((r) => r.status !== 'Issued').length;
  const pendingCertificatesCount = certificates.filter((c) => c.status !== 'Delivered').length;

  const handleVisitorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!visName || !visPhone) return;
    registerVisitor(visName, visPhone, visRelation, visPurpose, visHost, visIdType, visIdNum || 'XXXX-XXXX-1234');
    setActiveModal(null);
    setVisName('');
    setVisPhone('');
  };

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!enqStudent || !enqParent) return;
    createEnquiry(enqStudent, enqParent, enqPhone || '+91 98000 00000', enqEmail || 'parent@school.edu', enqGrade, enqChannel);
    setActiveModal(null);
    setEnqStudent('');
    setEnqParent('');
  };

  const handleAppointmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aptVisitor) return;
    bookAppointment(aptVisitor, aptRelation, aptPhone || '+91 98000 00000', aptHost, aptRole, aptDate, aptTime, aptPurpose);
    setActiveModal(null);
    setAptVisitor('');
  };

  const handleCertificateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certStudentName) return;
    issueCertificate(certStudentId, certStudentName, certGrade, certType);
    setActiveModal(null);
    setCertStudentName('');
  };

  const handleGatePassSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passPerson) return;
    issueGatePass(passPerson, passType, passReason, passTime);
    setActiveModal(null);
    setPassPerson('');
  };

  const handleCallSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!callCaller) return;
    logPhoneCall(callCaller, callPhone || '+91 98000 00000', callType, callDept, callNotes || 'General query handled', callFollowUp);
    setActiveModal(null);
    setCallCaller('');
  };

  const handleCommSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commSubject || !commContent) return;
    sendCommunication(commChannel, commGroup, commSubject, commContent);
    setActiveModal(null);
    setCommSubject('');
    setCommContent('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', fontFamily: '"Outfit", sans-serif' }}>
      {toastMessage && (
        <div style={{
          position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999,
          background: '#0284C7', color: '#FFF',
          borderRadius: '12px', padding: '12px 20px', boxShadow: '0 10px 25px rgba(2,132,199,0.3)',
          display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, fontSize: '13px'
        }}>
          <CheckCircle2 size={18} />
          {toastMessage}
        </div>
      )}

      {/* 1. Hero Overview Section */}
      <div style={{
        background: 'linear-gradient(135deg, #0284C7 0%, #0369A1 100%)',
        borderRadius: '16px', padding: '24px', color: '#FFF', display: 'flex',
        justify: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px',
        boxShadow: '0 8px 24px rgba(3,105,161,0.25)'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 10px', borderRadius: '12px', background: 'rgba(255,255,255,0.2)', color: '#BAE6FD' }}>
              ● Academic Session 2025–2026
            </span>
            <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 10px', borderRadius: '12px', background: 'rgba(16,185,129,0.3)', color: '#D1FAE5' }}>
              Front Office Health Score: 98.2% • Visitors Active in Campus: {inCampusVisitorsCount}
            </span>
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: 800, margin: '6px 0', letterSpacing: '-0.5px' }}>
            Reception & Front Office Command Center
          </h2>
          <p style={{ fontSize: '13px', color: '#BAE6FD', margin: 0, maxWidth: '650px' }}>
            Campus reception hub: walk-in admission enquiries, visitor badges, Principal appointments, student certificate generation, call logging, and gate pass permits.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setActiveModal('visitor')}
            style={{ padding: '10px 18px', borderRadius: '10px', border: 'none', background: '#0284C7', color: '#FFF', fontWeight: 700, fontSize: '13px', cursor: 'pointer', boxShadow: '0 4px 12px rgba(2,132,199,0.3)' }}
          >
            + Register Visitor Pass
          </button>
          <button
            onClick={() => setActiveModal('enquiry')}
            style={{ padding: '10px 18px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.15)', color: '#FFF', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}
          >
            + Admission Lead ({enquiries.length}) →
          </button>
        </div>
      </div>

      {/* 2. 12 KPI Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '14px' }}>
        <KPICard title="TODAY'S VISITORS" value={`${visitors.length} Visitors`} icon={<Users size={20} />} trend={{ value: `${inCampusVisitorsCount} In Campus`, isPositive: true }} />
        <KPICard title="ADMISSION ENQUIRIES" value={`${enquiries.length} Leads`} icon={<UserCheck size={20} />} tone="success" />
        <KPICard title="APPOINTMENTS TODAY" value={`${todayAppointmentsCount} Meetings`} icon={<Calendar size={20} />} tone="info" />
        <KPICard title="PENDING FOLLOW-UPS" value={`${enquiries.filter((e) => e.counsellingStatus === 'New Lead').length} Leads`} icon={<Clock size={20} />} tone="warning" />
        <KPICard title="PENDING CERTIFICATES" value={`${pendingCertificatesCount} Pending`} icon={<FileText size={20} />} tone="warning" />
        <KPICard title="PHONE CALLS HANDLED" value={`${callLogs.length} Calls`} icon={<Phone size={20} />} tone="success" />
        <KPICard title="STUDENT REQUESTS" value={`${pendingRequestsCount} Open`} icon={<HelpCircle size={20} />} tone="warning" />
        <KPICard title="PARENT HELP TICKETS" value={`${parentTickets.length} Tickets`} icon={<Users size={20} />} tone="info" />
        <KPICard title="GATE PASSES ISSUED" value={`${gatePasses.length} Passes`} icon={<Award size={20} />} tone="primary" />
        <KPICard title="COMMUNICATIONS SENT" value={`${communications.length} Broadcasts`} icon={<Mail size={20} />} tone="success" />
        <KPICard title="ANNOUNCEMENTS ACTIVE" value={`${announcements.length} Active`} icon={<Bell size={20} />} tone="info" />
        <KPICard title="RECEPTION EFFICIENCY" value="98.2% Optimal" icon={<CheckCircle2 size={20} />} tone="success" />
      </div>

      {/* 3. Quick Actions Bar */}
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '20px' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 800, margin: '0 0 14px 0', color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          ⚡ Receptionist Quick Desk Actions
        </h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          <button onClick={() => setActiveModal('visitor')} style={quickBtnStyle}>👤 Register Visitor</button>
          <button onClick={() => setActiveModal('enquiry')} style={quickBtnStyle}>📝 Create Admission Enquiry</button>
          <button onClick={() => setActiveModal('appointment')} style={quickBtnStyle}>📅 Book Appointment</button>
          <button onClick={() => setActiveModal('certificate')} style={quickBtnStyle}>📄 Issue Certificate</button>
          <button onClick={() => setActiveModal('gatepass')} style={quickBtnStyle}>🎫 Issue Gate Pass</button>
          <button onClick={() => setActiveModal('call')} style={quickBtnStyle}>📞 Record Phone Call</button>
          <button onClick={() => setActiveModal('comm')} style={quickBtnStyle}>✉️ Send SMS / Email</button>
          <button onClick={() => navigate('/reception/reports')} style={quickBtnStyle}>📊 Generate Report</button>
        </div>
      </div>

      {/* 4. Split View: Active Visitors & Today's Appointments */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px' }}>
        
        {/* Visitors Desk Table */}
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Users size={18} color="#0284C7" />
              Active Campus Visitors Log ({visitors.length})
            </h3>
            <button onClick={() => navigate('/reception/visitors')} style={linkBtnStyle}>View All →</button>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12.5px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-secondary)', textAlign: 'left' }}>
                  <th style={{ padding: '8px' }}>Badge #</th>
                  <th style={{ padding: '8px' }}>Visitor Name</th>
                  <th style={{ padding: '8px' }}>Host Employee</th>
                  <th style={{ padding: '8px' }}>Check In</th>
                  <th style={{ padding: '8px' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {visitors.map((v) => (
                  <tr key={v.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '10px 8px', fontFamily: 'monospace', fontWeight: 800 }}>{v.badgeNumber}</td>
                    <td style={{ padding: '10px 8px' }}>
                      <strong style={{ color: 'var(--text-primary)', display: 'block' }}>{v.visitorName}</strong>
                      <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{v.purpose}</span>
                    </td>
                    <td style={{ padding: '10px 8px', color: 'var(--text-primary)' }}>{v.hostEmployee}</td>
                    <td style={{ padding: '10px 8px', color: 'var(--text-primary)' }}>{v.checkInTime}</td>
                    <td style={{ padding: '10px 8px' }}>
                      {v.status === 'In Campus' ? (
                        <button
                          onClick={() => checkOutVisitor(v.id)}
                          style={{ border: 'none', background: '#10B981', color: '#FFF', padding: '4px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}
                        >
                          Check Out
                        </button>
                      ) : (
                        <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Exited ({v.checkOutTime})</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* AI Front-Office Intelligence Panel */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(2,132,199,0.06) 0%, rgba(16,185,129,0.04) 100%)',
          border: '1px solid rgba(2,132,199,0.2)', borderRadius: '16px', padding: '20px',
          display: 'flex', flexDirection: 'column', gap: '14px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)', fontWeight: 800, fontSize: '15px' }}>
              <Sparkles size={18} style={{ color: '#0284C7' }} />
              AI Front-Office Telematics & Lead Intelligence
            </div>
            <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '12px', background: '#0284C7', color: '#FFF' }}>
              Live Intelligence
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {aiInsights.map((insight) => (
              <div key={insight.id} style={{ background: 'var(--bg-surface)', padding: '12px 14px', borderRadius: '12px', border: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px', fontWeight: 800, color: '#0284C7' }}>{insight.title}</span>
                  {insight.metric && (
                    <span style={{ fontSize: '10.5px', fontWeight: 700, background: '#E0F2FE', color: '#0284C7', padding: '2px 8px', borderRadius: '10px' }}>
                      {insight.metric}
                    </span>
                  )}
                </div>
                <p style={{ fontSize: '11.5px', color: 'var(--text-secondary)', margin: 0 }}>
                  {insight.description}
                </p>
                {insight.actionText && (
                  <button
                    onClick={() => navigate('/reception/enquiries')}
                    style={{ alignSelf: 'flex-start', marginTop: '4px', border: 'none', background: 'none', color: '#0284C7', fontSize: '11px', fontWeight: 700, cursor: 'pointer', padding: 0 }}
                  >
                    {insight.actionText} →
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5. Bottom Section: Admissions Enquiries & Live Activity */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px' }}>
        {/* Admission Leads Desk */}
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <UserCheck size={18} color="#10B981" />
              Recent Admission Enquiries & Leads ({enquiries.length})
            </h3>
            <button onClick={() => navigate('/reception/enquiries')} style={linkBtnStyle}>View All →</button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {enquiries.map((e) => (
              <div key={e.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', background: 'var(--bg-surface-raised)', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
                <div>
                  <span style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--text-primary)', display: 'block' }}>{e.studentName} ({e.interestedGrade}) • {e.parentName}</span>
                  <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Ref {e.enquiryNumber} • Source: {e.channel}</span>
                </div>
                <span style={{ padding: '3px 10px', borderRadius: '12px', background: '#D1FAE5', color: '#059669', fontSize: '11px', fontWeight: 800 }}>
                  {e.counsellingStatus}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Live Activity Feed */}
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '20px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 800, margin: '0 0 14px 0', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Clock size={18} color="#0284C7" />
            Live Front Office Activity Log
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {activities.slice(0, 5).map((act) => (
              <div key={act.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '12px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: act.badgeColor || '#0284C7', marginTop: '5px', flexShrink: 0 }} />
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
          MODALS FOR QUICK DESK ACTIONS
         ───────────────────────────────────────────────────────────────────────────── */}

      {/* Register Visitor Modal */}
      {activeModal === 'visitor' && (
        <ModalWrapper title="Register Visitor & Issue Pass" onClose={() => setActiveModal(null)}>
          <form onSubmit={handleVisitorSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <label style={labelStyle}>Visitor Full Name</label>
              <input type="text" value={visName} onChange={(e) => setVisName(e.target.value)} style={inputStyle} placeholder="e.g. Rohan Varma" required />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={labelStyle}>Visitor Phone</label>
                <input type="text" value={visPhone} onChange={(e) => setVisPhone(e.target.value)} style={inputStyle} placeholder="+91 98765 43210" required />
              </div>
              <div>
                <label style={labelStyle}>Relation / Role</label>
                <input type="text" value={visRelation} onChange={(e) => setVisRelation(e.target.value)} style={inputStyle} required />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={labelStyle}>Purpose of Visit</label>
                <select value={visPurpose} onChange={(e) => setVisPurpose(e.target.value as any)} style={inputStyle}>
                  <option value="Admission Inquiry">Admission Inquiry</option>
                  <option value="Parent Meeting">Parent Meeting</option>
                  <option value="Vendor Meeting">Vendor Meeting</option>
                  <option value="Official Work">Official Work</option>
                  <option value="Student Pickup">Student Pickup</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Host Employee</label>
                <input type="text" value={visHost} onChange={(e) => setVisHost(e.target.value)} style={inputStyle} required />
              </div>
            </div>
            <button type="submit" style={submitBtnStyle}>Register Visitor & Print Badge</button>
          </form>
        </ModalWrapper>
      )}

      {/* Create Admission Enquiry Modal */}
      {activeModal === 'enquiry' && (
        <ModalWrapper title="Create Admission Lead" onClose={() => setActiveModal(null)}>
          <form onSubmit={handleEnquirySubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={labelStyle}>Student Full Name</label>
                <input type="text" value={enqStudent} onChange={(e) => setEnqStudent(e.target.value)} style={inputStyle} placeholder="e.g. Kabir Varma" required />
              </div>
              <div>
                <label style={labelStyle}>Parent / Guardian Name</label>
                <input type="text" value={enqParent} onChange={(e) => setEnqParent(e.target.value)} style={inputStyle} placeholder="e.g. Rohan Varma" required />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={labelStyle}>Contact Phone</label>
                <input type="text" value={enqPhone} onChange={(e) => setEnqPhone(e.target.value)} style={inputStyle} placeholder="+91 98000 00000" required />
              </div>
              <div>
                <label style={labelStyle}>Interested Grade</label>
                <input type="text" value={enqGrade} onChange={(e) => setEnqGrade(e.target.value)} style={inputStyle} required />
              </div>
            </div>
            <div>
              <label style={labelStyle}>Lead Source Channel</label>
              <select value={enqChannel} onChange={(e) => setEnqChannel(e.target.value as any)} style={inputStyle}>
                <option value="Walk-in">Walk-in</option>
                <option value="Online Form">Online Form</option>
                <option value="Phone Call">Phone Call</option>
                <option value="Referral">Referral</option>
              </select>
            </div>
            <button type="submit" style={submitBtnStyle}>Create Admission Lead</button>
          </form>
        </ModalWrapper>
      )}

      {/* Book Appointment Modal */}
      {activeModal === 'appointment' && (
        <ModalWrapper title="Book Principal / Faculty Appointment" onClose={() => setActiveModal(null)}>
          <form onSubmit={handleAppointmentSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <label style={labelStyle}>Visitor / Parent Name</label>
              <input type="text" value={aptVisitor} onChange={(e) => setAptVisitor(e.target.value)} style={inputStyle} placeholder="e.g. Dr. Meena Swaminathan" required />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={labelStyle}>Select Host Role</label>
                <select value={aptRole} onChange={(e) => setAptRole(e.target.value as any)} style={inputStyle}>
                  <option value="Principal">Principal</option>
                  <option value="Vice Principal">Vice Principal</option>
                  <option value="Academic Coordinator">Academic Coordinator</option>
                  <option value="Class Teacher">Class Teacher</option>
                  <option value="Counsellor">Counsellor</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Host Name</label>
                <input type="text" value={aptHost} onChange={(e) => setAptHost(e.target.value)} style={inputStyle} required />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={labelStyle}>Date</label>
                <input type="date" value={aptDate} onChange={(e) => setAptDate(e.target.value)} style={inputStyle} required />
              </div>
              <div>
                <label style={labelStyle}>Time Slot</label>
                <input type="text" value={aptTime} onChange={(e) => setAptTime(e.target.value)} style={inputStyle} required />
              </div>
            </div>
            <div>
              <label style={labelStyle}>Meeting Purpose</label>
              <input type="text" value={aptPurpose} onChange={(e) => setAptPurpose(e.target.value)} style={inputStyle} required />
            </div>
            <button type="submit" style={submitBtnStyle}>Confirm Appointment</button>
          </form>
        </ModalWrapper>
      )}

      {/* Issue Certificate Modal */}
      {activeModal === 'certificate' && (
        <ModalWrapper title="Issue Official Certificate" onClose={() => setActiveModal(null)}>
          <form onSubmit={handleCertificateSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={labelStyle}>Student Full Name</label>
                <input type="text" value={certStudentName} onChange={(e) => setCertStudentName(e.target.value)} style={inputStyle} placeholder="e.g. Aarav Sharma" required />
              </div>
              <div>
                <label style={labelStyle}>Class Grade</label>
                <input type="text" value={certGrade} onChange={(e) => setCertGrade(e.target.value)} style={inputStyle} required />
              </div>
            </div>
            <div>
              <label style={labelStyle}>Select Certificate Type</label>
              <select value={certType} onChange={(e) => setCertType(e.target.value as any)} style={inputStyle}>
                <option value="Bonafide Certificate">Bonafide Certificate</option>
                <option value="Transfer Certificate">Transfer Certificate</option>
                <option value="Study Certificate">Study Certificate</option>
                <option value="Character Certificate">Character Certificate</option>
                <option value="Fee Payment Certificate">Fee Payment Certificate</option>
              </select>
            </div>
            <button type="submit" style={submitBtnStyle}>Generate & Print Certificate</button>
          </form>
        </ModalWrapper>
      )}

      {/* Issue Gate Pass Modal */}
      {activeModal === 'gatepass' && (
        <ModalWrapper title="Issue Gate Exit Pass" onClose={() => setActiveModal(null)}>
          <form onSubmit={handleGatePassSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <label style={labelStyle}>Person Name (Student / Visitor)</label>
              <input type="text" value={passPerson} onChange={(e) => setPassPerson(e.target.value)} style={inputStyle} placeholder="e.g. Aarav Sharma" required />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={labelStyle}>Pass Type</label>
                <select value={passType} onChange={(e) => setPassType(e.target.value as any)} style={inputStyle}>
                  <option value="Student Exit Pass">Student Exit Pass</option>
                  <option value="Visitor Exit Pass">Visitor Exit Pass</option>
                  <option value="Parent Pickup Pass">Parent Pickup Pass</option>
                  <option value="Staff Exit Pass">Staff Exit Pass</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Out Time</label>
                <input type="text" value={passTime} onChange={(e) => setPassTime(e.target.value)} style={inputStyle} required />
              </div>
            </div>
            <div>
              <label style={labelStyle}>Reason for Exit</label>
              <input type="text" value={passReason} onChange={(e) => setPassReason(e.target.value)} style={inputStyle} required />
            </div>
            <button type="submit" style={submitBtnStyle}>Issue Approved Gate Pass</button>
          </form>
        </ModalWrapper>
      )}

      {/* Record Phone Call Modal */}
      {activeModal === 'call' && (
        <ModalWrapper title="Log Phone Call" onClose={() => setActiveModal(null)}>
          <form onSubmit={handleCallSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={labelStyle}>Caller Name</label>
                <input type="text" value={callCaller} onChange={(e) => setCallCaller(e.target.value)} style={inputStyle} placeholder="e.g. Sunita Rao" required />
              </div>
              <div>
                <label style={labelStyle}>Caller Phone</label>
                <input type="text" value={callPhone} onChange={(e) => setCallPhone(e.target.value)} style={inputStyle} placeholder="+91 98000 00000" required />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={labelStyle}>Call Direction</label>
                <select value={callType} onChange={(e) => setCallType(e.target.value as any)} style={inputStyle}>
                  <option value="Incoming">Incoming</option>
                  <option value="Outgoing">Outgoing</option>
                  <option value="Missed">Missed</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Department</label>
                <select value={callDept} onChange={(e) => setCallDept(e.target.value as any)} style={inputStyle}>
                  <option value="Admissions">Admissions</option>
                  <option value="Principal Office">Principal Office</option>
                  <option value="Accounts">Accounts</option>
                  <option value="Transport">Transport</option>
                  <option value="General Inquiry">General Inquiry</option>
                </select>
              </div>
            </div>
            <div>
              <label style={labelStyle}>Call Notes</label>
              <input type="text" value={callNotes} onChange={(e) => setCallNotes(e.target.value)} style={inputStyle} placeholder="e.g. Inquired about fee structure." required />
            </div>
            <button type="submit" style={submitBtnStyle}>Log Phone Call</button>
          </form>
        </ModalWrapper>
      )}

      {/* Send Communication Modal */}
      {activeModal === 'comm' && (
        <ModalWrapper title="Send SMS / Email Communication" onClose={() => setActiveModal(null)}>
          <form onSubmit={handleCommSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={labelStyle}>Channel</label>
                <select value={commChannel} onChange={(e) => setCommChannel(e.target.value as any)} style={inputStyle}>
                  <option value="SMS">SMS</option>
                  <option value="Email">Email</option>
                  <option value="Broadcast Circular">Broadcast Circular</option>
                  <option value="Emergency Alert">Emergency Alert</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Target Group</label>
                <select value={commGroup} onChange={(e) => setCommGroup(e.target.value as any)} style={inputStyle}>
                  <option value="All Parents">All Parents</option>
                  <option value="Class 10 Parents">Class 10 Parents</option>
                  <option value="Staff">Staff</option>
                  <option value="Admission Leads">Admission Leads</option>
                </select>
              </div>
            </div>
            <div>
              <label style={labelStyle}>Subject / Title</label>
              <input type="text" value={commSubject} onChange={(e) => setCommSubject(e.target.value)} style={inputStyle} placeholder="e.g. PTM Reminder Notice" required />
            </div>
            <div>
              <label style={labelStyle}>Message Body</label>
              <input type="text" value={commContent} onChange={(e) => setCommContent(e.target.value)} style={inputStyle} placeholder="e.g. Dear Parent, PTM is scheduled on Saturday..." required />
            </div>
            <button type="submit" style={submitBtnStyle}>Send Communication</button>
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
  color: '#0284C7',
  fontSize: '12px',
  fontWeight: 700,
  cursor: 'pointer',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '11px',
  fontWeight: 800,
  color: 'var(--text-secondary)',
  textTransform: 'uppercase',
  marginBottom: '6px',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '9px 12px',
  borderRadius: '8px',
  border: '1px solid var(--border-subtle)',
  background: 'var(--bg-surface-raised)',
  color: 'var(--text-primary)',
  outline: 'none',
  fontSize: '13px',
  boxSizing: 'border-box',
};

const submitBtnStyle: React.CSSProperties = {
  padding: '11px',
  borderRadius: '8px',
  border: 'none',
  background: '#0284C7',
  color: '#FFF',
  fontWeight: 700,
  fontSize: '13px',
  cursor: 'pointer',
  marginTop: '6px',
};
