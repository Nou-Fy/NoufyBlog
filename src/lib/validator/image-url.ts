import { z } from "zod";

/** Fichiers uploadés renvoient souvent des chemins `/uploads/...` ; les liens externes en http(s). */
function isValidStoredImageRef(s: string): boolean {
  if (s === "") return true;
  if (s.startsWith("/") && !s.startsWith("//")) return true;
  return /^https?:\/\//i.test(s);
}

/** Pour formulaires React / JSON : toujours une chaîne (vide = pas d'image). */
export const optionalStoredImageUrl = z
  .string()
  .max(2048)
  .refine(isValidStoredImageRef, {
    message: "L'URL de l'image n'est pas valide",
  });

/** Pour FormData (`get` peut retourner null ou un File). */
export const optionalStoredImageUrlFromForm = z.preprocess(
  (val) => {
    if (val == null || typeof val !== "string") return "";
    return val.trim();
  },
  optionalStoredImageUrl,
);
