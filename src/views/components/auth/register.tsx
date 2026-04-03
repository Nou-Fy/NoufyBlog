"use client";

import { useActionState } from "react"; // Importer le hook
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { registerUser } from "@/app/api/actions/register";

export function RegisterForm() {
  // 1. Initialiser le state. registerUser sera appelé avec (prevState, formData)
  // null est la valeur initiale de 'state'
  const [state, formAction, isPending] = useActionState(registerUser, null);

  return (
    /* 2. Utiliser formAction au lieu de registerUser */
    <form action={formAction} className="grid gap-4 py-4">
      {/* Affichage des erreurs retournées par l'action si elles existent */}
      {state?.error && (
        <div className="p-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded">
          {state.error}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="firstName">Prénom</Label>
          <Input name="firstName" id="first-name" placeholder="Jean" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="lastName">Nom</Label>
          <Input name="lastName" id="last-name" placeholder="Dupont" required />
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          name="email"
          id="email"
          type="email"
          placeholder="nom@exemple.com"
          required
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="password">Mot de passe</Label>
        <Input name="password" id="password" type="password" required />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="confirm-password">Confirmer le mot de passe</Label>
        {/* Ajoute l'attribut name="confirmPassword" pour le récupérer dans l'action */}
        <Input
          name="confirmPassword"
          id="confirm-password"
          type="password"
          required
        />
      </div>

      <Button type="submit" className="w-full mt-2" disabled={isPending}>
        {isPending ? "Création en cours..." : "Créer mon compte"}
      </Button>
    </form>
  );
}
