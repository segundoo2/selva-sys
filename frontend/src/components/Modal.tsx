// components/Modal.tsx
import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

type ModalSize = "sm" | "md" | "lg" | "xl";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  type?: "button" | "submit" | "reset";
  children?: React.ReactNode;
  footer?: React.ReactNode;
  size?: ModalSize;
  closeOnOverlayClick?: boolean;
  ariaLabel?: string;
  className?: string; // para customização extra
};

const SIZE_CLASSES: Record<ModalSize, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
};

export default function Modal({
  open,
  onClose,
  title,
  type,
  children,
  footer,
  size = "md",
  closeOnOverlayClick = true,
  ariaLabel,
  className = "",
}: ModalProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  // Cria root do portal apenas uma vez
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!rootRef.current) {
      const el = document.createElement("div");
      el.setAttribute("id", "modal-root");
      document.body.appendChild(el);
      rootRef.current = el;
    }
  }, []);

  // Fecha modal com ESC
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Gerencia scroll do body e foco
  useEffect(() => {
    if (!open) {
      document.body.style.overflow = "";
      previouslyFocused.current?.focus();
      return;
    }

    previouslyFocused.current = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";

    setTimeout(() => {
      const root = rootRef.current;
      if (!root) return;
      const modal = root.querySelector("[role='dialog']") as HTMLElement | null;
      if (!modal) return;
      const focusable = modal.querySelector<HTMLElement>(
        "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
      );
      focusable?.focus();
    }, 0);

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!rootRef.current || !open) return null;

  const modalContent = (
    <div className="fixed inset-0 z-50 flex items-center justify-center" aria-hidden={!open}>
      {/* overlay */}
      <div
        className="fixed inset-0 bg-black/50"
        onMouseDown={(e) => {
          if (!closeOnOverlayClick) return;
          if (e.target === e.currentTarget) onClose();
        }}
      />

      {/* painel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel ?? (typeof title === "string" ? title : "modal")}
        className={`relative z-10 w-full ${SIZE_CLASSES[size]} mx-4 ${className}`}
      >
        <div className="bg-white text-emerald-800 rounded-lg shadow-lg overflow-hidden">
          {title && (
            <div className="flex items-center justify-between p-4">
              <div className="text-lg font-semibold">{title}</div>
              <button
                type={type}
                aria-label="Fechar"
                onClick={onClose}
                className="p-1 rounded hover:bg-emerald-50"
              >
                <X size={18} />
              </button>
            </div>
          )}

          <div className="p-6">{children}</div>

          {footer && <div className="px-6 py-4">{footer}</div>}
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, rootRef.current);
}
