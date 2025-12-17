const Joi = require('joi');

const blogBaseSchema = {
  title: Joi.string()
    .trim()
    .min(3)
    .max(255)
    .messages({
      'string.empty': 'Title is required',
      'string.min': 'Title must be at least 3 characters long',
      'string.max': 'Title cannot exceed 255 characters'
    }),
  
  content: Joi.string()
    .trim()
    .min(10)
    .messages({
      'string.empty': 'Content is required',
      'string.min': 'Content must be at least 10 characters long'
    }),
    
  excerpt: Joi.string()
    .trim()
    .max(500)
    .allow('')
    .optional()
    .messages({
      'string.max': 'Excerpt cannot exceed 500 characters'
    }),
    
  category: Joi.string()
    .trim()
    .min(2)
    .max(100)
    .default('General')
    .messages({
      'string.min': 'Category must be at least 2 characters long',
      'string.max': 'Category cannot exceed 100 characters'
    }),
    
  slug: Joi.string()
    .trim()
    .min(3)
    .max(255)
    .pattern(/^[a-z0-9-]+$/)
    .optional()
    .messages({
      'string.min': 'Slug must be at least 3 characters long',
      'string.max': 'Slug cannot exceed 255 characters',
      'string.pattern.base': 'Slug can only contain lowercase letters, numbers, and hyphens'
    }),
    
  status: Joi.string()
    .valid('draft', 'published', 'archived')
    .default('draft')
    .messages({
      'any.only': 'Status must be draft, published, or archived'
    }),
    
  featured_image: Joi.string()
    .uri({ scheme: ['http', 'https'] })
    .max(500)
    .allow('')
    .optional()
    .messages({
      'string.uri': 'Featured image must be a valid HTTP/HTTPS URL',
      'string.max': 'Featured image URL cannot exceed 500 characters'
    }),
    
  tags: Joi.string()
    .trim()
    .max(1000)
    .allow('')
    .optional()
    .messages({
      'string.max': 'Tags cannot exceed 1000 characters'
    }),
    
  meta_title: Joi.string()
    .trim()
    .max(60)
    .allow('')
    .optional()
    .messages({
      'string.max': 'Meta title should not exceed 60 characters for SEO'
    }),
    
  meta_description: Joi.string()
    .trim()
    .max(160)
    .allow('')
    .optional()
    .messages({
      'string.max': 'Meta description should not exceed 160 characters for SEO'
    })
};

const createBlogSchema = Joi.object({
  ...blogBaseSchema,
  title: blogBaseSchema.title.required(),
  content: blogBaseSchema.content.required()
});

const updateBlogSchema = Joi.object({
  title: blogBaseSchema.title.optional(),
  content: blogBaseSchema.content.optional(),
  excerpt: blogBaseSchema.excerpt,
  category: blogBaseSchema.category.optional(),
  slug: blogBaseSchema.slug,
  status: blogBaseSchema.status.optional(),
  featured_image: blogBaseSchema.featured_image,
  tags: blogBaseSchema.tags,
  meta_title: blogBaseSchema.meta_title,
  meta_description: blogBaseSchema.meta_description
}).min(1).messages({
  'object.min': 'At least one field must be provided for update'
});

const blogIdSchema = Joi.object({
  id: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      'number.base': 'Blog ID must be a number',
      'number.integer': 'Blog ID must be an integer',
      'number.positive': 'Blog ID must be positive',
      'any.required': 'Blog ID is required'
    })
});

const slugSchema = Joi.object({
  slug: Joi.string()
    .trim()
    .min(3)
    .max(255)
    .pattern(/^[a-z0-9-]+$/)
    .required()
    .messages({
      'string.empty': 'Slug is required',
      'string.min': 'Slug must be at least 3 characters long',
      'string.max': 'Slug cannot exceed 255 characters',
      'string.pattern.base': 'Slug can only contain lowercase letters, numbers, and hyphens',
      'any.required': 'Slug is required'
    })
});

const blogQuerySchema = Joi.object({
  page: Joi.number()
    .integer()
    .min(1)
    .default(1)
    .messages({
      'number.base': 'Page must be a number',
      'number.integer': 'Page must be an integer',
      'number.min': 'Page must be at least 1'
    }),
    
  limit: Joi.number()
    .integer()
    .min(1)
    .max(100)
    .default(10)
    .messages({
      'number.base': 'Limit must be a number',
      'number.integer': 'Limit must be an integer',
      'number.min': 'Limit must be at least 1',
      'number.max': 'Limit cannot exceed 100'
    }),
    
  search: Joi.string()
    .trim()
    .max(255)
    .allow('')
    .optional()
    .messages({
      'string.max': 'Search term cannot exceed 255 characters'
    }),
    
  status: Joi.string()
    .valid('draft', 'published', 'archived')
    .optional()
    .messages({
      'any.only': 'Status filter must be draft, published, or archived'
    }),
    
  category: Joi.string()
    .trim()
    .max(100)
    .optional()
    .messages({
      'string.max': 'Category filter cannot exceed 100 characters'
    }),
    
  author_id: Joi.number()
    .integer()
    .positive()
    .optional()
    .messages({
      'number.base': 'Author ID must be a number',
      'number.integer': 'Author ID must be an integer',
      'number.positive': 'Author ID must be positive'
    }),
    
  sort_by: Joi.string()
    .valid('created_at', 'updated_at', 'published_at', 'title', 'views')
    .default('created_at')
    .messages({
      'any.only': 'Sort by must be one of: created_at, updated_at, published_at, title, views'
    }),
    
  sort_order: Joi.string()
    .valid('asc', 'desc')
    .default('desc')
    .messages({
      'any.only': 'Sort order must be asc or desc'
    })
});

// Validation middleware functions
const validateCreateBlog = (req, res, next) => {
  const { error, value } = createBlogSchema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true
  });

  if (error) {
    const errors = error.details.map(detail => ({
      field: detail.path.join('.'),
      message: detail.message
    }));
    
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }

  req.body = value;
  next();
};

const validateUpdateBlog = (req, res, next) => {
  const { error, value } = updateBlogSchema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true
  });

  if (error) {
    const errors = error.details.map(detail => ({
      field: detail.path.join('.'),
      message: detail.message
    }));
    
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }

  req.body = value;
  next();
};

const validateBlogId = (req, res, next) => {
  const { error, value } = blogIdSchema.validate({ id: req.params.id });

  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Invalid blog ID',
      errors: [{ field: 'id', message: error.details[0].message }]
    });
  }

  req.params.id = value.id;
  next();
};

const validateSlug = (req, res, next) => {
  const { error, value } = slugSchema.validate({ slug: req.params.slug });

  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Invalid slug',
      errors: [{ field: 'slug', message: error.details[0].message }]
    });
  }

  req.params.slug = value.slug;
  next();
};

const validateBlogQuery = (req, res, next) => {
  const { error, value } = blogQuerySchema.validate(req.query, {
    abortEarly: false,
    stripUnknown: true
  });

  if (error) {
    const errors = error.details.map(detail => ({
      field: detail.path.join('.'),
      message: detail.message
    }));
    
    return res.status(400).json({
      success: false,
      message: 'Invalid query parameters',
      errors
    });
  }

  req.query = value;
  next();
};

module.exports = {
  createBlogSchema,
  updateBlogSchema,
  blogIdSchema,
  slugSchema,
  blogQuerySchema,
  
  validateCreateBlog,
  validateUpdateBlog,
  validateBlogId,
  validateSlug,
  validateBlogQuery,
  
  createBlogValidation: validateCreateBlog,
  updateBlogValidation: validateUpdateBlog,
  blogIdValidation: validateBlogId,
  slugValidation: validateSlug
};