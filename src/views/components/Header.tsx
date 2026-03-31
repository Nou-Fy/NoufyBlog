"use client";

import { useAuth } from "@/app/context/AuthContext";
import AuthButtons from "@/views/components/auth/AuthButtons";
import { UserDropdown } from "./auth/UserDropdown";
import Link from "next/link";

export default function Header() {
  const { isLoggedIn } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border--600 bg-emerald-900 text-white shadow-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold tracking-tighter">
            <span className="text-orange-400">Noufy</span>
            <span className="text-white font-extrabold underline decoration-orange-400">
              Blog
            </span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/" className="hover:text-orange-400 transition-colors">
            Accueil
          </Link>
          <Link
            href="/articles"
            className="hover:text-orange-400 transition-colors">
            Articles
          </Link>
          <Link
            href="/guides"
            className="hover:text-orange-400 transition-colors">
            Guides Elevage
          </Link>

          <Link
            href="/communaute"
            className="hover:text-orange-400 transition-colors">
            Communauté
          </Link>

          <Link
            href="/about"
            className="hover:text-orange-400 transition-colors">
            À propos
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          {isLoggedIn ? <UserDropdown /> : <AuthButtons />}
        </div>
      </div>
    </header>
  );
}
