"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { 
  LayoutDashboard, 
  Truck, 
  Users, 
  FileText, 
  Package, 
  MapPin, 
  BarChart3, 
  Settings, 
  Bell,
  LogOut,
  ChevronLeft,
  Menu,
  UserCircle,
  Briefcase,
  Navigation,
  Newspaper,
  MessageSquare
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/context/AuthContext";

const navLinks = [
  { 
    href: "/admin-dashboard", 
    label: "Dashboard", 
    icon: LayoutDashboard,
    roles: ["ADMIN", "PODMANAGER"]
  },
  { 
    href: "/admin-dashboard/vehicles-management", 
    label: "Vehicle Management", 
    icon: Truck,
    roles: ["ADMIN", "PODMANAGER"]
  },
  { 
    href: "/admin-dashboard/drivers-management", 
    label: "Driver Management", 
    icon: Users,
    roles: ["ADMIN", "PODMANAGER"]
  },
  { 
    href: "/admin-dashboard/job-management", 
    label: "Job Management",
    icon: Briefcase,
    roles: ["ADMIN", "PODMANAGER"]
  },
  { 
    href: "/admin-dashboard/user-management", 
    label: "Users Management", 
    icon: UserCircle,
    roles: ["ADMIN"]
  },
  { 
    href: "/admin-dashboard/pod-management", 
    label: "POD Management", 
    icon: Package,
    roles: ["ADMIN", "PODMANAGER"]
  },
  { 
    href: "/admin-dashboard/lr-create", 
    label: "L.R Management", 
    icon: FileText,
    roles: ["ADMIN", "ACCOUNTMANAGER"]
  },
  { 
    href: "/admin-dashboard/routes", 
    label: "Route Planning", 
    icon: Navigation,
    roles: ["ADMIN", "PODMANAGER"]
  },
  { 
    href: "/admin-dashboard/tracking", 
    label: "Live Tracking", 
    icon: MapPin,
    roles: ["ADMIN", "PODMANAGER"]
  },
  { 
    href: "/admin-dashboard/reports", 
    label: "Reports & Analytics", 
    icon: BarChart3,
    roles: ["ADMIN", "ACCOUNTMANAGER"]
  },
  { 
    href: "/admin-dashboard/website-content", 
    label: "Website Content", 
    icon: Settings,
    roles: ["ADMIN"]
  },
  { 
    href: "/admin-dashboard/blog-management", 
    label: "Blog Management", 
    icon: Newspaper,
    roles: ["ADMIN"]
  },
  { 
    href: "/admin-dashboard/contact-us", 
    label: "Messages", 
    icon: MessageSquare,
    roles: ["ADMIN"]
  },
];



interface SideMenuProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Sidebar({ isOpen, setIsOpen }: SideMenuProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const modalRef = useRef<HTMLDivElement>(null);
  const [showUserModal, setShowUserModal] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsOpen(window.innerWidth >= 1024);
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setShowUserModal(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsOpen]);


  const handleLogout = () => {
    logout();
    router.push("/login");
  };


  const userRole = user?.role || "";
  const filteredLinks = navLinks.filter(link =>
    link.roles.includes(userRole)
  );

  return (
    <>
      <aside
        className={`fixed left-0 top-0 z-50 flex flex-col h-screen transition-all duration-300 ease-in-out
          bg-white border-r border-slate-200 shadow-xl
          ${isOpen ? "w-[280px]" : "w-20"}
        `}
      >
        <div className={`flex items-center justify-between p-4 border-b border-slate-200 ${!isOpen && "justify-center"}`}>
          {isOpen && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg flex items-center justify-center shadow-lg">
                <Truck className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-slate-900 font-bold text-lg leading-tight">TransportHub</h1>
                <p className="text-slate-500 text-xs">Management System</p>
              </div>
            </div>
          )}
          {!isOpen && (
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg flex items-center justify-center shadow-lg">
              <Truck className="w-6 h-6 text-white" />
            </div>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`p-2 hover:bg-slate-100 rounded-lg transition-colors ${!isOpen && "hidden"}`}
          >
            <ChevronLeft className={`w-5 h-5 text-slate-600 transition-transform duration-300 ${!isOpen && "rotate-180"}`} />
          </button>
        </div>

        {!isOpen && (
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="absolute -right-3 top-20 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-1.5 shadow-lg transition-all"
          >
            <Menu className="w-4 h-4" />
          </button>
        )}

        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
          {filteredLinks.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href || (href !== '/admin-dashboard' && pathname.startsWith(href + '/'));
            return (
              <Link key={href} href={href}>
                <div
                  className={`group relative flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200
                    ${isActive
                      ? "bg-linear-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/20"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }
                    ${!isOpen && "justify-center"}
                  `}
                >
                  <Icon className={`shrink-0 ${isActive ? "w-5 h-5" : "w-5 h-5"}`} />
                  
                  {isOpen && (
                    <span className="text-sm font-medium truncate">
                      {label}
                    </span>
                  )}

                  {isActive && isOpen && (
                    <div className="absolute right-3 w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                  )}

                  {!isOpen && (
                    <div className="absolute left-full ml-2 px-3 py-2 bg-slate-900 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap shadow-xl border border-slate-700 z-50">
                      {label}
                      <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-2 h-2 bg-slate-900 rotate-45 border-l border-b border-slate-700" />
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="relative p-3 border-t border-slate-200">
          <div
            onClick={() => setShowUserModal((prev) => !prev)}
            className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200
              bg-slate-50 hover:bg-slate-100
              border border-slate-200 ${!isOpen && "justify-center"}
            `}
          >
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                {user?.name?.charAt(0).toUpperCase() || "U"}
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
            </div>
            
            {isOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-slate-900 font-medium text-sm truncate">{user?.name || "User"}</p>
                <p className="text-slate-500 text-xs truncate">{user?.role || "Member"}</p>
              </div>
            )}
          </div>

          {showUserModal && (
            <div
              ref={modalRef}
              className={`absolute ${isOpen ? "bottom-20 left-3 right-3" : "bottom-20 left-3 w-64"} 
                bg-white border border-slate-200 shadow-2xl rounded-xl overflow-hidden z-50`}
            >
              <div className="p-4 bg-gradient-to-r from-blue-50 to-slate-50 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                      {user?.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                    <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-900 text-sm truncate">{user?.name || "User"}</p>
                    <p className="text-xs text-slate-600 truncate">{user?.email || "user@example.com"}</p>
                    <span className="inline-block mt-1 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full border border-blue-200">
                      {user?.role || "Member"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-2">
                <button
                  onClick={() => {
                    setShowUserModal(false);
                    router.push("/admin-dashboard/settings");
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all text-sm"
                >
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </button>

                <button
                  onClick={() => {
                    setShowUserModal(false);
                    router.push("/admin-dashboard/notifications");
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all text-sm"
                >
                  <Bell className="w-4 h-4" />
                  <span>Notifications</span>
                </button>

                <div className="my-2 border-t border-slate-200" />

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all text-sm"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
