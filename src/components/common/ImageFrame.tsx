import React from "react";

interface ImageFrameProps {
  src?: string;
  alt: string;
  ratio?: string;
  className?: string;
  imgClassName?: string;
  placeholder?: string;
  children?: React.ReactNode;
  imgProps?: React.ImgHTMLAttributes<HTMLImageElement>;
}

export function ImageFrame({
  src,
  alt,
  ratio = "aspect-[16/9]",
  className = "",
  imgClassName = "",
  placeholder = "/api/placeholder/400/320",
  children,
  imgProps,
}: ImageFrameProps) {
  const initialSrc = src && src.trim() !== "" ? src : placeholder;

  return (
    <div
      className={`relative w-full overflow-hidden bg-card/70 ${ratio} ${className}`}
    >
      <img
        src={initialSrc}
        alt={alt}
        className={`absolute inset-0 w-full h-full object-contain transition-all ${imgClassName}`}
        loading="lazy"
        {...imgProps}
        onError={(event) => {
          const img = event.currentTarget;
          if (img.src && !img.src.endsWith(placeholder)) img.src = placeholder;
          if (imgProps?.onError) {
            imgProps.onError(event);
          }
        }}
      />
      {children}
    </div>
  );
}
