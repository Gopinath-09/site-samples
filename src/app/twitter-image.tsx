/**
 * X/Twitter reuses the Open Graph card verbatim, so this route re-exports it
 * rather than maintaining a second design that would drift out of sync.
 */
export { default, alt, size, contentType } from "./opengraph-image";
