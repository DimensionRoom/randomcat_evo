'use client';
import { createContext, useContext, useState, ReactNode } from 'react';
import ToastMessage from '@/components/Taost/ToastMessage';
type ToastType = 'info' | 'success' | 'error' | 'warning';

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContextProps {
  toasts: Toast[];
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [nextId, setNextId] = useState(1);

  const showToast = (message: string, type: ToastType = 'info') => {
    const id = nextId;
    setNextId(nextId + 1);
    const newToast = { id, message, type };
    setToasts((prevToasts) => [...prevToasts, newToast]);
    setTimeout(() => removeToast(id), 13000);
  };

  const removeToast = (id: number) => {
    setToasts((prevToasts) => prevToasts.filter(toast => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toasts, showToast }}>
      {children}
      {toasts.map((toast) => (
        <ToastMessage key={toast.id} message={toast.message} type={toast.type} />
      ))}
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextProps => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};