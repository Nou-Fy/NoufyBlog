"use client";

import { useState, useEffect } from "react";
import { AlertCircle, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ToastProps {
  id: string;
  type: "success" | "error" | "info" | "warning";
  message: string;
  duration?: number;
}

const toastStore = new Map<string, ToastProps>();
const listeners = new Set<() => void>();

export function useToast() {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  useEffect(() => {
    const updateToasts = () => {
      setToasts(Array.from(toastStore.values()));
    };
    listeners.add(updateToasts);

    return () => {
      listeners.delete(updateToasts);
    };
  }, []);

  const add = (
    message: string,
    type: ToastProps["type"] = "info",
    duration = 5000,
  ) => {
    const id = Math.random().toString();
    const toast: ToastProps = { id, message, type, duration };

    toastStore.set(id, toast);
    listeners.forEach((listener) => listener());

    if (duration > 0) {
      setTimeout(() => remove(id), duration);
    }

    return id;
  };

  const remove = (id: string) => {
    toastStore.delete(id);
    listeners.forEach((listener) => listener());
  };

  return { toasts, add, remove };
}

export function Toast({
  id,
  type,
  message,
  onRemove,
}: ToastProps & { onRemove: () => void }) {
  const iconMap = {
    success: <Check className="w-5 h-5" />,
    error: <AlertCircle className="w-5 h-5" />,
    info: <AlertCircle className="w-5 h-5" />,
    warning: <AlertCircle className="w-5 h-5" />,
  };

  const colorMap = {
    success: "bg-emerald-50 border-emerald-200 text-emerald-900",
    error: "bg-red-50 border-red-200 text-red-900",
    info: "bg-blue-50 border-blue-200 text-blue-900",
    warning: "bg-amber-50 border-amber-200 text-amber-900",
  };

  const iconColorMap = {
    success: "text-emerald-600",
    error: "text-red-600",
    info: "text-blue-600",
    warning: "text-amber-600",
  };

  return (
    <div
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-lg border animate-in slide-in-from-top duration-200",
        colorMap[type],
      )}>
      <span className={iconColorMap[type]}>{iconMap[type]}</span>
      <span className="flex-1 text-sm font-medium">{message}</span>
      <button
        onClick={onRemove}
        className="p-1 hover:bg-black/10 rounded transition-colors">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

export function ToastContainer({
  toasts,
  onRemove,
}: {
  toasts: ToastProps[];
  onRemove: (id: string) => void;
}) {
  return (
    <div className="fixed bottom-4 right-4 z-[9999] space-y-2 max-w-sm pointer-events-none">
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto">
          <Toast {...toast} onRemove={() => onRemove(toast.id)} />
        </div>
      ))}
    </div>
  );
}
