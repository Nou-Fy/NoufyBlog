"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { useProfileForm } from "@/hooks/profile/use-profile-form";
import { ProfileForm } from "./ProfileForm";

export function ProfileDetailsModal({ user }: { user: any }) {
  const { form, onSubmit } = useProfileForm(user);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="rounded-2xl border-border bg-emerald-600 text-white hover:bg-emerald-700">
          <Settings className="w-4 h-4 mr-2" />
          Modifier le profil
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[700px] w-[95vw] max-h-[90vh] overflow-y-auto bg-card rounded-3xl p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-foreground">
            Paramètres du compte
          </DialogTitle>
        </DialogHeader>

        <ProfileForm form={form} onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
}
