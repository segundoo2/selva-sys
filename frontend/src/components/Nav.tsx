// Nav.tsx (CORRIGIDO)

import List from "./List";

export default function Nav() {
  return (
    // REMOVEMOS items-center
    <nav className="bg-emerald-800 w-72 h-auto flex flex-col"> 
      <div className="flex pt-5 gap-1 items-center justify-center"> {/* Centralizamos o logo/título */}
        <img
          src="/d1.svg"
          alt="Emblema d1 do clube de desbravadores"
          className="w-10 h-10"
        />
        <h1 className="font-bold text-3xl text-emerald-100">SelvaSYS</h1>
      </div>

     <div className="mt-10 h-full w-full"> 
         <List/> 
     </div>
    </nav>
  );
}