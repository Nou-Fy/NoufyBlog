"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import AuthModal from "./auth/AuthModal";

// On définit l'interface pour TypeScript pour éviter l'erreur "IntrinsicAttributes"
interface FooterProps {
  isLoggedInServer: boolean;
}

export default function FooterView({ isLoggedInServer }: FooterProps) {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <footer>
      {/* SECTION APPEL À L'ACTION */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-emerald-700 text-white">
        <div className="container mx-auto text-center max-w-2xl">
          <h2 className="text-4xl font-bold tracking-tight mb-6">
            Prêt à faire décoller votre élevage ?
          </h2>
          <p className="text-xl text-emerald-100 mb-10">
            Rejoignez notre communauté en ligne. Créez un compte gratuitement
            pour commenter les articles, poser vos questions aux experts et
            recevoir nos derniers conseils directement.
          </p>

          <Button
            // On ouvre la modale seulement si l'utilisateur n'est pas connecté
            onClick={() => {
              if (!isLoggedInServer) setIsAuthModalOpen(true);
            }}
            // Le bouton est désactivé si la session existe
            disabled={isLoggedInServer}
            size="lg"
            className={`text-lg px-12 py-6 rounded-full font-bold transition-all 
              ${
                isLoggedInServer
                  ? "bg-emerald-800 text-emerald-300 cursor-not-allowed opacity-50"
                  : "bg-white text-emerald-700 hover:bg-orange-700 hover:text-white"
              }`}>
            {isLoggedInServer
              ? "Vous êtes déjà membre"
              : "S'inscrire gratuitement"}
          </Button>
        </div>
      </section>

      {/* SECTION CRÉDITS & COPYRIGHT */}
      <section className="py-12 px-4 bg-slate-900 text-slate-300 border-t border-slate-800">
        <div className="container mx-auto text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 text-left max-w-4xl mx-auto">
            <div>
              <h3 className="text-white font-bold mb-4">À propos</h3>
              <p className="text-sm">
                Plateforme dédiée à l'accompagnement des éleveurs malagasy pour
                une production moderne et efficace des poules d'ornements.
              </p>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Contact</h3>
              <p className="text-sm">Email: rakotonantsoina@gmail.com</p>
              <p className="text-sm">Antananarivo, Madagascar</p>
              <p className="text-sm">+261 34 84 924 25</p>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Liens utiles</h3>
              <ul className="text-sm space-y-2">
                <li>
                  <a
                    href="/articles"
                    className="hover:text-emerald-400 transition-colors">
                    Articles
                  </a>
                </li>
                <li>
                  <a
                    href="/guides"
                    className="hover:text-emerald-400 transition-colors">
                    Nos Guides d'élevages
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800">
            <p>
              &copy; {new Date().getFullYear()} RAKOTOARIVELO
              Nantsoinaharimanana Nomena. Tous droits réservés.
            </p>
            <p className="text-sm mt-2 text-slate-500">
              Développé avec passion pour les mpiompy malagasy.
            </p>
          </div>
        </div>
      </section>

      {/* Rendu de la modale d'authentification */}
      {isAuthModalOpen && (
        <AuthModal type="sign-up" onClose={() => setIsAuthModalOpen(false)} />
      )}
    </footer>
  );
}
