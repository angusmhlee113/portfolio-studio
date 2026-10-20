"use client";
import { useEffect, useRef } from "react";
import type { Detail } from "../lib/content";

export default function DetailDialog({
  detail,
  onClose,
}: {
  detail: Detail | null;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (detail && !dialog.open) dialog.showModal();
    else if (!detail && dialog.open) dialog.close();
  }, [detail]);
  return (
    <dialog
      ref={ref}
      aria-labelledby="detail-title"
      onClose={onClose}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const r = event.currentTarget.getBoundingClientRect();
        if (
          event.clientX < r.left ||
          event.clientX > r.right ||
          event.clientY < r.top ||
          event.clientY > r.bottom
        )
          event.currentTarget.close();
      }}
    >
      <span className="sample-label">Illustrative concept</span>
      <h2 id="detail-title">{detail?.title}</h2>
      <p>{detail?.body}</p>
      <button onClick={() => ref.current?.close()}>Back to exploring ↗</button>
    </dialog>
  );
}
