import * as z from "zod";

export const guideSchema = z.object({
  title: z.string().min(3, "Le titre doit faire au moins 3 caractères"),
  description: z.string().max(255, "La description est trop longue (max 255)"),
  content: z.string().min(10, "Le contenu est trop court"),
  badge: z.string().min(1, "Le badge est requis"),
  color: z.string(), // On retire le .default() ici pour éviter le conflit de type
  iconName: z.string().min(1, "L'icône est requise"),
  slug: z
    .string()
    .min(3, "Le slug est requis")
    .regex(/^[a-z0-9-]+$/, "Format de slug invalide"),
});

// On définit l'interface manuellement pour garantir la compatibilité
export interface GuideFormValues {
  title: string;
  description: string;
  content: string;
  badge: string;
  color: string;
  iconName: string;
  slug: string;
}
