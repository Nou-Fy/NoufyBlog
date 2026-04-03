export function createPageURL(
  searchParams: URLSearchParams,
  pageNumber: number,
) {
  const params = new URLSearchParams(searchParams);
  params.set("page", pageNumber.toString());
  return `?${params.toString()}`;
}
