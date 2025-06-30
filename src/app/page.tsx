import { LoginForm } from "@/components/login/loginForm2";

export default function Home() {
  return (
    // <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
    //   <div className="w-full max-w-sm md:max-w-3xl">
    //     <LoginForm />
    //   </div>
    // </div>
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
