"use client";

import { useEffect } from "react";

// Discourages casual saving/copying of site imagery: blocks the right-click /
// long-press context menu and drag-to-save on <img> and <video>, and disables
// the iOS long-press callout. (Not DRM — screenshots and dev tools still work —
// but it removes the obvious "Save image / Copy image / Open in new tab" menu.)
//
// The CSS is injected at runtime (not through the build's CSS pipeline) so the
// non-standard -webkit-touch-callout / -webkit-user-drag properties are never
// stripped and reliably reach the browser — the iOS callout depends on them.
export function ImageProtect() {
  useEffect(() => {
    const style = document.createElement("style");
    style.setAttribute("data-image-protect", "");
    style.textContent = `
      img, video {
        -webkit-touch-callout: none !important;
        -webkit-user-drag: none !important;
        -khtml-user-drag: none !important;
        -moz-user-drag: none !important;
        user-drag: none !important;
        -webkit-user-select: none !important;
        user-select: none !important;
      }
    `;
    document.head.appendChild(style);

    const isMedia = (t: EventTarget | null) => {
      const el = t as HTMLElement | null;
      return !!el && (el.tagName === "IMG" || el.tagName === "VIDEO");
    };
    const onContextMenu = (e: MouseEvent) => {
      if (isMedia(e.target)) e.preventDefault();
    };
    const onDragStart = (e: DragEvent) => {
      if (isMedia(e.target)) e.preventDefault();
    };
    document.addEventListener("contextmenu", onContextMenu);
    document.addEventListener("dragstart", onDragStart);

    return () => {
      style.remove();
      document.removeEventListener("contextmenu", onContextMenu);
      document.removeEventListener("dragstart", onDragStart);
    };
  }, []);

  return null;
}
