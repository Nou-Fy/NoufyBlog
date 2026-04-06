"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/views/components/ui/dialog";
import { Button } from "@/views/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/views/components/ui/form";
import { Settings, Save } from "lucide-react";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

// Liste des régions basée sur ton enum Prisma
const REGIONS = [
  "ANALAMANGA",
  "VAKINANKARATRA",
  "ITASY",
  "BONGOLAVA",
  "DIANA",
  "SAVA",
  "SOFIA",
  "BOENY",
  "BETSIBOKA",
  "MELAKY",
  "ALAOTRA_MANGORO",
  "ATSINANANA",
  "ANALANJIROFO",
  "AMORON_I_MANIA",
  "HAUTE_MATSIATRA",
  "VATOVAVY",
  "FITOVINANY",
  "ATSIMO_ATSINANANA",
  "IHOROMBE",
  "ATSIMO_ANDREFANA",
  "ANDROY",
  "ANOSY",
  "MENABE",
];

const profileSchema = z.object({
  nom: z.string().min(2, "Le nom est trop court"),
  prenom: z.string().min(2, "Le prénom est trop court"),
  email: z.string().email("Email invalide"),
  region: z.string().min(1, "Veuillez choisir une région"),
});

export function ProfilDetailsModals({ user }: { user: any }) {
  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      nom: user.nom || "",
      prenom: user.prenom || "",
      email: user.email || "",
      region: user.region || "",
    },
  });

  async function onSubmit(values: z.infer<typeof profileSchema>) {
    console.log("Données à envoyer à Prisma :", values);
    // Ici, tu appelleras ton Server Action pour mettre à jour la BDD
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="rounded-2xl border-stone-200 bg-emerald-600 text-white hover:bg-emerald-700 transition-all">
          <Settings className="w-4 h-4 mr-2" />
          Modifier le profil
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md bg-white rounded-3xl p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-slate-900">
            Paramètres du compte
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control as any}
                name="prenom"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prénom</FormLabel>
                    <FormControl>
                      <Input {...field} className="rounded-xl" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control as any}
                name="nom"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom</FormLabel>
                    <FormControl>
                      <Input {...field} className="rounded-xl" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control as any}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" className="rounded-xl" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control as any}
              name="region"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Région</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="rounded-xl">
                        <SelectValue placeholder="Sélectionnez votre région" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {REGIONS.map((region) => (
                        <SelectItem key={region} value={region}>
                          {region.charAt(0) +
                            region.slice(1).toLowerCase().replace("_", " ")}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-3 pt-6">
              <Button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 rounded-xl py-6">
                <Save className="w-4 h-4 mr-2" />
                Enregistrer les modifications
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
