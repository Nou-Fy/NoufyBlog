"use client";

import { useState } from "react";
import { createPostAction } from "@/app/api/actions/posts";
import { PostSection } from "@prisma/client";

export default function ArticlesPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // CORRECTION 1 : On stocke la référence du formulaire immédiatement
    // pour éviter l'erreur "TypeError: Cannot read properties of null (reading 'reset')"
    const form = e.currentTarget;
    setLoading(true);

    const formData = new FormData(form);

    const postData = {
      title: formData.get("title") as string,
      content: formData.get("content") as string,
      imageUrl: formData.get("imageUrl") as string,
      section: formData.get("section") as PostSection,
      // CORRECTION 2 : On ne passe plus l'authorId ici car
      // ton Action Serveur le récupère maintenant via les cookies
    };

    const result = await createPostAction(postData);

    if (result.success) {
      alert("Post créé avec succès !");
      // On utilise la référence "form" capturée au début
      form.reset();
    } else {
      alert("Erreur : " + result.error);
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 max-w-xl mx-auto p-2">
      <h2 className="text-xl font-bold mb-2">Créer un nouvel article</h2>

      {/* Champ Titre */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Titre</label>
        <input
          name="title"
          type="text"
          placeholder="L'intelligence artificielle en 2026"
          className="border p-2 rounded w-full focus:ring-2 focus:ring-emerald-500 outline-none"
          required
        />
      </div>

      {/* Champ URL de l'image */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Lien de l'image</label>
        <input
          name="imageUrl"
          type="url"
          placeholder="https://votre-image.png"
          className="border p-2 rounded w-full focus:ring-2 focus:ring-emerald-500 outline-none"
          required
        />
      </div>

      {/* Champ Contenu */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Contenu</label>
        <textarea
          name="content"
          placeholder="Rédigez votre article ici..."
          rows={5}
          className="border p-2 rounded w-full focus:ring-2 focus:ring-emerald-500 outline-none"
          required
        />
      </div>

      {/* Sélection de la Section */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">
          Section de l'article
        </label>
        <select
          name="section"
          className="border p-2 rounded w-full bg-white cursor-pointer focus:ring-2 focus:ring-emerald-500 outline-none">
          {Object.values(PostSection).map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* Bouton de soumission */}
      <button
        type="submit"
        disabled={loading}
        className={`mt-4 py-2 px-4 rounded text-white font-bold transition-all ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-emerald-600 hover:bg-emerald-700 active:scale-95"
        }`}>
        {loading ? "Publication..." : "Publier l'article"}
      </button>
    </form>
  );
}
