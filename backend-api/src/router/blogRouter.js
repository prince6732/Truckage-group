const express = require('express');
const router = express.Router();
const blogController = require('../controller/blogController');
const { authenticateToken } = require('../middleware/auth');
const role = require('../middleware/role');
const {
  validateCreateBlog,
  validateUpdateBlog,
  validateBlogId,
  validateSlug,
  validateBlogQuery
} = require('../validations/blog.validator');

router.get('/published', validateBlogQuery, blogController.getPublishedBlogs);
router.get('/public/:slug', validateSlug, blogController.getBlogBySlug);
router.get('/categories', blogController.getCategories);

router.use(authenticateToken);

router.get('/', role(['ADMIN']), validateBlogQuery, blogController.getAllBlogs);
router.get('/stats', role(['ADMIN']), blogController.getBlogStats);
router.get('/:id', role(['ADMIN']), validateBlogId, blogController.getBlogById);
router.post('/', role(['ADMIN']), validateCreateBlog, blogController.createBlog);
router.put('/:id', role(['ADMIN']), validateBlogId, validateUpdateBlog, blogController.updateBlog);
router.delete('/:id', role(['ADMIN']), validateBlogId, blogController.deleteBlog);

module.exports = router;



