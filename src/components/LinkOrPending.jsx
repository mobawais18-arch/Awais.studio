import { isUrl } from "../lib/cx";

// Real external link when `href` is valid; otherwise a clearly disabled "coming soon" element.
export default function LinkOrPending({ href, children, className = "", pendingLabel = "Link coming soon" }) {
  if (isUrl(href)) {
    return <a href={href} target="_blank" rel="noopener noreferrer" className={className}>{children}</a>;
  }
  return (
    <span role="link" aria-disabled="true" title={pendingLabel} className={`${className} cursor-not-allowed opacity-45`}>
      {children}
    </span>
  );
}
