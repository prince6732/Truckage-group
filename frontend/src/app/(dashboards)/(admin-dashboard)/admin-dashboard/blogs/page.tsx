"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { blogService } from "@/services/blogService";
import { useAuth } from "@/context/AuthContext";
import { FiPlus, FiEdit3, FiTrash2, FiEye, FiCalendar, FiUser, FiSearch, FiFilter } from "react-icons/fi";
import { FileText, TrendingUp, Users, Calendar, Eye } from "lucide-react";
import Link from "next/link";

interface Blog {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    featured_image: string;
    category: string;
    tags: string;
    status: 'draft' | 'published' | 'archived';
    views: number;
    published_at: string;
    createdAt: string;
    author: {
        id: number;
        name: string;
        email: string;
    };
}

interface BlogStats {
    total_blogs: number;
    published_blogs: number;
    draft_blogs: number;
    archived_blogs: number;
    total_views: number;
}

export default function BlogsManagement() {
    const { user } = useAuth();
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [stats, setStats] = useState<BlogStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");

    const fetchBlogs = async () => {
        try {
            setLoading(true);
            const params = {
                page: currentPage,
                limit: 10,
                search: searchTerm,
                status: statusFilter,
                category: categoryFilter,
            };

            const response = await blogService.getAllBlogs(params);
            setBlogs(response.data.blogs);
            setTotalPages(response.data.pagination.total_pages);
        } catch (error) {
            console.error('Error fetching blogs:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchStats = async () => {
        try {
            const response = await blogService.getBlogStats();
            setStats(response.data);
        } catch (error) {
            console.error('Error fetching stats:', error);
        }
    };

    const deleteBlog = async (id: number) => {
        if (!confirm('Are you sure you want to delete this blog?')) return;

        try {
            await blogService.deleteBlog(id);
            fetchBlogs();
            fetchStats();
        } catch (error) {
            console.error('Error deleting blog:', error);
            alert('Failed to delete blog');
        }
    };

    useEffect(() => {
        if (user?.role === 'ADMIN') {
            fetchBlogs();
            fetchStats();
        }
    }, [currentPage, searchTerm, statusFilter, categoryFilter, user]);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'published':
                return 'bg-emerald-100 text-emerald-800 border border-emerald-200';
            case 'draft':
                return 'bg-amber-100 text-amber-800 border border-amber-200';
            case 'archived':
                return 'bg-slate-100 text-slate-800 border border-slate-200';
            default:
                return 'bg-slate-100 text-slate-800 border border-slate-200';
        }
    };

    if (user?.role !== 'ADMIN') {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
                    <p className="text-gray-600">You need admin privileges to access this page.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8 pb-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-xl">
                            <FileText className="w-7 h-7 text-blue-600" />
                        </div>
                        Blog Management
                    </h1>
                    <p className="text-slate-600 mt-2">Create, edit and manage your blog posts with ease</p>
                </div>
                <Link
                    href="/admin-dashboard/blogs/create"
                    className="inline-flex items-center gap-2 bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-lg shadow-blue-500/30"
                >
                    <FiPlus className="w-5 h-5" />
                    Create New Post
                </Link>
            </motion.div>

            {/* Stats Cards */}
            {stats && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6"
                >
                    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-lg hover:shadow-xl transition-all group">
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-3 rounded-xl bg-linear-to-r from-blue-500 to-blue-600">
                                <FileText className="w-6 h-6 text-white" />
                            </div>
                        </div>
                        <h3 className="text-slate-600 text-sm font-medium mb-1">Total Blogs</h3>
                        <p className="text-3xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                            {stats.total_blogs}
                        </p>
                    </div>
                    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-lg hover:shadow-xl transition-all group">
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-3 rounded-xl bg-linear-to-r from-emerald-500 to-emerald-600">
                                <TrendingUp className="w-6 h-6 text-white" />
                            </div>
                        </div>
                        <h3 className="text-slate-600 text-sm font-medium mb-1">Published</h3>
                        <p className="text-3xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                            {stats.published_blogs}
                        </p>
                    </div>
                    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-lg hover:shadow-xl transition-all group">
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-3 rounded-xl bg-linear-to-r from-amber-500 to-amber-600">
                                <Calendar className="w-6 h-6 text-white" />
                            </div>
                        </div>
                        <h3 className="text-slate-600 text-sm font-medium mb-1">Drafts</h3>
                        <p className="text-3xl font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                            {stats.draft_blogs}
                        </p>
                    </div>
                    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-lg hover:shadow-xl transition-all group">
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-3 rounded-xl bg-linear-to-r from-slate-500 to-slate-600">
                                <Users className="w-6 h-6 text-white" />
                            </div>
                        </div>
                        <h3 className="text-slate-600 text-sm font-medium mb-1">Archived</h3>
                        <p className="text-3xl font-bold text-slate-900 group-hover:text-slate-600 transition-colors">
                            {stats.archived_blogs}
                        </p>
                    </div>
                    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-lg hover:shadow-xl transition-all group">
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-3 rounded-xl bg-linear-to-r from-purple-500 to-purple-600">
                                <Eye className="w-6 h-6 text-white" />
                            </div>
                        </div>
                        <h3 className="text-slate-600 text-sm font-medium mb-1">Total Views</h3>
                        <p className="text-3xl font-bold text-slate-900 group-hover:text-purple-600 transition-colors">
                            {stats.total_views}
                        </p>
                    </div>
                </motion.div>
            )}

            {/* Filters */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden"
            >
                <div className="p-6 border-b border-slate-200 bg-linear-to-r from-slate-50 to-white">
                    <div className="flex items-center gap-3">
                        <FiFilter className="w-5 h-5 text-blue-600" />
                        <h2 className="text-lg font-bold text-slate-900">Filter & Search</h2>
                    </div>
                </div>
                <div className="p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="relative">
                            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search blogs..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-3 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                        </div>
                        <div>
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="w-full px-3 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            >
                                <option value="">All Status</option>
                                <option value="published">Published</option>
                                <option value="draft">Draft</option>
                                <option value="archived">Archived</option>
                            </select>
                        </div>
                        <div>
                            <select
                                value={categoryFilter}
                                onChange={(e) => setCategoryFilter(e.target.value)}
                                className="w-full px-3 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            >
                                <option value="">All Categories</option>
                                <option value="Technology">Technology</option>
                                <option value="Sustainability">Sustainability</option>
                                <option value="Supply Chain">Supply Chain</option>
                                <option value="Fleet Management">Fleet Management</option>
                                <option value="Digital Transformation">Digital Transformation</option>
                            </select>
                        </div>
                        <div>
                            <button
                                onClick={() => {
                                    setSearchTerm("");
                                    setStatusFilter("");
                                    setCategoryFilter("");
                                }}
                                className="w-full px-3 py-3 border border-slate-300 rounded-xl hover:bg-slate-50 transition-all font-medium"
                            >
                                Clear Filters
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Blog List */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden"
            >
                {loading ? (
                    <div className="p-12 text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="mt-4 text-slate-600 font-medium">Loading blogs...</p>
                    </div>
                ) : blogs.length === 0 ? (
                    <div className="p-12 text-center">
                        <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                        <p className="text-slate-600 font-medium">No blogs found</p>
                        <p className="text-slate-500 text-sm mt-2">Create your first blog post to get started</p>
                    </div>
                ) : (
                    <div className="divide-y divide-slate-200">
                        {blogs.map((blog, index) => (
                            <motion.div
                                key={blog.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 + index * 0.1 }}
                                className="p-6 hover:bg-slate-50 transition-all group"
                            >
                                <div className="flex flex-col lg:flex-row gap-6">
                                    {/* Blog Image */}
                                    {blog.featured_image && (
                                        <div className="lg:w-52 shrink-0">
                                            <img
                                                src={blog.featured_image}
                                                alt={blog.title}
                                                className="w-full h-36 lg:h-32 object-cover rounded-xl shadow-md"
                                            />
                                        </div>
                                    )}

                                    {/* Blog Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex flex-wrap items-center gap-3 mb-3">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(blog.status)}`}>
                                                {blog.status.charAt(0).toUpperCase() + blog.status.slice(1)}
                                            </span>
                                            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                                                {blog.category}
                                            </span>
                                            <div className="flex items-center gap-1 text-xs text-slate-500 font-medium">
                                                <Eye className="w-3 h-3" />
                                                {blog.views} views
                                            </div>
                                        </div>

                                        <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                                            {blog.title}
                                        </h3>

                                        <p className="text-slate-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                                            {blog.excerpt}
                                        </p>

                                        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                                            <div className="flex items-center gap-2 font-medium">
                                                <div className="w-6 h-6 bg-linear-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                                                    <FiUser className="w-3 h-3 text-white" />
                                                </div>
                                                {blog.author.name}
                                            </div>
                                            <div className="flex items-center gap-2 font-medium">
                                                <FiCalendar className="w-3 h-3" />
                                                {new Date(blog.createdAt).toLocaleDateString()}
                                            </div>
                                            {blog.tags && (
                                                <div className="flex items-center gap-1">
                                                    <span className="text-slate-400">#</span>
                                                    {blog.tags.split(',').slice(0, 2).join(', #')}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex lg:flex-col gap-2">
                                        <Link
                                            href={`/admin-dashboard/blogs/edit/${blog.id}`}
                                            className="inline-flex items-center gap-2 px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-xl transition-all font-medium border border-blue-200 hover:border-blue-300"
                                        >
                                            <FiEdit3 className="w-4 h-4" />
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => deleteBlog(blog.id)}
                                            className="inline-flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-all font-medium border border-red-200 hover:border-red-300"
                                        >
                                            <FiTrash2 className="w-4 h-4" />
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                )}

            </motion.div>




            {totalPages > 1 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex justify-center items-center gap-4 bg-white rounded-2xl border border-slate-200 shadow-lg p-6"
                >
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-6 py-3 border border-slate-300 rounded-xl hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-all"
                    >
                        Previous
                    </button>
                    <div className="px-6 py-3 bg-linear-to-r from-blue-50 to-blue-100 text-blue-700 font-semibold rounded-xl">
                        Page {currentPage} of {totalPages}
                    </div>
                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-6 py-3 border border-slate-300 rounded-xl hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-all"
                    >
                        Next
                    </button>
                </motion.div>
            )}
        </div>
    );
}