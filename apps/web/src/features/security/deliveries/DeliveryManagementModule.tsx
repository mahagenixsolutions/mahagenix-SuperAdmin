import React, { useState } from 'react';
import { DataGrid } from '../../../components/erp/DataGrid';
import type { GridColumn } from '../../../components/erp/DataGrid';
import { StatusBadge } from '../../../components/erp/StatusBadge';
import { mockDeliveries } from '../shared/mockSecurityData';
import type { DeliveryItem } from '../shared/types';
import { Package, CheckCircle2, Truck } from 'lucide-react';

export default function DeliveryManagementModule() {
  const [deliveries, setDeliveries] = useState<DeliveryItem[]>(mockDeliveries);

  const columns: GridColumn<DeliveryItem>[] = [
    { key: 'deliveryCode', title: 'Delivery #', render: (d) => <span style={{ fontFamily: 'monospace', fontWeight: 800 }}>{d.deliveryCode}</span> },
    { key: 'courierCompany', title: 'Courier / Vendor', render: (d) => <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{d.courierCompany}</span> },
    { key: 'packageCount', title: 'Parcels', render: (d) => `${d.packageCount} Packages` },
    { key: 'recipientName', title: 'Intended Recipient', render: (d) => `${d.recipientName} (${d.recipientDept})` },
    { key: 'entryTime', title: 'Received Time', render: (d) => d.entryTime },
    { key: 'deliveryStatus', title: 'Status', render: (d) => <StatusBadge status={d.deliveryStatus === 'Delivered to Recipient' ? 'success' : 'warning'} label={d.deliveryStatus} /> }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', fontFamily: '"Outfit", sans-serif' }}>
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>Parcel & Courier Delivery Control Desk</h3>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>Log incoming Amazon, BlueDart, and vendor deliveries; record recipient handovers.</p>
        </div>
        <button style={{ padding: '8px 14px', borderRadius: '8px', border: 'none', background: '#3B82F6', color: '#FFF', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}>
          + Receive Courier Parcel
        </button>
      </div>

      <DataGrid columns={columns} data={deliveries} />
    </div>
  );
}
