import { getIsAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import GuideClientPage from "./GuideClientPage"; // Import du composant interactif

export default async function Page() {
  const isAdmin = await getIsAdmin();
  const guidesFromDB = await prisma.guide.findMany({
    orderBy: { createdAt: "desc" },
  });

  // ICI : On rend le composant Client.
  // C'est lui qui contient le bouton et la logique de la modale.
  return <GuideClientPage isAdmin={isAdmin} initialGuides={guidesFromDB} />;
}
