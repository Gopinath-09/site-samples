/**
 * Icon surface for the app.
 *
 * Functional / UI icons come from `lucide-react` (consistent 24px line-art,
 * currentColor, tree-shakeable). They are re-exported here under the names the
 * codebase already uses, so call sites don't change. A few are aliased where
 * lucide's name differs (e.g. Sparkle → Sparkles, Close → X).
 *
 * Brand / social logos are NOT provided by lucide (it deliberately dropped
 * them). Use `react-icons` for those — see `Footer.tsx` (react-icons/fa6).
 */
export {
  ArrowRight,
  ArrowUpRight,
  Code,
  Cloud,
  Cpu,
  Layers,
  Sparkles as Sparkle,
  ShieldCheck as Shield,
  Smartphone as Phone,
  LayoutGrid as Grid,
  LineChart as Chart,
  Settings as Gear,
  Check,
  ChevronDown,
  Menu,
  Star,
  X as Close,
  Building2 as Building,
  HeartPulse as Health,
  ShoppingBag as Bag,
  GraduationCap as Cap,
} from "lucide-react";
