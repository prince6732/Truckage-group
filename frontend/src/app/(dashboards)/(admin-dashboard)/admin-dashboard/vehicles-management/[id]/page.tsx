'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Car, 
  FileText, 
  Upload,
  Download,
  Trash2,
  Eye,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  File,
  Settings,
  Truck,
  MapPin,
  User,
  CreditCard,
  Clock,
  Edit3,
  Image as ImageIcon,
  FileText as PdfIcon,
  Save,
  XCircle
} from 'lucide-react';
import { 
  getVehicleById, 
  getVehicleDocuments, 
  uploadVehicleDocument, 
  downloadVehicleDocument, 
  deleteVehicleDocument 
} from '@/services/vehicleService';
import Modal from '@/components/(shared)/Modal';

interface Vehicle {
  id: string;
  vehicleNumber: string;
  vehicleType: string;
  make: string;
  model: string;
  year: number;
  color?: string;
  licensePlate: string;
  vinNumber?: string;
  fuelType: string;
  capacity?: number;
  mileage?: number;
  status: string;
  registrationExpiry?: string;
  insuranceExpiry?: string;
  lastServiceDate?: string;
  nextServiceDate?: string;
  purchaseDate?: string;
  purchasePrice?: number;
  currentValue?: number;
  gpsTrackerId?: string;
  notes?: string;
}

interface VehicleDocument {
  id: number;
  vehicle_id: number;
  tenant_id: string;
  document_type: string;
  file_path: string;
  file_type: 'pdf' | 'image';
  expiry_date?: string;
  createdAt: string;
  updatedAt: string;
  vehicle?: {
    id: number;
    vehicleNumber: string;
    model: string;
  };
}

interface DocumentTypeOption {
  value: string;
  label: string;
  description: string;
}

export default function VehicleDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [documents, setDocuments] = useState<VehicleDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [documentsLoading, setDocumentsLoading] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [documentType, setDocumentType] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [uploading, setUploading] = useState(false);
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [previewDocument, setPreviewDocument] = useState<VehicleDocument | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingDocument, setEditingDocument] = useState<VehicleDocument | null>(null);
  const [editDocumentType, setEditDocumentType] = useState('');
  const [editExpiryDate, setEditExpiryDate] = useState('');
  const [filePreviewUrl, setFilePreviewUrl] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const documentTypes: DocumentTypeOption[] = [
    { value: 'insurance', label: 'Insurance Certificate', description: 'Vehicle insurance document' },
    { value: 'rc_permit', label: 'RC Permit', description: 'Road Carriage permit' },
    { value: 'registration_certificate', label: 'Registration Certificate', description: 'Vehicle registration document' },
    { value: 'national_permit', label: 'National Permit', description: 'National transport permit' },
    { value: 'road_tax', label: 'Road Tax', description: 'Road tax certificate' },
    { value: 'fitness_certificate', label: 'Fitness Certificate', description: 'Vehicle fitness certificate' },
    { value: 'drivers_license', label: 'Driver License', description: 'Driver license document' },
    { value: 'pollution_certificate', label: 'Pollution Certificate', description: 'Pollution under control certificate' },
    { value: 'other', label: 'Other Document', description: 'Other vehicle related document' },
  ];

  useEffect(() => {
    if (params.id) {
      fetchVehicleDetails();
      fetchVehicleDocuments();
    }
  }, [params.id]);

  useEffect(() => {
    return () => {
      if (filePreviewUrl) {
        URL.revokeObjectURL(filePreviewUrl);
      }
    };
  }, [filePreviewUrl]);


  const fetchVehicleDetails = async () => {
    try {
      setLoading(true);
      const response = await getVehicleById(params.id as string);
      setVehicle(response.data || null);
    } catch (error) {
      console.error('Error fetching vehicle details:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchVehicleDocuments = async () => {
    try {
      setDocumentsLoading(true);
      const response = await getVehicleDocuments(params.id as string);
      setDocuments(response.data || []);
    } catch (error) {
      console.error('Error fetching vehicle documents:', error);
    } finally {
      setDocumentsLoading(false);
    }
  };

  const handleFileUpload = async () => {
    if (!selectedFile || !documentType || !params.id) {
      alert('Please select a file and document type');
      return;
    }

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('document', selectedFile);
      formData.append('vehicleId', params.id as string);
      formData.append('documentType', documentType);
      if (expiryDate) {
        formData.append('expiryDate', expiryDate);
      }

      await uploadVehicleDocument(formData);
      
      setSelectedFile(null);
      setDocumentType('');
      setExpiryDate('');
      setUploadModalOpen(false);
      if (filePreviewUrl) {
        URL.revokeObjectURL(filePreviewUrl);
        setFilePreviewUrl(null);
      }
      fetchVehicleDocuments();
      
      alert('Document uploaded successfully!');
    } catch (error) {
      console.error('Error uploading document:', error);
      alert('Failed to upload document');
    } finally {
      setUploading(false);
    }
  };

  const handleDownloadDocument = async (documentId: number | string, documentType: string) => {
    try {
      const response = await downloadVehicleDocument(String(documentId));
      const blob = new Blob([response.data], { type: response.headers['content-type'] });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${vehicle?.vehicleNumber}_${documentType}_${documentId}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading document:', error);
      alert('Failed to download document');
    }
  };

  const handleDeleteDocument = async (documentId: number | string) => {
    if (!confirm('Are you sure you want to delete this document?')) {
      return;
    }

    try {
      await deleteVehicleDocument(String(documentId));
      fetchVehicleDocuments();
      alert('Document deleted successfully!');
    } catch (error) {
      console.error('Error deleting document:', error);
      alert('Failed to delete document');
    }
  };

  const getDocumentTypeLabel = (type: string) => {
    const docType = documentTypes.find(dt => dt.value === type);
    return docType ? docType.label : type;
  };
  const getFileName = (filePath: string): string => {
    const parts = filePath.split(/[\\/]/);
    return parts[parts.length - 1] || 'Unknown file';
  };

  const getRelativeImagePath = (filePath: string): string => {
    let cleanPath = filePath;
    if (cleanPath.startsWith('/')) {
      cleanPath = cleanPath.substring(1);
    }
    
    const uploadsIndex = cleanPath.indexOf('uploads');
    if (uploadsIndex !== -1) {
      const relativePath = cleanPath.substring(uploadsIndex).replace(/\\/g, '/');
      return relativePath;
    }
    
    return getFileName(filePath);
  };

  const constructImageUrl = (filePath: string): string => {
    const baseUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL || 'http://localhost:3080';
    const relativePath = getRelativeImagePath(filePath);
    const fullUrl = `${baseUrl}/${relativePath}`;
    return fullUrl;
  };

  const isImageFile = (fileName: string): boolean => {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'];
    return imageExtensions.some(ext => fileName.toLowerCase().endsWith(ext));
  };

  const isPdfFile = (fileName: string): boolean => {
    return fileName.toLowerCase().endsWith('.pdf');
  };

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    
    if (isImageFile(file.name)) {
      const url = URL.createObjectURL(file);
      setFilePreviewUrl(url);
    } else {
      setFilePreviewUrl(null);
    }
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
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handlePreviewDocument = (document: VehicleDocument) => {
    setPreviewDocument(document);
    setPreviewModalOpen(true);
  };

  const handleEditDocument = (document: VehicleDocument) => {
    setEditingDocument(document);
    setEditDocumentType(document.document_type);
    setEditExpiryDate(document.expiry_date ? new Date(document.expiry_date).toISOString().split('T')[0] : '');
    setEditModalOpen(true);
  };

  const handleUpdateDocument = async () => {
    if (!editingDocument || !editDocumentType) return;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3080'}/api/vehicle-documents/${editingDocument.id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          document_type: editDocumentType,
          expiry_date: editExpiryDate || null
        })
      });

      if (response.ok) {
        await fetchVehicleDocuments();
        setEditModalOpen(false);
        setEditingDocument(null);
        setEditDocumentType('');
        setEditExpiryDate('');
      } else {
        console.error('Failed to update document');
      }
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };

  const handleCloseUploadModal = () => {
    setUploadModalOpen(false);
    setSelectedFile(null);
    setDocumentType('');
    setExpiryDate('');
    if (filePreviewUrl) {
      URL.revokeObjectURL(filePreviewUrl);
      setFilePreviewUrl(null);
    }
  };
  const getExpiryStatus = (expiryDate: string | null) => {
    if (!expiryDate) return null;
    
    const expiry = new Date(expiryDate);
    const today = new Date();
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return { status: 'expired', message: 'Expired', color: 'text-red-600' };
    } else if (diffDays <= 30) {
      return { status: 'expiring', message: `Expires in ${diffDays} days`, color: 'text-orange-600' };
    } else {
      return { status: 'valid', message: 'Valid', color: 'text-green-600' };
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Vehicles
          </button>
          <div className="bg-white rounded-xl shadow-lg p-8 text-center border border-gray-200">
            <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Vehicle Not Found</h2>
            <p className="text-gray-600">The requested vehicle could not be found.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              {/* Vehicle Info - Left Side */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-linear-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Car className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-1">
                    {vehicle.make} {vehicle.model}
                  </h1>
                  <p className="text-lg text-gray-600 font-medium">{vehicle.vehicleNumber}</p>
                </div>
              </div>
              
              {/* Back Button - Right Side */}
              <button 
                onClick={() => router.back()}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900 rounded-lg transition-all duration-200 font-medium"
              >
                <ArrowLeft className="w-5 h-5" />
                Back
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
          <div className="xl:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Car className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-black">Basic Information</h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Vehicle Number</label>
                    <p className="text-gray-900 font-semibold text-lg mt-1">{vehicle.vehicleNumber}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Make & Model</label>
                    <p className="text-gray-900 font-semibold text-lg mt-1">{vehicle.make} {vehicle.model}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Year</label>
                    <p className="text-gray-900 font-semibold text-lg mt-1">{vehicle.year}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Vehicle Type</label>
                    <p className="text-gray-900 font-semibold text-lg mt-1">{vehicle.vehicleType}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Color</label>
                    <p className="text-gray-900 font-semibold text-lg mt-1">{vehicle.color || 'Not specified'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">VIN Number</label>
                    <p className="text-gray-900 font-semibold text-lg mt-1">{vehicle.vinNumber || 'Not available'}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                  <Settings className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-black">Technical Specifications</h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Truck className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-sm font-bold text-gray-600 mb-1">Fuel Type</p>
                  <p className="text-xl font-bold text-black">{vehicle.fuelType}</p>
                </div>
                
                <div className="text-center p-6 bg-green-50 border border-green-200 rounded-lg">
                  <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Settings className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-sm font-bold text-gray-600 mb-1">Capacity</p>
                  <p className="text-xl font-bold text-black">{vehicle.capacity ? `${vehicle.capacity} tons` : 'N/A'}</p>
                </div>
                
                <div className="text-center p-6 bg-gray-50 border border-gray-200 rounded-lg">
                  <div className="w-12 h-12 bg-gray-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Car className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-sm font-bold text-gray-600 mb-1">Mileage</p>
                  <p className="text-xl font-bold text-black">{vehicle.mileage ? `${vehicle.mileage} km/l` : 'N/A'}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gray-600 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-black">Service Information</h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-5 h-5 text-gray-600" />
                    <p className="font-bold text-gray-600">Last Service</p>
                  </div>
                  <p className="text-2xl font-bold text-black">
                    {vehicle.lastServiceDate ? new Date(vehicle.lastServiceDate).toLocaleDateString() : 'No record'}
                  </p>
                </div>
                
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <p className="font-bold text-blue-600">Next Service</p>
                  </div>
                  <p className="text-2xl font-bold text-black">
                    {vehicle.nextServiceDate ? new Date(vehicle.nextServiceDate).toLocaleDateString() : 'Not scheduled'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-800">Registration</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">License Plate</label>
                  <p className="text-gray-900 font-semibold text-lg mt-1">{vehicle.licensePlate}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Registration Expiry</label>
                  <p className="text-gray-900 font-semibold text-lg mt-1">
                    {vehicle.registrationExpiry ? new Date(vehicle.registrationExpiry).toLocaleDateString() : 'Not available'}
                  </p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Insurance Expiry</label>
                  <p className="text-gray-900 font-semibold text-lg mt-1">
                    {vehicle.insuranceExpiry ? new Date(vehicle.insuranceExpiry).toLocaleDateString() : 'Not available'}
                  </p>
                </div>
              </div>
            </div>

            {(vehicle.purchasePrice || vehicle.currentValue || vehicle.purchaseDate) && (
              <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">Financial Info</h3>
                </div>
                
                <div className="space-y-4">
                  {vehicle.purchaseDate && (
                    <div>
                      <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Purchase Date</label>
                      <p className="text-gray-900 font-semibold text-lg mt-1">
                        {new Date(vehicle.purchaseDate).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                  
                  {vehicle.purchasePrice && (
                    <div>
                      <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Purchase Price</label>
                      <p className="text-gray-900 font-semibold text-lg mt-1">${vehicle.purchasePrice.toLocaleString()}</p>
                    </div>
                  )}
                  
                  {vehicle.currentValue && (
                    <div>
                      <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Current Value</label>
                      <p className="text-gray-900 font-semibold text-lg mt-1">${vehicle.currentValue.toLocaleString()}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Additional Information */}
            <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gray-600 rounded-lg flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-800">Additional Info</h3>
              </div>
              
              <div className="space-y-4">
                {vehicle.gpsTrackerId && (
                  <div>
                    <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">GPS Tracker ID</label>
                    <p className="text-gray-900 font-semibold text-lg mt-1">{vehicle.gpsTrackerId}</p>
                  </div>
                )}
                
                {vehicle.notes && (
                  <div>
                    <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Notes</label>
                    <p className="text-gray-900 mt-1 leading-relaxed">{vehicle.notes}</p>
                  </div>
                )}
                
                {!vehicle.gpsTrackerId && !vehicle.notes && (
                  <p className="text-gray-500 italic">No additional information available</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Vehicle Documents</h2>
          </div>
          
          <button 
            onClick={() => setUploadModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            <Upload className="w-5 h-5" />
            Upload Document
          </button>
        </div>

        {/* Documents Section */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
            {documentsLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : documents.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-900 mb-2">No Documents Found</h4>
                <p className="text-gray-600 mb-4">Upload documents for this vehicle to get started.</p>
                <button
                  onClick={() => setUploadModalOpen(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                >
                  <Upload className="w-4 h-4" />
                  Upload First Document
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {documents.map((document) => {
                  const expiryStatus = getExpiryStatus(document.expiry_date || null);
                  return (
                    <div 
                      key={document.id} 
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md hover:border-blue-300 transition-all cursor-pointer"
                      onClick={() => handlePreviewDocument(document)}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center overflow-hidden border border-gray-200">
                            {document.file_type === 'pdf' ? (
                              <File className="w-6 h-6 text-red-600" />
                            ) : document.file_type === 'image' ? (
                              <img
                                src={constructImageUrl(document.file_path)}
                                alt={document.document_type}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  const img = e.target as HTMLImageElement;
                                  img.style.display = 'none';
                                  const parent = img.parentElement;
                                  if (parent) {
                                    parent.innerHTML = '<svg class="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"></path></svg>';
                                  }
                                }}
                                onLoad={(e) => {
                                  console.log('Image loaded successfully:', constructImageUrl(document.file_path));
                                }}
                              />
                            ) : (
                              <FileText className="w-6 h-6 text-blue-600" />
                            )}
                          </div>
                          <div className="flex-1">
                            <h5 className="font-medium text-gray-900 text-lg mb-1">
                              {getDocumentTypeLabel(document.document_type)}
                            </h5>
                            
                           
                          </div>
                        </div>
                      </div>

                      {expiryStatus && (
                        <div className={`mb-3 text-xs font-medium ${expiryStatus.color}`}>
                          <div className="flex items-center gap-1">
                            {expiryStatus.status === 'expired' ? (
                              <AlertTriangle className="w-3 h-3" />
                            ) : expiryStatus.status === 'expiring' ? (
                              <Calendar className="w-3 h-3" />
                            ) : (
                              <CheckCircle2 className="w-3 h-3" />
                            )}
                            {expiryStatus.message}
                          </div>
                          {document.expiry_date && (
                            <p className="text-gray-500 mt-1">
                              Expires: {new Date(document.expiry_date).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handlePreviewDocument(document);
                            }}
                            className="flex items-center justify-center p-2 bg-green-50 text-green-700 hover:bg-green-100 rounded-lg transition-colors"
                            title="Preview Document"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditDocument(document);
                            }}
                            className="flex items-center justify-center p-2 bg-yellow-50 text-yellow-700 hover:bg-yellow-100 rounded-lg transition-colors"
                            title="Edit Document"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDownloadDocument(document.id, document.document_type);
                            }}
                            className="flex items-center justify-center p-2 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg transition-colors"
                            title="Download Document"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteDocument(document.id);
                            }}
                            className="flex items-center justify-center p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete Document"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="text-xs text-gray-400">
                          Click to preview
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
        </div>

        {/* Upload Modal */}
        <Modal
          isOpen={uploadModalOpen}
          onClose={handleCloseUploadModal}
          title="Upload Vehicle Document"
          size="lg"
        >
          <div className="p-6">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Document Type
                </label>
                <select
                  value={documentType}
                  onChange={(e) => setDocumentType(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Document Type</option>
                  {documentTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
                {documentType && (
                  <p className="mt-1 text-sm text-gray-600">
                    {documentTypes.find(t => t.value === documentType)?.description}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select File
                </label>
                <div 
                  className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                    dragActive 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png,.gif,.bmp,.webp"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileSelect(file);
                    }}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    {!selectedFile ? (
                      <div className="flex flex-col items-center">
                        <Upload className={`w-12 h-12 mb-3 ${dragActive ? 'text-blue-500' : 'text-gray-400'}`} />
                        <p className={`font-medium ${dragActive ? 'text-blue-600' : 'text-gray-600'}`}>
                          {dragActive ? 'Drop file here' : 'Click to upload or drag & drop'}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">PDF, Images (Max 10MB)</p>
                      </div>
                    ) : (
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{selectedFile.name}</p>
                            <p className="text-xs text-gray-500">
                              {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              setSelectedFile(null);
                              setFilePreviewUrl(null);
                            }}
                            className="text-red-500 hover:text-red-700"
                          >
                            <XCircle className="w-5 h-5" />
                          </button>
                        </div>
                        
                        {/* File Preview */}
                        {filePreviewUrl && (
                          <div className="mt-3">
                            <img 
                              src={filePreviewUrl} 
                              alt="Preview" 
                              className="max-w-full max-h-48 mx-auto rounded-lg border border-gray-200"
                            />
                          </div>
                        )}
                        
                        {selectedFile && isPdfFile(selectedFile.name) && (
                          <div className="mt-3 flex items-center justify-center p-4 bg-red-100 rounded-lg">
                            <PdfIcon className="w-8 h-8 text-red-600 mr-2" />
                            <span className="text-red-800 font-medium">PDF Document</span>
                          </div>
                        )}
                      </div>
                    )}
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expiry Date (Optional)
                </label>
                <input
                  type="date"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <p className="mt-1 text-sm text-gray-600">
                  Set expiry date to receive notifications before document expires
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={handleCloseUploadModal}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleFileUpload}
                  disabled={!selectedFile || !documentType || uploading}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  {uploading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Uploading...
                    </div>
                  ) : (
                    'Upload Document'
                  )}
                </button>
              </div>
            </div>
          </div>
        </Modal>

        {/* Document Preview Modal */}
        <Modal
          isOpen={previewModalOpen}
          onClose={() => setPreviewModalOpen(false)}
          title={`Preview: ${previewDocument ? getDocumentTypeLabel(previewDocument.document_type) : ''}`}
          size="xl"
        >
          <div className="p-6">
            {previewDocument && (
              <div className="space-y-4">
                {/* Document Info */}
                <div className="border-b border-gray-200 pb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">
                        {getDocumentTypeLabel(previewDocument.document_type)}
                      </h4>
                      
                    </div>
                    <div className="text-right">
                      {previewDocument.expiry_date && (
                        <div className="text-sm">
                          <span className="text-gray-500">Expires:</span>
                          <span className="font-medium text-gray-900 ml-1">
                            {new Date(previewDocument.expiry_date).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Document Preview */}
                <div className="flex justify-center items-center min-h-[400px] bg-gray-50 rounded-lg">
                  {previewDocument.file_type === 'pdf' ? (
                    <div className="text-center p-8">
                      <PdfIcon className="w-20 h-20 text-red-600 mx-auto mb-4" />
                      <p className="text-gray-600 mb-4">PDF documents cannot be previewed inline</p>
                      <button
                        onClick={() => handleDownloadDocument(previewDocument.id, previewDocument.document_type)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      >
                        <Download className="w-4 h-4" />
                        Download PDF
                      </button>
                    </div>
                  ) : previewDocument.file_type === 'image' ? (
                    <div className="relative">
                      <img
                        src={constructImageUrl(previewDocument.file_path)}
                        alt={previewDocument.document_type}
                        className="max-w-full max-h-[500px] rounded-lg shadow-lg"
                        onError={(e) => {
                          // Try alternative URL with full path
                          const img = e.target as HTMLImageElement;
                          if (!img.src.includes('/api/vehicle-documents/')) {
                            img.src = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3080'}/api/vehicle-documents/${previewDocument.id}/download`;
                          } else {
                            img.style.display = 'none';
                            const parent = img.parentElement;
                            if (parent) {
                              parent.innerHTML = `
                                <div class="text-center p-8">
                                  <div class="w-20 h-20 bg-gray-300 rounded mx-auto mb-4 flex items-center justify-center">
                                    <span class="text-gray-600 text-sm">IMG</span>
                                  </div>
                                  <p class="text-gray-600">Unable to load image</p>
                                  <p class="text-xs text-gray-500 mt-2">File: ${getFileName(previewDocument.file_path)}</p>
                                </div>
                              `;
                            }
                          }
                        }}
                      />
                    </div>
                  ) : (
                    <div className="text-center p-8">
                      <FileText className="w-20 h-20 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-4">Preview not available for this file type</p>
                      <button
                        onClick={() => handleDownloadDocument(previewDocument.id, previewDocument.document_type)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Download className="w-4 h-4" />
                        Download File
                      </button>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => handleEditDocument(previewDocument)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                    Edit Details
                  </button>
                  <button
                    onClick={() => handleDownloadDocument(previewDocument.id, previewDocument.document_type)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>
              </div>
            )}
          </div>
        </Modal>

        {/* Edit Document Modal */}
        <Modal
          isOpen={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          title="Edit Document Details"
          size="lg"
        >
          <div className="p-6">
            {editingDocument && (
              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Current Document</h4>
                  <p className="text-sm text-gray-600">
                    {getFileName(editingDocument.file_path)}
                  </p>
                  <p className="text-xs text-gray-500">
                    Uploaded: {new Date(editingDocument.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Document Type
                  </label>
                  <select
                    value={editDocumentType}
                    onChange={(e) => setEditDocumentType(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Document Type</option>
                    {documentTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expiry Date (Optional)
                  </label>
                  <input
                    type="date"
                    value={editExpiryDate}
                    onChange={(e) => setEditExpiryDate(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => setEditModalOpen(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdateDocument}
                    disabled={!editDocumentType}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                  >
                    <Save className="w-4 h-4 inline mr-2" />
                    Update Document
                  </button>
                </div>
              </div>
            )}
          </div>
        </Modal>
      </div>
    </div>
  );
}