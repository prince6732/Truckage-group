'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Blog extends Model {
    static associate(models) {
      Blog.belongsTo(models.User, {
        foreignKey: 'author_id',
        as: 'author'
      });
    }

    getFormattedDate() {
      return this.createdAt.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }

    getReadingTime() {
      const wordsPerMinute = 200;
      const wordCount = this.content.split(/\s+/).length;
      const minutes = Math.ceil(wordCount / wordsPerMinute);
      return `${minutes} min read`;
    }

    getTagsArray() {
      return this.tags ? this.tags.split(',').map(tag => tag.trim()) : [];
    }

    static async getPublished() {
      return await Blog.findAll({
        where: { status: 'published' },
        include: [{
          model: sequelize.models.User,
          as: 'author',
          attributes: ['id', 'name', 'email']
        }],
        order: [['published_at', 'DESC']]
      });
    }

    static async getBySlug(slug) {
      return await Blog.findOne({
        where: { slug, status: 'published' },
        include: [{
          model: sequelize.models.User,
          as: 'author',
          attributes: ['id', 'name', 'email']
        }]
      });
    }

    static async getByCategory(category) {
      return await Blog.findAll({
        where: { category, status: 'published' },
        include: [{
          model: sequelize.models.User,
          as: 'author',
          attributes: ['id', 'name', 'email']
        }],
        order: [['published_at', 'DESC']]
      });
    }
  }

  Blog.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 255]
      }
    },
    slug: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        is: /^[a-z0-9-]+$/
      }
    },
    excerpt: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    content: {
      type: DataTypes.TEXT('long'),
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    featured_image: {
      type: DataTypes.STRING(500),
      allowNull: true,
      validate: {
        isUrl: true
      }
    },
    category: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: 'General',
      validate: {
        notEmpty: true,
        len: [2, 100]
      }
    },
    tags: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    author_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    status: {
      type: DataTypes.ENUM('draft', 'published', 'archived'),
      allowNull: false,
      defaultValue: 'draft'
    },
    meta_title: {
      type: DataTypes.STRING(255),
      allowNull: true,
      validate: {
        len: [0, 255]
      }
    },
    meta_description: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        len: [0, 500]
      }
    },
    published_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    views: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0
      }
    }
  }, {
    sequelize,
    modelName: 'Blog',
    tableName: 'blogs',
    timestamps: true,
    hooks: {
      beforeCreate: (blog) => {
        if (!blog.slug && blog.title) {
          blog.slug = blog.title
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim('-');
        }
        
        if (blog.status === 'published' && !blog.published_at) {
          blog.published_at = new Date();
        }
      },
      beforeUpdate: (blog) => {
        if (blog.status === 'published' && !blog.published_at) {
          blog.published_at = new Date();
        }
        
        if (blog.status !== 'published' && blog.published_at) {
          blog.published_at = null;
        }
      }
    }
  });

  return Blog;
};