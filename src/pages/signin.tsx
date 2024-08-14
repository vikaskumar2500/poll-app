import { SignInForm } from "@/components/signin-form";
export default function SignIn() {
  return (
    <section className="flex items-center justify-center flex-col md:shadow-md shadow-violet-200 md:border min-h-screen md:mt-20 md:min-h-[70vh] px-10 md:px-16 max-w-lg w-full mx-auto gap-10">
      <div className="flex flex-col gap-1 w-full">
        <h1 className="font-bold text-xl text-gray-700 md:text-2xl">
          Welcome Back!
        </h1>
        <p className="text-md text-muted-foreground">
          Enter to get unlimited access to data & information
        </p>
      </div>
      <SignInForm />
    </section>
  );
}
