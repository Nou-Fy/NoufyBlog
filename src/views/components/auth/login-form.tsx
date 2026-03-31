"use client";

import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

type Props = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

export default function LoginModal({ isOpen, setIsOpen }: Props) {
  if (!isOpen) return null;
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-green-600 text-white px-4 py-2 rounded">
        Ouvrir la connexion
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <form className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="nom@exemple.com"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                required
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-primary" />
                Se souvenir de moi
              </label>

              <a href="#" className="text-blue-600 hover:underline">
                Mot de passe oublié ?
              </a>
            </div>

            <Button type="submit" className="w-full mt-2">
              Se connecter
            </Button>
          </form>
        </div>
      )}
    </>
  );
}
