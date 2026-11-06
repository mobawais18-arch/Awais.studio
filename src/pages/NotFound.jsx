import { usePageMeta } from "../hooks/usePageMeta";
import { container, cx } from "../lib/cx";
import Button from "../components/Button";

export default function NotFound() {
  usePageMeta("Page not found");
  return (
    <section className={cx(container, "grid min-h-[80vh] place-content-center pt-24 text-center")}>
      <h1 className="font-display text-4xl font-extrabold sm:text-6xl">This page is not in the universe.</h1>
      <p className="mx-auto mt-4 max-w-md text-mute">The address may be mistyped, or the page may have moved.</p>
      <div className="mt-8"><Button to="/">Back to Home</Button></div>
    </section>
  );
}
