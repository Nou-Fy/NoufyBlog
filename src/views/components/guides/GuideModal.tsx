import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/views/components/ui/dialog";
import { ScrollArea } from "@/views/components/ui/scroll-area"; // Optionnel : si le contenu est très long

interface Guide {
  id: string;
  title: string;
  description: string;
  content: string;
  badge: string;
  color: string;
  iconName: string;
  slug: string;
}

interface GuideModalProps {
  guide: Guide;
  isOpen: boolean;
  onClose: () => void;
}

export function GuideModal({ guide, isOpen, onClose }: GuideModalProps) {
  if (!guide) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] flex flex-col">
        <DialogHeader className="border-b pb-4">
          <div className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 mb-2">
            {guide.badge}
          </div>
          <DialogTitle className="text-3xl font-bold text-slate-900">
            {guide.title}
          </DialogTitle>
          <p className="text-sm text-slate-500 mt-2 italic">
            {guide.description}
          </p>
        </DialogHeader>

        {/* ScrollArea est recommandé pour les longs textes de type @db.Text */}
        <ScrollArea className="flex-1 mt-4 pr-4">
          <div className="prose prose-slate max-w-none">
            {/* Si ton 'content' est du texte brut avec des retours à la ligne (\n), 
              on utilise 'whitespace-pre-wrap'. 
              Si c'est du HTML provenant d'un éditeur, utilise dangerouslySetInnerHTML.
            */}
            <div className="text-slate-700 leading-relaxed whitespace-pre-wrap">
              {guide.content}
            </div>
          </div>
        </ScrollArea>

        <div className="mt-6 pt-4 border-t flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors">
            Fermer la lecture
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
