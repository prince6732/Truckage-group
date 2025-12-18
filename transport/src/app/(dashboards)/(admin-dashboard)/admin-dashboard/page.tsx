"use client";

import { motion } from "framer-motion";
import { 
  Truck, 
  Users, 
  Package, 
  DollarSign, 
  TrendingUp, 
  MapPin,
  AlertCircle,
  CheckCircle,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  BarChart3,
  FileText,
  Plus,
  Eye
} from "lucide-react";
import Link from "next/link";

const stats = [
  {
    title: "Total Vehicles",
    value: "156",
    change: "+12%",
    trend: "up",
    icon: Truck,
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-500/10",
    textColor: "text-blue-600"
  },
  {
    title: "Active Drivers",
    value: "89",
    change: "+5%",
    trend: "up",
    icon: Users,
    color: "from-emerald-500 to-emerald-600",
    bgColor: "bg-emerald-500/10",
    textColor: "text-emerald-600"
  },
  {
    title: "Deliveries Today",
    value: "234",
    change: "+18%",
    trend: "up",
    icon: Package,
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-500/10",
    textColor: "text-purple-600"
  },
  {
    title: "Monthly Revenue",
    value: "₹8.4L",
    change: "-3%",
    trend: "down",
    icon: DollarSign,
    color: "from-amber-500 to-amber-600",
    bgColor: "bg-amber-500/10",
    textColor: "text-amber-600"
  }
];

const recentActivity = [
  {
    id: 1,
    type: "delivery",
    title: "New delivery assigned to TRK-045",
    time: "5 minutes ago",
    icon: Package,
    status: "success"
  },
  {
    id: 2,
    type: "alert",
    title: "Vehicle TRK-023 requires maintenance",
    time: "15 minutes ago",
    icon: AlertCircle,
    status: "warning"
  },
  {
    id: 3,
    type: "driver",
    title: "Driver Rajesh Kumar completed delivery",
    time: "32 minutes ago",
    icon: CheckCircle,
    status: "success"
  },
  {
    id: 4,
    type: "vehicle",
    title: "New vehicle VAN-089 added to fleet",
    time: "1 hour ago",
    icon: Truck,
    status: "info"
  }
];

const topRoutes = [
  { route: "Delhi → Mumbai", trips: 45, revenue: "₹2.1L", status: "high" },
  { route: "Bangalore → Chennai", trips: 38, revenue: "₹1.8L", status: "high" },
  { route: "Pune → Hyderabad", trips: 32, revenue: "₹1.5L", status: "medium" },
  { route: "Kolkata → Bhubaneswar", trips: 28, revenue: "₹1.2L", status: "medium" },
  { route: "Jaipur → Ahmedabad", trips: 22, revenue: "₹0.9L", status: "low" }
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6 pb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Dashboard Overview</h1>
          <p className="text-slate-600 mt-1">Welcome back! Here's what's happening today.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Reports
          </button>
          <button className="px-4 py-2 bg-linear-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all shadow-lg shadow-blue-500/30 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Analytics
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-all group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-xl bg-linear-to-r ${stat.color}`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className={`flex items-center gap-1 text-sm font-medium ${
                stat.trend === 'up' ? 'text-emerald-600' : 'text-red-600'
              }`}>
                {stat.trend === 'up' ? (
                  <ArrowUpRight className="w-4 h-4" />
                ) : (
                  <ArrowDownRight className="w-4 h-4" />
                )}
                {stat.change}
              </div>
            </div>
            <h3 className="text-slate-600 text-sm font-medium mb-1">{stat.title}</h3>
            <p className="text-3xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
              {stat.value}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden"
        >
          <div className="p-6 border-b border-slate-200 bg-linear-to-r from-slate-50 to-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Activity className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-bold text-slate-900">Recent Activity</h2>
              </div>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                View All
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors"
                >
                  <div className={`p-2 rounded-lg ${
                    activity.status === 'success' ? 'bg-emerald-100 text-emerald-600' :
                    activity.status === 'warning' ? 'bg-amber-100 text-amber-600' :
                    'bg-blue-100 text-blue-600'
                  }`}>
                    <activity.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-slate-900 font-medium text-sm">{activity.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span className="text-xs text-slate-500">{activity.time}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Top Routes */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden"
        >
          <div className="p-6 border-b border-slate-200 bg-linear-to-r from-slate-50 to-white">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-bold text-slate-900">Top Routes</h2>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {topRoutes.map((route, index) => (
                <motion.div
                  key={route.route}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors"
                >
                  <div className="flex-1">
                    <p className="text-slate-900 font-medium text-sm">{route.route}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-slate-500">{route.trips} trips</span>
                      <span className="text-xs font-semibold text-blue-600">{route.revenue}</span>
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    route.status === 'high' ? 'bg-emerald-100 text-emerald-700' :
                    route.status === 'medium' ? 'bg-amber-100 text-amber-700' :
                    'bg-slate-100 text-slate-700'
                  }`}>
                    {route.status}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-linear-to-r from-blue-600 to-blue-500 rounded-2xl shadow-lg p-8 text-white"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Quick Actions</h2>
            <p className="text-blue-100">Manage your fleet efficiently with these shortcuts</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-all font-medium shadow-lg flex items-center gap-2">
              <Truck className="w-4 h-4" />
              Add Vehicle
            </button>
            <button className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-all font-medium flex items-center gap-2 border border-white/30">
              <Users className="w-4 h-4" />
              Add Driver
            </button>
            <button className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-all font-medium flex items-center gap-2 border border-white/30">
              <Package className="w-4 h-4" />
              New Delivery
            </button>
            <Link href="/admin-dashboard/blogs" className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-all font-medium flex items-center gap-2 border border-white/30">
              <FileText className="w-4 h-4" />
              Manage Blogs
            </Link>
          </div>
        </div>
      </motion.div>
      
      {/* Blog Management Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Blog Management</h2>
              <p className="text-sm text-slate-600">Manage your website blog posts</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link 
              href="/admin-dashboard/blogs" 
              className="px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-2"
            >
              <Eye className="w-4 h-4" />
              View All
            </Link>
            <Link 
              href="/admin-dashboard/blogs/create" 
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              New Post
            </Link>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-slate-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-blue-600">12</div>
            <div className="text-sm text-slate-600">Published Posts</div>
          </div>
          <div className="bg-slate-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-yellow-600">3</div>
            <div className="text-sm text-slate-600">Draft Posts</div>
          </div>
          <div className="bg-slate-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-purple-600">1.2k</div>
            <div className="text-sm text-slate-600">Total Views</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
