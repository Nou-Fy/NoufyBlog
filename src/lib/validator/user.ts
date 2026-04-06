import { z } from "zod";

export const userSchema = z.object({
  nom: z.string().min(2, "Nom trop court"),
  prenom: z.string().min(2, "Prénom trop court"),
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Mot de passe trop court"),
});

// Dans lib/validator/user.ts
export const loginSchema = userSchema.pick({
  email: true,
  password: true,
});

const profileSchema = z.object({
  nom: z.string().min(2, "Le nom est trop court"),
  prenom: z.string().min(2, "Le prénom est trop court"),
  email: z.string().email("Email invalide"),
  region: z.string().optional(),
});
