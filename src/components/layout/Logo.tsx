import CobrrWordmark from "@/components/brand/CobrrWordmark";
import { cn } from "@/lib/utils";

/**
 * The COBRR brand mark, as used in the header and drawer.
 *
 * The monogram and its lockup are gone: this is the name on its own, set in
 * Syne rather than the page typeface, animated on load and on hover.
 *
 * `size` keeps its old meaning to the call sites (`Navbar`, the mobile
 * drawer) — an approximate cap height — but now sets the wordmark's font size
 * directly. Syne's capitals sit at roughly 0.72 of the em, so the value is
 * scaled to keep a `size={58}` mark visually the height it was before.
 *
 * Colour is inherited, so the header sets it: white over the dark hero, ink
 * once the header turns light.
 */
export default function Logo({
  className,
  size = 38,
}: {
  className?: string;
  size?: number;
}) {
  return <CobrrWordmark className={cn(className)} size={Math.round(size * 0.5)} />;
}
