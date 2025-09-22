import LoginForm from "../components/LoginForm";
import WelcomePanel from "../components/WelcomePanel";

export default function LoginPage() {
  return (
    <header>
      <div className="flex w-full h-screen flex-row">
        <WelcomePanel />
        <LoginForm />
      </div>
    </header>
  );
}
