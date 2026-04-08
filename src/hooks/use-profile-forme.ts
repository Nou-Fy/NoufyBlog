import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { profileSchema, type ProfileFormValues } from "@/lib/validator/profile";
import { updateProfile } from "@/app/api/actions/profil";

export function useProfileForm(user: any) {
  const router = useRouter();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      nom: user.nom ?? "",
      prenom: user.prenom ?? "",
      email: user.email ?? "",
      region: (user.region ?? "") as any,
    },
  });

  const onSubmit = async (values: ProfileFormValues) => {
    try {
      await updateProfile(user.id, values);
      router.refresh();
      // On pourrait ajouter un toast de succès ici
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error);
    }
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isLoading: form.formState.isSubmitting,
  };
}
