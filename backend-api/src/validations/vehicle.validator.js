const Joi = require("joi");

exports.createVehicleSchema = Joi.object({
  vehicleNumber: Joi.string().trim().max(50).required().messages({
    'string.empty': 'Vehicle number is required',
    'any.required': 'Vehicle number is required'
  }),
  
  vehicleType: Joi.string().valid(
    'TRUCK',
    'VAN',
    'CAR',
    'MOTORCYCLE',
    'BUS',
    'TRAILER',
    'TANKER',
    'REFRIGERATED_TRUCK',
    'FLATBED',
    'PICKUP'
  ).required().messages({
    'any.only': 'Invalid vehicle type',
    'any.required': 'Vehicle type is required'
  }),
  
  make: Joi.string().trim().max(100).required().messages({
    'string.empty': 'Make is required',
    'any.required': 'Make is required'
  }),
  
  model: Joi.string().trim().max(100).required().messages({
    'string.empty': 'Model is required',
    'any.required': 'Model is required'
  }),
  
  year: Joi.number().integer().min(1900).max(new Date().getFullYear() + 1).required().messages({
    'number.base': 'Year must be a number',
    'number.min': 'Year must be 1900 or later',
    'number.max': 'Year cannot be in the future',
    'any.required': 'Year is required'
  }),
  
  color: Joi.string().trim().max(50).optional().allow(null, ''),
  
  vinNumber: Joi.string().trim().length(17).optional().allow(null, '').messages({
    'string.length': 'VIN must be exactly 17 characters'
  }),
  
  licensePlate: Joi.string().trim().max(20).required().messages({
    'string.empty': 'License plate is required',
    'any.required': 'License plate is required'
  }),
  
  registrationExpiry: Joi.date().optional().allow(null),
  
  insuranceExpiry: Joi.date().optional().allow(null),
  
  capacity: Joi.number().positive().precision(2).optional().allow(null).messages({
    'number.positive': 'Capacity must be positive'
  }),
  
  fuelType: Joi.string().valid('PETROL', 'DIESEL', 'ELECTRIC', 'HYBRID', 'CNG', 'LPG').required().messages({
    'any.only': 'Invalid fuel type',
    'any.required': 'Fuel type is required'
  }),
  
  mileage: Joi.number().min(0).precision(2).optional().allow(null).messages({
    'number.min': 'Mileage must be positive or zero'
  }),
  
  status: Joi.string().valid('ACTIVE', 'INACTIVE', 'MAINTENANCE', 'RETIRED', 'OUT_OF_SERVICE').optional().default('ACTIVE'),
  
  lastServiceDate: Joi.date().optional().allow(null),
  
  nextServiceDate: Joi.date().optional().allow(null),
  
  purchaseDate: Joi.date().optional().allow(null),
  
  purchasePrice: Joi.number().positive().precision(2).optional().allow(null).messages({
    'number.positive': 'Purchase price must be positive'
  }),
  
  currentValue: Joi.number().positive().precision(2).optional().allow(null).messages({
    'number.positive': 'Current value must be positive'
  }),
  
  assignedDriverId: Joi.number().integer().optional().allow(null),
  
  gpsTrackerId: Joi.string().trim().max(100).optional().allow(null, ''),
  
  notes: Joi.string().trim().optional().allow(null, '')
});

exports.updateVehicleSchema = Joi.object({
  vehicleNumber: Joi.string().trim().max(50).optional(),
  
  vehicleType: Joi.string().valid(
    'TRUCK',
    'VAN',
    'CAR',
    'MOTORCYCLE',
    'BUS',
    'TRAILER',
    'TANKER',
    'REFRIGERATED_TRUCK',
    'FLATBED',
    'PICKUP'
  ).optional(),
  
  make: Joi.string().trim().max(100).optional(),
  model: Joi.string().trim().max(100).optional(),
  year: Joi.number().integer().min(1900).max(new Date().getFullYear() + 1).optional(),
  color: Joi.string().trim().max(50).optional().allow(null, ''),
  vinNumber: Joi.string().trim().length(17).optional().allow(null, ''),
  licensePlate: Joi.string().trim().max(20).optional(),
  registrationExpiry: Joi.date().optional().allow(null),
  insuranceExpiry: Joi.date().optional().allow(null),
  capacity: Joi.number().positive().precision(2).optional().allow(null),
  fuelType: Joi.string().valid('PETROL', 'DIESEL', 'ELECTRIC', 'HYBRID', 'CNG', 'LPG').optional(),
  mileage: Joi.number().min(0).precision(2).optional().allow(null),
  status: Joi.string().valid('ACTIVE', 'INACTIVE', 'MAINTENANCE', 'RETIRED', 'OUT_OF_SERVICE').optional(),
  lastServiceDate: Joi.date().optional().allow(null),
  nextServiceDate: Joi.date().optional().allow(null),
  purchaseDate: Joi.date().optional().allow(null),
  purchasePrice: Joi.number().positive().precision(2).optional().allow(null),
  currentValue: Joi.number().positive().precision(2).optional().allow(null),
  assignedDriverId: Joi.number().integer().optional().allow(null),
  gpsTrackerId: Joi.string().trim().max(100).optional().allow(null, ''),
  
  notes: Joi.string().trim().optional().allow(null, '')
}).min(1).messages({
  'object.min': 'At least one field must be provided for update'
});

exports.vehicleIdSchema = Joi.object({
  id: Joi.number().integer().positive().required().messages({
    'number.base': 'Vehicle ID must be a number',
    'number.positive': 'Vehicle ID must be positive',
    'any.required': 'Vehicle ID is required'
  })
});

