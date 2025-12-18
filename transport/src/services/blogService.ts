import axios from "@/utils/axios";





export const blogService = {
  getPublishedBlogs: async (params = {}) => {
    try {
      const response = await axios.get('/blogs/published', { params });
      return response.data;
    } catch (error:any) {
      throw error.response?.data || error.message;
    }
  },

  getBlogBySlug: async (slug:any) => {
    try {
      const response = await axios.get(`/blogs/public/${slug}`);
      return response.data;
    } catch (error:any) {
      throw error.response?.data || error.message;
    }
  },

  getCategories: async () => {
    try {
      const response = await axios.get('/blogs/categories');
      return response.data;
    } catch (error:any) {
      throw error.response?.data || error.message;
    }
  },

  getAllBlogs: async (params:any = {}) => {
    try {
      const response = await axios.get('/blogs', { params });
      return response.data;
    } catch (error:any) {
      throw error.response?.data || error.message;
    }
  },

  getBlogById: async (id:any) => {
    try {
      const response = await axios.get(`/blogs/${id}`);
      return response.data;
    } catch (error:any) {
      throw error.response?.data || error.message;
    }
  },

  createBlog: async (blogData:any) => {
    try {
      const response = await axios.post('/blogs', blogData);
      return response.data;
    } catch (error:any) {
      throw error.response?.data || error.message;
    }
  },

  updateBlog: async (id:any, blogData:any) => {
    try {
      const response = await axios.put(`/blogs/${id}`, blogData);
      return response.data;
    } catch (error:any) {
      throw error.response?.data || error.message;
    }
  },

  deleteBlog: async (id:any) => {
    try {
      const response = await axios.delete(`/blogs/${id}`);
      return response.data;
    } catch (error:any) {
      throw error.response?.data || error.message;
    }
  },

  getBlogStats: async () => {
    try {
      const response = await axios.get('/blogs/stats');
      return response.data;
    } catch (error:any) {
      throw error.response?.data || error.message;
    }
  },

  generateSlug: (title:any) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-');
  },

  formatDate: (dateString:any) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  },

  getReadingTime: (content:any) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min read`;
  }
};