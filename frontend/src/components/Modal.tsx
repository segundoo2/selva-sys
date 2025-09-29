// components/Modal.tsx
import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

type ModalSize = "sm" | "md" | "lg" | "xl" | "scroll-lg"; // Adiciona o novo tamanho 'scroll-lg' para diferenciar

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
  lg: "max-w-lg", // Mantém o 'lg' original
  xl: "max-w-xl",
  // Nova classe para um modal com largura 'lg' e foco em rolagem vertical
  "scroll-lg": "max-w-3xl", // Aumenta a largura (e.g., para 3xl)
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
  
  // Define se o modal terá altura máxima e scroll (para o novo tamanho 'scroll-lg' e o original 'lg')
  // Usei 'scroll-lg' para não quebrar a lógica do 'lg' original.
  const isScrollable = size === "scroll-lg";

  const modalContent = (
    // Aplica flex-col no container para centralizar o painel e permitir que ele se encolha
    // Adiciona max-h-full e overflow-y-auto no container, para que o painel interno possa rolar
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" aria-hidden={!open}>
      {/* overlay */}
      <div
        className="fixed inset-0 bg-black/50"
        onMouseDown={(e) => {
          if (!closeOnOverlayClick) return;
          if (e.target === e.currentTarget) onClose();
        }}
      />

      {/* painel wrapper com altura máxima e rolagem. O max-h-[90vh] garante que ele não ocupe 100% da viewport. */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel ?? (typeof title === "string" ? title : "modal")}
        // Se 'scroll-lg', adiciona classes para altura máxima e rolagem
        className={`relative z-10 w-full mx-4 ${SIZE_CLASSES[size]} ${isScrollable ? "max-h-[90vh] overflow-y-auto" : ""} ${className}`}
      >
        <div className="bg-white text-emerald-800 rounded-lg shadow-lg overflow-hidden flex flex-col">
          {title && (
            <div className="flex items-center justify-between p-4 flex-shrink-0 border-b border-gray-200"> {/* flex-shrink-0 impede que o header se encolha */}
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
          
          {/* Conteúdo rolável. flex-grow e overflow-y-auto permitem que esta div cresça e role se necessário. */}
          <div className={`p-6 ${isScrollable ? "flex-grow overflow-y-auto" : ""}`}>
            {children}
          </div>

          {footer && <div className="px-6 py-4 flex-shrink-0 border-t border-gray-200">{footer}</div>} {/* flex-shrink-0 impede que o footer se encolha */}
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, rootRef.current);
}