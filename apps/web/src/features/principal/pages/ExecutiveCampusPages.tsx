import React from 'react';
import {
  BookOpen,
  Truck,
  Home,
  Shield,
  CheckCircle2,
  AlertTriangle,
  Users,
  Activity,
  Award
} from 'lucide-react';
import { PageLayout } from '../../../components/erp/PageLayout';
import { PageHeader } from '../../../components/erp/PageHeader';
import { KPICard } from '../../../components/erp/KPICard';

// ─── 1. Executive Library Oversight Page ──────────────────────────────────────
export function ExecutiveLibraryOversightPage() {
  return (
    <PageLayout>
      <PageHeader
        title="Library Operations Executive Oversight"
        subtitle="Executive monitoring of book circulation, digital repository usage, active readers, and fine collection."
        breadcrumb={[
          { label: 'Leadership Workspace', path: '/dashboard' },
          { label: 'Campus Operations', path: '/principal/campus/library' },
          { label: 'Library', path: '/principal/campus/library' },
        ]}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 16, fontFamily: "'Inter', sans-serif" }}>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
          <KPICard title="TOTAL CATALOG VOLUMES" value="18,450 Books" icon={<BookOpen size={20} />} tone="info" />
          <KPICard title="ACTIVE STUDENT READERS" value="84.2%" icon={<Users size={20} />} trend={{ value: '+5% this term', isPositive: true }} tone="success" />
          <KPICard title="CIRCULATION (THIS MONTH)" value="1,240 Issues" icon={<Activity size={20} />} tone="success" />
          <KPICard title="DIGITAL REPOSITORY USAGE" value="3,890 Downloads" icon={<Award size={20} />} tone="info" />
        </div>

        <div style={cardStyle}>
          <h3 style={cardTitleStyle}>High Demand Literature & Reader Engagement</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(180px, 100%), 1fr))', gap: 14, marginTop: 14 }}>
            <CampusKpiBox title="STEM & Robotics Catalog" value="92% Borrowed" sub="High demand" />
            <CampusKpiBox title="CBSE Reference Volumes" value="88% Borrowed" sub="Exam season peak" />
            <CampusKpiBox title="Overdue Books Managed" value="12 Books" sub="Reminders issued" />
          </div>
        </div>

      </div>
    </PageLayout>
  );
}

// ─── 2. Executive Transport Oversight Page ───────────────────────────────────
export function ExecutiveTransportOversightPage() {
  return (
    <PageLayout>
      <PageHeader
        title="Transport & Fleet Executive Oversight"
        subtitle="Executive monitoring of bus fleet telematics, route safety scores, driver compliance, and fuel efficiency."
        breadcrumb={[
          { label: 'Leadership Workspace', path: '/dashboard' },
          { label: 'Campus Operations', path: '/principal/campus/library' },
          { label: 'Transport', path: '/principal/campus/transport' },
        ]}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 16, fontFamily: "'Inter', sans-serif" }}>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
          <KPICard title="ACTIVE BUS FLEET" value="14 Buses" icon={<Truck size={20} />} tone="info" />
          <KPICard title="ROUTE SAFETY SCORE" value="99.4%" icon={<CheckCircle2 size={20} />} tone="success" />
          <KPICard title="DRIVER COMPLIANCE RATE" value="100%" icon={<Shield size={20} />} tone="success" />
          <KPICard title="FUEL EXPENSE VARIANCE" value="Within Budget" icon={<Activity size={20} />} tone="success" />
        </div>

        <div style={cardStyle}>
          <h3 style={cardTitleStyle}>Fleet Telematics & Route Oversight Summary</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(180px, 100%), 1fr))', gap: 14, marginTop: 14 }}>
            <CampusKpiBox title="Daily Student Commuters" value="620 Students" sub="100% RFID tracked" />
            <CampusKpiBox title="On-Time Arrival Rate" value="98.2%" sub="Morning gate entry" />
            <CampusKpiBox title="Pending Bus Servicing" value="1 Vehicle" sub="Scheduled for Sunday" />
          </div>
        </div>

      </div>
    </PageLayout>
  );
}

// ─── 3. Executive Hostel Oversight Page ──────────────────────────────────────
export function ExecutiveHostelOversightPage() {
  return (
    <PageLayout>
      <PageHeader
        title="Hostel Facilities Executive Oversight"
        subtitle="Executive monitoring of student resident welfare, room occupancy, mess quality scores, and warden logs."
        breadcrumb={[
          { label: 'Leadership Workspace', path: '/dashboard' },
          { label: 'Campus Operations', path: '/principal/campus/library' },
          { label: 'Hostel', path: '/principal/campus/hostel' },
        ]}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 16, fontFamily: "'Inter', sans-serif" }}>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
          <KPICard title="HOSTEL OCCUPANCY RATE" value="92.5%" icon={<Home size={20} />} tone="info" />
          <KPICard title="MESS SATISFACTION SCORE" value="4.7 / 5" icon={<Award size={20} />} tone="success" />
          <KPICard title="ACTIVE OUT-PASS PERMITS" value="8 Students" icon={<Users size={20} />} tone="info" />
          <KPICard title="UNRESOLVED MAINTENANCE" value="0 Critical" icon={<CheckCircle2 size={20} />} tone="success" />
        </div>

        <div style={cardStyle}>
          <h3 style={cardTitleStyle}>Hostel Blocks & Resident Welfare Overview</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(180px, 100%), 1fr))', gap: 14, marginTop: 14 }}>
            <CampusKpiBox title="Boys Residence Block A" value="120 Resident Students" sub="Warden: Mr. Sharma" />
            <CampusKpiBox title="Girls Residence Block B" value="110 Resident Students" sub="Warden: Mrs. Rao" />
            <CampusKpiBox title="Night Roll Call Compliance" value="100% Present" sub="Verified via Biometrics" />
          </div>
        </div>

      </div>
    </PageLayout>
  );
}

// ─── 4. Executive Security Oversight Page ────────────────────────────────────
export function ExecutiveSecurityOversightPage() {
  return (
    <PageLayout>
      <PageHeader
        title="Campus Security Executive Oversight"
        subtitle="Executive monitoring of campus security operations, CCTV camera coverage, gate logs, and incident risk alerts."
        breadcrumb={[
          { label: 'Leadership Workspace', path: '/dashboard' },
          { label: 'Campus Operations', path: '/principal/campus/library' },
          { label: 'Security', path: '/principal/campus/security' },
        ]}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 16, fontFamily: "'Inter', sans-serif" }}>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
          <KPICard title="CCTV CAMERA COVERAGE" value="99.1% Active" icon={<Shield size={20} />} tone="success" />
          <KPICard title="GUARD PATROL COMPLIANCE" value="100%" icon={<CheckCircle2 size={20} />} tone="success" />
          <KPICard title="DAILY GATE EXITS LOGGED" value="142 Entries" icon={<Activity size={20} />} tone="info" />
          <KPICard title="SECURITY INCIDENT ALERTS" value="0 Incidents" icon={<AlertTriangle size={20} />} tone="success" />
        </div>

        <div style={cardStyle}>
          <h3 style={cardTitleStyle}>Campus Security Command Center Overview</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(180px, 100%), 1fr))', gap: 14, marginTop: 14 }}>
            <CampusKpiBox title="Main Gate Turnstiles" value="4 Active RFID Gates" sub="Biometric verification live" />
            <CampusKpiBox title="Visitor Pass Clearance" value="100% Verified" sub="Aadhaar / ID checked" />
            <CampusKpiBox title="Emergency SOS System" value="Fully Operational" sub="Direct link to Security Officer" />
          </div>
        </div>

      </div>
    </PageLayout>
  );
}

// ─── HELPER COMPONENTS ───────────────────────────────────────────────────────

function CampusKpiBox({ title, value, sub }: { title: string; value: string; sub: string }) {
  return (
    <div style={{ background: '#F9FAFB', border: '1px solid #F3F4F6', borderRadius: 12, padding: 14, display: 'flex', flexDirection: 'column', gap: 4 }}>
      <span style={{ fontSize: 11, color: '#6B7280', fontWeight: 500 }}>{title}</span>
      <span style={{ fontSize: 18, fontWeight: 800, color: '#111827' }}>{value}</span>
      <span style={{ fontSize: 10.5, color: '#059669', fontWeight: 600 }}>{sub}</span>
    </div>
  );
}

const cardStyle: React.CSSProperties = {
  background: '#FFFFFF',
  border: '1px solid #E5E7EB',
  borderRadius: 18,
  padding: 20,
  boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
};

const cardTitleStyle: React.CSSProperties = {
  fontSize: 15,
  fontWeight: 700,
  color: '#111827',
  margin: 0,
};
