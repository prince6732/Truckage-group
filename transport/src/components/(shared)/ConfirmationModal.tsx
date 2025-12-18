"use client";

import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: "danger" | "warning" | "info";
}

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Action",
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  type = "warning"
}: ConfirmationModalProps) {
  const typeColors = {
    danger: "bg-red-500 hover:bg-red-600",
    warning: "bg-yellow-500 hover:bg-yellow-600",
    info: "bg-blue-500 hover:bg-blue-600"
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog as="div" open={isOpen} onClose={onClose} className="relative z-9999">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50"
          />

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <DialogPanel
                as={motion.div}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-md bg-white rounded-lg shadow-xl p-6"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className={`p-3 rounded-full ${type === "danger" ? "bg-red-100" : type === "warning" ? "bg-yellow-100" : "bg-blue-100"}`}>
                    <AlertTriangle className={`w-6 h-6 ${type === "danger" ? "text-red-600" : type === "warning" ? "text-yellow-600" : "text-blue-600"}`} />
                  </div>
                  <DialogTitle className="text-xl font-semibold text-gray-900">
                    {title}
                  </DialogTitle>
                </div>
                
                <p className="text-gray-600 mb-6">{message}</p>

                <div className="flex gap-3 justify-end">
                  <button
                    onClick={onClose}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    {cancelText}
                  </button>
                  <button
                    onClick={() => {
                      onConfirm();
                      onClose();
                    }}
                    className={`px-4 py-2 text-white rounded-lg transition-colors ${typeColors[type]}`}
                  >
                    {confirmText}
                  </button>
                </div>
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
