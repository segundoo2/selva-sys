export default function Footer() {
  return (
    <footer className="text-emerald-800 text-center p-4 absolute bottom-0 w-full">
      <p className="text-sm">
        &copy;{new Date().getFullYear()} SelvaSYS. Todos os direitos reservados.<br />
        Desenvolvido por Edilson Segundo, clube Reino Selvagem.
      </p>
    </footer>
  );
}