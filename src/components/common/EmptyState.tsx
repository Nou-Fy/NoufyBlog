"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export default function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center py-20 px-4 ${className || ""}`}>
      {Icon && (
        <div className="mb-6 p-4 rounded-full bg-card/10">
          <Icon className="w-12 h-12 text-muted-foreground" />
        </div>
      )}

      <h3 className="text-2xl font-bold text-foreground mb-2 text-center">
        {title}
      </h3>

      {description && (
        <p className="text-muted-foreground text-center mb-6 max-w-md">
          {description}
        </p>
      )}

      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
