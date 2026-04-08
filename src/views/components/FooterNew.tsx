"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import AuthModal from "./auth/AuthModal";
import Link from "next/link";
import { Mail, MapPin, Phone, Facebook, Twitter, Linkedin } from "lucide-react";

interface FooterProps {
  isLoggedInServer: boolean;
}

export default function FooterNew({ isLoggedInServer }: FooterProps) {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <footer className="w-full bg-card text-card-foreground border-t border-border">
      {/* CTA SECTION */}
      <section className="bg-emerald-700 text-white shadow-2xl dark:bg-emerald-900">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-full py-12 md:py-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Prêt à progresser dans votre élevage ?
            </h2>
            <p className="text-emerald-100 text-lg max-w-2xl mx-auto">
              Rejoignez notre communauté de mpiompy pour accéder à des conseils
              exclusifs et partager votre expérience.
            </p>
            <Button
              onClick={() => {
                if (!isLoggedInServer) setIsAuthModalOpen(true);
              }}
              disabled={isLoggedInServer}
              className={`transition-all duration-200 ${
                isLoggedInServer
                  ? "bg-emerald-800/50 text-emerald-200 cursor-not-allowed"
                  : "bg-card text-emerald-700 hover:bg-orange-400 hover:text-white shadow-lg hover:shadow-xl"
              }`}>
              {isLoggedInServer
                ? "Vous êtes déjà membre ✓"
                : "S'inscrire gratuitement"}
            </Button>
          </div>
        </div>
      </section>

      {/* FOOTER CONTENT */}
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-full py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12">
          {/* BRAND */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">
              <span className="text-orange-400">Noufy</span>
              <span className="text-emerald-400">Blog</span>
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              La plateforme de référence pour les éleveurs malgaches. Conseils
              pratiques, tutoriels et communauté engagée.
            </p>
            <div className="flex gap-3 pt-2">
              <a
                href="#"
                className="p-2 rounded-lg bg-card/70 hover:bg-emerald-600 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-card/70 hover:bg-emerald-600 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-card/70 hover:bg-emerald-600 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold">Navigation</h4>
            <ul className="space-y-2 text-sm">
              {[
                { label: "Articles", href: "/articles" },
                { label: "Guides Élevage", href: "/guides" },
                { label: "Communauté", href: "/communaute" },
                { label: "À propos", href: "/about" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-emerald-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* RESOURCES */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold">Ressources</h4>
            <ul className="space-y-2 text-sm">
              {[
                "Conditions d'utilisation",
                "Politique de confidentialité",
                "Contactez-nous",
                "FAQ",
              ].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-emerald-400 transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-3">
                <Mail className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">
                  rakotonantsoina@gmail.com
                </span>
              </li>
              <li className="flex gap-3">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">+261 34 84 924 25</span>
              </li>
              <li className="flex gap-3">
                <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">
                  Antananarivo, Madagascar
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="border-t border-border/60" />

        {/* COPYRIGHT */}
        <div className="pt-8 text-center space-y-2 text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} RAKOTOARIVELO Nantsoinaharimanana
            Nomena. Tous droits réservés.
          </p>
          <p>Développé avec passion pour les mpiompy malagasy 🐔</p>
        </div>
      </div>

      {/* Auth Modal */}
      {isAuthModalOpen && (
        <AuthModal type="sign-in" onClose={() => setIsAuthModalOpen(false)} />
      )}
    </footer>
  );
}
