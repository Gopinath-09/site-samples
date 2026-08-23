/**
 * Badge styling per blog category. Shared by the blog index, the filter bar and
 * the article page so a category always reads the same colour across the site.
 */
export const categoryColors: Record<string, string> = {
  "Artificial Intelligence": "bg-purple-500/10 text-purple-700 border-purple-500/20",
  "Software Engineering": "bg-brand-soft text-brand border-brand/20",
  "Technology": "bg-teal-500/10 text-teal-700 border-teal-500/20",
  "Cloud": "bg-sky-500/10 text-sky-700 border-sky-500/20",
  "Cybersecurity": "bg-red-500/10 text-red-700 border-red-500/20",
  "Company Updates": "bg-copper/10 text-copper border-copper/20",
  "Tutorials": "bg-amber-500/10 text-amber-700 border-amber-500/20",
  "Case Studies": "bg-emerald-500/10 text-emerald-700 border-emerald-500/20",
};

export const fallbackCategoryColor = "bg-sand text-muted border-line";

export function categoryClass(category: string) {
  return categoryColors[category] ?? fallbackCategoryColor;
}
