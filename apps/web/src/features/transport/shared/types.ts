export interface BusVehicle {
  id: string;
  busNumber: string;
  registrationNumber: string;
  capacity: number;
  assignedDriverId?: string;
  assignedDriverName?: string;
  assignedRouteId?: string;
  assignedRouteName?: string;
  status: 'Active' | 'In Servicing' | 'Out of Service' | 'Reserved';
  fuelType: 'Diesel' | 'EV' | 'CNG';
  currentFuelLevelPercent: number;
  insuranceExpiry: string;
  fitnessExpiry: string;
  pollutionExpiry: string;
  permitExpiry: string;
  totalKmDriven: number;
  lastServiceDate: string;
}

export interface StudentTransportAssignment {
  id: string;
  studentId: string;
  studentName: string;
  classGrade: string;
  busNumber: string;
  routeName: string;
  pickupPoint: string;
  dropPoint: string;
  pickupTime: string;
  dropTime: string;
  parentPhone: string;
  status: 'Assigned' | 'Suspended' | 'Pending Request';
}

export interface BusStop {
  id: string;
  stopName: string;
  sequenceNo: number;
  morningPickupTime: string;
  eveningDropTime: string;
  studentsCount: number;
  landmark: string;
}

export interface BusRoute {
  id: string;
  routeName: string;
  routeCode: string;
  busNumber: string;
  driverName: string;
  attendantName: string;
  totalStops: number;
  totalDistanceKm: number;
  estimatedDurationMins: number;
  totalStudentsAssigned: number;
  status: 'Operational' | 'Delayed' | 'Optimized';
  stops: BusStop[];
}

export interface DriverRecord {
  id: string;
  name: string;
  role: 'Driver' | 'Attendant';
  phone: string;
  licenseNumber: string;
  licenseExpiry: string;
  experienceYears: number;
  medicalCertExpiry: string;
  assignedBusNumber?: string;
  assignedRouteName?: string;
  attendanceStatus: 'Present' | 'Absent' | 'On Leave';
  performanceRating: number; // e.g. 4.8 / 5
}

export interface TripRecord {
  id: string;
  tripName: string;
  tripType: 'Morning Pickup' | 'Evening Drop' | 'Special Field Trip';
  busNumber: string;
  driverName: string;
  routeName: string;
  scheduledStartTime: string;
  actualStartTime?: string;
  scheduledEndTime: string;
  actualEndTime?: string;
  status: 'Scheduled' | 'In Transit' | 'Completed' | 'Delayed' | 'Cancelled';
  delayMinutes: number;
  delayReason?: string;
  studentsBoarded: number;
  totalStudents: number;
}

export interface GpsTrackingPoint {
  busId: string;
  busNumber: string;
  routeName: string;
  driverName: string;
  currentLat: number;
  currentLng: number;
  speedKmH: number;
  heading: string;
  currentStopName: string;
  nextStopName: string;
  etaMinsNextStop: number;
  status: 'In Motion' | 'Stopped' | 'Speed Warning' | 'Idle';
  lastPingTime: string;
}

export interface FuelLogEntry {
  id: string;
  busNumber: string;
  date: string;
  fuelLitres: number;
  costPerLitre: number;
  totalCost: number;
  odometerReadingKm: number;
  fillingStation: string;
  mileageKmL: number;
  filledBy: string;
}

export interface MaintenanceRecord {
  id: string;
  busNumber: string;
  serviceType: 'Regular Service' | 'Tyre Replacement' | 'Engine Repair' | 'Oil & Filter' | 'Brake Inspection';
  serviceDate: string;
  nextDueDate: string;
  cost: number;
  vendorName: string;
  status: 'Completed' | 'Scheduled' | 'In Progress';
  notes: string;
}

export interface VehicleDocument {
  id: string;
  busNumber: string;
  docType: 'Insurance Policy' | 'Registration (RC)' | 'Fitness Certificate' | 'Pollution (PUC)' | 'Road Permit';
  documentNumber: string;
  issueDate: string;
  expiryDate: string;
  issuingAuthority: string;
  status: 'Valid' | 'Expiring Soon' | 'Expired';
}

export interface TransportRequestItem {
  id: string;
  studentId: string;
  studentName: string;
  classGrade: string;
  requestType: 'New Allocation' | 'Route Change' | 'Stop Change' | 'Cancellation';
  currentRoute?: string;
  requestedRoute: string;
  requestedStop: string;
  reason: string;
  requestDate: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

export interface SafetyIncidentRecord {
  id: string;
  busNumber: string;
  driverName: string;
  incidentType: 'Speed Violation' | 'Vehicle Breakdown' | 'Minor Bump' | 'Route Deviation' | 'Student Medical Alert';
  date: string;
  time: string;
  location: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Reported' | 'Under Investigation' | 'Resolved';
  actionTaken: string;
}

export interface TransportSettings {
  maxBusCapacity: number;
  maxSpeedLimitKmH: number;
  idleTimeoutMins: number;
  maintenanceIntervalKm: number;
  fuelBudgetMonthly: number;
  enableParentSmsAlerts: boolean;
  enableGpsLiveTracking: boolean;
  emergencyContactNumber: string;
}

export interface AiTransportInsight {
  id: string;
  type: 'route_opt' | 'maintenance_pred' | 'fuel_eff' | 'delay_risk' | 'safety';
  title: string;
  description: string;
  metric?: string;
  actionText?: string;
  impact: 'High' | 'Medium' | 'Low';
}
