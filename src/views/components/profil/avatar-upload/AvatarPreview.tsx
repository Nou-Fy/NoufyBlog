import { DESIGN_SYSTEM } from "@/lib/constants/design-system";

interface AvatarPreviewProps {
  preview: string | null;
  defaultInitial: string;
}

export function AvatarPreview({ preview, defaultInitial }: AvatarPreviewProps) {
  const commonClass = `w-full h-full ${DESIGN_SYSTEM.radius.xl} border-4 border-white ${DESIGN_SYSTEM.shadows.xl} object-cover`;

  if (preview) {
    return <img src={preview} alt="Profil" className={commonClass} />;
  }

  return (
    <div
      className={`${commonClass} bg-emerald-100 flex items-center justify-center text-5xl font-black text-emerald-600 uppercase`}>
      {defaultInitial}
    </div>
  );
}
