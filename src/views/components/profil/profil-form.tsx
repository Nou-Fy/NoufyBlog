import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/views/components/ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { Save } from "lucide-react";
import { REGIONS, type ProfileFormValues } from "@/lib/validator/profile";
import { UseFormReturn } from "react-hook-form";

interface ProfileFormProps {
  form: UseFormReturn<ProfileFormValues>;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
}

export function ProfileForm({ form, onSubmit }: ProfileFormProps) {
  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-6 pt-4">
        {/* Ligne 1 : Nom et Prénom sur la même ligne */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="prenom"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Prénom</FormLabel>
                <FormControl>
                  <Input {...field} className="rounded-xl h-12" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="nom"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Nom</FormLabel>
                <FormControl>
                  <Input {...field} className="rounded-xl h-12" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Le reste sur une seule colonne (pleine largeur) */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">Email</FormLabel>
              <FormControl>
                <Input {...field} type="email" className="rounded-xl h-12" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="region"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">Région</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="rounded-xl h-12">
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

        <div className="pt-4">
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="w-full bg-emerald-600 hover:bg-emerald-700 rounded-xl py-7 text-lg font-medium transition-all shadow-lg shadow-emerald-900/20">
            <Save className="w-5 h-5 mr-2" />
            {form.formState.isSubmitting
              ? "Enregistrement..."
              : "Enregistrer les modifications"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
