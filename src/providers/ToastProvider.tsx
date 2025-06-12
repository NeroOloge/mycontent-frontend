import { createContext, useContext, useState } from 'react';
import Toast from '../components/Toast';
import { ToastType } from '../utils/enums';

interface IToast {
  id: number;
  message: string;
  type?: ToastType;
  duration?: number;
}

interface ToastOptions {
  type?: ToastType;
  duration?: number;
}

interface ToastContextType {
  addToast: (message: string, options?: ToastOptions) => number;
  removeToast: (id: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: any}) => {
  const [toasts, setToasts] = useState<IToast[]>([]);

  const addToast = (message: string, options = {}) => {
    const id = Date.now();
    setToasts((prev: IToast[]) => ([...prev, { id, message, ...options }]));
    
    return id;
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <div className="fixed top-0 right-0 z-50 p-4 space-y-2">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            duration={toast.duration}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};