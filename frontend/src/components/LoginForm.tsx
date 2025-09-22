import Button from "./Button";
import InputField from "./InputField";

export default function LoginForm() {
  return (
    <section className="bg-white w-1/2 h-screen flex flex-col justify-center items-center">
      <div className="flex flex-col items-center gap-2 w-full">
        <h1 className="text-emerald-800 text-4xl font-semibold tracking-wider">
          Faça login
        </h1>
        <p className="text-emerald-600 font-medium">
          Entre com suas credênciais.
        </p>
        <form action="" className="flex flex-col items-center gap-4 w-full">
          <InputField
            type="text"
            placeholder="Email"
          />

          <InputField
            type="password"
            placeholder="Senha"
          />

          <Button type="submit" text="Entrar" />
        </form>
      </div>
    </section>
  );
}
