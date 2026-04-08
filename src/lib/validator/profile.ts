import * as z from "zod";

export const REGIONS = [
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
] as const;

export const profileSchema = z.object({
  nom: z.string().min(2, "Le nom est trop court"),
  prenom: z.string().min(2, "Le prénom est trop court"),
  email: z.string().email("Email invalide"),
  region: z.enum(REGIONS, { message: "Veuillez choisir une région" }),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
