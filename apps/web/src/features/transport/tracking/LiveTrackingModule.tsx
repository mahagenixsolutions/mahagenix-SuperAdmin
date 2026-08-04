import React, { useState } from 'react';
import { useTransportStore } from '../shared/transportStore';
import { MapPin, Navigation, Bus, Users, Clock, Wifi, ShieldAlert, Zap } from 'lucide-react';

export default function LiveTrackingModule() {
  const { gpsPoints, showToast } = useTransportStore();
  const [selectedBusNumber, setSelectedBusNumber] = useState<string | null>(null);

  const activePoint = gpsPoints.find((g) => g.busNumber === selectedBusNumber) || gpsPoints[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', fontFamily: '"Outfit", sans-serif' }}>
      
      {/* Live Map Header */}
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <MapPin size={18} style={{ color: '#10B981' }} /> Real-Time Live GPS Telematics Map
          </h3>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>Live vehicle location, speed, ETA to next stop, and emergency tracking dispatch.</p>
        </div>
        <span style={{ fontSize: '11px', fontWeight: 800, padding: '4px 10px', borderRadius: '12px', background: '#DCFCE7', color: '#166534', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Wifi size={14} /> Telematics Active
        </span>
      </div>

      {/* Map Graphic Box Simulation */}
      <div style={{
        position: 'relative', width: '100%', height: '300px', borderRadius: '16px', overflow: 'hidden',
        background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)', border: '1px solid var(--border-subtle)',
        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: '#FFF'
      }}>
        {/* Map Grid overlay */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.15, backgroundImage: 'radial-gradient(#FFF 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

        {/* Selected Bus Pin Overlay */}
        <div style={{ zIndex: 2, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(16,185,129,0.2)', border: '2px solid #10B981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Navigation size={32} style={{ color: '#10B981' }} />
          </div>
          <div>
            <h3 style={{ fontSize: '20px', fontWeight: 800, margin: '4px 0', letterSpacing: '-0.5px' }}>
              Tracking {activePoint ? activePoint.busNumber : 'Fleet'} ({activePoint ? activePoint.routeName : 'Active'})
            </h3>
            <p style={{ fontSize: '12px', color: '#94A3B8', margin: 0 }}>
              Current Location: <strong>{activePoint?.currentStopName}</strong> → Next: <strong>{activePoint?.nextStopName}</strong> (ETA: <strong>{activePoint?.etaMinsNextStop}m</strong>)
            </p>
          </div>
          <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 10px', borderRadius: '12px', background: '#10B981', color: '#FFF' }}>
              Speed: {activePoint?.speedKmH} km/h
            </span>
            <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 10px', borderRadius: '12px', background: 'rgba(255,255,255,0.2)', color: '#FFF' }}>
              Lat: {activePoint?.currentLat}, Lng: {activePoint?.currentLng}
            </span>
          </div>
        </div>
      </div>

      {/* Active GPS Buses Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '14px' }}>
        {gpsPoints.map((gps) => (
          <div
            key={gps.busId}
            onClick={() => setSelectedBusNumber(gps.busNumber)}
            style={{
              background: 'var(--bg-surface)',
              border: selectedBusNumber === gps.busNumber ? '2px solid #10B981' : '1px solid var(--border-subtle)',
              borderRadius: '14px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px', cursor: 'pointer'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, padding: '3px 8px', borderRadius: '4px', background: '#DCFCE7', color: '#166534' }}>{gps.status}</span>
              <span style={{ fontSize: '12px', fontWeight: 800, color: gps.speedKmH > 45 ? '#EF4444' : '#3B82F6' }}>
                ⚡ {gps.speedKmH} km/h
              </span>
            </div>
            <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>{gps.busNumber} ({gps.routeName})</h4>
            <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Current Stop: {gps.currentStopName}</span>
            <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Next Stop: {gps.nextStopName} (ETA: <strong>{gps.etaMinsNextStop} mins</strong>)</span>
            <div style={{ borderTop: '1px dashed var(--border-subtle)', paddingTop: '8px', fontSize: '11px', color: 'var(--text-secondary)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Driver: {gps.driverName}</span>
              <button
                onClick={(e) => { e.stopPropagation(); showToast(`Emergency Tracking Ping sent to Bus ${gps.busNumber}!`); }}
                style={{ border: 'none', background: '#EF4444', color: '#FFF', padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 700, cursor: 'pointer' }}
              >
                Emergency Ping
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
