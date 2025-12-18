"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XCircle } from "lucide-react";

interface ErrorMessageProps {
  message: string;
  duration?: number;
  onClose?: () => void;
}

export default function ErrorMessage({ message, duration = 3000, onClose }: ErrorMessageProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onClose) {
        setTimeout(onClose, 300);
      }
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: -50, x: "-50%" }}
          className="fixed top-4 left-1/2 z-19999 flex items-center gap-2 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg"
        >
          <XCircle className="w-5 h-5" />
          <span>{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
