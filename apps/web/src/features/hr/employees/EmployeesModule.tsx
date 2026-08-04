import React, { useState } from 'react';
import { DataGrid } from '../../../components/erp/DataGrid';
import type { GridColumn } from '../../../components/erp/DataGrid';
import { StatusBadge } from '../../../components/erp/StatusBadge';
import { DetailDrawer } from '../../../components/erp/DetailDrawer';
import { mockEmployees } from '../shared/mockHRData';
import type { HREmployee } from '../shared/types';
import { Search, Filter, Mail, Phone, MapPin, Award, FileText, UserCheck } from 'lucide-react';

export default function EmployeesModule() {
  const [employees, setEmployees] = useState<HREmployee[]>(mockEmployees);
  const [search, setSearch] = useState('');
  const [selectedDept, setSelectedDept] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedEmp, setSelectedEmp] = useState<HREmployee | null>(null);

  const filtered = employees.filter(e => {
    const matchSearch = e.name.toLowerCase().includes(search.toLowerCase()) || 
                        e.empId.toLowerCase().includes(search.toLowerCase()) ||
                        e.email.toLowerCase().includes(search.toLowerCase());
    const matchDept = !selectedDept || e.department === selectedDept;
    const matchStatus = !selectedStatus || e.status === selectedStatus;
    return matchSearch && matchDept && matchStatus;
  });

  const columns: GridColumn<HREmployee>[] = [
    { key: 'empId', title: 'Employee ID', render: (e) => <span style={{ fontFamily: 'monospace', fontWeight: 700 }}>{e.empId}</span> },
    { key: 'name', title: 'Full Name', render: (e) => <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{e.name}</span> },
    { key: 'department', title: 'Department', render: (e) => <StatusBadge status="info" label={e.department} /> },
    { key: 'designation', title: 'Designation', render: (e) => e.designation },
    { key: 'joiningDate', title: 'Joining Date', render: (e) => e.joiningDate },
    { key: 'employmentType', title: 'Type', render: (e) => e.employmentType },
    { key: 'status', title: 'Status', render: (e) => <StatusBadge status={e.status === 'Active' ? 'success' : 'warning'} label={e.status} /> },
    { key: 'id', title: 'Profile', render: (e) => (
      <button onClick={() => setSelectedEmp(e)} style={{ border: '1px solid var(--border-subtle)', background: 'var(--bg-surface-raised)', borderRadius: '6px', padding: '4px 8px', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}>
        View Profile
      </button>
    ) }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', fontFamily: '"Outfit", sans-serif' }}>
      
      {/* Search & Filter Bar */}
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: '280px', background: 'var(--bg-surface-raised)', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '8px 12px' }}>
          <Search size={16} style={{ color: 'var(--text-secondary)' }} />
          <input 
            type="text" 
            placeholder="Search by Employee Name, ID, Email..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '13px', color: 'var(--text-primary)' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <select 
            value={selectedDept} 
            onChange={(e) => setSelectedDept(e.target.value)}
            style={{ border: '1px solid var(--border-subtle)', background: 'var(--bg-surface-raised)', borderRadius: '8px', padding: '8px 12px', fontSize: '12px', color: 'var(--text-primary)', outline: 'none' }}
          >
            <option value="">All Departments</option>
            <option value="Academic">Academic</option>
            <option value="Human Resources">Human Resources</option>
            <option value="Finance">Finance</option>
            <option value="IT">IT</option>
          </select>

          <select 
            value={selectedStatus} 
            onChange={(e) => setSelectedStatus(e.target.value)}
            style={{ border: '1px solid var(--border-subtle)', background: 'var(--bg-surface-raised)', borderRadius: '8px', padding: '8px 12px', fontSize: '12px', color: 'var(--text-primary)', outline: 'none' }}
          >
            <option value="">All Statuses</option>
            <option value="Active">Active Only</option>
            <option value="On Leave">On Leave</option>
          </select>
        </div>
      </div>

      <DataGrid columns={columns} data={filtered} keyField="empId" />

      {/* DetailDrawer for Employee Profile */}
      <DetailDrawer
        isOpen={!!selectedEmp}
        onClose={() => setSelectedEmp(null)}
        title={selectedEmp ? selectedEmp.name : 'Employee Profile'}
      >
        {selectedEmp && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontFamily: '"Outfit", sans-serif' }}>
            <div style={{ background: 'var(--bg-surface-raised)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#3B82F6', textTransform: 'uppercase' }}>{selectedEmp.empId} • {selectedEmp.employmentType}</span>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', margin: '4px 0' }}>{selectedEmp.name}</h3>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0 }}>{selectedEmp.designation} — {selectedEmp.department} Department</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '12px' }}>
              <div style={{ padding: '10px', borderRadius: '8px', background: 'var(--bg-surface-raised)', border: '1px solid var(--border-subtle)' }}>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '11px' }}>Email Contact</span>
                <strong style={{ color: 'var(--text-primary)' }}>{selectedEmp.email}</strong>
              </div>
              <div style={{ padding: '10px', borderRadius: '8px', background: 'var(--bg-surface-raised)', border: '1px solid var(--border-subtle)' }}>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '11px' }}>Phone Number</span>
                <strong style={{ color: 'var(--text-primary)' }}>{selectedEmp.phone}</strong>
              </div>
              <div style={{ padding: '10px', borderRadius: '8px', background: 'var(--bg-surface-raised)', border: '1px solid var(--border-subtle)' }}>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '11px' }}>Salary Grade</span>
                <strong style={{ color: 'var(--text-primary)' }}>{selectedEmp.salaryGrade}</strong>
              </div>
              <div style={{ padding: '10px', borderRadius: '8px', background: 'var(--bg-surface-raised)', border: '1px solid var(--border-subtle)' }}>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '11px' }}>Experience</span>
                <strong style={{ color: 'var(--text-primary)' }}>{selectedEmp.experienceYears} Years</strong>
              </div>
            </div>

            <div style={{ padding: '12px', borderRadius: '8px', background: 'var(--bg-surface-raised)', border: '1px solid var(--border-subtle)' }}>
              <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-primary)', display: 'block', marginBottom: '4px' }}>Qualification</span>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0 }}>{selectedEmp.qualification}</p>
            </div>

            <div style={{ padding: '12px', borderRadius: '8px', background: 'var(--bg-surface-raised)', border: '1px solid var(--border-subtle)' }}>
              <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-primary)', display: 'block', marginBottom: '4px' }}>Emergency Contact</span>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0 }}>{selectedEmp.emergencyContact}</p>
            </div>
          </div>
        )}
      </DetailDrawer>
    </div>
  );
}
