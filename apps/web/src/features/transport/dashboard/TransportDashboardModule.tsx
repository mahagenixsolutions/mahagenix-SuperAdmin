import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bus, Navigation, Users, Clock, AlertTriangle, CheckCircle2,
  Sparkles, Plus, ShieldCheck, MapPin, ShieldAlert, Fuel, Wrench, RefreshCw, X
} from 'lucide-react';
import { KPICard } from '../../../components/erp/KPICard';
import { useTransportStore } from '../shared/transportStore';

export default function TransportDashboardModule() {
  const navigate = useNavigate();
  const {
    buses,
    students,
    routes,
    drivers,
    trips,
    gpsPoints,
    fuelLogs,
    maintenanceLogs,
    requests,
    incidents,
    aiInsights,
    activities,
    toastMessage,
    showToast,
    assignStudentToBus,
    startTrip,
    endTrip,
    confirmBusDelay,
    scheduleMaintenance,
    addFuelEntry,
  } = useTransportStore();

  // Modal States
  const [activeModal, setActiveModal] = useState<'assign_student' | 'create_route' | 'maintenance' | 'fuel' | 'delay' | null>(null);

  // Form States
  const [studentName, setStudentName] = useState('');
  const [classGrade, setClassGrade] = useState('Class 10-A');
  const [busNumber, setBusNumber] = useState(buses[0]?.busNumber || 'BUS-01');
  const [routeName, setRouteName] = useState(routes[0]?.routeName || 'North Circuit Express');
  const [pickupPoint, setPickupPoint] = useState('');

  const [newRouteName, setNewRouteName] = useState('');
  const [newRouteCode, setNewRouteCode] = useState('');

  const [mntBusNumber, setMntBusNumber] = useState(buses[0]?.busNumber || 'BUS-01');
  const [mntType, setMntType] = useState<'Regular Service' | 'Tyre Replacement' | 'Engine Repair' | 'Oil & Filter' | 'Brake Inspection'>('Regular Service');
  const [mntCost, setMntCost] = useState(8500);

  const [fuelBusNumber, setFuelBusNumber] = useState(buses[0]?.busNumber || 'BUS-01');
  const [fuelLitres, setFuelLitres] = useState(45);

  const [delayTripId, setDelayTripId] = useState('');
  const [delayMins, setDelayMins] = useState(15);
  const [delayReason, setDelayReason] = useState('Traffic Bottleneck');

  // KPI Calculations
  const activeBusesCount = buses.filter((b) => b.status === 'Active').length;
  const activeTripsCount = trips.filter((t) => t.status === 'In Transit' || t.status === 'Delayed').length;
  const delayedTripsCount = trips.filter((t) => t.status === 'Delayed').length;
  const maintenanceDueCount = buses.filter((b) => b.status === 'In Servicing').length + maintenanceLogs.filter((m) => m.status === 'Scheduled').length;
  const pendingRequestsCount = requests.filter((r) => r.status === 'Pending').length;
  const todayFuelTotal = fuelLogs.reduce((sum, f) => sum + f.fuelLitres, 0);

  const handleAssignStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName || !pickupPoint) return;
    assignStudentToBus({
      studentName,
      classGrade,
      busNumber,
      routeName,
      pickupPoint,
    });
    setActiveModal(null);
    setStudentName('');
    setPickupPoint('');
  };

  const handleCreateRouteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRouteName) return;
    useTransportStore().createRoute({ routeName: newRouteName, routeCode: newRouteCode || 'NCR' });
    setActiveModal(null);
    setNewRouteName('');
  };

  const handleMaintenanceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    scheduleMaintenance(mntBusNumber, mntType, Number(mntCost), 'Routine servicing desk request.');
    setActiveModal(null);
  };

  const handleFuelSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addFuelEntry({ busNumber: fuelBusNumber, fuelLitres: Number(fuelLitres) });
    setActiveModal(null);
  };

  const handleDelaySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!delayTripId) return;
    confirmBusDelay(delayTripId, Number(delayMins), delayReason);
    setActiveModal(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', fontFamily: '"Outfit", sans-serif' }}>
      {toastMessage && (
        <div style={{
          position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999,
          background: '#10B981', color: '#FFF',
          borderRadius: '12px', padding: '12px 20px', boxShadow: '0 10px 25px rgba(16,185,129,0.3)',
          display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, fontSize: '13px'
        }}>
          <CheckCircle2 size={18} />
          {toastMessage}
        </div>
      )}

      {/* 1. Header Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #064E3B 0%, #047857 100%)',
        borderRadius: '16px', padding: '24px', color: '#FFF', display: 'flex',
        justify: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px',
        boxShadow: '0 8px 24px rgba(4,120,87,0.25)'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 10px', borderRadius: '12px', background: 'rgba(255,255,255,0.15)', color: '#A7F3D0' }}>
              ● Academic Year 2025–2026
            </span>
            <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 10px', borderRadius: '12px', background: 'rgba(16,185,129,0.3)', color: '#D1FAE5' }}>
              Fleet Health Score: 96.8% • Live Telematics Active
            </span>
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: 800, margin: '6px 0', letterSpacing: '-0.5px' }}>
            Transport Command Center
          </h2>
          <p style={{ fontSize: '13px', color: '#A7F3D0', margin: 0, maxWidth: '650px' }}>
            Real-time fleet operations, live GPS tracking, student bus allocations, servicing logs, fuel efficiency, and emergency telematics safety.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button
            onClick={() => navigate('/transport/tracking')}
            style={{ padding: '10px 18px', borderRadius: '10px', border: 'none', background: '#10B981', color: '#FFF', fontWeight: 700, fontSize: '13px', cursor: 'pointer', boxShadow: '0 4px 12px rgba(16,185,129,0.3)' }}
          >
            Live GPS Tracking Map →
          </button>
          <button
            onClick={() => navigate('/transport/trips')}
            style={{ padding: '10px 18px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.1)', color: '#FFF', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}
          >
            Today's Trips ({trips.length})
          </button>
        </div>
      </div>

      {/* 2. 12 KPI Metric Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '14px' }}>
        <KPICard title="TOTAL BUS FLEET" value={buses.length.toString()} icon={<Bus size={20} />} trend={{ value: '100% active license', isPositive: true }} />
        <KPICard title="ACTIVE BUSES ON ROUTE" value={`${activeBusesCount} Active`} icon={<CheckCircle2 size={20} />} tone="success" />
        <KPICard title="STUDENTS USING TRANSPORT" value={students.length.toString()} icon={<Users size={20} />} tone="primary" />
        <KPICard title="DRIVERS AVAILABLE" value={drivers.length.toString()} icon={<Users size={20} />} tone="info" />
        <KPICard title="TODAY'S TRIPS" value={trips.length.toString()} icon={<Navigation size={20} />} tone="primary" />
        <KPICard title="DELAYED TRIPS" value={`${delayedTripsCount} Delayed`} icon={<AlertTriangle size={20} />} tone="danger" />
        <KPICard title="MAINTENANCE DUE" value={`${maintenanceDueCount} Buses`} icon={<Wrench size={20} />} tone="warning" />
        <KPICard title="FUEL CONSUMPTION" value={`${todayFuelTotal} L`} icon={<Fuel size={20} />} tone="info" />
        <KPICard title="PENDING REQUESTS" value={pendingRequestsCount.toString()} icon={<Clock size={20} />} tone="warning" />
        <KPICard title="SAFETY INCIDENTS" value={incidents.length.toString()} icon={<ShieldAlert size={20} />} tone="danger" />
        <KPICard title="AVERAGE BUS OCCUPANCY" value="86%" icon={<Users size={20} />} tone="success" />
        <KPICard title="FLEET UTILIZATION" value="92.4%" icon={<RefreshCw size={20} />} tone="success" />
      </div>

      {/* 3. Quick Actions Toolbar */}
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '20px' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 800, margin: '0 0 14px 0', color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          ⚡ Transport Manager Quick Desk Actions
        </h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          <button onClick={() => setActiveModal('assign_student')} style={quickBtnStyle}>+ Assign Student</button>
          <button onClick={() => setActiveModal('create_route')} style={quickBtnStyle}>+ Create Route</button>
          <button onClick={() => navigate('/transport/drivers')} style={quickBtnStyle}>👤 Assign Driver</button>
          <button onClick={() => navigate('/transport/trips')} style={quickBtnStyle}>▶ Start / End Trip</button>
          <button onClick={() => setActiveModal('delay')} style={quickBtnStyle}>⚠️ Report Bus Delay</button>
          <button onClick={() => setActiveModal('maintenance')} style={quickBtnStyle}>🛠️ Schedule Maintenance</button>
          <button onClick={() => setActiveModal('fuel')} style={quickBtnStyle}>⛽ Add Fuel Entry</button>
          <button onClick={() => navigate('/transport/reports')} style={quickBtnStyle}>📊 Generate Report</button>
        </div>
      </div>

      {/* 4. Split View: Today's Trips & GPS Telematics Alert + AI Intelligence */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px' }}>
        
        {/* Today's Operations & Trip Monitoring */}
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Navigation size={18} color="#10B981" />
              Today's Bus Trips & Live Status
            </h3>
            <button onClick={() => navigate('/transport/trips')} style={linkBtnStyle}>View All ({trips.length}) →</button>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12.5px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-secondary)', textAlign: 'left' }}>
                  <th style={{ padding: '8px' }}>Bus & Route</th>
                  <th style={{ padding: '8px' }}>Driver</th>
                  <th style={{ padding: '8px' }}>Schedule</th>
                  <th style={{ padding: '8px' }}>Status</th>
                  <th style={{ padding: '8px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {trips.map((t) => (
                  <tr key={t.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '10px 8px' }}>
                      <strong style={{ color: 'var(--text-primary)', display: 'block' }}>{t.busNumber}</strong>
                      <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{t.routeName}</span>
                    </td>
                    <td style={{ padding: '10px 8px', color: 'var(--text-secondary)' }}>{t.driverName}</td>
                    <td style={{ padding: '10px 8px', color: 'var(--text-primary)' }}>{t.scheduledStartTime} - {t.scheduledEndTime}</td>
                    <td style={{ padding: '10px 8px' }}>
                      <span style={{
                        padding: '2px 8px', borderRadius: '10px', fontSize: '10.5px', fontWeight: 700,
                        background: t.status === 'Completed' ? '#D1FAE5' : t.status === 'Delayed' ? '#FEE2E2' : '#EEF2FF',
                        color: t.status === 'Completed' ? '#059669' : t.status === 'Delayed' ? '#DC2626' : '#4F46E5',
                      }}>
                        {t.status} {t.delayMinutes > 0 ? `(+${t.delayMinutes}m)` : ''}
                      </span>
                    </td>
                    <td style={{ padding: '10px 8px', textAlign: 'right' }}>
                      {t.status === 'Scheduled' && (
                        <button onClick={() => startTrip(t.id)} style={{ padding: '4px 8px', borderRadius: '6px', border: 'none', background: '#10B981', color: '#FFF', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}>Start</button>
                      )}
                      {t.status === 'In Transit' && (
                        <button onClick={() => endTrip(t.id)} style={{ padding: '4px 8px', borderRadius: '6px', border: 'none', background: '#4F46E5', color: '#FFF', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}>Complete</button>
                      )}
                      {t.status === 'Delayed' && (
                        <button onClick={() => endTrip(t.id)} style={{ padding: '4px 8px', borderRadius: '6px', border: 'none', background: '#F59E0B', color: '#FFF', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}>Resolve</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* AI Telematics & Delay Intelligence */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(16,185,129,0.06) 0%, rgba(59,130,246,0.04) 100%)',
          border: '1px solid rgba(16,185,129,0.2)', borderRadius: '16px', padding: '20px',
          display: 'flex', flexDirection: 'column', gap: '14px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)', fontWeight: 800, fontSize: '15px' }}>
              <Sparkles size={18} style={{ color: '#10B981' }} />
              AI Transport Telematics & Optimization
            </div>
            <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '12px', background: '#10B981', color: '#FFF' }}>
              Live Telematics
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {aiInsights.map((insight) => (
              <div key={insight.id} style={{ background: 'var(--bg-surface)', padding: '12px 14px', borderRadius: '12px', border: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px', fontWeight: 800, color: '#059669' }}>{insight.title}</span>
                  {insight.metric && (
                    <span style={{ fontSize: '10.5px', fontWeight: 700, background: '#D1FAE5', color: '#059669', padding: '2px 8px', borderRadius: '10px' }}>
                      {insight.metric}
                    </span>
                  )}
                </div>
                <p style={{ fontSize: '11.5px', color: 'var(--text-secondary)', margin: 0 }}>
                  {insight.description}
                </p>
                {insight.actionText && (
                  <button
                    onClick={() => navigate('/transport/tracking')}
                    style={{ alignSelf: 'flex-start', marginTop: '4px', border: 'none', background: 'none', color: '#2563EB', fontSize: '11px', fontWeight: 700, cursor: 'pointer', padding: 0 }}
                  >
                    {insight.actionText} →
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5. Bottom Section: Live Activity Feed & Pending Requests */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px' }}>
        {/* Pending Transport Requests */}
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Clock size={18} color="#F59E0B" />
              Pending Transport Requests ({requests.length})
            </h3>
            <button onClick={() => navigate('/transport/requests')} style={linkBtnStyle}>Manage Queue →</button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {requests.map((r) => (
              <div key={r.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', background: 'var(--bg-surface-raised)', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
                <div>
                  <span style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--text-primary)', display: 'block' }}>{r.studentName} ({r.classGrade})</span>
                  <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Type: {r.requestType} • Requested: {r.requestedRoute}</span>
                </div>
                <span style={{ padding: '3px 10px', borderRadius: '12px', background: '#FEF3C7', color: '#D97706', fontSize: '11px', fontWeight: 800 }}>
                  {r.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Live Activity Feed */}
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '20px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 800, margin: '0 0 14px 0', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <RefreshCw size={18} color="#10B981" />
            Live Transport Fleet Activity
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {activities.slice(0, 5).map((act) => (
              <div key={act.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '12px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: act.badgeColor || '#10B981', marginTop: '5px', flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, color: 'var(--text-primary)', fontWeight: 500, lineHeight: 1.4 }}>{act.message}</p>
                  <span style={{ fontSize: '10px', color: '#9CA3AF' }}>{act.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────────────────
          MODALS FOR QUICK ACTIONS
         ───────────────────────────────────────────────────────────────────────────── */}

      {/* Assign Student Modal */}
      {activeModal === 'assign_student' && (
        <ModalWrapper title="Assign Student to Bus Route" onClose={() => setActiveModal(null)}>
          <form onSubmit={handleAssignStudentSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <label style={labelStyle}>Student Full Name</label>
              <input type="text" value={studentName} onChange={(e) => setStudentName(e.target.value)} style={inputStyle} placeholder="e.g. Siya Patel" required />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={labelStyle}>Class Grade</label>
                <input type="text" value={classGrade} onChange={(e) => setClassGrade(e.target.value)} style={inputStyle} required />
              </div>
              <div>
                <label style={labelStyle}>Assign Bus #</label>
                <select value={busNumber} onChange={(e) => setBusNumber(e.target.value)} style={inputStyle}>
                  {buses.map((b) => (
                    <option key={b.id} value={b.busNumber}>{b.busNumber} ({b.assignedRouteName})</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label style={labelStyle}>Select Route</label>
              <select value={routeName} onChange={(e) => setRouteName(e.target.value)} style={inputStyle}>
                {routes.map((r) => (
                  <option key={r.id} value={r.routeName}>{r.routeName} ({r.totalStops} Stops)</option>
                ))}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Pickup Point / Stop</label>
              <input type="text" value={pickupPoint} onChange={(e) => setPickupPoint(e.target.value)} style={inputStyle} placeholder="e.g. Hebbal Circle Stop #3" required />
            </div>
            <button type="submit" style={submitBtnStyle}>Confirm & Assign Student</button>
          </form>
        </ModalWrapper>
      )}

      {/* Create Route Modal */}
      {activeModal === 'create_route' && (
        <ModalWrapper title="Create Bus Circuit Route" onClose={() => setActiveModal(null)}>
          <form onSubmit={handleCreateRouteSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <label style={labelStyle}>Route Name</label>
              <input type="text" value={newRouteName} onChange={(e) => setNewRouteName(e.target.value)} style={inputStyle} placeholder="e.g. West Suburban Circuit" required />
            </div>
            <div>
              <label style={labelStyle}>Route Code</label>
              <input type="text" value={newRouteCode} onChange={(e) => setNewRouteCode(e.target.value)} style={inputStyle} placeholder="e.g. WSC-04" />
            </div>
            <button type="submit" style={submitBtnStyle}>Create Bus Route</button>
          </form>
        </ModalWrapper>
      )}

      {/* Schedule Maintenance Modal */}
      {activeModal === 'maintenance' && (
        <ModalWrapper title="Schedule Vehicle Servicing" onClose={() => setActiveModal(null)}>
          <form onSubmit={handleMaintenanceSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <label style={labelStyle}>Select Bus</label>
              <select value={mntBusNumber} onChange={(e) => setMntBusNumber(e.target.value)} style={inputStyle}>
                {buses.map((b) => (
                  <option key={b.id} value={b.busNumber}>{b.busNumber} ({b.registrationNumber})</option>
                ))}
              </select>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={labelStyle}>Service Type</label>
                <select value={mntType} onChange={(e) => setMntType(e.target.value as any)} style={inputStyle}>
                  <option value="Regular Service">Regular Service</option>
                  <option value="Tyre Replacement">Tyre Replacement</option>
                  <option value="Engine Repair">Engine Repair</option>
                  <option value="Oil & Filter">Oil & Filter</option>
                  <option value="Brake Inspection">Brake Inspection</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Estimated Cost (₹)</label>
                <input type="number" value={mntCost} onChange={(e) => setMntCost(Number(e.target.value))} style={inputStyle} required />
              </div>
            </div>
            <button type="submit" style={submitBtnStyle}>Schedule Servicing & Update Status</button>
          </form>
        </ModalWrapper>
      )}

      {/* Fuel Entry Modal */}
      {activeModal === 'fuel' && (
        <ModalWrapper title="Log Vehicle Fuel Refill" onClose={() => setActiveModal(null)}>
          <form onSubmit={handleFuelSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <label style={labelStyle}>Select Bus</label>
              <select value={fuelBusNumber} onChange={(e) => setFuelBusNumber(e.target.value)} style={inputStyle}>
                {buses.map((b) => (
                  <option key={b.id} value={b.busNumber}>{b.busNumber} ({b.fuelType})</option>
                ))}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Litres Refilled</label>
              <input type="number" value={fuelLitres} onChange={(e) => setFuelLitres(Number(e.target.value))} style={inputStyle} required />
            </div>
            <button type="submit" style={submitBtnStyle}>Save Fuel Entry & Calculate Mileage</button>
          </form>
        </ModalWrapper>
      )}

      {/* Report Bus Delay Modal */}
      {activeModal === 'delay' && (
        <ModalWrapper title="Report & Broadcast Bus Delay" onClose={() => setActiveModal(null)}>
          <form onSubmit={handleDelaySubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <label style={labelStyle}>Select Trip</label>
              <select value={delayTripId} onChange={(e) => setDelayTripId(e.target.value)} style={inputStyle} required>
                <option value="">-- Choose Active Trip --</option>
                {trips.filter((t) => t.status !== 'Completed').map((t) => (
                  <option key={t.id} value={t.id}>{t.busNumber} ({t.routeName})</option>
                ))}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Delay Duration (Minutes)</label>
              <input type="number" value={delayMins} onChange={(e) => setDelayMins(Number(e.target.value))} style={inputStyle} min={5} required />
            </div>
            <div>
              <label style={labelStyle}>Delay Reason</label>
              <input type="text" value={delayReason} onChange={(e) => setDelayReason(e.target.value)} style={inputStyle} placeholder="e.g. Metro Construction Traffic Bottleneck" required />
            </div>
            <button type="submit" style={{ ...submitBtnStyle, background: '#EF4444' }}>Dispatch SMS Alert to Parents</button>
          </form>
        </ModalWrapper>
      )}
    </div>
  );
}

function ModalWrapper({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex',
      alignItems: 'center', justifyContent: 'center', padding: '16px'
    }}>
      <div style={{
        background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)',
        borderRadius: '16px', padding: '24px', width: '100%', maxWidth: '480px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ margin: 0, fontSize: '17px', fontWeight: 800, color: 'var(--text-primary)' }}>{title}</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}>
            <X size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

const quickBtnStyle: React.CSSProperties = {
  padding: '9px 14px',
  borderRadius: '8px',
  border: '1px solid var(--border-subtle)',
  background: 'var(--bg-surface-raised)',
  color: 'var(--text-primary)',
  fontSize: '12px',
  fontWeight: 700,
  cursor: 'pointer',
};

const linkBtnStyle: React.CSSProperties = {
  background: 'none',
  border: 'none',
  color: '#2563EB',
  fontSize: '12px',
  fontWeight: 700,
  cursor: 'pointer',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '12px',
  fontWeight: 700,
  color: 'var(--text-primary)',
  marginBottom: '4px',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px 12px',
  borderRadius: '8px',
  border: '1px solid var(--border-subtle)',
  background: 'var(--bg-surface-raised)',
  color: 'var(--text-primary)',
  fontSize: '13px',
  boxSizing: 'border-box',
};

const submitBtnStyle: React.CSSProperties = {
  padding: '11px',
  borderRadius: '8px',
  border: 'none',
  background: '#10B981',
  color: '#FFF',
  fontWeight: 700,
  fontSize: '13px',
  cursor: 'pointer',
  marginTop: '6px',
};
