import React, { useState } from 'react';
import { mockDepartments, mockDesignations } from '../shared/mockHRData';
import { Building, Users, Landmark, Plus } from 'lucide-react';

export default function DepartmentsDesignationsModule() {
  const [tab, setTab] = useState<'departments' | 'designations'>('departments');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', fontFamily: '"Outfit", sans-serif' }}>
      <div style={{ display: 'inline-flex', alignItems: 'center', background: 'var(--bg-surface-raised, #F1F5F9)', border: '1px solid var(--border-subtle, rgba(226, 232, 240, 0.8))', borderRadius: '9999px', padding: '4px 6px', gap: '4px', width: 'fit-content' }}>
        <button 
          onClick={() => setTab('departments')}
          style={{ padding: '8px 18px', borderRadius: '9999px', border: 'none', background: tab === 'departments' ? '#ffffff' : 'transparent', color: tab === 'departments' ? '#0284C7' : '#475569', fontWeight: tab === 'departments' ? 700 : 600, fontSize: '13px', cursor: 'pointer', boxShadow: tab === 'departments' ? '0 2px 8px rgba(2, 132, 199, 0.12), 0 1px 3px rgba(0, 0, 0, 0.06)' : 'none', transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)' }}
        >
          Departments ({mockDepartments.length})
        </button>
        <button 
          onClick={() => setTab('designations')}
          style={{ padding: '8px 18px', borderRadius: '9999px', border: 'none', background: tab === 'designations' ? '#ffffff' : 'transparent', color: tab === 'designations' ? '#0284C7' : '#475569', fontWeight: tab === 'designations' ? 700 : 600, fontSize: '13px', cursor: 'pointer', boxShadow: tab === 'designations' ? '0 2px 8px rgba(2, 132, 199, 0.12), 0 1px 3px rgba(0, 0, 0, 0.06)' : 'none', transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)' }}
        >
          Designations ({mockDesignations.length})
        </button>
      </div>

      {tab === 'departments' ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '14px' }}>
          {mockDepartments.map(dept => (
            <div key={dept.id} style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '10px', fontWeight: 800, padding: '2px 8px', borderRadius: '4px', background: 'rgba(59,130,246,0.1)', color: '#3B82F6' }}>{dept.status}</span>
                <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-primary)' }}>{dept.employeeCount} Staff</span>
              </div>
              <h4 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>{dept.name}</h4>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0 }}>HOD: {dept.headOfDept}</p>
              <div style={{ borderTop: '1px dashed var(--border-subtle)', paddingTop: '8px', fontSize: '11px', color: 'var(--text-muted)' }}>
                Annual Budget Allocation: <strong>{dept.annualBudget}</strong>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '14px' }}>
          {mockDesignations.map(dsg => (
            <div key={dsg.id} style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '10px', fontWeight: 800, color: '#3B82F6', textTransform: 'uppercase' }}>{dsg.department} • {dsg.payGrade}</span>
              <h4 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>{dsg.title}</h4>
              <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)' }}>Active Employees: {dsg.activeCount} Staff</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
