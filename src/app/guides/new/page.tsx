"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  Home,
  ShieldCheck,
  ShoppingBasket,
  Bird,
  Egg,
  Leaf,
  Wheat,
  X,
} from "lucide-react";
import { GuideFormValues, guideSchema } from "@/lib/validator/guide";

const ICONS = [
  { name: "Home", icon: Home },
  { name: "ShieldCheck", icon: ShieldCheck },
  { name: "ShoppingBasket", icon: ShoppingBasket },
  { name: "Bird", icon: Bird },
  { name: "EggIcon", icon: Egg },
  { name: "Leaf", icon: Leaf },
  { name: "WheatIcon", icon: Wheat },
];

const slugify = (str: string) =>
  str
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

// Ajout de la prop onClose pour la gestion en modale
export default function NewGuidePage({ onClose }: { onClose?: () => void }) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<GuideFormValues>({
    resolver: zodResolver(guideSchema),
    defaultValues: {
      title: "",
      description: "",
      content: "",
      badge: "",
      color: "bg-amber-50",
      iconName: "",
      slug: "",
    },
  });

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setValue("title", title);
    setValue("slug", slugify(title), { shouldValidate: true });
  };

  const onSubmit = async (data: GuideFormValues) => {
    try {
      const response = await fetch("/api/guides", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        router.refresh();
        if (onClose)
          onClose(); // Ferme la modale si succès
        else router.push("/guide");
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Une erreur est survenue");
      }
    } catch (error) {
      console.error("Erreur lors de la création", error);
    }
  };

  return (
    <div className="w-full p-6 bg-white rounded-xl relative">
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-slate-100 rounded-full transition-colors">
          <X className="w-6 h-6 text-slate-500" />
        </button>
      )}

      <h1 className="text-2xl font-bold mb-6 text-slate-900">
        Ajouter un nouveau Guide
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Titre</label>
            <input
              {...register("title")}
              onChange={handleTitleChange}
              className="w-full p-2 border rounded-md outline-none focus:ring-2 focus:ring-emerald-500"
            />
            {errors.title && (
              <p className="text-red-500 text-xs mt-1">
                {errors.title.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Slug (URL)</label>
            <input
              {...register("slug")}
              className="w-full p-2 border rounded-md bg-slate-50 text-slate-500"
              readOnly
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            {...register("description")}
            className="w-full p-2 border rounded-md outline-none focus:ring-2 focus:ring-emerald-500"
            rows={2}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Contenu</label>
          <textarea
            {...register("content")}
            className="w-full p-2 border rounded-md outline-none focus:ring-2 focus:ring-emerald-500"
            rows={4}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Badge</label>
            <input
              {...register("badge")}
              className="w-full p-2 border rounded-md"
              placeholder="ex: Santé"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Icône</label>
            <select
              {...register("iconName")}
              className="w-full p-2 border rounded-md bg-white">
              <option value="">Choisir...</option>
              {ICONS.map((ico) => (
                <option key={ico.name} value={ico.name}>
                  {ico.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-emerald-600 text-white py-3 rounded-lg font-bold hover:bg-emerald-700 disabled:opacity-50 transition-all">
          {isSubmitting ? "Enregistrement..." : "Publier le Guide"}
        </button>
      </form>
    </div>
  );
}
