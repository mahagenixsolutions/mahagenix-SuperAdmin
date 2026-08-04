import React, { useState } from 'react';
import { PageLayout } from '../../components/erp/PageLayout';
import { FilterBar } from '../../components/erp/FilterBar';
import { DataGrid } from '../../components/erp/DataGrid';
import type { GridColumn } from '../../components/erp/DataGrid';
import { DetailDrawer } from '../../components/erp/DetailDrawer';
import { StatusBadge } from '../../components/erp/StatusBadge';
import { Tabs } from '../../components/ui/Tabs';
import { 
  FileText, Users, Calendar, Award, CheckCircle, Clock, ShieldCheck, Check, X, Bookmark, 
  ChevronRight, UserPlus, ClipboardCheck, BarChart2, Megaphone, HelpCircle, FilePlus, UserCheck
} from 'lucide-react';

interface ApplicantDoc {
  name: string;
  status: 'success' | 'warning' | 'danger';
  statusLabel: string;
}

interface InterviewInfo {
  date: string;
  time: string;
  interviewer: string;
  status: 'success' | 'warning' | 'danger';
  statusLabel: string;
  remarks: string;
}

interface Applicant {
  id: string;
  name: string;
  grade: string;
  parentName: string;
  phone: string;
  email: string;
  appliedDate: string;
  docs: ApplicantDoc[];
  interview: InterviewInfo;
  status: 'success' | 'warning' | 'danger' | 'info';
  statusLabel: 'Approved' | 'Under Review' | 'Rejected' | 'Waitlisted';
}

const initialApplicants: Applicant[] = [
  {
    id: 'APP-001',
    name: 'Rohan Gupta',
    grade: 'Class 1',
    parentName: 'Amit Gupta',
    phone: '+91 98765 00122',
    email: 'amit.gupta@outlook.com',
    appliedDate: '2026-06-22',
    docs: [
      { name: 'Birth Certificate', status: 'success', statusLabel: 'Verified' },
      { name: 'Previous School TC', status: 'success', statusLabel: 'Verified' },
      { name: 'Parent ID Proof', status: 'warning', statusLabel: 'Pending' }
    ],
    interview: {
      date: '2026-07-05',
      time: '10:00 AM',
      interviewer: 'Sarah Jenkins (HOD)',
      status: 'warning',
      statusLabel: 'Scheduled',
      remarks: 'Awaiting parent-candidate panel interview'
    },
    status: 'warning',
    statusLabel: 'Under Review'
  },
  {
    id: 'APP-002',
    name: 'Sanya Malhotra',
    grade: 'Class 5',
    parentName: 'Raj Malhotra',
    phone: '+91 98765 00987',
    email: 'raj.m@gmail.com',
    appliedDate: '2026-06-19',
    docs: [
      { name: 'Birth Certificate', status: 'success', statusLabel: 'Verified' },
      { name: 'Marks Sheet Grade 4', status: 'success', statusLabel: 'Verified' }
    ],
    interview: {
      date: '2026-06-28',
      time: '11:30 AM',
      interviewer: 'Principal Vance',
      status: 'success',
      statusLabel: 'Completed',
      remarks: 'Candidate scored exceptionally in reasoning test. Strongly recommended.'
    },
    status: 'info',
    statusLabel: 'Waitlisted'
  },
  {
    id: 'APP-003',
    name: 'Aditya Roy',
    grade: 'Class 3',
    parentName: 'Vikram Roy',
    phone: '+91 98765 11234',
    email: 'vikram.roy@yahoo.com',
    appliedDate: '2026-06-12',
    docs: [
      { name: 'Birth Certificate', status: 'danger', statusLabel: 'Rejected (Illegible)' },
      { name: 'Transfer Certificate', status: 'warning', statusLabel: 'Pending' }
    ],
    interview: {
      date: '2026-07-02',
      time: '02:00 PM',
      interviewer: 'Dr. Aris Vance',
      status: 'warning',
      statusLabel: 'Scheduled',
      remarks: 'Requires documentation re-upload before interview proceeds.'
    },
    status: 'warning',
    statusLabel: 'Under Review'
  }
];

const AdmissionsPage: React.FC = () => {
  const [applicants, setApplicants] = useState<Applicant[]>(initialApplicants);
  const [activeHubTab, setActiveHubTab] = useState<'dashboard' | 'applications' | 'waiting'>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);
  const [detailTab, setDetailTab] = useState<'profile' | 'documents' | 'interview' | 'approval'>('profile');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Workflow updates
  const handleVerifyDoc = (docName: string) => {
    if (!selectedApplicant) return;
    setApplicants(prev => prev.map(app => {
      if (app.id === selectedApplicant.id) {
        return {
          ...app,
          docs: app.docs.map(doc => doc.name === docName ? { ...doc, status: 'success', statusLabel: 'Verified' } : doc)
        };
      }
      return app;
    }));
    triggerToast(`✅ ${docName} successfully verified.`);
    // Sync active drawer view
    setSelectedApplicant(prev => prev ? {
      ...prev,
      docs: prev.docs.map(doc => doc.name === docName ? { ...doc, status: 'success', statusLabel: 'Verified' } : doc)
    } : null);
  };

  const handleWorkflowAction = (action: 'approve' | 'reject' | 'waitlist') => {
    if (!selectedApplicant) return;
    setIsLoading(true);
    let statusValue: 'success' | 'danger' | 'info' = 'success';
    let statusLabelValue: 'Approved' | 'Rejected' | 'Waitlisted' = 'Approved';
    if (action === 'reject') {
      statusValue = 'danger';
      statusLabelValue = 'Rejected';
    } else if (action === 'waitlist') {
      statusValue = 'info';
      statusLabelValue = 'Waitlisted';
    }

    setApplicants(prev => prev.map(app => {
      if (app.id === selectedApplicant.id) {
        return { ...app, status: statusValue, statusLabel: statusLabelValue };
      }
      return app;
    }));

    setTimeout(() => {
      setIsLoading(false);
      setSelectedApplicant(null);
      triggerToast(`✨ Application pipeline status updated to ${statusLabelValue}!`);
    }, 1200);
  };

  // Filter applicant directory list
  const filteredApplicants = applicants.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          app.parentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          app.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGrade = selectedGrade ? app.grade === selectedGrade : true;
    const matchesStatus = selectedStatus ? app.statusLabel === selectedStatus : true;
    return matchesSearch && matchesGrade && matchesStatus;
  });

  const columns: GridColumn<Applicant>[] = [
    {
      key: 'id',
      header: 'App ID',
      sortable: true
    },
    {
      key: 'name',
      header: 'Applicant Name',
      sortable: true,
      render: (row) => (
        <div>
          <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{row.name}</div>
          <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Parent: {row.parentName}</div>
        </div>
      )
    },
    {
      key: 'grade',
      header: 'Applying Grade',
      sortable: true
    },
    {
      key: 'appliedDate',
      header: 'Applied Date',
      sortable: true
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (row) => <StatusBadge status={row.status} label={row.statusLabel} />
    }
  ];

  return (
    <PageLayout>
      {toastMessage && (
        <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 9999 }}>
          <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 10, padding: '12px 20px', boxShadow: 'var(--shadow-lg)' }}>
            <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)' }}>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Redesigned Custom Header matching mockup */}
      <div style={{
        background: 'transparent',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '24px 0',
        borderBottom: '1px solid var(--border-subtle)',
        fontFamily: 'Inter, sans-serif',
        gap: '24px',
        flexWrap: 'wrap',
      }}>
        {/* Left Side Header Text */}
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '16px',
            background: 'rgba(99, 102, 241, 0.08)',
            color: '#4f46e5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 10px rgba(99, 102, 241, 0.05)',
          }}>
            <FileText size={28} />
          </div>
          <div>
            <h1 style={{ fontSize: '26px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
              Admissions Hub
            </h1>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: '6px 0 0 0', lineHeight: 1.4, maxWidth: '600px' }}>
              Manage new application pipelines, interview schedules, document checks, and waiting lists efficiently.
            </p>
          </div>
        </div>

        {/* Right Side Header Graphic Illustration */}
        <div style={{
          width: '260px',
          height: '110px',
          opacity: 0.95,
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}>
          <svg viewBox="0 0 200 100" width="100%" height="100%">
            {/* Clipboard checklist container */}
            <rect x="110" y="10" width="50" height="70" rx="6" fill="#F1F5F9" stroke="#94A3B8" strokeWidth={1.5} />
            <rect x="120" y="6" width="30" height="8" rx="2" fill="#475569" />
            
            {/* Checklist items */}
            <circle cx="122" cy="28" r="3" fill="#10B981" />
            <line x1="130" y1="28" x2="152" y2="28" stroke="#94A3B8" strokeWidth={2} strokeLinecap="round" />
            
            <circle cx="122" cy="44" r="3" fill="#10B981" />
            <line x1="130" y1="44" x2="152" y2="44" stroke="#94A3B8" strokeWidth={2} strokeLinecap="round" />

            <circle cx="122" cy="60" r="3" fill="#3B82F6" />
            <line x1="130" y1="60" x2="146" y2="60" stroke="#94A3B8" strokeWidth={2} strokeLinecap="round" />

            {/* Folder Mockup */}
            <path d="M30,35 L90,35 L90,85 L30,85 Z" fill="#4F46E5" opacity="0.85" />
            <path d="M30,35 L60,35 L65,42 L90,42 L90,85 L30,85 Z" fill="#6366F1" />
            <rect x="42" y="48" width="36" height="26" rx="3" fill="#ffffff" />
            
            {/* User Silhouette on ID card */}
            <circle cx="50" cy="58" r="5" fill="#f97316" />
            <path d="M42,69 C42,65 46,65 50,65 C54,65 58,65 58,69 Z" fill="#f97316" />
            <circle cx="70" cy="62" r="4" fill="#10B981" />
            <path d="M68,62 L70,64 L73,60" fill="none" stroke="#ffffff" strokeWidth={1} />
          </svg>
        </div>
      </div>

      {/* Hub Navigation Tabs */}
      <Tabs
        tabs={[
          { id: 'dashboard', label: 'Admission Dashboard', icon: <Award size={15} /> },
          { id: 'applications', label: 'Applications Pipeline', icon: <FileText size={15} /> },
          { id: 'waiting', label: 'Waiting List', icon: <Bookmark size={15} /> },
        ]}
        activeTab={activeHubTab}
        onChange={(id) => setActiveHubTab(id as any)}
        variant="default"
        style={{ marginTop: '24px' }}
      />

      <div style={{ marginTop: '24px' }}>
        {/* Tab 1: Dashboard View */}
        {activeHubTab === 'dashboard' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* KPI Cards Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
              
              {/* Card 1: Total Applications */}
              <div style={{
                background: '#ffffff',
                border: '1px solid var(--border-subtle)',
                borderRadius: '16px',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                fontFamily: 'Inter, sans-serif',
                position: 'relative',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '50%',
                    background: 'rgba(99, 102, 241, 0.1)', color: '#4F46E5',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <FileText size={18} />
                  </div>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-secondary)' }}>Total Applications</span>
                </div>
                <div style={{ fontSize: '32px', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>3</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
                  <span style={{ fontSize: '12px', color: 'var(--accent-success)', fontWeight: 700 }}>↑ 50% <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>vs last month</span></span>
                  <svg width="50" height="20" style={{ display: 'block' }}>
                    <path d="M0,18 Q12,12 25,15 T50,2" fill="none" stroke="#6366F1" strokeWidth={2} />
                  </svg>
                </div>
              </div>

              {/* Card 2: Pending Review */}
              <div style={{
                background: '#ffffff',
                border: '1px solid var(--border-subtle)',
                borderRadius: '16px',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                fontFamily: 'Inter, sans-serif',
                position: 'relative',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '50%',
                    background: 'rgba(245, 158, 11, 0.1)', color: '#F59E0B',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Clock size={18} />
                  </div>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-secondary)' }}>Pending Review</span>
                </div>
                <div style={{ fontSize: '32px', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>2</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
                  <span style={{ fontSize: '12px', color: '#F59E0B', fontWeight: 700 }}>↑ 100% <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>vs last month</span></span>
                  <svg width="50" height="20" style={{ display: 'block' }}>
                    <path d="M0,18 Q12,16 25,10 T50,4" fill="none" stroke="#F59E0B" strokeWidth={2} />
                  </svg>
                </div>
              </div>

              {/* Card 3: Waitlisted */}
              <div style={{
                background: '#ffffff',
                border: '1px solid var(--border-subtle)',
                borderRadius: '16px',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                fontFamily: 'Inter, sans-serif',
                position: 'relative',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '50%',
                    background: 'rgba(14, 165, 233, 0.1)', color: '#0EA5E9',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Bookmark size={18} />
                  </div>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-secondary)' }}>Waitlisted</span>
                </div>
                <div style={{ fontSize: '32px', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>1</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
                  <span style={{ fontSize: '12px', color: 'var(--accent-danger)', fontWeight: 700 }}>↓ 33% <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>vs last month</span></span>
                  <svg width="50" height="20" style={{ display: 'block' }}>
                    <path d="M0,4 Q12,6 25,14 T50,18" fill="none" stroke="#0EA5E9" strokeWidth={2} />
                  </svg>
                </div>
              </div>

              {/* Card 4: Approved */}
              <div style={{
                background: '#ffffff',
                border: '1px solid var(--border-subtle)',
                borderRadius: '16px',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                fontFamily: 'Inter, sans-serif',
                position: 'relative',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '50%',
                    background: 'rgba(34, 197, 94, 0.1)', color: '#22C55E',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <CheckCircle size={18} />
                  </div>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-secondary)' }}>Approved</span>
                </div>
                <div style={{ fontSize: '32px', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>0</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
                  <span style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 700 }}>— 0% <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>vs last month</span></span>
                  <svg width="50" height="20" style={{ display: 'block' }}>
                    <path d="M0,15 L50,15" fill="none" stroke="#10B981" strokeWidth={2} />
                  </svg>
                </div>
              </div>

            </div>

            {/* Split row: Pipeline Overview & Quick Actions */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1.4fr 1fr',
              gap: '24px',
              width: '100%',
              flexWrap: 'wrap',
            }}>
              
              {/* Pipeline Overview Card */}
              <div className="card" style={{
                background: '#ffffff',
                border: '1px solid var(--border-subtle)',
                borderRadius: '16px',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                fontFamily: 'Inter, sans-serif',
                gap: '24px',
              }}>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                    Pipeline Overview
                  </h3>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>
                    Track and manage applications through each stage of the admission process.
                  </p>
                </div>

                {/* Pipeline visual nodes row */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '10px 0',
                  gap: '12px',
                  overflowX: 'auto',
                }}>
                  {[
                    { label: 'New Applications', value: '3', pct: '100%', icon: <FilePlus size={18} />, color: '#4F46E5', bg: 'rgba(99, 102, 241, 0.08)', pctBg: 'rgba(99, 102, 241, 0.1)' },
                    { label: 'Under Review', value: '2', pct: '67%', icon: <UserCheck size={18} />, color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.08)', pctBg: 'rgba(245, 158, 11, 0.1)' },
                    { label: 'Interviews', value: '1', pct: '33%', icon: <Users size={18} />, color: '#8B5CF6', bg: 'rgba(139, 92, 246, 0.08)', pctBg: 'rgba(139, 92, 246, 0.1)' },
                    { label: 'Waitlisted', value: '1', pct: '33%', icon: <Bookmark size={18} />, color: '#0EA5E9', bg: 'rgba(14, 165, 233, 0.08)', pctBg: 'rgba(14, 165, 233, 0.1)' },
                    { label: 'Approved', value: '0', pct: '0%', icon: <CheckCircle size={18} />, color: '#22C55E', bg: 'rgba(34, 197, 94, 0.08)', pctBg: 'rgba(34, 197, 94, 0.1)' },
                  ].map((node, index, arr) => (
                    <React.Fragment key={index}>
                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '6px',
                        textAlign: 'center',
                        flex: 1,
                        minWidth: '90px',
                      }}>
                        <div style={{
                          width: '44px',
                          height: '44px',
                          borderRadius: '50%',
                          background: node.bg,
                          color: node.color,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                          {node.icon}
                        </div>
                        <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {node.label}
                        </span>
                        <span style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)' }}>
                          {node.value}
                        </span>
                        <span style={{
                          fontSize: '11px',
                          fontWeight: 700,
                          padding: '2px 8px',
                          borderRadius: '6px',
                          background: node.pctBg,
                          color: node.color,
                        }}>
                          {node.pct}
                        </span>
                      </div>
                      
                      {index < arr.length - 1 && (
                        <div style={{
                          fontSize: '16px',
                          color: 'var(--text-muted)',
                          fontWeight: 600,
                          userSelect: 'none',
                          paddingBottom: '30px',
                        }}>
                          ➔
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                {/* Pipeline Footer Info Banner */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: 'var(--bg-canvas)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '12px',
                  padding: '12px 16px',
                  fontSize: '13px',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)' }}>
                    <HelpCircle size={16} style={{ color: '#4F46E5' }} />
                    <span>Configure document checklists, conduct interviews, and move applications through the pipeline.</span>
                  </div>
                  <button
                    onClick={() => setActiveHubTab('applications')}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#4F46E5',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '13px',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    View Pipeline <ChevronRight size={14} />
                  </button>
                </div>

              </div>

              {/* Quick Actions Card */}
              <div className="card" style={{
                background: '#ffffff',
                border: '1px solid var(--border-subtle)',
                borderRadius: '16px',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                fontFamily: 'Inter, sans-serif',
                gap: '16px',
              }}>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                  Quick Actions
                </h3>
                
                {/* Actions Items List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {[
                    { title: 'Add New Application', desc: 'Register a new applicant', icon: <UserPlus size={16} />, color: '#3B82F6', bg: 'rgba(59, 130, 246, 0.08)' },
                    { title: 'Schedule Interview', desc: 'Book an interview slot', icon: <Calendar size={16} />, color: '#10B981', bg: 'rgba(16, 185, 129, 0.08)' },
                    { title: 'Document Checklist', desc: 'Verify required documents', icon: <ClipboardCheck size={16} />, color: '#8B5CF6', bg: 'rgba(139, 92, 246, 0.08)' },
                    { title: 'View Reports', desc: 'Check admission analytics', icon: <BarChart2 size={16} />, color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.08)' },
                    { title: 'Send Announcement', desc: 'Notify applicants or parents', icon: <Megaphone size={16} />, color: '#EC4899', bg: 'rgba(236, 72, 153, 0.08)' },
                  ].map((action, idx) => (
                    <div
                      key={idx}
                      onClick={() => alert(`Opening action: ${action.title}...`)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '12px 16px',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        background: '#ffffff',
                        transition: 'background 0.2s, border-color 0.2s',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'var(--bg-canvas)';
                        e.currentTarget.style.borderColor = 'rgba(79, 70, 229, 0.2)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = '#ffffff';
                        e.currentTarget.style.borderColor = 'var(--border-subtle)';
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <div style={{
                          width: '34px',
                          height: '34px',
                          borderRadius: '8px',
                          background: action.bg,
                          color: action.color,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                          {action.icon}
                        </div>
                        <div>
                          <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>{action.title}</div>
                          <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '1px' }}>{action.desc}</div>
                        </div>
                      </div>
                      <ChevronRight size={14} style={{ color: 'var(--text-muted)' }} />
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Bottom Streamline Promo Banner */}
            <div style={{
              background: 'linear-gradient(90deg, rgba(99, 102, 241, 0.06) 0%, rgba(139, 92, 246, 0.06) 100%)',
              border: '1px solid rgba(99, 102, 241, 0.12)',
              borderRadius: '16px',
              padding: '20px 24px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontFamily: 'Inter, sans-serif',
              gap: '20px',
              flexWrap: 'wrap',
            }}>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  background: 'rgba(99, 102, 241, 0.1)',
                  color: '#4F46E5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                    Streamline Your Admission Process
                  </h4>
                  <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>
                    Use the pipeline to move applications efficiently and keep parents informed at every step.
                  </p>
                </div>
              </div>

              <button
                onClick={() => alert('Opening admissions guidebook...')}
                style={{
                  background: '#6366F1',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '10px 20px',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 2px 8px rgba(99, 102, 241, 0.25)',
                }}
              >
                Learn More
              </button>
            </div>

          </div>
        )}

        {/* Tab 2: Applications Pipeline */}
        {activeHubTab === 'applications' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <FilterBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              searchPlaceholder="Search applicants by name, ID or parent..."
              dropdowns={[
                {
                  name: 'grade',
                  label: 'Grades',
                  options: [
                    { value: 'Class 1', label: 'Class 1' },
                    { value: 'Class 3', label: 'Class 3' },
                    { value: 'Class 5', label: 'Class 5' }
                  ],
                  value: selectedGrade,
                  onChange: setSelectedGrade
                },
                {
                  name: 'status',
                  label: 'Status',
                  options: [
                    { value: 'Under Review', label: 'Under Review' },
                    { value: 'Approved', label: 'Approved' },
                    { value: 'Waitlisted', label: 'Waitlisted' }
                  ],
                  value: selectedStatus,
                  onChange: setSelectedStatus
                }
              ]}
            />

            <DataGrid
              columns={columns}
              data={filteredApplicants}
              keyField="id"
              actions={(row) => (
                <button 
                  className="btn btn-ghost btn-sm"
                  onClick={() => {
                    setSelectedApplicant(row);
                    setDetailTab('profile');
                  }}
                  style={{ border: '1px solid var(--border-subtle)' }}
                >
                  Process Flow
                </button>
              )}
            />
          </div>
        )}

        {/* Tab 3: Waiting List */}
        {activeHubTab === 'waiting' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <DataGrid
              columns={columns}
              data={applicants.filter(a => a.statusLabel === 'Waitlisted')}
              keyField="id"
              emptyState={
                <div style={{ padding: '60px 24px', textAlign: 'center' }}>
                  <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '15px' }}>No applicants currently placed on the waiting list.</p>
                </div>
              }
              actions={(row) => (
                <button 
                  className="btn btn-ghost btn-sm"
                  onClick={() => {
                    setSelectedApplicant(row);
                    setDetailTab('approval');
                  }}
                  style={{ border: '1px solid var(--border-subtle)' }}
                >
                  Manage Approval
                </button>
              )}
            />
          </div>
        )}
      </div>

      {/* Applicant Flow Drawer */}
      <DetailDrawer
        isOpen={!!selectedApplicant}
        onClose={() => setSelectedApplicant(null)}
        title={selectedApplicant ? `Processing ${selectedApplicant.name} [${selectedApplicant.id}]` : ''}
      >
        {selectedApplicant && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Drawer Tabs */}
            <Tabs
              tabs={[
                { id: 'profile', label: 'Profile', icon: <Users size={14} /> },
                { id: 'documents', label: 'Documents', icon: <ShieldCheck size={14} /> },
                { id: 'interview', label: 'Interview', icon: <Calendar size={14} /> },
                { id: 'approval', label: 'Approval Roll', icon: <CheckCircle size={14} /> },
              ]}
              activeTab={detailTab}
              onChange={(id) => setDetailTab(id as any)}
              variant="fullWidth"
            />

            {/* Tab Panes */}
            <div style={{ minHeight: '280px' }}>
              
              {/* Profile Details */}
              {detailTab === 'profile' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '13px' }}>
                  <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Candidate Profile</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px dashed var(--border-subtle)' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Full Name</span>
                      <strong style={{ color: 'var(--text-primary)' }}>{selectedApplicant.name}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px dashed var(--border-subtle)' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Applying Grade</span>
                      <strong style={{ color: 'var(--text-primary)' }}>{selectedApplicant.grade}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px dashed var(--border-subtle)' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Primary Parent</span>
                      <strong style={{ color: 'var(--text-primary)' }}>{selectedApplicant.parentName}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px dashed var(--border-subtle)' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Phone Number</span>
                      <strong style={{ color: 'var(--text-primary)' }}>{selectedApplicant.phone}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Email Address</span>
                      <strong style={{ color: 'var(--text-primary)' }}>{selectedApplicant.email}</strong>
                    </div>
                  </div>
                </div>
              )}

              {/* Document Verification */}
              {detailTab === 'documents' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <h4 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <ShieldCheck size={14} /> Document Verification Checklist
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {selectedApplicant.docs.map((doc, idx) => (
                      <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', background: 'var(--bg-surface-raised)' }}>
                        <div>
                          <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>{doc.name}</div>
                          <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '2px' }}>Check status: <StatusBadge status={doc.status} label={doc.statusLabel} /></div>
                        </div>
                        {doc.statusLabel !== 'Verified' && (
                          <button 
                            className="btn btn-ghost btn-sm"
                            onClick={() => handleVerifyDoc(doc.name)}
                            style={{ border: '1px solid var(--border-subtle)' }}
                          >
                            Mark Verified
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Interviews */}
              {detailTab === 'interview' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <h4 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Calendar size={14} /> Scheduled Evaluation Interview
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px dashed var(--border-subtle)' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Interview Date</span>
                      <strong style={{ color: 'var(--text-primary)' }}>{selectedApplicant.interview.date}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px dashed var(--border-subtle)' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Time Slot</span>
                      <strong style={{ color: 'var(--text-primary)' }}>{selectedApplicant.interview.time}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px dashed var(--border-subtle)' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Assigned Interviewer</span>
                      <strong style={{ color: 'var(--text-primary)' }}>{selectedApplicant.interview.interviewer}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px dashed var(--border-subtle)' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Evaluation Status</span>
                      <StatusBadge status={selectedApplicant.interview.status} label={selectedApplicant.interview.statusLabel} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Remarks & Notes</span>
                      <p style={{ background: 'var(--bg-surface-raised)', border: '1px solid var(--border-subtle)', padding: '12px', borderRadius: '8px', margin: 0, fontSize: '12px', lineHeight: 1.4 }}>
                        {selectedApplicant.interview.remarks}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Approval Workflow Console */}
              {detailTab === 'approval' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <h4 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Approval Workflow Controls</h4>
                  <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                    Please review document verification status and evaluation interview remarks prior to making an admission decision.
                  </p>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
                    <button 
                      className="btn btn-primary"
                      disabled={isLoading}
                      onClick={() => handleWorkflowAction('approve')}
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', height: '40px' }}
                    >
                      <Check size={16} /> Approve & Enroll Student
                    </button>
                    <button 
                      className="btn btn-secondary"
                      disabled={isLoading}
                      onClick={() => handleWorkflowAction('waitlist')}
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', height: '40px', border: '1px solid var(--border-subtle)' }}
                    >
                      <Bookmark size={15} /> Move to Waiting List
                    </button>
                    <button 
                      className="btn btn-ghost"
                      disabled={isLoading}
                      onClick={() => handleWorkflowAction('reject')}
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', height: '40px', border: '1px solid var(--accent-danger)', color: 'var(--accent-danger)' }}
                    >
                      <X size={16} /> Reject Application
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}
      </DetailDrawer>
    </PageLayout>
  );
};

export default AdmissionsPage;
