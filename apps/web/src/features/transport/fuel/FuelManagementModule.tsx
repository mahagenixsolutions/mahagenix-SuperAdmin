import React, { useState } from 'react';
import { DataGrid } from '../../../components/erp/DataGrid';
import type { GridColumn } from '../../../components/erp/DataGrid';
import { useTransportStore } from '../shared/transportStore';
import type { FuelLogEntry } from '../shared/types';
import { Fuel, DollarSign, TrendingUp, Plus } from 'lucide-react';

export default function FuelManagementModule() {
  const { fuelLogs, buses, addFuelEntry } = useTransportStore();
  const [showModal, setShowModal] = useState(false);

  // Form State
  const [busNumber, setBusNumber] = useState(buses[0]?.busNumber || 'BUS-01');
  const [fuelLitres, setFuelLitres] = useState(45);
  const [costPerLitre, setCostPerLitre] = useState(94.5);
  const [odometerReadingKm, setOdometerReadingKm] = useState(42500);
  const [fillingStation, setFillingStation] = useState('Indian Oil Depot');

  const columns: GridColumn<FuelLogEntry>[] = [
    { key: 'busNumber', title: 'Bus Number', render: (f) => <span style={{ fontFamily: 'monospace', fontWeight: 800, color: 'var(--text-primary)' }}>{f.busNumber}</span> },
    { key: 'date', title: 'Fill Date', render: (f) => f.date },
    { key: 'fuelLitres', title: 'Litres Refilled', render: (f) => <span style={{ fontWeight: 800, color: '#3B82F6' }}>{f.fuelLitres} L</span> },
    { key: 'costPerLitre', title: 'Rate (₹/L)', render: (f) => `₹${f.costPerLitre}` },
    { key: 'totalCost', title: 'Total Cost', render: (f) => <span style={{ fontWeight: 800, color: '#EF4444' }}>₹{f.totalCost.toLocaleString()}</span> },
    { key: 'odometerReadingKm', title: 'Odometer', render: (f) => `${f.odometerReadingKm.toLocaleString()} km` },
    { key: 'mileageKmL', title: 'Mileage (KM/L)', render: (f) => <span style={{ fontWeight: 800, color: '#10B981' }}>{f.mileageKmL} km/L</span> },
    { key: 'fillingStation', title: 'Station / Depot', render: (f) => f.fillingStation },
  ];

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addFuelEntry({
      busNumber,
      fuelLitres: Number(fuelLitres),
      costPerLitre: Number(costPerLitre),
      odometerReadingKm: Number(odometerReadingKm),
      fillingStation,
    });
    setShowModal(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', fontFamily: '"Outfit", sans-serif' }}>
      
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>Fuel Management & Mileage Efficiency Desk</h3>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>Log diesel & CNG refills, calculate KM/L mileage efficiency, and track fuel costs.</p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          style={{ padding: '8px 14px', borderRadius: '8px', border: 'none', background: '#10B981', color: '#FFF', fontSize: '12px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <Plus size={16} /> Log Fuel Tank Refill
        </button>
      </div>

      <DataGrid columns={columns} data={fuelLogs} />

      {/* Modal */}
      {showModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex',
          alignItems: 'center', justifyContent: 'center', padding: '16px'
        }}>
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '24px', width: '100%', maxWidth: '440px' }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)' }}>Log Fuel Entry</h3>
            <form onSubmit={handleAddSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={labelStyle}>Select Bus</label>
                <select value={busNumber} onChange={(e) => setBusNumber(e.target.value)} style={inputStyle}>
                  {buses.map((b) => (
                    <option key={b.id} value={b.busNumber}>{b.busNumber} ({b.fuelType})</option>
                  ))}
                </select>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={labelStyle}>Litres Refilled</label>
                  <input type="number" value={fuelLitres} onChange={(e) => setFuelLitres(Number(e.target.value))} style={inputStyle} required />
                </div>
                <div>
                  <label style={labelStyle}>Cost per Litre (₹)</label>
                  <input type="number" value={costPerLitre} onChange={(e) => setCostPerLitre(Number(e.target.value))} style={inputStyle} step="0.1" required />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={labelStyle}>Odometer Reading (KM)</label>
                  <input type="number" value={odometerReadingKm} onChange={(e) => setOdometerReadingKm(Number(e.target.value))} style={inputStyle} required />
                </div>
                <div>
                  <label style={labelStyle}>Filling Station / Depot</label>
                  <input type="text" value={fillingStation} onChange={(e) => setFillingStation(e.target.value)} style={inputStyle} required />
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                <button type="button" onClick={() => setShowModal(false)} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface-raised)', color: 'var(--text-primary)', fontWeight: 700, cursor: 'pointer' }}>
                  Cancel
                </button>
                <button type="submit" style={{ flex: 1, padding: '10px', borderRadius: '8px', border: 'none', background: '#10B981', color: '#FFF', fontWeight: 700, cursor: 'pointer' }}>
                  Save Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

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
};
