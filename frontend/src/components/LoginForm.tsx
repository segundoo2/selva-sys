import { use, useState } from "react";
import Button from "./Button";
import InputField from "./InputField";
import api from "../utils/api";
import Footer from "./Footer";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await api.post("auth/login", { email, password });
      if(response.status === 200) {
        router.push('/dashboard');
      }
    } catch (error: any) {
      // Debug completo
      console.log("Erro completo:", error);
      console.log("Response data:", error.response?.data);
      console.log("Response status:", error.response?.status);
      console.log("Response headers:", error.response?.headers);
      console.log("Request config:", error.config);

      throw error;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin(email, password);
  };

  return (
    <section className="bg-white w-1/2 h-screen flex flex-col justify-center items-center">
      <div className="flex flex-col items-center gap-2 w-full">
        <h1 className="text-emerald-800 text-4xl font-semibold tracking-wider">
          Faça login
        </h1>
        <p className="text-emerald-600 font-medium">
          Entre com suas credênciais.
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-4 w-full"
        >
          <InputField
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <InputField
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button type="submit" text="Entrar" />
        </form>
        <Footer />
      </div>
    </section>
  );
}
