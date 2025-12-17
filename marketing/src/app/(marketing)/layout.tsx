"use client";

import Footer from "../../components/(frontend)/Footer";
import Navbar from "../../components/(frontend)/Navbar";
import { useGlobalLoader } from "@/store/useGlobalLoader";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { loading } = useGlobalLoader();

  return (
    <div className="min-h-screen flex flex-col relative">
      {loading && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-9999 transition-all duration-300">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-pri/30 blur-xl animate-pulse"></div>
            <div className="animate-spin rounded-full h-16 w-16 border-[5px] border-pri border-t-transparent shadow-lg shadow-pri/30"> </div>
          </div>
        </div>
      )}

      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
