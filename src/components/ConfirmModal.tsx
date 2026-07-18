'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSpinner, FaExclamationTriangle } from 'react-icons/fa';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
  isDanger?: boolean;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  isLoading = false,
  isDanger = false,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop blur overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={isLoading ? undefined : onCancel}
            className="absolute inset-0 bg-[#0c180d]/40 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', duration: 0.3 }}
            className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-gray-100 z-10 overflow-hidden"
          >
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-2xl shrink-0 ${isDanger ? 'bg-red-50 text-red-600' : 'bg-primary/10 text-primary'}`}>
                <FaExclamationTriangle className="text-xl" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-gray-900 leading-tight">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{message}</p>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                disabled={isLoading}
                onClick={onCancel}
                className="px-5 py-2.5 bg-gray-50 hover:bg-gray-100 disabled:opacity-50 text-gray-700 font-semibold rounded-full text-sm transition-colors cursor-pointer"
              >
                {cancelText}
              </button>
              <button
                type="button"
                disabled={isLoading}
                onClick={onConfirm}
                className={`px-5 py-2.5 font-semibold rounded-full text-sm transition-all flex items-center gap-2 cursor-pointer shadow-sm ${
                  isDanger 
                    ? 'bg-red-600 hover:bg-red-700 text-white shadow-red-100' 
                    : 'bg-primary hover:bg-secondary text-white shadow-primary/10'
                } disabled:opacity-50`}
              >
                {isLoading && <FaSpinner className="animate-spin text-xs" />}
                {confirmText}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmModal;
