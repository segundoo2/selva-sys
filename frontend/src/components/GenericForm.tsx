// components/GenericForm.tsx (CORRIGIDO)

import React, { forwardRef } from "react";

// 1. O tipo agora estende as propriedades de um formulário e adiciona a tipagem do ref
type GenericFormProps = {
  id?: string;
  children: React.ReactNode; 
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  className?: string;
};

// 2. Usamos forwardRef para permitir que o componente receba e passe a referência (ref)
const GenericForm = forwardRef<HTMLFormElement, GenericFormProps>(
    ({ id, children, onSubmit, className = "" }, ref) => {
    
    // 3. A propriedade 'ref' é aplicada ao elemento <form>
    return (
        <form 
            id={id} 
            ref={ref} // <--- CHAVE: Aplica a referência
            onSubmit={onSubmit} 
            className={`flex flex-col gap-4 items-center justify-center ${className}`}
        >
            {children}
        </form>
    );
});

GenericForm.displayName = 'GenericForm';
export default GenericForm; // Exporta o componente modificado