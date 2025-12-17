const Joi = require('joi');

// Vehicle document validation schemas
const vehicleDocumentSchemas = {
  // Upload document validation
  uploadDocument: Joi.object({
    vehicleId: Joi.number().integer().positive().required()
      .messages({
        'number.base': 'Vehicle ID must be a number',
        'number.integer': 'Vehicle ID must be an integer',
        'number.positive': 'Vehicle ID must be positive',
        'any.required': 'Vehicle ID is required'
      }),
    
    documentType: Joi.string()
      .valid(
        'insurance',
        'rc_permit',
        'registration_certificate',
        'national_permit',
        'road_tax',
        'fitness_certificate',
        'drivers_license',
        'pollution_certificate',
        'other'
      )
      .required()
      .messages({
        'string.base': 'Document type must be a string',
        'any.only': 'Invalid document type',
        'any.required': 'Document type is required'
      }),
    
    expiryDate: Joi.date().iso().allow(null, '').optional()
      .messages({
        'date.base': 'Expiry date must be a valid date',
        'date.format': 'Expiry date must be in ISO format (YYYY-MM-DD)'
      })
  }),

  // Update document validation
  updateDocument: Joi.object({
    documentType: Joi.string()
      .valid(
        'insurance',
        'rc_permit',
        'registration_certificate',
        'national_permit',
        'road_tax',
        'fitness_certificate',
        'drivers_license',
        'pollution_certificate',
        'other'
      )
      .optional()
      .messages({
        'string.base': 'Document type must be a string',
        'any.only': 'Invalid document type'
      }),
    
    expiryDate: Joi.date().iso().allow(null, '').optional()
      .messages({
        'date.base': 'Expiry date must be a valid date',
        'date.format': 'Expiry date must be in ISO format (YYYY-MM-DD)'
      })
  }),

  // Get all documents query validation
  getAllDocuments: Joi.object({
    page: Joi.number().integer().min(1).default(1)
      .messages({
        'number.base': 'Page must be a number',
        'number.integer': 'Page must be an integer',
        'number.min': 'Page must be at least 1'
      }),
    
    limit: Joi.number().integer().min(1).max(100).default(10)
      .messages({
        'number.base': 'Limit must be a number',
        'number.integer': 'Limit must be an integer',
        'number.min': 'Limit must be at least 1',
        'number.max': 'Limit cannot exceed 100'
      }),
    
    documentType: Joi.string()
      .valid(
        'insurance',
        'rc_permit',
        'registration_certificate',
        'national_permit',
        'road_tax',
        'fitness_certificate',
        'drivers_license',
        'pollution_certificate',
        'other'
      )
      .optional()
      .messages({
        'string.base': 'Document type must be a string',
        'any.only': 'Invalid document type'
      }),
    
    expiryStatus: Joi.string()
      .valid('expired', 'expiring_soon', 'valid')
      .optional()
      .messages({
        'string.base': 'Expiry status must be a string',
        'any.only': 'Expiry status must be either expired, expiring_soon, or valid'
      })
  }),

  // Get expiring documents query validation
  getExpiringDocuments: Joi.object({
    days: Joi.number().integer().min(1).max(365).default(30)
      .messages({
        'number.base': 'Days must be a number',
        'number.integer': 'Days must be an integer',
        'number.min': 'Days must be at least 1',
        'number.max': 'Days cannot exceed 365'
      })
  }),

  // Parameters validation
  vehicleIdParam: Joi.object({
    vehicleId: Joi.number().integer().positive().required()
      .messages({
        'number.base': 'Vehicle ID must be a number',
        'number.integer': 'Vehicle ID must be an integer',
        'number.positive': 'Vehicle ID must be positive',
        'any.required': 'Vehicle ID is required'
      })
  }),

  documentIdParam: Joi.object({
    documentId: Joi.number().integer().positive().required()
      .messages({
        'number.base': 'Document ID must be a number',
        'number.integer': 'Document ID must be an integer',
        'number.positive': 'Document ID must be positive',
        'any.required': 'Document ID is required'
      })
  })
};

module.exports = vehicleDocumentSchemas;