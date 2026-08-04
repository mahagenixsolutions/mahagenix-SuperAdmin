import React, { useState } from 'react';
import { DataGrid } from '../../../components/erp/DataGrid';
import type { GridColumn } from '../../../components/erp/DataGrid';
import { StatusBadge } from '../../../components/erp/StatusBadge';
import { mockSecurityVehicles } from '../shared/mockSecurityData';
import type { SecurityVehicle } from '../shared/types';
import { Truck, CheckCircle2, ParkingSquare } from 'lucide-react';

export default function VehicleManagementModule() {
  const [vehicles, setVehicles] = useState<SecurityVehicle[]>(mockSecurityVehicles);

  const columns: GridColumn<SecurityVehicle>[] = [
    { key: 'passNumber', title: 'Pass #', render: (v) => <span style={{ fontFamily: 'monospace', fontWeight: 800 }}>{v.passNumber}</span> },
    { key: 'vehicleNumber', title: 'Vehicle Plate Number', render: (v) => <span style={{ fontWeight: 800, color: 'var(--text-primary)' }}>{v.vehicleNumber}</span> },
    { key: 'vehicleType', title: 'Category', render: (v) => <StatusBadge status="info" label={v.vehicleType} /> },
    { key: 'driverName', title: 'Driver / Phone', render: (v) => `${v.driverName} (${v.driverPhone})` },
    { key: 'parkingSlot', title: 'Assigned Parking Bay', render: (v) => <span style={{ fontWeight: 700, color: '#3B82F6' }}>{v.parkingSlot}</span> },
    { key: 'entryTime', title: 'Entry Gate / Time', render: (v) => `${v.entryGate} @ ${v.entryTime}` },
    { key: 'status', title: 'Status', render: (v) => <StatusBadge status={v.status === 'Parked In Campus' ? 'success' : 'info'} label={v.status} /> }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', fontFamily: '"Outfit", sans-serif' }}>
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>Campus Vehicle Entry & Parking Allocation</h3>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>Manage school bus bays, staff cars, visitor parking permits, and vendor supply trucks.</p>
        </div>
        <button style={{ padding: '8px 14px', borderRadius: '8px', border: 'none', background: '#3B82F6', color: '#FFF', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}>
          + Log Vehicle Entry
        </button>
      </div>

      <DataGrid columns={columns} data={vehicles} />
    </div>
  );
}
