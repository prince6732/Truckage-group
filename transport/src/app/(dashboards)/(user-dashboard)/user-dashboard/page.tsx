"use client";

import { motion } from "framer-motion";
import {
  Package,
  MapPin,
  Clock,
  CheckCircle,
  Truck,
  AlertCircle,
  Calendar,
  Navigation,
  TrendingUp,
  Star
} from "lucide-react";

const userStats = [
  {
    title: "Active Deliveries",
    value: "12",
    icon: Package,
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-500/10"
  },
  {
    title: "Completed Today",
    value: "8",
    icon: CheckCircle,
    color: "from-emerald-500 to-emerald-600",
    bgColor: "bg-emerald-500/10"
  },
  {
    title: "Total Distance",
    value: "342 km",
    icon: Navigation,
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-500/10"
  },
  {
    title: "Performance",
    value: "4.8/5",
    icon: Star,
    color: "from-amber-500 to-amber-600",
    bgColor: "bg-amber-500/10"
  }
];

const myDeliveries = [
  {
    id: "DEL-2401",
    from: "Delhi Warehouse",
    to: "Noida Sector 62",
    status: "in-transit",
    progress: 65,
    eta: "45 mins",
    priority: "high"
  },
  {
    id: "DEL-2402",
    from: "Gurugram Hub",
    to: "Faridabad",
    status: "pending",
    progress: 10,
    eta: "2 hrs",
    priority: "medium"
  },
  {
    id: "DEL-2403",
    from: "Delhi Airport",
    to: "Manesar",
    status: "in-transit",
    progress: 35,
    eta: "1.5 hrs",
    priority: "high"
  },
  {
    id: "DEL-2404",
    from: "Rohini Depot",
    to: "Ghaziabad",
    status: "completed",
    progress: 100,
    eta: "Delivered",
    priority: "low"
  }
];

const upcomingSchedule = [
  {
    time: "09:00 AM",
    title: "Pickup from Delhi Hub",
    location: "Okhla Industrial Area",
    type: "pickup"
  },
  {
    time: "11:30 AM",
    title: "Delivery to Client",
    location: "Nehru Place, New Delhi",
    type: "delivery"
  },
  {
    time: "02:00 PM",
    title: "Vehicle Maintenance",
    location: "Service Center, Mayur Vihar",
    type: "maintenance"
  },
  {
    time: "04:30 PM",
    title: "Return to Base",
    location: "Main Warehouse, Dwarka",
    type: "return"
  }
];

export default function UserDashboard() {
  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">My Dashboard</h1>
          <p className="text-slate-600 mt-1">Track your deliveries and schedule</p>
        </div>
        <button className="px-4 py-2 bg-linear-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2 w-fit">
          <MapPin className="w-4 h-4" />
          Start Navigation
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {userStats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-all"
          >
            <div className={`w-12 h-12 rounded-xl bg-linear-to-r ${stat.color} flex items-center justify-center mb-4`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-slate-600 text-sm font-medium mb-1">{stat.title}</h3>
            <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* My Deliveries */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-white rounded-2xl shadow-lg border border-slate-200"
        >
          <div className="p-6 border-b border-slate-200 bg-linear-to-r from-slate-50 to-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Package className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-bold text-slate-900">My Deliveries</h2>
              </div>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                {myDeliveries.filter(d => d.status !== 'completed').length} Active
              </span>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {myDeliveries.map((delivery, index) => (
                <motion.div
                  key={delivery.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-bold text-slate-900">{delivery.id}</span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          delivery.priority === 'high' ? 'bg-red-100 text-red-700' :
                          delivery.priority === 'medium' ? 'bg-amber-100 text-amber-700' :
                          'bg-slate-100 text-slate-700'
                        }`}>
                          {delivery.priority}
                        </span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="w-4 h-4 text-emerald-600" />
                          <span className="text-slate-600">{delivery.from}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Navigation className="w-4 h-4 text-blue-600" />
                          <span className="text-slate-600">{delivery.to}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium ${
                        delivery.status === 'completed' ? 'bg-emerald-100 text-emerald-700' :
                        delivery.status === 'in-transit' ? 'bg-blue-100 text-blue-700' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                        {delivery.status === 'completed' && <CheckCircle className="w-3 h-3" />}
                        {delivery.status === 'in-transit' && <Truck className="w-3 h-3" />}
                        {delivery.status === 'pending' && <Clock className="w-3 h-3" />}
                        {delivery.status}
                      </span>
                      <p className="text-xs text-slate-500 mt-1">{delivery.eta}</p>
                    </div>
                  </div>
                  {/* Progress Bar */}
                  <div className="relative w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${delivery.progress}%` }}
                      transition={{ delay: 0.8 + index * 0.1, duration: 0.8 }}
                      className={`h-full rounded-full ${
                        delivery.status === 'completed' ? 'bg-emerald-500' :
                        delivery.status === 'in-transit' ? 'bg-blue-500' :
                        'bg-slate-400'
                      }`}
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-1">{delivery.progress}% Complete</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Today's Schedule */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-lg border border-slate-200"
        >
          <div className="p-6 border-b border-slate-200 bg-linear-to-r from-slate-50 to-white">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-bold text-slate-900">Today's Schedule</h2>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {upcomingSchedule.map((schedule, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex gap-4 group"
                >
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold ${
                      schedule.type === 'pickup' ? 'bg-blue-100 text-blue-700' :
                      schedule.type === 'delivery' ? 'bg-emerald-100 text-emerald-700' :
                      schedule.type === 'maintenance' ? 'bg-amber-100 text-amber-700' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {schedule.time.split(' ')[0]}
                    </div>
                    {index < upcomingSchedule.length - 1 && (
                      <div className="w-0.5 flex-1 bg-slate-200 my-2" />
                    )}
                  </div>
                  <div className="flex-1 pb-6">
                    <h3 className="font-semibold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">
                      {schedule.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {schedule.location}
                    </p>
                    <p className="text-xs text-slate-400 mt-1">{schedule.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
