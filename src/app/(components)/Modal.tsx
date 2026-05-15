"use client";

import { useEffect } from "react";

import { Button } from "@/app/(components)/Button";

export default function Modal({
  isOpen,
  title,
  onClose,
  children
}: {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className="relative w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-6">
          <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
          <Button variant="ghost" onClick={onClose}>
            Fechar
          </Button>
        </div>
        <div className="mt-6 text-slate-600">{children}</div>
      </div>
    </div>
  );
}
