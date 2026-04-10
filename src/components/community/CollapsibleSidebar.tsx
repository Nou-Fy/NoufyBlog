"use client";

import React, { useState } from "react";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";

interface CollapsibleSidebarProps {
  title: string;
  icon?: React.ReactNode;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

export default function CollapsibleSidebar({
  title,
  icon,
  defaultOpen = false,
  children,
}: CollapsibleSidebarProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="lg:hidden w-full overflow-hidden">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="flex items-center gap-2">
          {icon && <span>{icon}</span>}
          <span>{title}</span>
        </CollapsibleTrigger>
        <CollapsibleContent className="px-0 pt-4">
          {children}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
