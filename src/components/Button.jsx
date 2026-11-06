import { Link } from "react-router-dom";
import { cx } from "../lib/cx";
import Magnetic from "./Magnetic";

const variants = { primary: "btn-primary", dev: "btn-dev", event: "btn-event", ghost: "btn-ghost" };

export default function Button({ to, href, variant = "primary", magnetic = true, block = false, className, children, ...rest }) {
  const cls = cx("btn", variants[variant], block && "w-full", className);
  const el = to ? (
    <Link to={to} className={cls} {...rest}>{children}</Link>
  ) : href ? (
    <a href={href} className={cls} {...rest}>{children}</a>
  ) : (
    <button className={cls} {...rest}>{children}</button>
  );
  return magnetic ? <Magnetic className={block ? "block" : "inline-block"}>{el}</Magnetic> : el;
}
