"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/views/components/ui/button";

interface StatsCarouselProps {
  children: React.ReactNode[];
}

export default function StatsCarousel({ children }: StatsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? children.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === children.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="overflow-hidden w-full">
      {/* Desktop: Grid */}
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6">
        {children}
      </div>

      {/* Mobile: Carousel */}
      <div className="md:hidden">
        <div className="flex items-center gap-4 mb-4">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrev}
            className="p-2 h-10 w-10">
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="flex-1 overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-out"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}>
              {children.map((child, idx) => (
                <div key={idx} className="min-w-full flex-shrink-0">
                  {child}
                </div>
              ))}
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleNext}
            className="p-2 h-10 w-10">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Indicateurs */}
        <div className="flex gap-2 justify-center">
          {children.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all ${
                idx === currentIndex
                  ? "w-6 bg-emerald-600"
                  : "w-2 bg-slate-300 hover:bg-slate-400"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
