import { THEME_STORAGE_KEY } from "@/lib/theme-constants";

/**
 * Inline, parser-blocking script that sets `data-theme` on <html> BEFORE the
 * page paints, so there is no flash of the wrong theme.
 *
 * Resolution order: stored preference → OS preference → light.
 * Rendered as the first child of <body> from the root layout.
 */
const script = `(function(){try{var k="${THEME_STORAGE_KEY}";var s=localStorage.getItem(k);var t=(s==="dark"||s==="light")?s:(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");document.documentElement.dataset.theme=t;}catch(e){document.documentElement.dataset.theme="light";}})();`;

export default function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
