"use client";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
};

export default function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Delete Character?",
  message = "This will permanently delete the character and all draft data. This action cannot be undone.",
}: Props) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-60"
        >
          <div className="card bg-base-100 w-96 p-8">
            <h3 className="text-xl font-header text-error mb-4">{title}</h3>
            <p className="text-base-content/70 mb-8">{message}</p>
            <div className="flex gap-3">
              <button onClick={onClose} className="btn btn-ghost flex-1">
                Cancel
              </button>
              <button onClick={onConfirm} className="btn btn-error flex-1">
                Yes, Delete
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
