import axios from "@/utils/axios";

export const createVehicle = async (vehicleData: any) => {
  const response = await axios.post("/vehicles", vehicleData);
  return response.data;
};

export const getAllVehicles = async () => {
  const response = await axios.get("/vehicles");
  return response.data;
};

export const getVehicleById = async (id: string) => {
  const response = await axios.get(`/vehicles/${id}`);
  return response.data;
};

export const updateVehicle = async (id: string, vehicleData: any) => {
  const response = await axios.put(`/vehicles/${id}`, vehicleData);
  return response.data;
};

export const deleteVehicle = async (id: string) => {
  const response = await axios.delete(`/vehicles/${id}`);
  return response.data;
};


export const getVehicleDocuments = async (vehicleId: string) => {
  const response = await axios.get(`/vehicle-documents/vehicle/${vehicleId}`);
  return response.data;
};

export const uploadVehicleDocument = async (documentData: FormData) => {
  const response = await axios.post("/vehicle-documents/upload", documentData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const downloadVehicleDocument = async (documentId: string) => {
  const response = await axios.get(`/vehicle-documents/${documentId}/download`, {
    responseType: "blob",
  });
  return response;
};

export const deleteVehicleDocument = async (documentId: string) => {
  const response = await axios.delete(`/vehicle-documents/${documentId}`);
  return response.data;
};

export const updateVehicleDocument = async (documentId: string, updateData: any) => {
  const response = await axios.put(`/vehicle-documents/${documentId}`, updateData);
  return response.data;
};



