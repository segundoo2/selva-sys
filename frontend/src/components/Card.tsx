import { ReactNode } from "react";

type Props = {
  title: string;
  paragraph: string;
  icon?: ReactNode; // NOVO: Propriedade opcional para o ícone
  style?: string;
};

export default function Card(props: Props) {
  
  // Estilo padrão: Mais robusto e escuro
  const defaultStyle = 
    "w-72 h-32 bg-emerald-800 rounded-xl shadow-xl p-4 flex items-center gap-4 transition-transform hover:scale-[1.02]";

  return (
    // Usa o estilo passado ou o novo padrão
    <section className={props.style ?? defaultStyle}>
      
      {/* Container do Ícone (Opcional)
        Só renderiza se o ícone for passado. Usamos text-emerald-400 para destacá-lo.
      */}
      {props.icon && (
        <div className="text-emerald-400 p-3 rounded-full bg-emerald-700/50 flex-shrink-0">
          {props.icon}
        </div>
      )}

      {/* Container do Conteúdo: Título e Parágrafo */}
      <div className="
        text-emerald-100 
        flex 
        flex-col 
        justify-center 
        items-start 
        h-full
        truncate" // Garante que o texto não quebre o layout
      >
        {/* Título: Maior e em destaque */}
        <h1 className="text-xl font-extrabold">{props.title}</h1>
        
        {/* Parágrafo: Cor sutil e menor, focado na informação */}
        <p className="text-emerald-300 font-normal text-sm line-clamp-2">
          {props.paragraph}
        </p>
      </div>
    </section>
  );
}