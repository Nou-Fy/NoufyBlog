"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  children: ReactNode;
  className?: string;
  bg?:
    | "white"
    | "stone-50"
    | "emerald-50"
    | "orange-50"
    | "amber-50"
    | "transparent";
  py?: "sm" | "md" | "lg" | "xl";
  px?: "sm" | "md" | "lg";
  id?: string;
}

export default function Section({
  children,
  className,
  bg = "white",
  py = "lg",
  px = "md",
  id,
}: SectionProps) {
  const bgClasses = {
    white: "bg-white",
    "stone-50": "bg-stone-50",
    "emerald-50": "bg-emerald-50",
    "orange-50": "bg-orange-50",
    "amber-50": "bg-amber-50",
    transparent: "bg-transparent",
  };

  const pyClasses = {
    sm: "py-8 md:py-12",
    md: "py-12 md:py-16",
    lg: "py-16 md:py-20",
    xl: "py-20 md:py-24",
  };

  const pxClasses = {
    sm: "px-2 sm:px-4",
    md: "px-4 sm:px-6 lg:px-8",
    lg: "px-6 sm:px-8 lg:px-12",
  };

  return (
    <section
      id={id}
      className={cn(
        "w-full",
        bgClasses[bg],
        pyClasses[py],
        pxClasses[px],
        className,
      )}>
      {children}
    </section>
  );
}
