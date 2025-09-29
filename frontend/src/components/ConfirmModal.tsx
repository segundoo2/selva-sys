// components/ConfirmModal.tsx
import React from "react";
import Modal from "./Modal";
import { AlertTriangle } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
};

export default function ConfirmModal({ open, onClose, onConfirm, title = "Confirmar", description = "Tem certeza?" }: Props) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      size="sm"
      closeOnOverlayClick
      ariaLabel={title}
      footer={
        <div className="flex justify-end gap-4">
          <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300" onClick={onClose}>Cancelar</button>
          <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700" onClick={onConfirm}>Excluir</button>
        </div>
      }
    >
      <div className="flex flex-col items-center gap-4 text-center p-2">
        <AlertTriangle size={48} className="text-red-500" />
        <p className="text-lg font-semibold text-gray-700">{description}</p>
      </div>
    </Modal>
  );
}
