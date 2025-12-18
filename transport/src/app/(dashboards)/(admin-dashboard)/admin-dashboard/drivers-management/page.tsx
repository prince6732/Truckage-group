"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Edit, Trash2, User, Calendar, Phone, Mail, MapPin, Car, Settings, Eye, CheckCircle2, AlertTriangle, Upload, X, Image as ImageIcon } from 'lucide-react';
import Modal from '@/components/(shared)/Modal';
import SuccessMessage from '@/components/(shared)/SuccessMessage';
import ErrorMessage from '@/components/(shared)/ErrorMessage';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toDateOnly } from '@/common/dateConvertor';
import { Driver } from '@/common/interface';
import { createDriver, getAllDrivers, updateDriver, deleteDriver, getDriverStats, getAvailableVehicles } from '@/services/driverService';

// Driver validation schema
const driverSchema = yup.object().shape({
  driver_name: yup.string().required("Driver name is required").min(2, "Name must be at least 2 characters"),
  licence_number: yup.string().required("Licence number is required").min(5, "Licence number must be at least 5 characters"),
  licence_expiry_date: yup.date().nullable().min(new Date(), "Licence expiry date must be in the future"),
  contact_number: yup.string().required("Contact number is required").matches(/^[+]?[0-9\s\-()]+$/, "Invalid phone number format"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  address: yup.string().nullable(),
  driver_image_url: yup.string().nullable().url("Invalid URL format"),
  licence_document_url: yup.string().nullable().url("Invalid URL format"),
  vehicle_id: yup.number().nullable().positive("Vehicle ID must be positive"),
  status: yup.string().oneOf(['ACTIVE', 'INACTIVE'], "Status must be ACTIVE or INACTIVE").required("Status is required")
});

export default function DriversManagement() {
  const router = useRouter();
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDriver, setEditingDriver] = useState<Driver | null>(null);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedDriverImage, setSelectedDriverImage] = useState<File | null>(null);
  const [driverImagePreview, setDriverImagePreview] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);

  const fetchDrivers = async (page = 1, search = '', status = '') => {
    try {
      setLoading(true);
      const params: any = {
        page,
        limit: itemsPerPage,
      };
      
      if (search.trim()) params.search = search;
      if (status && status !== 'ALL') params.status = status;

      const response = await getAllDrivers(params);
      console.log('Fetched drivers:', response);
      setDrivers(response?.data?.drivers || []);
      setCurrentPage(response?.data?.pagination?.current_page || 1);
      setTotalPages(response?.data?.pagination?.total_pages || 1);
    } catch (error: any) {
      console.error('Error fetching drivers:', error);
      setErrorMessage(error.response?.data?.message || 'Failed to fetch drivers');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await getDriverStats();
      setStats(response?.data || null);
    } catch (error: any) {
      console.error('Error fetching driver stats:', error);
    }
  };

  const fetchAvailableVehicles = async () => {
    try {
      const response = await getAvailableVehicles();
      setVehicles(response?.data?.vehicles || []);
    } catch (error: any) {
      console.error('Error fetching available vehicles:', error);
    }
  };

  useEffect(() => {
    fetchDrivers(currentPage, searchTerm, statusFilter);
    fetchStats();
    fetchAvailableVehicles();
  }, [currentPage, searchTerm, statusFilter]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue
  } = useForm({
    resolver: yupResolver(driverSchema),
    defaultValues: {
      driver_name: '',
      licence_number: '',
      licence_expiry_date: null,
      contact_number: '',
      email: '',
      address: '',
      driver_image_url: '',
      licence_document_url: '',
      vehicle_id: null,
      status: 'ACTIVE'
    }
  });

  const onSubmit = async (data: any) => {
    try {
      setUploading(true);
      console.log("Original Data:", data);

      // If there's a selected image, upload it first
      if (selectedDriverImage) {
        // Create FormData for image upload
        const formData = new FormData();
        formData.append('driver_image', selectedDriverImage);
        
        // Upload image first (you'll need to create this endpoint)
        // const imageResponse = await uploadDriverImage(formData);
        // data.driver_image_url = imageResponse.data.imageUrl;
        
        // For now, we'll use a placeholder URL structure
        data.driver_image_url = `uploads/drivers/${Date.now()}_${selectedDriverImage.name}`;
      }

      const formattedData = {
        ...data,
        licence_expiry_date: toDateOnly(data.licence_expiry_date),
      };

      console.log("Formatted Data (DateOnly):", formattedData);

      const result = selectedDriver
        ? await updateDriver(selectedDriver.id.toString(), formattedData)
        : await createDriver(formattedData);
      
      console.log(`Driver ${selectedDriver ? 'updated' : 'created'} successfully:`, result);

      setSuccessMessage(`Driver ${selectedDriver ? 'updated' : 'added'} successfully!`);
      handleModalClose();
      
      fetchDrivers(currentPage, searchTerm, statusFilter);
      fetchStats();
    } catch (error: any) {
      console.error(
        `Error ${selectedDriver ? 'updating' : 'creating'} driver:`,
        error
      );

      const apiMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        `Failed to ${selectedDriver ? 'update' : 'create'} driver`;

      setErrorMessage(apiMessage);
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteDriver = async (id: any) => {
    if (!confirm('Are you sure you want to delete this driver?')) {
      return;
    }

    try {
      await deleteDriver(id.toString());
      setSuccessMessage('Driver deleted successfully!');
      fetchDrivers(currentPage, searchTerm, statusFilter);
      fetchStats();
    } catch (error: any) {
      console.error('Error deleting driver:', error);
      setErrorMessage(error.response?.data?.message || 'Failed to delete driver');
    }
  };

  const getDriverIcon = (status: any) => {
    switch (status) {
      case 'ACTIVE': return <User className="w-7 h-7 text-white" />;
      case 'INACTIVE': return <User className="w-7 h-7 text-gray-400" />;
      default: return <User className="w-7 h-7 text-white" />;
    }
  };

  const openModal = (driver: any | null = null) => {
    setSelectedDriver(driver);
    if (driver) {
      setValue("driver_name", driver.driver_name || '');
      setValue("licence_number", driver.licence_number || '');
      setValue("licence_expiry_date", driver.licence_expiry_date || null);
      setValue("contact_number", driver.contact_number || '');
      setValue("email", driver.email || '');
      setValue("address", driver.address || '');
      setValue("driver_image_url", driver.driver_image_url || '');
      setValue("licence_document_url", driver.licence_document_url || '');
      setValue("vehicle_id", driver.vehicle_id || null);
      setValue("status", driver.status || 'ACTIVE');
      
      // Set existing image preview if available
      if (driver.driver_image_url) {
        setDriverImagePreview(driver.driver_image_url);
      }
    } else {
      reset();
      setSelectedDriverImage(null);
      setDriverImagePreview(null);
    }
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedDriver(null);
    setSelectedDriverImage(null);
    if (driverImagePreview) {
      URL.revokeObjectURL(driverImagePreview);
      setDriverImagePreview(null);
    }
    reset();
  };

  const handleImageSelect = (file: File) => {
    setSelectedDriverImage(file);
    
    // Create preview URL for image
    if (driverImagePreview) {
      URL.revokeObjectURL(driverImagePreview);
    }
    const url = URL.createObjectURL(file);
    setDriverImagePreview(url);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!dragActive) setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0 && files[0].type.startsWith('image/')) {
      handleImageSelect(files[0]);
    }
  };

  const removeSelectedImage = () => {
    setSelectedDriverImage(null);
    if (driverImagePreview) {
      URL.revokeObjectURL(driverImagePreview);
      setDriverImagePreview(null);
    }
  };

  const isImageFile = (fileName: string): boolean => {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'];
    return imageExtensions.some(ext => fileName.toLowerCase().endsWith(ext));
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleStatusFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Not Set';
    return new Date(dateString).toLocaleDateString();
  };

  const isLicenceExpiring = (expiryDate: string | null) => {
    if (!expiryDate) return false;
    const expiry = new Date(expiryDate);
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
    return expiry <= thirtyDaysFromNow && expiry >= new Date();
  };

  const isLicenceExpired = (expiryDate: string | null) => {
    if (!expiryDate) return false;
    return new Date(expiryDate) < new Date();
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
              Driver Management
            </h1>
            <p className="text-gray-600 text-sm">
              Manage your fleet drivers and their information
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <button
              onClick={() => openModal()}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
            >
              <Plus className="w-4 h-4" />
              Add New Driver
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            <div className="bg-linear-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Total Drivers</p>
                  <p className="text-2xl font-bold mt-1">{stats.total_drivers}</p>
                </div>
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            <div className="bg-linear-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">Active Drivers</p>
                  <p className="text-2xl font-bold mt-1">{stats.active_drivers}</p>
                </div>
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            <div className="bg-linear-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium">With Vehicles</p>
                  <p className="text-2xl font-bold mt-1">{stats.drivers_with_vehicles}</p>
                </div>
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                  <Car className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            <div className="bg-linear-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm font-medium">Expiring Soon</p>
                  <p className="text-2xl font-bold mt-1">{stats.licenses_expiring_soon}</p>
                </div>
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search drivers by name, licence number, phone, or email..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="w-full sm:w-48">
            <select
              value={statusFilter}
              onChange={handleStatusFilter}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="ALL">All Status</option>
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
            </select>
          </div>
        </div>

        {/* Drivers Table/Cards */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : drivers.length === 0 ? (
          <div className="text-center py-12">
            <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Drivers Found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || statusFilter !== 'ALL'
                ? 'No drivers match your current filters.'
                : 'Get started by adding your first driver.'}
            </p>
            <button
              onClick={() => openModal()}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
            >
              <Plus className="w-4 h-4" />
              Add First Driver
            </button>
          </div>
        ) : (
          <div className="mt-6">
            <div className="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Driver
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Contact
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Licence
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Vehicle
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {drivers.map((driver) => (
                      <tr key={driver.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className={`shrink-0 h-10 w-10 rounded-lg flex items-center justify-center ${
                              driver.status === 'ACTIVE' ? 'bg-blue-100' : 'bg-gray-100'
                            }`}>
                              {getDriverIcon(driver.status)}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {driver.driver_name}
                              </div>
                              <div className="text-sm text-gray-500">
                                ID: {driver.id}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 flex items-center gap-2">
                            <Phone className="w-4 h-4 text-gray-400" />
                            {driver.contact_number}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                            <Mail className="w-4 h-4 text-gray-400" />
                            {driver.email}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {driver.licence_number}
                          </div>
                          <div className="text-sm flex items-center gap-1">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span className={`${
                              isLicenceExpired(driver?.licence_expiry_date) 
                                ? 'text-red-600 font-medium' 
                                : isLicenceExpiring(driver?.licence_expiry_date)
                                ? 'text-orange-600 font-medium'
                                : 'text-gray-500'
                            }`}>
                              {formatDate(driver.licence_expiry_date)}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {driver.vehicle ? (
                            <div className="text-sm">
                              <div className="text-gray-900 font-medium">
                                {driver.vehicle.vehicleNumber}
                              </div>
                              <div className="text-gray-500">
                                {driver.vehicle.make} {driver.vehicle.model}
                              </div>
                            </div>
                          ) : (
                            <span className="text-sm text-gray-400">No vehicle assigned</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            driver.status === 'ACTIVE'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {driver.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => openModal(driver)}
                              className="text-blue-600 hover:text-blue-900 p-2 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Edit Driver"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteDriver(driver.id)}
                              className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete Driver"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between bg-white px-6 py-3 border-t border-gray-200 sm:px-6">
                <div className="flex justify-between flex-1 sm:hidden">
                  <button
                    onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="relative ml-3 inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing page <span className="font-medium">{currentPage}</span> of{' '}
                      <span className="font-medium">{totalPages}</span>
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                      <button
                        onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                        disabled={currentPage === 1}
                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                      >
                        Previous
                      </button>
                      {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                        const page = i + 1;
                        return (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                              currentPage === page
                                ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                            }`}
                          >
                            {page}
                          </button>
                        );
                      })}
                      <button
                        onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                      >
                        Next
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Driver Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        title={selectedDriver ? 'Edit Driver' : 'Add New Driver'}
        size="lg"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Basic Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Driver Name *
                </label>
                <input
                  {...register('driver_name')}
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter driver name"
                />
                {errors.driver_name && (
                  <p className="text-red-500 text-sm mt-1">{errors.driver_name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Number *
                </label>
                <input
                  {...register('contact_number')}
                  type="tel"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter contact number"
                />
                {errors.contact_number && (
                  <p className="text-red-500 text-sm mt-1">{errors.contact_number.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  {...register('email')}
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter email address"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status *
                </label>
                <select
                  {...register('status')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="ACTIVE">Active</option>
                  <option value="INACTIVE">Inactive</option>
                </select>
                {errors.status && (
                  <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address
              </label>
              <textarea
                {...register('address')}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter address"
              />
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Licence Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Licence Number *
                </label>
                <input
                  {...register('licence_number')}
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter licence number"
                />
                {errors.licence_number && (
                  <p className="text-red-500 text-sm mt-1">{errors.licence_number.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sk font-medium text-gray-700 mb-2">
                  Licence Expiry Date
                </label>
                <input
                  {...register('licence_expiry_date')}
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.licence_expiry_date && (
                  <p className="text-red-500 text-sm mt-1">{errors.licence_expiry_date.message}</p>
                )}
              </div>
            </div>

            {/* Driver Image Upload */}
            <div className="space-y-4">
              <h4 className="text-md font-medium text-gray-800">Driver Photo</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* File Upload Area */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Driver Image
                  </label>
                  
                  <div
                    className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                      dragActive 
                        ? 'border-blue-400 bg-blue-50' 
                        : selectedDriverImage || driverImagePreview
                        ? 'border-green-300 bg-green-50' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleImageSelect(file);
                      }}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    
                    <div className="space-y-2">
                      {selectedDriverImage ? (
                        <>
                          <div className="flex items-center justify-center">
                            <CheckCircle2 className="w-8 h-8 text-green-600" />
                          </div>
                          <p className="text-sm font-medium text-green-800">
                            Selected: {selectedDriverImage.name}
                          </p>
                          <p className="text-xs text-green-600">
                            Size: {(selectedDriverImage.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              removeSelectedImage();
                            }}
                            className="mt-2 px-3 py-1 text-xs bg-red-100 text-red-700 hover:bg-red-200 rounded-lg transition-colors"
                          >
                            Remove
                          </button>
                        </>
                      ) : (
                        <>
                          <ImageIcon className="w-8 h-8 text-gray-400 mx-auto" />
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-gray-500">
                            PNG, JPG, JPEG up to 5MB
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Image Preview */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preview
                  </label>
                  <div className="w-full h-48 border-2 border-gray-200 rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center">
                    {driverImagePreview ? (
                      <img
                        src={driverImagePreview}
                        alt="Driver preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const img = e.target as HTMLImageElement;
                          img.style.display = 'none';
                          const parent = img.parentElement;
                          if (parent) {
                            parent.innerHTML = `
                              <div class="flex flex-col items-center justify-center text-gray-400">
                                <svg class="w-12 h-12 mb-2" fill="currentColor" viewBox="0 0 20 20">
                                  <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"></path>
                                </svg>
                                <span class="text-sm">Failed to load image</span>
                              </div>
                            `;
                          }
                        }}
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-gray-400">
                        <User className="w-12 h-12 mb-2" />
                        <span className="text-sm">No image selected</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Alternative URL Input */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Or enter image URL
                </label>
                <input
                  {...register('driver_image_url')}
                  type="url"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter driver image URL"
                  onChange={(e) => {
                    const url = e.target.value;
                    if (url && url.match(/\.(jpeg|jpg|gif|png|webp)$/)) {
                      setDriverImagePreview(url);
                      setSelectedDriverImage(null);
                    }
                  }}
                />
                {errors.driver_image_url && (
                  <p className="text-red-500 text-sm mt-1">{errors.driver_image_url.message}</p>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-4">

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Licence Document URL
                </label>
                <input
                  {...register('licence_document_url')}
                  type="url"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter licence document URL"
                />
                {errors.licence_document_url && (
                  <p className="text-red-500 text-sm mt-1">{errors.licence_document_url.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Vehicle Assignment */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Vehicle Assignment</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Assign Vehicle
              </label>
              <select
                {...register('vehicle_id')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">No vehicle assigned</option>
                {vehicles.map((vehicle) => (
                  <option key={vehicle.id} value={vehicle.id}>
                    {vehicle.vehicleNumber} - {vehicle.make} {vehicle.model}
                  </option>
                ))}
              </select>
              {errors.vehicle_id && (
                <p className="text-red-500 text-sm mt-1">{errors.vehicle_id.message}</p>
              )}
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-6 border-t">
            <button
              type="button"
              onClick={handleModalClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={uploading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium flex items-center gap-2"
            >
              {uploading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  {selectedDriver ? 'Updating...' : 'Creating...'}
                </>
              ) : (
                selectedDriver ? 'Update Driver' : 'Create Driver'
              )}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
