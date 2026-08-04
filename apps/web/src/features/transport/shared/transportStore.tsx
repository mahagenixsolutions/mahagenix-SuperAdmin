import React, { createContext, useContext, useState } from 'react';
import type {
  BusVehicle, StudentTransportAssignment, BusRoute, DriverRecord, TripRecord,
  GpsTrackingPoint, FuelLogEntry, MaintenanceRecord, VehicleDocument,
  TransportRequestItem, SafetyIncidentRecord, TransportSettings, AiTransportInsight
} from './types';
import {
  mockBuses, mockStudentsTransport, mockBusRoutes, mockDrivers,
  mockTrips, mockGpsPoints, mockFuelLogs, mockMaintenanceLogs,
  mockVehicleDocuments, mockTransportRequests, mockSafetyIncidents, mockAiTransportInsights
} from './mockTransportData';

export interface TransportActivityLog {
  id: string;
  type: 'trip' | 'assignment' | 'fuel' | 'maintenance' | 'delay' | 'incident' | 'approval';
  message: string;
  timestamp: string;
  badgeColor?: string;
}

const defaultSettings: TransportSettings = {
  maxBusCapacity: 45,
  maxSpeedLimitKmH: 45,
  idleTimeoutMins: 10,
  maintenanceIntervalKm: 10000,
  fuelBudgetMonthly: 150000,
  enableParentSmsAlerts: true,
  enableGpsLiveTracking: true,
  emergencyContactNumber: '+91 80 4000 8888',
};

interface TransportContextType {
  buses: BusVehicle[];
  students: StudentTransportAssignment[];
  routes: BusRoute[];
  drivers: DriverRecord[];
  trips: TripRecord[];
  gpsPoints: GpsTrackingPoint[];
  fuelLogs: FuelLogEntry[];
  maintenanceLogs: MaintenanceRecord[];
  documents: VehicleDocument[];
  requests: TransportRequestItem[];
  incidents: SafetyIncidentRecord[];
  settings: TransportSettings;
  aiInsights: AiTransportInsight[];
  activities: TransportActivityLog[];
  toastMessage: string | null;
  showToast: (msg: string) => void;

  // Workflows
  assignStudentToBus: (assignment: Partial<StudentTransportAssignment>) => void;
  startTrip: (tripId: string) => void;
  endTrip: (tripId: string) => void;
  confirmBusDelay: (tripId: string, delayMinutes: number, reason: string) => void;
  scheduleMaintenance: (busNumber: string, serviceType: MaintenanceRecord['serviceType'], cost: number, notes: string) => void;
  addFuelEntry: (entry: Partial<FuelLogEntry>) => void;
  approveRequest: (requestId: string) => void;
  rejectRequest: (requestId: string) => void;
  reportIncident: (incident: Partial<SafetyIncidentRecord>) => void;
  addVehicle: (vehicle: Partial<BusVehicle>) => void;
  createRoute: (route: Partial<BusRoute>) => void;
  updateSettings: (newSettings: Partial<TransportSettings>) => void;
}

const TransportContext = createContext<TransportContextType | undefined>(undefined);

export function TransportProvider({ children }: { children: React.ReactNode }) {
  const [buses, setBuses] = useState<BusVehicle[]>(mockBuses);
  const [students, setStudents] = useState<StudentTransportAssignment[]>(mockStudentsTransport);
  const [routes, setRoutes] = useState<BusRoute[]>(mockBusRoutes);
  const [drivers, setDrivers] = useState<DriverRecord[]>(mockDrivers);
  const [trips, setTrips] = useState<TripRecord[]>(mockTrips);
  const [gpsPoints, setGpsPoints] = useState<GpsTrackingPoint[]>(mockGpsPoints);
  const [fuelLogs, setFuelLogs] = useState<FuelLogEntry[]>(mockFuelLogs);
  const [maintenanceLogs, setMaintenanceLogs] = useState<MaintenanceRecord[]>(mockMaintenanceLogs);
  const [documents, setDocuments] = useState<VehicleDocument[]>(mockVehicleDocuments);
  const [requests, setRequests] = useState<TransportRequestItem[]>(mockTransportRequests);
  const [incidents, setIncidents] = useState<SafetyIncidentRecord[]>(mockSafetyIncidents);
  const [settings, setSettings] = useState<TransportSettings>(defaultSettings);
  const [aiInsights, setAiInsights] = useState<AiTransportInsight[]>(mockAiTransportInsights);

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [activities, setActivities] = useState<TransportActivityLog[]>([
    { id: 'ACT-1', type: 'trip', message: 'BUS-01 started Morning Pickup on North Circuit Express', timestamp: '15 mins ago', badgeColor: '#4F46E5' },
    { id: 'ACT-2', type: 'delay', message: 'BUS-02 confirmed 15m delay due to Jayanagar metro traffic', timestamp: '25 mins ago', badgeColor: '#EF4444' },
    { id: 'ACT-3', type: 'fuel', message: 'Logged 45L Diesel entry for BUS-01 at Indian Oil Depot', timestamp: '1 hour ago', badgeColor: '#10B981' },
    { id: 'ACT-4', type: 'maintenance', message: 'Scheduled 50,000 km oil service for BUS-04', timestamp: '2 hours ago', badgeColor: '#F59E0B' },
  ]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const addActivity = (type: TransportActivityLog['type'], message: string, badgeColor = '#4F46E5') => {
    const newAct: TransportActivityLog = {
      id: `ACT-${Date.now()}`,
      type,
      message,
      timestamp: 'Just now',
      badgeColor,
    };
    setActivities((prev) => [newAct, ...prev]);
  };

  // Workflow 1: Assign Student to Bus
  const assignStudentToBus = (assignmentData: Partial<StudentTransportAssignment>) => {
    const newAssignment: StudentTransportAssignment = {
      id: `STU-TR-${Math.floor(100 + Math.random() * 900)}`,
      studentId: assignmentData.studentId || `STU-${Math.floor(100 + Math.random() * 900)}`,
      studentName: assignmentData.studentName || 'Student Name',
      classGrade: assignmentData.classGrade || 'Class 10-A',
      busNumber: assignmentData.busNumber || 'BUS-01',
      routeName: assignmentData.routeName || 'North Circuit Express',
      pickupPoint: assignmentData.pickupPoint || 'Main Bus Stop',
      dropPoint: assignmentData.dropPoint || 'School Gate A',
      pickupTime: assignmentData.pickupTime || '07:15 AM',
      dropTime: assignmentData.dropTime || '03:45 PM',
      parentPhone: assignmentData.parentPhone || '+91 98000 00000',
      status: 'Assigned',
    };

    setStudents((prev) => [newAssignment, ...prev]);

    // Update route student count
    setRoutes((prev) =>
      prev.map((r) => (r.routeName.toLowerCase() === newAssignment.routeName.toLowerCase() ? { ...r, totalStudentsAssigned: r.totalStudentsAssigned + 1 } : r))
    );

    addActivity('assignment', `Assigned ${newAssignment.studentName} (${newAssignment.classGrade}) to ${newAssignment.busNumber} (${newAssignment.routeName})`, '#4F46E5');
    showToast(`Student ${newAssignment.studentName} assigned to ${newAssignment.busNumber}! Parents notified.`);
  };

  // Workflow 2: Start Trip
  const startTrip = (tripId: string) => {
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setTrips((prev) =>
      prev.map((t) => (t.id === tripId ? { ...t, status: 'In Transit', actualStartTime: timeNow } : t))
    );

    // Update GPS live point
    const targetTrip = trips.find((t) => t.id === tripId);
    if (targetTrip) {
      setGpsPoints((prev) =>
        prev.map((g) => (g.busNumber === targetTrip.busNumber ? { ...g, status: 'In Motion', speedKmH: 35, lastPingTime: 'Just now' } : g))
      );
      addActivity('trip', `Trip "${targetTrip.tripName}" started. Live GPS tracking enabled.`, '#10B981');
    }
    showToast(`Trip started! Live GPS tracking broadcasting to Parents & Dashboard.`);
  };

  // Workflow 3: End Trip
  const endTrip = (tripId: string) => {
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setTrips((prev) =>
      prev.map((t) => (t.id === tripId ? { ...t, status: 'Completed', actualEndTime: timeNow } : t))
    );

    const targetTrip = trips.find((t) => t.id === tripId);
    if (targetTrip) {
      setGpsPoints((prev) =>
        prev.map((g) => (g.busNumber === targetTrip.busNumber ? { ...g, status: 'Stopped', speedKmH: 0, lastPingTime: 'Just now' } : g))
      );
      addActivity('trip', `Trip "${targetTrip.tripName}" completed successfully. Student attendance synced.`, '#4F46E5');
    }
    showToast(`Trip completed! Attendance synced and reports updated.`);
  };

  // Workflow 4: Bus Delay Notification
  const confirmBusDelay = (tripId: string, delayMinutes: number, reason: string) => {
    setTrips((prev) =>
      prev.map((t) => (t.id === tripId ? { ...t, status: 'Delayed', delayMinutes, delayReason: reason } : t))
    );

    const targetTrip = trips.find((t) => t.id === tripId);
    if (targetTrip) {
      setRoutes((prev) =>
        prev.map((r) => (r.busNumber === targetTrip.busNumber ? { ...r, status: 'Delayed' } : r))
      );
      addActivity('delay', `Confirmed ${delayMinutes}m delay for ${targetTrip.busNumber}: ${reason}`, '#EF4444');
      showToast(`Automated Delay SMS & Push Notifications dispatched to all parents on ${targetTrip.routeName}!`);
    }
  };

  // Workflow 5: Schedule Maintenance
  const scheduleMaintenance = (
    busNumber: string,
    serviceType: MaintenanceRecord['serviceType'],
    cost: number,
    notes: string
  ) => {
    const today = new Date().toISOString().split('T')[0];
    const nextDue = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    const newMnt: MaintenanceRecord = {
      id: `MNT-${Math.floor(100 + Math.random() * 900)}`,
      busNumber,
      serviceType,
      serviceDate: today,
      nextDueDate: nextDue,
      cost,
      vendorName: 'Authorized Service Station',
      status: 'Scheduled',
      notes,
    };

    setMaintenanceLogs((prev) => [newMnt, ...prev]);

    // Set Bus status to In Servicing
    setBuses((prev) =>
      prev.map((b) => (b.busNumber === busNumber ? { ...b, status: 'In Servicing' } : b))
    );

    addActivity('maintenance', `Scheduled ${serviceType} for ${busNumber} (Est Cost ₹${cost}).`, '#F59E0B');
    showToast(`Bus ${busNumber} scheduled for ${serviceType}! Fleet availability updated.`);
  };

  // Workflow 6: Add Fuel Entry
  const addFuelEntry = (entry: Partial<FuelLogEntry>) => {
    const busNum = entry.busNumber || 'BUS-01';
    const litres = Number(entry.fuelLitres) || 40;
    const costPerLit = Number(entry.costPerLitre) || 94.5;
    const totalCost = litres * costPerLit;

    const newFuel: FuelLogEntry = {
      id: `FL-${Math.floor(100 + Math.random() * 900)}`,
      busNumber: busNum,
      date: new Date().toISOString().split('T')[0],
      fuelLitres: litres,
      costPerLitre: costPerLit,
      totalCost: totalCost,
      odometerReadingKm: Number(entry.odometerReadingKm) || 42000,
      fillingStation: entry.fillingStation || 'Central HP Station',
      mileageKmL: 4.5,
      filledBy: entry.filledBy || 'Fleet Attendant',
    };

    setFuelLogs((prev) => [newFuel, ...prev]);

    // Update fuel level percent
    setBuses((prev) =>
      prev.map((b) => (b.busNumber === busNum ? { ...b, currentFuelLevelPercent: 95 } : b))
    );

    addActivity('fuel', `Logged ${litres}L fuel for ${busNum} (₹${totalCost}). Mileage calculated.`, '#10B981');
    showToast(`Fuel entry saved for ${busNum}! Tank refilled & mileage calculated.`);
  };

  // Workflow 7: Approve Request
  const approveRequest = (requestId: string) => {
    const req = requests.find((r) => r.id === requestId);
    if (!req) return;

    setRequests((prev) =>
      prev.map((r) => (r.id === requestId ? { ...r, status: 'Approved' } : r))
    );

    // Auto-allocate student
    assignStudentToBus({
      studentId: req.studentId,
      studentName: req.studentName,
      classGrade: req.classGrade,
      routeName: req.requestedRoute,
      pickupPoint: req.requestedStop,
      busNumber: 'BUS-01',
    });

    addActivity('approval', `Approved ${req.requestType} for ${req.studentName} (${req.requestedRoute})`, '#10B981');
    showToast(`Request approved! ${req.studentName} allocated to ${req.requestedRoute}.`);
  };

  // Workflow 8: Reject Request
  const rejectRequest = (requestId: string) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === requestId ? { ...r, status: 'Rejected' } : r))
    );
    showToast('Transport request marked as rejected.');
  };

  // Workflow 9: Report Incident
  const reportIncident = (inc: Partial<SafetyIncidentRecord>) => {
    const newInc: SafetyIncidentRecord = {
      id: `INC-${Math.floor(100 + Math.random() * 900)}`,
      busNumber: inc.busNumber || 'BUS-02',
      driverName: inc.driverName || 'Assigned Driver',
      incidentType: inc.incidentType || 'Vehicle Breakdown',
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      location: inc.location || 'Outer Ring Road',
      severity: inc.severity || 'Medium',
      status: 'Reported',
      actionTaken: inc.actionTaken || 'Incident logged & emergency dispatch notified.',
    };

    setIncidents((prev) => [newInc, ...prev]);
    addActivity('incident', `SAFETY ALERT: ${newInc.incidentType} reported on ${newInc.busNumber} (${newInc.severity} Severity)`, '#DC2626');
    showToast(`Incident reported! Emergency response protocol initiated.`);
  };

  // Workflow 10: Add Vehicle
  const addVehicle = (vehicle: Partial<BusVehicle>) => {
    const id = `BUS-${String(buses.length + 1).padStart(2, '0')}`;
    const newBus: BusVehicle = {
      id,
      busNumber: vehicle.busNumber || id,
      registrationNumber: vehicle.registrationNumber || 'KA-01-EQ-9999',
      capacity: Number(vehicle.capacity) || 45,
      assignedDriverName: vehicle.assignedDriverName || 'Unassigned',
      assignedRouteName: vehicle.assignedRouteName || 'Unassigned',
      status: 'Active',
      fuelType: vehicle.fuelType || 'Diesel',
      currentFuelLevelPercent: 100,
      insuranceExpiry: '2027-06-30',
      fitnessExpiry: '2027-06-30',
      pollutionExpiry: '2026-12-31',
      permitExpiry: '2027-12-31',
      totalKmDriven: 0,
      lastServiceDate: new Date().toISOString().split('T')[0],
    };

    setBuses((prev) => [...prev, newBus]);
    showToast(`New vehicle ${newBus.busNumber} added to fleet registry!`);
  };

  // Workflow 11: Create Route
  const createRoute = (r: Partial<BusRoute>) => {
    const id = `RT-${String(routes.length + 1).padStart(2, '0')}`;
    const newRoute: BusRoute = {
      id,
      routeName: r.routeName || 'New Route Circuit',
      routeCode: r.routeCode || `NRC-${id}`,
      busNumber: r.busNumber || 'BUS-01',
      driverName: r.driverName || 'Assigned Driver',
      attendantName: r.attendantName || 'Assigned Attendant',
      totalStops: r.totalStops || 4,
      totalDistanceKm: r.totalDistanceKm || 15,
      estimatedDurationMins: r.estimatedDurationMins || 40,
      totalStudentsAssigned: 0,
      status: 'Operational',
      stops: [],
    };

    setRoutes((prev) => [...prev, newRoute]);
    showToast(`New route circuit "${newRoute.routeName}" created!`);
  };

  // Workflow 12: Settings
  const updateSettings = (newSettings: Partial<TransportSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
    showToast('Transport policy rules & GPS settings updated!');
  };

  return (
    <TransportContext.Provider
      value={{
        buses,
        students,
        routes,
        drivers,
        trips,
        gpsPoints,
        fuelLogs,
        maintenanceLogs,
        documents,
        requests,
        incidents,
        settings,
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
        approveRequest,
        rejectRequest,
        reportIncident,
        addVehicle,
        createRoute,
        updateSettings,
      }}
    >
      {children}
    </TransportContext.Provider>
  );
}

export function useTransportStore() {
  const context = useContext(TransportContext);
  if (!context) {
    throw new Error('useTransportStore must be used within a TransportProvider');
  }
  return context;
}
