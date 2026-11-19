"use client";

import { useEffect, type ReactNode } from "react";

/*
 * Route changes: the new page starts at the top (unless linked to an anchor)
 * and fades in over 500ms, so moving between the four colour worlds is a
 * soft cross rather than a hard cut. No panels, no loader.
 */
export default function Template({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (!location.hash) window.scrollTo(0, 0);
  }, []);
  return <div className="route-in">{children}</div>;
}
