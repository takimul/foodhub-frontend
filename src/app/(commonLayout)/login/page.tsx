import { LoginForm } from "@/src/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-[400px]">
        <LoginForm />
      </div>
    </div>
  );
}
