"use server";

import { prisma } from "@/lib/prisma";
import { z } from "zod";

// Option A (simple) : on accepte region vide => null
const profileSchema = z.object({
  nom: z.string().min(2, "Le nom est trop court"),
  prenom: z.string().min(2, "Le prénom est trop court"),
  email: z.string().email("Email invalide"),
  // IMPORTANT: region doit être une valeur EXACTE de l'enum Prisma
  region: z
    .enum([
      "ANALAMANGA",
      "VAKINANKARATRA",
      "ITASY",
      "BONGOLAVA",
      "DIANA",
      "SAVA",
      "SOFIA",
      "BOENY",
      "BETSIBOKA",
      "MELAKY",
      "ALAOTRA_MANGORO",
      "ATSINANANA",
      "ANALANJIROFO",
      "AMORON_I_MANIA",
      "HAUTE_MATSIATRA",
      "VATOVAVY",
      "FITOVINANY",
      "ATSIMO_ATSINANANA",
      "IHOROMBE",
      "ATSIMO_ANDREFANA",
      "ANDROY",
      "ANOSY",
      "MENABE",
    ])
    .nullable()
    .optional(),
});

export async function updateProfile(userId: string, values: unknown) {
  const data = profileSchema.parse(values);

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      nom: data.nom,
      prenom: data.prenom,
      email: data.email,
      region: data.region ?? null, // si undefined => null
    },
    select: { id: true, nom: true, prenom: true, email: true, region: true },
  });

  return updatedUser;
}
