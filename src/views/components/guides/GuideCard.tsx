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
import { useGuideModal } from "@/hooks/use-guide-modal";

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
      <Card className="relative group flex flex-col border-none shadow-md hover:shadow-xl transition-all duration-300 bg-card/5 min-h-[350px]">
        {isAdmin && (
          <div className="absolute top-4 right-4 flex gap-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsEditOpen(true);
              }}
              className="p-2 bg-card hover:bg-blue-50 text-blue-600 rounded-full shadow-sm border border-border transition-colors">
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={handleDelete}
              className="p-2 bg-card hover:bg-red-50 text-red-600 rounded-full shadow-sm border border-border transition-colors">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}

        <CardHeader className="p-6 pb-2">
          <div className="p-4 rounded-2xl bg-card w-fit mb-5 shadow-sm group-hover:scale-110 transition-transform">
            <Bird className="w-10 h-10 text-emerald-600" />
          </div>
          <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
            {guide.badge}
          </div>
          <CardTitle className="text-3xl text-foreground leading-tight">
            {guide.title}
          </CardTitle>
        </CardHeader>

        <CardContent className="p-6 pt-2 flex flex-col flex-1 space-y-4">
          <p className="text-muted-foreground text-base leading-relaxed line-clamp-4 flex-1">
            {guide.description}
          </p>
          <button
            onClick={openModal}
            className="flex items-center text-base font-bold text-emerald-700 hover:text-emerald-800 transition-colors mt-auto">
            Lire le guide <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </CardContent>
      </Card>

      <GuideModal guide={guide} isOpen={isOpen} onClose={closeModal} />

      {/* --- DIALOG DE MODIFICATION --- */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
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
