import { useRef } from "react";
import { Upload, Loader2, Check } from "lucide-react";
import { MAX_IMAGE_BYTES, getFileSizeLabel } from "@/lib/image/format";
import { useImageUpload } from "@/hooks/media/use-image-upload";

interface ImageUploadProps {
  onUpload: (url: string) => void;
  label?: string;
  endpoint?: string;
  fieldName?: string;
  filename?: string;
}

export default function ImageUpload({
  onUpload,
  label = "Image",
  endpoint = "/api/uploads",
  fieldName = "file",
  filename = "upload.webp",
}: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { urlValue, setUrlValue, error, loading, uploadFile, uploadUrl } =
    useImageUpload({ endpoint, fieldName, filename, onUpload });

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-end px-1">
        <label className="text-sm font-semibold text-muted-foreground">
          {label}
        </label>
        <span className="text-[10px] text-muted-foreground/50">
          Max {getFileSizeLabel(MAX_IMAGE_BYTES)}
        </span>
      </div>

      <div className="relative group">
        <input
          type="text"
          placeholder={
            loading ? "Traitement..." : "Coller une URL ou cliquer sur l'icône"
          }
          value={urlValue}
          disabled={loading}
          onChange={(e) => setUrlValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && uploadUrl()}
          className="w-full rounded-xl border border-border bg-card pr-12 pl-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all disabled:opacity-50"
        />

        <div className="absolute right-1.5 top-1.5">
          <button
            type="button"
            disabled={loading}
            onClick={() =>
              urlValue.trim() ? uploadUrl() : fileInputRef.current?.click()
            }
            className={`h-8 w-8 flex items-center justify-center rounded-lg transition-colors ${
              urlValue.trim()
                ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                : "text-muted-foreground hover:bg-secondary"
            }`}>
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : urlValue.trim() ? (
              <Check className="w-4 h-4" />
            ) : (
              <Upload className="w-4 h-4" />
            )}
          </button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && uploadFile(e.target.files[0])}
        />
      </div>

      {error && (
        <p className="text-[11px] font-medium text-red-500 px-1 animate-in fade-in slide-in-from-top-1">
          {error}
        </p>
      )}
    </div>
  );
}
