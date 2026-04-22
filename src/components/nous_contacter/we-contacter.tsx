"use client";

import React from "react";
import { Mail, Send, MessageSquare, Tag, X } from "lucide-react";
import { useContactForm } from "@/hooks/nous-contacter/useContactForm";

const ContactForm: React.FC = () => {
  const { formData, status, handleChange, submitForm, resetForm } =
    useContactForm();

  return (
    // Suppression du mx-auto restrictif ici pour laisser le composant parent (Container) gérer les marges
    <div className="w-full">
      <div className="bg-white rounded-2xl shadow-xl border border-stone-100 overflow-hidden w-full">
        {/* On retire le "max-w-4xl" ici pour que la grille s'étende à 100% */}
        <div className="grid md:grid-cols-5 w-full">
          {/* Colonne d'info - Prend 2/5 de l'espace */}
          <div className="md:col-span-2 bg-emerald-600 p-10 text-white flex flex-col justify-between min-h-[300px]">
            <div>
              <h2 className="text-3xl font-black mb-6 uppercase tracking-tight leading-tight">
                Contactez-nous
              </h2>
              <p className="text-emerald-60/80 text-base leading-relaxed max-w-sm">
                Une question sur l'aviculture ? Notre équipe vous répondra dans
                les plus brefs délais.
              </p>
            </div>
            <div className="pt-8 border-t border-emerald-500/30">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-200">
                Localisation
              </span>
              <p className="font-bold text-lg">Antananarivo, MG</p>
            </div>
          </div>

          <div className="md:col-span-3 p-6 lg:p-10 bg-white">
            {" "}
            {/* Réduction du padding du conteneur */}
            <form onSubmit={submitForm} className="space-y-4 w-full">
              {" "}
              {/* Espacement réduit entre les blocs (space-y-4 au lieu de 6) */}
              {/* --- Email --- */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-[0.15em] text-orange-600 ml-1">
                  Votre Email
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"
                    size={18}
                  />
                  <input
                    required
                    name="email"
                    type="email"
                    placeholder="exemple@gmail.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3.5 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all text-sm" // py-3.5 et text-sm pour gagner de la place
                  />
                </div>
              </div>
              {/* --- Sujet --- */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-[0.15em] text-orange-600 ml-1">
                  Sujet
                </label>
                <div className="relative">
                  <Tag
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"
                    size={18}
                  />
                  <input
                    required
                    name="subject"
                    type="text"
                    placeholder="Sujet du message"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3.5 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all text-sm"
                  />
                </div>
              </div>
              {/* --- Message --- */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-[0.15em] text-orange-600 ml-1">
                  Message
                </label>
                <div className="relative">
                  <MessageSquare
                    className="absolute left-4 top-4 text-stone-400"
                    size={18}
                  />
                  <textarea
                    required
                    name="message"
                    placeholder="Comment pouvons-nous vous aider ?"
                    rows={4} // Réduit de 7 à 4 lignes (gain de hauteur massif)
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3.5 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all text-sm resize-none"
                  />
                </div>
              </div>
              {/* --- Boutons d'action --- */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                {" "}
                {/* pt-2 au lieu de 4 */}
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex items-center justify-center gap-2 py-3.5 rounded-xl font-black text-[10px] uppercase tracking-widest border-2 border-stone-100 text-stone-500 hover:bg-stone-50 hover:border-stone-200 transition-all active:scale-[0.98]">
                  <X size={16} />
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className={`flex items-center justify-center gap-2 py-3.5 rounded-xl font-black text-[10px] uppercase tracking-widest text-white transition-all active:scale-[0.98] ${
                    status === "sending"
                      ? "bg-stone-300"
                      : "bg-orange-600 hover:bg-orange-700 shadow-md shadow-orange-600/20"
                  }`}>
                  {status === "sending" ? "Envoi..." : "Envoyer"}
                  <Send size={16} />
                </button>
              </div>
              {/* Status Message */}
              {status === "success" && (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 pt-1">
                  <p className="text-emerald-700 text-[11px] font-bold text-center bg-emerald-50 border border-emerald-100 py-3 rounded-xl">
                    ✓ Misaotra ! Message envoyé avec succès.
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
