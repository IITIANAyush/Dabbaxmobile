import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';
import { useEffect } from 'react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

export default function Toast({
  message,
  type = 'success',
  isVisible,
  onClose,
  duration = 3000
}: ToastProps) {
  useEffect(() => {
    if (isVisible && duration) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  const iconConfig = {
    success: { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
    error: { icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50' },
    info: { icon: Info, color: 'text-blue-600', bg: 'bg-blue-50' }
  };

  const config = iconConfig[type];
  const Icon = config.icon;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.95 }}
          className="fixed top-4 left-4 right-4 z-50 flex justify-center"
        >
          <div className={`${config.bg} rounded-2xl shadow-xl p-4 flex items-center gap-3 max-w-sm w-full`}>
            <Icon className={config.color} size={24} />
            <p className="flex-1 text-neutral-900">{message}</p>
            <button onClick={onClose} className="text-neutral-500 hover:text-neutral-700">
              <X size={20} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
