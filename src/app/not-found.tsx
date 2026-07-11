import Button from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/icons";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80vh] items-center overflow-hidden bg-ink text-white">
      <div className="bg-grid-dark absolute inset-0 opacity-40" aria-hidden />
      <div className="relative container-page text-center">
        <div className="font-mono text-sm tracking-[0.2em] text-brand">
          ERROR 404
        </div>
        <h1 className="heading-xl mx-auto mt-6 max-w-2xl text-balance text-white">
          This page couldn&apos;t be found.
        </h1>
        <p className="lead mx-auto mt-5 max-w-md text-muted-dark">
          The page you&apos;re looking for may have moved or never existed. Let&apos;s
          get you back on track.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Button variant="light" size="lg" href="/">
            Back to home
            <ArrowRight width={18} height={18} />
          </Button>
          <Button variant="ghost-light" size="lg" href="/contact">
            Contact us
          </Button>
        </div>
      </div>
    </section>
  );
}
