"use client";

import  { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Edit, Trash2, Car, Calendar, MapPin, User, Truck, Settings } from 'lucide-react';
import Modal from '@/components/(shared)/Modal';
import SuccessMessage from '@/components/(shared)/SuccessMessage';
import ErrorMessage from '@/components/(shared)/ErrorMessage';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toDateOnly } from '@/common/dateConvertor';
import { createVehicle, getAllVehicles, updateVehicle } from '@/services/vehicleService';
import { Vehicle } from '@/common/interface';
import { vehicleSchema } from '@/common/vehicleShema';



export default function VehiclesManagement() {
  const router = useRouter();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      const response = await getAllVehicles();
      console.log('Fetched vehicles:', response);
      setVehicles(response?.data?.vehicles || []);
    } catch (error: any) {
      console.error('Error fetching vehicles:', error);
      setErrorMessage(error.response?.data?.message || 'Failed to fetch vehicles');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);


  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue
  } = useForm({
    resolver: yupResolver(vehicleSchema),
    defaultValues: {
      vehicleNumber: '',
      vehicleType: 'TRAILER',
      make: '',
      model: '',
      year: new Date().getFullYear(),
      color: '',
      vinNumber: '',
      licensePlate: '',
      registrationExpiry: null,
      insuranceExpiry: null,
      capacity: null,
      fuelType: 'LPG',
      mileage: null,
      status: 'ACTIVE',
      lastServiceDate: null,
      nextServiceDate: null,
      purchaseDate: null,
      purchasePrice: null,
      currentValue: null,
      gpsTrackerId: '',
      notes: ''
    }
  });



  const onSubmit = async (data: any) => {
    try {
      console.log("Original Data:", data);

      const formattedData = {
        ...data,
        registrationExpiry: toDateOnly(data.registrationExpiry),
        insuranceExpiry: toDateOnly(data.insuranceExpiry),
        lastServiceDate: toDateOnly(data.lastServiceDate),
        nextServiceDate: toDateOnly(data.nextServiceDate),
        purchaseDate: toDateOnly(data.purchaseDate),
      };

      console.log("Formatted Data (DateOnly):", formattedData);

      const result = selectedVehicle
        ? await updateVehicle(selectedVehicle.id.toString(), formattedData)
        : await createVehicle(formattedData);
      
      console.log(`Vehicle ${selectedVehicle ? 'updated' : 'created'} successfully:`, result);

      setSuccessMessage(`Vehicle ${selectedVehicle ? 'updated' : 'added'} successfully!`);
      setIsModalOpen(false);
      setSelectedVehicle(null);
      reset();
      
      fetchVehicles();
    } catch (error: any) {
  console.error(
    `Error ${selectedVehicle ? 'updating' : 'creating'} vehicle:`,
    error
  );

  // ✅ Get backend message safely
  const apiMessage =
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.message ||
    `Failed to ${selectedVehicle ? 'update' : 'create'} vehicle`;

  setErrorMessage(apiMessage);
}

  };

  const handleDeleteVehicle = (id: any) => {
    setVehicles(vehicles.filter(v => v.id !== id));
    setSuccessMessage('Vehicle deleted successfully!');
  };

  const getVehicleIcon = (type: any) => {
    switch (type) {
      case 'TRUCK': return <Truck className="w-7 h-7 text-white" />;
      case 'VAN': return <Car className="w-7 h-7 text-white" />;
      case 'CAR': return <Car className="w-7 h-7 text-white" />;
      default: return <Car className="w-7 h-7 text-white" />;
    }
  };

  const openModal = (vehicle: any | null = null) => {
    setSelectedVehicle(vehicle);
    if (vehicle) {
      setValue("vehicleNumber", vehicle.vehicleNumber || '');
      setValue("vehicleType", vehicle.vehicleType || 'TRAILER');
      setValue("make", vehicle.make || '');
      setValue("model", vehicle.model || '');
      setValue("year", vehicle.year || new Date().getFullYear());
      setValue("color", vehicle.color || '');
      setValue("vinNumber", vehicle.vinNumber || '');
      setValue("licensePlate", vehicle.licensePlate || '');
      setValue("registrationExpiry", vehicle.registrationExpiry || null);
      setValue("insuranceExpiry", vehicle.insuranceExpiry || null);
      setValue("capacity", vehicle.capacity || null);
      setValue("fuelType", vehicle.fuelType || 'LPG');
      setValue("mileage", vehicle.mileage || null);
      setValue("status", vehicle.status || 'ACTIVE');
      setValue("lastServiceDate", vehicle.lastServiceDate || null);
      setValue("nextServiceDate", vehicle.nextServiceDate || null);
      setValue("purchaseDate", vehicle.purchaseDate ||  null);
      setValue("purchasePrice", vehicle.purchasePrice || null);
      setValue("currentValue", vehicle.currentValue || null);
      setValue("gpsTrackerId", vehicle.gpsTrackerId || '');
      setValue("notes", vehicle.notes || '');
    } else {
      reset();
    }
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedVehicle(null);
    reset();
  };



  return (
    <div className="min-h-screen w-full bg-white">
      {successMessage && (
        <SuccessMessage
          message={successMessage}
          onClose={() => setSuccessMessage('')}
        />
      )}
      {errorMessage && (
        <ErrorMessage
          message={errorMessage}
          onClose={() => setErrorMessage('')}
        />
      )}

      <div className="bg-white px-6 sm:px-8 lg:px-12 py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-medium text-gray-700 mb-2 tracking-normal">
              Vehicle Management
            </h1>
            <p className="text-gray-400 text-base font-light">
              Manage all vehicle details, pollution certificates, installments, and all type of data efficiently
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <button
              onClick={() => openModal(null)}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Plus className="w-5 h-5" />
              Add Vehicle
            </button>
          </div>
        </div>
      </div>

      <div className="px-6 sm:px-8 lg:px-12 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white border-2 border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gray-100 rounded-xl">
                <Truck className="w-8 h-8 text-gray-600" />
              </div>
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Vehicles</p>
                <p className="text-3xl font-bold text-gray-800">{vehicles.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white border-2 border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gray-100 rounded-xl">
                <Settings className="w-8 h-8 text-gray-600" />
              </div>
              <div>
                <p className="text-gray-600 text-sm font-medium">Active Vehicles</p>
                <p className="text-3xl font-bold text-gray-800">{vehicles.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white border-2 border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gray-100 rounded-xl">
                <Calendar className="w-8 h-8 text-gray-600" />
              </div>
              <div>
                <p className="text-gray-600 text-sm font-medium">Maintenance Due</p>
                <p className="text-3xl font-bold text-gray-800">0</p>
              </div>
            </div>
          </div>
        </div>


      </div>

      <div className="px-6 sm:px-8 lg:px-12 pb-10">
        {vehicles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {vehicles.map((vehicle) => (
              <div key={vehicle.id} className="bg-white rounded-2xl shadow-lg border border-blue-100 hover:shadow-2xl hover:border-blue-200 transition-all duration-300 transform hover:scale-105 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-linear-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
                      {getVehicleIcon(vehicle.vehicleType)}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg tracking-tight">{vehicle.vehicleNumber}</h3>
                      <p className="text-blue-600 font-semibold text-sm">{vehicle.vehicleType}</p>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="p-1 bg-blue-50 rounded-md">
                        <Car className="w-4 h-4 text-blue-500" />
                      </div>
                      <span className="text-gray-700 font-medium text-sm">{vehicle.make} {vehicle.model}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="p-1 bg-green-50 rounded-md">
                        <Calendar className="w-4 h-4 text-green-500" />
                      </div>
                      <span className="text-gray-700 text-sm">Year: {vehicle.year}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="p-1 bg-purple-50 rounded-md">
                        <MapPin className="w-4 h-4 text-purple-500" />
                      </div>
                      <span className="text-gray-700 text-sm">{vehicle.licensePlate}</span>
                    </div>

                    {vehicle.capacity && (
                      <div className="flex items-center gap-3">
                        <div className="p-1 bg-orange-50 rounded-md">
                          <Truck className="w-4 h-4 text-orange-500" />
                        </div>
                        <span className="text-gray-700 text-sm">Capacity: {vehicle.capacity} tons</span>
                      </div>
                    )}

                    <div className="flex items-center gap-3">
                      <div className="p-1 bg-yellow-50 rounded-md">
                        <User className="w-4 h-4 text-yellow-600" />
                      </div>
                      <span className="text-gray-700 text-sm">Fuel: {vehicle.fuelType}</span>
                    </div>

                   
                  </div>

                
               

                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Active
                    </span>
                    <span className="text-xs text-gray-500">ID: {vehicle.id}</span>
                  </div>

                  <div className="flex gap-2">
                    <button 
                      onClick={() => router.push(`/admin-dashboard/vehicles-management/${vehicle.id}`)}
                      className="flex-1 inline-flex items-center justify-center gap-2 bg-linear-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-2 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
                    >
                      <Car className="w-4 h-4" />
                      Detail
                    </button>
                    <button 
                      onClick={() => openModal(vehicle)}
                      className="flex-1 inline-flex items-center justify-center gap-2 bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-2 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteVehicle(vehicle.id)}
                      className="flex-1 inline-flex items-center justify-center gap-2 bg-linear-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-2 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (

          <div className="text-center py-16">
            <div className="p-4 bg-blue-50 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <Car className="w-10 h-10 text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No vehicles found</h3>
            <p className="text-gray-500 text-lg">Start by adding your first vehicle to the system.</p>
            <button
              onClick={() => openModal(null)}
              className="mt-6 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add Your First Vehicle
            </button>
          </div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        title={selectedVehicle ? "Edit Vehicle Details" : "Add New Vehicle"}
        size="x-lg"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6  px-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-black mb-3">
                Vehicle Number *
              </label>
              <input
                type="text"
                onInput={(e) => {
                  e.currentTarget.value = e.currentTarget.value.toUpperCase();
                }}
                {...register('vehicleNumber')}
                placeholder="e.g., MH-12-AB-1234"
                className={`w-full px-5 py-4 border-2 rounded-lg font-medium text-gray-900 placeholder-gray-500 bg-white transition-all duration-200 ${
                  errors.vehicleNumber 
                    ? 'border-red-400 focus:border-red-500' 
                    : 'border-gray-300 focus:border-gray-600 hover:border-gray-400'
                }`}
              />
              {errors.vehicleNumber && <p className="text-red-600 text-sm mt-2 font-medium">{errors.vehicleNumber.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-bold text-black mb-3">
                Vehicle Type *
              </label>
              <select
                {...register('vehicleType')}
                className={`w-full px-5 py-4 border-2 rounded-lg font-medium text-gray-900 bg-white transition-all duration-200 ${
                  errors.vehicleType 
                    ? 'border-red-400 focus:border-red-500' 
                    : 'border-gray-300 focus:border-gray-600 hover:border-gray-400'
                }`}
              >
                <option value="" className="text-gray-500">Select Vehicle Type</option>
                <option value="TRUCK">Truck</option>
                <option value="VAN">Van</option>
                <option value="CAR">Car</option>
                <option value="MOTORCYCLE">Motorcycle</option>
                <option value="BUS">Bus</option>
                <option value="TRAILER">Trailer</option>
                <option value="TANKER">Tanker</option>
                <option value="REFRIGERATED_TRUCK">Refrigerated Truck</option>
                <option value="FLATBED">Flatbed</option>
                <option value="PICKUP">Pickup</option>
              </select>
              {errors.vehicleType && <p className="text-red-600 text-sm mt-2 font-medium">{errors.vehicleType.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-bold text-black mb-3">
                Make *
              </label>
              <input
                type="text"
                {...register('make')}
                placeholder="e.g., Tata"
                className={`w-full px-5 py-4 border-2 rounded-lg font-medium text-gray-900 placeholder-gray-500 bg-white transition-all duration-200 ${
                  errors.make 
                    ? 'border-red-400 focus:border-red-500' 
                    : 'border-gray-300 focus:border-gray-600 hover:border-gray-400'
                }`}
              />
              {errors.make && <p className="text-red-600 text-sm mt-2 font-medium">{errors.make.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-bold text-black mb-3">
                Model *
              </label>
              <input
                type="text"
                onInput={(e) => {
                  e.currentTarget.value = e.currentTarget.value.toUpperCase();
                }}
                {...register('model')}
                placeholder="e.g., LPT 1109"
                className={`w-full px-5 py-4 border-2 rounded-lg font-medium text-gray-900 placeholder-gray-500 bg-white transition-all duration-200 ${
                  errors.model 
                    ? 'border-red-400 focus:border-red-500' 
                    : 'border-gray-300 focus:border-gray-600 hover:border-gray-400'
                }`}
              />
              {errors.model && <p className="text-red-600 text-sm mt-2 font-medium">{errors.model.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-bold text-black mb-3">
                Year *
              </label>
              <input
                type="number"
                onWheel={(e) => e.currentTarget.blur()}
                {...register('year')}
                placeholder="2024"
                className={`w-full px-5 py-4 border-2 rounded-lg font-medium text-gray-900 placeholder-gray-500 bg-white transition-all duration-200 ${
                  errors.year 
                    ? 'border-red-400 focus:border-red-500' 
                    : 'border-gray-300 focus:border-gray-600 hover:border-gray-400'
                }`}
              />
              {errors.year && <p className="text-red-600 text-sm mt-2 font-medium">{errors.year.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-black mb-3">
                License Plate *
              </label>
              <input
                type="text"
                onInput={(e) => {
                  e.currentTarget.value = e.currentTarget.value.toUpperCase();
                }}
                {...register('licensePlate')}
                placeholder="e.g., MH-12-AB-1234"
                className={`w-full px-5 py-4 border-2 rounded-lg font-medium text-gray-900 placeholder-gray-500 bg-white transition-all duration-200 ${
                  errors.licensePlate 
                    ? 'border-red-400 focus:border-red-500' 
                    : 'border-gray-300 focus:border-gray-600 hover:border-gray-400'
                }`}
              />
              {errors.licensePlate && <p className="text-red-600 text-sm mt-2 font-medium">{errors.licensePlate.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-bold text-black mb-3">
                VIN Number
              </label>
              <input
                type="text"
                onInput={(e) => {
                  e.currentTarget.value = e.currentTarget.value.toUpperCase();
                }}
                {...register('vinNumber')}
                placeholder="17-character VIN"
                maxLength={17}
                className="w-full px-5 py-4 border-2 border-gray-300 rounded-lg font-medium text-gray-900 placeholder-gray-500 bg-white focus:border-gray-600 hover:border-gray-400 transition-all duration-200"
              />
              {errors.vinNumber && <p className="text-red-600 text-sm mt-2 font-medium">{errors.vinNumber.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-bold text-black mb-3">
                Fuel Type *
              </label>
              <select
                {...register('fuelType')}
                className={`w-full px-5 py-4 border-2 rounded-lg font-medium text-gray-900 bg-white transition-all duration-200 ${
                  errors.fuelType 
                    ? 'border-red-400 focus:border-red-500' 
                    : 'border-gray-300 focus:border-gray-600 hover:border-gray-400'
                }`}
              >
                <option value="" className="text-gray-500">Select Fuel Type</option>
                <option value="PETROL">Petrol</option>
                <option value="DIESEL">Diesel</option>
                <option value="ELECTRIC">Electric</option>
                <option value="HYBRID">Hybrid</option>
                <option value="CNG">CNG</option>
                <option value="LPG">LPG</option>
              </select>
              {errors.fuelType && <p className="text-red-600 text-sm mt-2 font-medium">{errors.fuelType.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-bold text-black mb-3">
                Capacity (tons)
              </label>
              <input
                type="number"
                step="0.1"
                {...register('capacity')}
                placeholder="5.0"
                className="w-full px-5 py-4 border-2 border-gray-300 rounded-lg font-medium text-gray-900 placeholder-gray-500 bg-white focus:border-gray-600 hover:border-gray-400 transition-all duration-200"
              />
              {errors.capacity && <p className="text-red-600 text-sm mt-2 font-medium">{errors.capacity.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-bold text-black mb-3">
                Color
              </label>
              <input
                type="text"
                {...register('color')}
                placeholder="White"
                className="w-full px-5 py-4 border-2 border-gray-300 rounded-lg font-medium text-gray-900 placeholder-gray-500 bg-white focus:border-gray-600 hover:border-gray-400 transition-all duration-200"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-black mb-3">
                Registration Expiry
              </label>
              <input
                type="date"
                {...register('registrationExpiry')}
                className="w-full px-5 py-4 border-2 border-gray-300 rounded-lg font-medium text-gray-900 bg-white focus:border-gray-600 hover:border-gray-400 transition-all duration-200"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-black mb-3">
                Insurance Expiry
              </label>
              <input
                type="date"
                {...register('insuranceExpiry')}
                className="w-full px-5 py-4 border-2 border-gray-300 rounded-lg font-medium text-gray-900 bg-white focus:border-gray-600 hover:border-gray-400 transition-all duration-200"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-black mb-3">
                Last Service Date
              </label>
              <input
                type="date"
                {...register('lastServiceDate')}
                className="w-full px-5 py-4 border-2 border-gray-300 rounded-lg font-medium text-gray-900 bg-white focus:border-gray-600 hover:border-gray-400 transition-all duration-200"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-black mb-3">
                Next Service Date
              </label>
              <input
                type="date"
                {...register('nextServiceDate')}
                className="w-full px-5 py-4 border-2 border-gray-300 rounded-lg font-medium text-gray-900 bg-white focus:border-gray-600 hover:border-gray-400 transition-all duration-200"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-black mb-3">
                Mileage (km)
              </label>
              <input
                type="number"
                {...register('mileage')}
                placeholder="50000"
                className="w-full px-5 py-4 border-2 border-gray-300 rounded-lg font-medium text-gray-900 placeholder-gray-500 bg-white focus:border-gray-600 hover:border-gray-400 transition-all duration-200"
              />
              {errors.mileage && <p className="text-red-600 text-sm mt-2 font-medium">{errors.mileage.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-bold text-black mb-3">
                GPS Tracker ID
              </label>
              <input
                type="text"
                {...register('gpsTrackerId')}
                placeholder="GPS-001"
                className="w-full px-5 py-4 border-2 border-gray-300 rounded-lg font-medium text-gray-900 placeholder-gray-500 bg-white focus:border-gray-600 hover:border-gray-400 transition-all duration-200"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-black mb-3">
              Notes
            </label>
            <textarea
              rows={4}
              {...register('notes')}
              placeholder="Additional notes about the vehicle..."
              className="w-full px-5 py-4 border-2 border-gray-300 rounded-lg font-medium text-gray-900 placeholder-gray-500 bg-white focus:border-gray-600 hover:border-gray-400 transition-all duration-200 resize-none"
            />
          </div>

          <div className="flex justify-end gap-4 pt-6 border-t-2 border-gray-200">
            <button
              type="button"
              onClick={handleModalClose}
              className="px-8 py-4 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg font-bold transition-all duration-200 border-2 border-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-4 bg-black hover:bg-gray-800 text-white rounded-lg font-bold transition-all duration-200"
            >
              {selectedVehicle ? "Update Vehicle" : "Add Vehicle"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}