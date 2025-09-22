export default function InputField({ type, placeholder, style }: { type: string; placeholder?: string; style?: string }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={style ?? "border-2 border-emerald-300 rounded-md w-80 h-10 px-2"}
    />
  );
}
