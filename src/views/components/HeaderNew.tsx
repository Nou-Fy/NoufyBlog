"use client";

import { useAuth } from "@/app/context/AuthContext";
import AuthButtons from "@/views/components/auth/AuthButtons";
import { UserDropdown } from "./auth/UserDropdown";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";

export default function HeaderNew() {
  const { isLoggedIn } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Accueil", href: "/" },
    { label: "Articles", href: "/articles" },
    { label: "Guides Élevage", href: "/guides" },
    { label: "Communauté", href: "/communaute" },
    { label: "À propos", href: "/about" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-emerald-900 text-white shadow-lg border-b border-emerald-800">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 flex-shrink-0 group">
            <span className="text-xl sm:text-2xl font-bold tracking-tighter transition-all group-hover:scale-105">
              <span className="text-orange-400">Noufy</span>
              <span className="text-white font-extrabold underline decoration-orange-400">
                Blog
              </span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 flex-1 justify-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:bg-emerald-800 hover:text-orange-400">
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center gap-3 flex-shrink-0">
            {isLoggedIn ? <UserDropdown /> : <AuthButtons />}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white hover:bg-emerald-800 p-2">
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden pb-4 space-y-2 animate-in fade-in duration-200">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-emerald-800 hover:text-orange-400">
                {link.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-emerald-700 mt-2">
              {isLoggedIn ? (
                <div className="px-4 py-2">
                  <UserDropdown />
                </div>
              ) : (
                <div className="px-4 py-2">
                  <AuthButtons />
                </div>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
