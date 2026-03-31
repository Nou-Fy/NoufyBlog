import { getIsAdmin } from "@/lib/auth";
import GuideClientPage from "./GuideClientPage";
import { prisma } from "@/lib/prisma";

export default async function Page() {
  // 1. On vérifie le rôle côté serveur (Sécurisé)
  const isAdmin = await getIsAdmin();

  // 2. On récupère les guides de la base de données
  const guidesFromDB = await prisma.guide.findMany({
    orderBy: { createdAt: "desc" },
  });

  // 3. On envoie les données au composant client
  return <GuideClientPage isAdmin={isAdmin} initialGuides={guidesFromDB} />;
}
