// src/views/components/community/CommunityHero.tsx
"use client";

import { useState, useEffect } from "react";
import { useForm } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircle, Loader2 } from "lucide-react";

import Container from "@/components/common/Container";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  DiscussionFormValues,
  discussionSchema,
} from "@/lib/validator/discussion";
import { createDiscussion } from "@/app/api/actions/discussion.actions";
import ImageUpload from "@/components/media/ImageUpload";

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

  useEffect(() => {
    form.register("imageUrl");
  }, [form]);

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
    <section className="bg-emerald-700 overflow-hidden text-white">
      <Container size="full" className="py-16 overflow-hidden">
        <div className="mx-auto max-w-3xl w-full text-center overflow-hidden">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
            L'Espace des Éleveurs Passionnés 🇲🇬
          </h1>
          <p className="text-xl text-emerald-50 max-w-2xl mx-auto mb-8">
            Rejoignez plus de 500 éleveurs malgaches. Échangez vos astuces,
            posez vos questions et progressez ensemble.
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

                <DialogContent className="sm:max-w-[500px] border-none bg-card text-card-foreground">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-foreground">
                      Nouvelle Discussion
                    </DialogTitle>
                  </DialogHeader>
                  <DialogDescription className="text-xs text-muted-foreground/90">
                    Vous pouvez ajouter une illustration via URL ou importer un fichier
                    (max 5 MB). Les images trop grandes seront bloquées automatiquement.
                  </DialogDescription>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4 pt-4">
                    {/* Message / Contenu */}
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-muted-foreground">
                        Votre message (max 500 car.) *
                      </label>
                      <textarea
                        {...form.register("content")}
                        placeholder="Partagez un conseil ou posez une question sur votre élevage..."
                        className="w-full p-3 border border-border rounded-xl outline-none transition-all focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 text-sm min-h-[140px] bg-card/80 text-foreground"
                      />
                      {form.formState.errors.content && (
                        <p className="text-red-500 text-[10px] font-medium">
                          {form.formState.errors.content.message}
                        </p>
                      )}
                    </div>

                    <ImageUpload
                      label="Illustration (URL ou fichier)"
                      onUpload={(url) => {
                        form.setValue("imageUrl", url);
                        form.trigger("imageUrl");
                      }}
                    />
                    {form.formState.errors.imageUrl && (
                      <p className="text-red-500 text-[10px]">
                        {form.formState.errors.imageUrl.message}
                      </p>
                    )}

                    {/* Boutons d'action stylisés comme le GuideForm */}
                    <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
                      <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        disabled={isPending}
                        className="h-11 px-6 text-sm font-semibold text-muted-foreground hover:bg-card/80 rounded-xl transition-colors disabled:opacity-50">
                        Annuler
                      </button>
                      <button
                        type="submit"
                        disabled={isPending}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-11 px-8 rounded-xl transition-all flex justify-center items-center gap-2 disabled:opacity-50 shadow-lg shadow-emerald-100">
                        {isPending ? (
                          <Loader2 className="w-5 h-5 animate-spin text-white" />
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
      </Container>
    </section>
  );
}
