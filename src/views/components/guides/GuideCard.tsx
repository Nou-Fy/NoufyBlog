import { useState } from "react";
import { Edit, Trash2, Bird, ArrowRight } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/views/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/views/components/ui/dialog";
import { GuideModal } from "./GuideModal";
import GuideForm from "./GuideForm";
import { deleteGuide } from "@/lib/services/guide.service";
import { useGuideModal } from "@/lib/hooks/use-guide-modal";

interface GuideCardProps {
  guide: any;
  isAdmin?: boolean;
  onRefresh?: () => void;
}

export function GuideCard({ guide, isAdmin, onRefresh }: GuideCardProps) {
  const { isOpen, openModal, closeModal } = useGuideModal();
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Supprimer ce guide définitivement ?")) {
      await deleteGuide(guide.id);
      if (onRefresh) onRefresh();
    }
  };

  return (
    <>
      <Card className="relative group border-none shadow-md hover:shadow-xl transition-all duration-300 bg-slate-50">
        {isAdmin && (
          <div className="absolute top-3 right-3 flex gap-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsEditOpen(true);
              }}
              className="p-2 bg-white hover:bg-blue-50 text-blue-600 rounded-full shadow-sm border border-slate-100 transition-colors">
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={handleDelete}
              className="p-2 bg-white hover:bg-red-50 text-red-600 rounded-full shadow-sm border border-slate-100 transition-colors">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}

        <CardHeader>
          <div className="p-3 rounded-2xl bg-white w-fit mb-4 shadow-sm group-hover:scale-110 transition-transform">
            <Bird className="w-8 h-8 text-emerald-600" />
          </div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">
            {guide.badge}
          </div>
          <CardTitle className="text-2xl text-slate-900">
            {guide.title}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-slate-700 text-sm leading-relaxed line-clamp-3">
            {guide.description}
          </p>
          <button
            onClick={openModal}
            className="flex items-center text-sm font-bold text-emerald-700 hover:text-emerald-800 transition-colors">
            Lire le guide <ArrowRight className="ml-2 w-4 h-4" />
          </button>
        </CardContent>
      </Card>

      <GuideModal guide={guide} isOpen={isOpen} onClose={closeModal} />

      {/* --- DIALOG DE MODIFICATION --- */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        {/* max-w-[650px] pour la largeur et showCloseButton={false} pour éviter le double bouton */}
        <DialogContent
          className="sm:max-w-[650px] w-[95vw] p-0 border-none bg-transparent shadow-none"
          showCloseButton={false}>
          <DialogHeader className="sr-only">
            <DialogTitle>Modifier le guide</DialogTitle>
            <DialogDescription>Modification</DialogDescription>
          </DialogHeader>

          <GuideForm
            initialData={guide}
            onClose={() => setIsEditOpen(false)}
            onSuccess={() => {
              setIsEditOpen(false);
              if (onRefresh) onRefresh();
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
