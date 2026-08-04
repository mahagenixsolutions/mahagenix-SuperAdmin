import React, { useState } from 'react';
import { useHostelStore } from '../shared/hostelStore';
import { Building, Users, ShieldCheck, Bed, Plus } from 'lucide-react';

export default function HostelBuildingsModule() {
  const { buildings, showToast } = useHostelStore();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', fontFamily: '"Outfit", sans-serif' }}>
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>Hostel Blocks & Buildings Directory</h3>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>Manage block capacities, floor counts, gender categories, and assigned wardens.</p>
        </div>
        <button
          onClick={() => showToast('Add Building Block modal triggered.')}
          style={{ padding: '8px 14px', borderRadius: '8px', border: 'none', background: '#6366F1', color: '#FFF', fontSize: '12px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <Plus size={16} /> Add Building Block
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
        {buildings.map((bld) => (
          <div key={bld.id} style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '14px', padding: '18px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, padding: '3px 8px', borderRadius: '4px', background: 'rgba(99,102,241,0.1)', color: '#6366F1' }}>{bld.buildingCode} • {bld.genderCategory}</span>
              <span style={{ fontSize: '12px', fontWeight: 800, color: '#10B981' }}>{bld.occupiedBeds} / {bld.totalCapacityBeds} Occupied</span>
            </div>
            <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>{bld.buildingName}</h4>
            <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Floors: {bld.totalFloors} Floors | Available Beds: <strong style={{ color: '#6366F1' }}>{bld.availableBeds} Vacant Beds</strong></span>
            <div style={{ borderTop: '1px dashed var(--border-subtle)', paddingTop: '10px', fontSize: '11px', color: 'var(--text-secondary)', display: 'flex', justifyContent: 'space-between' }}>
              <span>Chief Warden: <strong>{bld.chiefWardenName}</strong></span>
              <span>{bld.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
