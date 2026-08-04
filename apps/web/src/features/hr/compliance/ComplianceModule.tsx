import React, { useState } from 'react';
import { DataGrid } from '../../../components/erp/DataGrid';
import type { GridColumn } from '../../../components/erp/DataGrid';
import { StatusBadge } from '../../../components/erp/StatusBadge';
import { mockCompliance } from '../shared/mockHRData';
import type { ComplianceRecord } from '../shared/types';
import { ShieldAlert, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function ComplianceModule() {
  const [compliance, setCompliance] = useState<ComplianceRecord[]>(mockCompliance);

  const columns: GridColumn<ComplianceRecord>[] = [
    { key: 'empName', title: 'Employee Name', render: (c) => <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{c.empName}</span> },
    { key: 'backgroundCheck', title: 'Background Check', render: (c) => <StatusBadge status={c.backgroundCheck === 'Passed' ? 'success' : 'warning'} label={c.backgroundCheck} /> },
    { key: 'policyAck', title: 'Policy Ack', render: (c) => <StatusBadge status={c.policyAck === 'Signed' ? 'success' : 'warning'} label={c.policyAck} /> },
    { key: 'contractExpiry', title: 'Contract Expiry Date', render: (c) => c.contractExpiry },
    { key: 'alertLevel', title: 'Alert Level', render: (c) => <StatusBadge status={c.alertLevel === 'Normal' ? 'success' : 'danger'} label={c.alertLevel} /> }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', fontFamily: '"Outfit", sans-serif' }}>
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>HR Compliance & Background Verification</h3>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>Background checks, policy acknowledgements, contract renewals, and compliance alerts.</p>
        </div>
      </div>

      <DataGrid columns={columns} data={compliance} />
    </div>
  );
}
