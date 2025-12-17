export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
}


export interface SlideContent {
  image: string;
  title: string;
  subtitle: string;
}


export interface HeroContent {
  slides: SlideContent[];
  rating: string;
  customerCount: string;
  ctaPrimaryText: string;
  ctaSecondaryText: string;
}


export interface Vehicle {
  id: string | number;
  vehicleNumber: string;
  vehicleType: string;
  make: string;
  model: string;
  year: number;
  color?: string | null;
  vinNumber?: string | null;
  licensePlate: string;
  registrationExpiry?: string | null;
  insuranceExpiry?: string | null;
  capacity?: number | null;
  fuelType: string;
  mileage?: number | null;
  status: string;
  lastServiceDate?: string | null;
  nextServiceDate?: string | null;
  purchaseDate?: string | null;
  purchasePrice?: number | null;
  currentValue?: number | null;
  gpsTrackerId?: string | null;
  notes?: string | null;
  driver?: string;
  location?: string;
}

export interface Driver {
  id: string | number;
  driver_name: string;
  licence_number: string;
  licence_expiry_date?: string | null;
  contact_number: string;
  email: string;
  address?: string | null;
  driver_image_url?: string | null;
  licence_document_url?: string | null;
  vehicle_id?: number | null;
  status: string;
  createdAt?: string;
  updatedAt?: string;
  vehicle?: {
    id: number;
    vehicleNumber: string;
    make: string;
    model: string;
    status: string;
  };
  tenant?: {
    id: string;
    name: string;
  };
  nextMaintenance?: string;
};