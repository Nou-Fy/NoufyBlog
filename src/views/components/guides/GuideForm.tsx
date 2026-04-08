"use client";

import { useForm } from "@/views/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  X,
  Loader2,
  Link2,
  Fence,
  HeartPulse,
  Wheat,
  Bird,
  Egg,
} from "lucide-react";
import { GuideFormValues, guideSchema } from "@/lib/validator/guide";
import { slugify } from "@/lib/utils/string";
import { createGuide, updateGuide } from "@/lib/services/guide.service";
import { GUIDE_ICONS, GUIDE_COLORS } from "@/lib/constants/guides";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/views/components/ui/select";

interface GuideFormProps {
  initialData?: any;
  onClose?: () => void;
  onSuccess: () => void;
}

const ICON_COMPONENTS: Record<string, any> = {
  Fence,
  HeartPulse,
  Wheat,
  Bird,
  Egg,
};

export default function GuideForm({
  initialData,
  onClose,
  onSuccess,
}: GuideFormProps) {
  const isEditing = !!initialData;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<GuideFormValues>({
    resolver: zodResolver(guideSchema),
    defaultValues: initialData || {
      title: "",
      description: "",
      content: "",
      badge: "",
      color: "bg-card/5",
      iconName: "",
      slug: "",
    },
  });

  const currentColor = watch("color");
  const currentIcon = watch("iconName");

  const onSubmit = async (data: GuideFormValues) => {
    try {
      if (isEditing) {
        await updateGuide(initialData.id, data);
      } else {
        await createGuide(data);
      }
      onSuccess();
    } catch (error: any) {
      alert(error.message);
    }
  };

  // Classe UNIQUE pour aligner parfaitement Input et SelectTrigger (Hauteur 40px)
  const fieldClasses =
    "w-full h-10 px-3 border border-border rounded-xl outline-none transition-all focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-muted-foreground text-sm bg-card flex items-center";

  return (
    <div className="w-full p-6 bg-card rounded-2xl relative shadow-xl border border-border max-h-[90vh] overflow-y-auto">
      {onClose && (
        <button
          onClick={onClose}
          type="button"
          className="absolute top-4 right-4 p-2 hover:bg-card/80 rounded-full transition-colors z-20">
          <X className="w-5 h-5 text-muted-foreground" />
        </button>
      )}

      <div className="mb-6">
        <h2 className="text-xl font-bold text-foreground">
          {isEditing ? "Modifier le Guide" : "Nouveau Guide"}
        </h2>
        <p className="text-sm text-muted-foreground">
          {isEditing
            ? "Modifiez les informations ci-dessous pour mettre à jour le guide."
            : "Remplissez les détails pour publier un nouveau guide bio."}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-muted-foreground">
              Titre *
            </label>
            <input
              {...register("title")}
              onChange={(e) => {
                const val = e.target.value;
                setValue("title", val, { shouldValidate: true });
                if (!isEditing)
                  setValue("slug", slugify(val), { shouldValidate: true });
              }}
              className={fieldClasses}
            />
            {errors.title && (
              <p className="text-red-500 text-[10px]">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-muted-foreground flex items-center gap-1">
              <Link2 className="w-3 h-3" /> Slug
            </label>
            <input
              {...register("slug")}
              readOnly
              className={`${fieldClasses} bg-background text-muted-foreground italic cursor-not-allowed ${isEditing ? "opacity-50" : ""}`}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-muted-foreground">
            Description courte *
          </label>
          <input
            {...register("description")}
            className={fieldClasses}
            maxLength={255}
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-muted-foreground">
            Contenu *
          </label>
          <textarea
            {...register("content")}
            rows={5}
            className="w-full p-3 border border-border rounded-xl outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm min-h-[120px]"
          />
        </div>

        {/* --- SECTION BADGE / ICON / COLOR --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end pb-8">
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-muted-foreground">
              Badge
            </label>
            <input
              {...register("badge")}
              className={fieldClasses}
              placeholder="Ex: BIO"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-muted-foreground">
              Icône *
            </label>
            <Select
              value={currentIcon}
              onValueChange={(val) =>
                setValue("iconName", val, { shouldValidate: true })
              }>
              <SelectTrigger className={fieldClasses}>
                <div className="flex items-center gap-2 truncate">
                  {currentIcon ? (
                    <>
                      <div className="text-emerald-600 shrink-0">
                        {(() => {
                          const Icon = ICON_COMPONENTS[currentIcon];
                          return Icon ? <Icon className="w-4 h-4" /> : null;
                        })()}
                      </div>
                      <span className="truncate">
                        {GUIDE_ICONS.find((i) => i.name === currentIcon)?.label}
                      </span>
                    </>
                  ) : (
                    <span className="text-muted-foreground">Choisir...</span>
                  )}
                </div>
              </SelectTrigger>
              {/* portal={false} permet d'afficher la liste au-dessus de la modale sans conflit */}
              <SelectContent
                position="popper"
                className="bg-card z-[9999] shadow-xl border border-border">
                {GUIDE_ICONS.map((ico) => {
                  const Icon = ICON_COMPONENTS[ico.name];
                  return (
                    <SelectItem
                      key={ico.name}
                      value={ico.name}
                      className="cursor-pointer">
                      <div className="flex items-center gap-2">
                        {Icon && <Icon className="w-4 h-4" />}
                        <span className="text-sm">{ico.label}</span>
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-muted-foreground">
              Couleur
            </label>
            <Select
              value={currentColor}
              onValueChange={(val) =>
                setValue("color", val, { shouldValidate: true })
              }>
              <SelectTrigger className={fieldClasses}>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-3 h-3 rounded-full border shrink-0 ${currentColor}`}
                  />
                  <span className="truncate">
                    {GUIDE_COLORS.find((c) => c.value === currentColor)?.label}
                  </span>
                </div>
              </SelectTrigger>
              <SelectContent
                position="popper"
                className="bg-card z-[9999] shadow-xl border border-border">
                {GUIDE_COLORS.map((c) => (
                  <SelectItem
                    key={c.value}
                    value={c.value}
                    className="cursor-pointer">
                    <div className="flex gap-2 items-center">
                      <div className={`w-3 h-3 rounded border ${c.value}`} />
                      <span className="text-sm">{c.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-12 rounded-xl transition-all flex justify-center items-center gap-2 disabled:opacity-50 shadow-lg shadow-emerald-100 mt-4">
          {isSubmitting ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : isEditing ? (
            "Enregistrer les modifications"
          ) : (
            "Publier le guide"
          )}
        </button>
      </form>
    </div>
  );
}
