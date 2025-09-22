export default function WelcomePanel() {
  return (
    <section className="bg-emerald-900 w-1/2 h-screen flex flex-col justify-center items-center relative overflow-hidden">
      {/* Imagem como plano de fundo */}
      <img
        src="d1.svg"
        alt="Emblema d1 do clube de desbravadores"
        className="absolute left-1/2 top-1/2 w-60 h-60 transform -translate-x-1/2 -translate-y-1/2 object-contain opacity-30 pointer-events-none"
      />
      <div className="relative z-10 flex flex-col items-center gap-4 mb-10">
        <h1 className="text-emerald-100 text-5xl text-center tracking-widest font-bold z-10">
          Bem vindo
        </h1>
        <h1 className="text-emerald-100 text-5xl text-center tracking-widest font-bold">
          ao
        </h1>
        <h1 className="text-[#ffdb4d] text-5xl text-center tracking-widest font-bold">
          SelvaSYS
        </h1>
      </div>
      <small className="text-emerald-100 absolute bottom-8 left-1/2 transform -translate-x-1/2 text-base text-center">
        Sistema Individual de Gerenciamento de Clubes
      </small>
    </section>
  );
}
