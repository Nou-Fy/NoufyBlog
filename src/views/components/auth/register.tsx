"use client";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export function RegisterForm() {
  async function createUser() {
    const res = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nom: "Rakoto",
        prenom: "Jean",
        email: "jean@example.com",
        password: "123456",
      }),
    });

    const data = await res.json();
    console.log(data);
  }
  return (
    <form className="grid gap-4 py-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="first-name">Prénom</Label>
          <Input id="first-name" placeholder="Jean" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="last-name">Nom</Label>
          <Input id="last-name" placeholder="Dupont" required />
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="nom@exemple.com" required />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="password">Mot de passe</Label>
        <Input id="password" type="password" required />
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
