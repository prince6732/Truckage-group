"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter, useParams } from "next/navigation";
import { blogService } from "@/services/blogService";
import { useAuth } from "@/context/AuthContext";
import { FiSave, FiArrowLeft, FiEye, FiTrash2 } from "react-icons/fi";
import { FileText, Eye, Save, ArrowLeft, Trash2, Calendar, Clock } from "lucide-react";
import Link from "next/link";

interface BlogPost {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    featured_image: string;
    category: string;
    tags: string;
    status: 'draft' | 'published' | 'archived';
    meta_title: string;
    meta_description: string;
    published_at: string;
    created_at: string;
    updated_at: string;
}

export default function EditBlog() {
    const router = useRouter();
    const params = useParams();
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(true);
    const [previewMode, setPreviewMode] = useState(false);
    const [blog, setBlog] = useState<BlogPost | null>(null);

    const [blogData, setBlogData] = useState({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        featured_image: "",
        category: "General",
        tags: "",
        status: "draft",
        meta_title: "",
        meta_description: ""
    });

    useEffect(() => {
        if (params.id) {
            fetchBlog();
        }
    }, [params.id]);

    const fetchBlog = async () => {
        try {
            setFetchLoading(true);
            const blogPost = await blogService.getBlogById(Number(params.id));
            setBlog(blogPost);
            setBlogData({
                title: blogPost.title,
                slug: blogPost.slug,
                excerpt: blogPost.excerpt || "",
                content: blogPost.content,
                featured_image: blogPost.featured_image || "",
                category: blogPost.category,
                tags: blogPost.tags || "",
                status: blogPost.status,
                meta_title: blogPost.meta_title || "",
                meta_description: blogPost.meta_description || ""
            });
        } catch (error: any) {
            console.error("Error fetching blog:", error);
            alert(error.message || "Failed to fetch blog");
            router.push("/admin-dashboard/blogs");
        } finally {
            setFetchLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setBlogData(prev => ({
            ...prev,
            [name]: value
        }));

        // Auto-generate slug from title if it's being changed
        if (name === "title" && blog && value !== blog.title) {
            const slug = blogService.generateSlug(value);
            setBlogData(prev => ({
                ...prev,
                slug
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!blogData.title.trim() || !blogData.content.trim()) {
            alert("Please fill in the title and content");
            return;
        }

        try {
            setLoading(true);
            await blogService.updateBlog(Number(params.id), blogData);
            router.push("/admin-dashboard/blogs");
        } catch (error: any) {
            console.error("Error updating blog:", error);
            alert(error.message || "Failed to update blog");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this blog post? This action cannot be undone.")) {
            return;
        }

        try {
            setLoading(true);
            await blogService.deleteBlog(Number(params.id));
            router.push("/admin-dashboard/blogs");
        } catch (error: any) {
            console.error("Error deleting blog:", error);
            alert(error.message || "Failed to delete blog");
        } finally {
            setLoading(false);
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

    if (fetchLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading blog post...</p>
                </div>
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Blog Not Found</h2>
                    <p className="text-gray-600 mb-4">The blog post you're looking for doesn't exist.</p>
                    <Link
                        href="/admin-dashboard/blogs"
                        className="text-blue-600 hover:text-blue-700"
                    >
                        Back to Blogs
                    </Link>
                </div>
            </div>
        );
    }

    if (previewMode) {
        return (
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold">Blog Preview</h1>
                    <button
                        onClick={() => setPreviewMode(false)}
                        className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                        <FiArrowLeft className="w-4 h-4" />
                        Back to Editor
                    </button>
                </div>

                <article className="bg-white rounded-lg border border-gray-200 p-8">
                    {blogData.featured_image && (
                        <img
                            src={blogData.featured_image}
                            alt={blogData.title}
                            className="w-full h-64 object-cover rounded-lg mb-6"
                        />
                    )}

                    <div className="mb-4">
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                            {blogData.category}
                        </span>
                    </div>

                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                        {blogData.title || "Untitled Blog Post"}
                    </h1>

                    {blogData.excerpt && (
                        <p className="text-lg text-gray-600 mb-6 italic">
                            {blogData.excerpt}
                        </p>
                    )}

                    <div className="prose prose-lg max-w-none">
                        <div dangerouslySetInnerHTML={{ __html: blogData.content }} />
                    </div>

                    {blogData.tags && (
                        <div className="mt-8 pt-8 border-t border-gray-200">
                            <h4 className="text-sm font-semibold text-gray-900 mb-2">Tags:</h4>
                            <div className="flex flex-wrap gap-2">
                                {blogData.tags.split(',').map((tag, index) => (
                                    <span
                                        key={index}
                                        className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm"
                                    >
                                        {tag.trim()}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </article>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto space-y-8 pb-8">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
                <div className="flex items-center gap-4">
                    <Link
                        href="/admin-dashboard/blogs"
                        className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Blogs
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                            <div className="p-2 bg-blue-100 rounded-xl">
                                <FileText className="w-7 h-7 text-blue-600" />
                            </div>
                            Edit Blog Post
                        </h1>
                        <p className="text-slate-600 mt-1">Modify and update your blog content</p>
                    </div>
                </div>

                <div className="flex gap-3">
                    <button
                        type="button"
                        onClick={() => setPreviewMode(true)}
                        className="flex items-center gap-2 px-6 py-3 border border-slate-300 rounded-xl hover:bg-slate-50 font-medium transition-all"
                    >
                        <Eye className="w-4 h-4" />
                        Preview
                    </button>
                    <button
                        type="button"
                        onClick={handleDelete}
                        disabled={loading}
                        className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-all shadow-lg shadow-red-500/30"
                    >
                        <Trash2 className="w-4 h-4" />
                        Delete
                    </button>
                </div>
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden"
                >
                    <div className="p-6 border-b border-slate-200 bg-linear-to-r from-slate-50 to-white">
                        <h2 className="text-lg font-bold text-slate-900">Blog Content</h2>
                        <p className="text-slate-600 text-sm">Update your blog post details and content</p>
                    </div>
                    <div className="p-6">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Main Content */}
                            <div className="lg:col-span-2 space-y-6">
                                <div>
                                    <label htmlFor="title" className="block text-sm font-semibold text-slate-700 mb-3">
                                        Title *
                                    </label>
                                    <input
                                        type="text"
                                        id="title"
                                        name="title"
                                        value={blogData.title}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-medium"
                                        placeholder="Enter an engaging blog title"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="slug" className="block text-sm font-semibold text-slate-700 mb-3">
                                        URL Slug
                                    </label>
                                    <input
                                        type="text"
                                        id="slug"
                                        name="slug"
                                        value={blogData.slug}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-medium"
                                        placeholder="url-friendly-slug"
                                    />
                                    <p className="text-xs text-slate-500 mt-2 font-medium">Use lowercase letters, numbers, and hyphens only.</p>
                                </div>

                                <div>
                                    <label htmlFor="excerpt" className="block text-sm font-semibold text-slate-700 mb-3">
                                        Excerpt
                                    </label>
                                    <textarea
                                        id="excerpt"
                                        name="excerpt"
                                        value={blogData.excerpt}
                                        onChange={handleInputChange}
                                        rows={3}
                                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-medium"
                                        placeholder="Brief description that will appear in blog previews"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="content" className="block text-sm font-semibold text-slate-700 mb-3">
                                        Content *
                                    </label>
                                    <textarea
                                        id="content"
                                        name="content"
                                        value={blogData.content}
                                        onChange={handleInputChange}
                                        required
                                        rows={16}
                                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm transition-all"
                                        placeholder="Write your blog content here. You can use HTML tags for rich formatting."
                                    />
                                    <p className="text-xs text-slate-500 mt-2 font-medium">Use HTML tags for formatting: &lt;h2&gt;, &lt;h3&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;li&gt;, &lt;strong&gt;, &lt;em&gt;, etc.</p>
                                </div>
                            </div>

                            {/* Sidebar */}
                            <div className="space-y-6 lg:border-l lg:border-slate-200 lg:pl-8">
                                <div className="bg-linear-to-br from-blue-50 to-blue-100 p-6 rounded-2xl border border-blue-200">
                                    <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-blue-600" />
                                        Blog Information
                                    </h3>
                                    <div className="space-y-3 text-sm">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-3 h-3 text-blue-600" />
                                            <span className="text-slate-600 font-medium">Created:</span>
                                            <span className="text-slate-900 font-semibold">{new Date(blog.created_at).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-3 h-3 text-blue-600" />
                                            <span className="text-slate-600 font-medium">Updated:</span>
                                            <span className="text-slate-900 font-semibold">{new Date(blog.updated_at).toLocaleDateString()}</span>
                                        </div>
                                        {blog.published_at && (
                                            <div className="flex items-center gap-2">
                                                <Eye className="w-3 h-3 text-blue-600" />
                                                <span className="text-slate-600 font-medium">Published:</span>
                                                <span className="text-slate-900 font-semibold">{new Date(blog.published_at).toLocaleDateString()}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                                        Status
                                    </label>
                                    <select
                                        id="status"
                                        name="status"
                                        value={blogData.status}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="draft">Draft</option>
                                        <option value="published">Published</option>
                                        <option value="archived">Archived</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                                        Category
                                    </label>
                                    <select
                                        id="category"
                                        name="category"
                                        value={blogData.category}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="General">General</option>
                                        <option value="Technology">Technology</option>
                                        <option value="Sustainability">Sustainability</option>
                                        <option value="Supply Chain">Supply Chain</option>
                                        <option value="Fleet Management">Fleet Management</option>
                                        <option value="Digital Transformation">Digital Transformation</option>
                                        <option value="Industry News">Industry News</option>
                                        <option value="Tips & Guides">Tips & Guides</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="featured_image" className="block text-sm font-medium text-gray-700 mb-2">
                                        Featured Image URL
                                    </label>
                                    <input
                                        type="url"
                                        id="featured_image"
                                        name="featured_image"
                                        value={blogData.featured_image}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="https://example.com/image.jpg"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
                                        Tags
                                    </label>
                                    <input
                                        type="text"
                                        id="tags"
                                        name="tags"
                                        value={blogData.tags}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="tag1, tag2, tag3"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Separate multiple tags with commas</p>
                                </div>

                                {/* SEO Meta */}
                                <div className="border-t pt-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">SEO Meta</h3>

                                    <div className="space-y-4">
                                        <div>
                                            <label htmlFor="meta_title" className="block text-sm font-medium text-gray-700 mb-2">
                                                Meta Title
                                            </label>
                                            <input
                                                type="text"
                                                id="meta_title"
                                                name="meta_title"
                                                value={blogData.meta_title}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="SEO title for search engines"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="meta_description" className="block text-sm font-medium text-gray-700 mb-2">
                                                Meta Description
                                            </label>
                                            <textarea
                                                id="meta_description"
                                                name="meta_description"
                                                value={blogData.meta_description}
                                                onChange={handleInputChange}
                                                rows={3}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="SEO description for search engines"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>


                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6"
                >
                    <div className="flex flex-col sm:flex-row gap-4 justify-end">
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex items-center justify-center gap-2 px-8 py-3 bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed font-semibold transition-all shadow-lg shadow-blue-500/30"
                        >
                            <Save className="w-5 h-5" />
                            {loading ? "Updating..." : "Update Blog"}
                        </button>
                    </div>
                </motion.div>
            </form>
        </div>
    );
}