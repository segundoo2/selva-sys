import List from "./List";

export default function Nav() {
  return (
    <nav className="bg-emerald-800 w-72 h-full flex flex-col items-center">
      <div className="flex pt-5 gap-1">
        <img
          src="d1.svg"
          alt="Emblema d1 do clube de desbravadores"
          className="w-10 h-10"
        />
        <h1 className="font-bold text-3xl text-emerald-100">SelvaSYS</h1>
      </div>

     <List/>
    </nav>
  );
}
