"use client";

import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "xxl" | "x-lg";
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
}: ModalProps) {
  const sizeClasses: Record<string, string> = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
    xxl: "max-w-6xl",
    "x-lg": "w-[95%] max-w-[1500px]", 
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog
          as="div"
          open={isOpen}
          onClose={onClose}
          className="relative z-10000"
        >
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="
              fixed inset-0
              bg-gray-600/75
              backdrop-blur-sm
              transition-all duration-300
            "
          />

          {/* Modal Wrapper */}
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">

              {/* MODAL PANEL */}
              <DialogPanel
                as={motion.div}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                className={`
                  w-full
                  ${sizeClasses[size]}
                  bg-gray-50
                  shadow-2xl
                  rounded-xl
                  border border-gray-300
                  max-h-[85vh]
                  overflow-y-auto
                  p-6
                  ring-1 ring-gray-200
                `}
              >
                {/* HEADER */}
                <div className="flex justify-between items-center mb-6 sticky top-0 bg-gray-50 z-10 pb-4 border-b border-gray-200">
                  {title && (
                    <DialogTitle className="text-xl font-bold text-gray-800">
                      {title}
                    </DialogTitle>
                  )}

                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-lg hover:bg-gray-200"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* INNER CONTENT */}
                <div className="pb-4"> 
                  {children}
                </div>

              </DialogPanel>
            </div>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
