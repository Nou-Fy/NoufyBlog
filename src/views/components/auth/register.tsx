"use client";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { registerUser } from "@/app/api/actions/register";

export function RegisterForm() {
  return (
    <form action={registerUser} className="grid gap-4 py-4">
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
        <Input id="confirm-password" type="password" required />
      </div>

      <Button type="submit" className="w-full mt-2">
        Créer mon compte
      </Button>
    </form>
  );
}
