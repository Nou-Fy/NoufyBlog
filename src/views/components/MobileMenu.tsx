"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="md:hidden">
      <button
        onClick={toggleMenu}
        className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
        aria-label="Menu mobile">
        {isOpen ? (
          <X className="w-5 h-5 text-foreground" />
        ) : (
          <Menu className="w-5 h-5 text-foreground" />
        )}
      </button>

      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-card border-b border-border shadow-lg">
          <nav className="container mx-auto px-4 py-4">
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-foreground hover:text-accent transition-colors py-2 px-4 rounded-lg hover:bg-accent/10"
                onClick={() => setIsOpen(false)}>
                Accueil
              </Link>
              <Link
                href="/articles"
                className="text-foreground hover:text-accent transition-colors py-2 px-4 rounded-lg hover:bg-accent/10"
                onClick={() => setIsOpen(false)}>
                Articles
              </Link>
              <Link
                href="/guides"
                className="text-foreground hover:text-accent transition-colors py-2 px-4 rounded-lg hover:bg-accent/10"
                onClick={() => setIsOpen(false)}>
                Guides Elevage
              </Link>
              <Link
                href="/communaute"
                className="text-foreground hover:text-accent transition-colors py-2 px-4 rounded-lg hover:bg-accent/10"
                onClick={() => setIsOpen(false)}>
                Communauté
              </Link>
              <Link
                href="/about"
                className="text-foreground hover:text-accent transition-colors py-2 px-4 rounded-lg hover:bg-accent/10"
                onClick={() => setIsOpen(false)}>
                À propos
              </Link>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
