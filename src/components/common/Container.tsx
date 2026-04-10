"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  padding?: boolean;
}

export default function Container({
  children,
  className,
  size = "full",
  padding = true,
}: ContainerProps) {
  const sizeClasses = {
    xs: "max-w-xs",
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-4xl",
    xl: "max-w-5xl",
    "2xl": "max-w-7xl",
    full: "max-w-full",
  };

  return (
    <div
      className={cn(
        "mx-auto",
        sizeClasses[size],
        padding && "px-4 sm:px-6 lg:px-8",
        className,
      )}>
      {children}
    </div>
  );
}
