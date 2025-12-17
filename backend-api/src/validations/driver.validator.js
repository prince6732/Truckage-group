const Joi = require("joi");

// Schema for creating a new driver
const createDriverSchema = Joi.object({
  driver_name: Joi.string().trim().min(2).max(100).pattern(/^[a-zA-Z\s]+$/).required().messages({
    'string.empty': 'Driver name is required',
    'string.min': 'Driver name must be at least 2 characters',
    'string.max': 'Driver name cannot exceed 100 characters',
    'string.pattern.base': 'Driver name should only contain letters and spaces',
    'any.required': 'Driver name is required'
  }),

  licence_number: Joi.string().trim().min(5).max(50).pattern(/^[A-Z0-9\-]+$/).required().messages({
    'string.empty': 'Licence number is required',
    'string.min': 'Licence number must be at least 5 characters',
    'string.max': 'Licence number cannot exceed 50 characters',
    'string.pattern.base': 'Licence number should only contain uppercase letters, numbers, and hyphens',
    'any.required': 'Licence number is required'
  }),

  licence_expiry_date: Joi.date().min('now').optional().allow(null).messages({
    'date.base': 'Licence expiry date must be a valid date',
    'date.min': 'Licence expiry date must be in the future'
  }),

  contact_number: Joi.string().trim().min(10).max(15).pattern(/^\+?[\d\s\-()]+$/).required().messages({
    'string.empty': 'Contact number is required',
    'string.min': 'Contact number must be at least 10 characters',
    'string.max': 'Contact number cannot exceed 15 characters',
    'string.pattern.base': 'Contact number format is invalid',
    'any.required': 'Contact number is required'
  }),

  email: Joi.string().email().required().messages({
    'string.empty': 'Email is required',
    'string.email': 'Email format is invalid',
    'any.required': 'Email is required'
  }),

  address: Joi.string().trim().max(255).optional().allow(null, '').messages({
    'string.max': 'Address cannot exceed 255 characters'
  }),

  driver_image_url: Joi.string().uri().optional().allow(null, '').messages({
    'string.uri': 'Driver image URL must be a valid URL'
  }),

  licence_document_url: Joi.string().uri().optional().allow(null, '').messages({
    'string.uri': 'Licence document URL must be a valid URL'
  }),

  vehicle_id: Joi.number().integer().positive().optional().allow(null).messages({
    'number.base': 'Vehicle ID must be a number',
    'number.integer': 'Vehicle ID must be an integer',
    'number.positive': 'Vehicle ID must be a positive integer'
  }),

  status: Joi.string().valid('ACTIVE', 'INACTIVE').default('ACTIVE').messages({
    'any.only': 'Status must be either ACTIVE or INACTIVE'
  })
});


const updateDriverSchema = Joi.object({
  driver_name: Joi.string().trim().min(2).max(100).pattern(/^[a-zA-Z\s]+$/).optional().messages({
    'string.min': 'Driver name must be at least 2 characters',
    'string.max': 'Driver name cannot exceed 100 characters',
    'string.pattern.base': 'Driver name should only contain letters and spaces'
  }),

  licence_number: Joi.string().trim().min(5).max(50).pattern(/^[A-Z0-9\-]+$/).optional().messages({
    'string.min': 'Licence number must be at least 5 characters',
    'string.max': 'Licence number cannot exceed 50 characters',
    'string.pattern.base': 'Licence number should only contain uppercase letters, numbers, and hyphens'
  }),

  licence_expiry_date: Joi.date().min('now').optional().allow(null).messages({
    'date.base': 'Licence expiry date must be a valid date',
    'date.min': 'Licence expiry date must be in the future'
  }),

  contact_number: Joi.string().trim().min(10).max(15).pattern(/^\+?[\d\s\-()]+$/).optional().messages({
    'string.min': 'Contact number must be at least 10 characters',
    'string.max': 'Contact number cannot exceed 15 characters',
    'string.pattern.base': 'Contact number format is invalid'
  }),

  email: Joi.string().email().optional().messages({
    'string.email': 'Email format is invalid'
  }),

  address: Joi.string().trim().max(255).optional().allow(null, '').messages({
    'string.max': 'Address cannot exceed 255 characters'
  }),

  driver_image_url: Joi.string().uri().optional().allow(null, '').messages({
    'string.uri': 'Driver image URL must be a valid URL'
  }),

  licence_document_url: Joi.string().uri().optional().allow(null, '').messages({
    'string.uri': 'Licence document URL must be a valid URL'
  }),

  vehicle_id: Joi.number().integer().positive().optional().allow(null).messages({
    'number.base': 'Vehicle ID must be a number',
    'number.integer': 'Vehicle ID must be an integer',
    'number.positive': 'Vehicle ID must be a positive integer'
  }),

  status: Joi.string().valid('ACTIVE', 'INACTIVE').optional().messages({
    'any.only': 'Status must be either ACTIVE or INACTIVE'
  })
});

// Schema for driver ID parameter
const driverIdSchema = Joi.object({
  id: Joi.number().integer().positive().required().messages({
    'number.base': 'Driver ID must be a number',
    'number.integer': 'Driver ID must be an integer',
    'number.positive': 'Driver ID must be a positive integer',
    'any.required': 'Driver ID is required'
  })
});

// Schema for driver query parameters
const driverQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1).messages({
    'number.base': 'Page must be a number',
    'number.integer': 'Page must be an integer',
    'number.min': 'Page must be at least 1'
  }),

  limit: Joi.number().integer().min(1).max(100).default(10).messages({
    'number.base': 'Limit must be a number',
    'number.integer': 'Limit must be an integer',
    'number.min': 'Limit must be at least 1',
    'number.max': 'Limit cannot exceed 100'
  }),

  search: Joi.string().trim().min(1).max(100).optional().messages({
    'string.min': 'Search term must be at least 1 character',
    'string.max': 'Search term cannot exceed 100 characters'
  }),

  status: Joi.string().valid('ACTIVE', 'INACTIVE').optional().messages({
    'any.only': 'Status must be either ACTIVE or INACTIVE'
  }),

  vehicle_id: Joi.number().integer().positive().optional().messages({
    'number.base': 'Vehicle ID must be a number',
    'number.integer': 'Vehicle ID must be an integer',
    'number.positive': 'Vehicle ID must be a positive integer'
  }),

  sort_by: Joi.string().valid(
    'id',
    'driver_name',
    'licence_number',
    'contact_number',
    'email',
    'status',
    'created_at',
    'updated_at'
  ).default('created_at').messages({
    'any.only': 'Invalid sort field'
  }),

  sort_order: Joi.string().valid('ASC', 'DESC').default('DESC').messages({
    'any.only': 'Sort order must be ASC or DESC'
  })
});

module.exports = {
  createDriverSchema,
  updateDriverSchema,
  driverIdSchema,
  driverQuerySchema
};