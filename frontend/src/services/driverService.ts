import axios from '@/utils/axios';

export const getAllDrivers = async (params?: {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  vehicle_id?: number;
  sort_by?: string;
  sort_order?: string;
}) => {
  const response = await axios.get('/drivers', { params });
  return response.data;
};

// Get driver by ID
export const getDriverById = async (id: string) => {
  const response = await axios.get(`/drivers/${id}`);
  return response.data;
};

// Create new driver
export const createDriver = async (driverData: {
  driver_name: string;
  licence_number: string;
  licence_expiry_date?: string | null;
  contact_number: string;
  email: string;
  address?: string | null;
  driver_image_url?: string | null;
  licence_document_url?: string | null;
  vehicle_id?: number | null;
  status?: string;
}) => {
  const response = await axios.post('/drivers', driverData);
  return response.data;
};

// Update driver
export const updateDriver = async (id: string, driverData: {
  driver_name?: string;
  licence_number?: string;
  licence_expiry_date?: string | null;
  contact_number?: string;
  email?: string;
  address?: string | null;
  driver_image_url?: string | null;
  licence_document_url?: string | null;
  vehicle_id?: number | null;
  status?: string;
}) => {
  const response = await axios.put(`/drivers/${id}`, driverData);
  return response.data;
};

// Delete driver
export const deleteDriver = async (id: string) => {
  const response = await axios.delete(`/drivers/${id}`);
  return response.data;
};

// Get driver statistics
export const getDriverStats = async () => {
  const response = await axios.get('/drivers/stats');
  return response.data;
};

// Get available drivers (not assigned to any vehicle)
export const getAvailableDrivers = async () => {
  const response = await axios.get('/drivers/available');
  return response.data;
};

// Get available vehicles for driver assignment
export const getAvailableVehicles = async () => {
  const response = await axios.get('/vehicles?status=ACTIVE&unassigned=true');
  return response.data;
};