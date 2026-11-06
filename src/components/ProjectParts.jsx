import Placeholder from "./Placeholder";

export function ProjectThumb({ project }) {
  if (project.image) {
    return <img src={project.image} alt={`${project.title} preview`} loading="lazy" className="h-full w-full object-cover" />;
  }
  return <Placeholder kind="photo" label={`${project.title}: project screenshot placeholder`} />;
}

export function TechList({ tech }) {
  if (!tech?.length) return <p className="text-sm text-mute">Technologies to be added.</p>;
  return (
    <ul className="flex flex-wrap gap-2">
      {tech.map((t) => (<li key={t} className="chip rounded-full px-3 py-1 text-xs">{t}</li>))}
    </ul>
  );
}

export const linkStyle = "inline-flex items-center gap-1.5 text-sm font-semibold text-accent-soft transition-colors hover:text-bone";
