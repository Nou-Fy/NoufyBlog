import { cookies } from "next/headers";

export async function getSessionUser() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("session")?.value;

  // Si le cookie n'existe pas, userId sera undefined, on renvoie null
  if (!userId) return null;

  // Puisqu'on n'utilise pas JWT, la valeur du cookie EST l'ID de l'utilisateur
  return userId;
}
