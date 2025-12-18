"use client";

import { useAuth } from "@/context/AuthContext";
import { Bell, Search, Settings, Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface HeaderProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Header({ isOpen, setIsOpen }: HeaderProps) {
  const { user } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, message: "New delivery assigned", time: "5 min ago", unread: true },
    { id: 2, message: "Vehicle maintenance due", time: "1 hour ago", unread: true },
    { id: 3, message: "Driver completed route", time: "2 hours ago", unread: false }
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4 flex-1">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <Menu className="w-5 h-5 text-slate-600" />
          </button>

          <div className="hidden md:flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 max-w-md w-full hover:border-blue-300 transition-colors">
            <Search className="w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search vehicles, drivers, routes..."
              className="bg-transparent border-none outline-none text-sm text-slate-700 placeholder:text-slate-400 w-full"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <Bell className="w-5 h-5 text-slate-600" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden">
                <div className="p-4 border-b border-slate-200 bg-slate-50">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-slate-900">Notifications</h3>
                    {unreadCount > 0 && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer ${notification.unread ? "bg-blue-50/30" : ""
                        }`}
                    >
                      <div className="flex items-start gap-3">
                        {notification.unread && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-slate-900 font-medium">
                            {notification.message}
                          </p>
                          <p className="text-xs text-slate-500 mt-1">
                            {notification.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t border-slate-200 bg-slate-50">
                  <button className="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <Link href="/admin-dashboard/settings">
              <Settings className="w-5 h-5 text-slate-600" />
            </Link>
          </button>


          <div className="hidden md:flex items-center gap-3 pl-4 border-l border-slate-200">
            <div className="text-right">
              <p className="text-sm font-medium text-slate-900">{user?.name || "User"}</p>
              <p className="text-xs text-slate-500">{user?.role || "Member"}</p>
            </div>
            <div className="w-10 h-10 bg-linear-to-r from-blue-600 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </div>
          </div>
        </div>
      </div>

      <div className="md:hidden px-6 pb-4">
        <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 hover:border-blue-300 transition-colors">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent border-none outline-none text-sm text-slate-700 placeholder:text-slate-400 w-full"
          />
        </div>
      </div>
    </header>
  );
}
