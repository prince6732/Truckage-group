"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { blogService } from "@/services/blogService";
import { useAuth } from "@/context/AuthContext";
import { FiSave, FiArrowLeft, FiEye } from "react-icons/fi";
import { FileText, Eye, Save, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CreateBlog() {
    const router = useRouter();
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [previewMode, setPreviewMode] = useState(false);

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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setBlogData(prev => ({
            ...prev,
            [name]: value
        }));

        if (name === "title") {
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
            await blogService.createBlog(blogData);
            router.push("/admin-dashboard/blogs");
        } catch (error: any) {
            console.error("Error creating blog:", error);
            alert(error.message || "Failed to create blog");
        } finally {
            setLoading(false);
        }
    };

    const handleSaveDraft = async () => {
        try {
            setLoading(true);
            const draftData = { ...blogData, status: "draft" };
            await blogService.createBlog(draftData);
            router.push("/admin-dashboard/blogs");
        } catch (error: any) {
            console.error("Error saving draft:", error);
            alert(error.message || "Failed to save draft");
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
                            Create New Blog Post
                        </h1>
                        <p className="text-slate-600 mt-1">Write and publish your blog content</p>
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
                        <p className="text-slate-600 text-sm">Fill in the details for your new blog post</p>
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
                                    <p className="text-xs text-slate-500 mt-2 font-medium">Auto-generated from title. Use lowercase letters, numbers, and hyphens only.</p>
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
                                <div>
                                    <label htmlFor="status" className="block text-sm font-semibold text-slate-700 mb-3">
                                        Status
                                    </label>
                                    <select
                                        id="status"
                                        name="status"
                                        value={blogData.status}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-medium"
                                    >
                                        <option value="draft">Draft</option>
                                        <option value="published">Published</option>
                                        <option value="archived">Archived</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="category" className="block text-sm font-semibold text-slate-700 mb-3">
                                        Category
                                    </label>
                                    <select
                                        id="category"
                                        name="category"
                                        value={blogData.category}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-medium"
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
                                    <label htmlFor="featured_image" className="block text-sm font-semibold text-slate-700 mb-3">
                                        Featured Image URL
                                    </label>
                                    <input
                                        type="url"
                                        id="featured_image"
                                        name="featured_image"
                                        value={blogData.featured_image}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-medium"
                                        placeholder="https://example.com/image.jpg"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="tags" className="block text-sm font-semibold text-slate-700 mb-3">
                                        Tags
                                    </label>
                                    <input
                                        type="text"
                                        id="tags"
                                        name="tags"
                                        value={blogData.tags}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-medium"
                                        placeholder="tag1, tag2, tag3"
                                    />
                                    <p className="text-xs text-slate-500 mt-2 font-medium">Separate multiple tags with commas</p>
                                </div>

                                {/* SEO Meta */}
                                <div className="border-t border-slate-200 pt-6">
                                    <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                        SEO Settings
                                    </h3>

                                    <div className="space-y-4">
                                        <div>
                                            <label htmlFor="meta_title" className="block text-sm font-semibold text-slate-700 mb-3">
                                                Meta Title
                                            </label>
                                            <input
                                                type="text"
                                                id="meta_title"
                                                name="meta_title"
                                                value={blogData.meta_title}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-medium"
                                                placeholder="SEO title for search engines"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="meta_description" className="block text-sm font-semibold text-slate-700 mb-3">
                                                Meta Description
                                            </label>
                                            <textarea
                                                id="meta_description"
                                                name="meta_description"
                                                value={blogData.meta_description}
                                                onChange={handleInputChange}
                                                rows={3}
                                                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-medium"
                                                placeholder="SEO description for search engines"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </motion.div>


                {/* Action Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6"
                >
                    <div className="flex flex-col sm:flex-row gap-4 justify-end">
                        <button
                            type="button"
                            onClick={handleSaveDraft}
                            disabled={loading}
                            className="flex items-center justify-center gap-2 px-8 py-3 border border-slate-300 rounded-xl hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed font-semibold transition-all"
                        >
                            <Save className="w-5 h-5" />
                            {loading ? "Saving..." : "Save as Draft"}
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="flex items-center justify-center gap-2 px-8 py-3 bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed font-semibold transition-all shadow-lg shadow-blue-500/30"
                        >
                            <Save className="w-5 h-5" />
                            {loading ? "Publishing..." : blogData.status === "published" ? "Publish Blog" : "Save Blog"}
                        </button>
                    </div>
                </motion.div>
            </form>
        </div>
    );
}