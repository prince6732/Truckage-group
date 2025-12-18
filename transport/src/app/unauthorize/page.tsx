"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldAlert, Home } from "lucide-react";

export default function UnauthorizePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mx-auto h-24 w-24 bg-red-100 rounded-full flex items-center justify-center mb-6"
        >
          <ShieldAlert className="h-12 w-12 text-red-600" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-6xl font-bold text-gray-900 mb-4"
        >
          403
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-2xl font-semibold text-gray-800 mb-2"
        >
          Access Denied
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-gray-600 mb-8"
        >
          Sorry, you don't have permission to access this page. Please contact your administrator if you believe this is an error.
        </motion.p>
      
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r text-white rounded-lg hover:opacity-90 transition-all"
          >
            <Home className="w-5 h-5" />
            Back to Login
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
