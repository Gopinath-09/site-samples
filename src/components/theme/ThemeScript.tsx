import { THEME_STORAGE_KEY } from "@/lib/theme-constants";

/**
 * Inline, parser-blocking script that sets `data-theme` on <html> BEFORE the
 * page paints, so there is no flash of the wrong theme.
 *
 * The site has exactly two themes and **light is the default**. The OS
 * `prefers-color-scheme` setting is deliberately ignored: a visitor only gets
 * dark after choosing it with the toggle, and that choice is what is stored.
 *
 * Resolution order: stored "dark" → dark; anything else → light.
 * Rendered as the first child of <body> from the root layout.
 */
const script = `(function(){try{document.documentElement.dataset.theme=localStorage.getItem("${THEME_STORAGE_KEY}")==="dark"?"dark":"light";}catch(e){document.documentElement.dataset.theme="light";}})();`;

export default function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
