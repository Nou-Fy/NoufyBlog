"use client";

import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  label?: string;
}

export default function LoadingSpinner({
  size = "md",
  className,
  label,
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    md: "w-8 h-8 border-3",
    lg: "w-12 h-12 border-4",
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-2",
        className,
      )}>
      <div
        className={cn(
          "border-slate-200 border-t-emerald-600 rounded-full animate-spin",
          sizeClasses[size],
        )}
      />
      {label && <p className="text-sm text-slate-600 font-medium">{label}</p>}
    </div>
  );
}

export function LoadingOverlay({
  label = "Chargement...",
}: {
  label?: string;
}) {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-8 shadow-xl">
        <LoadingSpinner size="lg" label={label} />
      </div>
    </div>
  );
}
