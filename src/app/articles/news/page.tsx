"use client"; // Obligatoire pour utiliser les hooks React

import { useActionState } from "react";
import { createPostAction } from "@/app/api/actions/posts";

export default function NouveauPostPage() {
  /**
   * useActionState prend 2 arguments :
   * 1. L'action (qui attend prevState et formData)
   * 2. L'état initial (ici on initialise l'erreur à vide)
   */
  const [state, formAction, isPending] = useActionState(createPostAction, {
    error: "",
  });

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900">
          Créer un nouvel article
        </h1>
        <p className="text-slate-500">
          Partagez votre expertise avec la communauté.
        </p>
      </div>

      {/* On passe formAction (généré par le hook) à l'attribut action */}
      <form action={formAction} className="space-y-6 flex flex-col">
        {/* Affichage de l'erreur si elle existe */}
        {state?.error && (
          <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-medium">
            {state.error}
          </div>
        )}

        <div className="space-y-1">
          <label className="text-xs font-bold uppercase text-slate-400">
            Titre
          </label>
          <input
            name="title"
            className="w-full p-3 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
            placeholder="Ex: Comment vacciner ses poussins"
            required
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold uppercase text-slate-400">
            Section
          </label>
          <select
            name="section"
            className="w-full p-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-orange-500 appearance-none">
            <option value="ASTUCE">Astuce</option>
            <option value="SANTE">Santé</option>
            <option value="ALIMENTATION">Alimentation</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold uppercase text-slate-400">
            Lien de l'image (URL)
          </label>
          <input
            name="imageUrl"
            type="url"
            className="w-full p-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-orange-500"
            placeholder="https://images.unsplash.com/..."
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold uppercase text-slate-400">
            Contenu
          </label>
          <textarea
            name="content"
            rows={6}
            className="w-full p-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-orange-500"
            placeholder="Écrivez votre article ici..."
            required
          />
        </div>

        <button
          disabled={isPending}
          type="submit"
          className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all ${
            isPending
              ? "bg-slate-400 cursor-not-allowed"
              : "bg-orange-600 hover:bg-orange-700 active:scale-[0.98]"
          }`}>
          {isPending ? (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="animate-spin h-5 w-5 text-white"
                viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Publication en cours...
            </span>
          ) : (
            "Publier l'article"
          )}
        </button>
      </form>
    </div>
  );
}
