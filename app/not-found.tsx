import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden="true" className="glow-warm absolute inset-0" />

      <div className="shell relative flex min-h-[70vh] flex-col items-center justify-center gap-6 py-28 text-center">
        <p className="eyebrow">404</p>

        <h1 className="max-w-xl text-3xl font-semibold sm:text-4xl">
          That page does not exist.
        </h1>

        <p className="max-w-md leading-relaxed text-ink-muted">
          The link may be out of date, or the page may have moved. The routes
          below are all live.
        </p>

        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <Button href="/">Back to Home</Button>
          <Button href="/projects" variant="secondary">
            View Projects
          </Button>
        </div>
      </div>
    </section>
  );
}
