// src/views/components/community/CommunityHero.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircle, Loader2 } from "lucide-react";

import { Button } from "@/views/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/views/components/ui/dialog";
import { Input } from "@/views/components/ui/input";
import {
  DiscussionFormValues,
  discussionSchema,
} from "@/lib/validator/discussion";
import { createDiscussion } from "@/app/api/actions/discussion.actions";

interface CommunityHeroProps {
  userId: string | null;
}

export default function CommunityHero({ userId }: CommunityHeroProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const form = useForm<DiscussionFormValues>({
    resolver: zodResolver(discussionSchema),
    defaultValues: { content: "", imageUrl: "" },
  });

  const onSubmit = async (values: DiscussionFormValues) => {
    if (!userId) return;

    setIsPending(true);
    const result = await createDiscussion(values, userId);
    setIsPending(false);

    if (result.success) {
      form.reset();
      setIsOpen(false);
    } else {
      alert(result.error);
    }
  };

  return (
    <section className="bg-emerald-700 pt-16 pb-32 px-4 text-white">
      <div className="container mx-auto text-center max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
          L'Espace des Éleveurs Passionnés 🇲🇬
        </h1>
        <p className="text-xl text-emerald-50 max-w-2xl mx-auto mb-8">
          Rejoignez plus de 500 éleveurs malgaches. Échangez vos astuces, posez
          vos questions et progressez ensemble.
        </p>

        {userId && (
          <div className="flex justify-center gap-4">
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button
                  size="lg"
                  className="bg-orange-500 hover:bg-orange-600 text-white border-none shadow-lg">
                  <PlusCircle className="mr-2 w-5 h-5" /> Poser une question
                </Button>
              </DialogTrigger>

              <DialogContent className="sm:max-w-[500px] border-none bg-white text-slate-900">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-emerald-800">
                    Nouvelle Discussion
                  </DialogTitle>
                </DialogHeader>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-5 pt-4">
                  {/* Message / Contenu */}
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-slate-700">
                      Votre message (max 500 car.) *
                    </label>
                    <textarea
                      {...form.register("content")}
                      placeholder="Partagez un conseil ou posez une question sur votre élevage..."
                      className="w-full p-3 border border-stone-200 rounded-xl outline-none transition-all focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm min-h-[140px] bg-white text-slate-700"
                    />
                    {form.formState.errors.content && (
                      <p className="text-red-500 text-[10px] font-medium">
                        {form.formState.errors.content.message}
                      </p>
                    )}
                  </div>

                  {/* Image URL avec le style h-10 uniforme */}
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-slate-700">
                      Lien d'une image (optionnel)
                    </label>
                    <div className="relative flex items-center">
                      <input
                        {...form.register("imageUrl")}
                        placeholder="https://votre-image.jpg"
                        className="w-full h-10 px-3 border border-stone-200 rounded-xl outline-none transition-all focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-700 text-sm bg-white"
                      />
                    </div>
                    {form.formState.errors.imageUrl && (
                      <p className="text-red-500 text-[10px]">
                        {form.formState.errors.imageUrl.message}
                      </p>
                    )}
                  </div>

                  {/* Boutons d'action stylisés comme le GuideForm */}
                  <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      disabled={isPending}
                      className="h-11 px-6 text-sm font-semibold text-slate-500 hover:bg-stone-50 rounded-xl transition-colors disabled:opacity-50">
                      Annuler
                    </button>
                    <button
                      type="submit"
                      disabled={isPending}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-11 px-8 rounded-xl transition-all flex justify-center items-center gap-2 disabled:opacity-50 shadow-lg shadow-emerald-100">
                      {isPending ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        "Publier maintenant"
                      )}
                    </button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </div>
    </section>
  );
}
