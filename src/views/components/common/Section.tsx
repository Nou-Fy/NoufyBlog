"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionBg =
  | "white"
  | "stone-50"
  | "emerald-50"
  | "orange-50"
  | "amber-50"
  | "background"
  | "surface"
  | "surface-soft"
  | "transparent";

interface SectionProps {
  children: ReactNode;
  className?: string;
  bg?: SectionBg;
  py?: "sm" | "md" | "lg" | "xl";
  px?: "sm" | "md" | "lg";
  id?: string;
}

const bgClasses: Record<SectionBg, string> = {
  white: "bg-card dark:bg-card",
  "stone-50": "bg-background dark:bg-card/90",
  "emerald-50": "bg-emerald-50 dark:bg-card/90",
  "orange-50": "bg-orange-50 dark:bg-card/90",
  "amber-50": "bg-amber-50 dark:bg-card/90",
  background: "bg-background",
  surface: "bg-card",
  "surface-soft": "bg-muted/20 dark:bg-muted/40",
  transparent: "bg-transparent",
};

const pyClasses = {
  sm: "py-4 md:py-6",
  md: "py-6 md:py-8",
  lg: "py-8 md:py-10",
  xl: "py-10 md:py-12",
};

const pxClasses = {
  sm: "px-2 sm:px-4",
  md: "px-4 sm:px-6 lg:px-8",
  lg: "px-6 sm:px-8 lg:px-12",
};

export default function Section({
  children,
  className,
  bg = "white",
  py = "md",
  px = "md",
  id,
}: SectionProps) {
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
