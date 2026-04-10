export const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

export function getFileSizeLabel(bytes: number): string {
  const mb = (bytes / (1024 * 1024)).toFixed(1).replace(/\.0$/, "");
  return `${mb} MB`;
}

export function isValidUrl(url: string): boolean {
  return url.trim().startsWith("http");
}
