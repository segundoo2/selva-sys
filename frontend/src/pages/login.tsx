import LoginForm from "../components/LoginForm";
import WelcomePanel from "../components/WelcomePanel";
import Head from "next/head";

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>Login — SelvaSYS</title>
        <meta name="description" content="Acesse sua conta SelvaSYS" />
      </Head>

      <main>
        <div className="flex w-full h-screen flex-row">
          <WelcomePanel />
          <LoginForm />
        </div>
      </main>
    </>
  );
}
