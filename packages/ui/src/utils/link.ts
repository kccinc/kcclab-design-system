import type { ComponentType, MouseEvent, ReactNode } from "react";

/**
 * Props every navigation component passes to its link. Kept to the minimum a
 * router `Link` (Next.js, React Router, ...) and a plain `<a>` both accept,
 * so `linkComponent={NextLink}` works without an adapter.
 */
export interface LinkComponentProps {
  href: string;
  className?: string;
  children?: ReactNode;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
  "aria-current"?: "page";
  "aria-label"?: string;
}

/** Router link to render instead of `<a>` — avoids a full page reload on client-side navigation. */
export type LinkComponent = ComponentType<LinkComponentProps> | "a";
