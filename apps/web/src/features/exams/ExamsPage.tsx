import React, { useState } from 'react';
import { PageLayout } from '../../components/erp/PageLayout';
import { DataGrid } from '../../components/erp/DataGrid';
import type { GridColumn } from '../../components/erp/DataGrid';
import { StatusBadge } from '../../components/erp/StatusBadge';
import { Tabs } from '../../components/ui/Tabs';
import { 
  Plus, Calendar, Award, FileSpreadsheet, Send, ShieldAlert, FileText, CheckCircle, 
  ClipboardList, Check, X, Clock, ChevronRight, Info, Lightbulb, HelpCircle, ArrowRight
} from 'lucide-react';

interface ExamType {
  name: string;
  weightage: string;
  description: string;
}

interface ExamScheduleItem {
  id: string;
  subject: string;
  className: string;
  date: string;
  time: string;
  room: string;
}

interface GradeSystemBracket {
  grade: string;
  range: string;
  points: number;
  remarks: string;
}

interface StudentMarkInput {
  id: string;
  name: string;
  rollNo: string;
  marksObtained: string;
  maxMarks: number;
}

const mockExamTypes: ExamType[] = [
  { name: 'Unit Test I', weightage: '15%', description: 'First term formative assessment tests.' },
  { name: 'Mid Term Examination', weightage: '35%', description: 'Terminal exam block covering first half syllabus.' },
  { name: 'Final Term Examination', weightage: '50%', description: 'Summative annual assessment tests.' }
];

const mockSchedules: ExamScheduleItem[] = [
  { id: 'sch-1', subject: 'Mathematics', className: 'Class 10 A', date: '2026-07-10', time: '09:00 AM - 12:00 PM', room: 'Hall A' },
  { id: 'sch-2', subject: 'Physics', className: 'Class 10 A', date: '2026-07-12', time: '09:00 AM - 12:00 PM', room: 'Hall A' },
  { id: 'sch-3', subject: 'Chemistry', className: 'Class 9 A', date: '2026-07-11', time: '01:00 PM - 04:00 PM', room: 'Hall B' }
];

const mockGrades: GradeSystemBracket[] = [
  { grade: 'A+', range: '90% - 100%', points: 10, remarks: 'Outstanding' },
  { grade: 'A', range: '80% - 89%', points: 9, remarks: 'Excellent' },
  { grade: 'B+', range: '70% - 79%', points: 8, remarks: 'Very Good' },
  { grade: 'B', range: '60% - 69%', points: 7, remarks: 'Good' },
  { grade: 'C', range: '50% - 59%', points: 6, remarks: 'Satisfactory' },
  { grade: 'F', range: 'Below 50%', points: 0, remarks: 'Fail' }
];

const initialMarkInputs: StudentMarkInput[] = [
  { id: 'st-1', name: 'John Doe', rollNo: '10A-01', marksObtained: '', maxMarks: 100 },
  { id: 'st-2', name: 'Rohan Gupta', rollNo: '10A-02', marksObtained: '', maxMarks: 100 },
  { id: 'st-3', name: 'Sanya Malhotra', rollNo: '10A-03', marksObtained: '', maxMarks: 100 }
];

const ExamsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'types' | 'schedule' | 'marks' | 'results'>('types');
  const [marksInputs, setMarksInputs] = useState<StudentMarkInput[]>(initialMarkInputs);
  const [selectedClass, setSelectedClass] = useState('Class 10 A');
  const [selectedSubject, setSelectedSubject] = useState('Mathematics');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSaveMarks = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    triggerToast('📝 Committing marks ledger to portal registry...');
    setTimeout(() => {
      setIsLoading(false);
      triggerToast('✅ Student marks successfully recorded!');
    }, 1200);
  };

  const handleGenerateResults = () => {
    setIsLoading(true);
    triggerToast('⚡ Executing GPAs compiling algorithm...');
    setTimeout(() => {
      setIsLoading(false);
      triggerToast('🎉 Term 1 Results compiled and published successfully!');
    }, 1500);
  };

  const scheduleColumns: GridColumn<ExamScheduleItem>[] = [
    { key: 'subject', header: 'Subject', sortable: true },
    { key: 'className', header: 'Class Room', sortable: true },
    { key: 'date', header: 'Exam Date', sortable: true },
    { key: 'time', header: 'Timings' },
    { key: 'room', header: 'Assigned Hall', sortable: true }
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
        background: '#ffffff',
        border: '1px solid var(--border-subtle)',
        borderRadius: '16px',
        padding: '24px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.02)',
        fontFamily: 'Inter, sans-serif',
        marginBottom: '24px',
        flexWrap: 'wrap',
        gap: '24px',
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
          }}>
            <ClipboardList size={28} />
          </div>
          <div>
            <h1 style={{ fontSize: '26px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
              Exams & Grading Portal
            </h1>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: '6px 0 0 0', lineHeight: 1.4, maxWidth: '600px' }}>
              Schedule examinations, verify candidate hall tickets, record subject marks, and release final GPA results.
            </p>
          </div>
        </div>

        {/* Right Side Header Graphic Illustration */}
        <div style={{
          display: 'flex',
          gap: '20px',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}>
          {/* SVG Illustration: Checklist clipboard, pencil, graduation cap, books stack */}
          <div style={{
            width: '240px',
            height: '90px',
            opacity: 0.95,
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
            <svg viewBox="0 0 200 100" width="100%" height="100%">
              {/* Clipboard checklist */}
              <rect x="110" y="10" width="45" height="70" rx="5" fill="#F8FAFC" stroke="#94A3B8" strokeWidth={1.5} />
              <rect x="120" y="6" width="25" height="8" rx="2" fill="#475569" />
              <circle cx="120" cy="28" r="3" fill="#10B981" />
              <line x1="128" y1="28" x2="148" y2="28" stroke="#94A3B8" strokeWidth={2} strokeLinecap="round" />
              <circle cx="120" cy="44" r="3" fill="#10B981" />
              <line x1="128" y1="44" x2="148" y2="44" stroke="#94A3B8" strokeWidth={2} strokeLinecap="round" />
              <circle cx="120" cy="60" r="3" fill="#10B981" />
              <line x1="128" y1="60" x2="142" y2="60" stroke="#94A3B8" strokeWidth={2} strokeLinecap="round" />
              
              {/* Pencil */}
              <path d="M165,30 L170,25 L175,30 L170,35 Z" fill="#F59E0B" />
              <line x1="168" y1="32" x2="155" y2="55" stroke="#475569" strokeWidth={2.5} strokeLinecap="round" />
              
              {/* Stacked books with graduation cap */}
              <path d="M30,70 L90,70 L90,82 L30,82 Z" fill="#4F46E5" />
              <path d="M34,58 L86,58 L86,70 L34,70 Z" fill="#8B5CF6" />
              <path d="M60,35 L85,42 L60,49 L35,42 Z" fill="#1E1B4B" />
              <rect x="53" y="44" width="14" height="8" fill="#1E1B4B" />
              <path d="M72,42 L80,48 L80,56" fill="none" stroke="#F59E0B" strokeWidth={1.5} />
            </svg>
          </div>

          <button 
            className="btn btn-primary" 
            style={{
              background: '#4f46e5',
              color: '#ffffff',
              border: 'none',
              borderRadius: '10px',
              padding: '10px 20px',
              fontSize: '14px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 6px -1px rgba(79, 70, 229, 0.25)',
            }}
          >
            <Plus size={16} /> Create Exam Block
          </button>
        </div>
      </div>

      {/* Replaced KPI Summaries Card Row with exact mockup */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '24px',
        marginBottom: '24px'
      }}>
        {/* Card 1: Scheduled Exams */}
        <div style={{
          background: '#ffffff',
          border: '1px solid var(--border-subtle)',
          borderRadius: '16px',
          padding: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          fontFamily: 'Inter, sans-serif',
          position: 'relative',
        }}>
          <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '50%',
              background: 'rgba(59, 130, 246, 0.1)', color: '#3B82F6',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Calendar size={18} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>Scheduled Exams</span>
              <span style={{ fontSize: '32px', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>{mockSchedules.length}</span>
              <div style={{ width: '20px', height: '2px', background: '#3B82F6', borderRadius: '1px' }} />
              <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', marginTop: '10px' }}>This Term</span>
            </div>
          </div>
          <div style={{ alignSelf: 'flex-end', paddingBottom: '4px' }}>
            <svg width="65" height="40">
              <path d="M5,35 Q20,30 35,20 T65,8" fill="none" stroke="#3B82F6" strokeWidth={2} strokeLinecap="round"/>
              <circle cx="65" cy="8" r="3" fill="#3B82F6"/>
            </svg>
          </div>
        </div>

        {/* Card 2: Active Exam Types */}
        <div style={{
          background: '#ffffff',
          border: '1px solid var(--border-subtle)',
          borderRadius: '16px',
          padding: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          fontFamily: 'Inter, sans-serif',
          position: 'relative',
        }}>
          <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '50%',
              background: 'rgba(34, 197, 94, 0.1)', color: '#22C55E',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Award size={18} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>Active Exam Types</span>
              <span style={{ fontSize: '32px', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>{mockExamTypes.length}</span>
              <div style={{ width: '20px', height: '2px', background: '#22C55E', borderRadius: '1px' }} />
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#22C55E', marginTop: '10px' }}>Currently Active</span>
            </div>
          </div>
          <div style={{ alignSelf: 'flex-end', paddingBottom: '4px' }}>
            <svg width="65" height="40">
              <path d="M5,35 Q20,32 35,22 T65,12" fill="none" stroke="#22C55E" strokeWidth={2} strokeLinecap="round"/>
              <circle cx="65" cy="12" r="3" fill="#22C55E"/>
            </svg>
          </div>
        </div>

        {/* Card 3: Dossiers Drafted */}
        <div style={{
          background: '#ffffff',
          border: '1px solid var(--border-subtle)',
          borderRadius: '16px',
          padding: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          fontFamily: 'Inter, sans-serif',
          position: 'relative',
        }}>
          <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '50%',
              background: 'rgba(245, 158, 11, 0.1)', color: '#F59E0B',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <FileText size={18} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>Dossiers Drafted</span>
              <span style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>12 Classes</span>
              <div style={{ width: '20px', height: '2px', background: '#F59E0B', borderRadius: '1px' }} />
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#F59E0B', marginTop: '10px' }}>In Progress</span>
            </div>
          </div>
          <div style={{ alignSelf: 'flex-end', paddingBottom: '4px' }}>
            <svg width="65" height="40">
              <path d="M5,35 Q20,30 35,15 T65,10" fill="none" stroke="#F59E0B" strokeWidth={2} strokeLinecap="round"/>
              <circle cx="65" cy="10" r="3" fill="#F59E0B"/>
            </svg>
          </div>
        </div>

        {/* Card 4: Grades Released */}
        <div style={{
          background: '#ffffff',
          border: '1px solid var(--border-subtle)',
          borderRadius: '16px',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          fontFamily: 'Inter, sans-serif',
          justifyContent: 'space-between',
          gap: '12px',
        }}>
          <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '50%',
              background: 'rgba(139, 92, 246, 0.1)', color: '#8B5CF6',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Send size={18} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>Grades Released</span>
              <span style={{ fontSize: '32px', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>0%</span>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>This Term</span>
            </div>
          </div>
          {/* Progress bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <div style={{ height: '6px', background: 'var(--bg-tertiary)', borderRadius: '3px', overflow: 'hidden', flex: 1 }}>
              <div style={{ width: '0%', height: '100%', background: '#8B5CF6', borderRadius: '3px' }} />
            </div>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', marginLeft: '10px', fontWeight: 700 }}>0%</span>
          </div>
        </div>

      </div>

      {/* Navigation Tabs */}
      <Tabs
        tabs={[
          { id: 'types', label: 'Exam Types & Grading', icon: <Award size={15} /> },
          { id: 'schedule', label: 'Schedules & Hall Tickets', icon: <Calendar size={15} /> },
          { id: 'marks', label: 'Marks Entry Console', icon: <FileSpreadsheet size={15} /> },
          { id: 'results', label: 'Result Generation Engine', icon: <Send size={15} /> },
        ]}
        activeTab={activeTab}
        onChange={(id) => setActiveTab(id as any)}
        variant="default"
        style={{ marginBottom: '20px' }}
      />

      <div style={{ marginTop: '24px' }}>
        {/* Tab 1: Exam Types & Grade system */}
        {activeTab === 'types' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Split layout block: Assessment Formats (Left) & Grading Matrix (Right) */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', flexWrap: 'wrap' }}>
              
              {/* Active Assessment Formats Card */}
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
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Active Assessment Formats</h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {[
                    { name: 'Unit Test I', desc: 'First term formative assessment tests.', pct: '15%', progress: '15', stroke: '#3B82F6', dash: '15, 85', bg: 'rgba(59, 130, 246, 0.08)', color: '#3B82F6', icon: <FileText size={18} /> },
                    { name: 'Mid Term Examination', desc: 'Terminal exam block covering first half syllabus.', pct: '35%', progress: '35', stroke: '#10B981', dash: '35, 65', bg: 'rgba(16, 185, 129, 0.08)', color: '#10B981', icon: <FileSpreadsheet size={18} /> },
                    { name: 'Final Term Examination', desc: 'Summative annual assessment tests.', pct: '50%', progress: '50', stroke: '#F59E0B', dash: '50, 50', bg: 'rgba(245, 158, 11, 0.08)', color: '#F59E0B', icon: <Award size={18} /> }
                  ].map((item, idx) => (
                    <div key={idx} style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '16px',
                      background: 'var(--bg-canvas)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '12px',
                    }}>
                      <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                        <div style={{
                          width: '38px', height: '38px', borderRadius: '8px',
                          background: item.bg, color: item.color,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          {item.icon}
                        </div>
                        <div>
                          <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>{item.name}</div>
                          <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>{item.desc}</div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Weightage</div>
                          <div style={{ fontSize: '14px', fontWeight: 800, color: item.color }}>{item.pct}</div>
                        </div>
                        {/* Circle Progress Loader SVG */}
                        <svg width="32" height="32" viewBox="0 0 36 36">
                          <circle cx="18" cy="18" r="15.915" fill="none" stroke="var(--border-subtle)" strokeWidth="3" />
                          <circle cx="18" cy="18" r="15.915" fill="none" stroke={item.stroke} strokeWidth="3" strokeDasharray={item.dash} strokeDashoffset="25" />
                        </svg>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer Banner */}
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
                    <Lightbulb size={16} style={{ color: '#8B5CF6' }} />
                    <span>Manage exam formats, configure weightage, and track assessment progress.</span>
                  </div>
                  <button
                    onClick={() => alert('Opening formats settings...')}
                    style={{
                      background: 'none', border: 'none', color: '#4F46E5', fontWeight: 700, cursor: 'pointer',
                      display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', whiteSpace: 'nowrap',
                    }}
                  >
                    Manage Formats <ChevronRight size={14} />
                  </button>
                </div>
              </div>

              {/* Reference Grading Matrix Card */}
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
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Reference Grading Matrix</h3>
                    <HelpCircle size={14} style={{ color: 'var(--text-muted)', cursor: 'pointer' }} />
                  </div>
                  {/* Custom styled select dropdown */}
                  <select style={{
                    padding: '6px 12px', border: '1px solid var(--border-subtle)', borderRadius: '8px',
                    fontSize: '12px', color: 'var(--text-primary)', background: 'var(--bg-canvas)', fontWeight: 600
                  }}>
                    <option>Current Term</option>
                    <option>Previous Term</option>
                  </select>
                </div>

                {/* Grading Table */}
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                    <thead>
                      <tr style={{ background: 'var(--bg-canvas)', borderBottom: '1px solid var(--border-subtle)' }}>
                        <th style={{ padding: '8px 12px', color: 'var(--text-muted)', fontSize: '11px', fontWeight: 700 }}>GRADE</th>
                        <th style={{ padding: '8px 12px', color: 'var(--text-muted)', fontSize: '11px', fontWeight: 700 }}>DESCRIPTION</th>
                        <th style={{ padding: '8px 12px', color: 'var(--text-muted)', fontSize: '11px', fontWeight: 700 }}>RANGE (%)</th>
                        <th style={{ padding: '8px 12px', color: 'var(--text-muted)', fontSize: '11px', fontWeight: 700 }}>POINTS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { grade: 'A+', desc: 'Outstanding', range: '90% - 100%', pts: '10', bg: 'rgba(34, 197, 94, 0.08)', color: '#22C55E' },
                        { grade: 'A', desc: 'Excellent', range: '80% - 89%', pts: '9', bg: 'rgba(34, 197, 94, 0.08)', color: '#22C55E' },
                        { grade: 'B+', desc: 'Very Good', range: '70% - 79%', pts: '8', bg: 'rgba(59, 130, 246, 0.08)', color: '#3B82F6' },
                        { grade: 'B', desc: 'Good', range: '60% - 69%', pts: '7', bg: 'rgba(59, 130, 246, 0.08)', color: '#3B82F6' },
                        { grade: 'C', desc: 'Satisfactory', range: '50% - 59%', pts: '6', bg: 'rgba(245, 158, 11, 0.08)', color: '#F59E0B' },
                        { grade: 'F', desc: 'Fail', range: 'Below 50%', pts: '0', bg: 'rgba(239, 68, 68, 0.08)', color: '#EF4444' },
                      ].map((row, idx) => (
                        <tr key={idx} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                          <td style={{ padding: '10px 12px' }}>
                            <span style={{
                              background: row.bg, color: row.color,
                              padding: '2px 8px', borderRadius: '4px', fontWeight: 700, fontSize: '11px'
                            }}>{row.grade}</span>
                          </td>
                          <td style={{ padding: '10px 12px', color: 'var(--text-primary)', fontWeight: 600 }}>{row.desc}</td>
                          <td style={{ padding: '10px 12px', color: 'var(--text-secondary)' }}>{row.range}</td>
                          <td style={{ padding: '10px 12px', color: 'var(--text-primary)', fontWeight: 700 }}>{row.pts}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Footer Banner */}
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
                    <Info size={16} style={{ color: '#3B82F6' }} />
                    <span>Grading system automatically applied to all results.</span>
                  </div>
                  <button
                    onClick={() => alert('Opening grading config...')}
                    style={{
                      background: 'none', border: 'none', color: '#4F46E5', fontWeight: 700, cursor: 'pointer',
                      display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', whiteSpace: 'nowrap',
                    }}
                  >
                    Configure Matrix <ChevronRight size={14} />
                  </button>
                </div>
              </div>

            </div>

            {/* Upcoming Exam Schedule Row (Bottom) */}
            <div className="card" style={{
              background: '#ffffff',
              border: '1px solid var(--border-subtle)',
              borderRadius: '16px',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              fontFamily: 'Inter, sans-serif',
              gap: '20px',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Upcoming Exam Schedule</h3>
                <button
                  onClick={() => setActiveTab('schedule')}
                  style={{
                    background: 'none', border: 'none', color: '#4F46E5', fontSize: '13px',
                    fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px'
                  }}
                >
                  View Full Timetable <ArrowRight size={14} />
                </button>
              </div>

              {/* Horizonal grid row of 3 cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                {[
                  { date: '25', month: 'JUL', title: 'Mid Term Examination', grade: 'Grade 10', time: '09:00 AM - 12:00 PM', tag: '3 Subjects', color: '#8B5CF6', bg: 'rgba(139, 92, 246, 0.08)', dateBg: 'rgba(59, 130, 246, 0.1)', dateColor: '#3B82F6' },
                  { date: '05', month: 'AUG', title: 'Unit Test I', grade: 'Grade 9', time: '10:00 AM - 11:30 AM', tag: '2 Subjects', color: '#10B981', bg: 'rgba(16, 185, 129, 0.08)', dateBg: 'rgba(16, 185, 129, 0.1)', dateColor: '#10B981' },
                  { date: '10', month: 'AUG', title: 'Practical Examination', grade: 'Grades 9 - 10', time: '01:00 PM - 04:00 PM', tag: '4 Subjects', color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.08)', dateBg: 'rgba(245, 158, 11, 0.1)', dateColor: '#F59E0B' },
                ].map((item, idx) => (
                  <div key={idx} style={{
                    padding: '16px',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '12px',
                    background: 'var(--bg-canvas)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                  }}>
                    <div style={{
                      width: '42px', height: '44px', borderRadius: '8px',
                      background: item.dateBg, color: item.dateColor,
                      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <span style={{ fontSize: '9px', fontWeight: 700, opacity: 0.8 }}>{item.month}</span>
                      <span style={{ fontSize: '16px', fontWeight: 800, lineHeight: 1 }}>{item.date}</span>
                    </div>

                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>{item.title}</span>
                        <span style={{
                          fontSize: '9px', fontWeight: 700, padding: '2px 8px', borderRadius: '4px',
                          background: item.bg, color: item.color,
                        }}>{item.tag}</span>
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>{item.grade}</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '3px', marginTop: '4px' }}>
                        <Clock size={10} />
                        <span>{item.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* Tab 2: Schedule & Hall Tickets */}
        {activeTab === 'schedule' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <DataGrid
              columns={scheduleColumns}
              data={mockSchedules}
              keyField="id"
              actions={(row) => (
                <button 
                  className="btn btn-ghost btn-sm"
                  onClick={() => triggerToast(`🎟️ Generating Hall Tickets list PDF for ${row.className}...`)}
                  style={{ border: '1px solid var(--border-subtle)', fontSize: '12px' }}
                >
                  Generate Tickets
                </button>
              )}
            />

            {/* Hall ticket instructions info card */}
            <div className="card" style={{ padding: '20px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', borderLeft: '4px solid var(--accent-primary)' }}>
              <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 8px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldAlert size={16} style={{ color: 'var(--accent-primary)' }} /> Hall Tickets Policy Guidelines
              </h4>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                Hall tickets are automatically configured based on classroom exam schedule seating limits. 
                Generate Hall Tickets action drafts printable cards detailing candidate roll, assigned seat desk indices, and dates schedule.
              </p>
            </div>
          </div>
        )}

        {/* Tab 3: Marks Entry Console */}
        {activeTab === 'marks' && (
          <div className="card" style={{ padding: '20px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px' }}>Terminal Marks Entry Console</h3>
            
            <form onSubmit={handleSaveMarks} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Target Class Room</label>
                  <select value={selectedClass} onChange={e => setSelectedClass(e.target.value)} style={{ padding: '10px 12px', border: '1px solid var(--border-subtle)', borderRadius: '8px', background: 'var(--bg-surface-raised)', color: 'var(--text-primary)', height: '40px' }}>
                    <option value="Class 10 A">Class 10 A</option>
                    <option value="Class 9 A">Class 9 A</option>
                  </select>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Subject</label>
                  <select value={selectedSubject} onChange={e => setSelectedSubject(e.target.value)} style={{ padding: '10px 12px', border: '1px solid var(--border-subtle)', borderRadius: '8px', background: 'var(--bg-surface-raised)', color: 'var(--text-primary)', height: '40px' }}>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                  </select>
                </div>
              </div>

              {/* Marks inputs table */}
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                <thead>
                  <tr style={{ background: 'var(--bg-surface-raised)', borderBottom: '1px solid var(--border-subtle)' }}>
                    <th style={{ padding: '10px 12px', fontWeight: 600 }}>Roll Number</th>
                    <th style={{ padding: '10px 12px', fontWeight: 600 }}>Candidate Name</th>
                    <th style={{ padding: '10px 12px', fontWeight: 600 }}>Max Marks</th>
                    <th style={{ padding: '10px 12px', fontWeight: 600, width: '160px' }}>Marks Obtained</th>
                  </tr>
                </thead>
                <tbody>
                  {marksInputs.map((item) => (
                    <tr key={item.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                      <td style={{ padding: '10px 12px', fontWeight: 600 }}>{item.rollNo}</td>
                      <td style={{ padding: '10px 12px' }}>{item.name}</td>
                      <td style={{ padding: '10px 12px' }}>{item.maxMarks}</td>
                      <td style={{ padding: '8px 12px' }}>
                        <input 
                          type="number"
                          placeholder="Enter score"
                          value={item.marksObtained}
                          onChange={(e) => {
                            const val = e.target.value;
                            setMarksInputs(prev => prev.map(m => m.id === item.id ? { ...m, marksObtained: val } : m));
                          }}
                          style={{ padding: '6px 10px', border: '1px solid var(--border-subtle)', borderRadius: '6px', width: '100%', background: 'var(--bg-surface-raised)', color: 'var(--text-primary)' }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <button type="submit" disabled={isLoading} className="btn btn-primary" style={{ alignSelf: 'flex-end', padding: '10px 24px' }}>
                {isLoading ? 'Saving ledger...' : 'Commit Marks Record'}
              </button>
            </form>
          </div>
        )}

        {/* Tab 4: Result Generation Engine */}
        {activeTab === 'results' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px' }}>
            <div className="card" style={{ padding: '20px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>Compile Term Grade Reports</h3>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '20px' }}>
                This console triggers final calculation sweeps. It compiles overall student averages, calculates CGPA, determines pass/fail marks parameters, and updates report cards in the parental portals.
              </p>
              <button 
                onClick={handleGenerateResults} 
                disabled={isLoading}
                className="btn btn-primary"
                style={{ display: 'flex', gap: '8px', alignItems: 'center' }}
              >
                <CheckCircle size={16} /> Compile & Publish Results
              </button>
            </div>

            <div className="card" style={{ padding: '20px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px' }}>Status Log</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px dashed var(--border-subtle)' }}>
                  <span>Unit Test I Results</span>
                  <StatusBadge status="success" label="PUBLISHED" />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px dashed var(--border-subtle)' }}>
                  <span>Mid Term Results</span>
                  <StatusBadge status="warning" label="READY" />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Annual Term Results</span>
                  <StatusBadge status="neutral" label="PENDING" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

    </PageLayout>
  );
};

export default ExamsPage;
