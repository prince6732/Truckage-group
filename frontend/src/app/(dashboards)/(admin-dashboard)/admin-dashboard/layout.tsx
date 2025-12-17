'use client';

import Sidebar from "@/components/(dashboards)/Sidebar";
import Header from "@/components/(dashboards)/Header";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/(shared)/ProtectedRoute";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const [checkingAuth, setCheckingAuth] = useState(true);

  

  useEffect(() => {
    if (!loading) {
      if (!user) router.replace("/login");
      else setCheckingAuth(false);
    }
  }, [user, loading, router]);

  if (loading || checkingAuth) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>

        <style jsx>{`
          .loader {
            border-top-color: #3498db;
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    );
  }

  return (
    <ProtectedRoute allowedRoles={["ADMIN"]}>
    <div className="min-h-screen bg-slate-50 max-w-full mx-auto flex overflow-x-hidden">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className={`flex-1 flex flex-col transition-all duration-300 ${
        isOpen ? "ml-[280px]" : "ml-20"
      }`}>
        <Header isOpen={isOpen} setIsOpen={setIsOpen} />
        
        
          <main className="p-2">
            {children}

          </main>
      </div>
    </div>
    </ProtectedRoute>
  );
}

