import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';
import { toast, Toast } from '../lib/toast';
import { cn } from '../lib/utils';

export const ToastContainer: React.FC = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    return toast.subscribe(setToasts);
  }, []);

  const bgClass = (type: Toast['type']) => {
    const classes = {
      success: 'bg-green-500 shadow-green-500/50',
      error: 'bg-red-500 shadow-red-500/50',
      warning: 'bg-yellow-500 shadow-yellow-500/50',
      info: 'bg-blue-500 shadow-blue-500/50',
    };
    return classes[type];
  };

  const Icon = (type: Toast['type']) => {
    const icons = {
      success: <CheckCircle size={20} />,
      error: <AlertCircle size={20} />,
      warning: <AlertTriangle size={20} />,
      info: <Info size={20} />,
    };
    return icons[type];
  };

  return (
    <div className="fixed bottom-6 right-6 z-[999] space-y-3 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 20, x: 100 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: -20, x: 100 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={cn(
              'px-6 py-4 rounded-xl text-white font-bold shadow-2xl pointer-events-auto',
              'flex items-center gap-3',
              bgClass(t.type)
            )}
          >
            {Icon(t.type)}
            <span className="flex-1">{t.message}</span>
            {t.action && (
              <button
                onClick={t.action.onClick}
                className="ml-4 underline hover:opacity-75 transition"
              >
                {t.action.label}
              </button>
            )}
            <button
              onClick={() => toast.remove(t.id)}
              className="ml-2 hover:opacity-75 transition"
            >
              <X size={16} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
