const { Blog, User } = require('../../models');
const { Op } = require('sequelize');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');

class BlogController {

  async getAllBlogs(req, res) {
    try {
      const { 
        page = 1, 
        limit = 10, 
        status, 
        category, 
        author_id,
        search,
        sort_by = 'createdAt',
        sort_order = 'DESC'
      } = req.query;

      const offset = (page - 1) * limit;
      const where = {};

      if (status) where.status = status;
      if (category) where.category = category;
      if (author_id) where.author_id = author_id;
      if (search) {
        where[Op.or] = [
          { title: { [Op.like]: `%${search}%` } },
          { content: { [Op.like]: `%${search}%` } },
          { excerpt: { [Op.like]: `%${search}%` } }
        ];
      }

      const { count, rows } = await Blog.findAndCountAll({
        where,
        include: [{
          model: User,
          as: 'author',
          attributes: ['id', 'name', 'email']
        }],
        order: [[sort_by, sort_order]],
        limit: parseInt(limit),
        offset: parseInt(offset)
      });

      const totalPages = Math.ceil(count / limit);

      return res.json(new ApiResponse(
        200,
        {
          blogs: rows,
          pagination: {
            current_page: parseInt(page),
            total_pages: totalPages,
            total_items: count,
            per_page: parseInt(limit),
            has_next: page < totalPages,
            has_prev: page > 1
          }
        },
        'Blogs retrieved successfully'
      ));
    } catch (error) {
      return res.status(500).json(new ApiError(500, 'Failed to retrieve blogs', error.message));
    }
  }

  async getPublishedBlogs(req, res) {
    try {
      const { 
        page = 1, 
        limit = 6, 
        category,
        search
      } = req.query;

      const offset = (page - 1) * limit;
      const where = { status: 'published' };

      if (category) where.category = category;
      if (search) {
        where[Op.or] = [
          { title: { [Op.like]: `%${search}%` } },
          { excerpt: { [Op.like]: `%${search}%` } }
        ];
      }

      const { count, rows } = await Blog.findAndCountAll({
        where,
        include: [{
          model: User,
          as: 'author',
          attributes: ['id', 'name']
        }],
        order: [['published_at', 'DESC']],
        limit: parseInt(limit),
        offset: parseInt(offset)
      });

      const totalPages = Math.ceil(count / limit);

      return res.json(new ApiResponse(
        200,
        {
          blogs: rows,
          pagination: {
            current_page: parseInt(page),
            total_pages: totalPages,
            total_items: count,
            per_page: parseInt(limit)
          }
        },
        'Published blogs retrieved successfully'
      ));
    } catch (error) {
      return res.status(500).json(new ApiError(500, 'Failed to retrieve published blogs', error.message));
    }
  }

  async getBlogById(req, res) {
    try {
      const { id } = req.params;
      
      const blog = await Blog.findByPk(id, {
        include: [{
          model: User,
          as: 'author',
          attributes: ['id', 'name', 'email']
        }]
      });

      if (!blog) {
        return res.status(404).json(new ApiError(404, 'Blog not found'));
      }

      return res.json(new ApiResponse(200, blog, 'Blog retrieved successfully'));
    } catch (error) {
      return res.status(500).json(new ApiError(500, 'Failed to retrieve blog', error.message));
    }
  }

  async getBlogBySlug(req, res) {
    try {
      const { slug } = req.params;
      
      const blog = await Blog.getBySlug(slug);

      if (!blog) {
        return res.status(404).json(new ApiError(404, 'Blog not found'));
      }

      await blog.increment('views');

      return res.json(new ApiResponse(200, blog, 'Blog retrieved successfully'));
    } catch (error) {
      return res.status(500).json(new ApiError(500, 'Failed to retrieve blog', error.message));
    }
  }

  async createBlog(req, res) {
    try {
      const {
        title,
        slug,
        excerpt,
        content,
        featured_image,
        category,
        tags,
        status,
        meta_title,
        meta_description
      } = req.body;

      let blogSlug = slug;
      if (!blogSlug) {
        blogSlug = title
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
          .trim('-');
      }

      const existingBlog = await Blog.findOne({ where: { slug: blogSlug } });
      if (existingBlog) {
        return res.status(400).json(new ApiError(400, 'Blog with this slug already exists'));
      }

      const blog = await Blog.create({
        title,
        slug: blogSlug,
        excerpt,
        content,
        featured_image,
        category: category || 'General',
        tags,
        author_id: req.user.id,
        status: status || 'draft',
        meta_title,
        meta_description
      });

      const createdBlog = await Blog.findByPk(blog.id, {
        include: [{
          model: User,
          as: 'author',
          attributes: ['id', 'name', 'email']
        }]
      });

      return res.status(201).json(new ApiResponse(201, createdBlog, 'Blog created successfully'));
    } catch (error) {
      return res.status(500).json(new ApiError(500, 'Failed to create blog', error.message));
    }
  }

  async updateBlog(req, res) {
    try {
      const { id } = req.params;
      const {
        title,
        slug,
        excerpt,
        content,
        featured_image,
        category,
        tags,
        status,
        meta_title,
        meta_description
      } = req.body;

      const blog = await Blog.findByPk(id);
      if (!blog) {
        return res.status(404).json(new ApiError(404, 'Blog not found'));
      }

      if (req.user.role !== 'ADMIN' && blog.author_id !== req.user.id) {
        return res.status(403).json(new ApiError(403, 'Unauthorized to update this blog'));
      }

      if (slug && slug !== blog.slug) {
        const existingBlog = await Blog.findOne({ where: { slug } });
        if (existingBlog) {
          return res.status(400).json(new ApiError(400, 'Blog with this slug already exists'));
        }
      }

      await blog.update({
        title: title || blog.title,
        slug: slug || blog.slug,
        excerpt: excerpt || blog.excerpt,
        content: content || blog.content,
        featured_image: featured_image || blog.featured_image,
        category: category || blog.category,
        tags: tags || blog.tags,
        status: status || blog.status,
        meta_title: meta_title || blog.meta_title,
        meta_description: meta_description || blog.meta_description
      });

      const updatedBlog = await Blog.findByPk(id, {
        include: [{
          model: User,
          as: 'author',
          attributes: ['id', 'name', 'email']
        }]
      });

      return res.json(new ApiResponse(200, updatedBlog, 'Blog updated successfully'));
    } catch (error) {
      return res.status(500).json(new ApiError(500, 'Failed to update blog', error.message));
    }
  }

  async deleteBlog(req, res) {
    try {
      const { id } = req.params;
      
      const blog = await Blog.findByPk(id);
      if (!blog) {
        return res.status(404).json(new ApiError(404, 'Blog not found'));
      }

      if (req.user.role !== 'ADMIN' && blog.author_id !== req.user.id) {
        return res.status(403).json(new ApiError(403, 'Unauthorized to delete this blog'));
      }

      await blog.destroy();

      return res.json(new ApiResponse(200, null, 'Blog deleted successfully'));
    } catch (error) {
      return res.status(500).json(new ApiError(500, 'Failed to delete blog', error.message));
    }
  }

  async getCategories(req, res) {
    try {
      const categories = await Blog.findAll({
        attributes: ['category'],
        group: ['category'],
        raw: true
      });

      const categoryList = categories.map(cat => cat.category);

      return res.json(new ApiResponse(200, categoryList, 'Categories retrieved successfully'));
    } catch (error) {
      return res.status(500).json(new ApiError(500, 'Failed to retrieve categories', error.message));
    }
  }

  async getBlogStats(req, res) {
    try {
      const totalBlogs = await Blog.count();
      const publishedBlogs = await Blog.count({ where: { status: 'published' } });
      const draftBlogs = await Blog.count({ where: { status: 'draft' } });
      const totalViews = await Blog.sum('views') || 0;

      const stats = {
        total_blogs: totalBlogs,
        published_blogs: publishedBlogs,
        draft_blogs: draftBlogs,
        archived_blogs: totalBlogs - publishedBlogs - draftBlogs,
        total_views: totalViews
      };

      return res.json(new ApiResponse(200, stats, 'Blog statistics retrieved successfully'));
    } catch (error) {
      return res.status(500).json(new ApiError(500, 'Failed to retrieve blog statistics', error.message));
    }
  }
}

module.exports = new BlogController();