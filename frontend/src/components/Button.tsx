export default function Button({ type, text, style }: { type?: "button" | "submit" | "reset"; text: string, style?: string }) {
  return <button
    type={type}
    className={style ?? "bg-emerald-600 text-white rounded-md p-2 w-80 h-10"}
  >
    {text}
  </button>;
}